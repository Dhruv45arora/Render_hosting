"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { phoneHref } from "@/lib/constants";
import { isWave1PartnerPath } from "@/data/wave1-pages";

const LINKS = [
  { href: "/car-rental-dehradun", label: "Cars" },
  { href: "/self-drive-car-rental-dehradun", label: "Self Drive" },
  { href: "/bike-rental-dehradun", label: "Bikes" },
  { href: "/scooty-on-rent-dehradun", label: "Scooty" },
  { href: "/suv-rental-dehradun", label: "SUVs" },
  { href: "/tempo-traveller-rental-dehradun", label: "Tempo" },
  { href: "/car-rental-dehradun-to-mussoorie", label: "Mussoorie" },
  { href: "/blog", label: "Guides" },
  { href: "/contact-book-now", label: "Contact" },
];

export default function Header({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false);
  const partnerHub = isWave1PartnerPath(usePathname() || "");
  const links = partnerHub
    ? [
        { href: "/how-to-book", label: "How a quote works" },
        { href: "/faq", label: "FAQ" },
        { href: "/contact-book-now", label: "Contact" },
      ]
    : LINKS;
  const display = `+91-${phone.replace(/\D/g, "").slice(-10)}`;

  return (
    <header className="ac-header">
      <nav className="ac-nav container">
        <Link href="/" className="ac-logo" onClick={() => setOpen(false)}>
          ARORA<span>CARS</span>
        </Link>
        <ul className="ac-nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <a className="ac-nav-call" href={phoneHref(phone)}>
          <Phone size={14} /> {display}
        </a>
        <button className="ac-burger" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <div className={`ac-mobile ${open ? "open" : ""}`}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <a href={phoneHref(phone)} onClick={() => setOpen(false)}>
          Call {display}
        </a>
      </div>
    </header>
  );
}
