# Phase 2B — Money-page SERP & content recommendations (for review)

**Date:** 2026-11-10  
**Status:** Recommendations only. **No production code applied yet.**  
**Scope:** Auto · Chota Hathi · Bike ISBT · Bike Clock Tower · Monthly · Jolly Grant · Scooty · Car hub · **Privacy Policy (new)**  
**Out of scope:** `/property` · Wave 4–6 · blind 404 redirects · inventing prices/fleet ownership  

GSC context (last 3 months, www+apex aggregated): see `docs/ARORACARS_SEO_PHASE2_GSC_REPORT.md`.

---

## Global rules for this batch

| Rule | Application |
|------|-------------|
| URLs | **Unchanged** |
| Canonicals | Keep apex self-canonical; no soft-canonical changes |
| Indexability | Stay `index,follow` on all eight money pages; Privacy = index |
| Ownership language | Desk / verified partners as already used; no “we own every vehicle” |
| Prices | Point to live fleet cards + WhatsApp confirm; no new invented rate tables |
| Thin content | Enrich only with Dehradun-specific process, pickup, documents, intent splits |
| Internal links | Add useful relatedSlugs; no footer spam |
| Implementation order (after approval) | Batch 1 → Batch 2 → Batch 3 → Privacy |

**Proposed batches after you approve this doc:**

1. **Batch 1:** Auto hub + Chota Hathi  
2. **Batch 2:** Bike ISBT + Bike Clock Tower + Scooty  
3. **Batch 3:** Monthly + Jolly Grant + Car hub  
4. **Batch 4:** Privacy Policy page + footer/trust links  

---

## 1. Auto hub — `/three-wheeler-auto-rental-dehradun`

| Field | Current | GSC |
|-------|---------|-----|
| Title | Auto Rickshaw on Rent in Dehradun \| 3 Wheeler & E-Rickshaw \| Arora Cars | — |
| H1 | Three-Wheeler & Auto Rental in Dehradun | — |
| Meta | Auto rickshaw and 3-wheeler… Full-day… 8445619130 | — |
| Perf | **34 clicks / 776 impr / 4.4% CTR / pos 6.2** | Highest commercial imprint |

### Search intent
Commercial local: **hire an auto/e-rickshaw for a day or short city use** — not flag-down street fare, not airport taxi. GSC queries: `auto rent per day`, `auto rickshaw rent per day`, `electric auto rent near me`, `auto kiraya`, `rickshaw kiraya`, `dehradun auto rickshaw number`.

### SERP competition (observed themes)
Travel guides explain street autos/Vikrams and negotiated trip fares; taxi sites push cabs for airport. Few pages clearly sell **rental/full-day auto packages**. Opportunity: own the **rental** intent vs trip-fare content.

### Overlap / cannibalization
| URL | Role |
|-----|------|
| This hub | Category: passenger auto, full-day, e-rickshaw, goods auto |
| `/rent/auto-rickshaw-rental-dehradun` | Product |
| `/rent/e-rickshaw-rental-dehradun` | Product |
| `/rent/auto-rickshaw-full-day-dehradun` | Package product |
| Chota Hathi hub | Goods when load needs a bed |

**Keep all.** Hub owns head terms; PDPs own model.

### Proposed changes
| Element | Recommendation |
|---------|----------------|
| **Title** | `Auto Rickshaw Rent per Day in Dehradun \| 3 Wheeler & E-Rickshaw \| Arora Cars` |
| **Meta** | Lead with per-day / kiraya + phone for “number” intent: e.g. full-day city packages, e-rickshaw, call/WhatsApp **8445619130**. Stay ≤~155 chars. |
| **H1** | Keep (already clear). Optional minor: `Auto Rickshaw & E-Rickshaw on Rent in Dehradun` |
| **Intro** | One line: rental desk vs street flag-down; autos not for Jolly Grant (link car/airport). |
| **H2s** | Add: “Auto rent per day / kiraya”; “Passenger vs e-rickshaw vs goods auto”; “When to book a car or Chota Hathi instead”. |
| **FAQs** | Add: phone number FAQ; Hindi “kiraya” explanation; “Can autos go to Jolly Grant?” → No, use airport car/taxi. |
| **Links** | Add `/rent/e-rickshaw-*` and `/rent/auto-rickshaw-*` in related if not already obvious from fleet; keep Chota; add `/contact-book-now`. |

**Do not:** invent ₹/km street fares; create new auto keyword URLs.

---

## 2. Chota Hathi — `/chota-hathi-mini-truck-rental-dehradun`

