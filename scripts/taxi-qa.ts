/**
 * Taxi SEO cluster QA — unique titles/H1s, imagery, internal links, sitemap.
 */
import { getPage } from "../data/pages";
import {
  TAXI_AIRPORT_STATION_PAGES,
  TAXI_CITY_PAGES,
  TAXI_HUB,
  TAXI_PAGES,
  TAXI_ROUTE_PAGES,
  TAXI_TOURISM_PAGES,
} from "../data/taxi-pages";
import { landingEntries } from "../lib/sitemap-sets";

const problems: string[] = [];
const EXPECTED = 1 + 15 + 15 + 6 + 8; // hub + cities + routes + airport/station + tourism

const required = [
  "taxi",
  "taxi-service-in-dehradun",
  "taxi-service-in-rishikesh",
  "taxi-service-in-haridwar",
  "taxi-service-in-mussoorie",
  "taxi-service-in-haldwani",
  "taxi-service-in-nainital",
  "taxi-service-in-roorkee",
  "taxi-service-in-kashipur",
  "taxi-service-in-rudrapur",
  "taxi-service-in-almora",
  "taxi-service-in-ranikhet",
  "taxi-service-in-pithoragarh",
  "taxi-service-in-kotdwar",
  "taxi-service-in-srinagar-uttarakhand",
  "taxi-service-in-tehri",
  "dehradun-to-mussoorie-taxi",
  "dehradun-to-rishikesh-taxi",
  "dehradun-to-haridwar-taxi",
  "dehradun-to-delhi-taxi",
  "dehradun-to-nainital-taxi",
  "haridwar-to-rishikesh-taxi",
  "haridwar-to-dehradun-taxi",
  "rishikesh-to-dehradun-taxi",
  "rishikesh-to-mussoorie-taxi",
  "haldwani-to-nainital-taxi",
  "kathgodam-to-nainital-taxi",
  "dehradun-to-auli-taxi",
  "haridwar-to-mussoorie-taxi",
  "delhi-to-dehradun-taxi",
  "delhi-to-rishikesh-taxi",
  "dehradun-airport-taxi",
  "dehradun-airport-to-rishikesh-taxi",
  "dehradun-airport-to-mussoorie-taxi",
  "dehradun-airport-to-haridwar-taxi",
  "dehradun-railway-station-taxi",
  "kathgodam-railway-station-to-nainital-taxi",
  "char-dham-taxi-service-from-dehradun",
  "char-dham-taxi-service-from-haridwar",
  "kedarnath-taxi-from-dehradun",
  "badrinath-taxi-from-dehradun",
  "dehradun-to-jim-corbett-taxi",
  "nainital-sightseeing-taxi",
  "mussoorie-sightseeing-taxi",
  "rishikesh-sightseeing-taxi",
];

if (TAXI_PAGES.length !== EXPECTED) problems.push(`count ${TAXI_PAGES.length} expected ${EXPECTED}`);
if (required.length !== EXPECTED) problems.push(`required list ${required.length}`);

const titles = new Set<string>();
const h1s = new Set<string>();
const descriptions = new Set<string>();

const entries = landingEntries();
const allLocs = Object.values(entries).flat().map((e) => e.loc);

for (const slug of required) {
  const page = getPage(slug);
  if (!page) {
    problems.push(`missing ${slug}`);
    continue;
  }
  if (!page.enquiryCity) problems.push(`no enquiryCity ${slug}`);
  if (!page.heroImage) problems.push(`no hero ${slug}`);
  if (!page.gallery?.length) problems.push(`no gallery ${slug}`);
  if (page.faqs.length < 3) problems.push(`faqs ${slug}`);
  if (titles.has(page.title)) problems.push(`dup title ${slug}`);
  titles.add(page.title);
  if (h1s.has(page.h1)) problems.push(`dup h1 ${slug}`);
  h1s.add(page.h1);
  if (descriptions.has(page.description)) problems.push(`dup description ${slug}`);
  descriptions.add(page.description);
  if (!allLocs.some((l) => l.endsWith(`/${slug}`) || (slug === "taxi" && l.endsWith("/taxi")))) {
    problems.push(`sitemap missing ${slug}`);
  }
  for (const rel of page.relatedSlugs) {
    if (!getPage(rel)) problems.push(`broken related ${slug} -> ${rel}`);
  }
  const blob = [page.intro, ...page.sections.map((s) => s.body)].join(" ").toLowerCase();
  for (const banned of ["cheapest taxi", "#1 taxi", "best taxi in uttarakhand", "₹999", "guaranteed availability"]) {
    if (blob.includes(banned)) problems.push(`banned claim ${banned} on ${slug}`);
  }
}

const ked = getPage("kedarnath-taxi-from-dehradun");
if (ked && !ked.intro.toLowerCase().includes("cannot") && !ked.intro.toLowerCase().includes("can’t")) {
  if (!`${ked.intro} ${ked.sections.map((s) => s.body).join(" ")}`.toLowerCase().includes("cannot drive")) {
    problems.push("kedarnath missing road-limit clarity");
  }
}

console.log(
  JSON.stringify(
    {
      total: TAXI_PAGES.length,
      hub: 1,
      cities: TAXI_CITY_PAGES.length,
      routes: TAXI_ROUTE_PAGES.length,
      airportStation: TAXI_AIRPORT_STATION_PAGES.length,
      tourism: TAXI_TOURISM_PAGES.length,
      hubSlug: TAXI_HUB.slug,
      problems,
    },
    null,
    2
  )
);
if (problems.length) process.exit(1);
