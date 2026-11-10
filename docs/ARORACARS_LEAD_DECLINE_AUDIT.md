# AroraCars — Lead Decline Investigation Audit

**Date of audit:** 2026-11-10  
**Scope:** Evidence-based investigation only. **No production code, URL, canonical, redirect, DB, or deploy changes were made for this report.**  
**Repo HEAD at audit:** `d17266a` (2026-11-03) — `main` tracking `origin/main`  
**Business claim:** ~10 calls/day in October 2026 → ~4–5 calls/day in November 2026 (early month).

---

## 1. Executive summary

**We cannot prove a single root cause.** There is **no GSC CSV/export in the repo** for Aug–Nov 2026 daily clicks/impressions, and **no call-tracking export** that maps Google sessions → phone rings. Therefore “organic traffic collapsed” is **not confirmed** — only **hypothesized**.

What **is** confirmed from Git + live checks:

1. **Late October shipped a very large programmatic SEO expansion** (Wave 2: 302 pages on 2026-10-25; Wave 3: 122 pages on 2026-10-26 → ~640 landings reported). Live sitemaps currently expose hundreds of URLs (`sitemap-routes.xml` ≈ 381 `<loc>`, `sitemap-services.xml` ≈ 143).
2. **Commercial Dehradun hubs were rewritten for CTR/intent on 2026-10-31** (`d990c78`) including titles/descriptions for car, bike, three-wheeler, Chota Hathi, luxury — plus **www → apex permanent redirect**.
3. **Phone number identity changed twice in September** (before the “good October”): `8979490332` → `8057772925` (19 Sep) → `8445619130` Dilbag (29 Sep). Live homepage today uses **`tel:+918445619130`**.
4. **On 2026-10-29, admin was allowed to override phone/WhatsApp from the database** (`05a529a`), after a period where code forced `DEFAULT_PHONE`. That is a **conversion risk** if DB ever diverged from the owner’s ringing line.
5. **Render free cold starts** were previously measured at **~270s** for a cold homepage hit; keep-awake was added **2026-11-03**. Hosting was free during the “10 calls/day” period too — so cold starts are a **persistent conversion tax**, not a new October invention.
6. **AdSense `beforeInteractive`** ran ~31 Oct–3 Nov, then removed — short window of slower first paint / CTA competition.
7. **Google September 2026 spam update** completed **2026-10-08** (longest spam update of 2026). That timing overlaps Wave 1/2 publishing of large URL sets — **correlation risk for scaled/partner/taxi pages**, not proven site-level penalty.
8. **Seasonality is mixed:** Diwali week **6–11 Nov 2026** should raise tourist demand; Char Dham closing around Diwali typically **cuts yatra multi-day** demand vs October. Pure “market is dead” is **not sufficient** for early November Diwali week.

**Direct answer (see §15):** The drop is most likely a **blend** of (a) softer/mismatched demand mix vs October, (b) conversion friction on free Render + short AdSense window, (c) possible ranking/CTR volatility after host consolidation + hub metadata edits + massive URL expansion, and (d) **measurement** (which phone is counted). No single commit is proven to have “killed” rankings.

---

## 2. Business performance overview

| Metric | Claimed | Source quality |
|--------|---------|----------------|
| Calls/day Oct 2026 | ~10 | Owner report only |
| Calls/day Nov 1–10 2026 | ~4–5 | Owner report only |
| Confirmed deals | Declining | Owner report only |
| Organic clicks/impressions Aug–Nov | **Unknown** | No GSC export in repo |
| First-party visit analytics | Partial | Cookie analytics shipped 2026-11-03 (`d17266a`); history too short for Oct baseline |

**Important distinction:** Phone calls ≠ GSC clicks ≠ bookings. A site can keep impressions while CTR falls; or keep visits while `tel:` conversion falls; or ring a different SIM than the owner monitors.

---

## 3. Git commit timeline (2026-10-01 → 2026-11-10)

Branches: `main` (checked out), remotes: `origin/main`, `origin/revamp`, `origin/second`.

