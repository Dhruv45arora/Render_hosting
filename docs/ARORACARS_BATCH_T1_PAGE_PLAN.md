# Batch T1 — Page-Level Implementation Plan (Taxi Tier-1)

**Date:** 2026-11-15  
**Status:** Awaiting approval — **no production code changed yet**  
**Scope:** Improve existing taxi URLs only (+ minimal car-route keyword hygiene for cannibalisation)  
**Out of scope:** New URLs, Wave pages, auto/Chota/home edits, fare tables, fake reviews, bike work  

**Implementation method (proposed):** `PAGE_ENRICHMENTS` in `data/page-enrichments.ts` for titles/meta/intro/sections/FAQs/relatedSlugs — same pattern as Batches 1–3. Optional tiny secondaryKeyword edits on three car-route pages in `data/pages.ts` to stop bidding on taxi head terms.  
**Canonical:** unchanged apex `https://aroracars.com/{slug}`  

**GSC window:** Aug 14 – Nov 13 2026 (`docs/gsc-exports/2026-11-15/Pages.csv`). Apex rows unless noted. Aggregates for www+apex noted where both appear.

**Measurement (all pages):** After deploy + 14–28 days crawl lag — track clicks, impressions, CTR, avg position per URL in GSC; Call/WhatsApp events on those landings. **Do not claim rankings improved on deploy day.**

---

## Cross-cutting: taxi vs car cannibalisation

| Conflict | Car URL | Taxi URL | Issue | Proposed fix in T1 |
|----------|---------|----------|-------|--------------------|
| Mussoorie corridor | `/car-rental-dehradun-to-mussoorie` (www: 3c/27i/@18.5; apex: 0/20/@36) | `/dehradun-to-mussoorie-taxi` (0/5/@77.4) | Car page **secondaryKeywords** include `"Dehradun Mussoorie taxi"` — bids on taxi intent | Remove taxi secondary; keep car primary; add reciprocal link to taxi route |
| Rishikesh corridor | `/car-rental-dehradun-to-rishikesh` (title contains “Taxi”; secondary `"Dehradun Rishikesh taxi"`) | `/dehradun-to-rishikesh-taxi` (near-zero GSC) | Title/secondary blur intents | Drop “Taxi” from car title; remove taxi secondary; link to taxi route |
| Haridwar corridor | `/car-rental-dehradun-to-haridwar` (secondary `"Haridwar taxi from Dehradun"`) | `/dehradun-to-haridwar-taxi` (near-zero) | Same | Remove taxi secondary; clarify chauffeur-day-hire vs trip-taxi in one sentence + link |
| Airport | `/jolly-grant-airport-car-rental` (~0/159/@13.9 agg) | `/dehradun-airport-taxi` (0/11/@50.8) | Jolly owns impr; taxi page buried | Enrichment already points taxi↔Jolly; reinforce: **airport taxi** KW → taxi URL; **airport car rental / DED pickup hire** → Jolly |
| Chauffeur hub | `/chauffeur-driven-car-rental-dehradun` | `/taxi-service-in-dehradun` | Day hire vs trip | Keep both; taxi city page links “day hire → chauffeur”; chauffeur links “point-to-point → taxi” (taxi side in T1) |

**Intent definitions (must appear on enriched pages):**  
- **Taxi** = chauffeur **transfer** with pickup + drop (one-way / round-trip / waiting).  
- **Car rental** = vehicle **hire for a period** (self-drive or with driver).  
- **Dehradun** = full desk. **Mussoorie / Rishikesh / Haridwar / Nainital / Haldwani** = enquiry tone (no fake local branch).

---

## 1. `/taxi` — Uttarakhand taxi hub

| Field | Detail |
|-------|--------|
| **Performance** | 0 clicks · 5 impr · **pos 5.8** · 0% CTR |
| **Intent** | Commercial hub: taxi service Uttarakhand; outstation / airport / city entry |
| **Weaknesses** | Already well-structured but underlinked from money non-taxi pages; secondaryKeywords dilute with “taxi Dehradun” (city page should own that); thin FAQ set; no explicit one-way vs round-trip / booking block above fold in SERP sense (meta OK, body generic vs competitors’ fare pages — we stay quote-based) |
| **Proposed content** | Tighten title/description toward UK + booking CTA without fares; add section “Taxi vs car rental”; add FAQ on one-way/round-trip and “are you based only in Dehradun?”; keep city/route/airport link blocks; badge stay enquiry desk |
| **Internal links** | relatedSlugs: ensure Tier-1 cities + 3 core routes + airport + car hub (for intent split) + contact; do **not** remove existing Char Dham link |
| **Cannibal risk** | Low if Dehradun city owns “taxi service in Dehradun”; hub owns UK / multi-city |
| **Expected benefit** | More hub impressions via links; better CTR when shown; supports Tier-1 discovery |
| **Measure** | GSC `/taxi` + branded “arora taxi service” (0/20/@21.2) |

