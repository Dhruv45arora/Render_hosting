# AroraCars.com — Phase 2 GSC-First SEO Report

**Date:** 2026-11-10  
**Status:** Analysis only. **No production code was modified.**  
**GSC export:** `aroracars.com-Performance-on-Search-2026-11-10.zip` → `docs/gsc-exports/2026-11-10/`  
**Filter:** Search type = Web · **Date = Last 3 months** (Chart: 2026-08-09 → 2026-11-08)

---

## 0. Data coverage

| Asset | Status |
|-------|--------|
| Queries.csv | **Analyzed** (648 rows) |
| Pages.csv | **Analyzed** (594 rows) |
| Chart.csv / Devices / Countries | **Analyzed** |
| Indexing / Coverage export | **Analyzed** — `docs/gsc-exports/2026-11-10-coverage/` (`aroracars.com-Coverage-2026-11-10.zip`) |
| Sitemaps status export | **Still missing** (optional) |
| `/property` | **Out of scope per owner** — ignore; do not noindex/edit in this phase |

Path metrics below **aggregate www + apex** for the same path (GSC still lists both hosts separately).

---

## 1. Executive findings (from this export)

1. **Organic demand is real but narrow.** Last 3 months ≈ **262 clicks / 6,505 impressions** (Devices total). Almost all value is **Dehradun auto / Chota Hathi / bike / e-rickshaw / homepage** — not Wave metro/airport doorways.
2. **Impressions rose sharply after ~20 Oct while CTR and avg position worsened** (Wave publish + www→apex window). Clicks did **not** collapse to zero; **efficiency** did.
3. **www still dominates recorded clicks** in this 3-month window (`www` 195 clicks / 4,219 impr vs apex 70 / 3,395). Apex redirect is correct long-term; GSC Pages rows remain split until equity fully consolidates.
4. **`/property` ignored** (owner instruction) — not in implementation scope.
5. **Coverage:** Indexed pages jumped **~235 → 746** on **24 Oct 2026** (Wave). Not indexed rose to **278**. Matches the late-Oct impression surge + CTR drop.
6. **Highest ROI is CTR + intent clarity on pages already in positions ~4–15**, not new URLs.
7. Large **irrelevant / off-intent** imprint: other-city rentals, airport metros, “test drive”, “car subscription”, “arora automobiles”.

---

## 2. Site-level performance

### 2.1 Devices

| Device | Clicks | Impr | CTR | Avg pos |
|--------|--------|------|-----|---------|
| Mobile | 223 | 4,929 | 4.52% | 8.69 |
| Desktop | 39 | 1,556 | 2.51% | 39.93 |
| Tablet | 0 | 20 | 0% | 22.45 |

Mobile is the business. Desktop avg position is weak (long-tail / off-topic dilution likely).

### 2.2 Country

India: **250 clicks / 6,022 impr / 4.15% CTR / pos 15.33**. Everything else is noise.

### 2.3 Host split (Pages.csv sums)

| Host | Clicks | Impressions |
|------|--------|-------------|
| www.aroracars.com | 195 | 4,219 |
| aroracars.com | 70 | 3,395 |

**Action:** Keep apex redirect. Monitor only the **apex** GSC property going forward. Do not “fix” by removing www history.

### 2.4 Time series (Chart.csv)

| Period | Clicks | Impr | CTR | Note |
|--------|--------|------|-----|------|
| Sep 2026 | 92 | 1,922 | 4.79% | Baseline growth |
| Oct 1–20 | 84 | 1,607 | 5.23% | Healthy CTR |
| Oct 21–31 | 45 | 1,505 | **2.99%** | Impr surge, CTR break |
| Nov 1–8 | 35 | 1,369 | **2.56%** | Still elevated impr, weak CTR |
| Full Oct | 129 | 3,112 | 4.15% | Masks late-month drop |

**Interpretation (rationale, not proof of one cause):** late-October Wave 2/3 URL expansion + SERP/host changes increased **impressions on weaker/deeper results**, pulling site-average position/CTR down. Daily clicks remain in a similar band (~3–5/day recently) while “call volume” complaints need separate conversion measurement.

---

## 3. Top 20 pages to improve (aggregated path)

Ranked by business leverage (impr × position opportunity × CTR gap), not vanity.

