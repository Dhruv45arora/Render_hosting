# AroraCars.com — Phase 1 SEO Audit & Keyword-to-Page Map

**Date:** 2026-11-10  
**Scope:** Audit + mapping only. **No production code was modified in this phase.**  
**Site:** https://aroracars.com/  
**Stack:** Next.js 14 App Router · static `LANDING_PAGES` (+ CMS dual-render) · Prisma vehicles · apex `SITE_URL`

---

## Executive verdict

AroraCars already has a **large, intentional SEO surface** (~640 static landings + ~140 vehicle PDPs + blogs + CMS). Live sitemaps expose **~789 `<loc>` URLs**.

Organic risk is **not “missing pages”** as much as:

1. **Scale / thinness risk** on Wave 2–3 taxi & city templates (spam-update sensitivity).  
2. **Intent overlap** (car vs taxi vs chauffeur; hub vs `/rent/*`; route car vs route taxi).  
3. **Trust-page gaps** (no dedicated Privacy / Refund / Driver / List-your-vehicle pages found).  
4. **Off-topic `/property`** static HTML (flats brokerage) living on the car-rental domain.  
5. **Field performance / TTFB** (Render Free) affecting engagement — covered in prior perf docs; not re-audited here as SEO content.

**Do not mass-create new location pages in Phase 2+.** Improve money pages first; add pages only when intent + fulfilment are proven.

---

## 1. Route inventory (repository-verified)

### 1.1 App Router surfaces

| Route pattern | Type | Indexability | Notes |
|---------------|------|--------------|-------|
| `/` | Homepage | Index | Brand + hubs |
| `/[slug]` | Landing (static + CMS) | Index if `indexable` | Core of SEO |
| `/rent/[slug]` | Vehicle PDP | Index | Product/Offer schema |
| `/blog`, `/blog/[slug]` | Guides | Index if published/indexable | ~20 static blogs |
| `/search` | Utility | **noindex, follow** | Correct |
| `/property` (+ `/propery` → `/property`) | Standalone HTML | Indexable by default | **Off-topic risk** |
| `/admin/*` | Admin | **noindex** | Correct |
| `/api/*` | APIs | Disallowed in robots | Correct |
| `/sitemap.xml` + 5 children | Sitemaps | — | Live |

### 1.2 Static landing composition (`data/pages.ts` assembly)

| Source | Approx. count | Role |
|--------|---------------|------|
| Core Dehradun landings (`CORE_LANDING_PAGES`) | ~57 (slug lines in `pages.ts`) | Hubs, routes, trust |
| Wave 1 city hubs | 11 | Partner quote cities |
| Wave 1 pages | 48 | Partner city/service |
| Taxi cluster (`taxi-pages.ts`) | 45 | Taxi hub + cities + routes |
| Wave 2 (manifest) | **302** | Uttarakhand city/service/vehicle SEO |
| Wave 3 (manifest) | **122** | Airport/railway/intercity taxi |
| **LANDING_PAGES total (reports)** | **~640** | Published assembly |

### 1.3 Other indexable content

| Source | Count | Notes |
|--------|-------|-------|
| Seed / DB vehicles | ~140 seed `slug:` lines; live PDP count = DB ACTIVE | `/rent/{slug}` |
| Blog posts | ~20 static (+ CMS blogs) | Guides sitemap |
| Live sitemap `<loc>` sum | **789** | cities 13 + services 143 + routes 381 + vehicles 223 + guides 29 |

CMS `SeoPage` / `Route` rows can add more when published — dual-render in `lib/cms/resolve-landing.ts`.

### 1.4 Trust / business pages found

| Exists | Slug |
|--------|------|
| Yes | `/about-us`, `/contact-book-now`, `/how-to-book`, `/faq` |
| Yes | `/terms-and-conditions`, `/cancellation-policy`, `/insurance-info` |
| Yes | `/documents-required-self-drive`, `/car-rental-pricing-dehradun` |
| **Not found as landings** | Privacy Policy, Refund Policy, Driver Registration, List Your Vehicle / Owner |

### 1.5 Soft-canonical aliases (enrichments — keep live)

| Alias slug | Canonical target |
|------------|------------------|
| `dehradun-to-mussoorie-self-drive` | `car-rental-dehradun-to-mussoorie` |
| `char-dham-yatra-car-rental` | `car-rental-char-dham-yatra` |
| `two-wheeler-rental-dehradun` | `bike-rental-dehradun` |

These stay index-suppressed via `canonicalSlug` / `indexable` logic — **do not delete**.

---

## 2. Technical SEO snapshot (current state)

