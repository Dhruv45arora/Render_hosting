/**
 * Generate Wave 3 connectivity manifest → reports/wave3-manifest.json
 */
import fs from "node:fs";
import path from "node:path";
import { CORE_LANDING_SLUGS, WAVE2_PAGE_SLUGS } from "../data/pages";
import { buildWave3Manifest, formatWave3ManifestReport } from "../data/seo-engine/generate-wave3";
import wave2Manifest from "../reports/wave2-manifest.json";

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "reports");
fs.mkdirSync(outDir, { recursive: true });

const wave2IntentKeys = (wave2Manifest.pages || [])
  .map((p: { intentKeyStr?: string }) => p.intentKeyStr)
  .filter(Boolean) as string[];

const manifest = buildWave3Manifest({
  coreLandingSlugs: CORE_LANDING_SLUGS,
  alreadyPublishedSlugs: WAVE2_PAGE_SLUGS,
  alreadyPublishedIntentKeys: wave2IntentKeys,
});

const report = formatWave3ManifestReport(manifest);
fs.writeFileSync(path.join(outDir, "wave3-manifest.json"), JSON.stringify(manifest, null, 2));
fs.writeFileSync(path.join(outDir, "wave3-manifest.txt"), report);

console.log(report);
console.log("");
console.log(`Wrote reports/wave3-manifest.json (${manifest.totalProposed} proposed, ${manifest.rejectedTotal} rejected)`);
