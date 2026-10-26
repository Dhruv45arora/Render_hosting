/**
 * Wave 3 — major intercity + airport/railway connectivity.
 * Only edges tagged wave:"wave3" (+ missing hub pages for hubs).
 */
import { fingerprintFor, shouldGeneratePage } from "./eligibility";
import { relatedHintsFor } from "./linking";
import { LOCATION_BY_ID, SEO_LOCATIONS } from "./locations";
import { expandRouteDirections, SEO_ROUTES } from "./routes";
import { buildProductionLockedSlugs } from "./production-locked-slugs";
import { SERVICE_BY_ID } from "./services";
import { existingIntentKeys, intentKey } from "./slug-registry";
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
  if (list.length < 100) list.push({ slug, intent, reason, detail });
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
    indexable: false,
    published: false,
    source: "proposed",
  });
}

function locSlug(id: string): string {
  return LOCATION_BY_ID.get(id)?.slug || id;
}

export function buildWave3Manifest(opts: {
  coreLandingSlugs: Iterable<string>;
  alreadyPublishedSlugs: Iterable<string>;
  alreadyPublishedIntentKeys?: Iterable<string>;
}): WaveManifest {
  if (!isWaveEnabled("wave3")) {
    throw new Error("Wave 3 is disabled in WAVE_CONFIG");
  }

  const locked = buildProductionLockedSlugs(opts.coreLandingSlugs, opts.alreadyPublishedSlugs);
  const intentKeys = existingIntentKeys();
  if (opts.alreadyPublishedIntentKeys) {
    Array.from(opts.alreadyPublishedIntentKeys).forEach((k) => intentKeys.add(k));
  }
  const proposed = new Set<string>();
  const accepted: PageCandidate[] = [];
  const rejections: ManifestRejection[] = [];
  const rejectCounts: Record<string, number> = {};
  const state = { locked, proposed, intentKeys, accepted, rejections, rejectCounts };

  let scanned = 0;

  // ——— Wave 3 curated routes only ———
  for (const { originId, destinationId, edge } of expandRouteDirections(SEO_ROUTES)) {
    if (edge.wave !== "wave3") {
      continue;
    }
    const origin = LOCATION_BY_ID.get(originId);
    const destination = LOCATION_BY_ID.get(destinationId);
    if (!origin || !destination) {
      scanned++;
      reject(rejections, rejectCounts, `${originId}-to-${destinationId}-taxi`, "route_taxi", "invalid_route", "missing location");
      continue;
    }

    let intent: PageCandidate["intent"] = "route_taxi";
    let group: SitemapGroup = "taxi-routes";
    if (origin.locationType === "airport") {
      intent = "airport_destination";
      group = "airport-transfer";
    } else if (origin.locationType === "railway_station") {
      intent = "railway_destination";
      group = "railway-transfer";
    }

    const slug = `${locSlug(originId)}-to-${locSlug(destinationId)}-taxi`;
    scanned++;
    tryAccept(
      {
        slug,
        intent,
        wave: "wave3",
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
            `Wave 3 connectivity: ${origin.name} → ${destination.name}`,
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

  // ——— Missing airport / railway hub pages (standalone) ———
  for (const loc of SEO_LOCATIONS.filter((l) => l.locationType === "airport" || l.locationType === "railway_station")) {
    const isAirport = loc.locationType === "airport";
    const slug = `${loc.slug}-taxi`;
    scanned++;
    tryAccept(
      {
        slug,
        intent: isAirport ? "airport_destination" : "railway_destination",
        wave: "wave3",
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

  const rejectedTotal = Object.values(rejectCounts).reduce((a, b) => a + b, 0);
  const wave3Edges = SEO_ROUTES.filter((r) => r.wave === "wave3").length;

  return {
    wave: "wave3",
    generatedAt: new Date().toISOString(),
    totalProposed: withRelated.length,
    byIntent,
    bySitemapGroup,
    rejectedTotal,
    rejectedByReason: rejectCounts,
    pages: withRelated.sort((a, b) => a.slug.localeCompare(b.slug)),
    rejectionsSample: rejections,
    capacityEstimate: {
      locations: SEO_LOCATIONS.length,
      servicesOffered: 2,
      vehicleIntents: 0,
      curatedRoutes: wave3Edges,
      theoreticalCombinations: expandRouteDirections(SEO_ROUTES.filter((r) => r.wave === "wave3")).length + 10,
      note: `Wave 3 scanned ~${scanned} connectivity candidates; ${wave3Edges} curated wave3 edges.`,
    },
    locationCounts: {},
  };
}

export function formatWave3ManifestReport(m: WaveManifest): string {
  const lines: string[] = [];
  lines.push("ARORACARS — WAVE 3 SEO MANIFEST (INTERCITY + AIRPORT/RAILWAY)");
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
  lines.push(`Rejected: ${m.rejectedTotal}`);
  for (const [k, v] of Object.entries(m.rejectedByReason).sort((a, b) => b[1] - a[1])) {
    lines.push(`  ${k}: ${v}`);
  }
  lines.push("");
  lines.push("Sample proposed:");
  for (const p of m.pages.slice(0, 30)) {
    lines.push(`  /${p.slug}  [${p.intent} | ${p.sitemapGroup}]`);
  }
  if (m.pages.length > 30) lines.push(`  … +${m.pages.length - 30} more`);
  return lines.join("\n");
}
