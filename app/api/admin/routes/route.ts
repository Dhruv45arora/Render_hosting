import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { asBool, asFloat, asInt, asJsonString, asString, slugify } from "@/lib/admin/helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.route.findMany({
    orderBy: [{ seoPriority: "desc" }, { slug: "asc" }],
    include: {
      origin: { select: { id: true, name: true, slug: true } },
      destination: { select: { id: true, name: true, slug: true } },
    },
  });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  const originId = asInt(body.originId);
  const destinationId = asInt(body.destinationId);
  if (!originId || !destinationId) {
    return NextResponse.json({ error: "Origin and destination are required" }, { status: 400 });
  }
  if (originId === destinationId) {
    return NextResponse.json({ error: "Origin and destination must differ" }, { status: 400 });
  }
  const [origin, destination] = await Promise.all([
    prisma.location.findUnique({ where: { id: originId } }),
    prisma.location.findUnique({ where: { id: destinationId } }),
  ]);
  if (!origin || !destination) {
    return NextResponse.json({ error: "Origin or destination not found" }, { status: 400 });
  }
  const slug =
    asString(body.slug).trim() ||
    slugify(`car-rental-${origin.slug}-to-${destination.slug}`);
  try {
    const row = await prisma.route.create({
      data: {
        originId,
        destinationId,
        slug,
        routeType: asString(body.routeType, "OUTSTATION"),
        distanceKm: asFloat(body.distanceKm),
        travelTimeMinutes: body.travelTimeMinutes === "" || body.travelTimeMinutes == null ? null : asInt(body.travelTimeMinutes),
        description: asString(body.description),
        oneWayNotes: asString(body.oneWayNotes),
        roundTripNotes: asString(body.roundTripNotes),
        priceFrom: body.priceFrom === "" || body.priceFrom == null ? null : asInt(body.priceFrom),
        pickupInfo: asString(body.pickupInfo),
        faqs: asJsonString(body.faqs, "[]"),
        active: asBool(body.active, true),
        indexable: asBool(body.indexable, false),
        seoPriority: asInt(body.seoPriority, 0),
      },
      include: {
        origin: { select: { id: true, name: true, slug: true } },
        destination: { select: { id: true, name: true, slug: true } },
      },
    });
    return NextResponse.json(row);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not create route";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  try {
    const row = await prisma.route.update({
      where: { id: asInt(body.id) },
      data: {
        originId: body.originId != null ? asInt(body.originId) : undefined,
        destinationId: body.destinationId != null ? asInt(body.destinationId) : undefined,
        slug: asString(body.slug) || undefined,
        routeType: asString(body.routeType, "OUTSTATION"),
        distanceKm: asFloat(body.distanceKm),
        travelTimeMinutes:
          body.travelTimeMinutes === "" || body.travelTimeMinutes == null ? null : asInt(body.travelTimeMinutes),
        description: asString(body.description),
        oneWayNotes: asString(body.oneWayNotes),
        roundTripNotes: asString(body.roundTripNotes),
        priceFrom: body.priceFrom === "" || body.priceFrom == null ? null : asInt(body.priceFrom),
        pickupInfo: asString(body.pickupInfo),
        faqs: asJsonString(body.faqs, "[]"),
        active: asBool(body.active, true),
        indexable: asBool(body.indexable, false),
        seoPriority: asInt(body.seoPriority, 0),
      },
      include: {
        origin: { select: { id: true, name: true, slug: true } },
        destination: { select: { id: true, name: true, slug: true } },
      },
    });
    return NextResponse.json(row);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not update route";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const id = asInt(new URL(req.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const row = await prisma.route.update({
    where: { id },
    data: { active: false, indexable: false },
  });
  return NextResponse.json({ ok: true, route: row });
}