| Date | Hash | Summary | SEO / lead relevance |
|------|------|---------|----------------------|
| 2026-10-06 | `5a55c97` | add new backlinks | Content/link edits in `pages.ts`, enrichments, home/blog |
| 2026-10-08 | `717ade6` | add new url | **Wave 1** hubs/pages; sitemap split; QuoteForm; Sticky WhatsApp text change |
| 2026-10-08 | `e9539f0` | resolce error | `tsconfig` only |
| 2026-10-25 | `b7348f6` | uttrakhand level seo 2 waves | **Wave 2 publish 302 pages**; CMS dual-render; taxi pages; schema/sitemap overhaul |
| 2026-10-26 | `746f9bf` | add new urls | **Wave 3 publish 122 pages**; landings total reported **640** |
| 2026-10-29 | `d01333f` | add new update | Tirupati strip script + large `pages.ts` / blog / enrichments churn; admin auth roles |
| 2026-10-29 | `3c3c7af` | Fix broken pages.ts syntax from Tirupati strip | Build-breaking content strip repaired |
| 2026-10-29 | `05a529a`…`c031282` | CEO desk / uploads / images | **Phone unlock from DB**; ops admin; fleet image pipeline |
| 2026-10-30 | `579e444`, `71ae553` | CEO + settings lock for developer | Owner-only phone keys for CEO role |
| 2026-10-31 | `d990c78` | add new update | **GSC wave:** hub titles/descriptions/FAQs; **www→apex**; remove LocalBusiness JSON-LD from `/rent/*` |
| 2026-10-31 | `663b3b8`, `9623469`, `d09a9c6` | AdSense | Script in layout + `ads.txt` |
| 2026-11-03 | `c6b6929` | add new udpate | **Remove AdSense**; keep-awake workflow + `/api/health` |
| 2026-11-03 | `d17266a` | add search bar and analytics | Home search; cookie visit tracking; lead bands on landings |

### Pre-window phone timeline (critical context)

| Date | Hash | Change |
|------|------|--------|
| 2026-08-30 | `e34feb3` | Site revamp; `DEFAULT_PHONE = 8979490332` |
| 2026-09-19 | `c4b0b49` | `DEFAULT_PHONE = 8057772925` (“add new phone”) |
| 2026-09-29 | `6bf395a` | `DEFAULT_PHONE = 8445619130` (“add dilbag sir number”) + mass meta phone string replace |

October’s “10 calls/day” already ran on **8445619130** (assuming deploy followed Sept 29). The Oct→Nov drop is **not explained by the Sept phone swap alone**, unless measurement/routing is split across SIMs.

---

## 4. Suspicious commits (severity scored)

### 4.1 `b7348f6` + `746f9bf` (25–26 Oct) — Wave 2/3 URL explosion  
**Severity: High (risk) / Evidence: Strong for scale, Weak for proven ranking loss**

- Files: `data/wave2-pages.ts`, `data/wave3-pages.ts`, `data/taxi-pages.ts`, `data/seo-engine/*`, `lib/sitemap-sets.ts`, `lib/cms/resolve-landing.ts`, reports claiming **518 then 640** landings.
- What changed: Hundreds of taxi/route/city pages entered production + sitemaps.
- Potential impact: Crawl dilution; soft cannibalization of “taxi / route” intents; spam-update sensitivity for scaled templates.
- Evidence: Wave summaries in `reports/wave2-production-summary.txt`, `reports/wave3-production-summary.txt`; live sitemap route count ≈ **381**.
- Causation: **Not proven** that Dehradun auto/bike hubs lost positions because of this — but timing precedes early-Nov lead complaint.

### 4.2 `d990c78` (31 Oct) — Hub SERP rewrites + www→apex + PDP schema change  
**Severity: Medium**

- Files: `data/pages.ts`, `data/page-enrichments.ts`, `next.config.js`, `app/(public)/rent/[slug]/page.tsx`, home, Header.
- What changed: Titles/descriptions/FAQs on **protect/push hubs**; permanent www→apex; removed repeated `CarRental` LocalBusiness from every vehicle PDP.
- Potential impact: Short-term CTR/ranking volatility while Google recrawls; host consolidation can reshuffle GSC properties.
- Evidence: Diffs in commit; documented in `docs/seo-gsc-wave-report.md`.
- Causation: Plausible contributor to **SERP churn**, not proven sole cause of −50% calls within days.

### 4.3 `05a529a` (29 Oct) — Phone/WhatsApp readable from DB again  
**Severity: High (conversion) if DB ≠ ringing line; otherwise Low**

