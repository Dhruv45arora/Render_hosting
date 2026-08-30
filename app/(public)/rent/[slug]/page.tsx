import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SEED_VEHICLES } from "@/data/vehicles";
import { getAllVehicles, getVehicleBySlug, effectivePrice } from "@/lib/queries";
import { getSettings } from "@/lib/settings";
import { breadcrumbSchema, productOfferSchema } from "@/lib/schema-org";
import { CATEGORY_LABELS, formatInr, phoneHref, SITE_URL, whatsappHref } from "@/lib/constants";
import BookingForm from "@/components/BookingForm";
import JsonLd from "@/components/JsonLd";
import VehicleCard from "@/components/VehicleCard";

export const revalidate = 60;

export async function generateStaticParams() {
  const rows = await getAllVehicles();
  const slugs = rows.length ? rows.map((v) => v.slug) : SEED_VEHICLES.map((v) => v.slug);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const v = await getVehicleBySlug(params.slug);
  if (!v) return {};
  const title = `Rent ${v.name} in Dehradun | ${formatInr(v.pricePerDay)}/day | Arora Cars`;
  const description = v.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/rent/${v.slug}` },
    openGraph: { title, description, images: [v.image] },
  };
}

export default async function VehiclePage({ params }: { params: { slug: string } }) {
  const vehicle = await getVehicleBySlug(params.slug);
  if (!vehicle) notFound();
  const settings = await getSettings();
  const price = effectivePrice(vehicle);
  const related = (await getAllVehicles())
    .filter((x) => x.category === vehicle.category && x.slug !== vehicle.slug)
    .slice(0, 4);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: CATEGORY_LABELS[vehicle.category] || "Fleet", path: "/car-fleet-dehradun" },
    { name: vehicle.name, path: `/rent/${vehicle.slug}` },
  ];

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          productOfferSchema({
            name: vehicle.name,
            description: vehicle.description,
            image: vehicle.image,
            slug: vehicle.slug,
            pricePerDay: price,
            availability: vehicle.availability,
          }),
        ]}
      />
      <nav className="ac-bc container">
        <Link href="/">Home</Link>
        <span className="ac-bc-sep">/</span>
        <Link href="/car-fleet-dehradun">Fleet</Link>
        <span className="ac-bc-sep">/</span>
        <span>{vehicle.name}</span>
      </nav>

      <section className="ac-section">
        <div className="container pp">
          <div>
            <div className="pp-gallery">
              <img
                src={vehicle.image}
                alt={`${vehicle.name} on rent in Dehradun - AroraCars`}
                width={960}
                height={600}
              />
            </div>
            <p className="ai-note">Temporary category photo — replace with a real fleet shot in Admin.</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 36, margin: "22px 0 10px" }}>
              {vehicle.name} on rent in Dehradun
            </h1>
            <p>{vehicle.description}</p>
            <h2>Rental terms</h2>
            <p>
              <strong>Fuel:</strong> {vehicle.fuelPolicy}
            </p>
            <p>
              <strong>Km limit:</strong> {vehicle.kmLimit}
            </p>
            <p>
              <strong>Deposit:</strong> {formatInr(vehicle.deposit)} (refundable after inspection)
            </p>
          </div>
          <aside className="pp-pricebox">
            <div className="big">{formatInr(price)}</div>
            <div>/day onward</div>
            {vehicle.pricePerKm > 0 && <p>Extra: {formatInr(vehicle.pricePerKm)}/km</p>}
            {vehicle.pricePerHour > 0 && <p>Hourly: {formatInr(vehicle.pricePerHour)}</p>}
            <div className="pp-meta">
              <div>
                <strong>Seats</strong>
                {vehicle.seats}
              </div>
              <div>
                <strong>Fuel</strong>
                {vehicle.fuel}
              </div>
              <div>
                <strong>Gearbox</strong>
                {vehicle.transmission}
              </div>
              <div>
                <strong>Mileage</strong>
                {vehicle.mileage}
              </div>
              <div>
                <strong>Drive</strong>
                {vehicle.driveType.replace("_", " ")}
              </div>
              <div>
                <strong>Status</strong>
                {vehicle.availability}
              </div>
            </div>
            <div className="ac-hero-actions" style={{ justifyContent: "stretch", marginBottom: 16 }}>
              <a className="ac-btn-primary" href={phoneHref(settings.phone)}>
                Call
              </a>
              <a
                className="ac-btn-secondary ac-btn-wa"
                href={whatsappHref(settings.whatsapp, `Hi Arora Cars, I want to book ${vehicle.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <BookingForm
              vehicleSlug={vehicle.slug}
              vehicleName={vehicle.name}
              whatsapp={settings.whatsapp}
            />
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="ac-section alt">
          <div className="ac-section-head">
            <h2>Similar vehicles</h2>
          </div>
          <div className="ac-grid cols-4 container">
            {related.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} whatsapp={settings.whatsapp} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
