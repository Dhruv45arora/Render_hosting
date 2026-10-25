/**
 * Phase 6 — copy-preserve legacy static content into Neon CMS tables.
 *
 * Safety rules:
 * - Create-if-missing only (never overwrite existing CMS rows)
 * - SeoPage / BlogPost imported as DRAFT + indexable=false + sitemapEnabled=false
 *   so public dual-render keeps serving static Wave 1 until you explicitly publish
 * - Slug / title / H1 / body preserved verbatim
 * - Re-runnable (idempotent)
 *
 * Usage: npx tsx scripts/migrate-cms-content.ts
 * Optional: --publish  (import as PUBLISHED; static still wins for locked slugs)
 */
import { PrismaClient } from "@prisma/client";
import { BLOG_POSTS } from "../data/blog";
import { LANDING_PAGES, getPage } from "../data/pages";
import { WAVE1_CITY_HUBS, WAVE1_CITY_HUB_SLUGS } from "../data/wave1-hubs";
import { WAVE1_PAGE_SLUGS } from "../data/wave1-pages";
import { loadEnv } from "./load-env";

loadEnv();
const prisma = new PrismaClient();
const PUBLISH = process.argv.includes("--publish");

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function pageTypeFor(page: {
  slug: string;
  type: "category" | "route" | "info";
  enquiryCity?: string;
}): string {
  if (WAVE1_CITY_HUB_SLUGS.has(page.slug) || page.slug === "car-rental-dehradun") return "LOCATION";
  if (page.slug.includes("airport")) return "AIRPORT";
  if (page.slug.includes("station") || page.slug.includes("railway") || page.slug.includes("isbt")) return "STATION";
  if (page.slug.includes("wedding")) return "WEDDING";
  if (page.slug.includes("monthly")) return "MONTHLY";
  if (page.type === "route") return "ROUTE";
  if (page.type === "info") return "GUIDE";
  if (page.enquiryCity) return "SERVICE_LOCATION";
  return "SERVICE_LOCATION";
}

