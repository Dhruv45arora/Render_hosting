import type { Metadata } from "next";
import Link from "next/link";
import VehicleCard from "@/components/VehicleCard";
import { getFeaturedVehicles } from "@/lib/queries";
import { getSettings } from "@/lib/settings";
import { CATEGORY_HUBS, phoneHref, SITE_URL, whatsappHref } from "@/lib/constants";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Arora Cars | Car, Bike & Scooty Rental in Dehradun",
  description:
    "Car rental in Dehradun — self drive and chauffeur cars, Activa/scooty, bikes, SUVs and Tempo Traveller. Mussoorie, Rishikesh, Haridwar, Char Dham. Call 8445619130.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: "Arora Cars | Vehicle Rental in Dehradun",
    description:
      "Self drive and chauffeur cars, bikes, scooty, SUVs and Tempo Traveller from Clock Tower, Dehradun.",
    url: SITE_URL,
  },
};

const ROUTES = [
  { code: "MSR", name: "Mussoorie", km: "34", time: "1h 15m", path: "/car-rental-dehradun-to-mussoorie" },
  { code: "RSK", name: "Rishikesh", km: "43", time: "1h 05m", path: "/car-rental-dehradun-to-rishikesh" },
  { code: "HDW", name: "Haridwar", km: "52", time: "1h 20m", path: "/car-rental-dehradun-to-haridwar" },
  { code: "CHD", name: "Char Dham", km: "210+", time: "Multi-day", path: "/car-rental-char-dham-yatra" },
];

export default async function HomePage() {
  const [vehicles, settings] = await Promise.all([getFeaturedVehicles(8), getSettings()]);
  const wa = whatsappHref(settings.whatsapp, "Hi Arora Cars, I want to book a vehicle in Dehradun.");

  return (
    <main>
      <section className="rd-hero" id="top">
        <div className="rd-hero-inner container">
          <div>
            <div className="rd-eyebrow">DEHRADUN · UTTARAKHAND</div>
            <h1 className="rd-hero-title">
              ARORA
              <br />
              CARS
            </h1>
            <p className="rd-hero-sub">
              Car, bike and scooty rental from Dehradun — self drive or with driver — for Mussoorie,
              Rishikesh, Haridwar and Char Dham. A desk that answers the phone.
            </p>
            <div className="rd-hero-actions">
              <a className="rd-btn-signal" href={phoneHref(settings.phone)}>
                Book Now — Call
              </a>
              <a className="rd-btn-outline" href={wa} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <Link className="rd-btn-outline" href="/car-rental-dehradun">
                Car rental hub
              </Link>
            </div>
          </div>
          <div className="rd-board">
            <div className="rd-board-head">
              <span>NEXT DEPARTURES</span>
              <span style={{ color: "#7ee787" }}>● LIVE</span>
            </div>
            {ROUTES.map((r) => (
              <Link className="rd-board-row" href={r.path} key={r.code}>
                <span className="rd-board-code">{r.code}</span>
                <span>{r.name}</span>
                <span className="rd-board-km">{r.km} KM</span>
                <span className="rd-board-time">{r.time}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ac-section">
        <div className="ac-section-head">
          <span className="ac-section-badge">01 — WHAT WE RENT</span>
          <h2>Vehicle rental from Dehradun</h2>
          <p className="ac-section-sub">
            Open a hub for the service you need — then book a live vehicle. One primary page per
            intent, not ten clones of the same keyword.
          </p>
        </div>
        <div className="ac-grid cols-4 container">
          {CATEGORY_HUBS.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`} className="ac-card">
              <h3>{c.label}</h3>
              <p>Browse {c.label.toLowerCase()} options and book from the live fleet.</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="ac-section alt">
        <div className="ac-section-head">
          <span className="ac-section-badge">02 — FEATURED FLEET</span>
          <h2>Available to book</h2>
        </div>
        <div className="ac-grid cols-4 container">
          {vehicles.map((v) => (
            <VehicleCard key={v.slug} vehicle={v} whatsapp={settings.whatsapp} />
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/car-fleet-dehradun" className="ac-btn-primary">
            See full fleet
          </Link>
          <Link href="/car-rental-pricing-dehradun" className="ac-btn-secondary" style={{ color: "var(--pine)", borderColor: "var(--pine)" }}>
            Pricing guide
          </Link>
        </p>
      </section>

      <section className="ac-section">
        <div className="ac-section-head">
          <span className="ac-section-badge">03 — PICKUP & GUIDES</span>
          <h2>Airport, station and trip notes</h2>
        </div>
        <div className="ac-grid cols-3 container">
          <Link href="/jolly-grant-airport-car-rental" className="ac-card">
            <h3>Jolly Grant Airport</h3>
            <p>Chauffeur pickup from DED to city, Mussoorie or Rishikesh.</p>
          </Link>
          <Link href="/car-rental-near-dehradun-railway-station" className="ac-card">
            <h3>Railway station</h3>
            <p>Car or Activa at the Dehradun railway exit when arranged.</p>
          </Link>
          <Link href="/car-rental-near-isbt-dehradun" className="ac-card">
            <h3>ISBT Dehradun</h3>
            <p>Car or Innova pickup after your Volvo or hill bus — pin on WhatsApp.</p>
          </Link>
          <Link href="/blog" className="ac-card">
            <h3>Travel & rental guides</h3>
            <p>Documents, Mussoorie tips, Char Dham vehicles and more.</p>
          </Link>
          <Link href="/chauffeur-driven-car-rental-dehradun" className="ac-card">
            <h3>With driver</h3>
            <p>Outstation and local chauffeur cars from Dehradun.</p>
          </Link>
          <Link href="/self-drive-car-rental-dehradun" className="ac-card">
            <h3>Self drive</h3>
            <p>Documents, deposit and hill-ready cars explained.</p>
          </Link>
          <Link href="/how-to-book" className="ac-card">
            <h3>How to book</h3>
            <p>Call, WhatsApp or form — same desk, same number.</p>
          </Link>
        </div>
      </section>

      <section className="rd-section rd-section-dark">
        <div className="container">
          <span className="rd-tag rd-tag-light">04 — TRUST</span>
          <h2>A desk that answers the phone</h2>
          <div className="trust" style={{ marginTop: 28 }}>
            <span>{settings.fleetCount} vehicles listed</span>
            <span>{settings.yearsInBusiness}+ years on the hill roads</span>
            <span>Clock Tower, Dehradun</span>
            <span>24/7 airport & station pickup</span>
            <span>No fabricated star ratings</span>
          </div>
        </div>
      </section>
    </main>
  );
}
