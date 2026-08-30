import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Arora Cars | Bike, Scooty, Car & Tempo Rental in Dehradun",
    template: "%s | Arora Cars",
  },
  description:
    "Rent bikes, Activa/scooty, self-drive and chauffeur cars, Tempo Travellers and mini trucks in Dehradun. Mussoorie, Rishikesh, Haridwar, Char Dham. Call 8979490332.",
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Mono:wght@400;500;600;700&family=Work+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