| # | Path | Clicks | Impr | CTR | Pos | Problem | Recommended action | Priority |
|---|------|--------|------|-----|-----|---------|-------------------|----------|
| 1 | `/three-wheeler-auto-rental-dehradun` | 34 | 776 | 4.4% | 6.2 | High impr, soft CTR | SERP title/desc for “auto rent per day / kiraya”; keep H1; FAQ | **P2** |
| 2 | `/chota-hathi-mini-truck-rental-dehradun` | 18 | 447 | 4.0% | 6.8 | Query CTR failure | Own “chota hathi booking” in title/desc; booking CTA clarity | **P2** |
| 3 | `/bike-rental-dehradun` | 11 | 326 | 3.4% | 14.1 | Page ~2 | Push Bullet/Himalayan; CTR meta; internal links from ISBT/Clock Tower | **P2** |
| 4 | `/bike-rental-near-isbt-dehradun` | 1 | 226 | 0.4% | 9.4 | Extreme low CTR @ pos~9 | Rewrite title/desc; strengthen local pickup content; link bike hub | **P2** |
| 5 | `/rent/auto-rickshaw-rental-dehradun` | 12 | 322 | 3.7% | 7.1 | Hub↔PDP overlap | Protect product; clearer “this vehicle” vs hub | Protect+ |
| 6 | `/rent/e-rickshaw-rental-dehradun` | 14 | 263 | 5.3% | 5.0 | Strong — protect | Light UX/desc only | Protect |
| 7 | `/jolly-grant-airport-car-rental` | 0 | 157 | 0% | 13.9 | Zero clicks page 2 | CTR + “Jolly Grant / airport taxi vs rental” module; link airport taxi | **P2** |
| 8 | `/self-drive-car-rental-dehradun` | 2 | 138 | 1.5% | 21.4 | Weak pos + CTR | Content relevance; docs/deposit; avoid competing with car hub wrongly | **P2** |
| 9 | `/car-rental-near-isbt-dehradun` | 1 | 138 | 0.7% | 13.8 | Low CTR | Local SERP rewrite; link car + taxi hubs | **P2** |
| 10 | `/car-rental-dehradun` | 7 | 135 | 5.2% | 11.0 | Page 2 money page | Push; clarify vs taxi/chauffeur | **P2** |
| 11 | `/blog/best-scooty-for-dehradun-tourists` | 0 | 133 | 0% | 9.7 | Ranking for “best scooty” (product research) | Retarget to rental CTA + link `/scooty-on-rent-dehradun` | **P2** |
| 12 | `/bike-rental-near-clock-tower-dehradun` | 1 | 130 | 0.8% | 8.0 | Low CTR @ good pos | SERP + pickup proof; link hub | **P2** |
| 13 | `/wedding-car-rental-dehradun` | 4 | 128 | 3.1% | 10.4 | Soft CTR | Snippet clarity | Medium |
| 14 | `/scooty-on-rent-dehradun` | 1 | 82 | 1.2% | 8.5 | Under-clicking | Align with “best scooty” blog traffic; Activa FAQs | **P2** |
| 15 | `/luxury-car-rental-dehradun` | 8 | 85 | 9.4% | 12.9 | Decent CTR, page 2 | Light push; wedding links | Medium |
| 16 | `/monthly-car-rental-dehradun` | 0 | 64 | 0% | **7.4** | Good pos, **0 clicks** | Title/desc mismatch likely; rewrite for monthly hire intent | **P2** |
| 17 | `/bike-rental-dehradun-to-mussoorie` | 0 | 66 | 0% | 8.2 | 0 clicks @~8 | SERP + trip content or soft-support to bike hub | Medium |
| 18 | `/tempo-traveller-rental-dehradun` | 0 | 61 | 0% | 24.3 | Deep | Char Dham / group angle; don’t expect quick wins | Later |
| 19 | `/contact-book-now` | 5 | 137 | 3.7% | 10.8 | Brand/support | Keep; ensure phone consistency | Protect |
| 20 | `/` | 49 | 485 | 10.1% | 8.0 | Strong CTR | Protect; cluster links only | Protect |

Homepage + auto/Chota/e-rickshaw are the equity core. **Do not dilute them with more Wave URLs.**

---

## 4. Opportunity classes

### 4.1 High impressions, low CTR (pages, impr ≥ 30, CTR < 5%)

