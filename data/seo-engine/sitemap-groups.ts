import type { PageCandidate, SitemapGroup } from "./types";

/** Mirrors lib/sitemap-sets SITEMAP_FILES — kept local so Node scripts need no path aliases. */
export type LiveSitemapBucket =
  | "sitemap-cities.xml"
  | "sitemap-services.xml"
  | "sitemap-routes.xml"
  | "sitemap-vehicles.xml"
  | "sitemap-guides.xml";

/**
 * Future-facing sitemap grouping for 10k+ URLs.
 * Live site still uses the 5 child sitemaps in lib/sitemap-sets.ts.
 * When Wave 2+ publishes, map groups → child files (possibly split taxi-routes-1/2).
 */

export const SITEMAP_GROUP_PLAN: Record<
  SitemapGroup,
  { liveBucket: LiveSitemapBucket; futurePath: string; notes: string }
> = {
  core: { liveBucket: "sitemap-cities.xml", futurePath: "/sitemaps/core.xml", notes: "Home + brand hubs" },
  cities: { liveBucket: "sitemap-cities.xml", futurePath: "/sitemaps/cities.xml", notes: "City hubs" },
  "taxi-cities": {
    liveBucket: "sitemap-services.xml",
    futurePath: "/sitemaps/taxi-cities.xml",
    notes: "taxi-service-in-*",
  },
  "taxi-routes": {
    liveBucket: "sitemap-routes.xml",
    futurePath: "/sitemaps/taxi-routes.xml",
    notes: "Split into taxi-routes-1/2 when > ~1000 URLs",
  },
  "car-rental": { liveBucket: "sitemap-services.xml", futurePath: "/sitemaps/car-rental.xml", notes: "" },
  "bike-rental": { liveBucket: "sitemap-services.xml", futurePath: "/sitemaps/bike-rental.xml", notes: "" },
  "scooty-rental": { liveBucket: "sitemap-services.xml", futurePath: "/sitemaps/scooty-rental.xml", notes: "" },
  "vehicle-pages": { liveBucket: "sitemap-vehicles.xml", futurePath: "/sitemaps/vehicle-pages.xml", notes: "" },
  "airport-transfer": {
    liveBucket: "sitemap-routes.xml",
    futurePath: "/sitemaps/airport-transfer.xml",
    notes: "",
  },
  "railway-transfer": {
    liveBucket: "sitemap-routes.xml",
    futurePath: "/sitemaps/railway-transfer.xml",
    notes: "",
  },
  sightseeing: { liveBucket: "sitemap-services.xml", futurePath: "/sitemaps/sightseeing.xml", notes: "" },
  pilgrimage: { liveBucket: "sitemap-routes.xml", futurePath: "/sitemaps/pilgrimage.xml", notes: "" },
  "hill-stations": { liveBucket: "sitemap-services.xml", futurePath: "/sitemaps/hill-stations.xml", notes: "" },
  guides: { liveBucket: "sitemap-guides.xml", futurePath: "/sitemaps/guides.xml", notes: "" },
};

export function liveBucketForGroup(group: SitemapGroup): LiveSitemapBucket {
  return SITEMAP_GROUP_PLAN[group].liveBucket;
}

export function groupCounts(pages: PageCandidate[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const p of pages) out[p.sitemapGroup] = (out[p.sitemapGroup] || 0) + 1;
  return out;
}

/** Split large route groups for future child sitemaps (1000 URL soft target). */
export function shardGroup(slugs: string[], prefix: string, maxPerFile = 1000): Array<{ file: string; slugs: string[] }> {
  if (slugs.length <= maxPerFile) return [{ file: `${prefix}.xml`, slugs }];
  const shards: Array<{ file: string; slugs: string[] }> = [];
  for (let i = 0; i < slugs.length; i += maxPerFile) {
    const n = Math.floor(i / maxPerFile) + 1;
    shards.push({ file: `${prefix}-${n}.xml`, slugs: slugs.slice(i, i + maxPerFile) });
  }
  return shards;
}