| Field | Current | GSC |
|-------|---------|-----|
| Title | Chota Hathi Booking Dehradun \| Mini Truck on Rent \| Arora Cars | Already has “Booking” |
| Perf | **18 / 447 / 4.0% / 6.8** | Queries `chota hathi booking` CTR **~1.7% @ pos 4.6** |

### Search intent
**Book a mini truck / Tata Ace for shifting or goods** in Dehradun — trip or day hire with driver common.

### SERP competition
BookMyTempo, Grewal, Porter-style aggregators with rate tables and labour add-ons. Reddit points to Nalapani / Dilaram / EC Road walk-up. Compete on **local desk + WhatsApp booking clarity**, not fake rate wars.

### Overlap
Hub vs `/rent/tata-ace-chota-hathi-dehradun` / Dost / Bolero pickup PDPs; goods auto on three-wheeler hub.

### Proposed changes
| Element | Recommendation |
|---------|----------------|
| **Title** | Keep “Booking” early: `Chota Hathi Booking in Dehradun \| Tata Ace & Mini Truck \| Arora Cars` |
| **Meta** | Lead with booking + shifting/goods + phone; mention Ace/Dost/Bolero pickup; “rates on vehicle cards — confirm before advance”. |
| **H1** | Keep or `Chota Hathi Booking & Mini Truck Rental in Dehradun` |
| **H2s** | “How Chota Hathi booking works”; “What to tell us (load, floors, pickup/drop)”; “Labour / helpers — ask on call (not always included)”; “Goods auto vs Chota Hathi”. |
| **FAQs** | Same-day booking?; helper included?; PG/1BHK shift fit?; Dost vs Ace. |
| **Links** | Ace PDP, Bolero pickup, three-wheeler hub, how-to-book, contact. |

**Do not:** paste competitor ₹ tables; claim Porter-like pan-India coverage.

---

## 3. Bike near ISBT — `/bike-rental-near-isbt-dehradun`

| Field | Current | GSC |
|-------|---------|-----|
| Title | Bike Rental near ISBT Dehradun \| Arora Cars | Thin |
| Enrichment title | Bike & Scooty Rental near ISBT… | Better |
| Perf | **1 / 226 / 0.4% / 9.4** | **Worst CTR among money pages** |

### Search intent
**Pickup a bike/scooty right after bus arrival at ISBT Dehradun** — local modifier, not head “bike rental Dehradun”.

### SERP competition
Generic bike rental Dehradun pages + maps pins. Few pages answer: meeting pin, bus ETA, helmet, when to take a car instead.

### Overlap
Must **not** steal head terms from `/bike-rental-dehradun`. This page = ISBT logistics only. Link up to hub strongly.

### Proposed changes
| Element | Recommendation |
|---------|----------------|
| **Title** | `Bike & Scooty Pickup near ISBT Dehradun \| Bus Stand Rental \| Arora Cars` |
| **Meta** | Bus ETA → WhatsApp pin → licence/helmet; Activa/Pulsar/Bullet by arrangement; phone; “for city-wide fleet see bike hub”. |
| **H1** | Keep location-specific |
| **H2s** | Meeting point; what to carry (licence, ID); Activa vs bike after a long bus; link car-near-ISBT for luggage groups; evening arrival rules. |
| **FAQs** | Late bus wait?; scooty at ISBT?; documents at bus stand vs Clock Tower. |
| **Links** | Bike hub (primary), scooty hub, car-near-ISBT, railway, how-to-book. |

**Risk if over-optimized for “bike rental Dehradun”:** cannibalize hub. Keep ISBT in title/H1.

---

## 4. Bike near Clock Tower — `/bike-rental-near-clock-tower-dehradun`

| Field | Current | GSC |
|-------|---------|-----|
| Title | Bike Rental near Clock Tower Dehradun \| Arora Cars | |
| Meta | Bike on rent near Clock Tower and Paltan Bazaar… | |
| Perf | **1 / 130 / 0.8% / 8.0** | Exact query exists, 0 CTR |

### Search intent
Walk-up / hotel guests near **Clock Tower / Paltan Bazaar** wanting two-wheelers same day.

### Overlap
Same as ISBT: support page for hub. Car-near-Clock-Tower is sibling.

