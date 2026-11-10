# AroraCars — Phase 2 Lead Conversion Investigation

**Date:** 2026-11-10  
**Git HEAD (stated):** `d17266a`  
**Official number:** `8445619130`  
**Hosting:** Render Free (owner-stated)  
**Google Ads:** Never used (owner-stated)  
**Scope rule:** Investigation only — **no code, DB, URL, SEO, or deploy changes.**

---

## 1. Phone / WhatsApp routing verification

### 1.1 Code defaults

| Item | Value | File |
|------|-------|------|
| `DEFAULT_PHONE` | `8445619130` | `lib/constants.ts` L3 |
| `DEFAULT_WHATSAPP` | `8445619130` | `lib/constants.ts` L4 |
| Seed settings | same | `prisma/seed.ts` L11–12, L40–41 |
| Landing copy constant `P` | `8445619130` | `data/pages.ts` L36; `data/page-enrichments.ts` L26 |

### 1.2 `getSettings()` resolution

```36:48:lib/settings.ts
export async function getSettings(): Promise<SiteSettings> {
  try {
    const rows = await prisma.siteSetting.findMany();
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return {
      ...DEFAULTS,
      ...map,
      phone: map.phone || DEFAULT_PHONE,
      whatsapp: map.whatsapp || DEFAULT_WHATSAPP,
    };
  } catch {
    return DEFAULTS;
  }
}
```

**Behavior:** If Prisma/`SiteSetting` has `phone` or `whatsapp`, those values win. If missing/empty or DB errors, code falls back to `8445619130`.

**CEO lock:** Developer role cannot change phone/WhatsApp (`OWNER_ONLY_SETTING_KEYS`, `lib/settings.ts` L21–22, L55–57). Owner/admin role still can.

### 1.3 Customer-facing CTA map (Next App Router — live product)

| Surface | Uses | Tracking |
|---------|------|----------|
| Sticky Call/WA | `settings.phone` / `settings.whatsapp` via layout | Call/WA click tracked **only here** |
| Header Call | `phoneHref(phone)` | **Not tracked** |
| Footer Call | `phoneHref(phone)` | **Not tracked** |
| Homepage hero / lead bands | `phoneHref(settings.phone)`, `whatsappHref(settings.whatsapp, …)` | **Not tracked** |
| Landing `[slug]` hero + bottom band | same | **Not tracked** |
| Vehicle `/rent/[slug]` | same | **Not tracked** (form uses WA after submit) |
| `VehicleCard` WA | `whatsapp` prop | **Not tracked** |
| `QuoteForm` / `BookingForm` | opens `wa.me` with `whatsapp` prop after POST | **Not tracked** as call/wa analytics event |

Helpers (`lib/constants.ts` L73–81):

- Call → `tel:+91` + last 10 digits  
- WhatsApp → `https://wa.me/91##########?text=…`

### 1.4 Live HTML evidence (2026-11-10)

| Page | `tel:` observed | `wa.me` observed | Old numbers (`8057…`, `8979…`, `7817…`) |
|------|-----------------|------------------|----------------------------------------|
| Homepage (warm) | `tel:+918445619130` only | `wa.me/918445619130` only | **0 matches** |
| `/three-wheeler-auto-rental-dehradun` | `tel:+918445619130` | `wa.me/918445619130` | none in extract |
| `/rent/e-rickshaw-rental-dehradun` | `tel:+918445619130` | `wa.me/918445619130` | none in extract |

**Conclusion (routing):** Production customer CTAs on checked pages route to **8445619130**. Broken contact routing to an old number is **not supported** by live HTML evidence.

### 1.5 Database settings verification status

| Check | Status |
|-------|--------|
| Local read of production `SiteSetting` phone/whatsapp | **FAILED** — Neon unreachable from this environment (`Can't reach database server at …neon.tech`). No secrets printed. |
| Inference from live site | Live CTAs = `8445619130` ⇒ either DB stores that value **or** DB miss → defaults. |
| Owner action needed | In Render / Neon SQL or Admin Settings UI, confirm keys `phone` and `whatsapp` equal `8445619130` (do not paste connection strings into chat). |

### 1.6 Non-customer / legacy code (not served)

Legacy CRA under `src/pages/*` and `src/components/Car.jsx` hardcodes `tel:+917817993404`.

