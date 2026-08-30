"use client";

import { useState } from "react";
import type { SiteSettings } from "@/lib/settings";

export default function SettingsAdmin({ settings }: { settings: SiteSettings }) {
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaved(true);
  }

  return (
    <form className="ac-form" onSubmit={onSubmit} style={{ maxWidth: 480 }}>
      <label>Phone (site-wide)</label>
      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <label>WhatsApp (same or different)</label>
      <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
      <label>Email</label>
      <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <label>Years in business (homepage trust)</label>
      <input value={form.yearsInBusiness} onChange={(e) => setForm({ ...form, yearsInBusiness: e.target.value })} />
      <label>Fleet count label</label>
      <input value={form.fleetCount} onChange={(e) => setForm({ ...form, fleetCount: e.target.value })} />
      <button type="submit">Save — updates every page</button>
      {saved && <p>Saved.</p>}
    </form>
  );
}
