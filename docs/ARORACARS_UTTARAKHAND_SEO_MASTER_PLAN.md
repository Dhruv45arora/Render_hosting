# AroraCars — Uttarakhand-Wide SEO Master Plan

**Date:** 2026-11-15  
**Status:** Research & strategy only. **No production code modified.**  
**Canonical host:** `https://aroracars.com` (apex — do not flip)  
**Inputs:** `docs/ARORACARS_SEO_RECOVERY_AUDIT_2026-11-15.md`, GSC `docs/gsc-exports/2026-11-15/`, repo taxi/Wave/SEO-engine data  
**Phone / WA:** 8445619130  

**Ranking guarantee:** none. Goal = measurable Top-10 taxi keyword count, non-brand clicks, CTR, and qualified Call/WhatsApp leads.

---

## Executive verdict

AroraCars already has a **large Uttarakhand taxi URL inventory**. The bottleneck is **not “missing cities”** — it is **weak taxi SERP ownership**, **taxi vs car-route cannibalisation**, and **Wave 2/3 long-tail dilution**, while **auto / Chota Hathi / home** remain the real organic engines.

| Priority | Reality today | Correct next move |
|----------|---------------|-------------------|
| **1. Taxi** | ~45 hand-crafted + ~192 Wave2 taxi + **122 Wave3 taxi** URLs; GSC taxi queries ≈ **0 clicks / 138 impr** | Improve Tier-1 city + route + airport pages; do **not** mass-publish more |
| **2. Car** | Stronger than taxi (hub ~pos 10, luxury/wedding live) | Protect Dehradun hubs; clarify vs taxi; selective UK locations only where fulfilment real |
| **3. Bike** | Hub ~pos 15; locals pos 8–10 with soft CTR | Push Dehradun hub first; then Rishikesh/Mussoorie only if desk/partner verified |

**Protect without URL changes:** `/`, `/three-wheeler-auto-rental-dehradun`, `/chota-hathi-mini-truck-rental-dehradun`, auto / e-rickshaw PDPs.

---

## 1. Existing SEO architecture (repo-verified)

| Layer | Source | Role |
|-------|--------|------|
| Framework | Next.js 14 App Router | `[slug]` landings + `/rent/[slug]` PDPs |
| Core Dehradun | `data/pages.ts` (`CORE_LANDING_PAGES`) | Car / bike / scooty / wedding / luxury / routes |
| Enrichments | `data/page-enrichments.ts` | Titles, FAQs, soft-canonicals (Batches 1–3 done) |
| **Taxi cluster** | `data/taxi-pages.ts` | **45** enquiry-led taxi pages (hub, cities, routes, airport, yatra) |
| Wave 1 | `wave1-hubs` + `wave1-pages` | Non-UK metros — **noise for UK growth**; do not invest |
| Wave 2 | manifest → ~**302** published | Heavy taxi + some car/bike/scooty location pages |
| Wave 3 | manifest → ~**122** published | **All taxi routes / location taxis** |
| SEO engine | `data/seo-engine/*` | Locations (55), services, eligibility, linking, waves |
| Sitemap / robots | apex `SITE_URL` | www→apex permanent redirect |
| Schema | LocalBusiness gated; Service/FAQ; PDP Product | No fake AggregateRating |
| Leads | Call / WhatsApp / forms; `analytics_v1` | CTA click ≠ booking |

**Scale note:** Live landings ~640+. Late-Oct GSC avg-position collapse correlates with Wave index surge — see recovery audit. Further mass generation (Wave 4–6) stays **off**.

---

## 2. Current keyword / page performance (GSC Aug 14 – Nov 13)

### Site overall
298 clicks · 7,346 impr · 4.06% CTR · avg pos **15.96** (India nearly identical).

### Segment signals (heuristic filters on Queries/Pages)

| Segment | Queries (approx) | Pages (path filter) |
|---------|------------------|---------------------|
| Taxi / cab / chauffeur | **0 clicks · 138 impr** | Taxi-ish paths: ~6 clicks · ~1,199 impr (inflated by Wave1 airport/chauffeur metros) |
| Car rental cluster | 2 clicks · 742 impr | Stronger page traffic on Dehradun car hubs |
| Bike / scooty / Bullet | 2 clicks · 159 impr | Bike hub + locals drive most clicks |

