import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(rows);
}

export async function PUT(req: Request) {
  const { id, status } = await req.json();
  const row = await prisma.booking.update({ where: { id: Number(id) }, data: { status } });
  return NextResponse.json(row);
}