### Proposed changes
| Element | Recommendation |
|---------|----------------|
| **Title** | `Bike on Rent near Clock Tower Dehradun \| Paltan Bazaar Pickup \| Arora Cars` |
| **Meta** | Match query wording; Bullet/Pulsar/Activa; same-hour pickup; phone. |
| **Content** | Desk location context (Clock Tower area); hotel delivery; Paltan evening traffic honesty; helmets/docs (already started). |
| **FAQs** | Walk-up same day?; hotel delivery radius; link to full bike hub models. |
| **Links** | Bike hub, scooty hub, car-near-clock-tower, ISBT bike (for bus arrivals). |

**Note:** Enrichments currently thin vs ISBT — add enrichment block in Batch 2 (parity).

---

## 5. Monthly car — `/monthly-car-rental-dehradun`

| Field | Current | GSC |
|-------|---------|-----|
| Title | Monthly Car Rental Dehradun \| Long Stay Self Drive \| Arora Cars | |
| Meta | Monthly self drive car and SUV… | Generic |
| Perf | **0 / 64 / 0% / 7.4** | **Good position, zero clicks** → snippet mismatch |

### Search intent
Long-stay **self-drive month hire** for interns/project staff/families. SERP also full of **subscription apps** (MyChoize, Rentrip) — GSC shows `car subscription dehradun` separately.

### Overlap
Weekly page, self-drive hub, car hub. Monthly owns duration intent.

### Proposed changes
| Element | Recommendation |
|---------|----------------|
| **Title** | `Monthly Car Rental in Dehradun \| 30-Day Self Drive Hire \| Arora Cars` |
| **Meta** | Stress **local desk monthly hire** (not app subscription): km cap confirmed on call, insurance stays with desk, Swift/Creta-class examples, phone. |
| **H1** | Keep |
| **H2s** | Who it’s for; what’s included vs fuel/tolls; km cap honesty; monthly vs weekly vs subscription apps; documents/deposit. |
| **FAQs** | Is this a car subscription?; can I keep 30+ days?; service during hire?; chauffeur monthly? (usually separate quote). |
| **Links** | Weekly, self-drive, documents, pricing, car hub, contact. |

**Do not:** invent ₹23,999-style subscription prices from competitors.

---

## 6. Jolly Grant airport — `/jolly-grant-airport-car-rental`

| Field | Current | GSC |
|-------|---------|-----|
| Title | Jolly Grant Airport Car Rental \| Dehradun Airport Pickup \| Arora Cars | Decent |
| Perf | **0 / 157 / 0% / 13.9** | Page ~2, zero clicks |

### Search intent
**Airport pickup / transfer from DED (Jolly Grant)** to Dehradun / Mussoorie / Rishikesh — usually chauffeur. Queries also: `car rental at dehradun airport`, `Dehradun airport taxi`.

### Overlap
| URL | Role |
|-----|------|
| This page | Airport **car rental / chauffeur pickup** product |
| `/dehradun-airport-taxi` (taxi cluster, if live) | Taxi/trip quote framing |
| Chauffeur hub | Broader with-driver |
| Car hub | Umbrella |

**Differentiate:** This page = flight-tracked kerb pickup + vehicle class. Link taxi page if present without merging URLs. Meta secondary already includes “Dehradun airport taxi” — keep as secondary, don’t retitle as pure taxi.

### Proposed changes
| Element | Recommendation |
|---------|----------------|
| **Title** | `Jolly Grant Airport Taxi & Car Rental \| Dehradun (DED) Pickup \| Arora Cars` **or** keep car-rental primary and put taxi in meta only — prefer **car rental in title + taxi in meta** to avoid fighting taxi URL: `Jolly Grant (DED) Airport Car Rental \| Dehradun Pickup \| Arora Cars` |
| **Meta** | Include “Dehradun airport taxi / Jolly Grant pickup”; city, Mussoorie, Rishikesh; flight tracking; phone. |
| **H2s** | Flight tracking; vehicle by pax/bags; city vs Mussoorie vs Rishikesh; self-drive after hotel handover; “autos don’t serve airport”. |
| **FAQs** | Waiting charges window; night flights; meet-and-greet; link chauffeur hub. |
| **Links** | Add `/taxi` or `/dehradun-airport-taxi` if exists, car hub, Mussoorie/Rishikesh routes, railway (alternate arrival). |

---

## 7. Scooty — `/scooty-on-rent-dehradun`

| Field | Current | GSC |
|-------|---------|-----|
| Title (enrichment) | Scooty on Rent in Dehradun \| Activa Rental Near Station \| Arora Cars | |
| Perf | Hub **1 / 82 / 1.2% / 8.5**; Blog `best-scooty-for-dehradun-tourists` **0 / 133 / 9.7** | Blog ranks for shopping intent |