| Path | Clicks | Impr | CTR | Pos | Action |
|------|--------|------|-----|-----|--------|
| `/three-wheeler-auto-rental-dehradun` | 34 | 776 | 4.4% | 6.2 | SERP test |
| `/chota-hathi-mini-truck-rental-dehradun` | 18 | 447 | 4.0% | 6.8 | Own booking queries |
| `/bike-rental-dehradun` | 11 | 326 | 3.4% | 14.1 | Content + SERP |
| `/rent/auto-rickshaw-rental-dehradun` | 12 | 322 | 3.7% | 7.1 | Product clarity |
| `/bike-rental-near-isbt-dehradun` | 1 | 226 | 0.4% | 9.4 | **Urgent CTR** |
| `/jolly-grant-airport-car-rental` | 0 | 157 | 0% | 13.9 | SERP + intent split |
| `/self-drive-car-rental-dehradun` | 2 | 138 | 1.5% | 21.4 | Relevance |
| `/car-rental-near-isbt-dehradun` | 1 | 138 | 0.7% | 13.8 | SERP |
| `/blog/best-scooty-for-dehradun-tourists` | 0 | 133 | 0% | 9.7 | Commercialize links |
| `/bike-rental-near-clock-tower-dehradun` | 1 | 130 | 0.8% | 8.0 | SERP |
| `/scooty-on-rent-dehradun` | 1 | 82 | 1.2% | 8.5 | SERP |
| `/monthly-car-rental-dehradun` | 0 | 64 | 0% | 7.4 | **SERP mismatch** |
| `/bike-rental-dehradun-to-mussoorie` | 0 | 66 | 0% | 8.2 | SERP |

### 4.2 Positions 4–10 (impr ≥ 20) — defend & harvest CTR

Core: auto hub, home, Chota, auto/e-rickshaw PDPs, ISBT bike, Clock Tower bike, scooty hub, monthly (0 clicks!), wedding, pricing, several `/rent/*`.

### 4.3 Positions 11–20 — push list

`/bike-rental-dehradun`, `/jolly-grant-airport-car-rental`, `/car-rental-near-isbt-dehradun`, `/car-rental-dehradun`, `/luxury-car-rental-dehradun`, Bullet PDP, chauffeur Dehradun (weak).

### 4.4 Positions 21–50 — selective

`/self-drive-car-rental-dehradun` (138 impr), Tempo, Mussoorie car route, Swift PDP. Fix only where commercial intent is clear.

### 4.5 Zero-click with meaningful imprint (not all “bad”)

| Path | Impr | Pos | Note |
|------|------|-----|------|
| `/jolly-grant-airport-car-rental` | 157 | 13.9 | Fix CTR |
| `/blog/best-scooty-*` | 133 | 9.7 | Wrong SERP promise vs rental |
| Wave1 metros (Bengaluru/Ahmedabad/Delhi airport…) | 50–80 each | 55–70 | **Noise** — do not invest content; consider later noindex only with plan |
| `/monthly-car-rental-dehradun` | 64 | 7.4 | Fix snippet |
| `/taxi-service-in-dehradun` | 18 | 58.4 | Almost invisible — needs strategy, not more clones |
| `/car-rental-in-haridwar` | 21 | 77.5 | Wave thin |

### 4.6 Pages gaining impressions / losing efficiency

Chart shows **impr up, CTR down** after 20 Oct. Page-level “gaining vs losing clicks” week-over-week needs a second export with Compare mode — not in this zip.

### 4.7 Irrelevant query / page imprint

Queries pulling impressions with 0 local value examples: `car rental bangalore with driver`, `car rental in chandigarh with driver`, `car hire in delhi airport`, `self drive car rental in ahmedabad`, `car subscription dehradun`, `book a test drive for alto in dehradoon`, `arora automobiles`, `best scooty in dehradun` (product shopping vs rental).

Pages absorbing that imprint: Wave1 city/airport/chauffeur URLs at positions 50–80.

---

## 5. Top 50 keyword opportunities (from Queries.csv)

Sorted by commercial usefulness using **impressions + position + intent fit** (not raw clicks alone). Mapped to one primary page.