### Taxi pages that matter (apex; illustrative)

| URL | Clicks | Impr | Pos | Reading |
|-----|-------:|-----:|----:|---------|
| `/taxi` | 0 | 5 | **5.8** | Hub can rank — needs demand + links + snippet |
| `/taxi-service-in-uttarkashi` | 0 | 37 | **8.2** | Rank without CTR — snippet / intent gap |
| `/taxi-service-in-guptkashi` | 1 | 15 | **8.8** | Rare taxi click |
| `/taxi-service-in-dehradun` | 0 | 23 | **65.9** | **Money page failing** |
| `/taxi-service-in-rishikesh` | 0 | 18 | 28.1 | Weak |
| `/taxi-service-in-haridwar` | 0 | 16 | 40.2 | Weak |
| `/taxi-service-in-mussoorie` | 0 | 1 | 89 | Almost invisible |
| `/taxi-service-in-nainital` | 0 | 6 | 48 | Weak |
| `/dehradun-to-mussoorie-taxi` | 0 | 5 | **77.4** | Route money query lost |
| `/dehradun-airport-taxi` | 0 | 11 | 50.8 | Cannibal risk vs Jolly Grant car page |
| `/jolly-grant-airport-car-rental` | 0 | 159 | 13.9 | Highest “airport” impr — taxi/car hybrid (Batch 3 titled Taxi & Car) |

### Queries worth watching
| Query | Clicks | Impr | Pos | Map to |
|-------|-------:|-----:|----:|--------|
| arora taxi service | 0 | 20 | 21.2 | `/taxi` or Dehradun taxi |
| taxi service uttarkashi / uttarkashi taxi | 0 | 13+5 | ~8–9 | Existing Wave page — CTR |
| dehradun taxi service | 0 | 6 | **104** | `/taxi-service-in-dehradun` |
| taxi service in haridwar | 0 | 6 | 72 | Haridwar taxi |
| dehradun to mussoorie taxi | 0 | 3 | 80 | Route taxi page |
| car rental at dehradun airport | 0 | 12 | 17.3 | Jolly Grant |
| (auto / Chota / brand) | strong | — | Top 10 | **Protect — out of taxi scope** |

**Conclusion:** Coverage exists. **Tier-1 taxi commercial queries are not converting into Top-10 clicks.** Improve pages before inventing new ones.

---

## 3. Taxi keyword → URL map (priority)

**Service model (verified in copy):** Chauffeur / with-driver **enquiry quotes** from Dehradun desk. Not a meter app. No fabricated fixed fares or branch offices outside verified desk narrative.

### 3.1 Hubs & cities

| Primary keyword | Intent | Target URL | Exists? | GSC snapshot | Action |
|-----------------|--------|------------|---------|--------------|--------|
| taxi service Uttarakhand | Commercial hub | `/taxi` | Yes | 0/5/@5.8 | **Strengthen** — UK hub, internal links from all Tier-1 |
| taxi service in Dehradun | Local commercial | `/taxi-service-in-dehradun` | Yes | 0/23/@65.9 | **P0 improve** |
| taxi service in Mussoorie | Local / hill | `/taxi-service-in-mussoorie` | Yes | ~0/1/@89 | **P0 improve** |
| taxi service in Rishikesh | Local / tourist | `/taxi-service-in-rishikesh` | Yes | 0/18/@28 | **P0 improve** |
| taxi service in Haridwar | Local / pilgrim | `/taxi-service-in-haridwar` | Yes | 0/16/@40 | **P0 improve** |
| taxi service in Nainital | Kumaon | `/taxi-service-in-nainital` | Yes | 0/6/@48 | **P1 improve** |
| taxi service in Haldwani | Gateway | `/taxi-service-in-haldwani` | Yes | 0/4/@67.5 | **P1 improve** |
| taxi booking Uttarakhand | Generic | `/taxi` | Yes | — | Own on hub; do not new URL |
| outstation taxi Uttarakhand | Commercial | `/taxi` + city hubs | Yes | — | Section + FAQs on hub/cities |
| one-way / round-trip taxi | Intent modifiers | City + route pages | Yes | — | Clarify on each; no separate thin URLs |
| airport taxi Dehradun | Airport | `/dehradun-airport-taxi` **primary**; Jolly Grant support | Yes | taxi 0/11/@51; Jolly 0/159/@14 | Align KW ownership (see cannibal §9) |
| local / hill / tourist taxi | Modifiers | City + sightseeing pages | Yes | — | Keep sightseeing pages for Mussoorie/Rishikesh/Nainital |

