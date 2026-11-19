import fs from "fs";
import path from "path";
import pg from "pg";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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

function client(url) {
  return new pg.Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 30000,
  });
}

async function tableCounts(c) {
  const tables = (
    await c.query(`
    select table_name from information_schema.tables
    where table_schema='public' and table_type='BASE TABLE' order by 1`)
  ).rows.map((r) => r.table_name);
  const out = [];
  for (const t of tables) {
    const r = await c.query(`select count(*)::bigint as c from public."${t}"`);
    out.push({ table: t, rows: Number(r.rows[0].c) });
  }
  return out;
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

const targetUrl = process.env.TARGET_DIRECT_URL;
const sourceUrl = process.env.SOURCE_DATABASE_URL;
if (!targetUrl || !sourceUrl) throw new Error("Need TARGET_DIRECT_URL and SOURCE_DATABASE_URL");

const backupPath =
  process.argv[2] ||
  fs
    .readdirSync("backups")
    .filter((f) => f.startsWith("neon-aroracars-") && f.endsWith(".json"))
    .map((f) => path.join("backups", f))
    .sort()
    .at(-1);

if (!backupPath || !fs.existsSync(backupPath)) throw new Error("No backup JSON found");

const backup = JSON.parse(fs.readFileSync(backupPath, "utf8"));
const tgt = client(targetUrl);
await tgt.connect();

const before = await tableCounts(tgt);
const nonEmpty = before.filter((t) => t.rows > 0);
if (nonEmpty.length) {
  await tgt.end();
  throw new Error(
    `Target tables not empty: ${nonEmpty.map((t) => `${t.table}=${t.rows}`).join(", ")}. Aborting.`
  );
}

const copyStats = [];
await tgt.query("BEGIN");
try {
  for (const table of INSERT_ORDER) {
    const payload = backup.tables[table];
    if (!payload) {
      copyStats.push({ table, skipped: true });
      continue;
    }
    const cols = payload.columns;
    const colList = cols.map((c) => `"${c}"`).join(", ");
    let inserted = 0;
    for (const row of payload.rows) {
      const values = cols.map((c) => {
        const v = row[c];
        // JSON backup stringified dates → Date
        if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v)) {
          const d = new Date(v);
          if (!Number.isNaN(d.getTime())) return d;
        }
        return v;
      });
      const params = cols.map((_, i) => `$${i + 1}`).join(", ");
      await tgt.query(`INSERT INTO public."${table}" (${colList}) VALUES (${params})`, values);
      inserted++;
    }
    copyStats.push({ table, inserted });
    console.log(JSON.stringify({ copied: table, inserted }));
  }
  await tgt.query("COMMIT");
} catch (e) {
  await tgt.query("ROLLBACK");
  throw e;
}

const seqs = await resetSequences(tgt);
const supabaseCounts = await tableCounts(tgt);
await tgt.end();

const src = client(sourceUrl);
await src.connect();
const neonCounts = await tableCounts(src);
await src.end();

const srcMap = Object.fromEntries(neonCounts.map((t) => [t.table, t.rows]));
const tgtMap = Object.fromEntries(supabaseCounts.map((t) => [t.table, t.rows]));
const mismatches = [];
for (const t of new Set([...Object.keys(srcMap), ...Object.keys(tgtMap)])) {
  if (srcMap[t] !== tgtMap[t]) mismatches.push({ table: t, neon: srcMap[t] ?? null, supabase: tgtMap[t] ?? null });
}

const report = {
  success: mismatches.length === 0,
  method: "json-backup-copy",
  backup: backupPath.replace(/\\/g, "/"),
  copyStats,
  sequencesReset: seqs,
  neonTotal: neonCounts.reduce((a, r) => a + r.rows, 0),
  supabaseTotal: supabaseCounts.reduce((a, r) => a + r.rows, 0),
  neonCounts,
  supabaseCounts,
  mismatches,
  endedAt: new Date().toISOString(),
};
fs.mkdirSync("docs/migrations", { recursive: true });
fs.writeFileSync("docs/migrations/NEON_TO_SUPABASE_MIGRATE_REPORT.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify({ success: report.success, neonRows: report.neonTotal, supabaseRows: report.supabaseTotal, mismatches }, null, 2));
if (!report.success) process.exitCode = 2;
