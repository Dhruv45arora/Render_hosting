import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { asBool, asInt, asString } from "@/lib/admin/helpers";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locationId = searchParams.get("locationId");
  const vehicleId = searchParams.get("vehicleId");
  const rows = await prisma.vehicleLocation.findMany({
    where: {
      ...(locationId ? { locationId: asInt(locationId) } : {}),
      ...(vehicleId ? { vehicleId: asInt(vehicleId) } : {}),
    },
    include: {
      vehicle: { select: { id: true, name: true, slug: true, category: true, status: true } },
      location: { select: { id: true, name: true, slug: true, serviceMode: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  const vehicleId = asInt(body.vehicleId);
  const locationId = asInt(body.locationId);
  if (!vehicleId || !locationId) {
    return NextResponse.json({ error: "Vehicle and location are required" }, { status: 400 });
  }
  try {
    const row = await prisma.vehicleLocation.upsert({
      where: { vehicleId_locationId: { vehicleId, locationId } },
      create: {
        vehicleId,
        locationId,
        available: asBool(body.available, true),
        pricePerDay: body.pricePerDay === "" || body.pricePerDay == null ? null : asInt(body.pricePerDay),
        pricePerHour: body.pricePerHour === "" || body.pricePerHour == null ? null : asInt(body.pricePerHour),
        pricePerKm: body.pricePerKm === "" || body.pricePerKm == null ? null : asInt(body.pricePerKm),
        deposit: body.deposit === "" || body.deposit == null ? null : asInt(body.deposit),
        pickupAvailable: asBool(body.pickupAvailable, true),
        deliveryAvailable: asBool(body.deliveryAvailable, false),
        withDriver: asBool(body.withDriver, true),
        selfDrive: asBool(body.selfDrive, true),
        minimumRentalDuration: asString(body.minimumRentalDuration),
        localNotes: asString(body.localNotes),
        active: asBool(body.active, true),
        seoEligible: asBool(body.seoEligible, false),
      },
      update: {
        available: asBool(body.available, true),
        pricePerDay: body.pricePerDay === "" || body.pricePerDay == null ? null : asInt(body.pricePerDay),
        pricePerHour: body.pricePerHour === "" || body.pricePerHour == null ? null : asInt(body.pricePerHour),
        pricePerKm: body.pricePerKm === "" || body.pricePerKm == null ? null : asInt(body.pricePerKm),
        deposit: body.deposit === "" || body.deposit == null ? null : asInt(body.deposit),
        pickupAvailable: asBool(body.pickupAvailable, true),
        deliveryAvailable: asBool(body.deliveryAvailable, false),
        withDriver: asBool(body.withDriver, true),
        selfDrive: asBool(body.selfDrive, true),
        minimumRentalDuration: asString(body.minimumRentalDuration),
        localNotes: asString(body.localNotes),
        active: asBool(body.active, true),
        seoEligible: asBool(body.seoEligible, false),
      },
      include: {
        vehicle: { select: { id: true, name: true, slug: true } },
        location: { select: { id: true, name: true, slug: true } },
      },
    });
    return NextResponse.json(row);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not save assignment";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const id = asInt(new URL(req.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const row = await prisma.vehicleLocation.update({
    where: { id },
    data: { active: false, available: false, seoEligible: false },
  });
  return NextResponse.json({ ok: true, link: row });
}
