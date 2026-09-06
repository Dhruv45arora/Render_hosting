/**
 * Central vehicle image mapping.
 * Images under /images/fleet are illustrative category/model-family references —
 * not photographs of specific Arora Cars fleet units.
 */

const F = "/images/fleet";
const C = "/images/categories";

/** Category fallback when no model family matches */
export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  bike: `${F}/bike-commuter.jpg`,
  scooty: `${F}/scooty-activa.jpg`,
  car: `${F}/hatchback-silver.jpg`,
  suv: `${F}/suv-compact-white.jpg`,
  luxury: `${F}/luxury-sedan-black.jpg`,
  wedding: `${C}/wedding-car-dehradun.jpg`,
  tempo: `${F}/tempo-traveller-white.jpg`,
  three_wheeler: `${C}/auto-dehradun.jpg`,
  chota_hathi: `${C}/minitruck-dehradun.jpg`,
};

/** Model-family keys → distinct images (never cross categories) */
export const VEHICLE_FAMILY_IMAGES = {
  // Bikes
  bullet: `${F}/bike-bullet-classic.jpg`,
  classic_enfield: `${F}/bike-bullet-classic.jpg`,
  himalayan: `${F}/bike-adventure.jpg`,
  adventure_bike: `${F}/bike-adventure.jpg`,
  interceptor: `${F}/bike-interceptor.jpg`,
  meteor: `${F}/bike-bullet-classic.jpg`,
  hunter: `${F}/bike-bullet-classic.jpg`,
  pulsar: `${F}/bike-pulsar-sport.jpg`,
  apache: `${F}/bike-pulsar-sport.jpg`,
  duke: `${F}/bike-naked-orange.jpg`,
  fz: `${F}/bike-pulsar-sport.jpg`,
  dominar: `${F}/bike-pulsar-sport.jpg`,
  avenger: `${F}/bike-bullet-classic.jpg`,
  cb350: `${F}/bike-interceptor.jpg`,
  commuter_bike: `${F}/bike-commuter.jpg`,

  // Scooty
  activa: `${F}/scooty-activa.jpg`,
  dio: `${F}/scooty-activa.jpg`,
  jupiter: `${F}/scooty-activa.jpg`,
  access: `${F}/scooty-activa.jpg`,
  fascino: `${F}/scooty-activa.jpg`,
  pleasure: `${F}/scooty-activa.jpg`,
  rayzr: `${F}/scooty-sport.jpg`,
  ntorq: `${F}/scooty-sport.jpg`,
  burgman: `${F}/scooty-maxi.jpg`,
  electric_scooty: `${F}/scooty-electric.jpg`,

  // Cars
  hatchback: `${F}/hatchback-silver.jpg`,
  tall_hatch: `${F}/hatchback-tall.jpg`,
  sedan: `${F}/sedan-white.jpg`,
  premium_sedan: `${F}/sedan-premium.jpg`,

  // SUVs / MPVs
  compact_suv: `${F}/suv-compact-white.jpg`,
  subcompact_suv: `${F}/suv-subcompact-red.jpg`,
  scorpio: `${F}/suv-scorpio-black.jpg`,
  thar: `${F}/suv-thar-offroad.jpg`,
  bolero: `${F}/suv-bolero-utility.jpg`,
  innova: `${F}/mpv-innova-silver.jpg`,
  fortuner: `${F}/suv-fortuner-white.jpg`,
  xuv700: `${F}/suv-scorpio-black.jpg`,
  safari: `${F}/suv-fortuner-white.jpg`,
  harrier: `${F}/suv-compact-white.jpg`,
  ertiga: `${F}/mpv-innova-silver.jpg`,
  carnival: `${F}/mpv-innova-silver.jpg`,
  jimny: `${F}/suv-thar-offroad.jpg`,

  // Luxury / wedding
  luxury_sedan: `${F}/luxury-sedan-black.jpg`,
  luxury_suv: `${F}/luxury-suv-white.jpg`,
  wedding_car: `${C}/wedding-car-dehradun.jpg`,

  // Tempo
  tempo: `${F}/tempo-traveller-white.jpg`,
  urbania: `${F}/tempo-urbania.jpg`,
  winger: `${F}/tempo-traveller-white.jpg`,

  // Utility
  auto: `${C}/auto-dehradun.jpg`,
  mini_truck: `${C}/minitruck-dehradun.jpg`,
} as const;

