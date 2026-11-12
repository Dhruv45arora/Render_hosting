import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono, Work_Sans } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const workSans = Work_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-work",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Arora Cars | Car, Bike & Scooty Rental in Dehradun",
    template: "%s | Arora Cars",
  },
  description:
    "Car rental in Dehradun — self drive and chauffeur cars, bikes, Activa/scooty, SUVs and Tempo Traveller. Mussoorie, Rishikesh, Haridwar, Char Dham. Call 8445619130.",
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${anton.variable} ${workSans.variable} ${ibmPlexMono.variable}`}>
      <body className={workSans.className}>{children}</body>
    </html>
  );
}