- Files: `lib/settings.ts`.
- What changed: From forced `DEFAULT_PHONE` → `map.phone \|\| DEFAULT_PHONE`.
- Evidence: Git diff on `lib/settings.ts`.
- Live check 2026-11-10: homepage contains `tel:+918445619130` (matches Dilbag default).
- **Owner must verify** Neon/`SiteSetting` rows for `phone` / `whatsapp` were never set to `8057772925` or `8979490332` during the decline window.

### 4.4 AdSense commits `9623469` / `d09a9c6` then removal `c6b6929` (31 Oct–3 Nov)  
**Severity: Medium (short window)**

- `beforeInteractive` AdSense on root layout → known LCP/INP risk; competes with Call/WhatsApp.
- Removed within ~3 days; live HTML has **no** `adsbygoogle` (checked 2026-11-10).
- Could explain a **brief** conversion dip, not a sustained month alone.

### 4.5 `717ade6` Sticky WhatsApp copy (8 Oct)  
**Severity: Low–Medium (conversion UX)**

- Prefill changed from clear Dehradun booking intent to:  
  `"Hi Arora Cars, I need a rental quote. My rental city is: "`  
- Still opens correct `wa.me` if number is right; friction is incomplete message, not a broken link.

### 4.6 Tirupati strip `d01333f` / `3c3c7af` (29 Oct)  
**Severity: Medium (content integrity risk), mitigated**

- Large automated content mutation + emergency syntax fix.
- Risk of damaged copy/links on non-Tirupati pages if strip was over-broad.
- Build was restored; residual SEO quality debt possible — needs spot-check of top GSC URLs (not done as a full content QA in this audit).

### 4.7 Free Render cold start (infra, not one commit)  
**Severity: High (conversion), Low as “new Oct cause”**

- Prior measurement: cold homepage **~269709 ms**, warm ~866 ms.
- Keep-awake added `c6b6929` (3 Nov). Health now ~400–500 ms when warm.
- Because free Render existed during the 10-call period, this explains **lost leads on quiet hours**, not by itself the step-change — unless traffic mix shifted to more cold-start sessions or competitors got faster.

---

## 5. SEO performance comparison (GSC)

### 5.1 Available data (repo)

**Only** a static snapshot in `docs/seo-gsc-wave-report.md` (dated 2026-10-31), summarizing ~last 3 months **before/at** the CTR wave:

| URL | Impr | Clicks | CTR | Avg pos (snapshot) |
|-----|------|--------|-----|---------------------|
| `/` | 295 | 40 | 13.56% | 8.02 |
| `/three-wheeler-auto-rental-dehradun` | 594 | 30 | 5.05% | 5.84 |
| `/bike-rental-dehradun` | 263 | 9 | 3.42% | 12.06 |
| `/rent/auto-rickshaw-rental-dehradun` | 209 | 9 | 4.31% | 6.49 |
| `/rent/e-rickshaw-rental-dehradun` | 147 | 8 | 5.44% | 4.25 |
| `/chota-hathi-mini-truck-rental-dehradun` | 125+ | — | — | ~7 |
| `/car-rental-dehradun` | 96 | 6 | — | 13.85 |
| `/luxury-car-rental-dehradun` | 50 | 6 | — | 9.38 |

### 5.2 What we **cannot** answer without a new GSC export

- Whether total clicks fell Aug→Sep→Oct→Nov 1–10  
- Mobile vs desktop split  
- Query-level losers for auto / Chota Hathi / bike  
- Whether www and apex still split before redirect  
- Whether Wave 2/3 URLs stole impressions from Dehradun hubs  

**Client action required:** Export GSC Performance (Pages + Queries) CSV for:
- 2026-08-01 → 2026-08-31  
- 2026-09-01 → 2026-09-30  
- 2026-10-01 → 2026-10-31  
- 2026-11-01 → 2026-11-10  

Filter: Search type Web, India, compare apex property after www redirect.

---

## 6. Technical SEO findings (code + live)