---

## 2. `/taxi-service-in-dehradun` — **P0 money city**

| Field | Detail |
|-------|--------|
| **Performance** | 0 clicks · 23 impr · **pos 65.91** · 0% CTR |
| **Query drag** | “dehradun taxi service” 0/6/@104.5 |
| **Intent** | Local + outstation taxi from Dehradun desk (full-desk tone) |
| **Weaknesses** | Factory `cityTaxi` template — same section skeleton as every city; title/description generic (“No fake fares listed” in meta is defensive, weak CTR); does not dominate vs Anywhere/DoonCabs; insufficient SERP differentiation vs chauffeur + airport pages |
| **Proposed content** | Unique title/H1/meta (Call/WhatsApp 8445619130, Clock Tower desk, local + outstation + airport); custom intro naming desk; sections: local use cases, outstation corridors (link 3 routes), airport/station (link pages), taxi vs self-drive/chauffeur-day-hire, how to enquire; FAQs: areas, waiting, night hills, vs Uber-style apps (honest: private chauffeur quote) |
| **Tone** | **Full desk — Dehradun** |
| **Internal links** | `/taxi`, 3 routes, airport, railway, Char Dham, chauffeur (split), `car-rental-dehradun` (split), contact |
| **Cannibal risk** | vs chauffeur & airport — explicit split copy |
| **Expected benefit** | Highest taxi commercial upside if position moves from ~66 toward page 2–1 over time |
| **Measure** | URL + queries containing “dehradun” + “taxi/cab service” |

---

## 3. `/taxi-service-in-mussoorie`

| Field | Detail |
|-------|--------|
| **Performance** | 0 clicks · 1 impr · **pos 89** · 0% CTR |
| **Intent** | Hill-station taxi / transfers in & to Mussoorie (enquiry) |
| **Weaknesses** | Almost no visibility; factory template; Mall Road parking constraints are good but buried in pickup FAQ; no strong “from Dehradun” path in title/meta |
| **Proposed content** | Unique meta emphasising hill transfer + Mall Road meeting points + Dehradun desk fulfilment; sections: arrival via Dehradun road, sightseeing with waiting, evening descent, vehicle class for hills; FAQ on car vs walk to Mall |
| **Tone** | **Enquiry** — fulfilled from Dehradun desk / arranged chauffeur, not a Mussoorie shopfront claim |
| **Internal links** | `/taxi`, Dehradun taxi, `dehradun-to-mussoorie-taxi`, airport→Mussoorie, sightseeing, Haridwar/Rishikesh→Mussoorie |
| **Cannibal risk** | vs route taxi (route owns “Dehradun to Mussoorie taxi”; city owns “in Mussoorie”) |
| **Expected benefit** | Indexability/CTR foundation; slow impression growth |
| **Measure** | URL + “mussoorie taxi / cab” queries |

---

## 4. `/taxi-service-in-rishikesh`

| Field | Detail |
|-------|--------|
| **Performance** | 0 clicks · 18 impr · **pos 28.06** · 0% CTR |
| **Intent** | Tourist/ashram local + outstation taxi (enquiry) |
| **Weaknesses** | Mid-pack position, zero CTR — snippet not compelling; factory sameness; jhula lane constraints good but need H1/meta punch |
| **Proposed content** | Title/meta: ashram/Tapovan/ghat pins + Jolly Grant connection + WA; sections: local drops, Haridwar aarti combo, airport via DED, taxi vs scooty/bike (link bike only as “different product”, no bike SEO rewrite); FAQs on meeting pins |
| **Tone** | **Enquiry** |
| **Internal links** | `/taxi`, Dehradun taxi, Haridwar taxi, route + reverse, airport→Rishikesh, sightseeing |
| **Cannibal risk** | vs `dehradun-to-rishikesh-taxi` and car-rental route — clear “in Rishikesh” vs “from Dehradun transfer” |
| **Expected benefit** | Move toward Top 20→Top 10 band; CTR from 0% |
| **Measure** | URL + “rishikesh taxi/cab/booking” |

---

## 5. `/taxi-service-in-haridwar`

