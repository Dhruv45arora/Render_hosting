import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { asBool, asFloat, asInt, asJsonString, asString, slugify } from "@/lib/admin/helpers";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  const rows = await prisma.location.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { slug: { contains: q, mode: "insensitive" } },
            { state: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: [{ seoPriority: "desc" }, { name: "asc" }],
    include: {
      _count: { select: { vehicleLinks: true, services: true, seoPages: true } },
    },
  });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  const name = asString(body.name).trim();
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  const slug = asString(body.slug).trim() || slugify(name);
  try {
    const row = await prisma.location.create({
      data: {
        name,
        slug,
        district: asString(body.district),
        state: asString(body.state),
        region: asString(body.region),
        description: asString(body.description),
        localIntro: asString(body.localIntro),
        serviceMode: asString(body.serviceMode, "PARTNER"),
        active: asBool(body.active, true),
        seoPriority: asInt(body.seoPriority, 0),
        latitude: asFloat(body.latitude),
        longitude: asFloat(body.longitude),
        pickupPoints: asJsonString(body.pickupPoints, "[]"),
        landmarks: asJsonString(body.landmarks, "[]"),
        nearbyLocations: asJsonString(body.nearbyLocations, "[]"),
        railwayInfo: asString(body.railwayInfo),
        airportInfo: asString(body.airportInfo),
        busStationInfo: asString(body.busStationInfo),
        localRentalNotes: asString(body.localRentalNotes),
        localFaqs: asJsonString(body.localFaqs, "[]"),
      },
    });
    return NextResponse.json(row);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not create location";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  try {
    const row = await prisma.location.update({
      where: { id: asInt(body.id) },
      data: {
        name: asString(body.name),
        slug: asString(body.slug) || undefined,
        district: asString(body.district),
        state: asString(body.state),
        region: asString(body.region),
        description: asString(body.description),
        localIntro: asString(body.localIntro),
        serviceMode: asString(body.serviceMode, "PARTNER"),
        active: asBool(body.active, true),
        seoPriority: asInt(body.seoPriority, 0),
        latitude: asFloat(body.latitude),
        longitude: asFloat(body.longitude),
        pickupPoints: asJsonString(body.pickupPoints, "[]"),
        landmarks: asJsonString(body.landmarks, "[]"),
        nearbyLocations: asJsonString(body.nearbyLocations, "[]"),
        railwayInfo: asString(body.railwayInfo),
        airportInfo: asString(body.airportInfo),
        busStationInfo: asString(body.busStationInfo),
        localRentalNotes: asString(body.localRentalNotes),
        localFaqs: asJsonString(body.localFaqs, "[]"),
      },
    });
    return NextResponse.json(row);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not update location";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const id = asInt(new URL(req.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const row = await prisma.location.update({
    where: { id },
    data: { active: false, serviceMode: "UNAVAILABLE" },
  });
  return NextResponse.json({ ok: true, location: row });
}
