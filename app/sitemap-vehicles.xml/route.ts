import { landingEntriesAsync, urlSetXml, vehicleEntries, xmlResponse } from "@/lib/sitemap-sets";

export const revalidate = 3600;

export async function GET() {
  const entries = await landingEntriesAsync();
  const fleet = entries["sitemap-vehicles.xml"];
  const vehicles = await vehicleEntries();
  return xmlResponse(urlSetXml([...fleet, ...vehicles]));
}
