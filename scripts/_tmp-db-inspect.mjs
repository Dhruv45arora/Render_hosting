/**
 * Phase 1 inspection only — read-only. Does not modify databases.
 * Uses SOURCE_DATABASE_URL or DATABASE_URL for Neon.
 * Uses TARGET_DATABASE_URL / TARGET_DIRECT_URL for Supabase if set and not placeholder.
 */
import { PrismaClient } from "@prisma/client";
import pg from "pg";
import fs from "fs";

function redact(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.password) u.password = "***";
    return u.toString();
  } catch {
    return "[unparseable]";
  }
}

function isPlaceholder(url) {
  return !url || /\[YOUR-PASSWORD\]|YOUR.PASSWORD|changeme/i.test(url);
}

async function inspect(label, connectionString) {
  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  const out = { label, ok: false, redactedUrl: redact(connectionString) };
  try {
    await client.connect();
    const ver = await client.query("select version() as v, current_database() as db, current_user as usr, inet_server_addr()::text as addr");
    out.ok = true;
    out.version = ver.rows[0].v;
    out.database = ver.rows[0].db;
    out.user = ver.rows[0].usr;

    const ext = await client.query(`select extname, extversion from pg_extension order by 1`);
    out.extensions = ext.rows;

    const enums = await client.query(`
      select n.nspname as schema, t.typname as name,
             array_agg(e.enumlabel order by e.enumsortorder) as labels
      from pg_type t
      join pg_enum e on t.oid = e.enumtypid
      join pg_namespace n on n.oid = t.typnamespace
      where n.nspname not in ('pg_catalog','information_schema')
      group by 1,2 order by 1,2`);
    out.enums = enums.rows;

    const tables = await client.query(`
      select table_schema, table_name
      from information_schema.tables
      where table_schema not in ('pg_catalog','information_schema')
        and table_type = 'BASE TABLE'
      order by 1,2`);
    out.tables = tables.rows;

    const columns = await client.query(`
      select table_schema, table_name, column_name, data_type, udt_name,
             is_nullable, column_default, character_maximum_length
      from information_schema.columns
      where table_schema not in ('pg_catalog','information_schema')
      order by table_schema, table_name, ordinal_position`);
    out.columns = columns.rows;

    const pks = await client.query(`
      select tc.table_schema, tc.table_name, kcu.column_name, tc.constraint_name
      from information_schema.table_constraints tc
      join information_schema.key_column_usage kcu
        on tc.constraint_name = kcu.constraint_name and tc.table_schema = kcu.table_schema
      where tc.constraint_type = 'PRIMARY KEY'
        and tc.table_schema not in ('pg_catalog','information_schema')
      order by 1,2,3`);
    out.primaryKeys = pks.rows;

    const fks = await client.query(`
      select tc.table_schema, tc.table_name, kcu.column_name,
             ccu.table_schema as foreign_table_schema,
             ccu.table_name as foreign_table_name,
             ccu.column_name as foreign_column_name,
             tc.constraint_name
      from information_schema.table_constraints tc
      join information_schema.key_column_usage kcu
        on tc.constraint_name = kcu.constraint_name and tc.table_schema = kcu.table_schema
      join information_schema.constraint_column_usage ccu
        on ccu.constraint_name = tc.constraint_name and ccu.table_schema = tc.table_schema
      where tc.constraint_type = 'FOREIGN KEY'
        and tc.table_schema not in ('pg_catalog','information_schema')
      order by 1,2`);
    out.foreignKeys = fks.rows;

    const uniques = await client.query(`
      select tc.table_schema, tc.table_name, tc.constraint_name, kcu.column_name
      from information_schema.table_constraints tc
      join information_schema.key_column_usage kcu
        on tc.constraint_name = kcu.constraint_name and tc.table_schema = kcu.table_schema
      where tc.constraint_type = 'UNIQUE'
        and tc.table_schema not in ('pg_catalog','information_schema')
      order by 1,2`);
    out.uniqueConstraints = uniques.rows;

    const indexes = await client.query(`
      select schemaname, tablename, indexname, indexdef
      from pg_indexes
      where schemaname not in ('pg_catalog','information_schema')
      order by 1,2,3`);
    out.indexes = indexes.rows;

    const seqs = await client.query(`
      select sequence_schema, sequence_name, data_type
      from information_schema.sequences
      where sequence_schema not in ('pg_catalog','information_schema')
      order by 1,2`);
    out.sequences = seqs.rows;

    const views = await client.query(`
      select table_schema, table_name
      from information_schema.views
      where table_schema not in ('pg_catalog','information_schema')
      order by 1,2`);
    out.views = views.rows;

    const funcs = await client.query(`
      select n.nspname as schema, p.proname as name, pg_get_function_identity_arguments(p.oid) as args
      from pg_proc p
      join pg_namespace n on n.oid = p.pronamespace
      where n.nspname not in ('pg_catalog','information_schema')
        and p.prokind in ('f','p')
      order by 1,2`);
    out.functions = funcs.rows;

    const triggers = await client.query(`
      select event_object_schema, event_object_table, trigger_name, action_timing, event_manipulation
      from information_schema.triggers
      where trigger_schema not in ('pg_catalog','information_schema')
      order by 1,2,3`);
    out.triggers = triggers.rows;

    // row counts (read-only)
    const counts = [];
    for (const t of out.tables) {
      if (t.table_schema !== "public") continue;
      const q = await client.query(`select count(*)::bigint as c from "${t.table_schema}"."${t.table_name}"`);
      counts.push({ table: t.table_name, rows: Number(q.rows[0].c) });
    }
    out.rowCounts = counts;
    out.totalRows = counts.reduce((a, r) => a + r.rows, 0);
  } catch (e) {
    out.error = e.message;
  } finally {
    try {
      await client.end();
    } catch {}
  }
  return out;
}

