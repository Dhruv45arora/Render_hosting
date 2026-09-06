import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import JsonLd from "@/components/JsonLd";
import { getSettings } from "@/lib/settings";
import { localBusinessSchema } from "@/lib/schema-org";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <JsonLd data={localBusinessSchema(settings.phone, settings.email)} />
      <Header phone={settings.phone} />
      {children}
      <Footer phone={settings.phone} email={settings.email} />
      <StickyCta phone={settings.phone} whatsapp={settings.whatsapp} />
    </>
  );
}
