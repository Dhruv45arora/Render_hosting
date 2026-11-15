# AroraCars.com — Advanced SEO Recovery Audit (Phase 1)

**Date:** 2026-11-15  
**Status:** Audit only. **No production code modified in this phase.**  
**GSC export:** `aroracars.com-Performance-on-Search-2026-11-15.zip` → `docs/gsc-exports/2026-11-15/`  
**Filter:** Web · **Last 3 months** (Chart ≈ 2026-08-14 → 2026-11-13)  
**Site:** https://aroracars.com · Next.js **14.2.x** App Router · apex `SITE_URL`

---

## Executive verdict

AroraCars is **not “invisibile”** — it already ranks in the **Top 10 for its strongest niche** (auto / three-wheeler / Chota Hathi / e-rickshaw / brand). The late-October “position collapse” is best explained as **dilution of site-average metrics** after Wave 2/3 URL expansion + www→apex consolidation, **not** as proof that money pages fell from page 1 to page 4.

| What is working | What is blocking more clicks |
|-----------------|------------------------------|
| Auto hub ~pos **6.3**, 834 impr, 35 clicks | CTR on money hubs still soft (~4%) |
| Chota Hathi ~pos **6.7**, 549 impr | “chota hathi booking” CTR ~2.6% @ pos 4.3 |
| Home ~pos **7.8**, strong CTR ~11% | Bike hub stuck ~pos **15** |
| E-rickshaw / auto PDPs Top 10 | ISBT bike **0.4% CTR** @ pos ~10 |
| Mobile avg pos **8.74** | Desktop avg pos **40.99** (query-mix dilution) |

**Do not rewrite or delete** three-wheeler / Chota Hathi / auto PDP URLs. Protect them. Grow clicks via CTR + intent clarity, then push bike/car/airport into Top 10.

**Ranking guarantee:** none. Goal = measurable CTR, Top-10 keyword count, and qualified Call/WhatsApp leads.

---

## 1. GSC performance (this export)

### 1.1 Overall

| Metric | Value |
|--------|------:|
| Clicks | **298** |
| Impressions | **7,346** |
| CTR | **4.06%** |
| Avg position | **15.96** |

India: 285 / 6,814 / 4.18% / 15.96 — same story locally.

### 1.2 Devices

| Device | Clicks | Impr | CTR | Pos |
|--------|-------:|-----:|----:|----:|
| Mobile | 250 | 5,507 | 4.54% | **8.74** |
| Desktop | 48 | 1,815 | 2.64% | **40.99** |
| Tablet | 0 | 24 | 0% | 29.79 |

**Desktop hypothesis (evidence-based, not assumed breakage):** Desktop average is dragged by **deep, low-CTR, off-market queries** (Bangalore/Chandigarh/Ahmedabad/Delhi airport/test-drive/subscription) that appear at positions 45–87. Mobile impressions concentrate on Dehradun commercial/local queries where you already rank ~4–15. This is **query mix + long-tail dilution**, not proof that desktop rendering is broken. Confirm later with a device-filtered Pages/Queries export if available.

### 1.3 Host split (www vs apex)

| Host | Clicks | Impressions |
|------|-------:|------------:|
| www.aroracars.com | 195 | 4,220 |
| aroracars.com (apex) | 108 | **4,371** |

Compared with the 10 Nov export (apex 70 clicks / 3,395 impr), **apex impressions now exceed www**. Permanent www→apex redirect in `next.config.js` + `SITE_URL=https://aroracars.com` is the correct long-term setup. GSC still lists both hosts until equity fully consolidates — **expected**, not a new bug.

**Canonical hostname decision (confirmed):** keep **apex** `https://aroracars.com`. Do not flip back to www.

### 1.4 Time series — ranking “decline”

| Period | Clicks | Impr | CTR | Avg pos |
|--------|-------:|-----:|----:|--------:|
| Sep 2026 | 92 | 1,922 | 4.79% | **10.14** |
| Oct 1–20 | 84 | 1,607 | 5.23% | **9.55** |
| Oct 21–31 | 45 | 1,505 | **2.99%** | **24.97** |
| Nov 1–13 | 71 | 2,219 | 3.20% | **22.10** |

**Confirmed correlation (project history):** Wave 2/3 publish + indexed URL jump (~235 → ~746 around 24 Oct) + www→apex redirect window. Impressions rose; site-average position/CTR fell.

**Not confirmed:** a manual action / spam penalty / money-page demotion. Auto/Chota still sit in Top 10 in this same export.