const source =
  process.env.SOURCE_DATABASE_URL ||
  process.env.DATABASE_URL ||
  "";
const targetPool = process.env.TARGET_DATABASE_URL || "";
const targetDirect = process.env.TARGET_DIRECT_URL || process.env.DIRECT_URL || "";

const report = {
  inspectedAt: new Date().toISOString(),
  sourceConfigured: Boolean(source),
  targetPoolConfigured: Boolean(targetPool) && !isPlaceholder(targetPool),
  targetDirectConfigured: Boolean(targetDirect) && !isPlaceholder(targetDirect),
  source: null,
  target: null,
  prisma: {
    migrationsFolder: fs.existsSync("prisma/migrations"),
    schemaHasDirectUrl: fs.readFileSync("prisma/schema.prisma", "utf8").includes("directUrl"),
  },
};

if (!source) {
  report.source = { ok: false, error: "No SOURCE_DATABASE_URL / DATABASE_URL" };
} else {
  report.source = await inspect("neon-source", source);
}

const targetUrl = !isPlaceholder(targetDirect)
  ? targetDirect
  : !isPlaceholder(targetPool)
    ? targetPool
    : null;

if (!targetUrl) {
  report.target = {
    ok: false,
    error:
      "Supabase password still placeholder [YOUR-PASSWORD]. Set TARGET_DIRECT_URL (session port 5432) with real password to inspect.",
  };
} else {
  report.target = await inspect("supabase-target", targetUrl);
}

fs.mkdirSync("docs/migrations", { recursive: true });
fs.writeFileSync("docs/migrations/NEON_SUPABASE_PHASE1_INSPECT.json", JSON.stringify(report, null, 2));

// human summary without secrets
const summary = {
  sourceOk: report.source?.ok,
  sourceDb: report.source?.database,
  sourceUser: report.source?.user,
  sourceVersion: report.source?.version?.split(",")[0],
  sourceTables: report.source?.tables?.filter((t) => t.table_schema === "public").map((t) => t.table_name),
  sourceRowCounts: report.source?.rowCounts,
  sourceTotalRows: report.source?.totalRows,
  sourceExtensions: report.source?.extensions,
  sourceEnums: report.source?.enums,
  sourceViews: report.source?.views,
  sourceFunctions: report.source?.functions?.length,
  sourceTriggers: report.source?.triggers?.length,
  sourceFks: report.source?.foreignKeys?.length,
  sourceSequences: report.source?.sequences?.map((s) => s.sequence_name),
  targetOk: report.target?.ok,
  targetError: report.target?.error,
  targetDb: report.target?.database,
  targetTables: report.target?.tables?.filter((t) => t.table_schema === "public").map((t) => t.table_name),
  targetRowCounts: report.target?.rowCounts,
  prisma: report.prisma,
};
console.log(JSON.stringify(summary, null, 2));
