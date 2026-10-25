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
  return rest;
}

export async function POST(req: Request) {
  const data = await req.json();
  const row = await prisma.vehicle.create({ data: vehicleWriteData(data) as never });
  return NextResponse.json(row);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...rest } = data;
  const row = await prisma.vehicle.update({
    where: { id: Number(id) },
    data: vehicleWriteData(rest) as never,
  });
  return NextResponse.json(row);
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