### Search intent
Tourist/local **Activa/automatic scooty hire**. “Best scooty in Dehradun” is often **buy/review** — blog steals imprint without converting.

### Overlap
Scooty hub vs railway scooty page vs bike hub vs blog.

### Proposed changes
| Element | Recommendation |
|---------|----------------|
| **Title** | Keep Activa + station signal |
| **Meta** | Stronger CTR: Activa on rent, station pickup, phone, “automatic scooty for city sightseeing”. |
| **H2s** | Already decent in enrichment; add ISBT mention + link; “best scooty for tourists” → rental framing (Activa 125 vs 6G for hills). |
| **FAQs** | Add: best scooty for first-time tourist?; licence; weekly Activa. |
| **Links** | Add bike hub, Clock Tower bike, ISBT bike, railway scooty, car hub. |
| **Blog (same batch light touch)** | Add clear CTA block + link to this hub; adjust blog meta so it doesn’t promise a shopping guide without rental path. **Do not delete blog.** |

---

## 8. Car hub — `/car-rental-dehradun`

| Field | Current | GSC |
|-------|---------|-----|
| Title | Car Rental in Dehradun \| Self Drive & With Driver \| Arora Cars | Solid |
| Perf | **7 / 135 / 5.2% / 11.0** | Page 2 push |

### Search intent
Umbrella **car hire Dehradun** (self + chauffeur). Competitors: local desks + national apps.

### Overlap
Self-drive, chauffeur, taxi, monthly, airport, SUV — already linked. Add clearer **“Need a taxi trip instead?”** module pointing to `/taxi` / taxi Dehradun without merging.

### Proposed changes
| Element | Recommendation |
|---------|----------------|
| **Title** | Keep (already aligned) |
| **Meta** | Slight CTR polish; keep phone; mention self-drive & with driver. |
| **H2** | New short section: Car rental vs taxi vs monthly — three links. |
| **FAQs** | Already strong; optional “car hire vs Ola for outstation”. |
| **Links** | Ensure monthly + Jolly Grant + taxi + auto/Chota (for users who need the wrong category) stay in related. |

**Do not:** rewrite H1 aggressively; protect equity.

---

## 9. Privacy Policy — **new** `/privacy-policy`

| Item | Recommendation |
|------|----------------|
| URL | `/privacy-policy` (new landing in `data/pages.ts`) |
| Index | **index,follow** |
| Title | `Privacy Policy \| Arora Cars Dehradun` |
| H1 | Privacy Policy |
| Meta | How Arora Cars handles phone, WhatsApp and form enquiries for vehicle rentals in Dehradun. |
| Content | What we collect (name, phone, trip details); why (booking); WhatsApp/call; cookies/analytics if used; no selling data; contact **8445619130**; retention at high level; Uttarakhand/India jurisdiction note aligned with terms. |
| Links | From footer + terms + how-to-book + contact |
| Schema | None beyond WebPage/breadcrumb if sitewide |

**Do not:** invent GDPR legalese beyond what’s true; no fake DPO.

---

## Keyword ownership matrix (this batch)

| Intent | Owner | Supporting |
|--------|-------|------------|
| Auto / 3W / kiraya / per day | Auto hub | Auto + e-rickshaw PDPs |
| Chota hathi booking | Chota hub | Ace/Dost PDPs |
| Bike rental Dehradun (head) | Bike hub *(not rewritten in this batch unless needed)* | ISBT + Clock Tower |
| Bike near ISBT | ISBT bike page | Hub |
| Bike near Clock Tower | Clock Tower bike page | Hub |
| Scooty / Activa rent | Scooty hub | Railway scooty + blog CTA |
| Monthly / long stay hire | Monthly page | Weekly + self-drive |
| Jolly Grant / DED car pickup | Jolly Grant car page | Chauffeur + taxi |
| Car rental Dehradun | Car hub | Self-drive + chauffeur |
| Privacy | Privacy page | Terms |

---

## What will **not** change

- Any money-page URL or canonical  
- Wave 4–6 publish  
- `/property`  
- Blind 404 redirects  
- Mass Wave1 metro noindex  
- Fake prices, ratings, fleet counts  

---

## Approval checklist

Reply with:

1. **Approve all** as written, or list pages to tweak.  
2. Confirm **Jolly Grant title**: keep “Car Rental” primary **or** allow “Taxi & Car Rental” in title.  
3. Confirm **Privacy** content can be practical/plain-English (recommended) vs lawyer-drafted later.  
4. Then implementation starts **Batch 1 (Auto + Chota)** only.
