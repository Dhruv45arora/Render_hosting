# Arora Cars — SEO Audit (Phase 1)
Date: 2026-09-06
Site: https://www.aroracars.com / https://aroracars.com

## Canonical business data (source of truth)

| Field | Verified value | Source |
|-------|----------------|--------|
| Phone / WhatsApp | **8979490332** | Admin `siteSetting` → `lib/settings.ts` defaults / `lib/constants.ts` |
| Email | **info@aroracars.com** | Same |
| Address | **Clock Tower, Dehradun - 248001, Uttarakhand** | `ADDRESS_LINE` + schema |
| Years | **8** (settings; shown as 8+) | Admin settings / seed |
| Fleet listed | **141** seeded vehicles (settings may say 141+) | `prisma/seed.ts` |

### Conflicts found (do not invent replacements)
1. Legacy CRA `src/` still contains **7817993404** — not served by Next, but must not be reintroduced.
2. Hardcoded phone in `data/pages.ts` / blog meta — chrome uses Admin settings; content strings should stay aligned to **8979490332**.
3. Default fleet label `"140+"` vs seed `"141+"` — align to actual seed count.

## Inventory (before Phase A changes)
- ~55 landing pages (category / route / info)
- 12 blog guides
- 141 `/rent/` vehicle pages
- Sitemap already reports ~210 URLs in GSC

## Intent overlaps (do NOT create more duplicates)
- Mussoorie: keep `/car-rental-dehradun-to-mussoorie` primary; preserve legacy `/dehradun-to-mussoorie-self-drive` with canonical
- Char Dham: keep `/car-rental-char-dham-yatra` primary; preserve `/char-dham-yatra-car-rental` with canonical; differentiate self-drive + tempo keywords
- No separate pages for "cheap/best/hire/rent a car Dehradun" — one city hub covers the cluster

## Missing primary hub
No dedicated **car rental in Dehradun** commercial hub. Homepage was brand/self-drive leaning.
**Decision:** add **one** `/car-rental-dehradun` as city head term; strengthen home as brand + directory.

## Pages intentionally NOT created
- car-rental-in-dehradun, rent-a-car-dehradun, car-hire-dehradun, cheap/best doorways
- Extra Mussoorie/Char Dham clones
- Auto locality pages (Clock Tower already covered; no Ballupur/Clement Town spam)
- 100 auto-generated blog articles

## Phase A–E focus
Strengthen existing hubs + routes, add city hub, improve internal links/metadata/schema, add ~10–15 useful guides only, legacy canonicals, production build verify.

## Implementation status (2026-09-06)
- `/car-rental-dehradun` city hub live; enrichments on core commercial + route pages
- Legacy canonicals: Mussoorie self-drive URL, Char Dham alias, two-wheeler → bike
- Sitemap skips non-canonical landings; robots disallow only `/admin/` `/api/`
- Guides: 12 existing + 8 priority posts in `data/blog.ts`
- New commercial: `/car-rental-near-isbt-dehradun`
- Keyword map: `SEO-KEYWORD-MAP.md` + `data/keyword-mapping.csv`
- NAP SoT unchanged: 8979490332 / info@aroracars.com / Clock Tower
