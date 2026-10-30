import { NextResponse } from "next/server";
import { getAdminRole } from "@/lib/auth";
import { getSettings, isOwnerOnlySettingKey, setSetting } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getSettings());
}

export async function PUT(req: Request) {
  const role = await getAdminRole();
  if (!role) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const rejected: string[] = [];
  for (const [key, value] of Object.entries(body)) {
    if (typeof value !== "string") continue;
    if (role === "developer" && isOwnerOnlySettingKey(key)) {
      rejected.push(key);
      continue;
    }
    try {
      await setSetting(key, value, role);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to save setting";
      return NextResponse.json({ error: message }, { status: 400 });
    }
  }

  if (rejected.length) {
    return NextResponse.json(
      {
        error: `CEO desk cannot change: ${rejected.join(", ")}`,
        settings: await getSettings(),
      },
      { status: 403 }
    );
  }

  return NextResponse.json(await getSettings());
}