function mainContentFromSections(sections: { heading: string; body: string }[]) {
  return sections
    .map((s) => `<h2>${escapeHtml(s.heading)}</h2>\n<p>${escapeHtml(s.body)}</p>`)
    .join("\n");
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function migrateLocations() {
  let created = 0;
  let skipped = 0;

  // Dehradun OWN_FLEET desk
  {
    const slug = "dehradun";
    const existing = await prisma.location.findUnique({ where: { slug } });
    if (existing) skipped += 1;
    else {
      await prisma.location.create({
        data: {
          name: "Dehradun",
          slug,
          district: "Dehradun",
          state: "Uttarakhand",
          region: "North India",
          description: "Arora Cars home desk — Clock Tower, Dehradun.",
          localIntro: "Own fleet self-drive and chauffeur rentals from Dehradun.",
          serviceMode: "OWN_FLEET",
          active: true,
          seoPriority: 100,
        },
      });
      created += 1;
    }
  }

  for (const hub of WAVE1_CITY_HUBS) {
    const city = hub.enquiryCity || hub.h1.replace(/^Car rental in /i, "").trim();
    const slug = slugify(city);
    if (!slug || slug === "dehradun") continue;
    const existing = await prisma.location.findUnique({ where: { slug } });
    if (existing) {
      skipped += 1;
      continue;
    }
    await prisma.location.create({
      data: {
        name: city,
        slug,
        state: "",
        region: "",
        description: hub.description,
        localIntro: hub.intro,
        serviceMode: "PARTNER",
        active: true,
        seoPriority: 50,
        localFaqs: JSON.stringify(hub.faqs),
      },
    });
    created += 1;
  }

  return { created, skipped };
}

async function migrateServices() {
  const defaults = [
    { name: "Self Drive Car Rental", slug: "self-drive", sortOrder: 10 },
    { name: "Chauffeur / With Driver", slug: "chauffeur", sortOrder: 20 },
    {
      name: "Taxi Service (Uttarakhand)",
      slug: "taxi",
      sortOrder: 25,
      description:
        "Local, outstation, airport and pilgrimage taxi enquiries across Uttarakhand. Public hub: /taxi",
    },
    { name: "Airport Transfer", slug: "airport-transfer", sortOrder: 30 },
    { name: "Outstation", slug: "outstation", sortOrder: 40 },
    { name: "Wedding Car", slug: "wedding", sortOrder: 50 },
    { name: "Monthly Rental", slug: "monthly", sortOrder: 60 },
    { name: "Bike & Scooty", slug: "two-wheeler", sortOrder: 70 },
    { name: "Tempo Traveller", slug: "tempo-traveller", sortOrder: 80 },
  ];
  let created = 0;
  let skipped = 0;
  for (const s of defaults) {
    const existing = await prisma.service.findUnique({ where: { slug: s.slug } });
    if (existing) {
      skipped += 1;
      continue;
    }
    await prisma.service.create({
      data: {
        name: s.name,
        slug: s.slug,
        description:
          "description" in s && typeof s.description === "string"
            ? s.description
            : `${s.name} — managed in CMS.`,
        active: true,
        sortOrder: s.sortOrder,
      },
    });
    created += 1;
  }
  return { created, skipped };
}

async function migrateLandings() {
  let created = 0;
  let skipped = 0;
  const locations = await prisma.location.findMany({ select: { id: true, name: true, slug: true } });
  const byName = new Map(locations.map((l) => [l.name.toLowerCase(), l]));
  const bySlug = new Map(locations.map((l) => [l.slug, l]));

  for (const base of LANDING_PAGES) {
    const page = getPage(base.slug) || base;
    const existing = await prisma.seoPage.findUnique({ where: { slug: page.slug } });
    if (existing) {
      skipped += 1;
      continue;
    }

    let locationId: number | null = null;
    if (page.enquiryCity) {
      locationId = byName.get(page.enquiryCity.toLowerCase())?.id ?? null;
    } else if (page.slug === "car-rental-dehradun" || page.slug.includes("dehradun")) {
      locationId = bySlug.get("dehradun")?.id ?? null;
    }

    const wave1 =
      WAVE1_CITY_HUB_SLUGS.has(page.slug) || WAVE1_PAGE_SLUGS.has(page.slug);
    const legacySource = wave1 ? "wave1" : "pages.ts";
    const status = PUBLISH ? "PUBLISHED" : "DRAFT";

    await prisma.seoPage.create({
      data: {
        slug: page.slug,
        pageType: pageTypeFor(page),
        status,
        locationId,
        seoTitle: page.title,
        metaDescription: page.description,
        h1: page.h1,
        heroTitle: page.h1,
        heroSubtitle: page.badge,
        intro: page.intro,
        mainContent: mainContentFromSections(page.sections),
        primaryKeyword: page.primaryKeyword,
        secondaryKeywords: JSON.stringify(page.secondaryKeywords || []),
        canonicalSlug: page.canonicalSlug || null,
        featuredImage: page.heroImage || "",
        faqs: JSON.stringify(page.faqs || []),
        relatedSlugs: JSON.stringify(page.relatedSlugs || []),
        indexable: PUBLISH ? !page.canonicalSlug || page.canonicalSlug === page.slug : false,
        sitemapEnabled: false,
        featured: false,
        priority: wave1 ? 40 : 20,
        legacySource,
        publishedAt: PUBLISH ? new Date() : null,
      },
    });
    created += 1;
  }

  return { created, skipped };
}

async function migrateBlogs() {
  let created = 0;
  let skipped = 0;

  let categoryId: number | null = null;
  const catSlug = "guides";
  const existingCat = await prisma.blogCategory.findUnique({ where: { slug: catSlug } });
  if (existingCat) categoryId = existingCat.id;
  else {
    const cat = await prisma.blogCategory.create({
      data: { name: "Guides", slug: catSlug },
    });
    categoryId = cat.id;
  }

  for (const post of BLOG_POSTS) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: post.slug } });
    if (existing) {
      skipped += 1;
      continue;
    }
    const content = post.body
      .map((b) => {
        const h = b.heading ? `<h2>${escapeHtml(b.heading)}</h2>\n` : "";
        return `${h}${b.html}`;
      })
      .join("\n");
    const status = PUBLISH ? "PUBLISHED" : "DRAFT";
    await prisma.blogPost.create({
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content,
        featuredImage: post.heroImage,
        featuredImageAlt: post.title,
        author: "Arora Cars",
        categoryId,
        status,
        publishedAt: PUBLISH ? new Date(post.date) : null,
        seoTitle: post.title,
        metaDescription: post.description,
        primaryKeyword: post.primaryKeyword,
        secondaryKeywords: JSON.stringify(post.secondaryKeywords || []),
        indexable: PUBLISH,
        featured: false,
        relatedSlugs: "[]",
        legacySource: "blog.ts",
      },
    });
    created += 1;
  }

  return { created, skipped };
}

async function main() {
  console.log(`CMS migrate (create-if-missing)${PUBLISH ? " [--publish]" : " [DRAFT]"}…`);
  const locations = await migrateLocations();
  const services = await migrateServices();
  const landings = await migrateLandings();
  const blogs = await migrateBlogs();
  console.log(
    JSON.stringify(
      {
        mode: PUBLISH ? "PUBLISHED" : "DRAFT",
        locations,
        services,
        landings,
        blogs,
        note: "Static Wave 1 URLs still win in dual-render until you cut over. Re-run is safe.",
      },
      null,
      2
    )
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
