import { fingerprintFor, shouldGeneratePage } from "./eligibility";
import { relatedHintsFor } from "./linking";
import { LOCATION_BY_ID, SEO_LOCATIONS, locationsByType } from "./locations";
import { expandRouteDirections, SEO_ROUTES } from "./routes";
import { SERVICE_BY_ID } from "./services";
import { CORE_LANDING_SLUGS } from "../pages";
import { buildProductionLockedSlugs } from "./production-locked-slugs";
import { existingIntentKeys, intentKey } from "./slug-registry";
import { SEO_VEHICLE_INTENTS, verifiedCategoryCounts } from "./vehicles";
import { isWaveEnabled } from "./waves";
import type {
  ManifestRejection,
  PageCandidate,
  RejectionReason,
  SitemapGroup,
  WaveManifest,
} from "./types";

type Draft = Omit<PageCandidate, "relatedHints" | "published" | "source" | "indexable"> & {
  intentKeyStr: string;
};

function reject(
  list: ManifestRejection[],
  counts: Record<string, number>,
  slug: string,
  intent: Draft["intent"],
  reason: RejectionReason,
  detail: string
) {
  counts[reason] = (counts[reason] || 0) + 1;
  if (list.length < 80) list.push({ slug, intent, reason, detail });
}

function tryAccept(
  draft: Draft,
  state: {
    locked: Set<string>;
    proposed: Set<string>;
    intentKeys: Set<string>;
    accepted: PageCandidate[];
    rejections: ManifestRejection[];
    rejectCounts: Record<string, number>;
  }
) {
  const location = draft.locationId ? LOCATION_BY_ID.get(draft.locationId) : undefined;
  const origin = draft.originId ? LOCATION_BY_ID.get(draft.originId) : undefined;
  const destination = draft.destinationId ? LOCATION_BY_ID.get(draft.destinationId) : undefined;
  const service = draft.serviceId ? SERVICE_BY_ID.get(draft.serviceId) : undefined;
  const vehicle = draft.vehicleId
    ? SEO_VEHICLE_INTENTS.find((v) => v.id === draft.vehicleId)
    : undefined;
  const route = SEO_ROUTES.find(
    (r) =>
      (r.originId === draft.originId && r.destinationId === draft.destinationId) ||
      (r.bidirectional && r.originId === draft.destinationId && r.destinationId === draft.originId)
  );

  const result = shouldGeneratePage({
    location,
    origin,
    destination,
    service,
    vehicle,
    route,
    intent: draft.intent,
    slug: draft.slug,
    wave: draft.wave,
    contentFingerprint: draft.contentFingerprint,
    lockedSlugs: state.locked,
    proposedSlugs: state.proposed,
    intentKeys: state.intentKeys,
    intentKey: draft.intentKeyStr,
  });

  if (!result.ok) {
    reject(state.rejections, state.rejectCounts, draft.slug, draft.intent, result.reason, result.detail);
    return;
  }

  state.proposed.add(draft.slug);
  state.intentKeys.add(draft.intentKeyStr);
  state.accepted.push({
    ...draft,
    relatedHints: [],
    indexable: false, // preview only — not published
    published: false,
    source: "proposed",
  });
}

function locSlug(id: string): string {
  return LOCATION_BY_ID.get(id)?.slug || id;
}