**Also present (hand cluster):** Roorkee, Kashipur, Rudrapur, Almora, Ranikhet, Pithoragarh, Kotdwar, Srinagar (UK), Tehri.  
**Wave2/3 also created many more** `taxi-service-in-*` (Uttarkashi, Guptkashi, Chopta, etc.). Treat as **hold / CTR only** — no new siblings without demand proof.

### 3.2 Route keywords

| Primary keyword | Target URL | Exists? | Action |
|-----------------|------------|---------|--------|
| Dehradun to Mussoorie taxi | `/dehradun-to-mussoorie-taxi` | Yes | **P0** — distinct from `/car-rental-dehradun-to-mussoorie` |
| Dehradun to Rishikesh taxi | `/dehradun-to-rishikesh-taxi` | Yes | **P0** |
| Dehradun to Haridwar taxi | `/dehradun-to-haridwar-taxi` | Yes | **P0** |
| Dehradun to Nainital taxi | `/dehradun-to-nainital-taxi` | Yes | P1 |
| Dehradun to Delhi taxi | `/dehradun-to-delhi-taxi` | Yes | P1 |
| Rishikesh to Haridwar taxi | `/haridwar-to-rishikesh-taxi` (+ reverse pages) | Yes | P1 — pick primary direction by demand |
| Haridwar to Mussoorie taxi | `/haridwar-to-mussoorie-taxi` | Yes | P1 |
| Delhi to Dehradun / Rishikesh taxi | `/delhi-to-dehradun-taxi`, `/delhi-to-rishikesh-taxi` | Yes | P2 |
| Haldwani / Kathgodam → Nainital | `/haldwani-to-nainital-taxi`, `/kathgodam-to-nainital-taxi` | Yes | P1 |
| Airport → Mussoorie / Rishikesh / Haridwar | `/dehradun-airport-to-*-taxi` | Yes | P1 under airport hub |
| Char Dham / Kedarnath / Badrinath taxi | `/char-dham-taxi-service-from-dehradun`, etc. | Yes | P1 — honest road limits |

**Do not create** reverse-route duplicates when both directions already exist unless GSC shows distinct demand and thin overlap.

### 3.3 Taxi content checklist (per money page)
Verified only: vehicle **classes** (sedan/SUV/Innova enquiry), pickup types, one-way vs round-trip language, booking via call/WA/form, related routes, FAQs.  
**Forbidden:** invented ₹/km tables, fake offices, fake reviews, “always available” fleet counts.

---

## 4. Car keyword → URL map

| Primary keyword | Target URL | Exists? | GSC (agg approx) | Action |
|-----------------|------------|---------|------------------|--------|
| car rental in Dehradun | `/car-rental-dehradun` | Yes | ~8/160/@9.6 | Hold / light polish |
| car rental Uttarakhand | Hub or future `/car-rental-uttarakhand` | **Gap** | — | **Only if** unique UK framing without duplicating Dehradun hub — defer until taxi Tier-1 stable |
| self drive car rental Dehradun | `/self-drive-car-rental-dehradun` | Yes | ~2/145/@20.6 | Relevance pass (service offered) |
| luxury car rental Dehradun | `/luxury-car-rental-dehradun` | Yes | ~8/101/@15.2 | Push Top 10 |
| wedding car rental Dehradun | `/wedding-car-rental-dehradun` | Yes | ~4/136/@10.9 | CTR |
| outstation car rental Dehradun | `/outstation-car-rental-dehradun` | Yes | thin | Clarify vs taxi outstation |
| chauffeur / with driver | `/chauffeur-driven-car-rental-dehradun` | Yes | ~0/33/@18 | Link to taxi hubs (intent split) |
| Jolly Grant / airport car | `/jolly-grant-airport-car-rental` | Yes | 0/159/@13.9 | CTR; taxi sibling for pure “airport taxi” |
| car rental Mussoorie / Rishikesh / Haridwar / Nainital | Mix of core route pages + Wave2 | Partial | Weak | Prefer **route/car-from-Dehradun** unless local desk verified — avoid doorway city swaps |
| monthly / weekly | `/monthly-car-rental-dehradun`, weekly | Yes | monthly 0/@7.4 | Snippet / CTR |