| Check | Finding | Severity |
|-------|---------|----------|
| Preferred host | `SITE_URL` apex; `next.config.js` permanent www→apex since `d990c78` | OK / Med transition risk |
| HTTPS | Live site HTTPS | OK |
| Canonicals | Landings/vehicles use `${SITE_URL}/…` | OK |
| Robots | Allow `/`; disallow `/admin/`, `/api/` (`app/robots.ts`) | OK |
| Indexability sample | `/three-wheeler-auto-rental-dehradun` indexable, apex canonical (live) | OK |
| Sitemap | Index of 5 child maps; routes heavy (~381) | Med crawl focus |
| Schema | LocalBusiness on home/hubs; Product/Offer on PDPs (LocalBusiness removed from PDPs in `d990c78`) | Low–Med |
| Thin/scaled pages | Wave 2/3 taxi/route templates at scale | High risk class |
| CWV / speed | Owner Lighthouse Performance **44** (extensions warned); AdSense removed; free Render cold starts historically severe | High conversion |
| JS CTAs | Sticky CTA is client component since `d17266a` but `tel:`/`wa.me` still in HTML | Low |
| AdSense | Removed; not in live HTML | Resolved |
| Keep-awake | `/api/health` + GitHub Actions | Improves free tier |

**No evidence found in this audit of mass accidental `noindex` on commercial Dehradun hubs.**

---

## 7. Lead conversion findings

| Check | Result |
|-------|--------|
| Live `tel:` | `tel:+918445619130` present on homepage |
| Old numbers in live home HTML | `8057772925` / `8979490332` **not** found |
| WhatsApp format | `whatsappHref` → `https://wa.me/91##########?text=…` |
| Sticky mobile CTA | Present (`components/StickyCta.tsx`) |
| Sticky WA copy | Incomplete city prompt (since `717ade6`) — UX friction |
| Phone source | `getSettings()` → DB override OR `DEFAULT_PHONE` |
| Forms | `BookingForm` / `QuoteForm` still wired; `sourceSlug` added in Wave 2 era |
| Cookie gate | Visit/call tracking only after Accept; **does not block** Call/WhatsApp |
| Analytics age | Too new to explain October baseline |

**Conversion hypothesis strength:** Free-tier latency + competitive SERPs + any phone measurement mismatch > “CTAs deleted” (CTAs were not deleted).

---

## 8. Marketing, seasonality, competition

### 8.1 Seasonality (external literature, not AroraCars analytics)

- **Oct 2026:** Strong autumn / Dussehra (20 Oct) / Char Dham late season → high rental/taxi demand plausible.  
- **Nov 2026:** Diwali week **6–11 Nov** should be **busy for tourists**; after ~12 Nov quieter. Char Dham typically **closed** → fewer multi-day yatra cars/Tempo.  
- Therefore: “market down” may apply to **yatra/outstation mix**, but is a **weak sole explanation** for Diwali-week call collapse.

### 8.2 Competitors (SERP / local operators)

Observed competing brands for Dehradun car/self-drive intent:

- Zoomcar (national self-drive)  
- Doon Self Drive Car, Finchant, Roadcrafts, Royal Self Drive, Trevalia, Ride on Wheels, FrSelfDrive  
- Aggregators: SafarCabby marketplace  

Many competitors show **prices, ratings volume, Maps presence, fast booking UX**. AroraCars’ advantage is multi-category local desk (auto / Chota Hathi / bikes) — those hubs were historically high-impression in the Oct 31 GSC snapshot.

### 8.3 Google algorithm context

- **Confirmed:** September 2026 spam update **24 Sep → 8 Oct 2026**.  
- **Not confirmed:** Nov core update as of early November trackers.  
- Unconfirmed late-Oct volatility reported by SEO press — treat as **hypothesis only**.

### 8.4 Google Analytics / GBP / call tracking

- **GA4:** Not found implemented in current public layouts (AdSense removed; no `gtag` found in this investigation pass).  
- **GBP / Maps:** Not in codebase; visibility unknown.  
- **Call tracking numbers:** Not implemented; owner counts handset rings.

---

## 9. Root-cause analysis (classified)

### A. Confirmed technical problems
1. Historical **Render free cold starts** (measured) — conversion killer when asleep.  
2. **www/non-www split** existed (documented); permanent redirect added 31 Oct — correct long-term, short-term GSC noise possible.  
3. **AdSense beforeInteractive** briefly harmed performance (now gone).  
4. **Very large indexable URL set** from Wave 2/3 — technical SEO risk class confirmed even if penalty unproven.

### B. Confirmed SEO performance problems
1. **Cannot confirm** current click/impression decline — missing Nov GSC export.  
2. Pre-decline snapshot showed **bike/car hubs stuck ~12–14** (PUSH), auto hub strong but **CTR only ~5%**.  
3. Hub **title/description rewrites** on 31 Oct may change CTR before positions move.