**Nov 11–13 daily CTR 5–5.6%** with 8–11 clicks/day — early recovery signal (post Batch 1–3 content deploy on ~10–12 Nov); too early to claim causation.

---

## 2. Architecture snapshot (repo-verified)

| Area | Finding |
|------|---------|
| Framework | Next.js 14 App Router |
| Landings | `app/(public)/[slug]/page.tsx` + `data/pages.ts` + enrichments + Wave1/taxi/Wave2/Wave3 |
| Vehicles | `app/(public)/rent/[slug]` + Prisma |
| Metadata | Per-page title/description/canonical via `SITE_URL` |
| Soft-canonicals | Enrichment `canonicalSlug` (3 aliases) — keep |
| Robots | Allow `/`; disallow `/admin/`, `/api/`; sitemap apex |
| Schema | LocalBusiness/CarRental gated; Service; FAQ; Product/Offer on PDPs |
| Redirects | www→apex permanent; `/propery`→`/property` |
| Scale | ~640 static landings + PDPs + blogs; live sitemap previously ~789 locs |

Prior SEO batches (Nov 10–12) already improved titles/meta/FAQs on Auto, Chota, ISBT bike, Clock Tower bike, Scooty, Monthly, Jolly Grant, Car hub + Privacy page. **This audit treats those as done; next implementation should not re-edit blindly.**

---

## 3. Top pages (aggregated www+apex)

| Path | Clicks | Impr | CTR | Pos | Role |
|------|-------:|-----:|----:|----:|------|
| `/three-wheeler-auto-rental-dehradun` | 35 | 834 | 4.2% | 6.3 | **PROTECT + CTR** |
| `/` | 63 | 553 | 11.4% | 7.8 | **PROTECT** |
| `/chota-hathi-mini-truck-rental-dehradun` | 23 | 549 | 4.2% | 6.7 | **PROTECT + CTR** |
| `/rent/auto-rickshaw-rental-dehradun` | 12 | 361 | 3.3% | 8.0 | Protect product |
| `/bike-rental-dehradun` | 11 | 344 | 3.2% | **14.8** | **PUSH Top 10** |
| `/rent/e-rickshaw-rental-dehradun` | 17 | 288 | 5.9% | 5.4 | Protect |
| `/bike-rental-near-isbt-dehradun` | 1 | 234 | **0.4%** | 9.7 | **CTR crisis** |
| `/car-rental-dehradun` | 8 | 160 | 5.0% | 9.6 | Push / hold |
| `/jolly-grant-airport-car-rental` | 0 | 159 | 0% | 13.9 | Push CTR |
| `/self-drive-car-rental-dehradun` | 2 | 145 | 1.4% | 20.6 | Relevance |
| `/blog/best-scooty-*` | 0 | 138 | 0% | 9.7 | Commercialize |
| `/wedding-car-rental-dehradun` | 4 | 136 | 2.9% | 10.9 | Light CTR |
| `/bike-rental-near-clock-tower-dehradun` | 1 | 135 | 0.7% | 8.1 | CTR |
| `/scooty-on-rent-dehradun` | 1 | 84 | 1.2% | 8.3 | CTR |
| `/monthly-car-rental-dehradun` | 0 | 65 | 0% | **7.4** | Snippet mismatch |
| `/luxury-car-rental-dehradun` | 8 | 101 | 7.9% | 15.2 | Push |

**Noise (do not invest content):** `/delhi-airport-car-rental`, Ahmedabad/Bengaluru/Chandigarh Wave1 pages — 0 clicks, pos 50–75.

---

## 4. Query opportunities (non-brand first)

| Priority | Query | Clicks | Impr | Pos | Target page | Action |
|----------|-------|-------:|-----:|----:|-------------|--------|
| P0 | chota hathi booking | 2 | 77 | 4.3 | Chota hub | SERP ownership (CTR) |
| P0 | chota hathi booking dehradun | 2 | 66 | 10.0 | Chota hub | Localize snippet |
| P0 | auto rent per day | 2 | 29 | 13.7 | Auto hub | Push + FAQ |
| P0 | auto rickshaw rent per day | 2 | 15 | 18.8 | Auto hub | Push |
| P1 | rent a dost | 4 | 18 | 3.0 | Chota / Dost PDP | Protect |
| P1 | electric auto / e rickshaw near me | 2+1 | — | 1–5 | E-rickshaw PDP | Protect |
| P1 | bullet on rent in dehradun | 2 | 9 | 6.4 | Bike hub / Bullet PDP | Protect + deepen |
| P1 | wedding car rental dehradun | 1 | 7 | 8.0 | Wedding page | Protect |
| P1 | bike rental near clock tower | 0 | 13 | 9.0 | Clock Tower bike | CTR (already edited) |
| P2 | car rental at dehradun airport | 0 | 12 | 17.3 | Jolly Grant | Align KW |
| P2 | arora taxi service | 0 | 20 | 21.2 | `/taxi` | Clarify offer |
| P2 | dehradun tempo traveller | 0 | 13 | 49.5 | Tempo hub | Later |
| Ignore | bangalore/chandigarh/ahmedabad/delhi airport/test drive | 0 | high | 45–87 | Wave1 noise | No content spend |

