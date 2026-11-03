import type { Metadata } from "next";
import Link from "next/link";
import VehicleCard from "@/components/VehicleCard";
import VehicleSearch from "@/components/VehicleSearch";
import { SEED_VEHICLES } from "@/data/vehicles";
import { SITE_URL, phoneHref, whatsappHref } from "@/lib/constants";
import { getAllVehicles } from "@/lib/queries";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search vehicles | Arora Cars Dehradun",
  description: "Search cars, bikes, scooty, autos and Tempo Traveller on rent in Dehradun.",
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}/search` },
};

function match(q: string, name: string, model: string, category: string, slug: string) {
  const hay = `${name} ${model} ${category} ${slug}`.toLowerCase();
  const parts = q.toLowerCase().split(/\s+/).filter(Boolean);
  return parts.length ? parts.every((p) => hay.includes(p)) : false;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams.q || "").trim();
  const [db, settings] = await Promise.all([getAllVehicles(), getSettings()]);
  const pool = db.length ? db : SEED_VEHICLES;
  const vehicles = q
    ? pool.filter((v) => match(q, v.name, v.model, v.category, v.slug)).slice(0, 24)
    : [];
  const wa = whatsappHref(
    settings.whatsapp,
    q
      ? `Hi Arora Cars, I searched for “${q}” and want a quote from Dehradun.`
      : "Hi Arora Cars, I want to book a vehicle in Dehradun."
  );

  return (
    <main>
      <section className="ac-hero">
        <div className="ac-hero-inner">
          <span className="ac-hero-badge">FLEET SEARCH</span>
          <h1>Find a vehicle</h1>
          <p>Type a model or category — Activa, Innova, Bullet, Auto, Chota Hathi, Tempo…</p>
          <VehicleSearch variant="page" />
        </div>
      </section>

      <section className="ac-section">
        <div className="container">
          {q ? (
            <>
              <h2 style={{ marginBottom: 8 }}>
                {vehicles.length} result{vehicles.length === 1 ? "" : "s"} for “{q}”
              </h2>
              <p className="ac-section-sub" style={{ marginBottom: 24 }}>
                Need help choosing? Call or WhatsApp the Dehradun desk — same number for Uttarakhand
                trips.
              </p>
            </>
          ) : (
            <p className="ac-section-sub">Enter a search above to browse the live fleet.</p>
          )}

          {q && vehicles.length === 0 && (
            <div className="ac-card" style={{ maxWidth: 560, margin: "0 auto" }}>
              <h3>No exact match</h3>
              <p>
                Tell us what you need on WhatsApp — car with driver, scooty near Clock Tower, Mussoorie
                bike day, or taxi across Uttarakhand.
              </p>
              <p style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                <a className="ac-btn-primary" href={phoneHref(settings.phone)}>
                  Call now
                </a>
                <a className="ac-btn-wa" href={wa} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
                <Link className="ac-btn-secondary" href="/car-fleet-dehradun" style={{ color: "var(--pine)", borderColor: "var(--pine)" }}>
                  Full fleet
                </Link>
              </p>
            </div>
          )}

          {vehicles.length > 0 && (
            <div className="ac-grid cols-4">
              {vehicles.map((v) => (
                <VehicleCard key={v.slug} vehicle={v} whatsapp={settings.whatsapp} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