| Area | Status | Issue / note |
|------|--------|----------------|
| Preferred host | Apex `https://aroracars.com` | www → apex permanent redirect in `next.config.js` |
| robots.txt | Allow `/`; disallow `/admin/`, `/api/` | OK; `/property` not blocked |
| Sitemap | Index + 5 shards | Includes large Wave route set |
| Canonicals | Per-page via `SITE_URL` + path | Soft aliases via enrichments |
| Metadata API | Landings + rent + blog | Generally present |
| Schema | CarRental on Dehradun desk pages; Service on partner; FAQ when FAQs exist; Product/Offer on PDPs; BreadcrumbList | Partner pages correctly skip CarRental (`emitLocalBusiness: !partner`) |
| Search | `/search` noindex | OK |
| Admin | noindex | OK |
| Ownership messaging | Wave 1/taxi copy stresses partners/quotes | Core Dehradun still “desk + fleet” — must stay truthful |
| CWV / TTFB | Perf work done separately | Free Render sleep still hurts engagement |
| Fake ratings | Not found in schema builders | Keep policy |

**No destructive fixes in Phase 1.**

---

## 3. Priority page inventory (money pages)

Format: **URL | Type | Target KW | Intent | Quality (audit) | Issues | Recommended action**

| URL | Type | Target KW | Intent | Content | Issues | Action |
|-----|------|-----------|--------|---------|--------|--------|
| `/` | Home | Arora Cars Dehradun rental | Navigational / multi | Strong CTAs + hubs | Broad | Light CTR + cluster links only |
| `/car-rental-dehradun` | Category hub | car rental in Dehradun | Commercial | Improved Oct 31 wave | Competes with self-drive/chauffeur/taxi | **Improve** as umbrella; link out |
| `/self-drive-car-rental-dehradun` | Category | self drive car rental Dehradun | Commercial | Solid | — | Protect + deepen docs/deposit |
| `/chauffeur-driven-car-rental-dehradun` | Category | car rental with driver Dehradun | Commercial | Solid | Overlap vs taxi hub | Clarify vs `/taxi` |
| `/bike-rental-dehradun` | Category | bike rental Dehradun | Commercial | GSC PUSH (~pos 12 hist.) | Bullet/Himalayan intents | **Push** content/CTR |
| `/scooty-on-rent-dehradun` | Category | scooty on rent Dehradun | Commercial | Solid | ISBT/railway intents | Expand pickup FAQs |
| `/suv-rental-dehradun` | Category | SUV rental Dehradun | Commercial | OK | — | Internal links from car hub |
| `/luxury-car-rental-dehradun` | Category | luxury car rental Dehradun | Commercial | Light | Low impressions hist. | Light CTR + wedding links |
| `/wedding-car-rental-dehradun` | Category | wedding car rental Dehradun | Commercial | OK | — | Protect |
| `/tempo-traveller-rental-dehradun` | Category | Tempo Traveller Dehradun | Commercial | OK | — | Link Char Dham |
| `/three-wheeler-auto-rental-dehradun` | Category | auto rickshaw rental Dehradun | Commercial | PROTECT hist. | CTR historically modest | SERP + FAQ; keep hub |
| `/chota-hathi-mini-truck-rental-dehradun` | Category | chota hathi booking Dehradun | Commercial | PROTECT hist. | — | Booking FAQs |
| `/monthly-car-rental-dehradun` | Duration | monthly car rental Dehradun | Commercial | Exists | Thin vs demand | Strengthen terms |
| `/weekly-car-rental-dehradun` | Duration | weekly car rental | Commercial | Exists | — | Link from monthly/self-drive |
| `/jolly-grant-airport-car-rental` | Airport | Dehradun airport car rental | Commercial | Exists | vs airport taxi | Cross-link taxi |
| `/taxi` | Taxi hub | taxi service Uttarakhand | Commercial | Good hub | — | Protect as taxi umbrella |
| `/taxi-service-in-dehradun` | City taxi | taxi service in Dehradun | Commercial | Exists | vs chauffeur car | Clarify chauffeur-only |
| `/dehradun-to-mussoorie-taxi` | Route taxi | Dehradun to Mussoorie taxi | Commercial | Exists | vs car route page | Keep both if intent split |
| `/car-rental-dehradun-to-mussoorie` | Route rental | car rental Dehradun Mussoorie | Commercial | Exists | vs taxi | Self-drive + chauffeur rental |
| `/dehradun-airport-taxi` | Airport taxi | Dehradun airport taxi / Jolly Grant | Commercial | Exists | Naming | Align with Jolly Grant KW |
| `/char-dham-taxi-service-from-dehradun` | Pilgrimage | Char Dham taxi | Commercial | Exists | vs car Char Dham | Keep taxi vs rental split |
| `/car-rental-char-dham-yatra` | Pilgrimage rental | Char Dham car rental | Commercial | Exists | — | Protect |
| `/rent/auto-rickshaw-rental-dehradun` | PDP | auto rickshaw rent | Product | Ranking hist. | Hub overlap | Keep product intent |
| `/rent/e-rickshaw-rental-dehradun` | PDP | e rickshaw rent | Product | Ranking hist. | Hub overlap | Keep product intent |
| `/how-to-book`, `/faq`, `/about-us`, `/contact-book-now` | Trust | branded / support | Informational | OK | Missing privacy/refund | Add missing policies later |
| `/property` | Off-topic | flats brokerage | Unrelated | Standalone HTML | Brand dilution | **Decide:** noindex or move subdomain |

