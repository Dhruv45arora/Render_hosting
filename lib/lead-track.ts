/** Lead-click beacons (Call / WhatsApp). Not gated on cookie consent. */

function getPath(): string {
  if (typeof window === "undefined") return "/";
  const p = window.location.pathname || "/";
  return p.length > 180 ? p.slice(0, 180) : p;
}

async function postHit(body: Record<string, unknown>) {
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

export function trackLeadClick(kind: "call" | "wa") {
  void postHit(kind === "call" ? { call: true, path: getPath() } : { wa: true, path: getPath() });
}

function isWhatsAppHref(href: string) {
  return /wa\.me|api\.whatsapp\.com|web\.whatsapp\.com/i.test(href);
}

function isTelHref(href: string) {
  return /^tel:/i.test(href);
}

/** Document-level capture so every page WA/Call link counts — including server-rendered anchors. */
export function installLeadClickCapture() {
  if (typeof document === "undefined") return () => {};
  const onClick = (e: MouseEvent) => {
    const el = (e.target as Element | null)?.closest?.("a");
    if (!el) return;
    const href = el.getAttribute("href") || "";
    if (isWhatsAppHref(href)) {
      void postHit({ wa: true, path: getPath() });
      return;
    }
    if (isTelHref(href)) {
      void postHit({ call: true, path: getPath() });
    }
  };
  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
}
