"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Location = {
  id: number;
  name: string;
  slug: string;
  district: string;
  state: string;
  region: string;
  description: string;
  localIntro: string;
  serviceMode: string;
  active: boolean;
  seoPriority: number;
  railwayInfo: string;
  airportInfo: string;
  busStationInfo: string;
  localRentalNotes: string;
  _count?: { vehicleLinks: number; services: number; seoPages: number };
};

const empty = {
  name: "",
  slug: "",
  district: "",
  state: "Uttarakhand",
  region: "",
  description: "",
  localIntro: "",
  serviceMode: "PARTNER",
  active: true,
  seoPriority: 0,
  railwayInfo: "",
  airportInfo: "",
  busStationInfo: "",
  localRentalNotes: "",
};

export default function LocationsAdmin({ locations }: { locations: Location[] }) {
  const router = useRouter();
  const [form, setForm] = useState<any>(empty);
  const [editing, setEditing] = useState<number | null>(null);
  const [error, setError] = useState("");

  function set(k: string, v: any) {
    setForm((f: any) => ({ ...f, [k]: v }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/locations", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { id: editing, ...form } : form),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "Save failed");
      return;
    }
    setForm(empty);
    setEditing(null);
    router.refresh();
  }

  async function archive(id: number) {
    if (!confirm("Deactivate this location?")) return;
    await fetch(`/api/admin/locations?id=${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <form className="ac-form" onSubmit={save} style={{ maxWidth: 720, margin: "20px 0 32px" }}>
        <h3>{editing ? "Edit location" : "Add location"}</h3>
        <input placeholder="Name" value={form.name} onChange={(e) => set("name", e.target.value)} required />
        <input placeholder="Slug (auto if blank)" value={form.slug} onChange={(e) => set("slug", e.target.value)} />
        <input placeholder="District" value={form.district} onChange={(e) => set("district", e.target.value)} />
        <input placeholder="State" value={form.state} onChange={(e) => set("state", e.target.value)} />
        <input placeholder="Region" value={form.region} onChange={(e) => set("region", e.target.value)} />
        <select value={form.serviceMode} onChange={(e) => set("serviceMode", e.target.value)}>
          <option value="OWN_FLEET">OWN_FLEET</option>
          <option value="PARTNER">PARTNER</option>
          <option value="UNAVAILABLE">UNAVAILABLE</option>
        </select>
        <input
          type="number"
          placeholder="SEO priority"
          value={form.seoPriority}
          onChange={(e) => set("seoPriority", Number(e.target.value))}
        />
        <textarea placeholder="Description" value={form.description} onChange={(e) => set("description", e.target.value)} />
        <textarea placeholder="Local intro" value={form.localIntro} onChange={(e) => set("localIntro", e.target.value)} />
        <textarea placeholder="Railway info" value={form.railwayInfo} onChange={(e) => set("railwayInfo", e.target.value)} />
        <textarea placeholder="Airport info" value={form.airportInfo} onChange={(e) => set("airportInfo", e.target.value)} />
        <textarea placeholder="Bus station info" value={form.busStationInfo} onChange={(e) => set("busStationInfo", e.target.value)} />
        <textarea
          placeholder="Local rental notes"
          value={form.localRentalNotes}
          onChange={(e) => set("localRentalNotes", e.target.value)}
        />
        <label>
          <input type="checkbox" checked={!!form.active} onChange={(e) => set("active", e.target.checked)} /> Active
        </label>
        <button type="submit">{editing ? "Update" : "Create"}</button>
        {editing && (
          <button type="button" className="admin-btn" onClick={() => { setEditing(null); setForm(empty); }}>
            Cancel
          </button>
        )}
        {error && <p style={{ color: "crimson" }}>{error}</p>}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Mode</th>
            <th>Priority</th>
            <th>Links</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc) => (
            <tr key={loc.id} style={{ opacity: loc.active ? 1 : 0.5 }}>
              <td>
                {loc.name}
                <div style={{ color: "#888", fontSize: 11 }}>/{loc.slug}</div>
                <div style={{ fontSize: 11 }}>{[loc.district, loc.state].filter(Boolean).join(", ")}</div>
              </td>
              <td>{loc.serviceMode}</td>
              <td>{loc.seoPriority}</td>
              <td style={{ fontSize: 12 }}>
                V:{loc._count?.vehicleLinks ?? 0} · S:{loc._count?.services ?? 0} · P:{loc._count?.seoPages ?? 0}
              </td>
              <td>
                <button
                  className="admin-btn"
                  onClick={() => {
                    setEditing(loc.id);
                    setForm(loc);
                  }}
                >
                  Edit
                </button>{" "}
                {loc.active && (
                  <button className="admin-btn danger" onClick={() => archive(loc.id)}>
                    Deactivate
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
