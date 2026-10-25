# Arora Cars — Codebase Knowledge Transfer (KT)

Last updated for the Wave 1 national SEO rollout (114 partner-city URLs + existing Dehradun product).

Use this document when handing the project to another developer before making changes.

---

## 1. What this project is

| Item | Detail |
|------|--------|
| Product | Vehicle rental marketplace / lead-gen site for **Arora Cars** |
| Live site | `https://aroracars.com` (canonical host; set via `NEXT_PUBLIC_SITE_URL`) |
| Stack | **Next.js 14** (App Router) + **React 18** + **TypeScript** + **Prisma** |
| Database today | **SQLite** file `prisma/dev.db` |
| Hosting | Render (Node web service, not a static host) |
| Phone / WhatsApp | `8445619130` (defaults in `lib/constants.ts`, overridable in DB `SiteSetting`) |

**Business split (important):**

1. **Dehradun** — real desk, real fleet in DB, prices, `/rent/[model]` pages, `CarRental` schema at Clock Tower.
2. **Wave 1 cities** (Delhi, Mumbai, Bangalore/Bengaluru, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad, Jaipur, Goa, Chandigarh) — **partner quote pages only**. No fleet inventory, no prices, no fake offices. CTA: *Request a Quote* / *Check Availability with Local Rental Partners*.

---

## 2. High-level architecture

```
Browser
  → Next.js App Router (app/)
      → Landing pages from TypeScript data (data/*.ts)
      → Dehradun fleet from Prisma SQLite (via lib/queries.ts)
      → Forms POST to app/api/bookings
      → Admin UI under /admin (cookie auth via middleware.ts)
  → Static files from public/ (images, logo, manifest)
```

There is **no separate backend repo**. APIs are Next.js Route Handlers under `app/api/`.

---

## 3. Folder map (what matters)

```
Render_hosting/
├── app/                    ← ACTIVE Next.js app (source of truth)
│   ├── (public)/           ← Public site layouts + pages
│   ├── admin/              ← Admin UI
│   ├── api/                ← REST-style API routes
│   ├── sitemap*.xml/       ← Sitemap route handlers
│   ├── robots.ts
│   ├── layout.tsx          ← Root HTML / default metadata
│   └── globals.css         ← Global styles
├── components/             ← Shared React UI (header, footer, forms, cards)
├── data/                   ← STATIC content: landings, Wave 1, blog, vehicle seed helpers
├── lib/                    ← Prisma, queries, schema.org, sitemaps, auth, constants
├── prisma/                 ← Schema, seed, SQLite DB file
├── public/                 ← STATIC assets served as-is (images, logo, manifest)
├── scripts/                ← Local QA only (excluded from Next typecheck)
├── middleware.ts           ← Protects /admin and /api/admin
├── next.config.js
├── package.json
├── tsconfig.json           ← excludes `src/` and `scripts/`
└── src/                    ← LEGACY Create React App — NOT used by Next.js
```

### Ignore / do not edit for production features

| Path | Why |
|------|-----|
| `src/` | Old CRA. Next.js does not serve it. Safe to ignore for new work. |
| `scripts/wave1-qa.ts` | Local audit of Wave 1 pages. Excluded from build via `tsconfig.json`. Run manually: `npx tsx scripts/wave1-qa.ts` |

---

## 4. Static vs dynamic (critical for changes)

### A. Static files (`public/`)

Served at the site root. Example: `public/logo512.png` → `https://aroracars.com/logo512.png`.

| Path | Purpose |
|------|---------|
| `public/logo512.png` | Logo image (512). **Header/footer currently use text “ARORA CARS”, not this PNG.** |
| `public/logo192.png` | Smaller logo variant |
| `public/favicon.ico` / `public/favicon.png` | Browser favicons |
| `public/manifest.json` | PWA-style manifest name/colours |
| `public/images/fleet/*` | Illustrative model-family photos for Dehradun fleet cards (hatchback, sedan, SUV, bikes, scooty, tempo, etc.) |
| `public/images/categories/*` | Category fallbacks (wedding, auto, mini truck, sedan, SUV, bike, scooty, tempo) |
| `public/images/destinations/*` | Mussoorie, Rishikesh, Haridwar, Char Dham style images |
| `public/images/vehicles/` | Folder present (for vehicle-specific assets if added) |

