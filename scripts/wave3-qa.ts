/**
 * Wave 3 production QA — connectivity pages from frozen manifest.
 */
import fs from "node:fs";
import path from "node:path";
import {
  getPage,
  LANDING_PAGES,
  WAVE2_PAGE_SLUGS,
  WAVE3_PAGES,
  WAVE3_PUBLISH_STATS,
  WAVE3_PAGE_SLUGS,
} from "../data/pages";
import { WAVE1_PAGE_SLUGS } from "../data/wave1-pages";
import { TAXI_PAGE_SLUGS } from "../data/taxi-pages";
import { getFrozenWave3ManifestSlugCount, wave3ContentSimilarity } from "../data/seo-engine/publish-wave3-from-manifest";
import { WAVE_CONFIG } from "../data/seo-engine/waves";
import { landingEntries } from "../lib/sitemap-sets";

const problems: string[] = [];
const warnings: string[] = [];

const baseline = getFrozenWave3ManifestSlugCount();
const stats = WAVE3_PUBLISH_STATS;

if (!WAVE_CONFIG.wave3.publish) problems.push("WAVE_CONFIG.wave3.publish must be true");
if (stats.baselineTotal !== baseline) problems.push(`publish baseline ${stats.baselineTotal} != frozen ${baseline}`);
if (WAVE3_PAGES.length !== stats.publishedTotal) problems.push("WAVE3_PAGES length mismatch");
if (WAVE3_PAGES.length < 80) problems.push(`published too few: ${WAVE3_PAGES.length}`);

for (const p of WAVE3_PAGES) {
  if (WAVE1_PAGE_SLUGS.has(p.slug)) problems.push(`collides Wave1 ${p.slug}`);
  if (TAXI_PAGE_SLUGS.has(p.slug)) problems.push(`collides taxi ${p.slug}`);
  if (WAVE2_PAGE_SLUGS.has(p.slug)) problems.push(`collides Wave2 ${p.slug}`);
}

const titles = new Set<string>();
const h1s = new Set<string>();
const descriptions = new Set<string>();
const allLocs = Object.values(landingEntries())
  .flat()
  .map((e) => e.loc);

for (const page of WAVE3_PAGES) {
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
  if (!allLocs.some((l) => l.endsWith(`/${page.slug}`))) problems.push(`sitemap missing ${page.slug}`);
  for (const rel of live.relatedSlugs) {
    if (!getPage(rel)) problems.push(`broken related ${page.slug} -> ${rel}`);
  }
  const blob = [live.intro, ...live.sections.map((s) => s.body)].join(" ").toLowerCase();
  for (const banned of ["cheapest", "#1 taxi", "best taxi in uttarakhand", "₹999", "guaranteed availability"]) {
    if (blob.includes(banned)) problems.push(`banned ${banned} on ${page.slug}`);
  }
}

const inLanding = LANDING_PAGES.filter((p) => WAVE3_PAGE_SLUGS.has(p.slug)).length;
if (inLanding !== WAVE3_PAGES.length) problems.push(`LANDING_PAGES wave3 count ${inLanding}`);

const sim = wave3ContentSimilarity(WAVE3_PAGES, 0.92);
if (sim.length > 15) problems.push(`too many similarity pairs ≥92%: ${sim.length}`);
else if (sim.length) warnings.push(`similarity pairs ≥92%: ${sim.length}`);

const report = {
  ok: problems.length === 0,
  frozenBaseline: baseline,
  published: WAVE3_PAGES.length,
  rejectedAtPublish: stats.rejectedTotal,
  rejectedByReason: stats.rejectedByReason,
  landingTotal: LANDING_PAGES.length,
  similarityPairsOver92: sim.length,
  wave3Publish: WAVE_CONFIG.wave3.publish,
  problems,
  warnings,
};

const outDir = path.resolve(__dirname, "../reports");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "wave3-production-qa.json"), JSON.stringify(report, null, 2));

console.log(JSON.stringify(report, null, 2));
if (problems.length) {
  console.error("Wave 3 production QA FAILED");
  process.exit(1);
}
console.log("Wave 3 production QA passed.");
