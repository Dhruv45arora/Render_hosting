import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_BYTES = 6 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/pjpeg",
  "", // some phones send empty type — we sniff below
]);

function sniffMime(buf: Buffer, fallback: string) {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf.length >= 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return "image/png";
  }
  if (
    buf.length >= 12 &&
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp";
  }
  return fallback || "";
}

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
  if (blob.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be under 6 MB" }, { status: 400 });
  }

  const buf = Buffer.from(await blob.arrayBuffer());
  const mime = sniffMime(buf, blob.type === "image/jpg" ? "image/jpeg" : blob.type);
  if (!mime || (!ALLOWED.has(mime) && !ALLOWED.has(blob.type))) {
    return NextResponse.json(
      { error: "Use JPG, PNG, or WebP (not HEIC). On iPhone: Settings → Camera → Most Compatible." },
      { status: 400 }
    );
  }

  // Prefer a public path when the disk is writable (local / Render disk).
  try {
    const stamp = Date.now().toString(36);
    const rand = randomBytes(4).toString("hex");
    const name = `fleet-${stamp}-${rand}.${extFor(mime)}`;
    const dir = path.join(process.cwd(), "public", "uploads", "fleet");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, name), buf);
    return NextResponse.json({ ok: true, url: `/uploads/fleet/${name}`, stored: "disk" });
  } catch {
    // Render ephemeral FS / read-only: return inline so Save persists it in Postgres.
    const url = `data:${mime};base64,${buf.toString("base64")}`;
    return NextResponse.json({ ok: true, url, stored: "inline" });
  }
}
