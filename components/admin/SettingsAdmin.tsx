"use client";

import { useState } from "react";
import type { SiteSettings } from "@/lib/settings";

export default function SettingsAdmin({ settings }: { settings: SiteSettings }) {
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaved(false);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        yearsInBusiness: form.yearsInBusiness,
        fleetCount: form.fleetCount,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(typeof data.error === "string" ? data.error : "Could not save settings.");
      return;
    }
    setSaved(true);
  }

  return (
    <form className="ac-form" onSubmit={onSubmit} style={{ maxWidth: 480 }}>
      <label>Phone (site-wide)</label>
      <input value={form.phone} readOnly disabled title="Protected — not editable in admin" />
      <p style={{ fontSize: 13, opacity: 0.75, margin: 0 }}>
        Phone and WhatsApp are protected business numbers. They cannot be changed in admin.
      </p>
      <label>WhatsApp</label>
      <input value={form.whatsapp} readOnly disabled title="Protected — not editable in admin" />
      <label>Email</label>
      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <label>Years in business (homepage trust)</label>
      <input
        value={form.yearsInBusiness}
        onChange={(e) => setForm({ ...form, yearsInBusiness: e.target.value })}
      />
      <label>Fleet count label</label>
      <input
        value={form.fleetCount}
        onChange={(e) => setForm({ ...form, fleetCount: e.target.value })}
      />
      <button type="submit">Save allowed settings</button>
      {saved && <p>Saved.</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </form>
  );
}
