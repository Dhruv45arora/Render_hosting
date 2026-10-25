import { getPage, allPageSlugs } from "@/data/pages";
import { prisma } from "@/lib/prisma";
import { parseFaqs, parseJsonArray } from "@/lib/cms/json";
import type { ResolvedLanding } from "@/lib/cms/types";

function pageTypeToLandingType(pageType: string): ResolvedLanding["type"] {
  if (pageType === "ROUTE" || pageType === "AIRPORT" || pageType === "STATION") return "route";
  if (pageType === "GUIDE" || pageType === "CUSTOM") return "info";
  return "category";
}

function sectionsFromCms(intro: string, mainContent: string, heroSubtitle: string) {
  const sections: { heading: string; body: string }[] = [];
  const body = (mainContent || "").trim();
  if (body) {
    sections.push({ heading: heroSubtitle || "Overview", body });
  } else if (intro.trim()) {
    // intro already shown in hero; keep sections empty
  }
  return sections;
}

function fromStatic(slug: string): ResolvedLanding | null {
  const page = getPage(slug);
  if (!page) return null;
  const partner = !!page.enquiryCity;
  return {
    slug: page.slug,
    source: "static",
    type: page.type,
    title: page.title,
    h1: page.h1,
    description: page.description,
    primaryKeyword: page.primaryKeyword,
    secondaryKeywords: page.secondaryKeywords,
    badge: page.badge,
    intro: page.intro,
    heroImage: page.heroImage,
    gallery: page.gallery,
    categoryFilter: page.categoryFilter,
    driveFilter: page.driveFilter,
    faqs: page.faqs,
    sections: page.sections,
    relatedSlugs: page.relatedSlugs,
    enquiryCity: page.enquiryCity,
    primaryCta: page.primaryCta,
    secondaryCta: page.secondaryCta,
    submitLabel: page.submitLabel,
    canonicalSlug: page.canonicalSlug,
    includes: page.includes,
    excludes: page.excludes,
    howToBook: page.howToBook,
    showFleet: !partner,
    indexable: !page.canonicalSlug || page.canonicalSlug === page.slug,
    // Static landings are Dehradun-desk content; partner Wave 1 never emits CarRental.
    emitLocalBusiness: !partner,
  };
}

async function fromCms(slug: string): Promise<ResolvedLanding | null> {
  try {
    const row = await prisma.seoPage.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: {
        location: { select: { id: true, name: true, slug: true, serviceMode: true } },
        service: { select: { id: true, name: true, slug: true } },
        vehicle: { select: { id: true, name: true, slug: true, category: true } },
        route: { select: { id: true, slug: true } },
      },
    });
    if (!row) return null;

    const mode = row.location?.serviceMode || "PARTNER";
    const isPartner = mode === "PARTNER" || mode === "UNAVAILABLE";
    const enquiryCity = isPartner ? row.location?.name : undefined;
    const showFleet =
      !isPartner &&
      (row.pageType === "LOCATION" ||
        row.pageType === "VEHICLE_LOCATION" ||
        row.pageType === "SERVICE_LOCATION");
    const locSlug = (row.location?.slug || "").toLowerCase();
    const isDehradunDesk =
      mode === "OWN_FLEET" &&
      (locSlug === "dehradun" ||
        locSlug.includes("dehradun") ||
        (row.location?.name || "").toLowerCase().includes("dehradun"));

    return {
      slug: row.slug,
      source: "cms",
      type: pageTypeToLandingType(row.pageType),
      title: row.seoTitle || row.h1,
      h1: row.h1 || row.seoTitle || row.slug,
      description: row.metaDescription,
      primaryKeyword: row.primaryKeyword,
      secondaryKeywords: parseJsonArray<string>(row.secondaryKeywords),
      badge: row.heroSubtitle || row.pageType.replace(/_/g, " "),
      intro: row.intro || row.heroTitle || row.heroSubtitle,
      heroImage: row.featuredImage || "/images/fleet/hatchback-silver.jpg",
      categoryFilter: row.vehicle?.category,
      faqs: parseFaqs(row.faqs),
      sections: sectionsFromCms(row.intro, row.mainContent, row.heroTitle || "Details"),
      relatedSlugs: parseJsonArray<string>(row.relatedSlugs),
      enquiryCity,
      primaryCta: isPartner ? "Request a Quote" : undefined,
      secondaryCta: isPartner ? "Check Availability with Local Rental Partners" : undefined,
      canonicalSlug: row.canonicalSlug || undefined,
      locationId: row.locationId || undefined,
      locationSlug: row.location?.slug,
      locationName: row.location?.name,
      serviceMode: mode,
      pageType: row.pageType,
      showFleet,
      indexable: row.indexable && (!row.canonicalSlug || row.canonicalSlug === row.slug),
      // CarRental JSON-LD is the Dehradun desk only — never invent a branch LocalBusiness.
      emitLocalBusiness: !isPartner && isDehradunDesk,
    };
  } catch {
    return null;
  }
}

export type LandingResolve =
  | { kind: "page"; page: ResolvedLanding }
  | { kind: "redirect"; to: string; permanent: boolean }
  | { kind: "miss" };

/**
 * Phase 4 dual render:
 * 1) Legacy static / Wave 1 slug always wins
 * 2) Published DB SeoPage for gaps
 * 3) Active Redirect row
 * 4) miss → 404
 */
export async function resolveLanding(slug: string): Promise<LandingResolve> {
  const staticPage = fromStatic(slug);
  if (staticPage) return { kind: "page", page: staticPage };

  const cms = await fromCms(slug);
  if (cms) return { kind: "page", page: cms };

  try {
    const redir = await prisma.redirect.findFirst({
      where: { oldPath: `/${slug}`, active: true },
    });
    if (redir?.newPath) {
      return {
        kind: "redirect",
        to: redir.newPath.startsWith("/") ? redir.newPath : `/${redir.newPath}`,
        permanent: redir.statusCode === 301,
      };
    }
  } catch {
    /* ignore */
  }

  return { kind: "miss" };
}

export async function cmsPublishedLandingSlugs(): Promise<string[]> {
  try {
    const locked = new Set(allPageSlugs());
    const rows = await prisma.seoPage.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true },
    });
    return rows.map((r) => r.slug).filter((s) => !locked.has(s));
  } catch {
    return [];
  }
}

/** Vehicles assigned to a CMS location (OWN_FLEET pages). */
export async function getLocationFleet(locationId: number) {
  try {
    const links = await prisma.vehicleLocation.findMany({
      where: {
        locationId,
        active: true,
        available: true,
        vehicle: { status: "ACTIVE" },
      },
      include: { vehicle: true },
      orderBy: { updatedAt: "desc" },
    });
    return links.map((l) => {
      const v = l.vehicle;
      return {
        ...v,
        pricePerDay: l.pricePerDay ?? v.pricePerDay,
        pricePerHour: l.pricePerHour ?? v.pricePerHour,
        pricePerKm: l.pricePerKm ?? v.pricePerKm,
        deposit: l.deposit ?? v.deposit,
      };
    });
  } catch {
    return [];
  }
}
