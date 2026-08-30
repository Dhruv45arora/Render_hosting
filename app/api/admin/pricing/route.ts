import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  const row = await prisma.seasonalPrice.create({
    data: {
      vehicleId: Number(data.vehicleId),
      label: String(data.label),
      startDate: String(data.startDate),
      endDate: String(data.endDate),
      pricePerDay: Number(data.pricePerDay),
    },
  });
  return NextResponse.json(row);
}

export async function DELETE(req: Request) {
  const id = Number(new URL(req.url).searchParams.get("id"));
  await prisma.seasonalPrice.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