export function buildWave2Manifest(): WaveManifest {
  if (!isWaveEnabled("wave2")) {
    throw new Error("Wave 2 is disabled in WAVE_CONFIG");
  }

  // Pre-Wave2 locked set only (CORE + Wave1 + taxi). Do not include Wave 2 itself.
  const locked = buildProductionLockedSlugs(CORE_LANDING_SLUGS);
  const intentKeys = existingIntentKeys();
  const proposed = new Set<string>();
  const accepted: PageCandidate[] = [];
  const rejections: ManifestRejection[] = [];
  const rejectCounts: Record<string, number> = {};
  const state = { locked, proposed, intentKeys, accepted, rejections, rejectCounts };

  // Track weak combinations scanned for capacity estimate
  let scanned = 0;

  // ——— 1) Location + taxi (new cities only) ———
  for (const loc of SEO_LOCATIONS) {
    if (loc.locationType === "airport" || loc.locationType === "railway_station") continue;
    if (loc.region === "external") continue;
    if (!loc.relevantServices.includes("taxi_service")) continue;
    if (loc.tier === "C" && loc.tourismRelevance < 2 && loc.pilgrimageRelevance < 2) {
      scanned++;
      reject(rejections, rejectCounts, `taxi-service-in-${loc.slug}`, "location_service", "weak_commercial_relevance", "Tier C weak tourism");
      continue;
    }
    // Srinagar uses a special existing slug
    const slug =
      loc.id === "srinagar-garhwal"
        ? "taxi-service-in-srinagar-uttarakhand"
        : `taxi-service-in-${loc.slug}`;
    scanned++;
    tryAccept(
      {
        slug,
        intent: "location_service",
        wave: "wave2",
        tier: loc.tier,
        serviceId: "taxi_service",
        locationId: loc.id,
        titlePattern: `Taxi Service in ${loc.name} | Local & Outstation | AroraCars`,
        h1Pattern: `Taxi service in ${loc.name}`,
        primaryKeyword: `taxi service in ${loc.name}`,
        sitemapGroup: "taxi-cities",
        contentFingerprint: fingerprintFor({
          intent: "location_service",
          locationName: loc.name,
          service: "taxi_service",
          useCases: loc.facts.useCases,
          nearby: loc.facts.nearbyDestinations,
          transport: loc.facts.transportNotes,
          tourism: loc.facts.tourismContext,
        }),
        imageKeys: loc.imageKeys,
        enquiryCity: loc.name,
        intentKeyStr: intentKey({ intent: "location_service", serviceId: "taxi_service", locationId: loc.id }),
      },
      state
    );
  }

  // ——— 2) Car / bike / scooty rental in strong tourist cities ———
  const rentalServices: Array<{ serviceId: "car_rental" | "bike_rental" | "scooty_rental"; group: SitemapGroup }> = [
    { serviceId: "car_rental", group: "car-rental" },
    { serviceId: "bike_rental", group: "bike-rental" },
    { serviceId: "scooty_rental", group: "scooty-rental" },
  ];
  for (const loc of SEO_LOCATIONS) {
    if (loc.region === "external") continue;
    if (loc.locationType === "airport" || loc.locationType === "railway_station") continue;
    if (loc.tier === "C") continue;
    if (loc.tourismRelevance < 2 && loc.id !== "haldwani" && loc.id !== "rudrapur" && loc.id !== "kashipur" && loc.id !== "roorkee") {
      continue;
    }
    for (const { serviceId, group } of rentalServices) {
      if (!loc.relevantServices.includes(serviceId)) {
        scanned++;
        reject(rejections, rejectCounts, `${serviceId.replace("_", "-")}-in-${loc.slug}`, "location_service", "unsupported_service", serviceId);
        continue;
      }
      // Bike/scooty: tourist towns more than plains commercial cities
      if ((serviceId === "bike_rental" || serviceId === "scooty_rental") && loc.tourismRelevance < 2 && loc.id !== "dehradun") {
        scanned++;
        reject(rejections, rejectCounts, `${serviceId}-in-${loc.slug}`, "location_service", "weak_commercial_relevance", "two-wheeler needs tourism");
        continue;
      }
      const slug = `${serviceId.replace(/_/g, "-")}-in-${loc.slug}`;
      scanned++;
      tryAccept(
        {
          slug,
          intent: "location_service",
          wave: "wave2",
          tier: loc.tier,
          serviceId,
          locationId: loc.id,
          titlePattern: `${SERVICE_BY_ID.get(serviceId)!.name} in ${loc.name} | AroraCars`,
          h1Pattern: `${SERVICE_BY_ID.get(serviceId)!.name} in ${loc.name}`,
          primaryKeyword: `${SERVICE_BY_ID.get(serviceId)!.name.toLowerCase()} in ${loc.name}`,
          sitemapGroup: group,
          contentFingerprint: fingerprintFor({
            intent: "location_service",
            locationName: loc.name,
            service: serviceId,
            useCases: loc.facts.useCases,
            nearby: loc.facts.nearbyDestinations,
            transport: loc.facts.transportNotes,
            tourism: loc.facts.tourismContext,
          }),
          imageKeys:
            serviceId === "bike_rental"
              ? ["bike", "bullet", ...loc.imageKeys]
              : serviceId === "scooty_rental"
                ? ["activa", "scooty", ...loc.imageKeys]
                : ["sedan", "innova", ...loc.imageKeys],
          enquiryCity: loc.name,
          intentKeyStr: intentKey({ intent: "location_service", serviceId, locationId: loc.id }),
        },
        state
      );
    }
  }

  // ——— 3) Route taxi pages from curated edges ———
  for (const { originId, destinationId, edge } of expandRouteDirections(SEO_ROUTES)) {
    if (edge.wave !== "wave2" && edge.wave !== "existing") {
      scanned++;
      continue;
    }
    const origin = LOCATION_BY_ID.get(originId);
    const destination = LOCATION_BY_ID.get(destinationId);
    if (!origin || !destination) {
      scanned++;
      reject(rejections, rejectCounts, `${originId}-to-${destinationId}-taxi`, "route_taxi", "invalid_route", "missing location");
      continue;
    }

    let slug: string;
    let intent: PageCandidate["intent"] = "route_taxi";
    let group: SitemapGroup = "taxi-routes";

    if (origin.locationType === "airport") {
      slug = `${locSlug(originId)}-to-${locSlug(destinationId)}-taxi`;
      intent = "airport_destination";
      group = "airport-transfer";
    } else if (origin.locationType === "railway_station") {
      slug = `${locSlug(originId)}-to-${locSlug(destinationId)}-taxi`;
      intent = "railway_destination";
      group = "railway-transfer";
    } else {
      slug = `${locSlug(originId)}-to-${locSlug(destinationId)}-taxi`;
    }

    scanned++;
    tryAccept(
      {
        slug,
        intent,
        wave: "wave2",
        tier: edge.tier,
        serviceId: "taxi_service",
        originId,
        destinationId,
        titlePattern: `${origin.name} to ${destination.name} Taxi | AroraCars`,
        h1Pattern: `${origin.name} to ${destination.name} taxi`,
        primaryKeyword: `${origin.name} to ${destination.name} taxi`,
        sitemapGroup: group,
        contentFingerprint: fingerprintFor({
          intent,
          originName: origin.name,
          destinationName: destination.name,
          service: "taxi_service",
          useCases: [
            ...origin.facts.useCases.slice(0, 2),
            ...destination.facts.useCases.slice(0, 2),
            `Direction-specific pickup from ${origin.name}`,
          ],
          nearby: destination.facts.nearbyDestinations,
          transport: [...origin.facts.transportNotes, ...destination.facts.transportNotes],
          tourism: destination.facts.tourismContext,
        }),
        imageKeys: [...origin.imageKeys.slice(0, 1), ...destination.imageKeys.slice(0, 2), "sedan"],
        enquiryCity: origin.region === "external" ? destination.name : origin.name,
        intentKeyStr: intentKey({ intent, originId, destinationId }),
      },
      state
    );
  }

  // ——— 4) Sightseeing ———
  for (const loc of SEO_LOCATIONS) {
    if (loc.tourismRelevance < 2) continue;
    if (!["hill_station", "tourist_destination", "major_city"].includes(loc.locationType)) continue;
    if (!loc.relevantServices.includes("sightseeing_taxi")) continue;
    const slug = `${loc.slug}-sightseeing-taxi`;
    scanned++;
    tryAccept(
      {
        slug,
        intent: "sightseeing",
        wave: "wave2",
        tier: loc.tier,
        serviceId: "sightseeing_taxi",
        locationId: loc.id,
        titlePattern: `${loc.name} Sightseeing Taxi | Day Tour Chauffeur | AroraCars`,
        h1Pattern: `${loc.name} sightseeing taxi`,
        primaryKeyword: `${loc.name} sightseeing taxi`,
        sitemapGroup: "sightseeing",
        contentFingerprint: fingerprintFor({
          intent: "sightseeing",
          locationName: loc.name,
          service: "sightseeing_taxi",
          useCases: loc.facts.useCases,
          nearby: loc.facts.nearbyDestinations,
          transport: loc.facts.transportNotes,
          tourism: loc.facts.tourismContext,
        }),
        imageKeys: loc.imageKeys,
        enquiryCity: loc.name,
        intentKeyStr: intentKey({ intent: "sightseeing", locationId: loc.id }),
      },
      state
    );
  }

  // ——— 5) Pilgrimage from major gateways ———
  const pilgrimGateways = ["dehradun", "haridwar", "rishikesh"];
  const pilgrimTargets = [
    { id: "kedarnath-roadhead", label: "Kedarnath road access", slugPart: "kedarnath" },
    { id: "badrinath-roadhead", label: "Badrinath", slugPart: "badrinath" },
    { id: "gangotri-roadhead", label: "Gangotri road access", slugPart: "gangotri" },
    { id: "yamunotri-roadhead", label: "Yamunotri road access", slugPart: "yamunotri" },
    { id: "chopta", label: "Chopta", slugPart: "chopta" },
  ];
  for (const g of pilgrimGateways) {
    for (const t of pilgrimTargets) {
      const slug = `${t.slugPart}-taxi-from-${locSlug(g)}`;
      const origin = LOCATION_BY_ID.get(g)!;
      const destination = LOCATION_BY_ID.get(t.id)!;
      scanned++;
      tryAccept(
        {
          slug,
          intent: "pilgrimage",
          wave: "wave2",
          tier: "B",
          serviceId: "pilgrimage_taxi",
          originId: g,
          destinationId: t.id,
          locationId: t.id,
          titlePattern: `${t.label} Taxi from ${origin.name} | Road Package Enquiry | AroraCars`,
          h1Pattern: `${t.label} taxi from ${origin.name}`,
          primaryKeyword: `${t.slugPart} taxi from ${origin.name}`,
          sitemapGroup: "pilgrimage",
          contentFingerprint: fingerprintFor({
            intent: "pilgrimage",
            originName: origin.name,
            destinationName: destination.name,
            service: "pilgrimage_taxi",
            useCases: [
              ...destination.facts.useCases,
              destination.roadheadNote || "Motorable legs only",
              `Departure staging from ${origin.name}`,
            ],
            nearby: destination.facts.nearbyDestinations,
            transport: destination.facts.transportNotes,
            tourism: destination.facts.tourismContext,
          }),
          imageKeys: ["chardham", "innova", ...destination.imageKeys],
          enquiryCity: origin.name,
          intentKeyStr: intentKey({
            intent: "pilgrimage",
            serviceId: "pilgrimage_taxi",
            locationId: t.id,
            originId: g,
          }),
        },
        state
      );
    }
  }

  // Char Dham from Rishikesh (Dehradun/Haridwar already exist)
  {
    const slug = "char-dham-taxi-service-from-rishikesh";
    const loc = LOCATION_BY_ID.get("rishikesh")!;
    scanned++;
    tryAccept(
      {
        slug,
        intent: "pilgrimage",
        wave: "wave2",
        tier: "A",
        serviceId: "char_dham_taxi",
        locationId: "rishikesh",
        originId: "rishikesh",
        titlePattern: "Char Dham Taxi Service from Rishikesh | Road Package Enquiry | AroraCars",
        h1Pattern: "Char Dham taxi service from Rishikesh",
        primaryKeyword: "char dham taxi from Rishikesh",
        sitemapGroup: "pilgrimage",
        contentFingerprint: fingerprintFor({
          intent: "pilgrimage",
          locationName: "Rishikesh",
          service: "char_dham_taxi",
          useCases: loc.facts.useCases,
          nearby: ["Joshimath", "Rudraprayag", "Uttarkashi", "Barkot"],
          transport: loc.facts.transportNotes,
          tourism: ["Multi-day Char Dham road packages with motorable endpoint accuracy"],
        }),
        imageKeys: ["chardham", "innova"],
        enquiryCity: "Rishikesh",
        intentKeyStr: intentKey({ intent: "pilgrimage", serviceId: "char_dham_taxi", locationId: "rishikesh" }),
      },
      state
    );
  }

  // ——— 6) Vehicle-specific (Tier A/B tourist; Dehradun fleets already cover local intent) ———
  const vehicleCities = SEO_LOCATIONS.filter(
    (l) =>
      l.region !== "external" &&
      l.tourismRelevance >= 2 &&
      (l.tier === "A" || l.tier === "B") &&
      !["airport", "railway_station", "transport_hub", "pilgrimage_destination"].includes(l.locationType)
  );
  // Hero vehicles only for Wave 2 volume control
  const wave2Vehicles = SEO_VEHICLE_INTENTS.filter((v) =>
    ["bullet", "himalayan", "activa", "innova", "dzire", "thar", "scorpio"].includes(v.id)
  );
  for (const loc of vehicleCities) {
    for (const veh of wave2Vehicles) {
      // Dehradun already has deep fleet pages — only open hero vehicles elsewhere in Wave 2
      if (loc.id === "dehradun") {
        scanned++;
        reject(rejections, rejectCounts, `${veh.slugFragment}-${loc.slug}`, "location_specific_vehicle", "cannibalization", "Dehradun fleet/product URLs already cover vehicle intent");
        continue;
      }
      // Two-wheelers need bike/scooty relevance
      if (veh.category === "bike" && !loc.relevantServices.includes("bike_rental")) {
        scanned++;
        reject(rejections, rejectCounts, `${veh.slugFragment}-${loc.slug}`, "location_specific_vehicle", "unsupported_vehicle", "no bike_rental on location");
        continue;
      }
      if (veh.category === "scooty" && !loc.relevantServices.includes("scooty_rental")) {
        scanned++;
        reject(rejections, rejectCounts, `${veh.slugFragment}-${loc.slug}`, "location_specific_vehicle", "unsupported_vehicle", "no scooty_rental on location");
        continue;
      }
      const serviceId =
        veh.category === "bike"
          ? "bike_rental"
          : veh.category === "scooty"
            ? "scooty_rental"
            : loc.relevantServices.includes("car_rental")
              ? "car_rental"
              : "car_with_driver";
      if (!loc.relevantServices.includes(serviceId)) {
        scanned++;
        reject(rejections, rejectCounts, `${veh.slugFragment}-${loc.slug}`, "location_specific_vehicle", "unsupported_service", serviceId);
        continue;
      }
      const slug = `${veh.slugFragment}-${loc.slug}`;
      scanned++;
      tryAccept(
        {
          slug,
          intent: "location_specific_vehicle",
          wave: "wave2",
          tier: loc.tier,
          vehicleId: veh.id,
          locationId: loc.id,
          serviceId,
          titlePattern: `${veh.name} Rental in ${loc.name} | AroraCars`,
          h1Pattern: `${veh.name} rental in ${loc.name}`,
          primaryKeyword: `${veh.name} rental in ${loc.name}`,
          sitemapGroup: "vehicle-pages",
          contentFingerprint: fingerprintFor({
            intent: "location_specific_vehicle",
            locationName: loc.name,
            vehicle: veh.name,
            service: veh.category,
            useCases: [
              ...loc.facts.useCases.slice(0, 2),
              `Verified models: ${veh.verifiedModels.join(", ")}`,
              "Enquiry-led availability — not a guaranteed local lot claim",
            ],
            nearby: loc.facts.nearbyDestinations,
            transport: loc.facts.transportNotes,
            tourism: loc.facts.tourismContext,
          }),
          imageKeys: [veh.imageKey, ...loc.imageKeys],
          enquiryCity: loc.name,
          intentKeyStr: intentKey({
            intent: "location_specific_vehicle",
            vehicleId: veh.id,
            locationId: loc.id,
          }),
        },
        state
      );
    }
  }

  // ——— 7) Airport / railway hub pages (standalone) ———
  for (const loc of SEO_LOCATIONS.filter((l) => l.locationType === "airport" || l.locationType === "railway_station")) {
    const isAirport = loc.locationType === "airport";
    const slug = isAirport ? `${loc.slug}-taxi` : `${loc.slug}-taxi`;
    scanned++;
    tryAccept(
      {
        slug,
        intent: isAirport ? "airport_destination" : "railway_destination",
        wave: "wave2",
        tier: loc.tier,
        serviceId: isAirport ? "airport_taxi" : "railway_taxi",
        locationId: loc.id,
        titlePattern: `${loc.name} Taxi | Pickup & Drop | AroraCars`,
        h1Pattern: `${loc.name} taxi`,
        primaryKeyword: `${loc.name} taxi`,
        sitemapGroup: isAirport ? "airport-transfer" : "railway-transfer",
        contentFingerprint: fingerprintFor({
          intent: isAirport ? "airport_destination" : "railway_destination",
          locationName: loc.name,
          service: isAirport ? "airport_taxi" : "railway_taxi",
          useCases: loc.facts.useCases,
          nearby: loc.facts.nearbyDestinations,
          transport: loc.facts.transportNotes,
          tourism: loc.facts.tourismContext,
        }),
        imageKeys: loc.imageKeys,
        enquiryCity: LOCATION_BY_ID.get(loc.parentId || "")?.name || "Dehradun",
        intentKeyStr: `hub:${isAirport ? "airport" : "railway"}:${loc.id}`,
      },
      state
    );
  }

  // Fill related hints among proposed + note locked hubs
  const withRelated = accepted.map((p) => ({
    ...p,
    relatedHints: relatedHintsFor(p, accepted),
  }));

  const byIntent: Record<string, number> = {};
  const bySitemapGroup: Record<string, number> = {};
  for (const p of withRelated) {
    byIntent[p.intent] = (byIntent[p.intent] || 0) + 1;
    bySitemapGroup[p.sitemapGroup] = (bySitemapGroup[p.sitemapGroup] || 0) + 1;
  }

  // Capacity estimate (architecture potential, not index now)
  const locN = SEO_LOCATIONS.filter((l) => l.indexableEligible).length;
  const svcN = 8; // practical distinct families used in generation
  const vehN = SEO_VEHICLE_INTENTS.length;
  const routeDirs = expandRouteDirections(SEO_ROUTES).length;
  const theoretical =
    locN * 4 + // taxi/car/bike/scooty rough
    routeDirs +
    locN * 2 + // sightseeing/hill
    pilgrimGateways.length * pilgrimTargets.length +
    vehicleCities.length * vehN;

  const rejectedTotal = Object.values(rejectCounts).reduce((a, b) => a + b, 0);

  return {
    wave: "wave2",
    generatedAt: new Date().toISOString(),
    totalProposed: withRelated.length,
    byIntent,
    bySitemapGroup,
    rejectedTotal,
    rejectedByReason: rejectCounts,
    pages: withRelated.sort((a, b) => a.slug.localeCompare(b.slug)),
    rejectionsSample: rejections,
    capacityEstimate: {
      locations: locN,
      servicesOffered: svcN,
      vehicleIntents: vehN,
      curatedRoutes: SEO_ROUTES.length,
      theoreticalCombinations: theoretical,
      note: `Scanned ~${scanned} candidates this run. Theoretical ~${theoretical} from current graphs; 10k+ requires more locations/routes/waves — not blind A×B×C.`,
    },
    locationCounts: {
      ...locationsByType(),
      seedVehicleCategories: Object.keys(verifiedCategoryCounts()).length,
    },
  };
}