**Not live:** `next.config.js` sets `pageExtensions: ["ts","tsx"]` and ignores `src/**` in webpack. These files do **not** explain November call decline for aroracars.com visitors.

### 1.7 Suspicious conversion UX (routing OK, friction yes)

| Issue | Evidence | Severity |
|-------|----------|----------|
| Sticky WA prefill incomplete | `StickyCta.tsx` L21–24: `"…My rental city is: "` | Low–Med |
| Header shows phone but no WA | `Header.tsx` L51–53 | Low |
| Footer Call only | `Footer.tsx` L24 | Low |

---

## 2. Database settings verification status (summary)

**Status: INCOMPLETE from this workstation.**

- Code path allows DB override.  
- Live site currently dials/WhatsApps **8445619130**.  
- Production DB row values were **not** directly verified here.  
- **No records were modified.**

---

## 3. Render performance findings

### 3.1 Config observed in repo

| Artifact | Finding |
|----------|---------|
| `render.yaml` | Declares `plan: starter` and `DATABASE_URL: file:./dev.db` — **does not match** owner “Render Free + Neon” production. Treat as outdated blueprint, not live truth. |
| App | Next.js App Router; public layout SSR awaits `getSettings()` |
| Health | `app/api/health/route.ts` — `force-dynamic`, JSON `{ok:true}`, no DB |
| Keep-awake | `.github/workflows/keep-awake.yml` — cron `*/10 * * * *` + manual; curls health then homepage |

### 3.2 Measured timings (2026-11-10, from audit machine)

| Request | Result | Interpretation |
|---------|--------|----------------|
| `GET /api/health` (first) | **ERR ~76.3s** aborted | Strong cold-start / sleep signal |
| `GET /` (same window) | **~22.5s**, HTTP 200 | Site woke; slow first paint for humans |
| `GET /car-rental-dehradun` (after) | **~1.1s**, 200 | Warm |
| Later warm `health` / `home` (curl) | **~1.1s / ~1.0s** | Healthy when awake |

**Earlier audit (3 Nov window)** had cold homepage ~270s — same class of problem.

### 3.3 Does keep-awake work?

| Question | Answer |
|----------|--------|
| Workflow file present? | Yes |
| Can this audit confirm GitHub runs succeed every 10 min? | **No** — `gh` CLI not installed locally; no Actions API access from here |
| Does the backend still sleep? | **Yes, evidence of sleep/cold starts today** (health abort + 22s home) |
| Implication | Keep-awake is **incomplete or not reliably running**, or free-tier still idles between pings / during Actions queue drift |

### 3.4 Does SSR block CTAs on cold start?

**Yes.**

1. `app/(public)/layout.tsx` L7–14: `await getSettings()` (Prisma) before Header / StickyCta HTML.  
2. Homepage also `await`s `getFeaturedVehicles` + `getSettings` (`app/(public)/page.tsx`).  
3. Landings await settings + page resolution (`app/(public)/[slug]/page.tsx`).  

On a cold Render + cold/slow Neon path, the **entire document** (including `tel:` / sticky CTAs) waits on the server. There is no separate “shell with CTAs first” pattern.

**Not found:** Client-side fetch of phone number before showing Call button. Once HTML arrives, CTAs are normal links (work without analytics JS).

### 3.5 Unnecessary work on page load

| Load cost | Notes |
|-----------|-------|
| `getSettings()` every public request (layout) | Prisma round-trip; fails soft to defaults |
| Featured vehicles / fleet queries | Homepage & rent pages |
| Cookie analytics `POST /api/analytics/hit` | After consent only; extra write to `SiteSetting` |
| Large landing HTML | e.g. car hub ~172KB raw in one sample |
| Images | Many `<img>` tags; LCP risk (prior Lighthouse Perf 44) |

Health endpoint itself does **not** touch DB — good for keepalive design — but keepalive is not preventing all sleeps.

### 3.6 Safe measurement commands (owner can run)

**PowerShell (warm then note cold after 20+ min idle without traffic):**

```powershell
curl.exe -sS -o NUL -w "health:%{http_code} time:%{time_total}\n" --max-time 120 "https://aroracars.com/api/health"
curl.exe -sS -o NUL -w "home:%{http_code} time:%{time_total}\n" --max-time 120 "https://aroracars.com/"
curl.exe -sS -o NUL -w "hub:%{http_code} time:%{time_total}\n" --max-time 120 "https://aroracars.com/three-wheeler-auto-rental-dehradun"
```

