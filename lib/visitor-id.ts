import { createHash } from "crypto";

/** Best-effort client IP behind Render / proxies. */
export function clientIpFromRequest(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) {
    const first = xf.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  const real = req.headers.get("x-real-ip")?.trim();
  if (real) return real.slice(0, 64);
  const cf = req.headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf.slice(0, 64);
  return "";
}

/** Short stable code from IP — same IP ⇒ same code (easy to scan in the table). */
export function visitorCodeFromIp(ip: string): string {
  if (!ip) return "—";
  return createHash("sha256").update(ip).digest("hex").slice(0, 8);
}

export function sanitizeSessionId(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const s = raw.trim();
  if (!/^[a-zA-Z0-9_-]{8,64}$/.test(s)) return undefined;
  return s;
}
