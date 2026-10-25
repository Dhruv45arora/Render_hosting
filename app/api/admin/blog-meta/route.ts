import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { asString, slugify } from "@/lib/admin/helpers";

export const dynamic = "force-dynamic";

/** GET categories + tags. POST create category or tag: { kind: "category"|"tag", name, slug? } */
export async function GET() {
  const [categories, tags] = await Promise.all([
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
    prisma.blogTag.findMany({ orderBy: { name: "asc" } }),
  ]);
  return NextResponse.json({ categories, tags });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  const name = asString(body.name).trim();
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  const slug = asString(body.slug).trim() || slugify(name);
  const kind = asString(body.kind, "category");
  try {
    if (kind === "tag") {
      const row = await prisma.blogTag.create({ data: { name, slug } });
      return NextResponse.json(row);
    }
    const row = await prisma.blogCategory.create({ data: { name, slug } });
    return NextResponse.json(row);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not create";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
