import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { asBool, asInt, asJsonString, asString, slugify } from "@/lib/admin/helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.service.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { locations: true, seoPages: true } } },
  });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  const name = asString(body.name).trim();
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  try {
    const row = await prisma.service.create({
      data: {
        name,
        slug: asString(body.slug).trim() || slugify(name),
        description: asString(body.description),
        image: asString(body.image),
        icon: asString(body.icon),
        seoDefaults: asJsonString(body.seoDefaults, "{}"),
        vehicleCategories: asJsonString(body.vehicleCategories, "[]"),
        active: asBool(body.active, true),
        sortOrder: asInt(body.sortOrder, 0),
      },
    });
    return NextResponse.json(row);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not create service";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  try {
    const row = await prisma.service.update({
      where: { id: asInt(body.id) },
      data: {
        name: asString(body.name),
        slug: asString(body.slug) || undefined,
        description: asString(body.description),
        image: asString(body.image),
        icon: asString(body.icon),
        seoDefaults: asJsonString(body.seoDefaults, "{}"),
        vehicleCategories: asJsonString(body.vehicleCategories, "[]"),
        active: asBool(body.active, true),
        sortOrder: asInt(body.sortOrder, 0),
      },
    });
    return NextResponse.json(row);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not update service";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const id = asInt(new URL(req.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const row = await prisma.service.update({ where: { id }, data: { active: false } });
  return NextResponse.json({ ok: true, service: row });
}
