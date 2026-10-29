"use client";

import Link from "next/link";

export type PieSlice = { label: string; value: number; color: string };

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
      ? [
          <circle key="full" cx={cx} cy={cy} r={r} fill={slices[0].color} />,
        ]
      : slices
          .filter((s) => s.value > 0)
          .map((s) => {
            const sweep = (s.value / total) * 360;
            const start = angle;
            const end = angle + sweep;
            angle = end;
            return (
              <path key={s.label} d={slicePath(cx, cy, r, start, end)} fill={s.color} />
            );
          });

  return (
    <div className="ceo-pie-card">
      <h3>{title}</h3>
      <div className="ceo-pie-row">
        <svg viewBox="0 0 180 180" className="ceo-pie" aria-hidden>
          {paths}
          <circle cx={cx} cy={cy} r={42} fill="#f7f9f7" />
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

export default function CeoDashboard({ data }: { data: CeoDashData }) {
  const { kpis, statusPie, categoryPie, recent, phone, whatsapp } = data;

  return (
    <div className="ceo">
      <header className="ceo-hero">
        <div>
          <p className="ceo-eyebrow">CEO desk · operations</p>
          <h1>Business overview</h1>
          <p className="ceo-lead">
            Bookings, fleet cards, and contact numbers. SEO pages and blogs stay locked.
          </p>
        </div>
        <div className="ceo-hero-actions">
          <Link href="/admin/bookings" className="admin-btn gold">
            Open bookings
          </Link>
          <Link href="/admin/vehicles" className="admin-btn">
            Product cards
          </Link>
        </div>
      </header>

      <div className="ceo-kpis">
        <div className="ceo-kpi">
          <span>New enquiries</span>
          <strong>{kpis.newBookings}</strong>
        </div>
        <div className="ceo-kpi">
          <span>This week</span>
          <strong>{kpis.weekBookings}</strong>
        </div>
        <div className="ceo-kpi">
          <span>Confirmed</span>
          <strong>{kpis.confirmed}</strong>
        </div>
        <div className="ceo-kpi">
          <span>Active fleet</span>
          <strong>{kpis.activeVehicles}</strong>
        </div>
        <div className="ceo-kpi muted">
          <span>Done / cancelled</span>
          <strong>
            {kpis.done} / {kpis.cancelled}
          </strong>
        </div>
        <div className="ceo-kpi muted">
          <span>Inactive cards</span>
          <strong>{kpis.inactiveVehicles}</strong>
        </div>
      </div>

      <div className="ceo-charts">
        <PieChart slices={statusPie} title="Bookings by status" />
        <PieChart slices={categoryPie} title="Fleet by category" />
      </div>

      <div className="ceo-panels">
        <section className="ceo-panel">
          <div className="ceo-panel-head">
            <h2>Recent bookings</h2>
            <Link href="/admin/bookings">View all</Link>
          </div>
          {recent.length === 0 ? (
            <p className="ceo-empty">No bookings yet.</p>
          ) : (
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
                      <span className={`ceo-status ceo-status-${r.status}`}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="ceo-panel ceo-side">
          <h2>Quick ops</h2>
          <ul className="ceo-ops">
            <li>
              <Link href="/admin/vehicles">
                <strong>Product cards</strong>
                <span>Prices, photos, active / inactive</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/bookings">
                <strong>Bookings inbox</strong>
                <span>Confirm, done, cancel</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/settings">
                <strong>Contact numbers</strong>
                <span>
                  Phone {phone || "—"} · WA {whatsapp || "—"}
                </span>
              </Link>
            </li>
          </ul>
          <p className="ceo-lock-note">
            Locked for this login: SEO pages, blogs, locations, routes, page copy.
          </p>
        </section>
      </div>
    </div>
  );
}
