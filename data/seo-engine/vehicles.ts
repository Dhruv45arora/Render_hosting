import { SEED_VEHICLES } from "../vehicles";
import type { SeoVehicleIntent } from "./types";

/**
 * Vehicle SEO intents derived ONLY from SEED_VEHICLES models.
 * Do not invent models that are not in the seed fleet list.
 */
function modelsMatching(...needles: string[]): string[] {
  const found = new Set<string>();
  for (const v of SEED_VEHICLES) {
    const hay = `${v.model} ${v.name}`.toLowerCase();
    if (needles.some((n) => hay.includes(n.toLowerCase()))) {
      found.add(v.model);
    }
  }
  return Array.from(found).sort();
}

function intent(
  partial: Omit<SeoVehicleIntent, "verifiedModels"> & { match: string[] }
): SeoVehicleIntent | null {
  const verifiedModels = modelsMatching(...partial.match);
  if (!verifiedModels.length) return null;
  const { match: _m, ...rest } = partial;
  return { ...rest, verifiedModels };
}

const RAW: Array<Omit<SeoVehicleIntent, "verifiedModels"> & { match: string[] }> = [
  {
    id: "bullet",
    name: "Royal Enfield Bullet",
    slugFragment: "bullet-rental-in",
    category: "bike",
    imageKey: "bullet",
    minTier: "A",
    touristLocationsOnly: true,
    match: ["Bullet"],
  },
  {
    id: "himalayan",
    name: "Royal Enfield Himalayan",
    slugFragment: "himalayan-rental-in",
    category: "bike",
    imageKey: "himalayan",
    minTier: "A",
    touristLocationsOnly: true,
    match: ["Himalayan"],
  },
  {
    id: "classic-350",
    name: "Royal Enfield Classic 350",
    slugFragment: "classic-350-rental-in",
    category: "bike",
    imageKey: "bullet",
    minTier: "A",
    touristLocationsOnly: true,
    match: ["Classic 350"],
  },
  {
    id: "activa",
    name: "Honda Activa",
    slugFragment: "activa-rental-in",
    category: "scooty",
    imageKey: "activa",
    minTier: "A",
    touristLocationsOnly: true,
    match: ["Activa"],
  },
  {
    id: "innova",
    name: "Toyota Innova",
    slugFragment: "innova-rental-in",
    category: "suv",
    imageKey: "innova",
    minTier: "A",
    touristLocationsOnly: true,
    match: ["Innova"],
  },
  {
    id: "dzire",
    name: "Maruti Dzire",
    slugFragment: "dzire-rental-in",
    category: "car",
    imageKey: "sedan",
    minTier: "A",
    touristLocationsOnly: true,
    match: ["Dzire"],
  },
  {
    id: "swift",
    name: "Maruti Swift",
    slugFragment: "swift-rental-in",
    category: "car",
    imageKey: "hatchback",
    minTier: "A",
    touristLocationsOnly: true,
    match: ["Swift"],
  },
  {
    id: "ertiga",
    name: "Maruti Ertiga",
    slugFragment: "ertiga-rental-in",
    category: "suv",
    imageKey: "innova",
    minTier: "A",
    touristLocationsOnly: true,
    match: ["Ertiga"],
  },
  {
    id: "thar",
    name: "Mahindra Thar",
    slugFragment: "thar-rental-in",
    category: "suv",
    imageKey: "thar",
    minTier: "A",
    touristLocationsOnly: true,
    match: ["Thar"],
  },
  {
    id: "scorpio",
    name: "Mahindra Scorpio",
    slugFragment: "scorpio-rental-in",
    category: "suv",
    imageKey: "scorpio",
    minTier: "A",
    touristLocationsOnly: true,
    match: ["Scorpio"],
  },
  {
    id: "fortuner",
    name: "Toyota Fortuner",
    slugFragment: "fortuner-rental-in",
    category: "suv",
    imageKey: "fortuner",
    minTier: "A",
    touristLocationsOnly: true,
    match: ["Fortuner"],
  },
];

export const SEO_VEHICLE_INTENTS: SeoVehicleIntent[] = RAW.map(intent).filter(
  (x): x is SeoVehicleIntent => Boolean(x)
);

export const VEHICLE_INTENT_BY_ID = new Map(SEO_VEHICLE_INTENTS.map((v) => [v.id, v]));

/** Category-level intents (not specific models) — still verified against seed categories. */
export const VERIFIED_VEHICLE_CATEGORIES = [
  "bike",
  "scooty",
  "car",
  "suv",
  "luxury",
  "wedding",
  "tempo",
  "three_wheeler",
  "chota_hathi",
] as const;

export function verifiedCategoryCounts(): Record<string, number> {
  const out: Record<string, number> = {};
  for (const v of SEED_VEHICLES) {
    out[v.category] = (out[v.category] || 0) + 1;
  }
  return out;
}
