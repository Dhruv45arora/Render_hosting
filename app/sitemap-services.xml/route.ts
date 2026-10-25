import { landingEntriesAsync, urlSetXml, xmlResponse } from "@/lib/sitemap-sets";

export const revalidate = 3600;

export async function GET() {
  const entries = await landingEntriesAsync();
  return xmlResponse(urlSetXml(entries["sitemap-services.xml"]));
}
