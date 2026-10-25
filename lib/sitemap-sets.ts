import { BLOG_POSTS } from "@/data/blog";
import { getPage, LANDING_PAGES, allPageSlugs } from "@/data/pages";
import { WAVE1_CITY_HUB_SLUGS } from "@/data/wave1-hubs";
import { SEED_VEHICLES } from "@/data/vehicles";
import { SITE_URL } from "@/lib/constants";
import { getAllVehicles } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { listBlogPosts } from "@/lib/cms/resolve-blog";

/**
 * Live child sitemaps (index → 5 files). Scaled grouping for Wave 2+ lives in
 * data/seo-engine/sitemap-groups.ts and maps into these buckets until shard files are enabled.
 */
export const SITEMAP_FILES = [
  "sitemap-cities.xml",
  "sitemap-services.xml",
  "sitemap-routes.xml",
  "sitemap-vehicles.xml",
  "sitemap-guides.xml",
] as const;

export type SitemapName = (typeof SITEMAP_FILES)[number];

export type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: "daily" | "weekly" | "monthly";
  priority?: string;
};

/** Duration and product pages are tagged "route" in data but are rental offers, not trips. */
const SERVICE_SLUGS = new Set([
  "weekly-car-rental-dehradun",
  "monthly-car-rental-dehradun",
  "outstation-car-rental-dehradun",
  "car-rental-pricing-dehradun",
]);

const FLEET_SLUG = "car-fleet-dehradun";