**Intent rule:** **Car rental** = vehicle hire (self-drive or with driver for a period). **Taxi** = point-to-point chauffeur transfer. Pages must say this explicitly (car hub already started).

---

## 5. Bike keyword → URL map

| Primary keyword | Target URL | Exists? | GSC | Action |
|-----------------|------------|---------|-----|--------|
| bike rental Dehradun | `/bike-rental-dehradun` | Yes | ~11/344/@14.8 | **Push Top 10** (after taxi P0 batch or parallel light) |
| bike rental Uttarakhand | — | Gap | — | Defer; do not thin UK hub yet |
| bike rental Rishikesh | `/bike-rental-in-rishikesh` (Wave) | Yes | ~0/5/@7 | Hold; deepen only if fulfilment verified |
| bike rental Mussoorie | `/bike-rental-in-mussoorie` | Yes | ~0/4/@53.5 | Weak — improve or soft-canonical later |
| bike rental Nainital | Wave possible | Check before new | — | No new page without inventory proof |
| Bullet / Royal Enfield Dehradun | Bike hub + PDP if exists | Partial | bullet query Top 10 small | Deepen hub / PDP |
| scooty / Activa Dehradun | `/scooty-on-rent-dehradun` | Yes | soft CTR @~8 | CTR |
| ISBT / Clock Tower bike | existing locals | Yes | high impr, low CTR | Already Batch-2; await lag |

**Order:** Improve Dehradun bike hub **before** new UK bike locations.

---

## 6. Location–service matrix

**Legend:** `D` = Dehradun desk primary · `E` = enquiry / partner tone only · `—` = do not index new page · `✓` = page exists (hand or Wave) · `P` = protect / improve first

Fulfilment honesty: Self-drive fleet is **Dehradun-desk led**. Outside Dehradun, taxi/car-with-driver are **enquiry quotes**, not claimed local branches.

| Location | Tier (biz) | Taxi | Car rental | Bike / scooty | Notes |
|----------|------------|------|------------|---------------|-------|
| Dehradun | 1 | P ✓ D | P ✓ D | P ✓ D | HQ — all services |
| Mussoorie | 1 | P ✓ E | Route/car ✓ E | ✓ weak E | Taxi P0; bike only if verified |
| Rishikesh | 1 | P ✓ E | Route ✓ E | ✓ E | Taxi + tourist bike demand |
| Haridwar | 1 | P ✓ E | Chauffeur/route ✓ E | Wave scooty ✓ E | Pilgrim taxi heavy |
| Nainital | 2 | P1 ✓ E | Route ✓ E | check | Via Haldwani/Kathgodam |
| Haldwani | 2 | P1 ✓ E | sparse | — | Taxi gateway |
| Roorkee | 2 | ✓ E | sparse | — | Taxi hold |
| Kotdwar | 2 | ✓ E | — | — | Taxi hold; Lansdowne route impr noise |
| Tehri | 3 | ✓ E | — | — | Hold |
| Pauri | 3 | Wave? | — | — | No new without demand |
| Srinagar (Garhwal) | 3 | ✓ E | — | — | Hold |
| Rudraprayag | 3 | Wave ✓ | — | — | Pilgrim corridor |
| Almora / Ranikhet / Pithoragarh | 4 | ✓ E | — | — | Hold; Wave routes exist |
| Bageshwar / Champawat / Chamoli / Uttarkashi | 4 | Wave ✓ | — | — | Uttarkashi ranks ~8 — CTR only; **no expansion** |
| Jolly Grant / railway / ISBT | Hub | ✓ | ✓ | bike locals ✓ | Transport hubs — keep |

**SEO engine locations:** 55 entries (tier A17 / B27 / C11) with `indexableEligible` + `relevantServices` — reuse; do not invent lat/lng or offices.

