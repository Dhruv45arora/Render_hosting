import { NextResponse } from "next/server";
import { getSettings, setSetting } from "@/lib/settings";

export async function GET() {
  return NextResponse.json(await getSettings());
}

export async function PUT(req: Request) {
  const body = await req.json();
  for (const [key, value] of Object.entries(body)) {
    if (typeof value === "string") await setSetting(key, value);
  }
  return NextResponse.json(await getSettings());
}
