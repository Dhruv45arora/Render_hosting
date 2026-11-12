/** Lightweight click beacons — kept separate so StickyCta does not pull the cookie banner UI. */

function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : "";
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

export function trackLeadClick(kind: "call" | "wa") {
  if (getCookie("ac_consent") !== "1") return;
  void postHit(kind === "call" ? { call: true } : { wa: true });
}