**Expansion rule (indexable only if):**
1. Distinct intent  
2. Unique local facts (pickup, roads, restrictions)  
3. Real fulfilment statement  
4. Unique title/H1/meta  
5. Links to `/taxi` or car/bike hub  
6. No fabricated prices/reviews  

---

## 7. Competitor analysis (SERP observation)

| Competitor | Strength | Opportunity for AroraCars |
|------------|----------|---------------------------|
| **Anywhere Taxi** (anywherecab.com) | ₹/km tables, 4.9★ reviews, Clement Town NAP, route packages | Honest quote UX + multi-category desk (auto/Chota/bike) they lack |
| **DoonCabs** | Airport fare tables, flight-wait messaging | Stronger Jolly Grant + airport-to-hill pages without fake certainty |
| **Triveni Cabs** | Aggressive ₹/km, route count claims | Trust via clear enquiry + existing local niches |
| **uktaxi.in / uttarakhand.cab / uttarakhandtaxi.in** | State-wide taxi framing | Own `/taxi` as real UK hub with city/route IA |
| **Savaari / national apps** | Route fare grids, brand trust | Local desk + WhatsApp speed; niches (auto, Chota, scooty) |
| **Shiv Ganga / Char Dham operators** | Pilgrim fare tables | Honest motorable-limit copy on Char Dham / Kedarnath pages |

**Do not copy** fare tables or review markup. Win with clearer intent split (taxi vs rental), better internal links, and categories competitors ignore.

---

## 8. Ranking opportunities (evidence-ranked)

1. **Tier-1 taxi cities** stuck at pos 28–90 with impressions — content/SERP quality gap, not “no page”.  
2. **`/taxi` at pos ~5.8** with tiny impr — underlinked hub; push from home, car hub, cities.  
3. **Airport demand** sits on Jolly Grant car URL — align taxi primary + cross-links.  
4. **Uttarkashi / Guptkashi** already Top-10-ish — CTR experiments before new towns.  
5. **Car/luxury/wedding/self-drive** — second wave after taxi P0.  
6. **Bike hub Top-10** — third priority; locals already visible.  
7. **Protect auto/Chota** — still majority of non-brand commercial clicks.

---

## 9. Cannibalisation risks

| Cluster | URLs | Rule |
|---------|------|------|
| Taxi city vs Wave taxi-service-in-* | Hand hubs + Wave towns | Tier-1 hand pages = money; Wave towns = no new clones |
| Route taxi vs car-rental-dehradun-to-* | e.g. Mussoorie/Rishikesh/Haridwar | Taxi = transfer quote; Car = hire period; cross-link, distinct H1/title |
| Airport taxi vs Jolly Grant car | `/dehradun-airport-taxi` vs `/jolly-grant-airport-car-rental` | Airport taxi owns “taxi”; Jolly owns “airport car rental / DED pickup” |
| Chauffeur car vs taxi Dehradun | chauffeur page vs taxi-service-in-dehradun | Chauffeur = day hire with driver; taxi = trip transfer |
| Bike hub vs ISBT/Clock Tower | three URLs | Locals must not steal head term; link up to hub |
| Soft-canonical aliases | enrichment `canonicalSlug` | Keep |
| Wave1 metros | Delhi/Bangalore airports etc. | Ignore for UK; optional later noindex **with plan** |

**Do not merge** taxi city pages with car hubs or auto PDPs.

---

## 10. Technical SEO status

| Item | Status |
|------|--------|
| Apex canonical + www→apex | OK — keep |
| robots + sitemap apex | OK |
| Metadata uniqueness | Mostly per-slug; Wave templates risk sameness — audit Tier-1 titles first |
| Soft-canonicals | OK |
| Index bloat | Wave2/3 + Wave1 inflate avg pos — hygiene later, not mass delete now |
| Structured data | Keep gated; no fake ratings/fares |
| CWV / mobile | Mobile GSC healthier; desktop avg diluted by query mix |
| `/property` | Out of scope |
| 404s | Wait for GSC Not-found export |

---

## 11. Internal linking architecture (target)

