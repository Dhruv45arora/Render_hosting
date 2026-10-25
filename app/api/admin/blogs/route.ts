import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { asBool, asInt, asJsonString, asString, slugify } from "@/lib/admin/helpers";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  const status = searchParams.get("status") || undefined;
  const rows = await prisma.blogPost.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { slug: { contains: q, mode: "insensitive" } },
              { primaryKeyword: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: [{ updatedAt: "desc" }],
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
    take: 200,
  });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  const title = asString(body.title).trim();
  if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
  const slug = asString(body.slug).trim() || slugify(title);
  const status = asString(body.status, "DRAFT");
  const tagIds: number[] = Array.isArray(body.tagIds) ? body.tagIds.map((n: unknown) => asInt(n)).filter(Boolean) : [];
  try {
    const row = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt: asString(body.excerpt),
        content: asString(body.content),
        featuredImage: asString(body.featuredImage),
        featuredImageAlt: asString(body.featuredImageAlt),
        author: asString(body.author, "Arora Cars"),
        categoryId: body.categoryId ? asInt(body.categoryId) : null,
        status,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
        seoTitle: asString(body.seoTitle) || title,
        metaDescription: asString(body.metaDescription),
        canonical: asString(body.canonical) || null,
        primaryKeyword: asString(body.primaryKeyword),
        secondaryKeywords: asJsonString(body.secondaryKeywords, "[]"),
        indexable: asBool(body.indexable, true),
        featured: asBool(body.featured, false),
        readingTime: body.readingTime != null && body.readingTime !== "" ? asInt(body.readingTime) : null,
        relatedSlugs: asJsonString(body.relatedSlugs, "[]"),
        tags: tagIds.length
          ? { create: tagIds.map((tagId) => ({ tagId })) }
          : undefined,
      },
      include: { category: true, tags: { include: { tag: true } } },
    });
    return NextResponse.json(row);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not create blog";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const id = asInt(body.id);
  const status = asString(body.status, "DRAFT");
  const tagIds: number[] = Array.isArray(body.tagIds) ? body.tagIds.map((n: unknown) => asInt(n)).filter(Boolean) : [];
  try {
    const current = await prisma.blogPost.findUnique({ where: { id } });
    if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await prisma.blogPostTag.deleteMany({ where: { postId: id } });
    const row = await prisma.blogPost.update({
      where: { id },
      data: {
        title: asString(body.title),
        slug: asString(body.slug) || undefined,
        excerpt: asString(body.excerpt),
        content: asString(body.content),
        featuredImage: asString(body.featuredImage),
        featuredImageAlt: asString(body.featuredImageAlt),
        author: asString(body.author, "Arora Cars"),
        categoryId: body.categoryId ? asInt(body.categoryId) : null,
        status,
        publishedAt:
          status === "PUBLISHED" ? current.publishedAt || new Date() : current.publishedAt,
        seoTitle: asString(body.seoTitle),
        metaDescription: asString(body.metaDescription),
        canonical: asString(body.canonical) || null,
        primaryKeyword: asString(body.primaryKeyword),
        secondaryKeywords: asJsonString(body.secondaryKeywords, "[]"),
        indexable: status === "PUBLISHED" ? asBool(body.indexable, true) : false,
        featured: asBool(body.featured, false),
        readingTime: body.readingTime != null && body.readingTime !== "" ? asInt(body.readingTime) : null,
        relatedSlugs: asJsonString(body.relatedSlugs, "[]"),
        tags: tagIds.length ? { create: tagIds.map((tagId) => ({ tagId })) } : undefined,
      },
      include: { category: true, tags: { include: { tag: true } } },
    });
    return NextResponse.json(row);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not update blog";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const id = asInt(new URL(req.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const row = await prisma.blogPost.update({
    where: { id },
    data: { status: "ARCHIVED", indexable: false },
  });
  return NextResponse.json({ ok: true, post: row });
}
