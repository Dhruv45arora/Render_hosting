import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import { getSettings } from "@/lib/settings";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3340630565774790"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Header phone={settings.phone} />
      {children}
      <Footer phone={settings.phone} email={settings.email} />
      <StickyCta phone={settings.phone} whatsapp={settings.whatsapp} />
    </>
  );
}
