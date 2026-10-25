/**
 * Deterministic image mapping for SEO engine pages.
 * Never randomize per request. Prefer vehicle assets over geographically misleading destination photos.
 */

export const IMAGE_MAP: Record<string, { src: string; altBase: string }> = {
  sedan: { src: "/images/fleet/sedan-white.jpg", altBase: "Sedan used for chauffeur taxi and rental enquiries" },
  sedanPrem: { src: "/images/fleet/sedan-premium.jpg", altBase: "Premium sedan for airport and outstation chauffeur runs" },
  hatchback: { src: "/images/fleet/hatchback-silver.jpg", altBase: "Hatchback car available for rental enquiries" },
  innova: { src: "/images/fleet/mpv-innova-silver.jpg", altBase: "Innova-class MPV for family and yatra chauffeur enquiries" },
  suv: { src: "/images/fleet/suv-compact-white.jpg", altBase: "SUV for hill-station chauffeur and rental enquiries" },
  fortuner: { src: "/images/fleet/suv-fortuner-white.jpg", altBase: "Fortuner-class SUV for premium chauffeur enquiries" },
  scorpio: { src: "/images/fleet/suv-scorpio-black.jpg", altBase: "Scorpio-class SUV for hill and group travel enquiries" },
  thar: { src: "/images/fleet/suv-thar-offroad.jpg", altBase: "Thar-class SUV for adventure self-drive enquiries" },
  bike: { src: "/images/fleet/bike-commuter.jpg", altBase: "Motorcycle available for self-drive rental enquiries" },
  bullet: { src: "/images/fleet/bike-bullet-classic.jpg", altBase: "Royal Enfield-class motorcycle for hill touring enquiries" },
  himalayan: { src: "/images/fleet/bike-adventure.jpg", altBase: "Adventure motorcycle for hill-road rental enquiries" },
  activa: { src: "/images/fleet/scooty-activa.jpg", altBase: "Activa-class scooty for local self-drive enquiries" },
  scooty: { src: "/images/fleet/scooty-activa.jpg", altBase: "Scooty available for self-drive rental enquiries" },
  mussoorie: { src: "/images/destinations/mussoorie-hills.jpg", altBase: "Hill road context toward Mussoorie" },
  rishikesh: { src: "/images/destinations/rishikesh-ghat.jpg", altBase: "Rishikesh ghat tourism context" },
  haridwar: { src: "/images/destinations/haridwar-ghat.jpg", altBase: "Haridwar ghat tourism context" },
  chardham: { src: "/images/destinations/chardham-temple.jpg", altBase: "Char Dham pilgrimage travel context" },
  hill: { src: "/images/destinations/mussoorie-hills.jpg", altBase: "Uttarakhand hill-road travel context" },
  airport: { src: "/images/fleet/sedan-premium.jpg", altBase: "Airport transfer sedan context" },
  station: { src: "/images/fleet/sedan-white.jpg", altBase: "Railway station pickup sedan context" },
};

export const IMAGE_TODO: string[] = [
  "Dedicated Jolly Grant Airport curb photo",
  "Dedicated Kathgodam / Dehradun railway pickup photo",
  "Verified Nainital / Bhimtal destination stills (do not reuse Mussoorie as Nainital)",
  "Verified Almora / Ranikhet / Kausani destination stills",
  "Verified Corbett / Ramnagar approach stills",
  "Verified Auli / Joshimath approach stills",
  "Pantnagar airport context photo",
];

export function resolveImageKeys(keys: string[]): Array<{ src: string; alt: string }> {
  const out: Array<{ src: string; alt: string }> = [];
  const seen = new Set<string>();
  for (const key of keys) {
    const hit = IMAGE_MAP[key];
    if (!hit || seen.has(hit.src)) continue;
    seen.add(hit.src);
    out.push({ src: hit.src, alt: hit.altBase });
  }
  if (!out.length) {
    out.push({ src: IMAGE_MAP.sedan.src, alt: IMAGE_MAP.sedan.altBase });
  }
  return out;
}

/** Prefer vehicle imagery when destination photo is missing/misleading. */
export function imagesForLocation(imageKeys: string[], hasVerifiedDestinationPhoto: boolean): string[] {
  if (hasVerifiedDestinationPhoto) return imageKeys;
  return imageKeys.filter((k) => !["mussoorie", "rishikesh", "haridwar"].includes(k) || imageKeys[0] === k);
}
