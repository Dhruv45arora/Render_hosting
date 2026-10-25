export function parseJsonArray<T = unknown>(raw: string | null | undefined, fallback: T[] = []): T[] {
  if (!raw) return fallback;
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? (v as T[]) : fallback;
  } catch {
    return fallback;
  }
}

export function parseFaqs(raw: string | null | undefined): { q: string; a: string }[] {
  const arr = parseJsonArray<{ q?: string; a?: string; question?: string; answer?: string }>(raw);
  return arr
    .map((item) => ({
      q: String(item.q || item.question || "").trim(),
      a: String(item.a || item.answer || "").trim(),
    }))
    .filter((f) => f.q && f.a);
}
