"use client";

import { useState } from "react";
import { whatsappHref } from "@/lib/constants";

export default function QuoteForm({
  defaultCity,
  whatsapp,
  vehicleSlug = "",
  vehicleName = "",
  submitLabel = "Request a Quote",
}: {
  defaultCity: string;
  whatsapp: string;
  vehicleSlug?: string;
  vehicleName?: string;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const city = String(payload.city || "").trim();
    const dehradunFleet = city.toLowerCase() === "dehradun" && vehicleSlug;
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          city,
          vehicleSlug: dehradunFleet ? vehicleSlug : "",
          vehicleName: dehradunFleet ? vehicleName : "",
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      const msg = dehradunFleet
        ? `Hi Arora Cars, Dehradun fleet request for ${vehicleName}. Name: ${payload.name}, dates: ${payload.startDate} to ${payload.endDate}, phone: ${payload.phone}, pickup: ${payload.pickup || ""}.`
        : `Hi Arora Cars, rental quote for ${city}. Name: ${payload.name}, dates: ${payload.startDate} to ${payload.endDate}, phone: ${payload.phone}, pickup: ${payload.pickup || ""}. Please check availability with a local rental partner. Do not assign a Dehradun vehicle.`;
      window.open(whatsappHref(whatsapp, msg), "_blank");
    } catch {
      setStatus("err");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="ac-form" onSubmit={onSubmit} id="quote">
      <p>
        Rental city is required. A Dehradun car is attached only when the city is Dehradun and this
        form was opened from a Dehradun fleet page. Every other city is a quote for a local rental
        partner, not a car from the Dehradun garage.
      </p>
      <label>
        Rental city
        <input name="city" required defaultValue={defaultCity} autoComplete="address-level2" />
      </label>
      <input name="name" required placeholder="Your name" />
      <input name="phone" required placeholder="Phone number" />
      <input name="email" type="email" placeholder="Email (optional)" />
      <input name="pickup" required placeholder="Pickup area, hotel, airport, or station" />
      <input name="startDate" type="date" required aria-label="Start date" />
      <input name="endDate" type="date" required aria-label="End date" />
      <textarea name="message" rows={3} placeholder="With or without driver, passengers, notes" />
      <button type="submit" disabled={busy}>
        {busy ? "Sending…" : submitLabel}
      </button>
      <p>Check Availability with Local Rental Partners. Sending this form does not reserve a car.</p>
      {status === "ok" && <p>Quote request saved. WhatsApp should open with the city in the message.</p>}
      {status === "err" && <p>Could not save. WhatsApp us and include the rental city.</p>}
    </form>
  );
}