/** Human-readable summary lines */
export function formatManifestReport(m: WaveManifest): string {
  const lines: string[] = [];
  lines.push("ARORACARS — WAVE 2 SEO MANIFEST (PREVIEW — NOT PUBLISHED)");
  lines.push(`Generated: ${m.generatedAt}`);
  lines.push("");
  lines.push(`TOTAL PROPOSED: ${m.totalProposed}`);
  lines.push("");
  lines.push("By intent:");
  for (const [k, v] of Object.entries(m.byIntent).sort()) lines.push(`  ${k}: ${v}`);
  lines.push("");
  lines.push("By sitemap group:");
  for (const [k, v] of Object.entries(m.bySitemapGroup).sort()) lines.push(`  ${k}: ${v}`);
  lines.push("");
  lines.push(`Rejected combinations: ${m.rejectedTotal}`);
  lines.push("Rejection categories:");
  for (const [k, v] of Object.entries(m.rejectedByReason).sort((a, b) => b[1] - a[1])) {
    lines.push(`  ${k}: ${v}`);
  }
  lines.push("");
  lines.push("Capacity (architecture potential, not indexable now):");
  lines.push(`  locations: ${m.capacityEstimate.locations}`);
  lines.push(`  curated routes: ${m.capacityEstimate.curatedRoutes}`);
  lines.push(`  vehicle intents: ${m.capacityEstimate.vehicleIntents}`);
  lines.push(`  theoretical from current graphs: ${m.capacityEstimate.theoreticalCombinations}`);
  lines.push(`  ${m.capacityEstimate.note}`);
  lines.push("");
  lines.push("Sample proposed slugs:");
  for (const p of m.pages.slice(0, 40)) {
    lines.push(`  /${p.slug}  [${p.intent} | tier ${p.tier} | ${p.sitemapGroup}]`);
  }
  if (m.pages.length > 40) lines.push(`  … +${m.pages.length - 40} more`);
  lines.push("");
  lines.push("Sample rejections:");
  for (const r of m.rejectionsSample.slice(0, 25)) {
    lines.push(`  ${r.slug} — ${r.reason}: ${r.detail}`);
  }
  lines.push("");
  lines.push("STOP: Wave 2 is NOT published. Set WAVE_CONFIG.wave2.publish=true only after explicit approval.");
  return lines.join("\n");
}
