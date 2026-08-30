import Link from "next/link";
import VehicleCard from "@/components/VehicleCard";
import { getFeaturedVehicles } from "@/lib/queries";
import { getSettings } from "@/lib/settings";
import { CATEGORY_HUBS, phoneHref, whatsappHref } from "@/lib/constants";

export const revalidate = 60;

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
              DRIVE THE
              <br />
              HILLS
              <br />
              YOURSELF
            </h1>
            <p className="rd-hero-sub">
              Bike, Activa, self-drive cars, chauffeur SUVs, Tempo Travellers and Chota
              Hathi — out of Dehradun for Mussoorie, Rishikesh, Haridwar and Char Dham.
            </p>
            <div className="rd-hero-actions">
              <a className="rd-btn-signal" href={phoneHref(settings.phone)}>
                Book Now — Call
              </a>
              <a className="rd-btn-outline" href={wa} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
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
          <h2>Ten Ways Out of Dehradun</h2>
          <p className="ac-section-sub">
            Category hubs Google can index — not one page trying to rank for everything.
          </p>
        </div>
        <div className="ac-grid cols-4 container">
          {CATEGORY_HUBS.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`} className="ac-card">
              <h3>{c.label}</h3>
              <p>Open the {c.label.toLowerCase()} hub and book from the live fleet.</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="ac-section alt">
        <div className="ac-section-head">
          <span className="ac-section-badge">02 — FEATURED FLEET</span>
          <h2>Available to Book</h2>
        </div>
        <div className="ac-grid cols-4 container">
          {vehicles.map((v) => (
            <VehicleCard key={v.slug} vehicle={v} whatsapp={settings.whatsapp} />
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 28 }}>
          <Link href="/car-fleet-dehradun" className="ac-btn-primary">
            See full fleet
          </Link>
        </p>
      </section>

      <section className="rd-section rd-section-dark">
        <div className="container">
          <span className="rd-tag rd-tag-light">03 — TRUST</span>
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
