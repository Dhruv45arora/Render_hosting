# Batch T1 — Implementation Report

**Date:** 2026-11-15  
**Status:** Implemented locally. Production deploy not claimed.  
**Ranking claim:** none — measure in GSC after 14–28 days crawl lag.  
**Plan reference:** `docs/ARORACARS_BATCH_T1_PAGE_PLAN.md`

---

## Summary

Batch T1 improved existing Uttarakhand **taxi Tier-1** pages via `PAGE_ENRICHMENTS`, fixed Mussoorie-route **Tallital** typo, and removed taxi keyword targeting from three **car-route** pages while adding labelled reciprocal links. No new URLs. Auto, Chota Hathi, and homepage SEO untouched.

---

## Modified files

| File | Why |
|------|-----|
| `data/page-enrichments.ts` | Full T1 enrichments for `/taxi`, Dehradun/Mussoorie/Rishikesh/Haridwar taxi, light Nainital/Haldwani meta+links, three Dehradun route taxis, airport taxi; updated three car-route enrichments (no taxi secondaries + reciprocal taxi links + intent split sections) |
| `data/pages.ts` | Car-route base hygiene: remove taxi secondaries; Rishikesh title drop “Taxi”; reciprocal `relatedSlugs` + intent sections (still overridden/merged via enrichments) |
| `data/taxi-pages.ts` | Fix Mussoorie destinationNote Tallital→Library/Mall/Landour; add `/taxi` to Mussoorie route related |

**Docs created this project (untracked unless committed separately):**  
`docs/ARORACARS_BATCH_T1_PAGE_PLAN.md`, master plan, recovery audit, GSC export folder.

---

## Pages enriched (existing URLs only)

| Slug | Depth | Canonical (verified) |
|------|-------|----------------------|
| `taxi` | Full | `https://aroracars.com/taxi` |
| `taxi-service-in-dehradun` | Full (desk tone) | `https://aroracars.com/taxi-service-in-dehradun` |
| `taxi-service-in-mussoorie` | Full (enquiry) | `https://aroracars.com/taxi-service-in-mussoorie` |
| `taxi-service-in-rishikesh` | Full (enquiry) | `https://aroracars.com/taxi-service-in-rishikesh` |
| `taxi-service-in-haridwar` | Full (enquiry) | `https://aroracars.com/taxi-service-in-haridwar` |
| `taxi-service-in-nainital` | Light (title/desc/related only) | `https://aroracars.com/taxi-service-in-nainital` |
| `taxi-service-in-haldwani` | Light (title/desc/related only) | `https://aroracars.com/taxi-service-in-haldwani` |
| `dehradun-to-mussoorie-taxi` | Full + Tallital fix | `https://aroracars.com/dehradun-to-mussoorie-taxi` |
| `dehradun-to-rishikesh-taxi` | Full | `https://aroracars.com/dehradun-to-rishikesh-taxi` |
| `dehradun-to-haridwar-taxi` | Full | `https://aroracars.com/dehradun-to-haridwar-taxi` |
| `dehradun-airport-taxi` | Full + vs Jolly Grant | `https://aroracars.com/dehradun-airport-taxi` |

No soft-canonical overrides on T1 slugs.

---

## Car-route cannibalisation hygiene

| Car page | Taxi secondaries | Reciprocal taxi related | Intent section |
|----------|------------------|-------------------------|----------------|
| `car-rental-dehradun-to-mussoorie` | Removed (`Dehradun Mussoorie taxi` gone) | `dehradun-to-mussoorie-taxi` | Yes |
| `car-rental-dehradun-to-rishikesh` | Removed; title now “Self Drive & With Driver” | `dehradun-to-rishikesh-taxi` | Yes |
| `car-rental-dehradun-to-haridwar` | Removed (`Haridwar taxi from Dehradun` gone) | `dehradun-to-haridwar-taxi` | Yes |

Taxi → car links use clear anchor text (“car rental Dehradun to …”). Car → taxi links use “Dehradun to … taxi”.

---

## Protected assets

| Asset | Status |
|-------|--------|
| `/three-wheeler-auto-rental-dehradun` | Not modified in T1 |
| `/chota-hathi-mini-truck-rental-dehradun` | Not modified in T1 |
| Homepage | Not modified |
| Apex canonical strategy | Unchanged (`SITE_URL` → `https://aroracars.com`) |
| Prior Batch 1–3 enrichments | Preserved (T1 appends / patches car routes only) |

---

## Validation

### Production build
- `npx prisma generate` + `npx next build` → **exit 0**
- Compiled successfully; static generation completed (~806 paths)
- Note: Neon DB was unreachable during build → Prisma errors on vehicle/`siteSetting` fetches during SSG; build still completed. Full `npm run build` (includes `repair-broken-vehicle-images.js`) failed earlier on the same DB connectivity — **environment issue, not T1 content**
- Recommend re-run full `npm run build` on a machine/network with DB access before deploy

### Metadata / canonical
Validated via `mergePage` for all 11 T1 slugs:
- Titles/H1/descriptions present
- Canonicals all apex `https://aroracars.com/{slug}`
- No `canonicalSlug` soft overrides on T1

### Robots / sitemap
- `app/robots.ts`: allow `/`, disallow `/admin/`, `/api/`; sitemap `${SITE_URL}/sitemap.xml` — unchanged
- Sitemap index routes unchanged; landing slugs continue to flow from existing landing registry (no URL add/remove)

### Internal links
- Hub ↔ Tier-1 cities ↔ three routes ↔ airport taxi
- Reciprocal car ↔ taxi on the three corridors
- Airport taxi ↔ Jolly Grant car rental (labelled)

### Tallital
- Mussoorie taxi route destination note: Library / Mall / Landour (no Tallital)
- Tallital remains correctly on **Nainital** pages only

---

## Git diff (code)

```
 data/page-enrichments.ts | +623 / −small
 data/pages.ts            | +50 / −small
 data/taxi-pages.ts       | +3 / −1
 3 files changed
```

---

## Remaining issues / follow-ups

1. **DB connectivity** during local full `npm run build` image-repair step — fix network/DB before production deploy pipeline if that script is required.  
2. **GSC lag** — do not judge T1 rankings until 2–4 weeks post-deploy; track the 11 taxi URLs + three car routes.  
3. **Homepage footer “Taxi” link** — not changed (protect homepage); optional later verify-only.  
4. **Batch T2** (airport/pilgrimage polish) and **C1/B1** still pending per master plan.  
5. Wave1 metro noise / noindex — deferred.  
6. Char Dham car enrichment still uses primaryKeyword containing “taxi” — **out of T1 scope**; review in T2/C1 if needed.

---

## Measurement checklist (post-deploy)

- GSC: clicks, impr, CTR, position for each T1 URL  
- Queries: dehradun taxi service, route taxi queries, airport taxi / Jolly Grant taxi  
- Confirm car-route pages no longer impress for pure “taxi” head terms over time  
- Call/WhatsApp events on taxi landings (not counted as bookings)

**Do not claim ranking improvements from this deploy alone.**
