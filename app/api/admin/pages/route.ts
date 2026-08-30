import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.pageOverride.findMany();
  return NextResponse.json(rows);
}

export async function PUT(req: Request) {
  const { slug, heroText, pricingBlurb } = await req.json();
  const row = await prisma.pageOverride.upsert({
    where: { slug },
    update: { heroText: heroText || "", pricingBlurb: pricingBlurb || "" },
    create: { slug, heroText: heroText || "", pricingBlurb: pricingBlurb || "" },
  });
  return NextResponse.json(row);
}