```
/taxi                          ← Uttarakhand taxi hub
├── taxi-service-in-{tier1}    ← Dehradun, Mussoorie, Rishikesh, Haridwar, Nainital, Haldwani
├── dehradun-to-*-taxi         ← high-intent routes
├── dehradun-airport-taxi (+ legs)
├── *-sightseeing-taxi
└── char-dham / kedarnath / badrinath taxi

/car-rental-dehradun           ← car hub (self-drive + with driver)
├── self-drive / luxury / wedding / monthly / outstation
├── jolly-grant-airport-car-rental
└── car-rental-dehradun-to-*   ← period hire framing

/bike-rental-dehradun          ← bike hub
├── scooty-on-rent-dehradun
├── ISBT / Clock Tower locals
└── verified hill bike pages only
```

Home + footer should surface **Taxi | Car | Bike** clearly. Contextual anchors — avoid stuffing exact-match “taxi service in X” on every link.

---

## 12. Conversion tracking

Already: Call / WhatsApp CTAs, consent-gated `analytics_v1`, admin cookie traffic.  
Propose later (privacy-conscious): event labels for taxi vs car vs bike landing, location enquiry city field already via `enquiryCity`.  
**Never** count CTA click as completed booking.

---

## 13. Recommended implementation (controlled batches — needs approval)

### Already done (do not redo)
Recovery Batches 1–3 money SERP (auto, Chota, bike locals, scooty, monthly, Jolly, car hub) + Privacy + admin traffic UI.

### Batch T1 — Taxi Tier-1 SERP (highest impact)
Enrich **only**: `/taxi`, Dehradun, Mussoorie, Rishikesh, Haridwar (+ Nainital/Haldwani if capacity), and routes: Dehradun→Mussoorie/Rishikesh/Haridwar, `/dehradun-airport-taxi`.  
Unique titles/H1s, stronger intros, FAQs, related links to hub, explicit taxi-vs-rental lines. **No new URLs. No fare invention.**

### Batch T2 — Airport + pilgrimage taxi clarity
Jolly Grant ↔ airport taxi ownership; Char Dham / Kedarnath honesty pass; CTR on Uttarkashi/Guptkashi if still ranking.

### Batch C1 — Car second priority
Self-drive relevance, luxury push, wedding CTR, outstation vs taxi clarity.

### Batch B1 — Bike third
Dehradun bike hub Top-10 push; then evaluate Rishikesh.

### Batch L1 — Linking
Home/footer/taxi hub ↔ Tier-1; car hub ↔ taxi hub; breadcrumbs via existing linking helper where safe.

### Batch H1 — Hygiene (later, with plan)
Wave1 metro noindex candidates; Wave3 ultra-thin route review — **no mass deletes**.

### Explicitly deferred
Wave 4–6 · mass Tier-3/4 new pages · fabricated UK offices · `/property` · blind 404 redirects.

---

## 14. 30 / 60 / 90-day roadmap

| Horizon | Focus | KPIs (GSC + leads) |
|---------|--------|--------------------|
| **30 days** | Protect auto/Chota/home; ship Batch T1; wait crawl | Taxi Tier-1 pages: impr, CTR, pos; taxi Top-10 query count; Call/WA counts |
| **60 days** | T2 + C1; linking; optional desktop-only GSC | Non-brand clicks; car Top-10 count; airport CTR |
| **90 days** | B1; selective hygiene; only then justified new UK pages | Taxi Top-3 candidates; qualified taxi enquiries; booking where trackable |

**Do not** promise Top-10 by day 30. Measure trend after 2–4 weeks of GSC lag post-deploy.

### Scoreboard to track
- Taxi Top 3 / Top 10 keyword counts (manual list from §3)  
- Car Top 10 / Bike Top 10 counts  
- Non-branded clicks · CTR · impressions  
- Money URL table (Tier-1 taxi + car hub + bike hub)  
- Qualified leads (phone/WA) by landing family  

---

## 15. Approval gate

**This document is Phase 1–2 research.** No production SEO code changed for the Uttarakhand growth project in this turn.

**Recommended first implementation after approval:** **Batch T1** (Taxi Tier-1 city + core route + hub + airport taxi) — improve existing URLs only.

Reply with:
1. **Approve Batch T1**  
2. **T1 + T2 together**  
3. **Taxi T1 + Car C1 parallel**  
4. **Wait** on recovery GSC lag first  

Supporting data: `docs/gsc-exports/2026-11-15/_uk-segment-analysis.json`, `_uk-inventory.json`.
