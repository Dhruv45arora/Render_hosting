import { BLOG_POSTS } from "@/data/blog";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/cms/json";
import type { ResolvedBlogPost } from "@/lib/cms/types";

function fromStatic(slug: string): ResolvedBlogPost | null {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return null;
  return {
    slug: post.slug,
    source: "static",
    title: post.title,
    description: post.description,
    primaryKeyword: post.primaryKeyword,
    secondaryKeywords: post.secondaryKeywords,
    date: post.date,
    heroImage: post.heroImage,
    excerpt: post.excerpt,
    body: post.body,
    indexable: true,
  };
}

async function fromCms(slug: string): Promise<ResolvedBlogPost | null> {
  try {
    const row = await prisma.blogPost.findFirst({
      where: { slug, status: "PUBLISHED" },
    });
    if (!row) return null;
    const html = (row.content || "").trim();
    return {
      slug: row.slug,
      source: "cms",
      title: row.title,
      description: row.metaDescription || row.excerpt,
      primaryKeyword: row.primaryKeyword,
      secondaryKeywords: parseJsonArray<string>(row.secondaryKeywords),
      date: (row.publishedAt || row.createdAt).toISOString().slice(0, 10),
      dateModified: row.updatedAt.toISOString().slice(0, 10),
      author: row.author || "Arora Cars",
      heroImage: row.featuredImage || "/images/destinations/mussoorie-hills.jpg",
      excerpt: row.excerpt,
      body: html ? [{ html }] : [{ html: `<p>${row.excerpt || ""}</p>` }],
      indexable: row.indexable,
    };
  } catch {
    return null;
  }
}

/** Static blog slug wins; CMS fills gaps. */
export async function resolveBlogPost(slug: string): Promise<ResolvedBlogPost | null> {
  return fromStatic(slug) || (await fromCms(slug));
}

export async function listBlogPosts(): Promise<ResolvedBlogPost[]> {
  const staticSlugs = new Set(BLOG_POSTS.map((p) => p.slug));
  const staticList = BLOG_POSTS.map((p) => fromStatic(p.slug)!);

  let cmsList: ResolvedBlogPost[] = [];
  try {
    const rows = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED", indexable: true },
      orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
    });
    cmsList = rows
      .filter((r) => !staticSlugs.has(r.slug))
      .map((row) => ({
        slug: row.slug,
        source: "cms" as const,
        title: row.title,
        description: row.metaDescription || row.excerpt,
        primaryKeyword: row.primaryKeyword,
        secondaryKeywords: parseJsonArray<string>(row.secondaryKeywords),
        date: (row.publishedAt || row.createdAt).toISOString().slice(0, 10),
        dateModified: row.updatedAt.toISOString().slice(0, 10),
        author: row.author || "Arora Cars",
        heroImage: row.featuredImage || "/images/destinations/mussoorie-hills.jpg",
        excerpt: row.excerpt,
        body: [],
        indexable: row.indexable,
      }));
  } catch {
    /* ignore */
  }

  return [...staticList, ...cmsList].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function cmsPublishedBlogSlugs(): Promise<string[]> {
  try {
    const locked = new Set(BLOG_POSTS.map((p) => p.slug));
    const rows = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true },
    });
    return rows.map((r) => r.slug).filter((s) => !locked.has(s));
  } catch {
    return [];
  }
}