*Historical GSC positions/impressions referenced from prior internal report (`docs/seo-gsc-wave-report.md`) — not a fresh GSC export.*

---

## 4. Keyword → primary page map

### A. Car rental

| Keyword | Decision | Primary URL | Notes |
|---------|----------|-------------|-------|
| Car rental in Dehradun | Improve existing | `/car-rental-dehradun` | Umbrella |
| Car hire in Dehradun | Same page | `/car-rental-dehradun` | Secondary KW |
| Self drive car rental in Dehradun | Improve existing | `/self-drive-car-rental-dehradun` | Distinct intent |
| Taxi and car rental in Dehradun | Section + links | `/car-rental-dehradun` + `/taxi-service-in-dehradun` | Do not merge URLs |
| Monthly car rental in Dehradun | Improve existing | `/monthly-car-rental-dehradun` | |
| Luxury car rental in Dehradun | Improve existing | `/luxury-car-rental-dehradun` | |
| SUV rental in Dehradun | Improve existing | `/suv-rental-dehradun` | |
| Car rental in Rishikesh | Improve if Wave page exists; else Wave1/2 hub | Prefer `car-rental-in-rishikesh` / Wave asset | Partner quote — no fake fleet |
| Car rental in Haridwar | Same | Wave / taxi city pages | |
| Car rental in Mussoorie | Same + route | `self-drive-car-rental-mussoorie` / Wave | |
| Car rental in Uttarakhand | Hub section | `/` or `/taxi` + city links | Avoid thin UK mega-page |

### B. Bike / scooty

| Keyword | Decision | Primary URL |
|---------|----------|-------------|
| Bike rental in Dehradun | Improve | `/bike-rental-dehradun` |
| Scooty rental / on rent Dehradun | Improve | `/scooty-on-rent-dehradun` |
| Bike on rent Dehradun | Same as bike hub | `/bike-rental-dehradun` |
| Bike/scooty Rishikesh / Mussoorie / Haridwar | Improve Wave pages only if published | Wave 2 `bike-rental-in-*` / `scooty-rental-in-*` |
| Royal Enfield on rent Uttarakhand | Section on bike hub + Bullet PDP | `/bike-rental-dehradun` + `/rent/*bullet*` |

### C. Taxi / outstation

| Keyword | Decision | Primary URL |
|---------|----------|-------------|
| Taxi / cab service Dehradun | Improve | `/taxi-service-in-dehradun` |
| Outstation taxi from Dehradun | Section on taxi hub + routes | `/taxi` |
| Dehradun → Mussoorie / Rishikesh / Haridwar taxi | Improve existing | `/dehradun-to-*-taxi` |
| Dehradun → Delhi taxi | Improve existing | `/dehradun-to-delhi-taxi` |
| Dehradun / Jolly Grant airport taxi | Improve | `/dehradun-airport-taxi` (+ align copy to Jolly Grant) |
| Uttarakhand tour taxi | Hub | `/taxi` |
| Char Dham Yatra taxi | Improve | `/char-dham-taxi-service-from-dehradun` |
| Nainital taxi | Improve | `/taxi-service-in-nainital` |
| Tempo Traveller Dehradun / UK | Improve | `/tempo-traveller-rental-dehradun` (+ Char Dham tempo) |

### D. Do **not** create new pages for

- Synonyms already mapped (car hire = car rental hub).  
- Every Wave 4 city × service combo without partner proof.  
- “Best/cheapest” doorways.  
- Separate pages for every auto wording (already mapped to 3W hub + PDPs).

---

## 5. Cannibalization report

| Cluster | Competing URLs | Verdict | Phase 2+ action |
|---------|----------------|---------|-----------------|
| Auto / 3W / e-rickshaw | Hub + `/rent/auto-*` + `/rent/e-rickshaw-*` | **Keep all** — hub vs product | Strengthen hub FAQs; descriptive internal links; no new clones |
| Car vs chauffeur vs taxi Dehradun | `/car-rental-dehradun`, `/chauffeur-driven-*`, `/taxi-service-in-dehradun` | **Keep** — rental vs taxi quote | Explicit “self-drive / chauffeur rental vs taxi” modules |
| Mussoorie | Car route, taxi route, self-drive Mussoorie, SUV Mussoorie | **Keep** with clear H1 intent | Cross-link; avoid identical intros |
| Char Dham | Car yatra + taxi + Tempo + self-drive | **Keep** | Road-limit honesty; unique angles |
| Two-wheeler umbrella | Alias → bike hub | Already consolidated | Leave alias |
| Wave city `car-rental-in-X` vs Dehradun hubs | Many Wave 2 URLs | Risk of dilution | Monitor GSC; noindex true zeros later **with plan** |
| `/property` vs brand | Unrelated flats page | Dilution | noindex or remove from crawl priority |

