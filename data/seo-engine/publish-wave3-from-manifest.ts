import type { LandingPage } from "../pages";
import { buildLandingFromCandidate } from "./build-landing";
import { fingerprintSimilarity, shouldGeneratePage } from "./eligibility";
import { LOCATION_BY_ID } from "./locations";
import { buildProductionLockedSlugs } from "./production-locked-slugs";
import { SEO_ROUTES } from "./routes";
import { SERVICE_BY_ID } from "./services";
import { existingIntentKeys, intentKey, normalizeSlug } from "./slug-registry";
import type { ManifestRejection, PageCandidate, RejectionReason, WaveManifest } from "./types";

import manifestJson from "../../reports/wave3-manifest.json";
import wave2ManifestJson from "../../reports/wave2-manifest.json";

export type Wave3PublishResult = {
  pages: LandingPage[];
  publishedCandidates: PageCandidate[];
  rejected: ManifestRejection[];
  rejectedByReason: Record<string, number>;
  baselineTotal: number;
  publishedTotal: number;
};

function reject(
  list: ManifestRejection[],
  counts: Record<string, number>,
  slug: string,
  intent: PageCandidate["intent"],
  reason: RejectionReason,
  detail: string
) {
  counts[reason] = (counts[reason] || 0) + 1;
  list.push({ slug, intent, reason, detail });
}

export function publishWave3FromManifest(
  coreLandingSlugs: Iterable<string>,
  wave2Slugs: Iterable<string>
): Wave3PublishResult {
  const manifest = manifestJson as WaveManifest;
  const locked = buildProductionLockedSlugs(coreLandingSlugs, wave2Slugs);
  const intentKeys = existingIntentKeys();
  for (const p of (wave2ManifestJson as WaveManifest).pages || []) {
    const ik = (p as PageCandidate & { intentKeyStr?: string }).intentKeyStr;
    if (ik) intentKeys.add(ik);
  }
  const proposed = new Set<string>();
  const rejected: ManifestRejection[] = [];
  const rejectedByReason: Record<string, number> = {};
  const publishedCandidates: PageCandidate[] = [];
  const landings: LandingPage[] = [];

  const knownSlugs = new Set<string>(locked);
  for (const c of manifest.pages) knownSlugs.add(normalizeSlug(c.slug));
  knownSlugs.add("taxi");

  for (const raw of manifest.pages) {
    const c = raw as PageCandidate & { intentKeyStr?: string };
    const slug = normalizeSlug(c.slug);

    if (locked.has(slug)) {
      reject(rejected, rejectedByReason, slug, c.intent, "slug_collision", "Collides with pre-Wave3 production slug");
      continue;
    }
    if (proposed.has(slug)) {
      reject(rejected, rejectedByReason, slug, c.intent, "slug_collision", "Duplicate inside Wave 3 manifest");
      continue;
    }

    const location = c.locationId ? LOCATION_BY_ID.get(c.locationId) : undefined;
    const origin = c.originId ? LOCATION_BY_ID.get(c.originId) : undefined;
    const destination = c.destinationId ? LOCATION_BY_ID.get(c.destinationId) : undefined;
    const service = c.serviceId ? SERVICE_BY_ID.get(c.serviceId) : undefined;
    const route = SEO_ROUTES.find(
      (r) =>
        (r.originId === c.originId && r.destinationId === c.destinationId) ||
        (r.bidirectional && r.originId === c.destinationId && r.destinationId === c.originId)
    );

    const ik =
      c.intentKeyStr ||
      intentKey({
        intent: c.intent,
        locationId: c.locationId,
        originId: c.originId,
        destinationId: c.destinationId,
        serviceId: c.serviceId,
        vehicleId: c.vehicleId,
      });

    const elig = shouldGeneratePage({
      location,
      origin,
      destination,
      service,
      route,
      intent: c.intent,
      slug,
      wave: "wave3",
      contentFingerprint: c.contentFingerprint || [],
      lockedSlugs: locked,
      proposedSlugs: proposed,
      intentKeys,
      intentKey: ik,
    });

    if (!elig.ok) {
      reject(rejected, rejectedByReason, slug, c.intent, elig.reason, elig.detail);
      continue;
    }

    if (!c.imageKeys?.length) {
      reject(rejected, rejectedByReason, slug, c.intent, "missing_image_policy", "No imageKeys");
      continue;
    }

    const landing = buildLandingFromCandidate(
      { ...c, slug, indexable: true, published: true, source: "proposed" },
      knownSlugs
    );
    if (!landing || landing.sections.length < 2 || !landing.heroImage) {
      reject(rejected, rejectedByReason, slug, c.intent, "insufficient_unique_content", "Builder failed quality bar");
      continue;
    }

    const blob = [landing.intro, ...landing.sections.map((s) => s.body), landing.description].join(" ").toLowerCase();
    let bannedHit = "";
    for (const banned of ["cheapest", "#1", "best taxi in", "guaranteed availability", "₹999", "aggregaterating"]) {
      if (blob.includes(banned)) {
        bannedHit = banned;
        break;
      }
    }
    if (bannedHit) {
      reject(rejected, rejectedByReason, slug, c.intent, "insufficient_unique_content", `Banned claim: ${bannedHit}`);
      continue;
    }

    proposed.add(slug);
    intentKeys.add(ik);
    publishedCandidates.push({ ...c, slug, indexable: true, published: true, source: "proposed" });
    landings.push(landing);
  }

  const publishedSet = new Set(landings.map((p) => p.slug));
  for (const p of landings) {
    p.relatedSlugs = p.relatedSlugs.filter((s) => locked.has(s) || publishedSet.has(s)).slice(0, 8);
  }

  const titles = new Map<string, string>();
  const h1s = new Map<string, string>();
  const finalPages: LandingPage[] = [];
  const finalCandidates: PageCandidate[] = [];
  for (let i = 0; i < landings.length; i++) {
    const p = landings[i];
    const c = publishedCandidates[i];
    if (titles.has(p.title)) {
      reject(rejected, rejectedByReason, p.slug, c.intent, "cannibalization", `Duplicate title vs ${titles.get(p.title)}`);
      continue;
    }
    if (h1s.has(p.h1)) {
      reject(rejected, rejectedByReason, p.slug, c.intent, "cannibalization", `Duplicate H1 vs ${h1s.get(p.h1)}`);
      continue;
    }
    titles.set(p.title, p.slug);
    h1s.set(p.h1, p.slug);
    finalPages.push(p);
    finalCandidates.push(c);
  }

  return {
    pages: finalPages,
    publishedCandidates: finalCandidates,
    rejected,
    rejectedByReason,
    baselineTotal: manifest.totalProposed,
    publishedTotal: finalPages.length,
  };
}

export function wave3ContentSimilarity(pages: LandingPage[], threshold = 0.92) {
  const fps = pages.map((p) => ({
    slug: p.slug,
    fp: [`h1:${p.h1}`, ...p.sections.map((s) => `sec:${s.heading}:${s.body.slice(0, 120)}`), `intro:${p.intro.slice(0, 120)}`],
  }));
  const hits: Array<{ a: string; b: string; similarity: number }> = [];
  for (let i = 0; i < fps.length; i++) {
    for (let j = i + 1; j < fps.length; j++) {
      const sim = fingerprintSimilarity(fps[i].fp, fps[j].fp);
      if (sim >= threshold) hits.push({ a: fps[i].slug, b: fps[j].slug, similarity: Math.round(sim * 1000) / 10 });
    }
  }
  return hits;
}

export function getFrozenWave3ManifestSlugCount(): number {
  return (manifestJson as WaveManifest).totalProposed;
}
