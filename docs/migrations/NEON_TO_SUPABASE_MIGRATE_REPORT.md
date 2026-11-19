# Neon → Supabase Migration Report

**Date:** 2026-11-18  
**Status:** **SUCCESS** — schema + data verified on Supabase  
**Neon:** unchanged (still source of truth for production until Render cutover)  
**Production Render `DATABASE_URL`:** **not switched yet**

---

## Result

| Check | Result |
|-------|--------|
| Neon rows | **362** |
| Supabase rows | **362** |
| Table mismatches | **0** |
| Schema | Prisma `db push` to Supabase public |
| Sequences | Reset after copy |

### Row counts (matched)

| Table | Rows |
|-------|-----:|
| Vehicle | 141 |
| SeoPage | 171 |
| BlogPost | 20 |
| Location | 12 |
| Service | 9 |
| SiteSetting | 6 |
| Booking | 2 |
| BlogCategory | 1 |
| Others (empty) | 0 |

---

## Method

1. Logical JSON backup from Neon → `backups/neon-aroracars-2026-11-18T07-57-38-761Z.json`  
2. `prisma db push` against Supabase session URL (`TARGET_DIRECT_URL`, port 5432)  
3. FK-safe INSERT copy of all tables  
4. Sequence `setval` to `MAX(id)`  

Docker/`pg_dump` was unavailable (Docker Desktop engine not running); Node + Prisma path used instead.

---

## Versions

| | Version |
|--|---------|
| Neon | PostgreSQL **18.7** |
| Supabase | PostgreSQL **17.11** |

No enums/views/triggers on source — no compatibility blockers observed.

---

## What is NOT done yet

1. **Render production** still on Neon — do not change until you approve cutover.  
2. Prisma schema has no `directUrl` yet (needed when app uses pgbouncer `:6543`).  
3. Local `.env` `DATABASE_URL` still points at Neon (correct until cutover).

---

## Recommended Render cutover (when you approve)

```
DATABASE_URL=postgresql://postgres.szstdpsvcvnubcakedmv:PASSWORD@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
DIRECT_URL=postgresql://postgres.szstdpsvcvnubcakedmv:PASSWORD@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres?sslmode=require
```

Then add to `prisma/schema.prisma`:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

Keep Neon URL saved as emergency rollback for 1–2 weeks.

---

## Machine report

`docs/migrations/NEON_TO_SUPABASE_MIGRATE_REPORT.json`