### C. Potential marketing / demand problems
1. Char Dham season end → fewer long-hire leads.  
2. Stronger national/local self-drive competitors.  
3. Diwali week demand mix may differ (more family cars vs commercial auto/Chota Hathi).

### D. Lead conversion problems
1. Incomplete WhatsApp prefill.  
2. Possible multi-SIM confusion after Sept number changes.  
3. DB-editable phone since 29 Oct (must verify DB values).  
4. Performance 44 + free hosting latency.

### E. External factors needing evidence
1. Fresh GSC CSVs.  
2. Call logs per number (8445619130 vs others).  
3. GBP insights.  
4. Competitor rank tracking for top 20 queries.  
5. Whether miss/busy rates on the desk changed.

---

## 10. Top five most likely explanations (ranked)

| Rank | Explanation | Type | Confidence | Est. contribution to −50% calls |
|------|-------------|------|------------|----------------------------------|
| 1 | **Demand mix shift** (Oct peak / Char Dham end) + **stronger competitors**, while desk measures only one channel | External + measurement | Medium | 25–40% |
| 2 | **Conversion friction** (cold starts pre-keep-awake; slow LCP; brief AdSense; WA copy) cutting call-through | Conversion | Medium–High | 15–30% |
| 3 | **Wave 2/3 scaled pages + spam-update window** causing organic volatility / dilution on non-core URLs, with lag into early Nov | SEO risk | Medium | 10–25% |
| 4 | **SERP churn** from www→apex + commercial hub metadata rewrites (31 Oct) | SEO | Low–Medium | 5–15% |
| 5 | **Phone measurement / DB override** — calls ringing a line not counted, or transient wrong number | Conversion/ops | Low–Medium (needs DB proof) | 0–40% if true |

**Confirmed fact vs hypothesis:** Items 1–4 are **hypotheses with partial evidence**. Item 5 is **falsifiable in one hour** by checking `SiteSetting` + call logs.

---

## 11. Issue table

| Issue | Evidence | Affected Pages | Severity | Recommended Fix |
|-------|----------|----------------|----------|-----------------|
| No GSC time-series for Nov decline | Repo only has Oct 31 snapshot | All commercial URLs | Critical (knowledge gap) | Export GSC CSVs; compare clicks on auto/bike/car/Chota/home |
| Wave 2/3 URL scale | Commits `b7348f6`, `746f9bf`; sitemap routes ~381 | Taxi/route/city URLs; possible hub dilution | High | **Do not mass-delete.** Audit GSC: which Wave URLs get impressions; noindex true orphans later if proven |
| www→apex redirect | `d990c78` `next.config.js` | All www URLs | Medium | Keep; ensure only apex GSC property monitored |
| Hub title/description rewrites | `d990c78` `data/pages.ts` | Car/bike/3W/Chota/luxury hubs | Medium | Monitor CTR 14–28 days; revert only if CTR/pos worsen vs snapshot |
| PDP LocalBusiness removed | `d990c78` rent page | `/rent/*` | Low | Keep unless rich-result losses appear in GSC enhancements |
| Phone DB override | `05a529a` `lib/settings.ts` | Global CTAs | High if wrong | Verify DB phone=8445619130; lock owner-only |
| Historical phone churn | `c4b0b49`, `6bf395a` | All pages | Medium (measurement) | Count rings on **all** recent SIMs for Oct vs Nov |
| AdSense beforeInteractive | `9623469`–`d09a9c6` | Sitewide ~3 days | Medium (past) | Already removed — leave off until CWV healthy |
| Render free cold start | Measured ~270s cold | All | High | Keep-awake + prefer paid always-on |
| Incomplete WA sticky text | `717ade6` StickyCta | Sitewide | Low–Med | Restore clear Dehradun booking prefill (after approval) |
| Missing GA4/GBP/call tracking | Code inspection | N/A | High (ops) | Add measurement stack; don’t guess |
| Competitor pressure | SERP/local operator research | Car/self-drive especially | Medium | Strengthen USP on auto/Chota/bike where you already had impressions |
| Seasonal Char Dham end | External season guides | Tempo/SUV/yatra pages | Medium | Expect mix shift; push Diwali/wedding/airport intents |

