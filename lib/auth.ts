import { cookies } from "next/headers";

export const ADMIN_COOKIE = "ac_admin";

function tokenValue() {
  return process.env.AUTH_SECRET || "dev-only-secret";
}

export function signAdminToken(_user: string) {
  return tokenValue();
}

export function verifyAdminToken(token: string | undefined) {
  return !!token && token === tokenValue();
}

export function checkCredentials(user: string, password: string) {
  const u = process.env.ADMIN_USER || "admin";
  const p = process.env.ADMIN_PASSWORD || "aroracars2026";
  return user === u && password === p;
}

export async function isAdmin() {
  const jar = await cookies();
  return verifyAdminToken(jar.get(ADMIN_COOKIE)?.value);
}
