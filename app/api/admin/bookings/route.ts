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

/** CEO desk — manually post a phone / walk-in enquiry into the inbox. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.phone || !body?.startDate || !body?.endDate) {
    return NextResponse.json(
      { error: "Guest name, phone, start date and end date are required" },
      { status: 400 }
    );
  }

  const phone = String(body.phone).replace(/\D/g, "").slice(0, 15);
  if (phone.length < 10) {
    return NextResponse.json({ error: "Enter a valid phone number" }, { status: 400 });
  }

  const vehicleSlug = String(body.vehicleSlug || "").trim();
  const vehicleName = String(body.vehicleName || "").trim();
  const note = String(body.message || "").trim();
  const city = String(body.city || "Dehradun").trim() || "Dehradun";
  const status = ["new", "confirmed", "done", "cancelled"].includes(String(body.status))
    ? String(body.status)
    : "new";

  const message = [
    `City: ${city}`,
    "Source: CEO desk (manual enquiry)",
    note,
  ]
    .filter(Boolean)
    .join("\n");

  const row = await prisma.booking.create({
    data: {
      name: String(body.name).trim().slice(0, 120),
      phone,
      email: String(body.email || "").trim().slice(0, 180),
      vehicleSlug,
      vehicleName,
      startDate: String(body.startDate),
      endDate: String(body.endDate),
      message,
      status,
      sourceSlug: "ceo-desk",
      pageType: "ceo_manual",
    },
  });

  return NextResponse.json({ ok: true, booking: row });
}
