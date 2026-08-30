"use client";

import { useState } from "react";
import { whatsappHref } from "@/lib/constants";

export default function BookingForm({
  vehicleSlug,
  vehicleName,
  whatsapp,
}: {
  vehicleSlug: string;
  vehicleName: string;
  whatsapp: string;
}) {
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, vehicleSlug, vehicleName }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      const msg = `Hi Arora Cars, booking request for ${vehicleName}. Name: ${payload.name}, dates: ${payload.startDate} to ${payload.endDate}, phone: ${payload.phone}.`;
      window.open(whatsappHref(whatsapp, msg), "_blank");
    } catch {
      setStatus("err");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="ac-form" onSubmit={onSubmit} id="book">
      <input name="name" required placeholder="Your name" />
      <input name="phone" required placeholder="Phone number" />
      <input name="email" type="email" placeholder="Email (optional)" />
      <input name="startDate" type="date" required />
      <input name="endDate" type="date" required />
      <textarea name="message" rows={3} placeholder="Pickup point, train/flight no., notes" />
      <button type="submit" disabled={busy}>
        {busy ? "Sending…" : "Send booking request"}
      </button>
      {status === "ok" && <p>Request saved. WhatsApp should open with a pre-filled message.</p>}
      {status === "err" && <p>Could not save — please WhatsApp us directly.</p>}
    </form>
  );
}
