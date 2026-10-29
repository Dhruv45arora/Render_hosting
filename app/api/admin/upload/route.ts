import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_BYTES = 6 * 1024 * 1024; // 6 MB
const DATA_URL_MAX = 1.8 * 1024 * 1024; // keep DB/data-URL fallback lean
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/jpg"]);

function extFor(mime: string) {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const blob = file as File;
  if (!ALLOWED.has(blob.type)) {
    return NextResponse.json({ error: "Use JPG, PNG, or WebP only" }, { status: 400 });
  }
  if (blob.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be under 6 MB" }, { status: 400 });
  }

  const buf = Buffer.from(await blob.arrayBuffer());
  const mime = blob.type === "image/jpg" ? "image/jpeg" : blob.type;

  // Prefer disk so pages stay light; fall back to data URL (survives Render redeploys via DB).
  try {
    const stamp = Date.now().toString(36);
    const rand = randomBytes(4).toString("hex");
    const name = `fleet-${stamp}-${rand}.${extFor(mime)}`;
    const dir = path.join(process.cwd(), "public", "uploads", "fleet");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, name), buf);
    return NextResponse.json({ ok: true, url: `/uploads/fleet/${name}`, stored: "disk" });
  } catch {
    if (buf.length > DATA_URL_MAX) {
      return NextResponse.json(
        { error: "Could not save file. Use a smaller image (under ~1.5 MB) or paste a public image URL." },
        { status: 500 }
      );
    }
    const url = `data:${mime};base64,${buf.toString("base64")}`;
    return NextResponse.json({ ok: true, url, stored: "inline" });
  }
}
