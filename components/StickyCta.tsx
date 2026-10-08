import { Phone } from "lucide-react";
import { phoneHref, whatsappHref } from "@/lib/constants";

export default function StickyCta({ phone, whatsapp }: { phone: string; whatsapp: string }) {
  return (
    <div className="sticky-cta">
      <a className="call" href={phoneHref(phone)} aria-label="Call Arora Cars">
        <Phone size={20} />
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
      >
        <span style={{ fontWeight: 800 }}>WA</span>
        <span className="sticky-label">WhatsApp</span>
      </a>
    </div>
  );
}
