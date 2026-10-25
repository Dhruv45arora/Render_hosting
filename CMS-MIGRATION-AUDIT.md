# Phase 1 — CMS Migration Audit (Arora Cars)

**Status:** Phases 1–7 complete in repo (Phase 8 = ops wrap: npm scripts + QA).  
**Priority order:** Data safety → SEO preservation → Backward compatibility → Admin UX → Scalability → New features.

| Phase | Status |
|-------|--------|
| 1 Audit | Done |
| 2 Neon/Prisma foundation + phone lock | Done |
| 3 Admin CMS | Done |
| 4 Dual render | Done |
| 5 Sitemap / schema.org | Done |
| 6 `npm run migrate:cms` copy-preserve import | Done (manual run) |
| 7 `npm run qa:all` Wave1 + CMS QA | Done |
| 8 Package scripts / KT notes | Done |

### Phase 2 progress (in repo)

- Prisma provider → `postgresql` via `env("DATABASE_URL")`
- Additive CMS models: Location, Service, LocationService, VehicleLocation, Route, SeoPage, Blog*, MediaAsset, Redirect
- Vehicle extended: brand, status, features, sortOrder
- Booking extended: optional location/service/route/source/pageType
- Admin cannot change phone/WhatsApp (UI + API 403)
- Seed no longer overwrites existing vehicles/settings; removed from `npm run build`
- Vehicle DELETE soft-archives (`ARCHIVED`) instead of hard delete
- **Action required:** set Neon `DATABASE_URL` in `.env` / Render, then `npx prisma db push` (and optional `npm run db:seed` once)

---

## 1. Current architecture assessment

| Layer | Current state |
|-------|----------------|
| Runtime | Next.js 14 App Router under `app/` — single repo, no separate backend |
| APIs | Route Handlers in `app/api/` and `app/api/admin/` |
| Auth | Cookie `ac_admin` via `middleware.ts` + `lib/auth.ts` |
| Public landings | Almost entirely **static TypeScript** in `data/*.ts`, rendered by `app/(public)/[slug]/page.tsx` |
| Vehicles | Prisma `Vehicle` + seed from `data/vehicles.ts`; pages at `/rent/[slug]` |
| Blog | Static `data/blog.ts` → `/blog`, `/blog/[slug]` |
| Bookings | `POST /api/bookings` → Prisma `Booking` |
| Settings | Prisma `SiteSetting`; admin UI can edit phone/WhatsApp/email today (**violates new phone rule**) |
| Sitemaps | Index + 5 children via `lib/sitemap-sets.ts` (reads TS landings + DB vehicles + static blog) |
| Schema.org | `lib/schema-org.ts`; Wave 1 partner pages suppress `CarRental` |
| Wave 1 | 114 pages in `wave1-hubs.ts` / `wave1-pages.ts`; `enquiryCity` + `isWave1PartnerPath()` |
| DB today (local `.env`) | **SQLite** `file:./dev.db` hard-coded in `prisma/schema.prisma` |
| Target DB | Existing **Neon PostgreSQL** via `process.env.DATABASE_URL` (not committed) |
| Build risk | `npm run build` runs `prisma db push` **and** `tsx prisma/seed.ts` every deploy — dangerous once CMS is source of truth |
| Legacy | `src/` CRA unused; excluded from `tsconfig` |

**Page resolution today:** `getPage(slug)` from static arrays only. Unknown slug → `notFound()`. No DB SEO pages yet.

**Recommended future resolution order (Phase 4):**

1. Legacy static / migrated-locked slug (existing production URLs win)
2. Published DB `SeoPage` / blog by slug
3. 404

Never let a new generated DB page override an existing indexed slug without an explicit migration/redirect record.

---

## 2. Existing Prisma models

| Model | Role | Notes |
|-------|------|--------|
| `Vehicle` | Dehradun fleet product | Int id, unique slug, category string, prices, deposit, availability string, single `image` path, featured |
| `SeasonalPrice` | Seasonal day rate | Cascades with vehicle |
| `Booking` | Enquiries | name, phone, dates, vehicleSlug/Name, message, status — **no location/service/source fields yet** |
| `SiteSetting` | key/value | Currently stores phone, whatsapp, email, yearsInBusiness, fleetCount |
| `PageOverride` | Optional hero/pricing blurb by landing slug | Thin; not a full CMS |

**Missing for CMS:** Location, Service, VehicleLocation, Route, SeoPage, Blog*, Media, Redirect, FAQ entities, vehicle status enum, gallery, sortOrder, brand as first-class field.

---

## 3. Models to add / extend (Phase 2 target)

### Extend (additive, non-destructive)

- **Vehicle** — add `status` (ACTIVE/INACTIVE/ARCHIVED), `brand`, `sortOrder`, `features` (JSON/text), soft-archive; keep existing columns; keep existing rows
- **Booking** — add optional `locationSlug`, `serviceSlug`, `routeSlug`, `sourceSlug`, `pageType` (nullable for old rows)
- **SiteSetting** — keep; **block phone/whatsapp writes in API**