**Rules for images:**

- Fleet/category images are **illustrative**, not guaranteed photos of a specific unit in stock (`data/vehicle-images.ts` documents this).
- **Wave 1 partner-city pages must NOT use Dehradun fleet or wedding photos.** Those pages set `heroImage: ""` and hide the fleet grid.
- Image path mapping for vehicles: `data/vehicle-images.ts` + defaults in `lib/constants.ts` (`CATEGORY_IMAGES`).

### B. Static content in code (`data/`)

Not in the database. Changing SEO copy / Wave 1 pages = edit TypeScript, then redeploy.

| File | Role |
|------|------|
| `data/pages.ts` | Dehradun landings + merges Wave 1; `getPage(slug)` |
| `data/page-enrichments.ts` | Overrides for selected Dehradun pages (intro, FAQs, `canonicalSlug`) |
| `data/wave1-hubs.ts` | Batch 1 — 11 city hub pages |
| `data/wave1-pages.ts` | Batches 2–9 — remaining ~103 Wave 1 pages; also patches hub `relatedSlugs` |
| `data/blog.ts` | Blog guides (HTML strings) |
| `data/vehicles.ts` | Seed list of Dehradun vehicles (used when DB empty / seeding) |
| `data/vehicle-images.ts` | Maps model families → `/images/...` paths |

### C. Dynamic data (database — Prisma / SQLite)

| Model | Used for |
|-------|----------|
| `Vehicle` | Dehradun fleet: price, deposit, availability, image path, etc. |
| `SeasonalPrice` | Seasonal price overrides |
| `Booking` | Quote / booking form submissions |
| `SiteSetting` | Phone, WhatsApp, email, marketing numbers |
| `PageOverride` | Optional admin override of hero text / pricing blurb on a landing |

Schema: `prisma/schema.prisma`  
Seed: `prisma/seed.ts` (runs on `npm run build` today)  
Client: `lib/prisma.ts`

---

## 5. Routing (how a URL becomes a page)

| URL pattern | File | Data source |
|-------------|------|-------------|
| `/` | `app/(public)/page.tsx` | Featured vehicles from DB + hardcoded Dehradun routes |
| `/[slug]` | `app/(public)/[slug]/page.tsx` | `getPage(slug)` from `data/pages.ts` (+ enrichments / Wave 1) |
| `/rent/[slug]` | `app/(public)/rent/[slug]/page.tsx` | Vehicle from DB; Product schema + booking form |
| `/blog`, `/blog/[slug]` | `app/(public)/blog/...` | `data/blog.ts` |
| `/admin/*` | `app/admin/...` | Auth cookie + Prisma |
| `/api/bookings` | `app/api/bookings/route.ts` | Creates `Booking` row |
| `/api/admin/*` | `app/api/admin/...` | Admin CRUD |
| `/sitemap.xml` | `app/sitemap.xml/route.ts` | Index of child sitemaps |
| `/sitemap-cities.xml` etc. | Matching `app/sitemap-*.xml/route.ts` | `lib/sitemap-sets.ts` |
| `/robots.txt` | `app/robots.ts` | Points at `/sitemap.xml` |

**Legacy flat URLs stay flat** (e.g. `/car-rental-dehradun`, `/car-rental-delhi`). Do not introduce nested `/car-rental/delhi/...` trees that would split Dehradun SEO.

---

## 6. Wave 1 SEO architecture (114 URLs)

### Cities

Delhi, Mumbai, Bengaluru (titles say **Bangalore**), Hyderabad, Pune, Chennai, Kolkata, Ahmedabad, Jaipur, Goa, Chandigarh.

### URL types per city (pattern)

| Type | Example |
|------|---------|
| City hub | `/car-rental-delhi` |
| Self-drive | `/self-drive-car-rental-delhi` |
| With driver | `/chauffeur-driven-car-rental-delhi` |
| Airport | `/delhi-airport-car-rental` (Goa: **one** URL for Mopa + Dabolim) |
| Station | `/car-rental-near-new-delhi-railway-station` |
| SUV | `/suv-rental-delhi` |
| Monthly | `/monthly-car-rental-delhi` |
| Routes | `/car-rental-delhi-to-agra` |
| Extras | `/wedding-car-rental-delhi`, `/bike-rental-goa` |
| Renamed Goa route | `/car-rental-north-goa-to-south-goa` (not `goa-to-south-goa`) |

