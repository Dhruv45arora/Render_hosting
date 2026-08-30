"use client";

import { useState } from "react";

export default function PagesAdmin({
  pages,
  overrides,
}: {
  pages: string[];
  overrides: { slug: string; heroText: string; pricingBlurb: string }[];
}) {
  const map = Object.fromEntries(overrides.map((o) => [o.slug, o]));
  const [slug, setSlug] = useState(pages[0]);
  const [heroText, setHero] = useState(map[pages[0]]?.heroText || "");
  const [pricingBlurb, setBlurb] = useState(map[pages[0]]?.pricingBlurb || "");
  const [saved, setSaved] = useState(false);

  function pick(s: string) {
    setSlug(s);
    setHero(map[s]?.heroText || "");
    setBlurb(map[s]?.pricingBlurb || "");
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/pages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, heroText, pricingBlurb }),
    });
    setSaved(true);
  }

  return (
    <form className="ac-form" onSubmit={onSubmit} style={{ maxWidth: 640 }}>
      <select
        value={slug}
        onChange={(e) => pick(e.target.value)}
      >
        {pages.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>
      <textarea rows={5} placeholder="Hero / intro override" value={heroText} onChange={(e) => setHero(e.target.value)} />
      <textarea rows={3} placeholder="Pricing blurb override" value={pricingBlurb} onChange={(e) => setBlurb(e.target.value)} />
      <button type="submit">Save copy</button>
      {saved && <p>Saved. Refresh the public page to see it.</p>}
    </form>
  );
}
