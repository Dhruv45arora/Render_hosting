import { SERVICE_CANONICAL } from "./services";
import { slugCollision } from "./slug-registry";
import type { EligibilityInput, EligibilityResult, IndexTier } from "./types";

const TIER_RANK: Record<IndexTier, number> = { A: 3, B: 2, C: 1 };

export function tierAtLeast(have: IndexTier, need: IndexTier): boolean {
  return TIER_RANK[have] >= TIER_RANK[need];
}

/**
 * Core gate: LOCATION + SERVICE + DISTINCT INTENT + CONTENT + NOT DUPLICATE.
 */
export function shouldGeneratePage(input: EligibilityInput): EligibilityResult {
  const reasons: string[] = [];

  if (slugCollision(input.slug, input.lockedSlugs, input.proposedSlugs)) {
    return { ok: false, reason: "slug_collision", detail: `Slug already locked or proposed: ${input.slug}` };
  }

  if (input.intentKeys.has(input.intentKey)) {
    return {
      ok: false,
      reason: "cannibalization",
      detail: `Intent already satisfied: ${input.intentKey}`,
    };
  }

  if (input.service && SERVICE_CANONICAL[input.service.id]) {
    return {
      ok: false,
      reason: "duplicate_intent",
      detail: `${input.service.id} aliases canonical ${SERVICE_CANONICAL[input.service.id]}`,
    };
  }

  if (input.service && !input.service.offered) {
    return { ok: false, reason: "unsupported_service", detail: input.service.id };
  }

  if (input.vehicle && !input.vehicle.verifiedModels.length) {
    return { ok: false, reason: "unsupported_vehicle", detail: input.vehicle.id };
  }

  if (input.origin && input.destination && input.origin.id === input.destination.id) {
    return { ok: false, reason: "origin_equals_destination", detail: input.origin.id };
  }

  // Geography / location validity
  const places = [input.location, input.origin, input.destination].filter(Boolean);
  for (const p of places) {
    if (!p!.indexableEligible) {
      return { ok: false, reason: "geography_mismatch", detail: `${p!.id} not indexableEligible` };
    }
  }

  // Service relevance on location pages
  if (input.location && input.service) {
    if (!input.location.relevantServices.includes(input.service.id)) {
      return {
        ok: false,
        reason: "unsupported_service",
        detail: `${input.service.id} not relevant for ${input.location.id}`,
      };
    }
    if (!tierAtLeast(input.location.tier, input.service.minTier)) {
      return {
        ok: false,
        reason: "tier_gated",
        detail: `location tier ${input.location.tier} < service min ${input.service.minTier}`,
      };
    }
  }

  // Route commercial relevance
  if (input.route) {
    if (input.route.relevance < 2) {
      return { ok: false, reason: "weak_commercial_relevance", detail: `route relevance ${input.route.relevance}` };
    }
    if (!input.origin || !input.destination) {
      return { ok: false, reason: "invalid_route", detail: "missing origin/destination" };
    }
    // Cross-region weak routes without manual/hub signals
    if (
      input.origin.region !== input.destination.region &&
      input.origin.region !== "external" &&
      input.destination.region !== "external" &&
      !input.route.signals.includes("manually_approved") &&
      input.route.relevance < 3
    ) {
      return {
        ok: false,
        reason: "geography_mismatch",
        detail: `cross-region ${input.origin.region}→${input.destination.region} without strong signal`,
      };
    }
  }

  // Pilgrimage accuracy — never claim drive-to-temple for roadhead-only
  if (
    (input.intent === "pilgrimage" || input.intent === "route_taxi" || input.intent === "airport_destination") &&
    input.destination?.roadheadOnly &&
    input.slug.includes("kedarnath") &&
    !input.slug.includes("from") &&
    !input.slug.includes("road")
  ) {
    // allow known patterns; block misleading "taxi-in-kedarnath" style
  }
  if (input.location?.roadheadOnly && input.intent === "location_service" && input.service?.family !== "taxi") {
    return {
      ok: false,
      reason: "pilgrimage_accuracy",
      detail: `${input.location.id} is roadhead-only; rental categories blocked`,
    };
  }
  if (input.destination?.id === "gaurikund" && input.intent === "route_taxi") {
    return {
      ok: false,
      reason: "not_motorable_endpoint",
      detail: "Prefer Sonprayag / Kedarnath road-access wording over Gaurikund endpoint pages in Wave 2",
    };
  }

  // Vehicle pages: tourist locations + verified inventory only
  if (input.vehicle) {
    if (!input.location) {
      return { ok: false, reason: "geography_mismatch", detail: "vehicle page needs location" };
    }
    if (input.vehicle.touristLocationsOnly && input.location.tourismRelevance < 2) {
      return {
        ok: false,
        reason: "weak_commercial_relevance",
        detail: `vehicle ${input.vehicle.id} needs stronger tourism location`,
      };
    }
    // Wave 2 allows Tier B tourist towns for hero vehicles
    if (!tierAtLeast(input.location.tier, "B")) {
      return { ok: false, reason: "tier_gated", detail: "vehicle pages need Tier A/B" };
    }
    // Self-drive vehicle SEO outside Dehradun is enquiry-only — still allowed for Tier A tourist cities
    if (input.location.id !== "dehradun" && input.location.tier === "C") {
      return { ok: false, reason: "weak_commercial_relevance", detail: "vehicle SEO blocked for Tier C" };
    }
  }

  // Self-drive strong pages: prefer Dehradun + select tourist cities
  if (input.service?.selfDrive && !input.service.withDriver && input.location) {
    const okSelfDrive =
      input.location.id === "dehradun" ||
      (input.location.tier === "A" && input.location.tourismRelevance >= 2);
    if (!okSelfDrive) {
      return {
        ok: false,
        reason: "unsupported_service",
        detail: `self-drive ${input.service.id} not opened for ${input.location.id} in Wave 2`,
      };
    }
  }

  // Content uniqueness — need enough structured facts
  if (input.contentFingerprint.length < 3) {
    return {
      ok: false,
      reason: "insufficient_unique_content",
      detail: `fingerprint size ${input.contentFingerprint.length}`,
    };
  }

  // Sightseeing only for real tourism destinations
  if (input.intent === "sightseeing" && input.location && input.location.tourismRelevance < 2) {
    return { ok: false, reason: "weak_commercial_relevance", detail: "sightseeing needs tourismRelevance≥2" };
  }

  // Images: require at least one resolvable key (checked by caller via fingerprint/imageKeys)
  reasons.push("geography_ok", "intent_distinct", "content_facts_present");
  return { ok: true, reasons };
}

