import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import { getSettings } from "@/lib/settings";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <Header phone={settings.phone} />
      {children}
      <Footer phone={settings.phone} email={settings.email} />
      <StickyCta phone={settings.phone} whatsapp={settings.whatsapp} />
    </>
  );
}
