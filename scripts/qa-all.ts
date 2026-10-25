/**
 * Phase 7/8 — run Wave 1 QA then CMS dual-render QA.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = path.resolve(__dirname, "..");

function run(label: string, file: string) {
  console.log(`\n=== ${label} ===`);
  const r = spawnSync("npx", ["tsx", file], {
    cwd: root,
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
  if (r.status !== 0) {
    console.error(`${label} failed`);
    process.exit(r.status ?? 1);
  }
}

run("Wave 1 QA", "scripts/wave1-qa.ts");
run("Taxi QA", "scripts/taxi-qa.ts");
run("CMS dual-render QA", "scripts/cms-qa.ts");
run("SEO engine QA", "scripts/seo-engine-qa.ts");
run("Wave 2 production QA", "scripts/wave2-qa.ts");
console.log("\nAll QA passed.");
