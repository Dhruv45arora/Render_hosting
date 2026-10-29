import { NextResponse } from "next/server";
import { getSettings, setSetting } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getSettings());
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  for (const [key, value] of Object.entries(body)) {
    if (typeof value !== "string") continue;
    try {
      await setSetting(key, value);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to save setting";
      return NextResponse.json({ error: message }, { status: 400 });
    }
  }

  return NextResponse.json(await getSettings());
}
