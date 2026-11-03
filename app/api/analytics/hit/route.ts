import { NextResponse } from "next/server";
import { recordAnalyticsEvent } from "@/lib/analytics";

export const dynamic = "force-dynamic";

type Body = {
  view?: boolean;
  unique?: boolean;
  call?: boolean;
  wa?: boolean;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Body;
    const day = new Date().toISOString().slice(0, 10);
    await recordAnalyticsEvent({
      day,
      view: Boolean(body.view),
      unique: Boolean(body.unique),
      call: Boolean(body.call),
      wa: Boolean(body.wa),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
