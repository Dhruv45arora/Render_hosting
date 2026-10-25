"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Season = { id: number; label: string; startDate: string; endDate: string; pricePerDay: number };

type Vehicle = {
  id: number;
  slug: string;
  name: string;
  model: string;
  brand: string;
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
  status: string;
  fuelPolicy: string;
  kmLimit: string;
  description: string;
  image: string;
  featured: boolean;
  sortOrder: number;
  seasonalRates: Season[];
};

const empty = {
  slug: "",
  name: "",
  model: "",
  brand: "",
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
  status: "ACTIVE",
  fuelPolicy: "As-is / as-is",
  kmLimit: "250 km/day",
  description: "",
  image: "/images/fleet/hatchback-silver.jpg",
  featured: false,
  sortOrder: 0,
};

const CATEGORIES = ["bike", "scooty", "car", "suv", "luxury", "wedding", "tempo", "three_wheeler", "chota_hathi"];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="va-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export default function VehicleAdmin({ vehicles }: { vehicles: Vehicle[] }) {
  const router = useRouter();
  const [form, setForm] = useState<any>(empty);
  const [editing, setEditing] = useState<number | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [q, setQ] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [season, setSeason] = useState({ label: "", startDate: "", endDate: "", pricePerDay: "" });
  const [imgBroken, setImgBroken] = useState(false);
  const [statusBusy, setStatusBusy] = useState<number | null>(null);

  const editingVehicle = editing ? vehicles.find((v) => v.id === editing) : null;

  useEffect(() => {
    if (!panelOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [panelOpen]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return vehicles.filter((v) => {
      if (filterStatus !== "ALL" && (v.status || "ACTIVE") !== filterStatus) return false;
      if (!needle) return true;
      return (
        v.name.toLowerCase().includes(needle) ||
        v.slug.toLowerCase().includes(needle) ||
        v.category.toLowerCase().includes(needle) ||
        (v.brand || "").toLowerCase().includes(needle)
      );
    });
  }, [vehicles, q, filterStatus]);

  function set(k: string, v: any) {
    setForm((f: any) => ({ ...f, [k]: v }));
    if (k === "image") setImgBroken(false);
  }

  function openCreate() {
    setEditing(null);
    setForm(empty);
    setImgBroken(false);
    setSeason({ label: "", startDate: "", endDate: "", pricePerDay: "" });
    setPanelOpen(true);
  }

  function openEdit(v: Vehicle) {
    setEditing(v.id);
    setForm(v);
    setImgBroken(false);
    setSeason({ label: "", startDate: "", endDate: "", pricePerDay: "" });
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
    setEditing(null);
    setForm(empty);
    setImgBroken(false);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { id, seasonalRates, createdAt, updatedAt, locations, media, seoPages, bookings, ...rest } = form;
    const status = rest.status || "ACTIVE";
    const payload = {
      ...rest,
      featured: !!rest.featured,
      status,
      availability:
        status === "ARCHIVED" || status === "INACTIVE" ? "unavailable" : rest.availability || "available",
    };
    try {
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
      closePanel();
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("Archive this vehicle? The URL stays reserved for SEO.")) return;
    await fetch(`/api/admin/vehicles?id=${id}`, { method: "DELETE" });
    if (editing === id) closePanel();
    router.refresh();
  }

  async function setStatus(v: Vehicle, status: "ACTIVE" | "INACTIVE") {
    if (v.status === status || statusBusy === v.id) return;
    setStatusBusy(v.id);
    try {
      await fetch("/api/admin/vehicles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: v.id,
          status,
          availability: status === "ACTIVE" ? "available" : "unavailable",
        }),
      });
      if (editing === v.id) {
        setForm((f: any) => ({
          ...f,
          status,
          availability: status === "ACTIVE" ? "available" : "unavailable",
        }));
      }
      router.refresh();
    } finally {
      setStatusBusy(null);
    }
  }

  async function addSeason(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    await fetch("/api/admin/pricing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicleId: editing,
        label: season.label,
        startDate: season.startDate,
        endDate: season.endDate,
        pricePerDay: Number(season.pricePerDay),
      }),
    });
    setSeason({ label: "", startDate: "", endDate: "", pricePerDay: "" });
    router.refresh();
  }

  async function removeSeason(id: number) {
    if (!confirm("Remove this seasonal rate?")) return;
    await fetch(`/api/admin/pricing?id=${id}`, { method: "DELETE" });
    router.refresh();
  }

  const previewSrc = form.image || "";

  return (
    <div className="va">
      <div className="va-toolbar">
        <div className="va-toolbar-left">
          <input
            className="va-search"
            placeholder="Search name, slug, category…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="va-filter">
            <option value="ALL">All status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>
        <button type="button" className="admin-btn gold" onClick={openCreate}>
          + Add vehicle
        </button>
      </div>

      {panelOpen && (
        <div
          className="va-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) closePanel();
          }}
        >
        <div className="va-panel">
          <div className="va-panel-head">
            <div>
              <h3>{editing ? "Edit vehicle" : "Add vehicle"}</h3>
              {editingVehicle && (
                <p className="va-muted">
                  Public page: <code>/rent/{editingVehicle.slug}</code>
                </p>
              )}
            </div>
            <button type="button" className="admin-btn" onClick={closePanel}>
              Close
            </button>
          </div>

          <form className="va-form" onSubmit={save}>
            <div className="va-form-main">
              <div className="va-grid">
                <Field label="Name">
                  <input value={form.name} onChange={(e) => set("name", e.target.value)} required />
                </Field>
                <Field label="URL slug">
                  <input value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
                </Field>
                <Field label="Brand">
                  <input value={form.brand || ""} onChange={(e) => set("brand", e.target.value)} />
                </Field>
                <Field label="Model">
                  <input value={form.model} onChange={(e) => set("model", e.target.value)} />
                </Field>
                <Field label="Category">
                  <select value={form.category} onChange={(e) => set("category", e.target.value)}>
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Drive type">
                  <select value={form.driveType} onChange={(e) => set("driveType", e.target.value)}>
                    <option value="self_drive">Self drive</option>
                    <option value="chauffeur">Chauffeur</option>
                    <option value="both">Both</option>
                  </select>
                </Field>
                <Field label="₹ / day">
                  <input
                    type="number"
                    value={form.pricePerDay}
                    onChange={(e) => set("pricePerDay", Number(e.target.value))}
                  />
                </Field>
                <Field label="₹ / km">
                  <input
                    type="number"
                    value={form.pricePerKm}
                    onChange={(e) => set("pricePerKm", Number(e.target.value))}
                  />
                </Field>
                <Field label="Deposit ₹">
                  <input type="number" value={form.deposit} onChange={(e) => set("deposit", Number(e.target.value))} />
                </Field>
                <Field label="Seats">
                  <input type="number" value={form.seats} onChange={(e) => set("seats", Number(e.target.value))} />
                </Field>
                <Field label="Fuel">
                  <input value={form.fuel} onChange={(e) => set("fuel", e.target.value)} />
                </Field>
                <Field label="Transmission">
                  <input value={form.transmission} onChange={(e) => set("transmission", e.target.value)} />
                </Field>
                <Field label="Mileage">
                  <input value={form.mileage} onChange={(e) => set("mileage", e.target.value)} />
                </Field>
                <Field label="Sort order">
                  <input
                    type="number"
                    value={form.sortOrder ?? 0}
                    onChange={(e) => set("sortOrder", Number(e.target.value))}
                  />
                </Field>
                <Field label="Availability">
                  <select value={form.availability} onChange={(e) => set("availability", e.target.value)}>
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </Field>
                <Field label="Status">
                  <select value={form.status || "ACTIVE"} onChange={(e) => set("status", e.target.value)}>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </Field>
              </div>

              <Field label="Description">
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                />
              </Field>

              <label className="va-check">
                <input
                  type="checkbox"
                  checked={!!form.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                />
                Featured on homepage
              </label>

              <div className="va-actions">
                <button type="submit" className="admin-btn gold" disabled={saving}>
                  {saving ? "Saving…" : editing ? "Save changes" : "Create vehicle"}
                </button>
                <button type="button" className="admin-btn" onClick={closePanel}>
                  Cancel
                </button>
              </div>
            </div>

            <aside className="va-media">
              <div className="va-preview">
                {!imgBroken && previewSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewSrc} alt={form.name || "Vehicle preview"} onError={() => setImgBroken(true)} />
                ) : (
                  <div className="va-preview-empty">No image preview</div>
                )}
              </div>
              <Field label="Image path (under /public)">
                <input
                  value={form.image}
                  onChange={(e) => set("image", e.target.value)}
                  placeholder="/images/fleet/…"
                />
              </Field>
              <p className="va-hint">Paste a path like <code>/images/fleet/activa.jpg</code>. Preview updates live.</p>
            </aside>
          </form>

          {editing && (
            <div className="va-season">
              <h4>Seasonal rates</h4>
              {editingVehicle?.seasonalRates?.length ? (
                <ul className="va-season-list">
                  {editingVehicle.seasonalRates.map((r) => (
                    <li key={r.id}>
                      <div>
                        <strong>{r.label}</strong>
                        <span>
                          ₹{r.pricePerDay}/day · {r.startDate} → {r.endDate}
                        </span>
                      </div>
                      <button type="button" className="admin-btn danger" onClick={() => removeSeason(r.id)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="va-muted">No seasonal rates yet.</p>
              )}
              <form className="va-season-form" onSubmit={addSeason}>
                <Field label="Label">
                  <input
                    value={season.label}
                    onChange={(e) => setSeason((s) => ({ ...s, label: e.target.value }))}
                    placeholder="Char Dham season"
                    required
                  />
                </Field>
                <Field label="Start">
                  <input
                    type="date"
                    value={season.startDate}
                    onChange={(e) => setSeason((s) => ({ ...s, startDate: e.target.value }))}
                    required
                  />
                </Field>
                <Field label="End">
                  <input
                    type="date"
                    value={season.endDate}
                    onChange={(e) => setSeason((s) => ({ ...s, endDate: e.target.value }))}
                    required
                  />
                </Field>
                <Field label="₹ / day">
                  <input
                    type="number"
                    value={season.pricePerDay}
                    onChange={(e) => setSeason((s) => ({ ...s, pricePerDay: e.target.value }))}
                    required
                  />
                </Field>
                <button type="submit" className="admin-btn gold">
                  Add rate
                </button>
              </form>
            </div>
          )}
        </div>
        </div>
      )}

      <div className="va-list">
        {filtered.map((v) => (
          <article key={v.id} className={`va-card${v.status === "ARCHIVED" ? " is-archived" : ""}${editing === v.id ? " is-active" : ""}`}>
            <div className="va-card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.image || "/images/fleet/hatchback-silver.jpg"}
                alt={v.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/fleet/hatchback-silver.jpg";
                }}
              />
            </div>
            <div className="va-card-body">
              <div className="va-card-top">
                <div>
                  <h3>{v.name}</h3>
                  <p className="va-muted">
                    /rent/{v.slug}
                    {v.featured ? " · Featured" : ""}
                  </p>
                </div>
                <span className={`va-badge va-badge-${(v.status || "ACTIVE").toLowerCase()}`}>
                  {v.status || "ACTIVE"}
                </span>
              </div>
              <div className="va-meta">
                <span>{v.category}</span>
                <span>₹{v.pricePerDay}/day</span>
                <span>{v.availability}</span>
                {v.seasonalRates?.length > 0 && <span>{v.seasonalRates.length} seasonal</span>}
              </div>
              {v.status !== "ARCHIVED" && (
                <div className="va-status-toggle" role="group" aria-label="Show or hide on website">
                  <button
                    type="button"
                    className={`va-toggle${(v.status || "ACTIVE") === "ACTIVE" ? " is-on" : ""}`}
                    aria-pressed={(v.status || "ACTIVE") === "ACTIVE"}
                    disabled={statusBusy === v.id}
                    title="Show this vehicle on the homepage and fleet pages"
                    onClick={() => setStatus(v, "ACTIVE")}
                  >
                    ● Active
                  </button>
                  <button
                    type="button"
                    className={`va-toggle va-toggle-off${v.status === "INACTIVE" ? " is-on" : ""}`}
                    aria-pressed={v.status === "INACTIVE"}
                    disabled={statusBusy === v.id}
                    title="Hide this vehicle from the public site"
                    onClick={() => setStatus(v, "INACTIVE")}
                  >
                    ○ Inactive
                  </button>
                </div>
              )}
              <div className="va-card-actions">
                <button type="button" className="admin-btn" onClick={() => openEdit(v)}>
                  Edit
                </button>
                {v.status !== "ARCHIVED" && (
                  <button type="button" className="admin-btn danger" onClick={() => remove(v.id)}>
                    Archive
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
        {!filtered.length && <p className="va-muted">No vehicles match this filter.</p>}
      </div>
    </div>
  );
}
