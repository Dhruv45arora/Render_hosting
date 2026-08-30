import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const rows = await prisma.vehicle.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const data = await req.json();
  const row = await prisma.vehicle.create({ data });
  return NextResponse.json(row);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...rest } = data;
  const row = await prisma.vehicle.update({ where: { id: Number(id) }, data: rest });
  return NextResponse.json(row);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  await prisma.vehicle.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