export type VehicleFamilyKey = keyof typeof VEHICLE_FAMILY_IMAGES;

type MatchRule = { family: VehicleFamilyKey; test: RegExp };

const RULES: MatchRule[] = [
  // Scooty first (activa before bike patterns)
  { family: "activa", test: /\bactiva\b/i },
  { family: "dio", test: /\bdio\b/i },
  { family: "jupiter", test: /\bjupiter\b/i },
  { family: "access", test: /\baccess\b/i },
  { family: "fascino", test: /\bfascino\b/i },
  { family: "pleasure", test: /\bpleasure\b/i },
  { family: "rayzr", test: /\bray\s*zr\b|\brayzr\b/i },
  { family: "ntorq", test: /\bntorq\b/i },
  { family: "burgman", test: /\bburgman\b/i },
  { family: "electric_scooty", test: /\bather\b|\biqube\b|\bola\b|\bs1\b/i },

  // Bikes
  { family: "himalayan", test: /\bhimalayan\b/i },
  { family: "adventure_bike", test: /\bxpulse\b/i },
  { family: "interceptor", test: /\binterceptor\b/i },
  { family: "bullet", test: /\bbullet\b/i },
  { family: "classic_enfield", test: /\bclassic\s*350\b/i },
  { family: "meteor", test: /\bmeteor\b/i },
  { family: "hunter", test: /\bhunter\b/i },
  { family: "duke", test: /\bduke\b|\bktm\b/i },
  { family: "pulsar", test: /\bpulsar\b/i },
  { family: "apache", test: /\bapache\b/i },
  { family: "fz", test: /\bfz\b/i },
  { family: "dominar", test: /\bdominar\b/i },
  { family: "avenger", test: /\bavenger\b/i },
  { family: "cb350", test: /\bcb\s*350\b/i },
  { family: "commuter_bike", test: /\bsplendor\b|\bpassion\b|\bplatina\b|\bshine\b|\bunicorn\b|\braider\b/i },

  // Tempo
  { family: "urbania", test: /\burbania\b/i },
  { family: "winger", test: /\bwinger\b/i },
  { family: "tempo", test: /\btempo\b|\btraveller\b|\bforce\s*traveller\b|\b9\s*seater\b|\b12\s*seater\b|\b15\s*seater\b|\b17\s*seater\b|\b20\s*seater\b|\b26\s*seater\b/i },

  // Luxury / wedding
  { family: "wedding_car", test: /\bwedding\b/i },
  { family: "luxury_sedan", test: /\bmercedes\b|\be-class\b|\bs-class\b|\bbmw\b|\b5\s*series\b|\b7\s*series\b|\baudi\s*a6\b|\bcamry\b|\bjaguar\b|\bxf\b/i },
  { family: "luxury_suv", test: /\baudi\s*q7\b|\bq7\b|\bfortuner\s*legender\b/i },

  // SUV / MPV
  { family: "thar", test: /\bthar\b/i },
  { family: "jimny", test: /\bjimny\b/i },
  { family: "scorpio", test: /\bscorpio\b/i },
  { family: "bolero", test: /\bbolero\b/i },
  { family: "innova", test: /\binnova\b|\bhycross\b|\bcrysta\b/i },
  { family: "fortuner", test: /\bfortuner\b/i },
  { family: "xuv700", test: /\bxuv\s*700\b|\bxuv700\b/i },
  { family: "safari", test: /\bsafari\b/i },
  { family: "harrier", test: /\bharrier\b/i },
  { family: "ertiga", test: /\bertiga\b|\bxl6\b|\bcarens\b|\btriber\b|\bcarnival\b|\balcazar\b/i },
  { family: "subcompact_suv", test: /\bvenue\b|\bsonet\b|\bnexon\b|\bpunch\b|\bxuv\s*300\b|\bxuv300\b/i },
  { family: "compact_suv", test: /\bcreta\b|\bbrezza\b|\bseltos\b|\bhector\b|\bkushaq\b|\btaigun\b|\bvitara\b|\bhyryder\b/i },

  // Cars
  { family: "premium_sedan", test: /\bcity\b|\bverna\b|\bciaz\b|\bslavia\b|\bvirtus\b/i },
  { family: "sedan", test: /\bdzire\b|\bamaze\b|\baura\b|\btigor\b/i },
  { family: "tall_hatch", test: /\bwagon\s*r\b|\bwagonr\b/i },
  { family: "hatchback", test: /\bswift\b|\bi20\b|\bbaleno\b|\baltroz\b|\btiago\b|\bgrand\s*i10\b|\bkwid\b|\bignis\b|\bcelerio\b/i },

  // Utility
  { family: "auto", test: /\bauto\b|\brickshaw\b|\bape\b|\balfa\b/i },
  { family: "mini_truck", test: /\bace\b|\bjeeto\b|\bintra\b|\bdost\b|\bpickup\b|\bhathi\b|\bxtra\b/i },
];

