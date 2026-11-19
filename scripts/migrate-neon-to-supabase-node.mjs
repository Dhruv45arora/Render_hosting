/**
 * Neon → Supabase migration without local pg_dump (Docker unavailable).
 * 1) Logical JSON backup from Neon (read-only)
 * 2) prisma db push schema to Supabase
 * 3) Copy rows in FK-safe order
 * 4) Reset sequences + verify counts
 * Never prints passwords. Does not modify Neon.
 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import pg from "pg";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function mustEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

function redact(url) {
  try {
    const u = new URL(url);
    u.password = "***";
    return u.toString();
  } catch {
    return "[redacted]";
  }
}

function client(url) {
  return new pg.Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 30000,
  });
}

async function listPublicTables(c) {
  const r = await c.query(`
    select table_name from information_schema.tables
    where table_schema='public' and table_type='BASE TABLE'
    order by 1`);
  return r.rows.map((x) => x.table_name);
}

async function tableCounts(c) {
  const tables = await listPublicTables(c);
  const out = [];
  for (const t of tables) {
    const r = await c.query(`select count(*)::bigint as c from public."${t}"`);
    out.push({ table: t, rows: Number(r.rows[0].c) });
  }
  return out;
}

/** FK-safe insert order for AroraCars Prisma schema */
const INSERT_ORDER = [
  "SiteSetting",
  "PageOverride",
  "Vehicle",
  "SeasonalPrice",
  "Location",
  "Service",
  "BlogCategory",
  "BlogTag",
  "LocationService",
  "VehicleLocation",
  "Route",
  "MediaAsset",
  "SeoPage",
  "Booking",
  "BlogPost",
  "BlogPostTag",
  "Redirect",
];

async function dumpTable(c, table) {
  const cols = await c.query(
    `select column_name from information_schema.columns
     where table_schema='public' and table_name=$1
     order by ordinal_position`,
    [table]
  );
  const columns = cols.rows.map((r) => r.column_name);
  const data = await c.query(`select * from public."${table}"`);
  return { table, columns, rows: data.rows };
}

async function resetSequences(c) {
  const seqTables = await c.query(`
    select c.relname as table_name, a.attname as column_name, s.relname as seq_name
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    join pg_attribute a on a.attrelid = c.oid
    join pg_depend d on d.refobjid = c.oid and d.refobjsubid = a.attnum
    join pg_class s on s.oid = d.objid and s.relkind = 'S'
    where n.nspname = 'public' and a.attnum > 0 and not a.attisdropped
  `);
  for (const row of seqTables.rows) {
    await c.query(
      `SELECT setval( '"public"."${row.seq_name}"', COALESCE((SELECT MAX("${row.column_name}") FROM public."${row.table_name}"), 1), true )`
    );
  }
  return seqTables.rows.length;
}

const sourceUrl = mustEnv("SOURCE_DATABASE_URL");
const targetUrl = mustEnv("TARGET_DIRECT_URL");
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
fs.mkdirSync("backups", { recursive: true });
fs.mkdirSync("docs/migrations", { recursive: true });

const report = {
  startedAt: new Date().toISOString(),
  method: "node-prisma-data-copy",
  source: redact(sourceUrl),
  target: redact(targetUrl),
  steps: [],
};

console.log(JSON.stringify({ phase: "connect", source: report.source, target: report.target }));

const src = client(sourceUrl);
const tgt = client(targetUrl);
await src.connect();
await tgt.connect();

const neonCountsBefore = await tableCounts(src);
const targetTablesBefore = await listPublicTables(tgt);
report.steps.push({
  step: "precheck",
  neonCountsBefore,
  neonTotal: neonCountsBefore.reduce((a, r) => a + r.rows, 0),
  targetTablesBefore,
});

const conflict = targetTablesBefore.filter((t) => INSERT_ORDER.includes(t));
if (conflict.length) {
  await src.end();
  await tgt.end();
  throw new Error(`Target already has app tables: ${conflict.join(", ")}. Refusing overwrite.`);
}

