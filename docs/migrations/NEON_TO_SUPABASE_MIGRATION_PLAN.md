# Neon → Supabase PostgreSQL Migration Plan (Phase 1–2)

**Date:** 2026-11-18  
**Status:** Inspection partial. **No data copied. No production cutover. Awaiting approval + real Supabase password.**  
**Source of truth until verified:** Neon  

Full machine-readable Neon inventory: `docs/migrations/NEON_SUPABASE_PHASE1_INSPECT.json` (no passwords).

---

## Phase 1 — Inspection results

### Source (Neon) — **connected OK**

| Item | Value |
|------|--------|
| Database | `neondb` |
| User | `neondb_owner` |
| Version | **PostgreSQL 18.7** |
| Extensions | `plpgsql` only |
| Enums / views / custom functions / triggers | **None** |
| Foreign keys | 16 |
| Sequences | 14 (`*_id_seq`) |
| Public tables | **17** |
| Total rows | **362** |

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
| BlogPostTag, BlogTag, LocationService, MediaAsset, PageOverride, Redirect, Route, SeasonalPrice, VehicleLocation | 0 |

Schema matches Prisma models in `prisma/schema.prisma` (PascalCase table names).  
**No `prisma/migrations` folder** — project uses `prisma db push`, not migration history.

### Target (Supabase) — **not inspected yet**

Connection strings you provided still contain the literal placeholder **`[YOUR-PASSWORD]`**.  
Local `.env` still points only at Neon. **Cannot connect to Supabase until you set the real password.**

| Role | Host (from your URI) | Port | Mode |
|------|----------------------|-----:|------|
| App pooler | `aws-1-ap-northeast-1.pooler.supabase.com` | **6543** | Transaction (pgbouncer) |
| Migration / session | same pooler host | **5432** | Session mode |

Project ref (from username): `szstdpsvcvnubcakedmv`  
Database name in URI: `postgres`

---

## Phase 2 — Migration plan (proposed)

### Compatibility notes

| Topic | Assessment |
|-------|------------|
| Neon PG **18.7** → Supabase | Confirm Supabase major version after connect. Usually PG 15/17. Prisma schema is plain tables/FKs/sequences — **low risk** if target ≥ 14. |
| Extensions | Only `plpgsql` — standard on Supabase. |
| Enums / triggers / views | None to migrate. |
| Ownership / roles | Dump as data+schema owned by Supabase `postgres` role; avoid restoring Neon role names. |
| Prisma | Add `directUrl` for migrate/push when using pgbouncer pooler for `url`. |
| Pooler | **Do not** run `pg_restore` / DDL against transaction port **6543**. Use **DIRECT_URL (5432 session)** or direct DB host. |
| Empty target | Must confirm Supabase `public` has **no conflicting app tables** before restore. If not empty → stop and ask. |

### Recommended procedure (after approval)

1. **Backup Neon** (local file, never delete Neon):  
   `pg_dump` custom format (`-Fc`) of `neondb` → `backups/neon-aroracars-YYYYMMDD.dump`
2. **Inspect Supabase** with real `TARGET_DIRECT_URL` — version, empty/public tables, extensions.
3. If target empty / approved: restore schema+data into Supabase via session URL (`pg_restore --no-owner --no-acl` or equivalent).
4. **Reset sequences** to `MAX(id)` per table.
5. **Verify** row counts (every table), FK/PK/index presence, sample SELECTs.
6. **App readiness** (still no Render cutover until you say so):  
   - Render `DATABASE_URL` = transaction pooler `…:6543/postgres?pgbouncer=true&sslmode=require`  
   - `DIRECT_URL` = session `…:5432/postgres?sslmode=require`  
   - Prisma: `url = env("DATABASE_URL")`, `directUrl = env("DIRECT_URL")`
7. Smoke-test admin/vehicles/bookings against Supabase on a preview or local `.env` **before** flipping production Render.

### What we will not do without explicit approval

- Drop/truncate Supabase tables if already populated  
- Change Render production `DATABASE_URL`  
- Delete or alter Neon data  
- Commit credentials to git  

### Tooling

Prefer PostgreSQL-native: `pg_dump` / `pg_restore` (or `psql` plain SQL).  
Prisma `db push` alone is **not** a full data migration.

---

## Blockers before Phase 3–5

1. **Real Supabase database password** in local env (not chat if possible), e.g.:

```env
SOURCE_DATABASE_URL="<current Neon URL — keep as backup>"
TARGET_DATABASE_URL="postgresql://postgres.szstdpsvcvnubcakedmv:REAL_PASSWORD@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
TARGET_DIRECT_URL="postgresql://postgres.szstdpsvcvnubcakedmv:REAL_PASSWORD@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"
```

2. Confirm target project is the intended empty AroraCars DB.  
3. **Your approval** to: (a) take Neon dump, (b) restore into Supabase.

---

## App notes (Phase 6 preview)

- `prisma/schema.prisma`: `provider = postgresql`, `url = env("DATABASE_URL")` — no `directUrl` yet.  
- No committed migration history.  
- `scripts/db-ping.ts` labels Neon specially — minor update later.  
- `render.yaml` is outdated vs live Neon — cutover is env change on Render, not yaml fiction.

---

## Approval gate

Reply with:

1. Supabase password saved in `.env` as `TARGET_DIRECT_URL` / `TARGET_DATABASE_URL` (tell me “ready”, don’t paste password in chat).  
2. **Approve Phase 3–5**: backup Neon + migrate into Supabase (still **no** production Render switch until verification report).  
3. Or **inspect Supabase only** first, then decide.
