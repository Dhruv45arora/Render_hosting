# AroraCars SEO wave — audit + implementation report

Date: 2026-10-31  
Scope: Preserve ranking equity; improve intent alignment, CTR, internal links, and host canonicalization.

## 1. Audit summary (Phase 1)

| Area | Finding |
|------|---------|
| Framework | Next.js 14 App Router |
| Landings | `app/(public)/[slug]/page.tsx` + `data/pages.ts` + `data/page-enrichments.ts` |
| Vehicles | `app/(public)/rent/[slug]/page.tsx` + Prisma `Vehicle` |
| Metadata | Per-page `title` / `description` / `alternates.canonical` via `SITE_URL` |
| Schema | CarRental, WebPage, BreadcrumbList, FAQPage, Product/Offer on vehicle pages |
| Sitemap | Index + cities/services/vehicles/routes/guides |
| Robots | Allow `/`, disallow `/admin/`, `/api/` |
| Host | `SITE_URL=https://aroracars.com` (apex). GSC also saw `www` — **split equity risk** |

## 2. Page classification (GSC)

### PROTECT (approx. positions 1–10)
| URL | Pos | Impr | Notes |
|-----|-----|------|-------|
| `/three-wheeler-auto-rental-dehradun` | 5.84 | 594 | Thin hub; CTR 5% — improve SERP + FAQs, keep H1 |
| `/rent/e-rickshaw-rental-dehradun` | 4.25 | 147 | Protect; light description + template UX only |
| `/rent/auto-rickshaw-rental-dehradun` | 6.49 | 209 | Protect; light description |
| `/chota-hathi-mini-truck-rental-dehradun` | ~7 | 125+ | Strengthen booking FAQs / use cases |
| `/luxury-car-rental-dehradun` | 9.38 | 50 | Light CTR + wedding/airport links |
| `/` | 8.02 | 295 | CTR already strong; add cluster links only |

### PUSH (approx. 10–20)
| URL | Pos | Impr | Notes |
|-----|-----|------|-------|
| `/bike-rental-dehradun` | 12.06 | 263 | Bullet / Himalayan / Clock Tower / ISBT intents |
| `/car-rental-dehradun` | 13.85 | 96 | With-driver + monthly + airport FAQs; fix truncated intro |

### CONSOLIDATE (do not clone)
- Auto wording variants → three-wheeler hub + specific `/rent/*` cards  
- Chota Hathi booking variants → existing mini-truck hub  
- Two-wheeler umbrella already canonicals to bike hub where applicable  

### DEVELOP later (not in this wave)
- Wedding / airport / monthly deep pages already exist — monitor only unless GSC gaps grow  

## 3. Files changed

- `next.config.js` — permanent `www` → apex redirect  
- `data/pages.ts` — car / bike / three-wheeler / chota hathi / luxury hubs  
- `data/page-enrichments.ts` — bike enrichment aligned with GSC intents  
- `data/vehicles.ts` — seed copy for auto + e-rickshaw  
- `scripts/repair-broken-vehicle-images.js` — refresh those two descriptions on build  
- `app/(public)/page.tsx` — meta + home links to auto / Chota Hathi  
- `app/(public)/rent/[slug]/page.tsx` — hub link + how-to-book (all vehicles)  
- `docs/seo-gsc-wave-report.md` — this report  

## 4. What changed on priority URLs

| URL | Intent | Changes |
|-----|--------|---------|
| `/car-rental-dehradun` | Car hire Dehradun (self + chauffeur) | Fixed truncated intro; CTR description; FAQs for with-driver + monthly; airport/ISBT section; related links |
| `/bike-rental-dehradun` | Bike / Bullet / Himalayan hire | CTR description; Bullet/Himalayan/Clock Tower/ISBT sections + FAQs; related links |
| `/three-wheeler-auto-rental-dehradun` | Auto / 3W / e-rickshaw hub | CTR title+description; per-day / e-rickshaw FAQs; booking section; commercial cluster links |
| `/chota-hathi-mini-truck-rental-dehradun` | Chota Hathi booking | Title/description for booking intent; use-case + pricing honesty FAQs |
| `/luxury-car-rental-dehradun` | Luxury chauffeur | Description + wedding/airport FAQ; quote honesty section |
| `/rent/auto-rickshaw-*` / `e-rickshaw-*` | Vehicle product | Description refresh + shared how-to-book / hub link |
| `/` | Brand + rental entry | Meta tweak; internal links to auto + Chota Hathi |

