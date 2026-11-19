import { NextResponse } from "next/server";
import { recordAnalyticsEvent } from "@/lib/analytics";
import { clientIpFromRequest, sanitizeSessionId, visitorCodeFromIp } from "@/lib/visitor-id";

export const dynamic = "force-dynamic";

type Body = {
  view?: boolean;
  unique?: boolean;
  call?: boolean;
  wa?: boolean;
  path?: string;
  session?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Body;
    const day = new Date().toISOString().slice(0, 10);
    const path =
      typeof body.path === "string" && body.path.startsWith("/")
        ? body.path.slice(0, 180)
        : undefined;
    const isLead = Boolean(body.call || body.wa);
    const ip = isLead ? clientIpFromRequest(req) : "";
    const session = isLead ? sanitizeSessionId(body.session) : undefined;

    await recordAnalyticsEvent({
      day,
      view: Boolean(body.view),
      unique: Boolean(body.unique),
      call: Boolean(body.call),
      wa: Boolean(body.wa),
      path,
      at: new Date().toISOString(),
      ip: ip || undefined,
      visitor: ip ? visitorCodeFromIp(ip) : undefined,
      session,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
