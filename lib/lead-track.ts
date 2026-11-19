/** Lead-click beacons (Call / WhatsApp). Not gated on cookie consent. */

const SID_KEY = "ac_lead_sid";

function getPath(): string {
  if (typeof window === "undefined") return "/";
  const p = window.location.pathname || "/";
  return p.length > 180 ? p.slice(0, 180) : p;
}

/** Same browser tab session until the tab is closed — helps tell repeat taps vs a new visitor. */
function getOrCreateSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SID_KEY);
    if (existing && /^[a-zA-Z0-9_-]{8,64}$/.test(existing)) return existing;
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID().replace(/-/g, "").slice(0, 16)
        : `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SID_KEY, id);
    return id;
  } catch {
    return "";
  }
}

async function postHit(body: Record<string, unknown>) {
  try {
    const session = getOrCreateSessionId();
    await fetch("/api/analytics/hit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(session ? { ...body, session } : body),
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
