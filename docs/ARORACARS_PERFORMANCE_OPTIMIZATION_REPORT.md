# AroraCars — Performance Optimization Report

**Date:** 2026-11-10  
**Site:** https://aroracars.com/  
**Baseline (owner Lighthouse):** Performance **45**, Accessibility **94**, Best Practices **96**, SEO **100**  
**Stack:** Next.js 14 App Router, React 18, Prisma/Postgres (Neon), Render Free  

---

## 1. Phase 1 audit — bottlenecks found

| Bottleneck | Impact | Evidence |
|------------|--------|----------|
| **Render-blocking Google Fonts CSS** (Anton + Work Sans + IBM Plex Mono via `fonts.googleapis.com`) | High LCP / FCP | `app/layout.tsx` stylesheet link |
| **Raw `<img>` fleet cards** (full JPG, no responsive srcset) | High LCP bandwidth / Speed Index | `VehicleCard`, homepage featured grid |
| **Duplicate `getSettings()` Prisma reads** per request (layout + page) | Medium TTFB | layout + page both called settings |
| **lucide-react in public Header/StickyCta** | Medium JS / TBT | Extra client icon library on every public page |
| **Cookie banner in critical path** | Low–Med | Client JS on first paint |
| **Render Free cold starts** | Critical TTFB when asleep | Prior audits: 20s–270s first hit — **not fixable in app code alone** |
| **Large CSS** (`globals.css`) | Low | Single file; acceptable |
| **Legacy `src/` CRA** | None live | Ignored by Next `pageExtensions` |
| **`/property.html` standalone** | Separate | Does not affect main App Router CWV |

**Rendering strategy:** Mostly Server Components for landings; Header/Footer/Sticky/Search/Forms are client. ISR `revalidate = 60` on key pages.

---

## 2. Optimizations implemented (this pass)

### Fonts (LCP / render-blocking)
- Replaced Google Fonts `<link rel="stylesheet">` with **`next/font/google`** (Anton, Work Sans, IBM Plex Mono).
- Self-hosted via Next font pipeline, `display: "swap"`, CSS variables wired in `globals.css`.

### Images (LCP / CLS / bytes)
- `VehicleCard` → `next/image` with `sizes`, `quality={70}`, lazy by default.
- Homepage: **first 2** featured cards use `priority`.
- `/rent/[slug]` gallery → `next/image` + `priority` for LCP.
- Landing `heroImage` → `next/image` when local path.
- `/uploads/` and remote/data URLs still use plain `<img>` (CMS uploads unchanged).
- `next.config.js`: AVIF/WebP, tighter `deviceSizes`, 30-day image cache TTL.

### JavaScript
- Removed **lucide-react** from public `Header` + `StickyCta` (inline SVG).
- Split lead click tracking into `lib/lead-track.ts` so sticky CTAs do not pull cookie-banner UI.
- Deferred cookie banner via `CookieAnalyticsLoader` (`dynamic`, `ssr: false`).

### Data fetching
- Wrapped settings load in React **`cache()`** so layout + page share one Prisma round-trip per request.

### SEO / UX preserved
- No URL, canonical, sitemap, robots, schema, or meta rewrites in this pass.
- CTAs, booking forms, search, sticky Call/WhatsApp unchanged in behavior.
- Design/CSS variables unchanged (fonts map to same families).

---

## 3. Files modified

| File | Change |
|------|--------|
| `app/layout.tsx` | `next/font` setup; removed Google CSS links |
| `app/globals.css` | Font CSS variables; Image fill helpers |
| `lib/settings.ts` | `cache()` dedupe |
| `lib/lead-track.ts` | **New** — sticky click beacons |
| `components/VehicleCard.tsx` | `next/image` + priority prop |
| `components/Header.tsx` | Inline SVG icons |
| `components/StickyCta.tsx` | Inline SVG; lead-track import |
| `components/CookieAnalytics.tsx` | Banner only (tracking helpers moved) |
| `components/CookieAnalyticsLoader.tsx` | **New** — deferred load |
| `app/(public)/layout.tsx` | Uses CookieAnalyticsLoader |
| `app/(public)/page.tsx` | Priority on first fleet cards |
| `app/(public)/rent/[slug]/page.tsx` | Optimized LCP image |
| `app/(public)/[slug]/page.tsx` | Optimized hero images |
| `next.config.js` | Image formats/sizes/cache; `compress` |

---

## 4. Before / after Lighthouse scores

| Metric | Before (owner) | After (this environment) |
|--------|----------------|---------------------------|
| Performance | **45** | **Not re-measured here** (requires deploy + Lighthouse on production) |
| Accessibility | 94 | Expect ≥94 (aria labels kept/improved on burger) |
| Best Practices | 96 | Expect maintained |
| SEO | 100 | **Preserved by design** (no SEO surface changes) |

**Do not treat scores as improved until you run Lighthouse on the deployed build** (Incognito, mobile + desktop).

### Suggested measurement after deploy

```bash
# Mobile (CLI if installed)
npx lighthouse https://aroracars.com/ --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile --output=json --output-path=./lh-mobile.json

# Desktop
npx lighthouse https://aroracars.com/ --only-categories=performance,accessibility,best-practices,seo --preset=desktop --output=json --output-path=./lh-desktop.json
```

Also re-test: `/car-rental-dehradun`, `/three-wheeler-auto-rental-dehradun`, `/rent/*`, search, Call/WhatsApp, booking form.

---

## 5. Core Web Vitals expectations

| Vital | Likely effect of this pass | Remaining limiter |
|-------|----------------------------|-------------------|
| **LCP** | Better (fonts + optimized images) | Cold TTFB on free Render; hero text still font-dependent |
| **INP** | Slightly better (less icon JS) | Client Header/search/forms remain |
| **CLS** | Stable (width/height kept) | Dynamic cookie bar can nudge bottom on Accept |
| **TTFB** | Slightly better when warm (settings dedupe) | **Free-tier sleep still dominates** |

---

## 6. Remaining problems (honest)

1. **Render Free cold starts** — still the #1 real-world speed issue; keep-awake helps but is imperfect.  
2. Fleet **source JPGs** on disk may still be large; `next/image` helps delivery but first optimize pass on origin files would help more.  
3. **Footer** remains a client component (`usePathname`) — further win if converted to server later.  
4. **Admin** still uses `lucide-react` (OK — not on public critical path).  
5. Large **programmatic landing HTML** — content weight, not fixed here (SEO-sensitive).  
6. No Lighthouse CLI run completed in this session against production after deploy.

---

## 7. Recommended next steps

1. **Deploy** these changes to Render.  
2. Run Lighthouse mobile/desktop in Incognito; paste scores into this report.  
3. Confirm GitHub keep-awake / UptimeRobot for TTFB.  
4. Optionally convert Footer to Server Component + pathname header.  
5. Compress top fleet JPGs at source (quality ~75, max width 1280) without changing paths.  
6. Consider paid always-on hosting when budget allows — biggest CWV win for leads.

---

## 8. Goal check

| Target | Status |
|--------|--------|
| Mobile Perf 90+ | **Pending measurement after deploy** |
| Desktop Perf 95+ | **Pending measurement after deploy** |
| A11y 95+ / BP 95+ / SEO 100 | Architecture preserved; confirm after deploy |
| No SEO/URL breakage | **Yes** |
| No feature removal | **Yes** |

Genuine speed gains from fonts + images + less public JS are expected when warm; **90+ mobile cannot be claimed until measured**, and cold starts on free Render can still tank field LCP regardless of Lighthouse lab once awake.