**Cold-start protocol:** After ≥20 minutes with no visits and no successful Actions pings, run the three lines once; then immediately run again (warm).

**Verify keep-awake:** GitHub → repo → Actions → “Keep Render awake” → confirm green runs ~every 10 minutes (including nights).

---

## 4. Analytics implementation findings (`d17266a`)

### 4.1 What counts as a visit?

| Event | When | Storage |
|-------|------|---------|
| `view` | After cookie **Accept**, `trackPage()` posts `{view:true, unique:?}` | `SiteSetting` key `analytics_v1` JSON |
| `unique` | Same day cookie `ac_hit_day` not already set | increments `uniques` |
| Decline (`ac_consent=0`) | Banner dismissed | **No** page or lead events |
| No decision yet | Banner showing | **No** events until Accept |

Files: `components/CookieAnalytics.tsx` L42–48, L59–77; `lib/analytics.ts`; `app/api/analytics/hit/route.ts`.

### 4.2 Repeat visits

- Same browser, same UTC day: further `trackPage()` still sends `view:true` but `unique:false` if `ac_hit_day` matches.  
- New day → new unique.  
- New browser / cleared cookies → new unique.  
- Soft limitation: concurrent writes read-modify-write `analytics_v1` without locking → possible under-count under load.

### 4.3 Call / WhatsApp click tracking

| Tracked? | Where |
|----------|--------|
| Yes (click only) | `StickyCta.tsx` L14, L28 → `trackLeadClick` |
| Only if consent = `1` | `CookieAnalytics.tsx` L51–53 |
| **Not** completed calls | No telephony integration |
| **Not** Header / Footer / hero / lead-band / VehicleCard / form WA | Missing |

Admin CEO KPIs (`app/admin/page.tsx` L104–108; `CeoDashboard.tsx`) show today views + 7-day views/uniques/calls/wa from this blob — **accurate only for consented sticky clicks**, not true phone rings.

### 4.4 `sourceSlug`

| Path | Captured? |
|------|-----------|
| Landing `QuoteForm` | Yes — `sourceSlug={page.slug}` (`[slug]/page.tsx` ~L314) |
| Vehicle `BookingForm` | Yes — `rent/${vehicleSlug}` (`BookingForm.tsx` L21) |
| API `/api/bookings` | Persists `sourceSlug` (`app/api/bookings/route.ts` L15–18, L44) |
| Sticky WhatsApp | **No** sourceSlug |
| Hero Call/WA | **No** |
| CEO desk booking POST | Uses `"ceo-desk"` (admin bookings route) |

### 4.5 Missing conversion events (gap list)

1. Header / footer / in-page Call clicks  
2. Header-less WhatsApp (most in-page WA)  
3. Form submit success (distinct from WA open)  
4. Form submit failure  
5. Search usage  
6. Completed call / talk time (impossible without call tracking)  
7. Visitors who Decline cookies (invisible)  
8. GSC / GA4 sessions (not implemented in public layout)

**Do not confuse:** Dashboard “calls” = sticky Call **button clicks after Accept**, not October/November handset rings.

---

## 5. Broken or suspicious conversion flows

| Flow | Broken? | Evidence | Severity |
|------|---------|----------|----------|
| Live tel/wa → 8445619130 | **No** on checked pages | Live HTML | — |
| Legacy `7817993404` in `src/` | Dead code | `next.config.js` ignores CRA | Info |
| Cold start blocks first paint + CTAs | **Yes (performance)** | 76s health fail; 22s home | **High** |
| Keep-awake reliability | **Suspect** | Sleep still observed | **High** |
| Sticky WA message incomplete | Friction | `StickyCta.tsx` | Low–Med |
| Analytics under-reports leads | Measurement gap | Only sticky + consent | Med (ops) |
| DB phone override possible | Risk if wrong row | `getSettings` | Med until verified |
| SSR depends on DB for settings | Soft-fail to defaults | catch → DEFAULTS | Low if defaults correct |

---

## 6. Exact affected files (reference)

