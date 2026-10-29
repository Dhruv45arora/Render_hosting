/** Browser-only: resize + JPEG-compress a File for fleet card uploads. */

function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that photo. Use JPG or PNG (not HEIC)."));
    };
    img.src = url;
  });
}

export async function compressImageFile(
  file: File,
  opts: { maxEdge?: number; quality?: number } = {}
): Promise<{ dataUrl: string; bytes: number }> {
  const maxEdge = opts.maxEdge ?? 1400;
  const quality = opts.quality ?? 0.82;

  let width = 0;
  let height = 0;
  let draw: CanvasImageSource;

  try {
    const bitmap = await createImageBitmap(file);
    width = bitmap.width;
    height = bitmap.height;
    draw = bitmap;
  } catch {
    const img = await loadImageElement(file);
    width = img.naturalWidth;
    height = img.naturalHeight;
    draw = img;
  }

  const scale = Math.min(1, maxEdge / Math.max(width, height));
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process image");
  ctx.drawImage(draw, 0, 0, w, h);
  if ("close" in draw && typeof (draw as ImageBitmap).close === "function") {
    (draw as ImageBitmap).close();
  }

  const dataUrl = canvas.toDataURL("image/jpeg", quality);
  const bytes = Math.ceil(((dataUrl.length - "data:image/jpeg;base64,".length) * 3) / 4);
  return { dataUrl, bytes };
}
