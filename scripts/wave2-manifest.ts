/**
 * Generate Wave 2 PREVIEW manifest — does NOT publish pages into LANDING_PAGES.
 */
import fs from "node:fs";
import path from "node:path";
import { buildWave2Manifest, formatManifestReport } from "../data/seo-engine/generate-wave2";
import { findSimilarPages, formatSimilarityReport } from "../data/seo-engine/similarity";

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "reports");
fs.mkdirSync(outDir, { recursive: true });

const manifest = buildWave2Manifest();
const report = formatManifestReport(manifest);
const similarity = findSimilarPages(manifest.pages, 0.85);

fs.writeFileSync(path.join(outDir, "wave2-manifest.json"), JSON.stringify(manifest, null, 2));
fs.writeFileSync(path.join(outDir, "wave2-manifest.txt"), report);
fs.writeFileSync(path.join(outDir, "wave2-similarity.txt"), formatSimilarityReport(similarity));

console.log(report);
console.log("");
console.log(formatSimilarityReport(similarity));
console.log("");
console.log(`Wrote reports/wave2-manifest.json (${manifest.totalProposed} proposed, ${manifest.rejectedTotal} rejected)`);
