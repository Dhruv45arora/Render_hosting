import type { Faq, LandingGalleryImage, LandingPage } from "../pages";
import { LOCATION_BY_ID } from "./locations";
import { resolveImageKeys } from "./image-map";
import { SERVICE_BY_ID } from "./services";
import { VEHICLE_INTENT_BY_ID } from "./vehicles";
import type { PageCandidate } from "./types";

const P = "8445619130";

function bookFaqs(topic: string, city: string): Faq[] {
  return [
    {
      q: `How do I book ${topic}?`,
      a: `Call or WhatsApp Arora Cars on ${P}. Share pickup point in or near ${city}, date/time, passengers and bags. We confirm a quote — fares are not invented on this page.`,
    },
    {
      q: "Do you publish fixed prices here?",
      a: "No. Hill roads, waiting, night runs and vehicle class change the payable amount. We confirm before you pay any advance.",
    },
    {
      q: "Is this a self-drive checkout?",
      a: topic.toLowerCase().includes("bike") || topic.toLowerCase().includes("scooty") || topic.toLowerCase().includes("activa") || topic.toLowerCase().includes("rental")
        ? "Two-wheeler and car rental enquiries are handled from our desk process. Availability is confirmed on WhatsApp or call — not an instant app checkout."
        : "Taxi and chauffeur pages are for a car with a driver. For keys-only hire from Dehradun, use our self-drive rental pages.",
    },
  ];
}

function landingType(c: PageCandidate): LandingPage["type"] {
  if (
    c.intent === "route_taxi" ||
    c.intent === "airport_destination" ||
    c.intent === "railway_destination" ||
    c.intent === "outstation_one_way"
  ) {
    return "route";
  }
  if (c.intent === "sightseeing" || c.intent === "pilgrimage") return "route";
  return "category";
}

function badgeFor(c: PageCandidate): string {
  if (c.intent === "sightseeing") return "Sightseeing · With driver · Quote";
  if (c.intent === "pilgrimage") return "Pilgrimage · Road access · Quote";
  if (c.intent === "location_specific_vehicle") return "Vehicle enquiry · Quote";
  if (c.serviceId?.includes("bike") || c.serviceId?.includes("scooty")) return "Two-wheeler · Enquiry";
  if (c.serviceId?.includes("car")) return "Car rental · Enquiry";
  return "Taxi · With driver · Quote";
}

function ctaFor(c: PageCandidate): Pick<LandingPage, "primaryCta" | "secondaryCta" | "submitLabel"> {
  if (c.intent === "location_specific_vehicle" || c.serviceId?.includes("bike") || c.serviceId?.includes("scooty") || c.serviceId?.includes("car")) {
    return {
      primaryCta: "Call for rental quote",
      secondaryCta: "WhatsApp details",
      submitLabel: "Request rental quote",
    };
  }
  return {
    primaryCta: "Call for taxi quote",
    secondaryCta: "WhatsApp pickup details",
    submitLabel: "Request taxi quote",
  };
}

function linkSlug(slug: string, label: string): string {
  return `[${label}](/${slug})`;
}