### Spelling rules

| Search wording (title/H1) | URL slug |
|---------------------------|----------|
| Bangalore | `bengaluru` |
| Mysore | `mysuru` |
| Pondicherry | `puducherry` |

Do **not** create duplicate URLs for synonym spellings.

### Partner-page behaviour (`enquiryCity` set)

Implemented in `app/(public)/[slug]/page.tsx`:

- Shows quote form (`components/QuoteForm.tsx`) with **required rental city**
- Hides Dehradun fleet grid
- No `CarRental` / `LocalBusiness` schema on that page
- Uses `WebPage` + `BreadcrumbList` + `FAQPage` (only if FAQs exist on page)
- CTA labels can be overridden: `primaryCta`, `secondaryCta`, `submitLabel`
- Header/footer switch to a reduced nav via `isWave1PartnerPath()` in `data/wave1-pages.ts` (hides Dehradun fleet/pricing links)

### Sitemap buckets (`lib/sitemap-sets.ts`)

| File | Contents |
|------|----------|
| `sitemap-cities.xml` | Homepage, Dehradun hub, Wave 1 city hubs |
| `sitemap-services.xml` | Category-type pages (self-drive, SUV, monthly, wedding, bike, …) |
| `sitemap-routes.xml` | Airports, stations, outstation routes |
| `sitemap-vehicles.xml` | `/rent/*` + fleet page |
| `sitemap-guides.xml` | Info pages + blog |

GSC: submit **only** `https://aroracars.com/sitemap.xml` after deploy.

---

## 7. Forms and “backend”

### Quote / booking

| Piece | Path |
|-------|------|
| Shared form UI | `components/QuoteForm.tsx` |
| Dehradun vehicle wrapper | `components/BookingForm.tsx` → QuoteForm with `defaultCity="Dehradun"` + vehicle slug |
| API | `POST /api/bookings` → `app/api/bookings/route.ts` |
| Sticky WhatsApp | `components/StickyCta.tsx` — message asks for rental city (not “book Dehradun” by default) |

**City rule:** A Dehradun fleet vehicle is attached only if `city === "Dehradun"` **and** the form was opened from a `/rent/...` vehicle page. All other cities are partner quotes stored with a message flag; `vehicleSlug` / `vehicleName` cleared.

### Admin

| Piece | Path |
|-------|------|
| Auth | Cookie `ac_admin`; `lib/auth.ts`; gated by `middleware.ts` |
| Login | `/admin/login` |
| Vehicles / bookings / pricing / pages / settings | `app/admin/*` + `app/api/admin/*` |

Env vars (see `.env.example`):

```
DATABASE_URL=file:./dev.db
ADMIN_USER=...
ADMIN_PASSWORD=...
AUTH_SECRET=...
NEXT_PUBLIC_SITE_URL=https://aroracars.com
```

---

## 8. Schema.org rules

| Schema | Where |
|--------|--------|
| `CarRental` / LocalBusiness-style | Dehradun entity only (`lib/schema-org.ts` → `localBusinessSchema`). Emitted on homepage and Dehradun landings / rent pages — **not** on Wave 1 partner pages. |
| `WebPage` + `BreadcrumbList` | Landing pages |
| `FAQPage` | Only when FAQs are rendered on that page |
| `Product` + `Offer` | Dehradun `/rent/[slug]` only |
| Reviews / AggregateRating | **Do not add** |

---

## 9. Brand / logo (current state)

| What | Where |
|------|--------|
| Visible header/footer mark | **Text**: `ARORA` + `CARS` in `components/Header.tsx` and `components/Footer.tsx` |
| Styles | `.ac-logo` in `app/globals.css` |
| Image file | `public/logo512.png` — present, but **not wired into Header/Footer** in the Next app today |
| Old CRA references | `src/` may still mention `/logo512.png`; ignore for Next work |

