/**
 * Phase 7 — CMS / dual-render regression checks (no network required).
 * Run after migrate:cms. Exit 1 on failure.
 */
import { PrismaClient } from "@prisma/client";
import { BLOG_POSTS } from "../data/blog";
import { getPage, LANDING_PAGES } from "../data/pages";
import { WAVE1_CITY_HUB_SLUGS } from "../data/wave1-hubs";
import { WAVE1_PAGE_SLUGS } from "../data/wave1-pages";
import { resolveLanding } from "../lib/cms/resolve-landing";
import { resolveBlogPost } from "../lib/cms/resolve-blog";
import { landingEntries, landingEntriesAsync } from "../lib/sitemap-sets";
import { loadEnv } from "./load-env";

loadEnv();
const prisma = new PrismaClient();
const problems: string[] = [];

async function main() {
  const wave1 = new Set([...WAVE1_CITY_HUB_SLUGS, ...WAVE1_PAGE_SLUGS]);

  // Dual-render: every Wave 1 slug must resolve as static
  for (const slug of wave1) {
    const r = await resolveLanding(slug);
    if (r.kind !== "page") {
      problems.push(`wave1 miss ${slug}`);
      continue;
    }
    if (r.page.source !== "static") problems.push(`wave1 not static ${slug} got ${r.page.source}`);
    if (!r.page.enquiryCity) problems.push(`wave1 no enquiryCity ${slug}`);
    if (r.page.emitLocalBusiness) problems.push(`wave1 emits CarRental ${slug}`);
    if (r.page.showFleet) problems.push(`wave1 shows fleet ${slug}`);
  }

  // Dehradun hub must emit local business
  const dd = await resolveLanding("car-rental-dehradun");
  if (dd.kind !== "page") problems.push("missing car-rental-dehradun");
  else {
    if (dd.page.source !== "static") problems.push("dehradun hub not static");
    if (!dd.page.emitLocalBusiness) problems.push("dehradun hub missing CarRental flag");
    if (dd.page.enquiryCity) problems.push("dehradun hub wrongly partner");
  }

  // Static blog still wins
  for (const post of BLOG_POSTS) {
    const r = await resolveBlogPost(post.slug);
    if (!r) problems.push(`blog miss ${post.slug}`);
    else if (r.source !== "static") problems.push(`blog not static ${post.slug}`);
  }

  // Sitemap: Wave 1 hubs in cities bucket (static sync)
  const sync = landingEntries();
  for (const slug of WAVE1_CITY_HUB_SLUGS) {
    const hit = sync["sitemap-cities.xml"].some((e) => e.loc.endsWith(`/${slug}`));
    if (!hit) problems.push(`sitemap hub missing ${slug}`);
  }

  // Async sitemap must not drop homepage / blog index
  const asyncEntries = await landingEntriesAsync();
  if (asyncEntries["sitemap-cities.xml"].length < 1) problems.push("async cities empty");
  if (!asyncEntries["sitemap-guides.xml"].some((e) => e.loc.includes("/blog"))) {
    problems.push("async guides missing /blog");
  }

  // Cross-bucket dedupe
  const seen = new Set<string>();
  for (const bucket of Object.keys(asyncEntries) as (keyof typeof asyncEntries)[]) {
    for (const e of asyncEntries[bucket]) {
      if (seen.has(e.loc)) problems.push(`sitemap duplicate ${e.loc}`);
      seen.add(e.loc);
    }
  }

  // DB soft checks (optional if migrate not run)
  try {
    const dehradun = await prisma.location.findUnique({ where: { slug: "dehradun" } });
    if (dehradun && dehradun.serviceMode !== "OWN_FLEET") {
      problems.push("dehradun location not OWN_FLEET");
    }

    const cmsWave1 = await prisma.seoPage.count({
      where: { legacySource: "wave1" },
    });
    if (cmsWave1 > 0 && cmsWave1 < wave1.size) {
      // Partial migrate is OK; warn only if many missing after a full run expectation
      // Don't fail — migrate may not have been run yet
    }

    // Published CMS pages must not steal locked static slugs in resolver
    const published = await prisma.seoPage.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true },
      take: 500,
    });
    for (const row of published) {
      if (!wave1.has(row.slug) && !LANDING_PAGES.some((p) => p.slug === row.slug)) continue;
      const r = await resolveLanding(row.slug);
      if (r.kind === "page" && getPage(row.slug) && r.page.source !== "static") {
        problems.push(`static should win ${row.slug}`);
      }
    }

    // Partner locations must not be OWN_FLEET
    const bad = await prisma.location.findMany({
      where: { serviceMode: "OWN_FLEET", slug: { not: "dehradun" } },
    });
    for (const loc of bad) {
      // Allow future own-fleet cities only if intentionally set — warn as problem for now
      problems.push(`unexpected OWN_FLEET location ${loc.slug}`);
    }
  } catch (e) {
    problems.push(`db check failed: ${e instanceof Error ? e.message : String(e)}`);
  }

  const report = {
    wave1Slugs: wave1.size,
    landingPages: LANDING_PAGES.length,
    blogPosts: BLOG_POSTS.length,
    problems,
  };
  console.log(JSON.stringify(report, null, 2));
  if (problems.length) process.exit(1);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