export function resolveVehicleFamily(category: string, model: string, name: string, slug: string): VehicleFamilyKey | null {
  const hay = `${name} ${model} ${slug}`.toLowerCase();

  // Category-constrained matching to avoid cross-type collisions
  const allow = (family: VehicleFamilyKey): boolean => {
    if (category === "bike") return family.includes("bike") || ["bullet", "classic_enfield", "himalayan", "adventure_bike", "interceptor", "meteor", "hunter", "pulsar", "apache", "duke", "fz", "dominar", "avenger", "cb350", "commuter_bike"].includes(family);
    if (category === "scooty") return family.includes("scooty") || ["activa", "dio", "jupiter", "access", "fascino", "pleasure", "rayzr", "ntorq", "burgman", "electric_scooty"].includes(family);
    if (category === "car") return ["hatchback", "tall_hatch", "sedan", "premium_sedan"].includes(family);
    if (category === "suv") return ["compact_suv", "subcompact_suv", "scorpio", "thar", "bolero", "innova", "fortuner", "xuv700", "safari", "harrier", "ertiga", "carnival", "jimny"].includes(family);
    if (category === "luxury") return ["luxury_sedan", "luxury_suv", "fortuner"].includes(family);
    if (category === "wedding") return ["wedding_car", "luxury_sedan", "luxury_suv", "innova", "fortuner"].includes(family);
    if (category === "tempo") return ["tempo", "urbania", "winger"].includes(family);
    if (category === "three_wheeler") return family === "auto";
    if (category === "chota_hathi") return family === "mini_truck";
    return true;
  };

  for (const rule of RULES) {
    if (rule.test.test(hay) && allow(rule.family)) return rule.family;
  }
  return null;
}

export function resolveVehicleImage(opts: {
  category: string;
  model: string;
  name: string;
  slug: string;
}): string {
  const family = resolveVehicleFamily(opts.category, opts.model, opts.name, opts.slug);
  if (family) return VEHICLE_FAMILY_IMAGES[family];
  return CATEGORY_FALLBACK_IMAGES[opts.category] || CATEGORY_FALLBACK_IMAGES.car;
}

/** Short descriptive alt — not keyword-stuffed */
export function vehicleImageAlt(opts: {
  name: string;
  category: string;
}): string {
  const byCat: Record<string, string> = {
    bike: "Bike rental in Dehradun",
    scooty: "Scooty on rent in Dehradun",
    car: "Car rental in Dehradun",
    suv: "SUV rental in Dehradun",
    luxury: "Luxury car rental in Dehradun",
    wedding: "Wedding car rental in Dehradun",
    tempo: "Tempo Traveller rental in Dehradun",
    three_wheeler: "Auto rickshaw rental in Dehradun",
    chota_hathi: "Mini truck rental in Dehradun",
  };
  const base = byCat[opts.category] || "Vehicle rental in Dehradun";
  return `${opts.name} — ${base} (illustrative image)`;
}

export const IMAGE_DISCLAIMER =
  "Illustrative reference image — not a photo of this exact fleet vehicle. Confirm the unit on WhatsApp when you book.";