### Add

- `Location` (+ serviceMode OWN_FLEET | PARTNER | UNAVAILABLE)
- `Service`
- `VehicleLocation` (vehicle × location pricing/availability)
- `Route` (origin/destination FKs to Location)
- `SeoPage` (status DRAFT/PUBLISHED/ARCHIVED; indexable; sitemapEnabled; pageType; FKs)
- `BlogPost`, `BlogCategory`, `BlogTag`, join tables
- `MediaAsset` (+ optional join / FK usage)
- `Redirect`
- `Faq` (optional reusable) / page FAQ JSON on SeoPage for v1
- Indexes on slug, status, FKs, publishedAt

### Do not

- Hard-delete SEO vehicles by default
- Store image blobs in Postgres
- Hardcode Neon credentials in source
- Reset/drop Neon
- Remove `data/wave1-*` or `data/blog.ts` in Phase 2

---

## 4. Features that must be preserved

- All flat URLs (`/car-rental-dehradun`, Wave 1 slugs, `/rent/[slug]`, `/blog/[slug]`)
- Canonical + robots logic on landings
- Wave 1: no fleet grid, no Dehradun prices, partner CTAs, no false LocalBusiness
- Quote form city required; Dehradun vehicle only when city=Dehradun + fleet form
- Sitemap index URL `sitemap.xml` + five children
- Admin cookie auth
- Existing bookings readable
- Public images under `public/images/...`
- CODEBASE-KT.md / Wave 1 QA script intent

---

## 5. Proposed migration approach

1. **Additive schema on Neon** via Prisma Migrate (or careful `db push` only on empty Neon after inspect) — never `migrate reset` on production.
2. Point Prisma `provider = postgresql`, `url = env("DATABASE_URL")`.
3. Keep TypeScript landings as fallback until SeoPage rows are verified equal.
4. Seed: change to **idempotent upsert for bootstrap only**; stop overwriting admin CMS data on every Render build.
5. Migrate blogs/landings with scripts that preserve slug/title/H1/content (Phase 6).
6. Phone/WhatsApp: defaults from `lib/constants.ts` / env; admin UI + API cannot mutate protected keys.

**Local note:** Current `.env` still uses SQLite. Neon URL must be set in Render (and local when testing CMS) without committing secrets.

---

## 6. Implementation phases

| Phase | Scope | Production risk |
|-------|--------|-----------------|
| 1 | Audit (this doc) | None |
| 2 | Prisma foundation + Neon + phone API lock + seed safety | Medium if migrate wrong — mitigate by additive-only |
| 3 | Admin CMS UI/API for entities | Low if behind `/admin` |
| 4 | Dual page resolution (legacy → DB) | High — gate carefully |
| 5 | Sitemap/schema/internal links for DB pages | Medium |
| 6 | Legacy content → DB migration scripts | High for SEO if rewritten — copy-preserve only |
| 7 | Full QA + Wave 1 regression | — |

---

## 7. SEO / data-loss risks

| Risk | Mitigation |
|------|------------|
| Slug collision (new DB page vs Wave 1) | Legacy slug always wins until explicit migrate flag |
| Build seed wipes Neon vehicles | Remove auto-seed from production build; idempotent seed only |
| SQLite → Neon empty DB loses bookings | Export/import or run only on Neon that already has data; never reset |
| Phone changeable in admin | Server-side denylist on settings PUT |
| Thin auto pages | DRAFT default; indexable separate; quality gate |
| Partner pages leak fleet | Keep `enquiryCity` / serviceMode PARTNER checks |
| Blog URL change | Migrate with same slugs; dual-read fallback |
| Canonical collapse | Per-page canonical; no default-to-hub for uniques |
| Real Neon URL in git | Placeholder only in `.env.example` |

---

## 8. Files likely to change (by phase)

**Phase 2:** `prisma/schema.prisma`, `prisma/seed.ts`, `package.json` (build script), `.env.example`, `lib/prisma.ts`, `lib/settings.ts`, `app/api/admin/settings/route.ts`, `components/admin/SettingsAdmin.tsx`, maybe `prisma/migrations/*`

**Phase 3:** `app/admin/**`, `app/api/admin/**`, new admin components

**Phase 4:** `app/(public)/[slug]/page.tsx`, `app/(public)/blog/**`, new `lib/cms/*` resolvers

**Phase 5:** `lib/sitemap-sets.ts`, `lib/schema-org.ts`

**Phase 6:** `scripts/migrate-*.ts` (keep `data/*` until verified)

**Do not touch casually:** Wave 1 content files, existing slug strings, `middleware` matcher without care, public image paths referenced by seed.

---

## 9. Credential note

The Neon connection string must live only in host env / local `.env` (gitignored).  
`.env.example` must use a **placeholder**, never a real password URL.
