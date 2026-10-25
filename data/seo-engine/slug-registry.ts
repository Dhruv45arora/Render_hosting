import { BLOG_POSTS } from "../blog";
import { SEED_VEHICLES } from "../vehicles";
import type { PageIntentType } from "./types";

/**
 * Canonical slug registry — every proposed URL must clear locked production slugs + aliases.
 * Avoid importing data/pages.ts here (circular: pages → wave2 → publish → slug-registry).
 */

let _locked: Set<string> | null = null;
let _slugProvider: (() => string[]) | null = null;

/** Register LANDING_PAGES slug provider after pages.ts finishes composing. */
export function registerLandingSlugProvider(fn: () => string[]) {
  _slugProvider = fn;
  _locked = null;
}

export function lockedSlugSet(): Set<string> {
  if (_locked) return _locked;
  const set = new Set<string>();
  if (_slugProvider) {
    for (const s of _slugProvider()) set.add(normalizeSlug(s));
  }
  for (const b of BLOG_POSTS) set.add(normalizeSlug(`blog/${b.slug}`));
  for (const v of SEED_VEHICLES) set.add(normalizeSlug(`rent/${v.slug}`));
  for (const alias of INTENT_ALIAS_SLUGS) set.add(normalizeSlug(alias));
  _locked = set;
  return set;
}

export function normalizeSlug(slug: string): string {
  return slug.replace(/^\/+/, "").replace(/\/+$/, "").toLowerCase();
}

/** Slugs that would cannibalize existing pages if published as separate indexables. */
export const INTENT_ALIAS_SLUGS = [
  "taxi-in-dehradun",
  "taxi-dehradun",
  "cab-service-in-dehradun",
  "dehradun-mussoorie-taxi",
  "dehradun-rishikesh-taxi",
  "dehradun-haridwar-taxi",
  "rishikesh-haridwar-taxi",
  "bike-on-rent-in-dehradun", // prefer existing bike-rental-dehradun
  "scooty-rental-in-dehradun", // prefer existing scooty-on-rent-dehradun
  "car-on-rent-in-dehradun", // prefer car-rental-dehradun
];

/**
 * Intent keys collapse near-duplicate keyword targets to one canonical page.
 * Format examples:
 *  loc_service:taxi_service:rishikesh
 *  route_taxi:dehradun:mussoorie
 *  vehicle:bullet:rishikesh
 */
export function intentKey(parts: {
  intent: PageIntentType;
  locationId?: string;
  originId?: string;
  destinationId?: string;
  serviceId?: string;
  vehicleId?: string;
}): string {
  switch (parts.intent) {
    case "route_taxi":
    case "airport_destination":
    case "railway_destination":
    case "outstation_one_way":
      return `route:${parts.originId}->${parts.destinationId}:taxi`;
    case "sightseeing":
      return `sightseeing:${parts.locationId}`;
    case "pilgrimage":
      return `pilgrimage:${parts.serviceId || "pilgrimage"}:${parts.locationId || "na"}:${parts.originId || "na"}`;
    case "location_specific_vehicle":
      return `vehicle:${parts.vehicleId}:${parts.locationId}`;
    case "location_vehicle_category":
      return `vehcat:${parts.serviceId}:${parts.locationId}`;
    case "hill_station_travel":
      return `hill:${parts.serviceId}:${parts.locationId}`;
    default:
      return `loc:${parts.serviceId}:${parts.locationId}`;
  }
}

/** Existing production pages that already satisfy an intent key. */
export function existingIntentKeys(): Set<string> {
  const keys = new Set<string>();
  // Taxi city hubs
  const taxiCities = [
    "dehradun",
    "rishikesh",
    "haridwar",
    "mussoorie",
    "haldwani",
    "nainital",
    "roorkee",
    "kashipur",
    "rudrapur",
    "almora",
    "ranikhet",
    "pithoragarh",
    "kotdwar",
    "tehri",
  ];
  for (const c of taxiCities) keys.add(`loc:taxi_service:${c}`);
  keys.add("loc:taxi_service:srinagar-garhwal"); // taxi-service-in-srinagar-uttarakhand

  // Existing routes (taxi cluster + notable car routes that own route intent)
  const routes: Array<[string, string]> = [
    ["dehradun", "mussoorie"],
    ["dehradun", "rishikesh"],
    ["dehradun", "haridwar"],
    ["dehradun", "delhi"],
    ["dehradun", "nainital"],
    ["haridwar", "rishikesh"],
    ["haridwar", "dehradun"],
    ["rishikesh", "dehradun"],
    ["rishikesh", "mussoorie"],
    ["haldwani", "nainital"],
    ["kathgodam", "nainital"],
    ["dehradun", "auli"],
    ["haridwar", "mussoorie"],
    ["delhi", "dehradun"],
    ["delhi", "rishikesh"],
    ["dehradun", "ramnagar"],
    ["jolly-grant-airport", "rishikesh"],
    ["jolly-grant-airport", "mussoorie"],
    ["jolly-grant-airport", "haridwar"],
    ["kathgodam-railway", "nainital"],
  ];
  for (const [o, d] of routes) keys.add(`route:${o}->${d}:taxi`);

  keys.add("sightseeing:nainital");
  keys.add("sightseeing:mussoorie");
  keys.add("sightseeing:rishikesh");
  keys.add("pilgrimage:char_dham_taxi:dehradun:dehradun");
  keys.add("pilgrimage:char_dham_taxi:haridwar:haridwar");
  keys.add("pilgrimage:pilgrimage_taxi:kedarnath-roadhead:dehradun");
  keys.add("pilgrimage:pilgrimage_taxi:badrinath-roadhead:dehradun");
  keys.add("hub:airport:jolly-grant-airport");
  keys.add("hub:railway:dehradun-railway");

  // Dehradun category hubs already own strong rental intents
  keys.add("loc:car_rental:dehradun");
  keys.add("loc:bike_rental:dehradun");
  keys.add("loc:scooty_rental:dehradun");
  keys.add("loc:self_drive_car:dehradun");

  return keys;
}

export function slugCollision(slug: string, locked: Set<string>, proposed: Set<string>): boolean {
  const n = normalizeSlug(slug);
  return locked.has(n) || proposed.has(n);
}
