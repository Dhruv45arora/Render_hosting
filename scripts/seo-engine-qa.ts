/**
 * SEO engine architecture QA — Wave 2 preview safety (no publish).
 */
import { CORE_LANDING_SLUGS, WAVE2_PAGE_SLUGS } from "../data/pages";
import { WAVE1_PAGE_SLUGS } from "../data/wave1-pages";
import { TAXI_PAGE_SLUGS } from "../data/taxi-pages";
import { buildWave2Manifest } from "../data/seo-engine/generate-wave2";
import { LOCATION_BY_ID, SEO_LOCATIONS } from "../data/seo-engine/locations";
import { buildProductionLockedSlugs } from "../data/seo-engine/production-locked-slugs";
import { expandRouteDirections, SEO_ROUTES } from "../data/seo-engine/routes";
import { SEO_SERVICES } from "../data/seo-engine/services";
import { findSimilarPages } from "../data/seo-engine/similarity";
import { normalizeSlug } from "../data/seo-engine/slug-registry";
import { SEO_VEHICLE_INTENTS, verifiedCategoryCounts } from "../data/seo-engine/vehicles";
import { WAVE_CONFIG } from "../data/seo-engine/waves";
import { SEED_VEHICLES } from "../data/vehicles";

const errors: string[] = [];
const warnings: string[] = [];

function assert(cond: boolean, msg: string) {
  if (!cond) errors.push(msg);
}

function warn(cond: boolean, msg: string) {
  if (!cond) warnings.push(msg);
}

// ——— Structural ———
assert(SEO_LOCATIONS.length >= 40, `expected ≥40 locations, got ${SEO_LOCATIONS.length}`);
assert(SEO_SERVICES.some((s) => s.id === "taxi_service" && s.offered), "taxi_service must be offered");
assert(SEO_VEHICLE_INTENTS.every((v) => v.verifiedModels.length > 0), "vehicle intents must be verified against seed");
assert(WAVE_CONFIG.wave2.enabled, "Wave 2 must be enabled");
// publish may be true after production approval — architecture QA still validates capacity/eligibility

// No fabricated vehicle categories
const seedCats = new Set(SEED_VEHICLES.map((v) => v.category));
for (const v of SEO_VEHICLE_INTENTS) {
  assert(seedCats.has(v.category) || ["bike", "scooty", "car", "suv", "luxury"].includes(v.category), `bad vehicle category ${v.category}`);
}

// Locations unique ids/slugs
{
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const l of SEO_LOCATIONS) {
    assert(!ids.has(l.id), `duplicate location id ${l.id}`);
    assert(!slugs.has(l.slug), `duplicate location slug ${l.slug}`);
    ids.add(l.id);
    slugs.add(l.slug);
    assert(l.facts.useCases.length >= 1, `${l.id} missing useCases`);
    for (const n of l.nearbyIds) {
      warn(LOCATION_BY_ID.has(n), `${l.id} nearby missing: ${n}`);
    }
  }
}

// Routes valid
for (const r of SEO_ROUTES) {
  assert(LOCATION_BY_ID.has(r.originId), `route origin missing ${r.originId}`);
  assert(LOCATION_BY_ID.has(r.destinationId), `route dest missing ${r.destinationId}`);
  assert(r.originId !== r.destinationId, `route origin=dest ${r.id}`);
}

// ——— Manifest ———
const manifest = buildWave2Manifest();
assert(manifest.totalProposed >= 200, `Wave 2 proposed too small: ${manifest.totalProposed}`);
assert(manifest.totalProposed <= 800, `Wave 2 proposed too large (thin risk): ${manifest.totalProposed}`);
assert(manifest.rejectedTotal > 0, "expected some rejections from eligibility");

const proposedSlugs = new Set(manifest.pages.map((p) => normalizeSlug(p.slug)));
assert(proposedSlugs.size === manifest.pages.length, "duplicate slugs inside Wave 2 manifest");

const preWave2Locked = buildProductionLockedSlugs(CORE_LANDING_SLUGS);
for (const p of manifest.pages) {
  assert(!preWave2Locked.has(normalizeSlug(p.slug)), `Wave 2 collides with pre-Wave2 slug: ${p.slug}`);
  assert(p.contentFingerprint.length >= 3, `${p.slug} thin fingerprint`);
  assert(p.imageKeys.length >= 1, `${p.slug} missing imageKeys`);
  if (p.originId && p.destinationId) {
    assert(p.originId !== p.destinationId, `origin=dest ${p.slug}`);
  }
  if (p.slug.includes("kedarnath") && p.intent === "location_service" && p.serviceId === "car_rental") {
    errors.push(`dangerous kedarnath car rental page: ${p.slug}`);
  }
}

// Must not break existing slug sets (Wave 2 production may already include published slugs)
for (const s of WAVE1_PAGE_SLUGS) {
  assert(!proposedSlugs.has(normalizeSlug(s)), `Wave 2 steals Wave1 slug ${s}`);
}
for (const s of TAXI_PAGE_SLUGS) {
  assert(!proposedSlugs.has(normalizeSlug(s)), `Wave 2 steals taxi slug ${s}`);
}
for (const s of CORE_LANDING_SLUGS) {
  assert(!proposedSlugs.has(normalizeSlug(s)), `Wave 2 steals core slug ${s}`);
}
assert(WAVE2_PAGE_SLUGS.size > 0, "Wave 2 production pages should be mounted when publish=true");

// Cannibalization aliases blocked
for (const bad of ["taxi-in-dehradun", "dehradun-mussoorie-taxi"]) {
  assert(!proposedSlugs.has(bad), `alias slug leaked: ${bad}`);
}

// Similarity — warn on high pairs (hard-fail only if extreme volume)
const sim = findSimilarPages(manifest.pages, 0.92);
warn(sim.length < 30, `high similarity pairs (≥92%): ${sim.length}`);
for (const h of sim.slice(0, 5)) {
  warn(false, `similar ${h.similarity}%: ${h.a} ↔ ${h.b}`);
}

// Dangerous combinations correctly prevented (spot checks)
const rejectedReasons = new Set(Object.keys(manifest.rejectedByReason));
assert(rejectedReasons.has("cannibalization") || rejectedReasons.has("slug_collision"), "expected cannibalization/slug rejects");

// Spot-check: Gaurikund endpoint routes rejected or absent
assert(
  !manifest.pages.some((p) => p.destinationId === "gaurikund"),
  "Gaurikund must not be a Wave 2 route endpoint"
);

// Capacity note sanity
assert(manifest.capacityEstimate.theoreticalCombinations > manifest.totalProposed, "capacity should exceed proposed");

const summary = {
  ok: errors.length === 0,
  locations: SEO_LOCATIONS.length,
  routes: SEO_ROUTES.length,
  routeDirections: expandRouteDirections().length,
  services: SEO_SERVICES.filter((s) => s.offered).length,
  vehicleIntents: SEO_VEHICLE_INTENTS.length,
  seedVehiclesByCategory: verifiedCategoryCounts(),
  wave2Proposed: manifest.totalProposed,
  wave2Rejected: manifest.rejectedTotal,
  rejectedByReason: manifest.rejectedByReason,
  byIntent: manifest.byIntent,
  similarityPairsOver92: sim.length,
  wave2Publish: WAVE_CONFIG.wave2.publish,
  errors,
  warnings,
};

console.log(JSON.stringify(summary, null, 2));
if (errors.length) {
  console.error("SEO engine QA FAILED");
  process.exit(1);
}
console.log("SEO engine QA passed.");