export function fingerprintFor(parts: {
  locationName?: string;
  originName?: string;
  destinationName?: string;
  useCases?: string[];
  nearby?: string[];
  transport?: string[];
  tourism?: string[];
  intent: string;
  service?: string;
  vehicle?: string;
}): string[] {
  const fp: string[] = [`intent:${parts.intent}`];
  if (parts.locationName) fp.push(`loc:${parts.locationName}`);
  if (parts.originName) fp.push(`origin:${parts.originName}`);
  if (parts.destinationName) fp.push(`dest:${parts.destinationName}`);
  if (parts.service) fp.push(`svc:${parts.service}`);
  if (parts.vehicle) fp.push(`veh:${parts.vehicle}`);
  for (const u of parts.useCases || []) fp.push(`use:${u}`);
  for (const n of parts.nearby || []) fp.push(`near:${n}`);
  for (const t of parts.transport || []) fp.push(`tx:${t}`);
  for (const t of parts.tourism || []) fp.push(`tour:${t}`);
  return fp;
}

/** Jaccard similarity over fingerprint tokens — for QA duplicate detection. */
export function fingerprintSimilarity(a: string[], b: string[]): number {
  const A = new Set(a);
  const B = new Set(b);
  let inter = 0;
  A.forEach((x) => {
    if (B.has(x)) inter++;
  });
  const union = A.size + B.size - inter;
  return union === 0 ? 0 : inter / union;
}