Brand `arora cars`: 19 clicks / 94 impr / pos 2.9 — healthy; do not over-optimize for brand alone.

---

## 5. Critical investigations

### A. WWW vs non-WWW — **confirmed**

| Check | Status |
|-------|--------|
| Preferred host in code | Apex `https://aroracars.com` |
| www → apex redirect | Permanent in `next.config.js` |
| Canonical tags | Built from `SITE_URL` |
| Sitemap | Apex |
| GSC still shows both | Residual history — consolidating |

**No hostname flip.** Continue apex-only monitoring.

### B. Ranking decline — **hypothesis ranked**

| Hypothesis | Evidence | Confidence |
|------------|----------|------------|
| Wave scale diluted site avg position | Indexed ~746; impr↑ CTR↓ late Oct | **High** |
| www→apex short-term noise | Host split + redirect ~31 Oct | Medium |
| Money pages demoted | Auto/Chota still Top 10 | **Low** (contradicted) |
| Manual spam penalty | No Search Console message in exports | Unproven |
| Content Batch 1–3 hurt ranks | Deploy ~10–12 Nov; Nov 11–13 CTR up | Unlikely / premature |

### C. Cannibalisation — **keep distinct intents**

| Cluster | URLs | Verdict |
|---------|------|---------|
| Auto / 3W / e-rickshaw | Hub + auto PDP + e-rickshaw PDP + full-day | **Keep all** — hub vs product |
| Bike hub vs ISBT vs Clock Tower | Hub pos 15 vs locals pos 8–10 | Locals must not steal head terms; link up |
| Scooty hub vs “best scooty” blog | Blog impr > hub | Blog → rent CTA (done) |
| Car vs self-drive vs chauffeur vs taxi | Separate URLs | Keep; clarify modules (car hub done) |
| Soft aliases | 3 canonicalSlug pages | Keep |

**Do not merge** auto hub with PDPs or car with taxi.

### D. Desktop pos 40.99 — **not assumed technical failure**

| Evidence | Implication |
|----------|-------------|
| Off-market query impr ≈ 680 @ deep positions | Inflates desktop avg if those queries are desktop-heavy |
| Mobile pos 8.74 on commercial local | Core product SERPs are healthy on mobile |
| No device-split Pages CSV in zip | Cannot prove layout bug without that export |

**Next data ask (optional):** GSC Performance → Devices filter → export Pages for Desktop only.

---

## 6. Competitive landscape (car rental Dehradun)

Observed SERP-style competitors (not to copy):

| Competitor | Angle |
|------------|-------|
| Rentrip / Zoomcar | App self-drive, price grids, delivery |
| TaxiYatri | Fixed package tables, chauffeur |
| GooCars / RideOnWheels | Local desk + airport self-drive |

**AroraCars advantage to lean into:** multi-category Dehradun desk (auto, Chota Hathi, bike, scooty, Tempo, car) + phone/WhatsApp — niches where you **already rank**. Car head terms are more competitive; win via clarity + local proof, not fake price tables.

---

## 7. Technical SEO status (confirmed vs backlog)

| Item | Status | Notes |
|------|--------|-------|
| Apex canonical | OK | Keep |
| www redirect | OK | Keep |
| robots.txt | OK | Apex sitemap |
| Soft-canonicals | OK | Keep |
| Money-page metadata (Batch 1–3) | Improved locally | Await crawl/GSC lag |
| Privacy page | Added | Trust |
| Wave1 metro thin URLs | Open | Candidate later noindex **with plan** |
| `/property` | Owner: ignore | Out of scope |
| 404 list | Waiting GSC URL export | No blind redirects |
| Desktop CWV deep dive | Not done this phase | Optional after device export |

---

## 8. Keyword → page map (priority set)

