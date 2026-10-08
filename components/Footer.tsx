"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADDRESS_LINE, CATEGORY_HUBS, phoneHref } from "@/lib/constants";
import { isWave1PartnerPath } from "@/data/wave1-pages";

export default function Footer({ phone, email }: { phone: string; email: string }) {
  const display = `+91-${phone.replace(/\D/g, "").slice(-10)}`;
  const partnerHub = isWave1PartnerPath(usePathname() || "");
  return (
    <footer className="ac-footer">
      <div className="container ac-footer-grid">
        <div>
          <div className="ac-logo">
            ARORA<span>CARS</span>
          </div>
          <p>
            {partnerHub
              ? "This city page is a quote for local rental partners. The cars, prices, and Clock Tower garage belong to Dehradun bookings only."
              : "Vehicle rental in Dehradun — self-drive and chauffeur cars, bikes, Activa/scooty, SUVs, Tempo Travellers, autos and Chota Hathi. Serving Mussoorie, Rishikesh, Haridwar and Char Dham."}
          </p>
          <p style={{ marginTop: 10 }}>{partnerHub ? `Dehradun desk: ${ADDRESS_LINE}` : ADDRESS_LINE}</p>
          <a href={phoneHref(phone)} style={{ color: "var(--signal)", fontWeight: 700, marginTop: 12, display: "inline-block" }}>
            {display}
          </a>
          <p style={{ marginTop: 8 }}>{email}</p>
        </div>
        {!partnerHub && (
        <div>
          <h4>Rent</h4>
          {CATEGORY_HUBS.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`}>
              {c.label}
            </Link>
          ))}
          <Link href="/car-fleet-dehradun">Full fleet</Link>
          <Link href="/car-rental-pricing-dehradun">Pricing</Link>
        </div>
        )}
        {!partnerHub && (
        <div>
          <h4>Routes & pickup</h4>
          <Link href="/car-rental-dehradun-to-mussoorie">Dehradun → Mussoorie</Link>
          <Link href="/car-rental-dehradun-to-rishikesh">Dehradun → Rishikesh</Link>
          <Link href="/car-rental-dehradun-to-haridwar">Dehradun → Haridwar</Link>
          <Link href="/car-rental-char-dham-yatra">Char Dham Yatra</Link>
          <Link href="/jolly-grant-airport-car-rental">Jolly Grant Airport</Link>
          <Link href="/car-rental-near-dehradun-railway-station">Railway Station</Link>
          <Link href="/car-rental-near-isbt-dehradun">ISBT Dehradun</Link>
          <Link href="/car-rental-kedarnath">Kedarnath</Link>
          <Link href="/car-rental-badrinath">Badrinath</Link>
        </div>
        )}
        <div>
          <h4>Help</h4>
          <Link href="/how-to-book">How to book</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact-book-now">Contact</Link>
          {!partnerHub && (
            <>
              <Link href="/documents-required-self-drive">Documents</Link>
              <Link href="/blog">Guides</Link>
              <Link href="/terms-and-conditions">Terms</Link>
              <Link href="/cancellation-policy">Cancellation</Link>
              <Link href="/insurance-info">Insurance</Link>
              <Link href="/about-us">About</Link>
            </>
          )}
        </div>
      </div>
      <div className="ac-footer-bottom">
        © {new Date().getFullYear()} Arora Cars, {ADDRESS_LINE}.
        {partnerHub
          ? " Dehradun fleet photos are not the vehicles for this city."
          : " Fleet card photos are illustrative reference images — confirm the exact unit on WhatsApp when you book."}
      </div>
    </footer>
  );
}