---

## 12. Recommended recovery strategy (no blind rewrites)

1. **Measure before changing SEO again.** GSC + call logs per SIM + CEO cookie stats.  
2. **Protect ranking equity** on auto / e-rickshaw / Chota Hathi / bike / car hubs — no URL changes.  
3. **Stabilize conversion:** always-on host or reliable keep-awake; CWV pass; clear WA/Call.  
4. **Selective Wave URL hygiene** only after GSC shows zero-impression thin pages (no mass purge).  
5. **Compete where you win:** commercial 3W / Chota Hathi / local bike-scooty — not only against Zoomcar on self-drive cars.  
6. **GBP + Maps** (off-site) — often drives calls independent of website SEO.

---

## 13. 7-day action plan (ops / data — not code deploys from this audit)

| Day | Action |
|-----|--------|
| 1 | Export GSC Pages+Queries for Aug, Sep, Oct, Nov 1–10; screenshot Enhancement / indexing |
| 1 | Pull call logs for `8445619130`, `8057772925`, `8979490332` for Oct vs Nov |
| 1 | Confirm Neon `SiteSetting` phone/whatsapp values |
| 2 | Compare GSC clicks on the 8 priority URLs vs Oct 31 snapshot |
| 2 | Confirm GitHub keep-awake still green every ~10 min |
| 3 | Manual mobile test: home, 3W hub, Chota, bike, car — Call + WA end-to-end |
| 4 | GBP insights: calls/direction requests Oct vs Nov |
| 5 | List Wave 2/3 URLs with 0 impressions (candidates only — do not delete yet) |
| 6 | Competitor spot-check top 10 queries (who owns positions 1–3) |
| 7 | Decide: paid Render vs keep-awake; whether WA copy fix is approved |

---

## 14. 30-day recovery plan

1. **Week 1:** Measurement + conversion hardening (hosting, CTAs, phone truth).  
2. **Week 2:** If GSC shows CTR drop on hubs after `d990c78`, A/B carefully (titles only) — preserve H1s on PROTECT pages.  
3. **Week 3:** Internal links from Wave taxi pages → Dehradun money hubs (descriptive anchors).  
4. **Week 4:** CWV (images/fonts); optional GA4; review Wave noindex list with evidence.  
5. Ongoing: Do **not** ship another 100+ thin pages until Wave 2/3 prove ROI in GSC + calls.

---

## 15. Additional data required from the client

1. GSC CSV exports (periods above) for **apex** property.  
2. Call detail records / WhatsApp business stats by number.  
3. Whether Dilbag (`8445619130`) is the only line counted.  
4. Google Business Profile access/export.  
5. Confirmation of Render plan (still free?) and any Cloudflare rules.  
6. Whether any ads (Google Ads) were paused in November.  
7. Booking inbox counts from `/admin` Oct vs Nov (Prisma `Booking`).

---

## 16. Direct answer

### Why might AroraCars have gone from ~10 calls/day to ~4–5?

**Most evidence-based reading:**

It is **unlikely** that one “SEO rewrite deleted your rankings overnight” in isolation. The codebase shows a **busy late-October change cluster**: hundreds of new URLs, host canonicalization, commercial SERP copy edits, admin/phone plumbing, then a short AdSense performance hit — while the business still runs on **free Render** and measures calls on a **handset** without tying them to GSC.

The decline is best treated as:

1. **Possibly fewer (or different) qualified visitors** — unproven until GSC Nov data arrives; Wave scale + spam-update timing make organic volatility plausible.  
2. **Likely worse call-through when the site is slow/asleep or ads competed with CTAs** — partially evidenced.  
3. **Possible demand-mix change** after October peak / Char Dham wind-down — plausible externally, incomplete for Diwali week.  
4. **Possible measurement gap across phone numbers** — must be ruled out first because it can fully explain a “50% drop” with zero SEO change.

**What would falsify the SEO panic:** If GSC clicks on auto/Chota/bike/car hubs are flat or up in Nov while calls are down → focus on **conversion + phone routing + GBP**, not more landing-page rewrites.

**What would confirm SEO damage:** If those same URLs lost clicks **and** positions after 25–31 Oct while impressions fell → then prioritize host/Wave/cannibalization remediation with surgical fixes only.

---

*End of investigation report. No production modifications were performed as part of this deliverable.*
