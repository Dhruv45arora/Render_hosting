/**
 * Uttarakhand Programmatic SEO Engine V2
 *
 * Architecture capacity for 10k+ URLs.
 * Wave 2 is PREVIEW/MANIFEST only — not wired into LANDING_PAGES.
 */

export * from "./types";
export * from "./locations";
export * from "./services";
export * from "./vehicles";
export * from "./routes";
export * from "./eligibility";
export * from "./slug-registry";
export * from "./image-map";
export * from "./linking";
export * from "./waves";
export * from "./sitemap-groups";
export * from "./similarity";
export { buildWave2Manifest, formatManifestReport } from "./generate-wave2";
export { publishWave2FromManifest, wave2ContentSimilarity, getFrozenManifestSlugCount } from "./publish-from-manifest";
export { buildWave3Manifest, formatWave3ManifestReport } from "./generate-wave3";
export { publishWave3FromManifest, wave3ContentSimilarity, getFrozenWave3ManifestSlugCount } from "./publish-wave3-from-manifest";
export { buildLandingFromCandidate } from "./build-landing";