| # | Query | Clicks | Impr | CTR | Pos | Problem | Primary page | Action | Pri |
|---|-------|--------|------|-----|-----|---------|--------------|--------|-----|
| 1 | chota hathi booking | 1 | 59 | 1.7% | 4.6 | Low CTR @ top | `/chota-hathi-mini-truck-rental-dehradun` | Title/desc include booking | P2 |
| 2 | chota hathi booking dehradun | 1 | 47 | 2.1% | 8.8 | Low CTR | same | Localize snippet | P2 |
| 3 | arora cars | 12 | 82 | 14.6% | 3.2 | Brand OK | `/` | Protect | — |
| 4 | auto rent per day | 2 | 29 | 6.9% | 13.7 | Page 2 | auto hub | FAQ + SERP “per day” | P2 |
| 5 | best scooty in dehradun | 0 | 35 | 0% | 7.0 | Wrong intent on blog | scooty hub + blog | Retarget blog→rent | P2 |
| 6 | arora car | 0 | 33 | 0% | 8.3 | Brand variant 0 CTR | `/` | Snippet/brand consistency | P1 |
| 7 | arora automobiles | 0 | 36 | 0% | 6.3 | Brand confusion | about / home | Disambiguate rental desk | P1 |
| 8 | bullet on rent in dehradun | 2 | 9 | 22% | 6.4 | Winning | bike hub + Bullet PDP | Protect / deepen | Protect |
| 9 | himalayan on rent | 2 | 5 | 40% | 6.8 | Winning | Himalayan PDP / bike hub | Protect | Protect |
| 10 | electric auto rent near me | 2 | 10 | 20% | 4.7 | Winning | e-rickshaw PDP | Protect | Protect |
| 11 | auto rickshaw rent per day | 2 | 9 | 22% | 8.9 | Good | auto hub | Keep | Protect |
| 12 | e rickshaw on rent near me | 2 | 7 | 29% | 1.0 | Winning | e-rickshaw PDP | Protect | Protect |
| 13 | rent a dost | 2 | 7 | 29% | 2.4 | Goods vehicle | Chota / Dost PDP | Ensure model match | P2 |
| 14 | dehradun auto rickshaw number | 0 | 17 | 0% | 2.7 | Phone-intent | auto hub / contact | Put number in SERP/visible | P2 |
| 15 | auto booking | 0 | 17 | 0% | 6.5 | Generic | auto hub | Booking CTA language | P2 |
| 16 | auto kiraya | 0 | 13 | 0% | 7.4 | Hindi intent | auto hub | Consider Hindi synonym in copy | P2 |
| 17 | rickshaw kiraya | 0 | 12 | 0% | 4.3 | Hindi | auto hub | Same | P2 |
| 18 | bike rental near clock tower dehradun | 0 | 12 | 0% | 8.9 | Exact URL exists | `/bike-rental-near-clock-tower-dehradun` | CTR rewrite | P2 |
| 19 | e rickshaw rent per day | 0 | 12 | 0% | 15.8 | Push | e-rickshaw PDP / hub | FAQ per day | P2 |
| 20 | car rental at dehradun airport | 0 | 12 | 0% | 17.3 | Push | Jolly Grant car + airport taxi | Align KW | P2 |
| 21 | wedding car rental dehradun | 1 | 7 | 14% | 8.0 | OK | wedding page | Protect | — |
| 22 | auto rickshaw rent per day near me | 1 | 10 | 10% | 5.3 | OK | auto hub | Protect | — |
| 23 | rent auto rickshaw | 0 | 8 | 0% | 6.8 | Harvest | auto hub | SERP | P2 |
| 24 | dehradun car rental with driver | 0 | 8 | 0% | 26.6 | Deep | chauffeur hub | Improve page | P2 |
| 25 | arora taxi service | 0 | 22 | 0% | 20.5 | Brand+taxi | `/taxi` + taxi Dehradun | Clarify offer | P2 |
| 26 | car rental mussoorie | 0 | 23 | 0% | 44.8 | Deep | Mussoorie self-drive / car route | Don’t chase with new URL | Later |
| 27 | dehradun tempo traveller | 0 | 13 | 0% | 49.5 | Deep | Tempo hub | Content later | Later |
| 28 | taxi service uttarkashi | 0 | 9 | 0% | 8.7 | Niche taxi | existing taxi page | Only if partner real | Medium |
| 29 | monthly car rental rates in dehradun | 0 | 10 | 0% | 53.1 | Rates intent | monthly page | Honest rate ranges if verified | P2 |
| 30 | car rental dehradun airport | 0 | 10 | 0% | 47.7 | Airport | Jolly Grant pages | Consolidate messaging | P2 |
| 31 | luxury car rental dehradun | 1 | 3 | 33% | 33 | Sparse | luxury hub | Light | Low |
| 32 | bike for rent in dehradun | 1 | 1 | 100% | 36 | Sparse win | bike hub | Push rankings | P2 |
| 33 | car subscription dehradun | 0 | 31 | 0% | 62 | Off-offer | monthly page | FAQ “not subscription app” or ignore | Low |
| 34–45 | bangalore / chandigarh / delhi airport / ahmedabad rental queries | 0 | 10–29 | 0% | 45–85 | Off-market | Wave1 URLs | **Do not optimize**; later noindex candidates | P3 |
| 46 | kotdwar to lansdowne taxi | 0 | 9 | 0% | 46 | Wave long-tail | existing route if any | Ignore unless partner | P3 |
| 47 | car rental in haridwar | 0 | 10 | 0% | 71 | Wave | haridwar page | No investment yet | P3 |
| 48 | swift / alto / dzire test drive dehradun | 2 | 16+ | mixed | 46+ | Dealer intent | — | Don’t build test-drive pages | — |
| 49 | mercedes hire near me | 1 | 1 | 100% | 6 | Thin | luxury / Mercedes PDP | Protect if page exists | Low |
| 50 | tata magic rent | 1 | 1 | 100% | 8 | Goods | Chota cluster | Map to closest vehicle | Low |

