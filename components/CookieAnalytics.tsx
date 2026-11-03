"use client";

import { useEffect, useState } from "react";

const CONSENT = "ac_consent";
const VID = "ac_vid";
const HIT_DAY = "ac_hit_day";

function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : "";
}

function setCookie(name: string, value: string, days: number) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function ensureVid() {
  let id = getCookie(VID);
  if (!id) {
    id = `v_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
    setCookie(VID, id, 365);
  }
  return id;
}

async function postHit(body: Record<string, boolean>) {
  try {
    await fetch("/api/analytics/hit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
  } catch {
    /* ignore */
  }
}

function trackPage() {
  ensureVid();
  const day = new Date().toISOString().slice(0, 10);
  const already = getCookie(HIT_DAY) === day;
  if (!already) setCookie(HIT_DAY, day, 2);
  void postHit({ view: true, unique: !already });
}

/** Call / WhatsApp click helpers used by StickyCta */
export function trackLeadClick(kind: "call" | "wa") {
  if (getCookie(CONSENT) !== "1") return;
  void postHit(kind === "call" ? { call: true } : { wa: true });
}

export default function CookieAnalytics() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = getCookie(CONSENT);
    if (consent === "1") {
      trackPage();
      return;
    }
    if (consent === "0") return;
    setShow(true);
  }, []);

  function accept() {
    setCookie(CONSENT, "1", 365);
    setShow(false);
    trackPage();
  }

  function decline() {
    setCookie(CONSENT, "0", 180);
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="cookie-bar" role="dialog" aria-label="Cookie notice">
      <p>
        We use a small cookie to count visits (no ads, no sale of data). Accept to help us see how
        many people use Arora Cars — Call &amp; WhatsApp still work either way.
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-accept" onClick={accept}>
          Accept
        </button>
        <button type="button" className="cookie-decline" onClick={decline}>
          Decline
        </button>
      </div>
    </div>
  );
}