| Field | Detail |
|-------|--------|
| **Performance** | 0 clicks · 16 impr · **pos 40.19** · 0% CTR |
| **Query** | “taxi service in haridwar” 0/6/@72 |
| **Intent** | Pilgrim/station/aarti taxi (enquiry) |
| **Weaknesses** | Deep position; aarti waiting truth is strong content but template-hidden; needs pilgrimage-framed SERP without fake Char Dham price |
| **Proposed content** | Unique meta: station + Har Ki Pauri waiting honesty + outstation; sections: aarti evenings, station luggage, onward Rishikesh/Dehradun/Mussoorie, Char Dham road start (link); FAQ on ghat vehicle bans |
| **Tone** | **Enquiry** |
| **Internal links** | `/taxi`, Dehradun/Rishikesh taxi, Haridwar routes, Char Dham from Haridwar, airport→Haridwar |
| **Cannibal risk** | vs Char Dham pages (pilgrimage package vs city taxi) — keep Char Dham as related, not primary KW |
| **Expected benefit** | Position + CTR recovery on city term |
| **Measure** | URL + haridwar taxi queries |

---

## 6. Review — `/taxi-service-in-nainital` & `/taxi-service-in-haldwani`

| URL | Perf | Review verdict |
|-----|------|----------------|
| `/taxi-service-in-nainital` | 0/6/@48 | **Light T1 only** — unique meta + link to Haldwani/Kathgodam corridors + sightseeing; no long rewrite |
| `/taxi-service-in-haldwani` | 0/4/@67.5 | **Light T1 only** — emphasise plains gateway + Kathgodam→Nainital; enquiry tone; link Nainital |

| Field | Nainital | Haldwani |
|-------|----------|----------|
| **Intent** | Lake hill taxi | Plains gateway taxi |
| **Weaknesses** | Factory; far from Dehradun desk narrative clarity | Confused with Kathgodam searches |
| **Proposed** | Short enrichment: restricted roads, Tallital/Mallital, links | Short enrichment: ISBT/Kathgodam, dawn Nainital runs |
| **Links** | `/taxi`, Haldwani, Haldwani/Kathgodam routes, Dehradun→Nainital | `/taxi`, Nainital, Kathgodam pages |
| **Cannibal** | vs Haldwani↔Nainital route pages — city vs corridor | Same |
| **Benefit** | Prevent thin overlap; modest clarity | Same |
| **Measure** | URL-level GSC only |

If capacity is tight after P0 pages: ship Nainital/Haldwani as **meta + relatedSlugs only**.

---

## 7. `/dehradun-to-mussoorie-taxi` — **P0 route**

| Field | Detail |
|-------|--------|
| **Performance** | 0 clicks · 5 impr · **pos 77.4** |
| **Query** | “dehradun to mussoorie taxi” 0/3/@80 |
| **Intent** | Point-to-point chauffeur Dehradun → Mussoorie |
| **Weaknesses** | Losing to car-rental sibling (which ranks better and currently targets taxi secondary KW); factory route body OK but SERP title not winning; destinationNote incorrectly mentions “Tallital” (Nainital term) — **fix to Mall/Library/Landour only** |
| **Proposed content** | Stronger title/description (one-way/round-trip, hill climb, quote); fix Landour/Mall copy; section “Taxi transfer vs car rental for this climb” linking `/car-rental-dehradun-to-mussoorie`; keep traffic/fog honesty |
| **Internal links** | City taxis both ends, sightseeing, airport→Mussoorie, sibling routes, **car rental route** (labelled) |
| **Cannibal risk** | **High** until car secondaryKeywords cleaned |
| **Expected benefit** | Reclaim route taxi queries from car page |
| **Measure** | Both URLs + exact route query |

---

## 8. `/dehradun-to-rishikesh-taxi`

| Field | Detail |
|-------|--------|
| **Performance** | Not in top Pages export (≈0 impr) |
| **Intent** | Transfer Dehradun → Rishikesh |
| **Weaknesses** | Invisible; car page title still says “Self Drive & Taxi”; relatedSlugs missing car-rental sibling |
| **Proposed content** | Enrich title/meta/intro; taxi vs rental section; jhula meeting-pin FAQ; add related → `car-rental-dehradun-to-rishikesh` |
| **Links** | Cities, reverse route, airport leg, Haridwar route, car rental |
| **Cannibal risk** | Medium — fix car title/secondaries |
| **Expected benefit** | Indexation + eventual route impressions |
| **Measure** | URL + “dehradun to rishikesh taxi/cab” |

---

## 9. `/dehradun-to-haridwar-taxi`

