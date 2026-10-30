"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export type PieSlice = { label: string; value: number; color: string };

export type FleetOption = { slug: string; name: string; category: string };

export type CeoDashData = {
  kpis: {
    newBookings: number;
    confirmed: number;
    done: number;
    cancelled: number;
    totalBookings: number;
    activeVehicles: number;
    inactiveVehicles: number;
    weekBookings: number;
  };
  statusPie: PieSlice[];
  categoryPie: PieSlice[];
  recent: Array<{
    id: number;
    name: string;
    phone: string;
    vehicleName: string;
    status: string;
    createdAt: string;
  }>;
  fleet: FleetOption[];
  phone: string;
  whatsapp: string;
};

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function slicePath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polar(cx, cy, r, end);
  const e = polar(cx, cy, r, start);
  const large = end - start > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y} Z`;
}

function PieChart({ slices, title }: { slices: PieSlice[]; title: string }) {
  const total = slices.reduce((n, s) => n + s.value, 0);
  const cx = 90;
  const cy = 90;
  const r = 78;

  if (total <= 0) {
    return (
      <div className="ceo-pie-card">
        <h3>{title}</h3>
        <p className="ceo-empty">No data yet</p>
      </div>
    );
  }

  let angle = 0;
  const paths =
    slices.length === 1 && slices[0].value > 0
      ? [<circle key="full" cx={cx} cy={cy} r={r} fill={slices[0].color} />]
      : slices
          .filter((s) => s.value > 0)
          .map((s) => {
            const sweep = (s.value / total) * 360;
            const start = angle;
            const end = angle + sweep;
            angle = end;
            return <path key={s.label} d={slicePath(cx, cy, r, start, end)} fill={s.color} />;
          });

  return (
    <div className="ceo-pie-card">
      <h3>{title}</h3>
      <div className="ceo-pie-row">
        <svg viewBox="0 0 180 180" className="ceo-pie" aria-hidden>
          {paths}
          <circle cx={cx} cy={cy} r={42} fill="#f4f7f4" />
          <text x={cx} y={cy - 4} textAnchor="middle" className="ceo-pie-total">
            {total}
          </text>
          <text x={cx} y={cy + 14} textAnchor="middle" className="ceo-pie-sub">
            total
          </text>
        </svg>
        <ul className="ceo-legend">
          {slices.map((s) => (
            <li key={s.label}>
              <span className="ceo-dot" style={{ background: s.color }} />
              <span>{s.label}</span>
              <strong>
                {s.value}
                {total ? ` · ${Math.round((s.value / total) * 100)}%` : ""}
              </strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const emptyInquiry = {
  name: "",
  phone: "",
  email: "",
  city: "Dehradun",
  vehicleSlug: "",
  startDate: "",
  endDate: "",
  status: "new",
  message: "",
};

export default function CeoDashboard({ data }: { data: CeoDashData }) {
  const router = useRouter();
  const { kpis, statusPie, categoryPie, recent, fleet, phone, whatsapp } = data;
  const [form, setForm] = useState(emptyInquiry);
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState("");
  const [error, setError] = useState("");
  const [statusBusy, setStatusBusy] = useState<number | null>(null);

  const selectedVehicle = useMemo(
    () => fleet.find((v) => v.slug === form.vehicleSlug) || null,
    [fleet, form.vehicleSlug]
  );

  function setField(key: keyof typeof emptyInquiry, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function postInquiry(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setOk("");
    setError("");
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          vehicleName: selectedVehicle?.name || "",
        }),
      });
      const dataRes = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof dataRes.error === "string" ? dataRes.error : "Could not post enquiry");
        return;
      }
      setOk("Enquiry posted to inbox.");
      setForm(emptyInquiry);
      router.refresh();
    } catch {
      setError("Network error — try again");
    } finally {
      setSaving(false);
    }
  }

  async function setStatus(id: number, status: string) {
    if (statusBusy === id) return;
    setStatusBusy(id);
    try {
      await fetch("/api/admin/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      router.refresh();
    } finally {
      setStatusBusy(null);
    }
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="ceo">
      <header className="ceo-hero">
        <div>
          <p className="ceo-eyebrow">CEO command desk</p>
          <h1>Operations board</h1>
          <p className="ceo-lead">
            Post walk-in / phone enquiries, watch booking mix, manage fleet cards. SEO &amp; blogs stay
            locked.
          </p>
          <p className="ceo-date">{today}</p>
        </div>
        <div className="ceo-hero-actions">
          <a href="#post-enquiry" className="admin-btn gold">
            + Post enquiry
          </a>
          <Link href="/admin/bookings" className="admin-btn">
            Full inbox
          </Link>
          <Link href="/admin/vehicles" className="admin-btn">
            Fleet cards
          </Link>
        </div>
      </header>

      <div className="ceo-kpis">
        <div className="ceo-kpi accent">
          <span>New enquiries</span>
          <strong>{kpis.newBookings}</strong>
          <em>need action</em>
        </div>
        <div className="ceo-kpi">
          <span>This week</span>
          <strong>{kpis.weekBookings}</strong>
          <em>last 7 days</em>
        </div>
        <div className="ceo-kpi">
          <span>Confirmed</span>
          <strong>{kpis.confirmed}</strong>
          <em>in pipeline</em>
        </div>
        <div className="ceo-kpi">
          <span>Active fleet</span>
          <strong>{kpis.activeVehicles}</strong>
          <em>live on site</em>
        </div>
        <div className="ceo-kpi muted">
          <span>Closed</span>
          <strong>
            {kpis.done}
            <small> / {kpis.cancelled}</small>
          </strong>
          <em>done / cancelled</em>
        </div>
        <div className="ceo-kpi muted">
          <span>Inactive cards</span>
          <strong>{kpis.inactiveVehicles}</strong>
          <em>hidden from site</em>
        </div>
      </div>

      <div className="ceo-workbench">
        <section className="ceo-panel ceo-inquiry" id="post-enquiry">
          <div className="ceo-panel-head">
            <div>
              <h2>Post enquiry</h2>
              <p className="ceo-panel-sub">Phone call, WhatsApp or walk-in — add it to the booking inbox.</p>
            </div>
          </div>

          <form className="ceo-form" onSubmit={postInquiry}>
            <div className="ceo-form-grid">
              <label>
                <span>Guest name *</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="Rahul Sharma"
                />
              </label>
              <label>
                <span>Phone *</span>
                <input
                  required
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value.replace(/\D/g, "").slice(0, 15))}
                  placeholder="98XXXXXXXX"
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="optional"
                />
              </label>
              <label>
                <span>City</span>
                <input value={form.city} onChange={(e) => setField("city", e.target.value)} />
              </label>
              <label className="ceo-span-2">
                <span>Vehicle / product</span>
                <select
                  value={form.vehicleSlug}
                  onChange={(e) => setField("vehicleSlug", e.target.value)}
                >
                  <option value="">General enquiry (no vehicle)</option>
                  {fleet.map((v) => (
                    <option key={v.slug} value={v.slug}>
                      {v.name} · {v.category}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Start date *</span>
                <input
                  required
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setField("startDate", e.target.value)}
                />
              </label>
              <label>
                <span>End date *</span>
                <input
                  required
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setField("endDate", e.target.value)}
                />
              </label>
              <label>
                <span>Status</span>
                <select value={form.status} onChange={(e) => setField("status", e.target.value)}>
                  <option value="new">new</option>
                  <option value="confirmed">confirmed</option>
                  <option value="done">done</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </label>
              <label className="ceo-span-2">
                <span>Notes</span>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setField("message", e.target.value)}
                  placeholder="Pickup point, route, budget, call summary…"
                />
              </label>
            </div>

            <div className="ceo-form-actions">
              <button type="submit" className="admin-btn gold" disabled={saving}>
                {saving ? "Posting…" : "Post enquiry"}
              </button>
              <button
                type="button"
                className="admin-btn"
                disabled={saving}
                onClick={() => {
                  setForm(emptyInquiry);
                  setOk("");
                  setError("");
                }}
              >
                Clear
              </button>
              {ok && <span className="ceo-form-ok">{ok}</span>}
              {error && <span className="ceo-form-err">{error}</span>}
            </div>
          </form>
        </section>

        <aside className="ceo-side-col">
          <section className="ceo-panel">
            <h2>Quick ops</h2>
            <ul className="ceo-ops">
              <li>
                <a href="#post-enquiry">
                  <strong>Post enquiry</strong>
                  <span>Log a call or walk-in now</span>
                </a>
              </li>
              <li>
                <Link href="/admin/bookings">
                  <strong>Bookings inbox</strong>
                  <span>Confirm · done · cancel</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/vehicles">
                  <strong>Product cards</strong>
                  <span>Prices, photos, active status</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/settings">
                  <strong>Contact numbers</strong>
                  <span>
                    {phone || "—"} · WA {whatsapp || "—"}
                  </span>
                </Link>
              </li>
            </ul>
            <p className="ceo-lock-note">Locked: SEO pages, blogs, locations, routes, page copy.</p>
          </section>
        </aside>
      </div>

      <div className="ceo-charts">
        <PieChart slices={statusPie} title="Bookings by status" />
        <PieChart slices={categoryPie} title="Fleet by category" />
      </div>

      <section className="ceo-panel">
        <div className="ceo-panel-head">
          <div>
            <h2>Recent enquiries</h2>
            <p className="ceo-panel-sub">Update status without leaving the desk.</p>
          </div>
          <Link href="/admin/bookings">View all</Link>
        </div>
        {recent.length === 0 ? (
          <p className="ceo-empty">No bookings yet — post the first enquiry above.</p>
        ) : (
          <div className="ceo-table-wrap">
            <table className="admin-table ceo-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Guest</th>
                  <th>Vehicle</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r.id}>
                    <td>{new Date(r.createdAt).toLocaleString("en-IN")}</td>
                    <td>
                      {r.name}
                      <br />
                      <span className="ceo-muted">{r.phone}</span>
                    </td>
                    <td>{r.vehicleName || "—"}</td>
                    <td>
                      <select
                        className={`ceo-status-select ceo-status-${r.status}`}
                        value={r.status}
                        disabled={statusBusy === r.id}
                        onChange={(e) => setStatus(r.id, e.target.value)}
                      >
                        <option value="new">new</option>
                        <option value="confirmed">confirmed</option>
                        <option value="done">done</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
