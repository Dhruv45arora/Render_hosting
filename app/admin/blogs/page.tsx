import { prisma } from "@/lib/prisma";
import BlogsAdmin from "@/components/admin/BlogsAdmin";

export const dynamic = "force-dynamic";

export default async function BlogsAdminPage() {
  const [posts, categories, tags] = await Promise.all([
    prisma.blogPost.findMany({
      orderBy: [{ updatedAt: "desc" }],
      include: { category: true, tags: { include: { tag: true } } },
      take: 200,
    }),
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
    prisma.blogTag.findMany({ orderBy: { name: "asc" } }),
  ]);
  return (
    <div>
      <h1>Blog</h1>
      <p>Posts, categories, and tags. Public blog still uses static data until content migration.</p>
      <BlogsAdmin
        posts={JSON.parse(JSON.stringify(posts))}
        categories={JSON.parse(JSON.stringify(categories))}
        tags={JSON.parse(JSON.stringify(tags))}
      />
    </div>
  );
}
