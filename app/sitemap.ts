import type { MetadataRoute } from "next";
import { LANDING_PAGES, getPage } from "@/data/pages";
import { BLOG_POSTS } from "@/data/blog";
import { SEED_VEHICLES } from "@/data/vehicles";
import { getAllVehicles } from "@/lib/queries";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const db = await getAllVehicles();
  const vehicles = db.length ? db : SEED_VEHICLES;

  const home: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  // Skip URLs that canonicalize elsewhere (legacy / near-duplicate landings).
  const pages = LANDING_PAGES.filter((p) => {
    const merged = getPage(p.slug);
    return !merged?.canonicalSlug || merged.canonicalSlug === p.slug;
  }).map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p.type === "category" ? 0.9 : p.type === "route" ? 0.8 : 0.5,
  }));

  const rent = vehicles.map((v) => ({
    url: `${SITE_URL}/rent/${v.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blog = BLOG_POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  return [...home, ...pages, ...rent, ...blog];
}
