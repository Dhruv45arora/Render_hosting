/**
 * Neon → Supabase migration via Docker pg_dump / psql.
 * Read-only on Neon. Writes only to Supabase target.
 * Does not print passwords.
 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import pg from "pg";

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

/** Strip params that break older/libpq clients inside Docker. */
function sanitizeDumpUrl(url) {
  const u = new URL(url);
  u.searchParams.delete("channel_binding");
  if (!u.searchParams.get("sslmode")) u.searchParams.set("sslmode", "require");
  return u.toString();
}

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    ...opts,
  });
  if (r.status !== 0) {
    const err = (r.stderr || r.stdout || "").slice(0, 2000);
    throw new Error(`${cmd} ${args[0] || ""} failed (${r.status}): ${err}`);
  }
  return r;
}

async function counts(connectionString, label) {
  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 30000,
  });
  await client.connect();
  const tables = await client.query(`
    select table_name from information_schema.tables
    where table_schema='public' and table_type='BASE TABLE'
    order by 1`);
  const rows = [];
  for (const t of tables.rows) {
    const c = await client.query(`select count(*)::bigint as c from public."${t.table_name}"`);
    rows.push({ table: t.table_name, rows: Number(c.rows[0].c) });
  }
  const fks = await client.query(`
    select count(*)::int as c from information_schema.table_constraints
    where constraint_type='FOREIGN KEY' and table_schema='public'`);
  const seqs = await client.query(`
    select count(*)::int as c from information_schema.sequences
    where sequence_schema='public'`);
  await client.end();
  return {
    label,
    tables: rows,
    tableCount: rows.length,
    totalRows: rows.reduce((a, r) => a + r.rows, 0),
    foreignKeys: fks.rows[0].c,
    sequences: seqs.rows[0].c,
  };
}

async function resetSequences(connectionString) {
  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 30000,
  });
  await client.connect();
  const seqTables = await client.query(`
    select c.relname as table_name, a.attname as column_name, s.relname as seq_name
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    join pg_attribute a on a.attrelid = c.oid
    join pg_depend d on d.refobjid = c.oid and d.refobjsubid = a.attnum
    join pg_class s on s.oid = d.objid and s.relkind = 'S'
    where n.nspname = 'public' and a.attnum > 0 and not a.attisdropped
  `);
  for (const row of seqTables.rows) {
    await client.query(
      `SELECT setval( '"public"."${row.seq_name}"', COALESCE((SELECT MAX("${row.column_name}") FROM public."${row.table_name}"), 1), true )`
    );
  }
  await client.end();
  return seqTables.rows.length;
}

const source = sanitizeDumpUrl(mustEnv("SOURCE_DATABASE_URL"));
const target = sanitizeDumpUrl(mustEnv("TARGET_DIRECT_URL"));
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupDir = path.resolve("backups");
fs.mkdirSync(backupDir, { recursive: true });
const dumpFile = path.join(backupDir, `neon-aroracars-${stamp}.sql`);
const dumpName = path.basename(dumpFile);

const report = {
  startedAt: new Date().toISOString(),
  source: redact(source),
  target: redact(target),
  dumpFile: dumpFile.replace(/\\/g, "/"),
  steps: [],
};

console.log(JSON.stringify({ phase: "precheck", source: report.source, target: report.target }));

const beforeSource = await counts(source, "neon-before");
const beforeTarget = await counts(target, "supabase-before");
report.steps.push({ step: "precheck", beforeSource, beforeTarget });

if (beforeTarget.tableCount > 0) {
  const appTables = beforeTarget.tables.map((t) => t.table_name);
  const conflicting = appTables.filter((t) =>
    [
      "Vehicle",
      "Booking",
      "SeoPage",
      "Location",
      "Service",
      "SiteSetting",
      "BlogPost",
    ].includes(t)
  );
  if (conflicting.length) {
    throw new Error(
      `Target already has app tables (${conflicting.join(", ")}). Refusing to overwrite without explicit wipe approval.`
    );
  }
}

// 1) Dump Neon (PG 18 client)
console.log(JSON.stringify({ phase: "dump", file: dumpName }));
run(
  "docker",
  [
    "run",
    "--rm",
    "-v",
    `${backupDir}:/backups`,
    "postgres:18",
    "pg_dump",
    `--dbname=${source}`,
    "--no-owner",
    "--no-acl",
    "--clean",
    "--if-exists",
    "--format=plain",
    `-f=/backups/${dumpName}`,
  ],
  { timeout: 300000 }
);
const dumpStat = fs.statSync(dumpFile);
report.steps.push({ step: "dump", bytes: dumpStat.size, file: dumpName });
console.log(JSON.stringify({ phase: "dump-done", bytes: dumpStat.size }));

// 2) Restore to Supabase (PG 17 client talking to PG 17 server)
console.log(JSON.stringify({ phase: "restore" }));
const restore = spawnSync(
  "docker",
  [
    "run",
    "--rm",
    "-i",
    "-v",
    `${backupDir}:/backups`,
    "postgres:17",
    "psql",
    target,
    "-v",
    "ON_ERROR_STOP=1",
    "-f",
    `/backups/${dumpName}`,
  ],
  { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, timeout: 600000 }
);
report.steps.push({
  step: "restore",
  status: restore.status,
  stderrTail: (restore.stderr || "").slice(-1500),
  stdoutTail: (restore.stdout || "").slice(-1500),
});
if (restore.status !== 0) {
  fs.writeFileSync(
    path.join("docs/migrations", `NEON_TO_SUPABASE_MIGRATE_FAIL_${stamp}.json`),
    JSON.stringify(report, null, 2)
  );
  throw new Error(`Restore failed: ${(restore.stderr || restore.stdout || "").slice(0, 2000)}`);
}
console.log(JSON.stringify({ phase: "restore-done" }));

// 3) Sequences
const seqReset = await resetSequences(target);
report.steps.push({ step: "sequences", reset: seqReset });

// 4) Verify
const afterSource = await counts(source, "neon-after");
const afterTarget = await counts(target, "supabase-after");
const mismatches = [];
const srcMap = Object.fromEntries(afterSource.tables.map((t) => [t.table, t.rows]));
const tgtMap = Object.fromEntries(afterTarget.tables.map((t) => [t.table, t.rows]));
const allTables = new Set([...Object.keys(srcMap), ...Object.keys(tgtMap)]);
for (const t of allTables) {
  if ((srcMap[t] ?? null) !== (tgtMap[t] ?? null)) {
    mismatches.push({ table: t, neon: srcMap[t] ?? null, supabase: tgtMap[t] ?? null });
  }
}
report.steps.push({ step: "verify", afterSource, afterTarget, mismatches });
report.endedAt = new Date().toISOString();
report.success = mismatches.length === 0 && afterTarget.tableCount === afterSource.tableCount;

const outPath = path.join("docs/migrations", "NEON_TO_SUPABASE_MIGRATE_REPORT.json");
fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      success: report.success,
      neonTables: afterSource.tableCount,
      supabaseTables: afterTarget.tableCount,
      neonRows: afterSource.totalRows,
      supabaseRows: afterTarget.totalRows,
      mismatches,
      dumpFile: dumpName,
      report: outPath.replace(/\\/g, "/"),
    },
    null,
    2
  )
);
if (!report.success) process.exitCode = 2;
