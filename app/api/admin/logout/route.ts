import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/auth";

function clearAndRedirect(req: Request) {
  const url = new URL("/admin/login", req.url);
  const res = NextResponse.redirect(url, 303);
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

export async function POST(req: Request) {
  return clearAndRedirect(req);
}

export async function GET(req: Request) {
  return clearAndRedirect(req);
}
