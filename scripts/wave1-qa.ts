import { getPage, LANDING_PAGES } from "../data/pages";
import { WAVE1_CITY_HUB_SLUGS } from "../data/wave1-hubs";
import { WAVE1_PAGE_SLUGS } from "../data/wave1-pages";
import { landingEntries } from "../lib/sitemap-sets";

const EXPECTED = 114;
const slugs = new Set<string>([...WAVE1_CITY_HUB_SLUGS, ...WAVE1_PAGE_SLUGS]);
const problems: string[] = [];

if (slugs.size !== EXPECTED) problems.push(`slug count ${slugs.size} expected ${EXPECTED}`);

const banned = [
  "/car-fleet-dehradun",
  "/car-rental-pricing-dehradun",
  "/rent/",
  "monthly-car-rental-dehradun",
  "suv-rental-dehradun",
  "wedding-car-rental-dehradun",
  "bike-rental-dehradun",
  "jolly-grant",
  "/images/fleet/",
  "₹",
];
const bannedSlugs = ["car-rental-bangalore", "car-rental-mysore", "car-rental-pondicherry", "mopa-airport-car-rental", "car-rental-goa-to-south-goa"];

const entries = landingEntries();
const loc = (file: string) => new Set(entries[file as keyof typeof entries].map((e) => e.loc));
const cities = loc("sitemap-cities.xml");
const services = loc("sitemap-services.xml");
const routes = loc("sitemap-routes.xml");

let serviceN = 0;
let routeN = 0;
let cityN = 0;

for (const slug of slugs) {
  if (bannedSlugs.includes(slug)) problems.push(`banned slug published ${slug}`);
  const page = getPage(slug);
  if (!page) {
    problems.push(`missing page ${slug}`);
    continue;
  }
  if (!page.enquiryCity) problems.push(`no city ${slug}`);
  if (page.heroImage) problems.push(`image ${slug} ${page.heroImage}`);
  if (page.canonicalSlug) problems.push(`canonical override ${slug}`);
  if (!page.h1 || !page.title.includes("Arora Cars")) problems.push(`title/h1 ${slug}`);
  if (page.faqs.length < 3) problems.push(`faqs ${slug} ${page.faqs.length}`);
  const blob = [page.intro, page.description, ...page.sections.map((s) => s.heading + s.body), ...page.faqs.map((f) => f.q + f.a), ...page.relatedSlugs].join("\n");
  for (const word of banned) {
    if (blob.includes(word)) problems.push(`banned text ${word} on ${slug}`);
  }
  const headings = page.sections.map((s) => s.heading);
  if (new Set(headings).size !== headings.length) problems.push(`duplicate heading ${slug}`);
  for (const rel of page.relatedSlugs) {
    if (!getPage(rel)) problems.push(`broken link ${slug} -> ${rel}`);
    if (rel.startsWith("rent/") || rel.includes("fleet") || rel.includes("pricing-dehradun")) problems.push(`fleet link ${slug} -> ${rel}`);
  }
  const url = `/${slug}`;
  const inCities = [...cities].some((l) => l.endsWith(url));
  const inServices = [...services].some((l) => l.endsWith(url));
  const inRoutes = [...routes].some((l) => l.endsWith(url));
  if (WAVE1_CITY_HUB_SLUGS.has(slug)) {
    cityN += 1;
    if (!inCities || inServices || inRoutes) problems.push(`sitemap hub ${slug}`);
  } else if (page.type === "route") {
    routeN += 1;
    if (!inRoutes || inCities || inServices) problems.push(`sitemap route ${slug}`);
  } else {
    serviceN += 1;
    if (!inServices || inCities || inRoutes) problems.push(`sitemap service ${slug}`);
  }
}

const must = [
  "car-rental-north-goa-to-south-goa",
  "goa-airport-car-rental",
  "car-rental-bengaluru",
  "car-rental-bengaluru-to-mysuru",
  "car-rental-chennai-to-puducherry",
  "bike-rental-goa",
];
for (const slug of must) if (!slugs.has(slug)) problems.push(`missing required ${slug}`);

const goa = getPage("goa-airport-car-rental");
if (goa && (!goa.intro.concat(goa.sections.map((s) => s.body).join(" ")).includes("Mopa") || !goa.sections.map((s) => s.body).join(" ").includes("Dabolim"))) {
  problems.push("goa airport missing both airports");
}
const mys = getPage("car-rental-bengaluru-to-mysuru");
if (mys && !mys.h1.includes("Mysore")) problems.push("mysore h1");
const pon = getPage("car-rental-chennai-to-puducherry");
if (pon && !pon.h1.includes("Pondicherry")) problems.push("pondicherry h1");
const blr = getPage("car-rental-bengaluru");
if (blr && !blr.h1.includes("Bangalore")) problems.push("bangalore h1");

const listed = LANDING_PAGES.filter((p) => slugs.has(p.slug));
if (listed.length !== EXPECTED) problems.push(`landing list ${listed.length}`);

console.log(JSON.stringify({ slugs: slugs.size, cityN, serviceN, routeN, problems }, null, 2));
if (problems.length) process.exit(1);