function buildSections(c: PageCandidate): { heading: string; body: string }[] {
  const loc = c.locationId ? LOCATION_BY_ID.get(c.locationId) : undefined;
  const origin = c.originId ? LOCATION_BY_ID.get(c.originId) : undefined;
  const dest = c.destinationId ? LOCATION_BY_ID.get(c.destinationId) : undefined;
  const service = c.serviceId ? SERVICE_BY_ID.get(c.serviceId) : undefined;
  const vehicle = c.vehicleId ? VEHICLE_INTENT_BY_ID.get(c.vehicleId) : undefined;

  const sections: { heading: string; body: string }[] = [];

  if (c.intent === "route_taxi" || c.intent === "airport_destination" || c.intent === "railway_destination") {
    const oName = origin?.name || "Origin";
    const dName = dest?.name || "Destination";
    sections.push({
      heading: `${oName} → ${dName}: what this enquiry covers`,
      body: `This page is for a chauffeur transfer from ${oName} toward ${dName}. Share your exact pickup pin, date/time and passenger count on WhatsApp or call ${P}. ${
        dest?.roadheadNote || origin?.roadheadNote || "We confirm a vehicle class after we understand luggage and hill timing."
      }`,
    });
    sections.push({
      heading: `Pickup context in ${oName}`,
      body: (origin?.facts.useCases || []).slice(0, 2).join(" ") || `Name a hotel, station exit or airport curb in ${oName}.`,
    });
    sections.push({
      heading: `Why travellers go to ${dName}`,
      body: [
        ...(dest?.facts.tourismContext || []),
        ...(dest?.facts.useCases || []).slice(0, 2),
      ].join(" "),
    });
    if (dest?.facts.nearbyDestinations?.length) {
      sections.push({
        heading: "Useful onward links",
        body: `After ${dName}, guests often ask about ${dest.facts.nearbyDestinations.slice(0, 4).join(", ")}. Related pages: ${c.relatedHints
          .slice(0, 4)
          .map((s) => linkSlug(s, s.replace(/-/g, " ")))
          .join(" · ")}.`,
      });
    }
    sections.push({
      heading: "One-way or round trip",
      body: `Say whether you need a one-way drop, wait-and-return, or a multi-day plan. We do not invent distance/time guarantees on this page — the quote matches your dates and vehicle class.`,
    });
    return sections;
  }

  if (c.intent === "sightseeing") {
    const name = loc?.name || "this destination";
    sections.push({
      heading: `${name} sightseeing taxi days`,
      body: (loc?.facts.useCases || []).join(" "),
    });
    sections.push({
      heading: "Typical stops (plan on the call)",
      body: `Common asks near ${name}: ${(loc?.facts.nearbyDestinations || []).join(", ") || "local viewpoints and hotel loops"}. Final stop lists depend on season, traffic and how many hours you book.`,
    });
    sections.push({
      heading: "Transport notes",
      body: (loc?.facts.transportNotes || []).join(" "),
    });
    return sections;
  }

  if (c.intent === "pilgrimage") {
    const oName = origin?.name || loc?.name || "your start point";
    const dName = dest?.name || loc?.name || "the roadhead";
    sections.push({
      heading: "Road packages — motorable legs only",
      body: `${dest?.roadheadNote || loc?.roadheadNote || "We arrange chauffeur road legs to motorable access points."} This page does not claim a taxi drives to trek-only temple doors.`,
    });
    sections.push({
      heading: `Starting from ${oName}`,
      body: (origin?.facts.useCases || loc?.facts.useCases || []).slice(0, 3).join(" "),
    });
    sections.push({
      heading: `Toward ${dName}`,
      body: [...(dest?.facts.tourismContext || []), ...(dest?.facts.transportNotes || [])].join(" "),
    });
    sections.push({
      heading: "How multi-day yatra quotes work",
      body: `Share start date, party size, and whether you need overnight staging. Call ${P} — we confirm vehicle class (often Innova/SUV) before any advance.`,
    });
    return sections;
  }

  if (c.intent === "location_specific_vehicle") {
    const name = loc?.name || "Uttarakhand";
    const vName = vehicle?.name || "this vehicle";
    sections.push({
      heading: `${vName} enquiries in ${name}`,
      body: `Arora Cars takes ${vName} rental enquiries for guests connected to ${name}. Verified desk models include ${(vehicle?.verifiedModels || []).join(", ") || vName}. Availability is confirmed on call — we do not invent a local lot count on this page.`,
    });
    sections.push({
      heading: `Why travellers ask for ${vName} here`,
      body: [...(loc?.facts.useCases || []).slice(0, 2), ...(loc?.facts.tourismContext || [])].join(" "),
    });
    sections.push({
      heading: "Pickup and process",
      body: `${(loc?.facts.transportNotes || []).join(" ")} Share dates, licence details (for self-drive) and pickup pin on WhatsApp ${P}.`,
    });
    return sections;
  }

  // location_service (taxi / car / bike / scooty)
  const name = loc?.name || "this city";
  const svcName = service?.name || "service";
  sections.push({
    heading: `${svcName} in ${name}`,
    body: (loc?.facts.useCases || []).join(" "),
  });
  sections.push({
    heading: "Nearby destinations people combine",
    body: `From ${name}, common asks include ${(loc?.facts.nearbyDestinations || []).join(", ") || "nearby hill and city transfers"}.`,
  });
  sections.push({
    heading: "Transport connections",
    body: (loc?.facts.transportNotes || []).join(" "),
  });
  sections.push({
    heading: "Tourism / travel context",
    body: (loc?.facts.tourismContext || []).join(" "),
  });
  if (c.relatedHints.length) {
    sections.push({
      heading: "Related Arora Cars pages",
      body: c.relatedHints
        .slice(0, 6)
        .map((s) => linkSlug(s, s.replace(/-/g, " ")))
        .join(" · "),
    });
  }
  return sections;
}

function buildIntro(c: PageCandidate): string {
  const loc = c.locationId ? LOCATION_BY_ID.get(c.locationId) : undefined;
  const origin = c.originId ? LOCATION_BY_ID.get(c.originId) : undefined;
  const dest = c.destinationId ? LOCATION_BY_ID.get(c.destinationId) : undefined;
  const vehicle = c.vehicleId ? VEHICLE_INTENT_BY_ID.get(c.vehicleId) : undefined;

  if (c.intent === "route_taxi" || c.intent === "airport_destination" || c.intent === "railway_destination") {
    return `Chauffeur enquiry for ${origin?.name} to ${dest?.name}. Arora Cars quotes from the Dehradun desk for Uttarakhand road transfers — share pickup time and bags on WhatsApp or call ${P}. No invented fares on this page.`;
  }
  if (c.intent === "sightseeing") {
    return `${loc?.name} sightseeing taxi enquiries with a driver. Plan hotel pickups and a realistic day loop — we confirm hours and vehicle class before any advance.`;
  }
  if (c.intent === "pilgrimage") {
    return `Pilgrimage road-transfer enquiry toward ${dest?.name || loc?.name} from ${origin?.name || "your gateway"}. Motorable legs only${dest?.roadheadOnly || loc?.roadheadOnly ? ` — ${dest?.roadheadNote || loc?.roadheadNote}` : ""}.`;
  }
  if (c.intent === "location_specific_vehicle") {
    return `${vehicle?.name} rental enquiry for ${loc?.name}. Verified models on our desk list: ${(vehicle?.verifiedModels || []).join(", ")}. Confirm dates on ${P}.`;
  }
  const svc = c.serviceId ? SERVICE_BY_ID.get(c.serviceId)?.name : "Service";
  return `${svc} enquiries for ${loc?.name}. ${(loc?.facts.tourismContext || [])[0] || ""} Call or WhatsApp ${P} with your pickup pin — quotes are confirmed before payment.`;
}

