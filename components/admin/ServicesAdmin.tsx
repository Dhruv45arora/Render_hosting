"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Service = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  vehicleCategories: string;
  active: boolean;
  sortOrder: number;
  _count?: { locations: number; seoPages: number };
};

const empty = {
  name: "",
  slug: "",
  description: "",
  image: "",
  icon: "",
  vehicleCategories: "[]",
  active: true,
  sortOrder: 0,
};

export default function ServicesAdmin({ services }: { services: Service[] }) {
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
    const res = await fetch("/api/admin/services", {
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
    if (!confirm("Deactivate this service?")) return;
    await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <form className="ac-form" onSubmit={save} style={{ maxWidth: 720, margin: "20px 0 32px" }}>
        <h3>{editing ? "Edit service" : "Add service"}</h3>
        <input placeholder="Name" value={form.name} onChange={(e) => set("name", e.target.value)} required />
        <input placeholder="Slug" value={form.slug} onChange={(e) => set("slug", e.target.value)} />
        <input placeholder="Image path" value={form.image} onChange={(e) => set("image", e.target.value)} />
        <input placeholder="Icon" value={form.icon} onChange={(e) => set("icon", e.target.value)} />
        <input
          type="number"
          placeholder="Sort order"
          value={form.sortOrder}
          onChange={(e) => set("sortOrder", Number(e.target.value))}
        />
        <input
          placeholder='Vehicle categories JSON e.g. ["car","suv"]'
          value={form.vehicleCategories}
          onChange={(e) => set("vehicleCategories", e.target.value)}
        />
        <textarea placeholder="Description" value={form.description} onChange={(e) => set("description", e.target.value)} />
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
            <th>Service</th>
            <th>Order</th>
            <th>Usage</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id} style={{ opacity: s.active ? 1 : 0.5 }}>
              <td>
                {s.name}
                <div style={{ color: "#888", fontSize: 11 }}>/{s.slug}</div>
              </td>
              <td>{s.sortOrder}</td>
              <td style={{ fontSize: 12 }}>
                Loc:{s._count?.locations ?? 0} · Pages:{s._count?.seoPages ?? 0}
              </td>
              <td>
                <button
                  className="admin-btn"
                  onClick={() => {
                    setEditing(s.id);
                    setForm(s);
                  }}
                >
                  Edit
                </button>{" "}
                {s.active && (
                  <button className="admin-btn danger" onClick={() => archive(s.id)}>
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
