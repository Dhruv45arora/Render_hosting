import { NextResponse } from "next/server";
import { SEED_VEHICLES } from "@/data/vehicles";
import { getAllVehicles } from "@/lib/queries";

export const dynamic = "force-dynamic";

function score(q: string, name: string, model: string, category: string, slug: string) {
  const hay = `${name} ${model} ${category} ${slug}`.toLowerCase();
  if (hay.includes(q)) return 2;
  const parts = q.split(/\s+/).filter(Boolean);
  if (parts.every((p) => hay.includes(p))) return 1;
  return 0;
}

export async function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get("q") || "").trim().toLowerCase();
  if (q.length < 1) return NextResponse.json({ results: [] });

  const db = await getAllVehicles();
  const rows =
    db.length > 0
      ? db.map((v) => ({
          slug: v.slug,
          name: v.name,
          model: v.model,
          category: v.category,
          pricePerDay: v.pricePerDay,
          image: v.image,
        }))
      : SEED_VEHICLES.map((v) => ({
          slug: v.slug,
          name: v.name,
          model: v.model,
          category: v.category,
          pricePerDay: v.pricePerDay,
          image: v.image,
        }));

  const results = rows
    .map((v) => ({ ...v, s: score(q, v.name, v.model, v.category, v.slug) }))
    .filter((v) => v.s > 0)
    .sort((a, b) => b.s - a.s || a.pricePerDay - b.pricePerDay)
    .slice(0, 12)
    .map(({ s: _s, ...rest }) => rest);

  return NextResponse.json({ results });
}
