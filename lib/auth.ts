import { cookies } from "next/headers";

export const ADMIN_COOKIE = "ac_admin";

export type AdminRole = "admin" | "developer";

function tokenValue() {
  return process.env.AUTH_SECRET || "dev-only-secret";
}

/** Cookie payload: `role.secret` (legacy bare secret = full admin). */
export function signAdminToken(_user: string, role: AdminRole = "admin") {
  return `${role}.${tokenValue()}`;
}

export function verifyAdminToken(token: string | undefined): boolean {
  return parseAdminRole(token) !== null;
}

export function parseAdminRole(token: string | undefined): AdminRole | null {
  if (!token) return null;
  const secret = tokenValue();
  // Legacy cookies (pre-role) = full admin
  if (token === secret) return "admin";
  if (token === `admin.${secret}`) return "admin";
  if (token === `developer.${secret}`) return "developer";
  return null;
}

export function checkCredentials(
  user: string,
  password: string
): { ok: true; role: AdminRole } | { ok: false } {
  const adminUser = process.env.ADMIN_USER || "admin";
  const adminPass = process.env.ADMIN_PASSWORD || "aroracars2026";
  if (user === adminUser && password === adminPass) {
    return { ok: true, role: "admin" };
  }

  const devUser = process.env.DEV_USER || "developer";
  const devPass = process.env.DEV_PASSWORD || "";
  if (devPass && user === devUser && password === devPass) {
    return { ok: true, role: "developer" };
  }

  return { ok: false };
}

export async function isAdmin() {
  return verifyAdminToken((await cookies()).get(ADMIN_COOKIE)?.value);
}

export async function getAdminRole(): Promise<AdminRole | null> {
  return parseAdminRole((await cookies()).get(ADMIN_COOKIE)?.value);
}

/** Paths a developer may use (product cards only). */
export function isDeveloperAllowedPath(pathname: string): boolean {
  if (pathname === "/admin" || pathname === "/admin/") return true;
  if (pathname === "/admin/vehicles" || pathname.startsWith("/admin/vehicles/")) return true;
  if (pathname === "/api/admin/logout") return true;
  if (pathname === "/api/admin/vehicles" || pathname.startsWith("/api/admin/vehicles/")) return true;
  // Seasonal rates live on the vehicle card editor
  if (pathname === "/api/admin/pricing" || pathname.startsWith("/api/admin/pricing/")) return true;
  return false;
}