---

## 6. Cannibalization (data-backed)

| Cluster | URLs with imprint | Owner of intent | Differentiation | Merge? |
|---------|-------------------|-----------------|-----------------|--------|
| Auto / 3W / e-rickshaw | Hub 776 impr; auto PDP 322; e-rickshaw 263; full-day 69 | Hub = category / per day / kiraya; PDPs = specific vehicle | Hub FAQs; PDP model+deposit | **No** |
| Bike hub vs local bike pages | Hub 326 @14; ISBT 226 @9.4; Clock Tower 130 @8; Mussoorie bike 66 | Hub = “bike rental Dehradun”; locals = pickup modifiers | Locals must not outrank hub for head terms; link up to hub | **No** |
| Scooty blog vs scooty hub | Blog 133 @9.7; hub 82 @8.5 | Hub owns rental; blog supports | Blog CTA → hub; change blog SERP promise | **No** |
| Car hub vs self-drive vs chauffeur vs taxi | Car 135 @11; self-drive 138 @21; chauffeur DD 26 @20; taxi DD 18 @58 | Car = umbrella hire; self-drive = without driver; chauffeur = with driver rental; taxi = trip quote | Explicit modules + links | **No** |
| Chota hub vs Tata Ace PDP | Hub 447; Ace PDP 40 | Hub = booking head terms | PDP = model | **No** |
| Wave1 other cities vs Dehradun | Many 0-click deep URLs | Dehradun owns money | Other cities = partner quote only / low priority | **No merge; no new clones** |
| Airport | Jolly Grant car 157 @14; railway/ISBT car pages | Airport car vs airport taxi | Cross-link; shared “Jolly Grant” wording | **No** |

---

## 7. Coverage / indexing (2026-11-10 export)

**Source:** Coverage zip · Metadata = “Sitemap, All known pages”

### 7.1 Indexed vs not indexed (Chart)

| Approx. date | Indexed | Not indexed | Context |
|--------------|---------|-------------|---------|
| Late Aug (after first surge) | ~275 | ~138 | Early index set |
| Mid Oct (pre-Wave spike) | ~235–241 | ~196–202 | Stable |
| **24 Oct onward** | **746** | **278** | Wave URL flood indexed |

Coverage chart ends **2026-11-06**. Impression spike in Performance aligns with this index jump.

### 7.2 Exclusion / issue reasons (Critical issues.csv)

