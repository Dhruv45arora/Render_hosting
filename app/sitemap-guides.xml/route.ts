import { landingEntries, urlSetXml, xmlResponse } from "@/lib/sitemap-sets";

export const revalidate = 3600;

export function GET() {
  return xmlResponse(urlSetXml(landingEntries()["sitemap-guides.xml"]));
}
