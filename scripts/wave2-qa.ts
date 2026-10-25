/**
 * Wave 2 production QA — frozen manifest baseline, published pages, sitemap, attribution hooks.
 */
import { getPage, LANDING_PAGES, WAVE2_PAGES, WAVE2_PUBLISH_STATS, WAVE2_PAGE_SLUGS } from "../data/pages";
import { WAVE1_PAGE_SLUGS } from "../data/wave1-pages";
import { TAXI_PAGE_SLUGS } from "../data/taxi-pages";
import { wave2ContentSimilarity, getFrozenManifestSlugCount } from "../data/seo-engine/publish-from-manifest";
import { WAVE_CONFIG } from "../data/seo-engine/waves";
import { landingEntries } from "../lib/sitemap-sets";
import fs from "node:fs";
import path from "node:path";

const problems: string[] = [];
const warnings: string[] = [];

const baseline = getFrozenManifestSlugCount();
const stats = WAVE2_PUBLISH_STATS;

if (baseline !== 302) problems.push(`frozen manifest baseline expected 302, got ${baseline}`);
if (!WAVE_CONFIG.wave2.publish) problems.push("WAVE_CONFIG.wave2.publish must be true for production");
if (stats.baselineTotal !== baseline) problems.push(`publish baseline ${stats.baselineTotal} != frozen ${baseline}`);
if (WAVE2_PAGES.length !== stats.publishedTotal) problems.push("WAVE2_PAGES length mismatch vs stats");
if (WAVE2_PAGES.length < 200) problems.push(`published too few: ${WAVE2_PAGES.length}`);

// No collision with Wave1 / taxi
for (const p of WAVE2_PAGES) {
  if (WAVE1_PAGE_SLUGS.has(p.slug)) problems.push(`collides Wave1 ${p.slug}`);
  if (TAXI_PAGE_SLUGS.has(p.slug)) problems.push(`collides taxi ${p.slug}`);
}

const titles = new Set<string>();
const h1s = new Set<string>();
const descriptions = new Set<string>();
const entries = landingEntries();
const allLocs = Object.values(entries)
  .flat()
  .map((e) => e.loc);

for (const page of WAVE2_PAGES) {
  const live = getPage(page.slug);
  if (!live) {
    problems.push(`getPage miss ${page.slug}`);
    continue;
  }
  if (!live.enquiryCity) problems.push(`no enquiryCity ${page.slug}`);
  if (!live.heroImage) problems.push(`no hero ${page.slug}`);
  if (!live.gallery?.length) problems.push(`no gallery ${page.slug}`);
  if (live.faqs.length < 3) problems.push(`faqs ${page.slug}`);
  if (live.sections.length < 2) problems.push(`thin sections ${page.slug}`);
  if (titles.has(live.title)) problems.push(`dup title ${page.slug}`);
  titles.add(live.title);
  if (h1s.has(live.h1)) problems.push(`dup h1 ${page.slug}`);
  h1s.add(live.h1);
  if (descriptions.has(live.description)) problems.push(`dup description ${page.slug}`);
  descriptions.add(live.description);

  if (!allLocs.some((l) => l.endsWith(`/${page.slug}`))) {
    problems.push(`sitemap missing ${page.slug}`);
  }

  for (const rel of live.relatedSlugs) {
    if (!getPage(rel)) problems.push(`broken related ${page.slug} -> ${rel}`);
  }

  const blob = [live.intro, ...live.sections.map((s) => s.body)].join(" ").toLowerCase();
  for (const banned of ["cheapest", "#1 taxi", "best taxi in uttarakhand", "₹999", "guaranteed availability", "aggregaterating"]) {
    if (blob.includes(banned)) problems.push(`banned claim ${banned} on ${page.slug}`);
  }

  // Pilgrimage accuracy
  if (page.slug.includes("kedarnath") && /taxi drives? (to|into) kedarnath temple/i.test(blob)) {
    problems.push(`misleading kedarnath claim ${page.slug}`);
  }
}

// LANDING_PAGES includes wave2
const inLanding = LANDING_PAGES.filter((p) => WAVE2_PAGE_SLUGS.has(p.slug)).length;
if (inLanding !== WAVE2_PAGES.length) problems.push(`LANDING_PAGES wave2 count ${inLanding}`);

const sim = wave2ContentSimilarity(WAVE2_PAGES, 0.92);
if (sim.length > 15) problems.push(`too many similarity pairs ≥92%: ${sim.length}`);
else if (sim.length) warnings.push(`similarity pairs ≥92%: ${sim.length}`);

const report = {
  ok: problems.length === 0,
  frozenBaseline: baseline,
  published: WAVE2_PAGES.length,
  rejectedAtPublish: stats.rejectedTotal,
  rejectedByReason: stats.rejectedByReason,
  landingTotal: LANDING_PAGES.length,
  similarityPairsOver92: sim.length,
  similaritySample: sim.slice(0, 10),
  rejectedSample: stats.rejected.slice(0, 25),
  wave2Publish: WAVE_CONFIG.wave2.publish,
  problems,
  warnings,
};

const outDir = path.resolve(__dirname, "../reports");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "wave2-production-qa.json"), JSON.stringify(report, null, 2));

console.log(JSON.stringify(report, null, 2));
if (problems.length) {
  console.error("Wave 2 production QA FAILED");
  process.exit(1);
}
console.log("Wave 2 production QA passed.");
