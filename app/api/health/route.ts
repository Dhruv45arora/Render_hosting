import { NextResponse } from "next/server";

/** Lightweight keepalive target — avoids rendering the full homepage. */
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { ok: true, service: "aroracars", ts: new Date().toISOString() },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
