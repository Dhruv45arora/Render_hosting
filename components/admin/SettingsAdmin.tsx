"use client";

import { useState } from "react";
import type { SiteSettings } from "@/lib/settings";

export default function SettingsAdmin({
  settings,
  lockPhone = false,
}: {
  settings: SiteSettings;
  /** CEO desk: phone / WhatsApp are owner-only */
  lockPhone?: boolean;
}) {
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaved(false);
    const payload: Record<string, string> = {
      email: form.email,
      yearsInBusiness: form.yearsInBusiness,
      fleetCount: form.fleetCount,
    };
    if (!lockPhone) {
      payload.phone = form.phone;
      payload.whatsapp = form.whatsapp;
    }
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(typeof data.error === "string" ? data.error : "Could not save settings.");
      return;
    }
    if (data.phone) setForm(data as SiteSettings);
    setSaved(true);
  }

  return (
    <form className="ac-form" onSubmit={onSubmit} style={{ maxWidth: 480 }}>
      <label>Phone (site-wide)</label>
      <input
        value={form.phone}
        readOnly={lockPhone}
        disabled={lockPhone}
        title={lockPhone ? "Protected — CEO cannot change phone" : undefined}
        onChange={
          lockPhone
            ? undefined
            : (e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
        }
        inputMode="numeric"
        maxLength={10}
        required={!lockPhone}
      />
      <label>WhatsApp</label>
      <input
        value={form.whatsapp}
        readOnly={lockPhone}
        disabled={lockPhone}
        title={lockPhone ? "Protected — CEO cannot change WhatsApp" : undefined}
        onChange={
          lockPhone
            ? undefined
            : (e) => setForm({ ...form, whatsapp: e.target.value.replace(/\D/g, "").slice(0, 10) })
        }
        inputMode="numeric"
        maxLength={10}
        required={!lockPhone}
      />
      <p style={{ fontSize: 13, opacity: 0.75, margin: 0 }}>
        {lockPhone
          ? "Phone and WhatsApp are locked for the CEO desk. Only the site owner can change them."
          : "Header, footer, sticky call / WhatsApp buttons follow these numbers."}
      </p>
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
      <button type="submit">{lockPhone ? "Save allowed settings" : "Save contact & numbers"}</button>
      {saved && <p>Saved.</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </form>
  );
}
