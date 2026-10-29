import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.vehicle.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json(rows);
}

function vehicleWriteData(data: Record<string, unknown>) {
  const {
    id: _id,
    seasonalRates: _s,
    locations: _l,
    media: _m,
    seoPages: _p,
    bookings: _b,
    createdAt: _c,
    updatedAt: _u,
    ...rest
  } = data;
  // Block ephemeral upload paths — they 404 on Render and break the public page
  if (typeof rest.image === "string") {
    const img = rest.image;
    if (img.startsWith("/uploads/") || img.startsWith("blob:")) {
      throw new Error(
        "That photo path will not work on the live site. Use Change photo (JPG/PNG) and Save again."
      );
    }
  }
  return rest;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const row = await prisma.vehicle.create({ data: vehicleWriteData(data) as never });
    return NextResponse.json(row);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Create failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, ...rest } = data;
    const row = await prisma.vehicle.update({
      where: { id: Number(id) },
      data: vehicleWriteData(rest) as never,
    });
    return NextResponse.json(row);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

/** Soft-archive only. Hard delete is not allowed for SEO-safe product URLs. */
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const row = await prisma.vehicle.update({
    where: { id },
    data: { status: "ARCHIVED", availability: "unavailable" },
  });
  return NextResponse.json({ ok: true, vehicle: row });
}
