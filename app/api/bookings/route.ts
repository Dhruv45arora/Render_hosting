import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.phone || !body?.startDate || !body?.endDate) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const row = await prisma.booking.create({
    data: {
      name: String(body.name),
      phone: String(body.phone),
      email: String(body.email || ""),
      vehicleSlug: String(body.vehicleSlug || ""),
      vehicleName: String(body.vehicleName || ""),
      startDate: String(body.startDate),
      endDate: String(body.endDate),
      message: String(body.message || ""),
    },
  });
  return NextResponse.json({ ok: true, id: row.id });
}
