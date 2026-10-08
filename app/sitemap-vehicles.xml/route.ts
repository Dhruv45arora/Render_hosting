import { landingEntries, urlSetXml, vehicleEntries, xmlResponse } from "@/lib/sitemap-sets";

export const revalidate = 3600;

export async function GET() {
  const fleet = landingEntries()["sitemap-vehicles.xml"];
  const vehicles = await vehicleEntries();
  return xmlResponse(urlSetXml([...fleet, ...vehicles]));
}
