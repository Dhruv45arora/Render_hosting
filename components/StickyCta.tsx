"use client";

import { phoneHref, whatsappHref } from "@/lib/constants";
import { trackLeadClick } from "@/lib/lead-track";

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function StickyCta({ phone, whatsapp }: { phone: string; whatsapp: string }) {
  return (
    <div className="sticky-cta">
      <a
        className="call"
        href={phoneHref(phone)}
        aria-label="Call Arora Cars"
        onClick={() => trackLeadClick("call")}
      >
        <PhoneIcon />
        <span className="sticky-label">Call</span>
      </a>
      <a
        className="wa"
        href={whatsappHref(
          whatsapp,
          "Hi Arora Cars, I need a rental quote. My rental city is: "
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Arora Cars"
        onClick={() => trackLeadClick("wa")}
      >
        <span style={{ fontWeight: 800 }}>WA</span>
        <span className="sticky-label">WhatsApp</span>
      </a>
    </div>
  );
}