// 1) Backup JSON from Neon
console.log(JSON.stringify({ phase: "backup" }));
const backup = { dumpedAt: new Date().toISOString(), tables: {} };
const neonTables = await listPublicTables(src);
for (const t of neonTables) {
  backup.tables[t] = await dumpTable(src, t);
  console.log(JSON.stringify({ backedUp: t, rows: backup.tables[t].rows.length }));
}
const backupFile = path.join("backups", `neon-aroracars-${stamp}.json`);
fs.writeFileSync(backupFile, JSON.stringify(backup));
report.steps.push({
  step: "backup",
  file: backupFile.replace(/\\/g, "/"),
  bytes: fs.statSync(backupFile).size,
  tables: neonTables.length,
});

await src.end();

// 2) Schema on Supabase via prisma db push
console.log(JSON.stringify({ phase: "prisma-db-push" }));
const push = spawnSync(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["prisma", "db", "push", "--skip-generate", "--accept-data-loss"],
  {
    encoding: "utf8",
    env: {
      ...process.env,
      DATABASE_URL: targetUrl,
      NODE_TLS_REJECT_UNAUTHORIZED: "0",
    },
    timeout: 300000,
  }
);
report.steps.push({
  step: "prisma-db-push",
  status: push.status,
  stdoutTail: (push.stdout || "").slice(-2000),
  stderrTail: (push.stderr || "").slice(-2000),
});
if (push.status !== 0) {
  fs.writeFileSync(
    `docs/migrations/NEON_TO_SUPABASE_MIGRATE_FAIL_${stamp}.json`,
    JSON.stringify(report, null, 2)
  );
  throw new Error(`prisma db push failed: ${(push.stderr || push.stdout || "").slice(0, 2000)}`);
}
console.log(JSON.stringify({ phase: "schema-ready" }));

// reconnect target after push
const tgt2 = client(targetUrl);
await tgt2.connect();

// 3) Copy data
console.log(JSON.stringify({ phase: "copy-data" }));
const copyStats = [];
await tgt2.query("BEGIN");
try {
  for (const table of INSERT_ORDER) {
    const payload = backup.tables[table];
    if (!payload) {
      copyStats.push({ table, skipped: "not in backup" });
      continue;
    }
    if (!payload.rows.length) {
      copyStats.push({ table, inserted: 0 });
      continue;
    }
    const cols = payload.columns;
    const colList = cols.map((c) => `"${c}"`).join(", ");
    let inserted = 0;
    for (const row of payload.rows) {
      const values = cols.map((c) => row[c]);
      const params = cols.map((_, i) => `$${i + 1}`).join(", ");
      await tgt2.query(
        `INSERT INTO public."${table}" (${colList}) VALUES (${params})`,
        values
      );
      inserted++;
    }
    copyStats.push({ table, inserted });
    console.log(JSON.stringify({ copied: table, inserted }));
  }
  await tgt2.query("COMMIT");
} catch (e) {
  await tgt2.query("ROLLBACK");
  throw e;
}
report.steps.push({ step: "copy-data", copyStats });

const seqs = await resetSequences(tgt2);
report.steps.push({ step: "sequences", reset: seqs });

const supabaseCounts = await tableCounts(tgt2);
await tgt2.end();

// Re-read Neon for verify (immutable check)
const src2 = client(sourceUrl);
await src2.connect();
const neonCountsAfter = await tableCounts(src2);
await src2.end();

const srcMap = Object.fromEntries(neonCountsAfter.map((t) => [t.table, t.rows]));
const tgtMap = Object.fromEntries(supabaseCounts.map((t) => [t.table, t.rows]));
const mismatches = [];
for (const t of new Set([...Object.keys(srcMap), ...Object.keys(tgtMap)])) {
  if (srcMap[t] !== tgtMap[t]) mismatches.push({ table: t, neon: srcMap[t] ?? null, supabase: tgtMap[t] ?? null });
}

report.endedAt = new Date().toISOString();
report.success = mismatches.length === 0;
report.verify = {
  neonTotal: neonCountsAfter.reduce((a, r) => a + r.rows, 0),
  supabaseTotal: supabaseCounts.reduce((a, r) => a + r.rows, 0),
  neonCountsAfter,
  supabaseCounts,
  mismatches,
};

const out = "docs/migrations/NEON_TO_SUPABASE_MIGRATE_REPORT.json";
fs.writeFileSync(out, JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      success: report.success,
      neonRows: report.verify.neonTotal,
      supabaseRows: report.verify.supabaseTotal,
      mismatches,
      backup: backupFile.replace(/\\/g, "/"),
      report: out,
    },
    null,
    2
  )
);
if (!report.success) process.exitCode = 2;
