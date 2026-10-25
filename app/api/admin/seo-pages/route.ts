import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { asBool, asInt, asJsonString, asString, slugify } from "@/lib/admin/helpers";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  const status = searchParams.get("status") || undefined;
  const pageType = searchParams.get("pageType") || undefined;
  const rows = await prisma.seoPage.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(pageType ? { pageType } : {}),
      ...(q
        ? {
            OR: [
              { slug: { contains: q, mode: "insensitive" } },
              { h1: { contains: q, mode: "insensitive" } },
              { seoTitle: { contains: q, mode: "insensitive" } },
              { primaryKeyword: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: [{ updatedAt: "desc" }],
    include: {
      location: { select: { id: true, name: true, slug: true } },
      vehicle: { select: { id: true, name: true, slug: true } },
      service: { select: { id: true, name: true, slug: true } },
      route: { select: { id: true, slug: true } },
    },
    take: 200,
  });
  return NextResponse.json(rows);
}

function pageData(body: Record<string, unknown>, forCreate: boolean) {
  const h1 = asString(body.h1).trim();
  const slug = asString(body.slug).trim() || (h1 ? slugify(h1) : "");
  if (forCreate && !slug) throw new Error("Slug or H1 is required");
  const status = asString(body.status, "DRAFT");
  const indexable = asBool(body.indexable, false);
  const sitemapEnabled = asBool(body.sitemapEnabled, false);
  if (status !== "PUBLISHED" && (indexable || sitemapEnabled)) {
    // Draft/archived pages should not be indexable by default path — still allow explicit override later in Phase 5
  }
  return {
    slug: slug || undefined,
    pageType: asString(body.pageType, "CUSTOM"),
    status,
    locationId: body.locationId ? asInt(body.locationId) : null,
    vehicleId: body.vehicleId ? asInt(body.vehicleId) : null,
    serviceId: body.serviceId ? asInt(body.serviceId) : null,
    routeId: body.routeId ? asInt(body.routeId) : null,
    seoTitle: asString(body.seoTitle) || h1,
    metaDescription: asString(body.metaDescription),
    h1,
    heroTitle: asString(body.heroTitle),
    heroSubtitle: asString(body.heroSubtitle),
    intro: asString(body.intro),
    mainContent: asString(body.mainContent),
    primaryKeyword: asString(body.primaryKeyword),
    secondaryKeywords: asJsonString(body.secondaryKeywords, "[]"),
    canonicalSlug: asString(body.canonicalSlug) || null,
    featuredImage: asString(body.featuredImage),
    faqs: asJsonString(body.faqs, "[]"),
    relatedSlugs: asJsonString(body.relatedSlugs, "[]"),
    indexable,
    sitemapEnabled: status === "PUBLISHED" ? sitemapEnabled : false,
    featured: asBool(body.featured, false),
    priority: asInt(body.priority, 0),
    publishedAt: status === "PUBLISHED" ? new Date() : null,
  };
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  try {
    const data = pageData(body, true);
    const existing = await prisma.seoPage.findUnique({ where: { slug: data.slug! } });
    if (existing) return NextResponse.json({ error: `Slug already exists: ${data.slug}` }, { status: 409 });
    const row = await prisma.seoPage.create({ data: data as never });
    return NextResponse.json(row);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not create SEO page";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  try {
    const current = await prisma.seoPage.findUnique({ where: { id: asInt(body.id) } });
    if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const data = pageData(body, false);
    if (data.slug && data.slug !== current.slug && current.status === "PUBLISHED") {
      // Warn via response header field — client shows message; still allow with redirect creation later
      await prisma.redirect.upsert({
        where: { oldPath: `/${current.slug}` },
        update: { newPath: `/${data.slug}`, statusCode: 301, active: true },
        create: { oldPath: `/${current.slug}`, newPath: `/${data.slug}`, statusCode: 301, active: true },
      });
    }
    const row = await prisma.seoPage.update({
      where: { id: asInt(body.id) },
      data: {
        ...data,
        publishedAt:
          data.status === "PUBLISHED"
            ? current.publishedAt || new Date()
            : current.publishedAt,
      },
    });
    return NextResponse.json(row);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not update SEO page";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const id = asInt(new URL(req.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const row = await prisma.seoPage.update({
    where: { id },
    data: { status: "ARCHIVED", indexable: false, sitemapEnabled: false },
  });
  return NextResponse.json({ ok: true, page: row });
}