To switch to an image logo: add/use `public/logo512.png` (or `public/images/logo.svg`) in `Header.tsx` / `Footer.tsx`.

---

## 10. Key libraries / helpers

| File | Responsibility |
|------|----------------|
| `lib/constants.ts` | Site name, URL, phone, category hubs, WhatsApp helpers |
| `lib/queries.ts` | `getAllVehicles`, `getVehiclesByCategory`, featured, by slug |
| `lib/settings.ts` | Read/write `SiteSetting` |
| `lib/schema-org.ts` | JSON-LD builders |
| `lib/sitemap-sets.ts` | Classify URLs into sitemap files |
| `lib/auth.ts` | Admin cookie token |

---

## 11. Safe change checklist

Before shipping a change, confirm:

1. **Dehradun pages** still show fleet / prices only where intended.
2. **Wave 1 pages** never show fleet grid, ₹ prices, deposits, fake offices, or Dehradun fleet images.
3. Quote form always collects **rental city**.
4. Canonical = the page’s own URL (unless `canonicalSlug` intentionally redirects indexing).
5. New landing slug is registered in `LANDING_PAGES` (via Wave 1 files or `pages.ts`) so `generateStaticParams` and sitemaps pick it up.
6. Internal links only to real slugs; Wave 1 hubs should not link to `/car-fleet-dehradun` or `/car-rental-pricing-dehradun`.
7. Do not create synonym duplicate URLs (Bangalore vs Bengaluru, etc.).
8. Run `npx tsx scripts/wave1-qa.ts` after Wave 1 content/URL changes.
9. Deploy is one Node build (`npm run build` → `npm start`); Search Console sitemap update is **after** production is live.

---

## 12. Common tasks — where to edit

| Task | Edit |
|------|------|
| Change Dehradun landing copy | `data/pages.ts` and/or `data/page-enrichments.ts` |
| Change Wave 1 city hub | `data/wave1-hubs.ts` |
| Change Wave 1 airport / route / self-drive / etc. | `data/wave1-pages.ts` |
| Add/change vehicle seed | `data/vehicles.ts` + `prisma/seed.ts` |
| Change image mapping | `data/vehicle-images.ts`, files under `public/images/` |
| Change phone / site URL defaults | `lib/constants.ts` + env / Admin settings |
| Change header/footer | `components/Header.tsx`, `components/Footer.tsx` |
| Change homepage | `app/(public)/page.tsx` |
| Change booking/quote logic | `components/QuoteForm.tsx`, `app/api/bookings/route.ts` |
| Change sitemap rules | `lib/sitemap-sets.ts` |
| Switch DB to Postgres | `prisma/schema.prisma` datasource + `DATABASE_URL` (app models stay the same) |
| Global CSS / brand colours | `app/globals.css` |

---

## 13. Local commands

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev          # http://localhost:3000
npm run build        # generate + db push + next build (no auto-seed)
npm start

npm run migrate:cms          # Phase 6: copy static → CMS as DRAFT (idempotent)
npm run migrate:cms:publish  # same, but status PUBLISHED (static still wins)
npm run qa:wave1             # Wave 1 inventory / leak checks
npm run qa:cms               # dual-render + partner CarRental safety
npm run qa:all               # wave1 + cms
```

Admin: `/admin/login` (credentials from env). Dual render: static/Wave 1 slug wins, then published CMS.

---

## 14. Mental model (one paragraph)

The **live product UI** is Next.js under `app/`. **Dehradun inventory and bookings** are Postgres (Neon) via Prisma. **SEO landings** still ship from **static TypeScript** in `data/` (Wave 1 + Dehradun); published CMS `SeoPage` / blog rows fill **new** slugs only. Resolvers live in `lib/cms/`. Partner-city pages must never emit Dehradun `CarRental` or show the Dehradun fleet. The old **`src/` CRA app is not part of the runtime**.

---

## 15. Related docs / canvases (strategy, not runtime)

Strategy canvases may exist under the Cursor project `canvases/` folder (Wave 1 inventory, keyword validation, page specs). They do **not** ship with the Next.js build. Runtime truth for Wave 1 is `data/wave1-hubs.ts` + `data/wave1-pages.ts`.
