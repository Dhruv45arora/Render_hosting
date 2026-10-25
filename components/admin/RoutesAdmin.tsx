"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type LocOpt = { id: number; name: string; slug: string };

type RouteRow = {
  id: number;
  slug: string;
  routeType: string;
  originId: number;
  destinationId: number;
  distanceKm: number | null;
  travelTimeMinutes: number | null;
  description: string;
  oneWayNotes: string;
  roundTripNotes: string;
  priceFrom: number | null;
  pickupInfo: string;
  active: boolean;
  indexable: boolean;
  seoPriority: number;
  origin?: LocOpt;
  destination?: LocOpt;
};

const empty = {
  originId: 0,
  destinationId: 0,
  slug: "",
  routeType: "OUTSTATION",
  distanceKm: "",
  travelTimeMinutes: "",
  description: "",
  oneWayNotes: "",
  roundTripNotes: "",
  priceFrom: "",
  pickupInfo: "",
  active: true,
  indexable: false,
  seoPriority: 0,
};

export default function RoutesAdmin({
  routes,
  locations,
}: {
  routes: RouteRow[];
  locations: LocOpt[];
}) {
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
    const payload = {
      ...form,
      originId: Number(form.originId),
      destinationId: Number(form.destinationId),
      distanceKm: form.distanceKm === "" ? null : form.distanceKm,
      travelTimeMinutes: form.travelTimeMinutes === "" ? null : form.travelTimeMinutes,
      priceFrom: form.priceFrom === "" ? null : form.priceFrom,
    };
    const res = await fetch("/api/admin/routes", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { id: editing, ...payload } : payload),
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
    if (!confirm("Deactivate this route?")) return;
    await fetch(`/api/admin/routes?id=${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <form className="ac-form" onSubmit={save} style={{ maxWidth: 720, margin: "20px 0 32px" }}>
        <h3>{editing ? "Edit route" : "Add route"}</h3>
        <select value={form.originId || ""} onChange={(e) => set("originId", Number(e.target.value))} required>
          <option value="">Origin…</option>
          {locations.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>
        <select
          value={form.destinationId || ""}
          onChange={(e) => set("destinationId", Number(e.target.value))}
          required
        >
          <option value="">Destination…</option>
          {locations.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>
        <input placeholder="Slug (auto if blank)" value={form.slug} onChange={(e) => set("slug", e.target.value)} />
        <select value={form.routeType} onChange={(e) => set("routeType", e.target.value)}>
          <option value="OUTSTATION">OUTSTATION</option>
          <option value="AIRPORT">AIRPORT</option>
          <option value="LOCAL">LOCAL</option>
          <option value="CUSTOM">CUSTOM</option>
        </select>
        <input
          type="number"
          placeholder="Distance km"
          value={form.distanceKm}
          onChange={(e) => set("distanceKm", e.target.value)}
        />
        <input
          type="number"
          placeholder="Travel time (min)"
          value={form.travelTimeMinutes}
          onChange={(e) => set("travelTimeMinutes", e.target.value)}
        />
        <input
          type="number"
          placeholder="Price from (verified only)"
          value={form.priceFrom}
          onChange={(e) => set("priceFrom", e.target.value)}
        />
        <input
          type="number"
          placeholder="SEO priority"
          value={form.seoPriority}
          onChange={(e) => set("seoPriority", Number(e.target.value))}
        />
        <textarea placeholder="Description" value={form.description} onChange={(e) => set("description", e.target.value)} />
        <textarea placeholder="One-way notes" value={form.oneWayNotes} onChange={(e) => set("oneWayNotes", e.target.value)} />
        <textarea
          placeholder="Round-trip notes"
          value={form.roundTripNotes}
          onChange={(e) => set("roundTripNotes", e.target.value)}
        />
        <textarea placeholder="Pickup info" value={form.pickupInfo} onChange={(e) => set("pickupInfo", e.target.value)} />
        <label>
          <input type="checkbox" checked={!!form.active} onChange={(e) => set("active", e.target.checked)} /> Active
        </label>
        <label>
          <input type="checkbox" checked={!!form.indexable} onChange={(e) => set("indexable", e.target.checked)} />{" "}
          Indexable
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
            <th>Route</th>
            <th>Type</th>
            <th>Price</th>
            <th>Flags</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {routes.map((r) => (
            <tr key={r.id} style={{ opacity: r.active ? 1 : 0.5 }}>
              <td>
                {r.origin?.name || r.originId} → {r.destination?.name || r.destinationId}
                <div style={{ color: "#888", fontSize: 11 }}>/{r.slug}</div>
              </td>
              <td>{r.routeType}</td>
              <td>{r.priceFrom != null ? `₹${r.priceFrom}` : "—"}</td>
              <td style={{ fontSize: 12 }}>
                {r.indexable ? "index" : "noindex"} · p{r.seoPriority}
              </td>
              <td>
                <button
                  className="admin-btn"
                  onClick={() => {
                    setEditing(r.id);
                    setForm({
                      ...r,
                      distanceKm: r.distanceKm ?? "",
                      travelTimeMinutes: r.travelTimeMinutes ?? "",
                      priceFrom: r.priceFrom ?? "",
                    });
                  }}
                >
                  Edit
                </button>{" "}
                {r.active && (
                  <button className="admin-btn danger" onClick={() => archive(r.id)}>
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