## 5. Internal links added

- Home → three-wheeler hub, Chota Hathi hub  
- Car hub → wedding, luxury, monthly, airport (existing + new relations)  
- Bike hub → Clock Tower / ISBT / Mussoorie bike / scooty  
- Three-wheeler ↔ Chota Hathi / scooty / ISBT / Clock Tower  
- Every `/rent/*` → category hub  

## 6. Metadata / schema / technical

- **Metadata:** CTR-oriented titles/descriptions on hubs above (no “cheapest/#1”)  
- **Schema:** Unchanged structure (FAQ grows where FAQs added — already rendered on page)  
- **Technical:** `www.aroracars.com` → `https://aroracars.com` 308/permanent redirect  

## 7. Cannibalization notes

- Keep hub + vehicle URLs: hub = category intent; `/rent/*` = model/product intent  
- Do **not** create separate pages for “auto rent per day” / “electric auto near me” — mapped into hub FAQs + e-rickshaw product  
- Luxury vs wedding: linked, intents kept separate  

## 8. Intentionally NOT changed

- Aggressive H1 rewrites on protecting pages  
- Wave 2/3 programmatic city pages  
- Invented prices, ratings, testimonials  
- Mass blog generation  
- URL renames / soft-404 redirects of ranking pages  

## 9. Owner verification needed

- Confirm preferred host remains **apex** (`aroracars.com`) in DNS + GSC preferred domain  
- After deploy, request indexing for updated hubs if needed  
- Vehicle descriptions in DB refresh on next Render build via repair script  

## 10. Priority monitoring table

| URL | Baseline pos | Impr | Target topic | Change | Why it may help | Risk |
|-----|--------------|------|--------------|--------|-----------------|------|
| `/three-wheeler-auto-rental-dehradun` | 5.84 | 594 | Auto / 3W / e-rickshaw | CTR + FAQs + links | Better snippet + intent coverage | Low |
| `/bike-rental-dehradun` | 12.06 | 263 | Bullet / Himalayan / local pickup | Content + CTR | Push toward page 1 | Low–med |
| `/car-rental-dehradun` | 13.85 | 96 | Car hire / with driver / monthly | FAQs + intro fix | Relevance + CTR | Low–med |
| `/chota-hathi-mini-truck-rental-dehradun` | ~7 | 125+ | Chota Hathi booking | Booking FAQs | Query match | Low |
| `/luxury-car-rental-dehradun` | 9.38 | 50 | Luxury chauffeur | Light CTR + FAQ | Snippet clarity | Low |
| `/rent/e-rickshaw-rental-dehradun` | 4.25 | 147 | E-rickshaw | Description + template | Protect + clarity | Low |
| `/rent/auto-rickshaw-rental-dehradun` | 6.49 | 209 | Auto product | Description + template | Protect + clarity | Low |
| `/` | 8.02 | 295 | Brand entry | Links + meta | Cluster equity | Low |
| Host `www` → apex | — | — | Canonical host | 301/308 | Consolidate GSC | Med* |

\*Med only if any bookmarks/CDN still assume www — redirect is permanent and correct for current `SITE_URL`.

## 11. Remaining opportunities

- Dedicated SERP tests on wedding + airport titles once car hub moves  
- Expand scooty hub for “ISBT scooty” if impressions rise  
- CWV / image weight pass on LCP heroes  
- Ensure GSC property set includes apex after www redirect  

## 12. Follow-up from architecture audit

Audit ([SEO architecture audit](d2879362-69e9-459f-abfd-2c7c9b520347)) confirmed: static hubs + enrichments are source of truth; CMS cannot override locked slugs; main debt was thin auto/chota hubs, www split, and CarRental spam on every `/rent/*`.

Additional follow-ups applied:
- Removed duplicate `CarRental` LocalBusiness JSON-LD from vehicle PDPs (keep Product/Offer + breadcrumbs; org stays on home/hubs)
- Header nav now includes Auto + Mini Truck (high-impression commercial clusters)