| Primary keyword | Intent | URL | Current (agg) | Action |
|-----------------|--------|-----|---------------|--------|
| auto rickshaw / 3W rent Dehradun | Commercial | `/three-wheeler-auto-rental-dehradun` | 35/834/@6.3 | Protect + CTR |
| chota hathi booking | Commercial | `/chota-hathi-mini-truck-rental-dehradun` | 23/549/@6.7 | Protect + CTR |
| e-rickshaw rent | Product | `/rent/e-rickshaw-rental-dehradun` | 17/288/@5.4 | Protect |
| auto rickshaw rent (product) | Product | `/rent/auto-rickshaw-rental-dehradun` | 12/361/@8.0 | Protect |
| bike rental Dehradun | Commercial | `/bike-rental-dehradun` | 11/344/@14.8 | **Push Top 10** |
| car rental Dehradun | Commercial | `/car-rental-dehradun` | 8/160/@9.6 | Hold / polish |
| luxury car rental Dehradun | Commercial | `/luxury-car-rental-dehradun` | 8/101/@15.2 | Push |
| wedding car rental Dehradun | Commercial | `/wedding-car-rental-dehradun` | 4/136/@10.9 | CTR |
| scooty on rent Dehradun | Commercial | `/scooty-on-rent-dehradun` | 1/84/@8.3 | CTR |
| bike near ISBT | Local | `/bike-rental-near-isbt-dehradun` | 1/234/@9.7 | CTR |
| Jolly Grant / airport car | Commercial | `/jolly-grant-airport-car-rental` | 0/159/@13.9 | CTR |
| monthly car rental | Commercial | `/monthly-car-rental-dehradun` | 0/65/@7.4 | Snippet |
| self drive car Dehradun | Commercial | `/self-drive-car-rental-dehradun` | 2/145/@20.6 | Content relevance |
| taxi service Dehradun | Commercial | `/taxi-service-in-dehradun` | low | Later push |

---

## 9. Prioritised implementation plan (after your approval)

### Already done (Nov 10–12) — do not redo
Auto, Chota, ISBT bike, Clock Tower bike, Scooty (+ blog CTA), Monthly, Jolly Grant (Taxi & Car title), Car hub, Privacy, admin cookie traffic UI.

### Phase 2 — Keyword map polish (doc only if needed)
Expand map for taxi routes + validate self-drive targeting (service is offered — keep page).

### Phase 3 — Highest-impact next code (controlled)
1. **Bike hub push** (largest Top-10 gap among money pages) — Bullet/Himalayan/SERP only if Batch 2 didn’t fully cover hub itself.  
2. **Self-drive Dehradun** relevance pass (pos ~21).  
3. **Wedding CTR** light meta.  
4. **Wave1 noise list** — document noindex candidates; implement only with approval.  
5. Optional: desktop-only GSC export analysis.  
6. 404 URL cleanup — only after you provide GSC Not-found export.

### Phase 4 — Validation
Production build, metadata/canonical/sitemap/robots spot-checks on money URLs, no accidental URL changes.

### Phase 5 — 30 / 60 / 90 day roadmap

| Horizon | Focus | Measure (GSC) |
|---------|--------|----------------|
| 30 days | Protect Top-10 niches; CTR on Chota/auto/ISBT/monthly/airport; bike into Top 10 | Clicks, CTR, pos on 12 money URLs; Call/WA cookie counts |
| 60 days | Self-drive + luxury + wedding; selective Wave hygiene | Non-brand clicks; Top-10 keyword count |
| 90 days | Justified UK location/taxi pages only if fulfilment real | Qualified enquiries, not vanity impr |

---

## 10. Location-page quality checklist (before any expansion)

A location/service page may be indexable only if:

1. Distinct search intent (not a city-name swap).  
2. Genuine local content (pickup, routes, constraints).  
3. Realistic fulfilment (desk or verified partner — stated honestly).  
4. Unique title/H1/meta.  
5. Internal links to hubs.  
6. No fabricated fleet/prices/ratings.  

**Wave 4–6 stay off** until Wave 2/3 show ROI.

---

## 11. Conversion note (SEO traffic → leads)

Already present: sticky Call/WhatsApp, consent-gated hit tracking (`analytics_v1` in `SiteSetting`), admin Cookie traffic table. CTA click ≠ booking. Preserve phone **8445619130**.

---

## 12. Approval gate

**Phase 1 audit complete. No files changed for recovery implementation in this turn.**

Reply with which track to start next:

1. **Bike hub Top-10 push** (highest remaining money gap)  
2. **Self-drive + wedding polish**  
3. **Wave1 noise audit list only** (no noindex yet)  
4. **Wait** — let Batch 1–4 GSC lag settle 2–4 weeks, then re-export  

Raw analysis: `docs/gsc-exports/2026-11-15/_analysis.json`
