import { LOCATION_BY_ID } from "./locations";
import type { PageCandidate } from "./types";

const MAX_RELATED = 8;

/**
 * Relevance-based related slug hints (not hundreds of dump links).
 * Actual resolveRelatedLinks still runs at render time against published pages.
 */
export function relatedHintsFor(page: PageCandidate, all: PageCandidate[]): string[] {
  const scores = new Map<string, number>();

  const bump = (slug: string, score: number) => {
    if (slug === page.slug) return;
    scores.set(slug, (scores.get(slug) || 0) + score);
  };

  for (const other of all) {
    if (other.slug === page.slug) continue;

    // Same location cluster
    if (page.locationId && other.locationId === page.locationId) bump(other.slug, 5);
    // Nearby locations
    if (page.locationId) {
      const loc = LOCATION_BY_ID.get(page.locationId);
      if (loc?.nearbyIds.includes(other.locationId || "")) bump(other.slug, 4);
      if (other.locationId) {
        const o = LOCATION_BY_ID.get(other.locationId);
        if (loc && o && loc.region === o.region && loc.region !== "external") bump(other.slug, 2);
        if (loc && o && loc.district === o.district) bump(other.slug, 2);
      }
    }

    // Route relationships
    if (page.originId && page.destinationId) {
      if (other.locationId === page.originId || other.locationId === page.destinationId) bump(other.slug, 5);
      if (other.originId === page.destinationId && other.destinationId === page.originId) bump(other.slug, 6);
      if (other.originId === page.originId) bump(other.slug, 3);
      if (other.destinationId === page.destinationId) bump(other.slug, 3);
    }

    // Same service family
    if (page.serviceId && other.serviceId === page.serviceId) bump(other.slug, 2);
    if (page.intent === other.intent) bump(other.slug, 1);

    // Complementary rentals next to taxi
    if (page.intent === "location_service" && page.serviceId === "taxi_service") {
      if (
        other.locationId === page.locationId &&
        (other.serviceId === "bike_rental" || other.serviceId === "scooty_rental" || other.serviceId === "car_rental")
      ) {
        bump(other.slug, 4);
      }
    }
  }

  // Always hint hub
  bump("taxi", 1);

  return Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_RELATED)
    .map(([slug]) => slug);
}

export function breadcrumbHints(page: PageCandidate): Array<{ name: string; slug?: string }> {
  const crumbs: Array<{ name: string; slug?: string }> = [{ name: "Home", slug: "" }];
  if (page.serviceId?.includes("taxi") || page.intent.includes("taxi") || page.intent === "sightseeing" || page.intent === "pilgrimage" || page.intent === "route_taxi" || page.intent === "airport_destination" || page.intent === "railway_destination") {
    crumbs.push({ name: "Taxi", slug: "taxi" });
  } else if (page.serviceId === "bike_rental" || page.intent === "location_specific_vehicle") {
    crumbs.push({ name: "Rentals", slug: "car-rental-dehradun" });
  } else if (page.serviceId === "car_rental" || page.serviceId === "self_drive_car") {
    crumbs.push({ name: "Car rental", slug: "car-rental-dehradun" });
  }

  if (page.locationId) {
    const loc = LOCATION_BY_ID.get(page.locationId);
    if (loc) crumbs.push({ name: loc.name });
  } else if (page.originId && page.destinationId) {
    const o = LOCATION_BY_ID.get(page.originId);
    const d = LOCATION_BY_ID.get(page.destinationId);
    if (o) crumbs.push({ name: o.name });
    if (d) crumbs.push({ name: `${o?.name || ""} to ${d.name}`.trim() });
  }
  return crumbs;
}