function buildDescription(c: PageCandidate): string {
  const loc = c.locationId ? LOCATION_BY_ID.get(c.locationId) : undefined;
  const origin = c.originId ? LOCATION_BY_ID.get(c.originId) : undefined;
  const dest = c.destinationId ? LOCATION_BY_ID.get(c.destinationId) : undefined;
  const place = dest?.name || loc?.name || origin?.name || "Uttarakhand";
  const hook = (loc?.facts.nearbyDestinations || dest?.facts.nearbyDestinations || []).slice(0, 2).join(", ");
  return `${c.h1Pattern} with Arora Cars. ${hook ? `Links to ${hook}. ` : ""}Enquiry quotes via Call / WhatsApp ${P} for ${place}. No fabricated fares or ratings.`;
}

function buildFaqs(c: PageCandidate): Faq[] {
  const loc = c.locationId ? LOCATION_BY_ID.get(c.locationId) : undefined;
  const origin = c.originId ? LOCATION_BY_ID.get(c.originId) : undefined;
  const dest = c.destinationId ? LOCATION_BY_ID.get(c.destinationId) : undefined;
  const city = c.enquiryCity || loc?.name || origin?.name || "Uttarakhand";
  const topic = c.h1Pattern;
  const faqs = bookFaqs(topic, city);
  const seed = loc?.facts.faqSeeds || dest?.facts.faqSeeds || origin?.facts.faqSeeds || [];
  for (const f of seed.slice(0, 2)) faqs.push(f);
  if (dest?.roadheadOnly || loc?.roadheadOnly) {
    faqs.push({
      q: "Can a taxi reach the final temple door?",
      a: dest?.roadheadNote || loc?.roadheadNote || "We only claim motorable access points. Trek-only segments are separate.",
    });
  }
  return faqs;
}

/**
 * Build a production LandingPage from an approved Wave 2 manifest candidate.
 * Content is assembled from structured location/vehicle facts — not bare city-name swaps.
 */
export function buildLandingFromCandidate(c: PageCandidate, knownSlugs: Set<string>): LandingPage | null {
  const images = resolveImageKeys(c.imageKeys);
  const heroImage = images[0]?.src || "/images/fleet/sedan-white.jpg";
  const gallery: LandingGalleryImage[] = images.slice(1, 3).map((img, i) => ({
    src: img.src,
    alt: `${img.alt} — ${c.h1Pattern}`,
  }));
  // Ensure at least one gallery image (QA expects imagery)
  if (!gallery.length && images[0]) {
    gallery.push({ src: images[0].src, alt: `${images[0].alt} — ${c.h1Pattern}` });
  }

  const relatedSlugs = (c.relatedHints || []).filter((s) => s !== c.slug && knownSlugs.has(s)).slice(0, 8);
  // Always try taxi hub when relevant
  if (
    (c.intent.includes("taxi") ||
      c.intent === "sightseeing" ||
      c.intent === "pilgrimage" ||
      c.intent === "route_taxi" ||
      c.intent === "airport_destination" ||
      c.intent === "railway_destination" ||
      c.serviceId === "taxi_service") &&
    knownSlugs.has("taxi") &&
    !relatedSlugs.includes("taxi")
  ) {
    relatedSlugs.unshift("taxi");
  }

  const ctas = ctaFor(c);
  return {
    slug: c.slug,
    type: landingType(c),
    title: c.titlePattern.endsWith("AroraCars") ? c.titlePattern.replace("AroraCars", "Arora Cars") : c.titlePattern,
    h1: c.h1Pattern,
    description: buildDescription(c),
    primaryKeyword: c.primaryKeyword,
    secondaryKeywords: [c.primaryKeyword, c.enquiryCity || "", c.intent.replace(/_/g, " ")].filter(Boolean),
    badge: badgeFor(c),
    intro: buildIntro(c),
    heroImage,
    gallery,
    faqs: buildFaqs(c),
    sections: buildSections(c).filter((s) => s.body.trim().length > 20),
    relatedSlugs: relatedSlugs.slice(0, 8),
    enquiryCity: c.enquiryCity || "Dehradun",
    ...ctas,
  };
}
