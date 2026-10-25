import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const city = String(body?.city || "").trim();
  if (!body?.name || !body?.phone || !body?.startDate || !body?.endDate || !city) {
    return NextResponse.json({ error: "Name, phone, dates, and rental city are required" }, { status: 400 });
  }
  const dehradunFleet = city.toLowerCase() === "dehradun" && body.vehicleSlug;
  const pickup = String(body.pickup || "").trim();
  const note = String(body.message || "").trim();
  const sourceSlug = String(body.sourceSlug || "")
    .trim()
    .replace(/^\/+/, "")
    .slice(0, 180) || null;
  const pageType = String(body.pageType || body.intent || "")
    .trim()
    .slice(0, 80) || null;
  const message = [
    `City: ${city}`,
    pickup ? `Pickup: ${pickup}` : "",
    sourceSlug ? `Source: /${sourceSlug}` : "",
    pageType ? `Intent: ${pageType}` : "",
    dehradunFleet
      ? "Dehradun fleet request for the vehicle named on the form."
      : "Partner quote. Do not assign a Dehradun vehicle.",
    note,
  ]
    .filter(Boolean)
    .join("\n");
  const row = await prisma.booking.create({
    data: {
      name: String(body.name),
      phone: String(body.phone),
      email: String(body.email || ""),
      vehicleSlug: dehradunFleet ? String(body.vehicleSlug) : "",
      vehicleName: dehradunFleet ? String(body.vehicleName || "") : "",
      startDate: String(body.startDate),
      endDate: String(body.endDate),
      message,
      sourceSlug,
      pageType,
      locationSlug: sourceSlug,
    },
  });
  return NextResponse.json({ ok: true, id: row.id, sourceSlug });
}