---

## 6. Location-service matrix (justified vs not)

| Location | Car rental | Bike/scooty | Taxi | Notes |
|----------|------------|-------------|------|-------|
| Dehradun | **Core owned desk** | Core | Core | Highest priority |
| Mussoorie / Rishikesh / Haridwar | Route + some hubs | Partial | Strong taxi | Prefer deepen existing |
| Nainital / Haldwani | Limited | Limited | Taxi pages exist | Partner-only honesty |
| Char Dham belt | Yatra pages | No | Taxi pages | Keep motorable-limit copy |
| Delhi / Wave1 metros | Quote hubs | — | — | Partner; no CarRental schema |
| Kotdwar, Lansdowne, Tehri, etc. | Only if Wave page already live + GSC signal | — | — | **Do not mass-create** |

**Indexable location page rule (adopt):** distinct intent + unique copy + fulfilment story + internal links + not a city-name swap.

---

## 7. Structured data audit notes

| Type | Where | Risk |
|------|-------|------|
| `CarRental` LocalBusiness | Home + Dehradun landings (`emitLocalBusiness`) | OK if desk details true |
| `Service` | Partner/CMS non-Dehradun | Prefer over CarRental |
| `FAQPage` | When FAQs rendered | Eligible only if visible FAQs |
| `Product`/`Offer` | `/rent/*` | Prices must match visible rates |
| AggregateRating | Not in builders | Keep absent |
| JobPosting | Not found | Do not add for “driver registration” |

---

## 8. Prioritized Phase 2+ plan (for approval — not started)

### P0 — Protect equity (no URL changes)
1. Fresh **GSC export** (Pages + Queries) for last 3–6 months.  
2. Confirm apex property only; resubmit sitemap after any later changes.  
3. Decide fate of **`/property`** (recommend `noindex` or off-domain if not a real AroraCars line).

### P1 — Critical technical / metadata (non-destructive)
1. Audit duplicate titles among Wave 2/3 (sample + crawl).  
2. Ensure soft-canonical aliases remain consistent.  
3. Add **Privacy** (+ Refund if legally needed) as real pages — currently missing.  
4. Validate JSON-LD on top 20 money URLs (manual Rich Results).

### P2 — Content on money pages (existing URLs only)
1. `/bike-rental-dehradun`, `/car-rental-dehradun` (PUSH).  
2. Auto + Chota Hathi hubs (PROTECT + CTR).  
3. Clarify car-rental vs taxi vs chauffeur on Dehradun cluster.  
4. Airport: align Jolly Grant wording across car + taxi pages.

### P3 — Internal linking
1. Homepage → money hubs (already partially done).  
2. Wave taxi orphans → city taxi hub → `/taxi`.  
3. Blog → commercial hubs.  
4. Avoid mega-footer spam.

### P4 — New pages (only with justification)
| Candidate | Create? | Why / why not |
|-----------|---------|----------------|
| Privacy Policy | **Yes** (trust/compliance) | Missing |
| Refund Policy | **Yes if** terms don’t cover | Check legal need |
| Driver / List vehicle | **Only if** real programme | Else single “Partner with us” info page |
| More UK city doorways | **No** by default | Wave already large |
| Auto keyword clones | **No** | Mapped to hub/PDPs |

### Explicitly out of scope
CRM, dashboards, booking ops tools, mass redirects, mass noindex without GSC proof, fake reviews/prices/fleet ownership claims.

---

## 9. Phase 1 deliverable checklist

| Deliverable | Status |
|-------------|--------|
| Route / page inventory | Done |
| Technical SEO snapshot | Done |
| Keyword → page map | Done |
| Cannibalization report | Done |
| Location matrix | Done |
| Missing trust pages | Identified |
| Implementation plan for later phases | Done |
| Code changes | **None** (per instruction) |

---

## 10. Approval gate

**Stop here until you review this audit.**

Reply with which track to start in Phase 2:

1. **P0/P1 technical** (property noindex decision, privacy page, metadata/duplicate-title pass)  
2. **P2 money-page content** (bike/car/auto/Chota/taxi clarification)  
3. **GSC-first** (you upload exports; we re-prioritize before any edits)

No deployment and no SEO code edits will run until you choose.
