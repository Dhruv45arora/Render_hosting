"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { phoneHref } from "@/lib/constants";
import { isWave1PartnerPath } from "@/data/wave1-pages";

const LINKS = [
  { href: "/car-rental-dehradun", label: "Cars" },
  { href: "/self-drive-car-rental-dehradun", label: "Self Drive" },
  { href: "/taxi", label: "Taxi" },
  { href: "/bike-rental-dehradun", label: "Bikes" },
  { href: "/scooty-on-rent-dehradun", label: "Scooty" },
  { href: "/suv-rental-dehradun", label: "SUVs" },
  { href: "/tempo-traveller-rental-dehradun", label: "Tempo" },
  { href: "/three-wheeler-auto-rental-dehradun", label: "Auto" },
  { href: "/chota-hathi-mini-truck-rental-dehradun", label: "Mini Truck" },
  { href: "/car-rental-dehradun-to-mussoorie", label: "Mussoorie" },
  { href: "/search", label: "Search" },
  { href: "/blog", label: "Guides" },
  { href: "/contact-book-now", label: "Contact" },
];

function IconPhone({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z" />
    </svg>
  );
}

function IconMenu({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

function IconClose({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

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
          <IconPhone /> {display}
        </a>
        <button
          className="ac-burger"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <IconClose /> : <IconMenu />}
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
