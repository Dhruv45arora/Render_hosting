"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Vehicle = {
  id: number;
  slug: string;
  name: string;
  model: string;
  category: string;
  driveType: string;
  pricePerDay: number;
  pricePerKm: number;
  pricePerHour: number;
  deposit: number;
  seats: number;
  fuel: string;
  transmission: string;
  mileage: string;
  availability: string;
  fuelPolicy: string;
  kmLimit: string;
  description: string;
  image: string;
  featured: boolean;
  seasonalRates: { id: number; label: string; startDate: string; endDate: string; pricePerDay: number }[];
};

const empty = {
  slug: "",
  name: "",
  model: "",
  category: "car",
  driveType: "self_drive",
  pricePerDay: 1500,
  pricePerKm: 10,
  pricePerHour: 0,
  deposit: 4000,
  seats: 5,
  fuel: "Petrol",
  transmission: "Manual",
  mileage: "18 km/l",
  availability: "available",
  fuelPolicy: "As-is / as-is",
  kmLimit: "250 km/day",
  description: "",
  image: "/images/fleet/hatchback-silver.jpg",
  featured: false,
};

export default function VehicleAdmin({ vehicles }: { vehicles: Vehicle[] }) {
  const router = useRouter();
  const [form, setForm] = useState<any>(empty);
  const [editing, setEditing] = useState<number | null>(null);

  function set(k: string, v: any) {
    setForm((f: any) => ({ ...f, [k]: v }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const { id, seasonalRates, createdAt, updatedAt, ...rest } = form;
    const payload = { ...rest, featured: !!rest.featured };
    if (editing) {
      await fetch("/api/admin/vehicles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing, ...payload }),
      });
    } else {
      await fetch("/api/admin/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setForm(empty);
    setEditing(null);
    router.refresh();
  }

  async function remove(id: number) {
    if (!confirm("Delete this vehicle?")) return;
    await fetch(`/api/admin/vehicles?id=${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function addSeason(vehicleId: number, fd: FormData) {
    await fetch("/api/admin/pricing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicleId,
        label: fd.get("label"),
        startDate: fd.get("startDate"),
        endDate: fd.get("endDate"),
        pricePerDay: Number(fd.get("pricePerDay")),
      }),
    });
    router.refresh();
  }

  return (
    <div>
      <form className="ac-form" onSubmit={save} style={{ maxWidth: 720, margin: "20px 0 32px" }}>
        <h3>{editing ? "Edit vehicle" : "Add vehicle"}</h3>
        <input placeholder="Slug" value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
        <input placeholder="Name" value={form.name} onChange={(e) => set("name", e.target.value)} required />
        <input placeholder="Model" value={form.model} onChange={(e) => set("model", e.target.value)} />
        <select value={form.category} onChange={(e) => set("category", e.target.value)}>
          {["bike", "scooty", "car", "suv", "luxury", "wedding", "tempo", "three_wheeler", "chota_hathi"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select value={form.driveType} onChange={(e) => set("driveType", e.target.value)}>
          <option value="self_drive">self_drive</option>
          <option value="chauffeur">chauffeur</option>
          <option value="both">both</option>
        </select>
        <input type="number" placeholder="Price/day" value={form.pricePerDay} onChange={(e) => set("pricePerDay", Number(e.target.value))} />
        <input type="number" placeholder="Price/km" value={form.pricePerKm} onChange={(e) => set("pricePerKm", Number(e.target.value))} />
        <input type="number" placeholder="Deposit" value={form.deposit} onChange={(e) => set("deposit", Number(e.target.value))} />
        <input type="number" placeholder="Seats" value={form.seats} onChange={(e) => set("seats", Number(e.target.value))} />
        <input placeholder="Fuel" value={form.fuel} onChange={(e) => set("fuel", e.target.value)} />
        <input placeholder="Transmission" value={form.transmission} onChange={(e) => set("transmission", e.target.value)} />
        <input placeholder="Mileage" value={form.mileage} onChange={(e) => set("mileage", e.target.value)} />
        <select value={form.availability} onChange={(e) => set("availability", e.target.value)}>
          <option value="available">available</option>
          <option value="booked">booked</option>
          <option value="maintenance">maintenance</option>
        </select>
        <input placeholder="Image path" value={form.image} onChange={(e) => set("image", e.target.value)} />
        <textarea placeholder="Description" value={form.description} onChange={(e) => set("description", e.target.value)} />
        <label>
          <input type="checkbox" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} /> Featured
        </label>
        <button type="submit">{editing ? "Update" : "Create"}</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>₹/day</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id}>
              <td>
                {v.name}
                <div style={{ color: "#888", fontSize: 11 }}>/rent/{v.slug}</div>
                {v.seasonalRates.map((r) => (
                  <div key={r.id} style={{ fontSize: 11 }}>
                    {r.label}: ₹{r.pricePerDay} ({r.startDate}–{r.endDate})
                  </div>
                ))}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addSeason(v.id, new FormData(e.currentTarget));
                    e.currentTarget.reset();
                  }}
                  style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}
                >
                  <input name="label" placeholder="Char Dham season" required />
                  <input name="startDate" type="date" required />
                  <input name="endDate" type="date" required />
                  <input name="pricePerDay" type="number" placeholder="₹" required />
                  <button className="admin-btn gold" type="submit">
                    Add rate
                  </button>
                </form>
              </td>
              <td>{v.category}</td>
              <td>{v.pricePerDay}</td>
              <td>{v.availability}</td>
              <td>
                <button
                  className="admin-btn"
                  onClick={() => {
                    setEditing(v.id);
                    setForm(v);
                  }}
                >
                  Edit
                </button>{" "}
                <button className="admin-btn danger" onClick={() => remove(v.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