| Field | Detail |
|-------|--------|
| **Performance** | Near-zero in export |
| **Intent** | Transfer Dehradun → Haridwar (station/aarti) |
| **Weaknesses** | Invisible; car page holds taxi secondary |
| **Proposed content** | Enrich for aarti/station buffers; taxi vs rental; link Char Dham only as “next morning onward” |
| **Links** | Cities, reverse, airport→Haridwar, car rental route, Char Dham from Haridwar |
| **Cannibal risk** | Medium |
| **Expected benefit** | Foundation for pilgrim corridor queries |
| **Measure** | URL + route queries |

---

## 10. `/dehradun-airport-taxi`

| Field | Detail |
|-------|--------|
| **Performance** | 0 clicks · 11 impr · **pos 50.82** |
| **Sibling** | Jolly Grant car: high impr ~159 @ ~14 — already “Taxi & Car” titled in enrichment |
| **Intent** | **Primary** for “Dehradun airport taxi” / “Jolly Grant airport taxi” as **transfer** |
| **Weaknesses** | Losing to Jolly car URL; thin sections vs competitor fare tables (we stay quote-based); needs flight-number / delay FAQ prominence in meta |
| **Proposed content** | Title/meta double down on airport **taxi** pickup/drop; section mapping destinations (city / Mussoorie / Rishikesh / Haridwar links); “When to use Jolly Grant car rental page instead” (self-drive after hotel or multi-day hire); keep no invented fares |
| **Internal links** | Three airport-to-* taxis, Dehradun taxi, `/taxi`, **jolly-grant-airport-car-rental**, railway |
| **Cannibal risk** | **High** with Jolly — ownership table above; do not change Jolly URL |
| **Expected benefit** | Grow taxi-intent share; Jolly keeps car-rental airport demand |
| **Measure** | Both URLs + “airport taxi” / “jolly grant taxi” / “DED cab” queries |

---

## Supporting edits (cannibal hygiene — same batch)

| File / page | Change | Why |
|-------------|--------|-----|
| `car-rental-dehradun-to-mussoorie` | Remove `"Dehradun Mussoorie taxi"` from secondaryKeywords; optional one sentence + link to taxi route | Stop stealing taxi SERP |
| `car-rental-dehradun-to-rishikesh` | Title: drop “& Taxi”; remove `"Dehradun Rishikesh taxi"` secondary; link taxi route | Same |
| `car-rental-dehradun-to-haridwar` | Remove `"Haridwar taxi from Dehradun"` secondary; link taxi route | Same |

**Not in T1:** Rewriting car hubs, bike, auto, Chota, home, Wave URLs.

---

## Internal linking summary (Batch T1)

```
/taxi
  ↔ Dehradun, Mussoorie, Rishikesh, Haridwar (+ Nainital, Haldwani light)
  ↔ dehradun-to-{mussoorie,rishikesh,haridwar}-taxi
  ↔ dehradun-airport-taxi

Each city ↔ /taxi + relevant routes + airport where applicable
Each route ↔ origin city + destination city + car-rental sibling (labelled) + /taxi
Airport taxi ↔ /taxi + Dehradun taxi + airport legs + Jolly car (labelled)
```

Optional later (not blocking T1): homepage footer “Taxi” link if missing — verify only; no homepage content rewrite that risks rankings.

---

## Implementation checklist (after approval)

1. Add enrichments for pages §1–5, §7–10 (+ light §6).  
2. Apply three car-route secondaryKeyword/title hygiene edits.  
3. Confirm no slug/canonical changes; no auto/Chota/home touches.  
4. Production build.  
5. Spot-check rendered title/canonical/H1 on each T1 URL.  
6. Validate related links resolve.  
7. Document modified files list.  
8. **No ranking claims** — schedule GSC review ~2–4 weeks.

---

## Expected SEO benefit (honest)

| Outcome | Likelihood | Notes |
|---------|------------|-------|
| Clearer SERP snippets / CTR on Tier-1 taxi URLs | Medium–High | Controllable |
| Dehradun taxi moving from ~pos 66 toward stronger band | Medium | Competitive SERPs; takes time |
| Route taxi reclaiming queries from car pages | Medium | After keyword hygiene |
| Immediate Top 10 for “taxi service Dehradun” | **Not claimed** | Competitors strong on fares/reviews |
| Harm to auto/Chota/home | Low if scope respected | Do not edit those files |

---

## Approval

Reply **approve Batch T1 as specified** (or note exclusions, e.g. skip Nainital/Haldwani body copy) to proceed with controlled code changes + build validation.
