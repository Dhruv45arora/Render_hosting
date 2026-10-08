import { BLOG_POSTS } from "@/data/blog";
import { getPage, LANDING_PAGES } from "@/data/pages";
import { WAVE1_CITY_HUB_SLUGS } from "@/data/wave1-hubs";
import { SEED_VEHICLES } from "@/data/vehicles";
import { SITE_URL } from "@/lib/constants";
import { getAllVehicles } from "@/lib/queries";

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
  if (SERVICE_SLUGS.has(slug) || type === "category") return "sitemap-services.xml";
  if (type === "info") return "sitemap-guides.xml";
  return "sitemap-routes.xml";
}

export function landingEntries(): Record<SitemapName, SitemapEntry[]> {
  const out: Record<SitemapName, SitemapEntry[]> = {
    "sitemap-cities.xml": [
      { loc: abs("/"), changefreq: "daily", priority: "1.0" },
    ],
    "sitemap-services.xml": [],
    "sitemap-routes.xml": [],
    "sitemap-vehicles.xml": [],
    "sitemap-guides.xml": [
      { loc: abs("/blog"), changefreq: "weekly", priority: "0.6" },
    ],
  };

  for (const page of LANDING_PAGES) {
    const bucket = landingBucket(page.slug, page.type);
    if (!bucket) continue;
    const priority =
      bucket === "sitemap-cities.xml" ? "0.9" : bucket === "sitemap-routes.xml" ? "0.8" : bucket === "sitemap-services.xml" ? "0.8" : "0.5";
    out[bucket].push({
      loc: abs(`/${page.slug}`),
      changefreq: "weekly",
      priority,
    });
  }

  for (const post of BLOG_POSTS) {
    out["sitemap-guides.xml"].push({
      loc: abs(`/blog/${post.slug}`),
      lastmod: post.date,
      changefreq: "monthly",
      priority: "0.55",
    });
  }

  return out;
}

export async function vehicleEntries(): Promise<SitemapEntry[]> {
  const db = await getAllVehicles();
  const vehicles = db.length ? db : SEED_VEHICLES;
  return vehicles.map((v) => ({
    loc: abs(`/rent/${v.slug}`),
    changefreq: "weekly" as const,
    priority: "0.7",
  }));
}

export function sitemapIndexXml() {
  const body = SITEMAP_FILES.map(
    (file) => `  <sitemap>\n    <loc>${escapeXml(`${SITE_URL}/${file}`)}</loc>\n  </sitemap>`
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
