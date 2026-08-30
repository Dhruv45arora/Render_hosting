import Link from "next/link";
import { CATEGORY_HUBS, phoneHref } from "@/lib/constants";

export default function Footer({ phone, email }: { phone: string; email: string }) {
  const display = `+91-${phone.replace(/\D/g, "").slice(-10)}`;
  return (
    <footer className="ac-footer">
      <div className="container ac-footer-grid">
        <div>
          <div className="ac-logo">ARORA<span>CARS</span></div>
          <p>
            Vehicle rental marketplace in Dehradun — bikes, Activa/scooty, self-drive
            and chauffeur cars, Tempo Travellers, autos and Chota Hathi. Serving
            Mussoorie, Rishikesh, Haridwar and the Char Dham route.
          </p>
          <a href={phoneHref(phone)} style={{ color: "var(--signal)", fontWeight: 700, marginTop: 12 }}>
            {display}
          </a>
          <p style={{ marginTop: 8 }}>{email}</p>
        </div>
        <div>
          <h4>Rent</h4>
          {CATEGORY_HUBS.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`}>{c.label}</Link>
          ))}
        </div>
        <div>
          <h4>Routes</h4>
          <Link href="/car-rental-dehradun-to-mussoorie">Dehradun → Mussoorie</Link>
          <Link href="/car-rental-dehradun-to-rishikesh">Dehradun → Rishikesh</Link>
          <Link href="/car-rental-dehradun-to-haridwar">Dehradun → Haridwar</Link>
          <Link href="/car-rental-char-dham-yatra">Char Dham Yatra</Link>
          <Link href="/jolly-grant-airport-car-rental">Jolly Grant Airport</Link>
          <Link href="/car-rental-near-dehradun-railway-station">Railway Station</Link>
          <Link href="/bike-rental-near-isbt-dehradun">ISBT Dehradun</Link>
        </div>
        <div>
          <h4>Help</h4>
          <Link href="/how-to-book">How to book</Link>
          <Link href="/documents-required-self-drive">Documents</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/blog">Guides</Link>
          <Link href="/terms-and-conditions">Terms</Link>
          <Link href="/cancellation-policy">Cancellation</Link>
          <Link href="/insurance-info">Insurance</Link>
          <Link href="/about-us">About</Link>
          <Link href="/contact-book-now">Contact</Link>
        </div>
      </div>
      <div className="ac-footer-bottom">
        © {new Date().getFullYear()} Arora Cars, Clock Tower, Dehradun. Vehicle rental in
        Uttarakhand. Placeholder category photos are temporary AI imagery — replace with
        real fleet photos.
      </div>
    </footer>
  );
}
