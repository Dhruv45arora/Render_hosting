import Link from "next/link";
import { CATEGORY_LABELS, formatInr, whatsappHref } from "@/lib/constants";
import { vehicleImageAlt } from "@/data/vehicle-images";

export type CardVehicle = {
  slug: string;
  name: string;
  category: string;
  pricePerDay: number;
  pricePerKm?: number;
  seats: number;
  fuel: string;
  transmission: string;
  availability: string;
  image: string;
};

export default function VehicleCard({
  vehicle,
  whatsapp,
}: {
  vehicle: CardVehicle;
  whatsapp: string;
}) {
  const available = vehicle.availability === "available";
  const wa = whatsappHref(
    whatsapp,
    `Hi Arora Cars, I want to book ${vehicle.name} in Dehradun.`
  );

  return (
    <article className="vc">
      <Link href={`/rent/${vehicle.slug}`} className="vc-imgwrap">
        <img
          src={vehicle.image}
          alt={vehicleImageAlt({ name: vehicle.name, category: vehicle.category })}
          loading="lazy"
          width={640}
          height={400}
        />
        <span className="vc-badge">{CATEGORY_LABELS[vehicle.category] || vehicle.category}</span>
        <span className={`vc-avail ${available ? "ok" : "no"}`}>
          {available ? "Available" : vehicle.availability === "maintenance" ? "Maintenance" : "Booked"}
        </span>
      </Link>
      <div className="vc-body">
        <Link href={`/rent/${vehicle.slug}`}>
          <h3 className="vc-name">{vehicle.name}</h3>
        </Link>
        <div className="vc-price">
          {formatInr(vehicle.pricePerDay)}
          <span>/day{vehicle.pricePerKm ? ` · ${formatInr(vehicle.pricePerKm)}/km` : ""}</span>
        </div>
        <div className="vc-specs">
          <span>{vehicle.seats} seats</span>
          <span>{vehicle.fuel}</span>
          <span>{vehicle.transmission}</span>
        </div>
        <div className="vc-ctas">
          <Link className="vc-book" href={`/rent/${vehicle.slug}#book`}>
            Book Now
          </Link>
          <a className="vc-wa" href={wa} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