| File | Relevance |
|------|-----------|
| `lib/constants.ts` | Defaults + `tel`/`wa.me` builders |
| `lib/settings.ts` | DB override + owner-only keys |
| `app/(public)/layout.tsx` | SSR settings → Header/Footer/Sticky/Cookie |
| `components/StickyCta.tsx` | Sticky CTAs + only tracked clicks |
| `components/Header.tsx` | Call links |
| `components/Footer.tsx` | Call link |
| `components/CookieAnalytics.tsx` | Consent + visit/lead posts |
| `lib/analytics.ts` / `app/api/analytics/hit/route.ts` | Persistence |
| `components/QuoteForm.tsx` / `BookingForm.tsx` | Forms + sourceSlug + WA open |
| `app/api/bookings/route.ts` | Booking + sourceSlug store |
| `app/api/health/route.ts` | Keepalive target |
| `.github/workflows/keep-awake.yml` | Ping schedule |
| `render.yaml` | Stale blueprint vs real free+Neon |
| `src/pages/*` | Old phone — not served |

---

## 7. Severity table

| Issue | Evidence | Severity | Safe recommended fix (do not implement in this phase) |
|-------|----------|----------|------------------------------------------------------|
| Free Render sleep / cold TTFB | Health abort ~76s; home ~22s then ~1s warm | **Critical (conversion)** | Confirm Actions schedule green; add UptimeRobot; consider paid always-on later |
| SSR waits on Prisma before CTAs | `layout.tsx` await `getSettings` | **High** | Cache settings / edge fallback number in layout (future code change) |
| Keep-awake unverified + still sleeping | Workflow exists; sleep observed; no `gh` proof | **High** | Owner verifies Actions history; fix disabled workflows |
| Analytics ≠ real calls | Sticky-only + consent | **Medium** | Treat dashboard as partial; use carrier call logs |
| Incomplete sticky WA text | `StickyCta.tsx` | **Low–Med** | Restore clear Dehradun booking prefill (when approved) |
| DB phone not verified here | Neon unreachable locally | **Medium (ops)** | Owner confirms settings rows = 8445619130 |
| Dead CRA wrong number | `src/**` | **Info** | Ignore for live traffic; optional cleanup later |
| Contact routing wrong number | Live checks show 8445619130 | **Not evidenced** | None for routing |

---

## 8. Safe recommended fixes (recommendations only)

1. **Verify** GitHub “Keep Render awake” runs overnight; if gaps → enable UptimeRobot on `/api/health` every 5 minutes.  
2. **Verify** Admin/DB `phone` & `whatsapp` = `8445619130`.  
3. **Compare** handset call logs for Nov vs sticky “calls” in CEO dashboard — expect dashboard << rings.  
4. **Do not** change SEO/URLs based on this phase.  
5. When coding is allowed later: track all primary CTAs; fix WA prefill; harden settings caching for cold starts.  
6. Hosting upgrade remains the strongest infrastructure lever; not purchased in this audit.

---

## 9. Final answer

### Is AroraCars losing customers because of fewer visitors, slow loading, broken contact routing, or insufficient conversion tracking?

**Evidence-supported ranking:**

1. **Slow loading / free-tier sleep — supported.** Cold starts still occur; first requests can take tens of seconds (or fail/abort). That can drop mobile Google visitors before they tap Call. This can explain part of a calls decline **even if rankings are stable**.

2. **Broken contact routing — not supported** for the live Next site. Checked pages use **`tel:+918445619130`** and **`wa.me/918445619130`**. Old numbers are not in live home HTML. Legacy `7817993404` is dead CRA code.

3. **Insufficient conversion tracking — supported as a measurement problem, not as the cause of fewer rings.** Analytics started 2026-11-03, requires cookie Accept, and only counts sticky clicks. It **cannot** explain October→November handset decline and **must not** be used as proof of traffic or call volume.

4. **Fewer visitors — not proven or disproven in this phase.** No GSC export was in scope for Phase 2. Slow loading can reduce *effective* visitors (bounces) without proving Google sent fewer clicks.

**Bottom line:**  
The strongest Phase-2 conversion finding is **performance / cold starts on Render Free**, not a wrong phone number on live CTAs. Tracking gaps hide the truth but did not create the October baseline. For “fewer visitors vs fewer conversions,” you still need GSC clicks next to call logs; Phase 2 alone shows **conversion friction from speed is real**, while **broken routing to a non-official number is not evidenced on production pages checked**.
