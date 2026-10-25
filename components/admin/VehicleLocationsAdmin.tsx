"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Opt = { id: number; name: string; slug: string; serviceMode?: string; status?: string };

type LinkRow = {
  id: number;
  vehicleId: number;
  locationId: number;
  available: boolean;
  pricePerDay: number | null;
  pricePerHour: number | null;
  pricePerKm: number | null;
  deposit: number | null;
  pickupAvailable: boolean;
  deliveryAvailable: boolean;
  withDriver: boolean;
  selfDrive: boolean;
  minimumRentalDuration: string;
  localNotes: string;
  active: boolean;
  seoEligible: boolean;
  vehicle?: Opt;
  location?: Opt;
};

const empty = {
  vehicleId: "",
  locationId: "",
  available: true,
  pricePerDay: "",
  pricePerHour: "",
  pricePerKm: "",
  deposit: "",
  pickupAvailable: true,
  deliveryAvailable: false,
  withDriver: true,
  selfDrive: true,
  minimumRentalDuration: "",
  localNotes: "",
  active: true,
  seoEligible: false,
};

export default function VehicleLocationsAdmin({
  links,
  vehicles,
  locations,
}: {
  links: LinkRow[];
  vehicles: Opt[];
  locations: Opt[];
}) {
  const router = useRouter();
  const [form, setForm] = useState<any>(empty);
  const [error, setError] = useState("");

  function set(k: string, v: any) {
    setForm((f: any) => ({ ...f, [k]: v }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/vehicle-locations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        vehicleId: Number(form.vehicleId),
        locationId: Number(form.locationId),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "Save failed");
      return;
    }
    setForm(empty);
    router.refresh();
  }

  async function deactivate(id: number) {
    if (!confirm("Deactivate this vehicle–location assignment?")) return;
    await fetch(`/api/admin/vehicle-locations?id=${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <p style={{ fontSize: 13, opacity: 0.8 }}>
        Assign fleet to cities. Use OWN_FLEET locations for Dehradun truthfulness; partner cities should stay enquiry-only until verified.
      </p>
      <form className="ac-form" onSubmit={save} style={{ maxWidth: 720, margin: "20px 0 32px" }}>
        <h3>Assign / update vehicle at location</h3>
        <select value={form.vehicleId || ""} onChange={(e) => set("vehicleId", e.target.value)} required>
          <option value="">Vehicle…</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} ({v.slug})
            </option>
          ))}
        </select>
        <select value={form.locationId || ""} onChange={(e) => set("locationId", e.target.value)} required>
          <option value="">Location…</option>
          {locations.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name} [{l.serviceMode || "?"}]
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Local price/day (optional)"
          value={form.pricePerDay}
          onChange={(e) => set("pricePerDay", e.target.value)}
        />
        <input
          type="number"
          placeholder="Local price/hour"
          value={form.pricePerHour}
          onChange={(e) => set("pricePerHour", e.target.value)}
        />
        <input
          type="number"
          placeholder="Local price/km"
          value={form.pricePerKm}
          onChange={(e) => set("pricePerKm", e.target.value)}
        />
        <input
          type="number"
          placeholder="Local deposit"
          value={form.deposit}
          onChange={(e) => set("deposit", e.target.value)}
        />
        <input
          placeholder="Min rental duration"
          value={form.minimumRentalDuration}
          onChange={(e) => set("minimumRentalDuration", e.target.value)}
        />
        <textarea placeholder="Local notes" value={form.localNotes} onChange={(e) => set("localNotes", e.target.value)} />
        <label>
          <input type="checkbox" checked={!!form.available} onChange={(e) => set("available", e.target.checked)} />{" "}
          Available
        </label>
        <label>
          <input type="checkbox" checked={!!form.pickupAvailable} onChange={(e) => set("pickupAvailable", e.target.checked)} />{" "}
          Pickup
        </label>
        <label>
          <input
            type="checkbox"
            checked={!!form.deliveryAvailable}
            onChange={(e) => set("deliveryAvailable", e.target.checked)}
          />{" "}
          Delivery
        </label>
        <label>
          <input type="checkbox" checked={!!form.withDriver} onChange={(e) => set("withDriver", e.target.checked)} /> With
          driver
        </label>
        <label>
          <input type="checkbox" checked={!!form.selfDrive} onChange={(e) => set("selfDrive", e.target.checked)} /> Self
          drive
        </label>
        <label>
          <input type="checkbox" checked={!!form.seoEligible} onChange={(e) => set("seoEligible", e.target.checked)} />{" "}
          SEO eligible (vehicle×city pages)
        </label>
        <label>
          <input type="checkbox" checked={!!form.active} onChange={(e) => set("active", e.target.checked)} /> Active
        </label>
        <button type="submit">Save assignment</button>
        {error && <p style={{ color: "crimson" }}>{error}</p>}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Location</th>
            <th>Price</th>
            <th>Flags</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {links.map((row) => (
            <tr key={row.id} style={{ opacity: row.active ? 1 : 0.5 }}>
              <td>{row.vehicle?.name || row.vehicleId}</td>
              <td>
                {row.location?.name || row.locationId}
                <div style={{ fontSize: 11, color: "#888" }}>{row.location?.serviceMode}</div>
              </td>
              <td>{row.pricePerDay != null ? `₹${row.pricePerDay}` : "default"}</td>
              <td style={{ fontSize: 12 }}>
                {row.available ? "avail" : "off"}
                {row.seoEligible ? " · seo" : ""}
              </td>
              <td>
                <button
                  className="admin-btn"
                  onClick={() =>
                    setForm({
                      vehicleId: row.vehicleId,
                      locationId: row.locationId,
                      available: row.available,
                      pricePerDay: row.pricePerDay ?? "",
                      pricePerHour: row.pricePerHour ?? "",
                      pricePerKm: row.pricePerKm ?? "",
                      deposit: row.deposit ?? "",
                      pickupAvailable: row.pickupAvailable,
                      deliveryAvailable: row.deliveryAvailable,
                      withDriver: row.withDriver,
                      selfDrive: row.selfDrive,
                      minimumRentalDuration: row.minimumRentalDuration,
                      localNotes: row.localNotes,
                      active: row.active,
                      seoEligible: row.seoEligible,
                    })
                  }
                >
                  Load
                </button>{" "}
                {row.active && (
                  <button className="admin-btn danger" onClick={() => deactivate(row.id)}>
                    Off
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
