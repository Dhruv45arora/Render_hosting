import { NextResponse } from "next/server";
import { ADMIN_COOKIE, checkCredentials, signAdminToken } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { user, password } = body as { user?: string; password?: string };
  if (!user || !password || !checkCredentials(user, password)) {
    return NextResponse.json({ error: "Invalid login" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, signAdminToken(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
