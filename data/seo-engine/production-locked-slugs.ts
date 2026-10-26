import { BLOG_POSTS } from "../blog";
import { SEED_VEHICLES } from "../vehicles";
import { WAVE1_CITY_HUB_SLUGS } from "../wave1-hubs";
import { WAVE1_PAGE_SLUGS } from "../wave1-pages";
import { TAXI_PAGE_SLUGS } from "../taxi-pages";
import { INTENT_ALIAS_SLUGS, normalizeSlug } from "./slug-registry";

/**
 * Production slugs that Wave 2 must never collide with.
 * Intentionally excludes Wave 2 itself (avoids circular import via pages.ts).
 * Core Dehradun landings are passed in from pages.ts CORE_LANDING_SLUGS.
 */
export function buildProductionLockedSlugs(
  coreLandingSlugs: Iterable<string>,
  extraLockedSlugs: Iterable<string> = []
): Set<string> {
  const set = new Set<string>();
  Array.from(coreLandingSlugs).forEach((s) => set.add(normalizeSlug(s)));
  Array.from(extraLockedSlugs).forEach((s) => set.add(normalizeSlug(s)));
  WAVE1_PAGE_SLUGS.forEach((s) => set.add(normalizeSlug(s)));
  WAVE1_CITY_HUB_SLUGS.forEach((s) => set.add(normalizeSlug(s)));
  TAXI_PAGE_SLUGS.forEach((s) => set.add(normalizeSlug(s)));
  INTENT_ALIAS_SLUGS.forEach((a) => set.add(normalizeSlug(a)));
  BLOG_POSTS.forEach((b) => set.add(normalizeSlug(`blog/${b.slug}`)));
  SEED_VEHICLES.forEach((v) => set.add(normalizeSlug(`rent/${v.slug}`)));
  return set;
}
