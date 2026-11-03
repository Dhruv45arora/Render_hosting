"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CATEGORY_LABELS, formatInr } from "@/lib/constants";

type Hit = {
  slug: string;
  name: string;
  model: string;
  category: string;
  pricePerDay: number;
  image: string;
};

export default function VehicleSearch({
  variant = "hero",
  placeholder = "Search Activa, Innova, Bullet, Auto…",
}: {
  variant?: "hero" | "page";
  placeholder?: string;
}) {
  const router = useRouter();
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const qq = q.trim();
    if (qq.length < 2) {
      setHits([]);
      setOpen(false);
      return;
    }
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/vehicles/search?q=${encodeURIComponent(qq)}`);
        const data = (await res.json()) as { results: Hit[] };
        setHits(data.results || []);
        setOpen(true);
      } catch {
        setHits([]);
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const qq = q.trim();
    if (!qq) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(qq)}`);
  }

  return (
    <div className={`vs vs-${variant}`} ref={wrapRef}>
      <form className="vs-form" onSubmit={submit} role="search">
        <label className="sr-only" htmlFor={listId}>
          Search vehicles
        </label>
        <input
          id={listId}
          className="vs-input"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => hits.length && setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          enterKeyHint="search"
        />
        <button className="vs-btn" type="submit">
          {loading ? "…" : "Search"}
        </button>
      </form>
      {open && hits.length > 0 && (
        <ul className="vs-dropdown" role="listbox">
          {hits.map((h) => (
            <li key={h.slug}>
              <Link
                href={`/rent/${h.slug}`}
                className="vs-hit"
                onClick={() => setOpen(false)}
              >
                <img src={h.image} alt="" width={56} height={40} loading="lazy" />
                <span className="vs-hit-text">
                  <strong>{h.name}</strong>
                  <em>
                    {CATEGORY_LABELS[h.category] || h.category} · from {formatInr(h.pricePerDay)}/day
                  </em>
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link className="vs-all" href={`/search?q=${encodeURIComponent(q.trim())}`}>
              See all results for “{q.trim()}”
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