| Reason | Pages | Validation | SEO reading |
|--------|------:|------------|-------------|
| Page with redirect | **180** | Failed | Mostly **www → apex** (expected after host fix). Not a content bug. Do not remove redirect. |
| Discovered – currently not indexed | **47** | Started | Google knows URLs, hasn’t indexed — normal backlog after Wave; don’t mass-request all. |
| Not found (404) | **22** | Not started | Investigate list in GSC UI (stale links / old slugs). Fix only real broken money URLs. |
| Alternative page with proper canonical tag | **14** | Not started | Soft-canonical aliases working as designed — **keep**. |
| Excluded by ‘noindex’ tag | **7** | Not started | Likely `/search`, admin-ish, or intentional — spot-check in GSC. |
| Duplicate, Google chose different canonical than user | **4** | Not started | Inspect the 4 URLs in GSC; fix only if a money page loses preferred canonical. |
| Crawled – currently not indexed | **2** | Failed | Low volume; review URLs in UI. |
| Server error (5xx) | **1** | Not started | Likely cold-start / Render blip — monitor, don’t SEO-panic. |
| Blocked by robots.txt | **1** | Not started | Confirm it’s `/admin` or `/api`, not a landing. |
| Redirect error | 0 | N/A | OK |

Non-critical issues file was empty.

### 7.3 P0 / P1 technical (updated)

| Item | Finding | Recommendation |
|------|---------|----------------|
| `/property` | Owner: **ignore** | No action |
| Privacy | Still 404 | Optional trust page (not blocking money SEO) |
| Refund | On `/cancellation-policy` | No separate URL required |
| www / apex | 180 redirect exclusions + Pages host split | **Keep** apex redirect; success = redirects stay |
| Wave index scale | 746 indexed | **No Wave 4–6**; improve money pages only |
| Soft-canonicals | 14 “alternative canonical” | Keep |
| 404 × 22 | Unknown URLs without per-URL CSV | Owner can export “Not found” examples from GSC if available |
| Soft-canonicals / noindex / Google-chosen canonical | Small counts | Spot-check in GSC UI before code |

---

## 8. Prioritized action plan (for your approval)

### P0 — Owner decisions
1. **`/property` — ignored** (done).  
2. Approve **P2 money-page SERP/content** implementation (primary).  
3. Optional: Privacy page (trust only).  
4. Optional: export the **22 × 404** URL examples from GSC if you want those fixed next.

### P1 — Technical (non-destructive, low urgency vs P2)
1. Spot-check 4 “Google chose different canonical” + 7 noindex + 1 robots block in GSC UI.  
2. Privacy page if desired.  
3. Brand snippet disambiguation (“arora automobiles”).  
4. Do **not** “fix” the 180 redirects.

### P2 — Content / SERP on proven URLs (highest ROI) — **recommended next code work**
1. Chota Hathi hub — own **booking** queries.  
2. Auto hub — **per day / kiraya / number**.  
3. ISBT + Clock Tower bike pages — CTR crisis.  
4. Bike hub — push from pos ~14.  
5. Monthly car — fix 0-CTR @ pos ~7.  
6. Jolly Grant airport car — 0 clicks @ ~14.  
7. Scooty hub + scooty blog alignment.  
8. Car hub vs taxi/chauffeur clarification.

### P3 — Only later
1. Wave1 metro/airport 0-click deep URLs → candidate noindex list (with migration notes).  
2. Tempo / Char Dham deeper pushes.  
3. **No Wave 4–6.**

---

## 9. Expected rationale (not guarantees)

| Lever | Why it can help |
|-------|-----------------|
| CTR rewrites on pos 4–10 money pages | More calls/visits without needing new rankings |
| Chota / auto query ownership | Highest non-brand imprint cluster |
| Bike local pages → hub | Stop leaking head-term equity; raise hub to page 1 |
| Ignore metro Wave noise | Protect crawl/quality focus for Dehradun money |
| Keep www→apex redirects | 180 “Page with redirect” rows are expected consolidation, not failures to undo |

---

## 10. Optional next data

- Per-URL export of the **22 × 404** examples from GSC (if you want those cleaned)  
- **Sitemaps** status screenshot (optional)  
- Performance **Compare** last 28 vs previous 28 (optional)

Coverage export is already incorporated.

---

## 11. Approval gate

**`/property` is out of scope.**  
**No production SEO code until you approve the money-page track.**

Reply **yes** (or **B**) to start **P2 money-page SERP/content** on existing URLs only.  
Optional: also say if you want a **Privacy** page in the same pass.

Raw files: `docs/gsc-exports/2026-11-10/` · Coverage: `docs/gsc-exports/2026-11-10-coverage/`