function abs(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

function isIndexableLanding(slug: string) {
  const page = getPage(slug);
  if (!page) return false;
  return !page.canonicalSlug || page.canonicalSlug === slug;
}

function landingBucket(slug: string, type: "category" | "route" | "info"): SitemapName | null {
  if (!isIndexableLanding(slug)) return null;
  if (slug === "car-rental-dehradun" || WAVE1_CITY_HUB_SLUGS.has(slug)) return "sitemap-cities.xml";
  if (slug === FLEET_SLUG) return "sitemap-vehicles.xml";
  // Vehicle-specific SEO (Wave 2): innova-rental-in-*, bullet-rental-in-*, etc.
  if (/^(bullet|himalayan|classic-350|activa|innova|dzire|swift|ertiga|thar|scorpio|fortuner)-rental-in-/.test(slug)) {
    return "sitemap-vehicles.xml";
  }
  // Taxi hub + city taxi hubs + sightseeing sit with services; taxi routes stay in routes bucket.
  if (slug === "taxi" || slug.startsWith("taxi-service-in-") || slug.endsWith("-sightseeing-taxi")) {
    return "sitemap-services.xml";
  }
  // Wave 2 category rentals outside Dehradun core
  if (
    slug.startsWith("car-rental-in-") ||
    slug.startsWith("bike-rental-in-") ||
    slug.startsWith("scooty-rental-in-")
  ) {
    return "sitemap-services.xml";
  }
  // Airport/railway/pilgrimage/route taxi patterns
  if (
    slug.includes("-airport-to-") ||
    slug.includes("-railway-station-to-") ||
    slug.endsWith("-airport-taxi") ||
    slug.endsWith("-railway-station-taxi") ||
    /-taxi-from-/.test(slug) ||
    slug.startsWith("char-dham-taxi-")
  ) {
    return "sitemap-routes.xml";
  }
  if (SERVICE_SLUGS.has(slug) || type === "category") return "sitemap-services.xml";
  if (type === "info") return "sitemap-guides.xml";
  return "sitemap-routes.xml";
}

function emptyBuckets(): Record<SitemapName, SitemapEntry[]> {
  return {
    "sitemap-cities.xml": [],
    "sitemap-services.xml": [],
    "sitemap-routes.xml": [],
    "sitemap-vehicles.xml": [],
    "sitemap-guides.xml": [],
  };
}

function pushUnique(
  out: Record<SitemapName, SitemapEntry[]>,
  seen: Set<string>,
  bucket: SitemapName,
  entry: SitemapEntry
) {
  if (seen.has(entry.loc)) return;
  seen.add(entry.loc);
  out[bucket].push(entry);
}

function cmsPageBucket(pageType: string): SitemapName {
  if (pageType === "LOCATION") return "sitemap-cities.xml";
  if (pageType === "ROUTE" || pageType === "AIRPORT" || pageType === "STATION") return "sitemap-routes.xml";
  if (pageType === "GUIDE" || pageType === "CUSTOM") return "sitemap-guides.xml";
  if (pageType === "VEHICLE_LOCATION") return "sitemap-vehicles.xml";
  if (pageType === "WEDDING" || pageType === "MONTHLY") return "sitemap-services.xml";
  return "sitemap-services.xml";
}

function priorityFor(bucket: SitemapName) {
  if (bucket === "sitemap-cities.xml") return "0.9";
  if (bucket === "sitemap-routes.xml" || bucket === "sitemap-services.xml") return "0.8";
  if (bucket === "sitemap-vehicles.xml") return "0.7";
  return "0.55";
}

export function landingEntries(): Record<SitemapName, SitemapEntry[]> {
  const out = emptyBuckets();
  const seen = new Set<string>();

  pushUnique(out, seen, "sitemap-cities.xml", {
    loc: abs("/"),
    changefreq: "daily",
    priority: "1.0",
  });
  pushUnique(out, seen, "sitemap-guides.xml", {
    loc: abs("/blog"),
    changefreq: "weekly",
    priority: "0.6",
  });

  for (const page of LANDING_PAGES) {
    const bucket = landingBucket(page.slug, page.type);
    if (!bucket) continue;
    pushUnique(out, seen, bucket, {
      loc: abs(`/${page.slug}`),
      changefreq: "weekly",
      priority: priorityFor(bucket),
    });
  }

  for (const post of BLOG_POSTS) {
    pushUnique(out, seen, "sitemap-guides.xml", {
      loc: abs(`/blog/${post.slug}`),
      lastmod: post.date,
      changefreq: "monthly",
      priority: "0.55",
    });
  }

  return out;
}

/** Static landings + published CMS SeoPages/blogs + indexable Route rows with live public slugs. */
export async function landingEntriesAsync(): Promise<Record<SitemapName, SitemapEntry[]>> {
  const out = landingEntries();
  const locked = new Set(allPageSlugs());
  const seen = new Set(
    Object.values(out)
      .flat()
      .map((e) => e.loc)
  );

  try {
    const rows = await prisma.seoPage.findMany({
      where: { status: "PUBLISHED", sitemapEnabled: true, indexable: true },
      select: {
        slug: true,
        pageType: true,
        updatedAt: true,
        publishedAt: true,
        canonicalSlug: true,
      },
    });
    for (const row of rows) {
      if (locked.has(row.slug)) continue;
      if (row.canonicalSlug && row.canonicalSlug !== row.slug) continue;
      const bucket = cmsPageBucket(row.pageType);
      const lastmod = (row.publishedAt || row.updatedAt).toISOString().slice(0, 10);
      pushUnique(out, seen, bucket, {
        loc: abs(`/${row.slug}`),
        lastmod,
        changefreq: "weekly",
        priority: bucket === "sitemap-cities.xml" ? "0.85" : priorityFor(bucket),
      });
    }
  } catch {
    /* DB unavailable — static only */
  }

  // Indexable CMS routes that already have a published SeoPage are covered above.
  // Also surface active Route.slug when it matches a published SeoPage gap already handled.
  // If a Route is indexable but has no SeoPage and no static page, skip (would 404).

  try {
    const posts = await listBlogPosts();
    for (const post of posts) {
      if (!post.indexable) continue;
      pushUnique(out, seen, "sitemap-guides.xml", {
        loc: abs(`/blog/${post.slug}`),
        lastmod: post.date,
        changefreq: "monthly",
        priority: "0.55",
      });
    }
  } catch {
    /* ignore */
  }

  for (const name of SITEMAP_FILES) {
    out[name].sort((a, b) => a.loc.localeCompare(b.loc));
  }

  return out;
}

export async function vehicleEntries(): Promise<SitemapEntry[]> {
  const db = await getAllVehicles();
  const vehicles = db.length ? db : SEED_VEHICLES;
  return vehicles
    .map((v) => {
      const updatedAt = (v as { updatedAt?: Date | string }).updatedAt;
      const lastmod =
        updatedAt instanceof Date
          ? updatedAt.toISOString().slice(0, 10)
          : typeof updatedAt === "string"
            ? updatedAt.slice(0, 10)
            : undefined;
      return {
        loc: abs(`/rent/${v.slug}`),
        changefreq: "weekly" as const,
        priority: "0.7",
        lastmod,
      };
    })
    .sort((a, b) => a.loc.localeCompare(b.loc));
}

export function sitemapIndexXml() {
  const today = new Date().toISOString().slice(0, 10);
  const body = SITEMAP_FILES.map(
    (file) =>
      `  <sitemap>\n    <loc>${escapeXml(`${SITE_URL}/${file}`)}</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>`
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

export function urlSetXml(entries: SitemapEntry[]) {
  const body = entries
    .map((e) => {
      const lastmod = e.lastmod ? `\n    <lastmod>${escapeXml(e.lastmod)}</lastmod>` : "";
      const freq = e.changefreq ? `\n    <changefreq>${e.changefreq}</changefreq>` : "";
      const priority = e.priority ? `\n    <priority>${e.priority}</priority>` : "";
      return `  <url>\n    <loc>${escapeXml(e.loc)}</loc>${lastmod}${freq}${priority}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function xmlResponse(body: string) {
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
