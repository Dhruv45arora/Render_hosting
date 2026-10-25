"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Opt = { id: number; name?: string; slug: string };

type SeoPage = {
  id: number;
  slug: string;
  pageType: string;
  status: string;
  locationId: number | null;
  vehicleId: number | null;
  serviceId: number | null;
  routeId: number | null;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  mainContent: string;
  primaryKeyword: string;
  secondaryKeywords: string;
  featuredImage: string;
  faqs: string;
  relatedSlugs: string;
  indexable: boolean;
  sitemapEnabled: boolean;
  featured: boolean;
  priority: number;
  legacySource?: string | null;
  location?: Opt | null;
  vehicle?: Opt | null;
  service?: Opt | null;
  route?: Opt | null;
};

const empty = {
  slug: "",
  pageType: "CUSTOM",
  status: "DRAFT",
  locationId: "",
  vehicleId: "",
  serviceId: "",
  routeId: "",
  seoTitle: "",
  metaDescription: "",
  h1: "",
  heroTitle: "",
  heroSubtitle: "",
  intro: "",
  mainContent: "",
  primaryKeyword: "",
  secondaryKeywords: "[]",
  featuredImage: "",
  faqs: "[]",
  relatedSlugs: "[]",
  indexable: false,
  sitemapEnabled: false,
  featured: false,
  priority: 0,
};

const PAGE_TYPES = [
  { value: "LOCATION", label: "City / location" },
  { value: "SERVICE_LOCATION", label: "Service in a city" },
  { value: "VEHICLE_LOCATION", label: "Vehicle in a city" },
  { value: "ROUTE", label: "Route (A → B)" },
  { value: "AIRPORT", label: "Airport" },
  { value: "STATION", label: "Station" },
  { value: "WEDDING", label: "Wedding" },
  { value: "MONTHLY", label: "Monthly" },
  { value: "GUIDE", label: "Guide" },
  { value: "CUSTOM", label: "Custom" },
];

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="sp-field">
      <span>{label}</span>
      {children}
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

function statusClass(status: string) {
  const s = (status || "DRAFT").toLowerCase();
  if (s === "published") return "sp-pill sp-pill-live";
  if (s === "archived") return "sp-pill sp-pill-off";
  return "sp-pill sp-pill-draft";
}

export default function SeoPagesAdmin({
  pages,
  locations,
  vehicles,
  services,
  routes,
}: {
  pages: SeoPage[];
  locations: Opt[];
  vehicles: Opt[];
  services: Opt[];
  routes: Opt[];
}) {
  const router = useRouter();
  const [form, setForm] = useState<any>(empty);
  const [editing, setEditing] = useState<number | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [quick, setQuick] = useState<"ALL" | "TAXI" | "WAVE1" | "GOA">("ALL");

  useEffect(() => {
    if (!panelOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [panelOpen]);

  function set(k: string, v: any) {
    setForm((f: any) => ({ ...f, [k]: v }));
  }

  function openCreate() {
    setEditing(null);
    setForm(empty);
    setError("");
    setPanelOpen(true);
  }

  function openEdit(p: SeoPage) {
    setEditing(p.id);
    setForm({
      ...p,
      locationId: p.locationId ?? "",
      vehicleId: p.vehicleId ?? "",
      serviceId: p.serviceId ?? "",
      routeId: p.routeId ?? "",
    });
    setError("");
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
    setEditing(null);
    setForm(empty);
    setError("");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    const payload = {
      ...form,
      locationId: form.locationId || null,
      vehicleId: form.vehicleId || null,
      serviceId: form.serviceId || null,
      routeId: form.routeId || null,
    };
    try {
      const res = await fetch("/api/admin/seo-pages", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing ? { id: editing, ...payload } : payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Save failed");
        return;
      }
      closePanel();
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function archive(id: number) {
    if (!confirm("Archive this CMS page? The live website keeps using static pages for old URLs when those exist.")) return;
    await fetch(`/api/admin/seo-pages?id=${id}`, { method: "DELETE" });
    if (editing === id) closePanel();
    router.refresh();
  }

  const counts = useMemo(() => {
    const taxi = pages.filter((p) => p.slug.includes("taxi")).length;
    const draft = pages.filter((p) => p.status === "DRAFT").length;
    const published = pages.filter((p) => p.status === "PUBLISHED").length;
    return { total: pages.length, taxi, draft, published };
  }, [pages]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return pages.filter((p) => {
      if (statusFilter !== "ALL" && p.status !== statusFilter) return false;
      if (typeFilter !== "ALL" && p.pageType !== typeFilter) return false;
      if (quick === "TAXI" && !p.slug.includes("taxi") && !(p.h1 || "").toLowerCase().includes("taxi")) return false;
      if (quick === "WAVE1" && p.legacySource !== "wave1") return false;
      if (quick === "GOA" && !p.slug.includes("goa") && !(p.h1 || "").toLowerCase().includes("goa")) return false;
      if (!needle) return true;
      return (
        p.slug.toLowerCase().includes(needle) ||
        (p.h1 || "").toLowerCase().includes(needle) ||
        (p.seoTitle || "").toLowerCase().includes(needle) ||
        (p.primaryKeyword || "").toLowerCase().includes(needle) ||
        p.status.toLowerCase().includes(needle) ||
        p.pageType.toLowerCase().includes(needle)
      );
    });
  }, [pages, q, statusFilter, typeFilter, quick]);

  return (
    <div className="sp">
      <div className="sp-help">
        <p>
          <strong>What this screen is:</strong> CMS copies of landing pages you can draft and publish.
        </p>
        <p>
          <strong>Taxi pages on the live site</strong> already work at{" "}
          <a href="/taxi" target="_blank" rel="noreferrer">
            /taxi
          </a>{" "}
          (built into the website). They may not all appear in this CMS list unless imported. Search “taxi” below to find CMS drafts.
        </p>
        <p>
          <strong>Tip:</strong> If a URL already exists on the website (Wave 1 / static), that live page wins until you intentionally cut over.
        </p>
      </div>

      <div className="sp-stats">
        <span>{counts.total} in CMS</span>
        <span>{counts.published} published</span>
        <span>{counts.draft} drafts</span>
        <span>{counts.taxi} with “taxi” in slug</span>
      </div>

      <div className="sp-toolbar">
        <div className="sp-toolbar-left">
          <input
            className="sp-search"
            placeholder="Search title, slug, keyword…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select className="sp-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="ALL">All status</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <select className="sp-filter" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="ALL">All types</option>
            {PAGE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="admin-btn gold" onClick={openCreate}>
          + New page
        </button>
      </div>

      <div className="sp-chips">
        {(
          [
            ["ALL", "All"],
            ["TAXI", "Taxi"],
            ["WAVE1", "Wave 1 import"],
            ["GOA", "Goa"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`sp-chip${quick === key ? " is-on" : ""}`}
            onClick={() => setQuick(key)}
          >
            {label}
          </button>
        ))}
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
          <div className="va-panel sp-panel">
            <div className="va-panel-head">
              <div>
                <h3>{editing ? "Edit page" : "New SEO page"}</h3>
                <p className="va-muted">
                  {editing ? (
                    <>
                      Public URL: <code>/{form.slug || "…"}</code>
                    </>
                  ) : (
                    "Fill basics first, then SEO and content."
                  )}
                </p>
              </div>
              <button type="button" className="admin-btn" onClick={closePanel}>
                Close
              </button>
            </div>

            <form className="sp-form" onSubmit={save}>
              <section className="sp-block">
                <h4>1. Basics</h4>
                <div className="sp-grid">
                  <Field label="Page heading (H1)" hint="Main title visitors see">
                    <input value={form.h1} onChange={(e) => set("h1", e.target.value)} required />
                  </Field>
                  <Field label="URL slug" hint="Example: taxi-service-in-dehradun (no spaces)">
                    <input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="my-page-slug" />
                  </Field>
                  <Field label="Page type">
                    <select value={form.pageType} onChange={(e) => set("pageType", e.target.value)}>
                      {PAGE_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Status" hint="Draft = not for Google. Published = can go live if no static page overrides it.">
                    <select value={form.status} onChange={(e) => set("status", e.target.value)}>
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </Field>
                </div>
              </section>

              <section className="sp-block">
                <h4>2. Link to catalog (optional)</h4>
                <div className="sp-grid">
                  <Field label="Location">
                    <select value={form.locationId || ""} onChange={(e) => set("locationId", e.target.value)}>
                      <option value="">None</option>
                      {locations.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name || l.slug}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Service">
                    <select value={form.serviceId || ""} onChange={(e) => set("serviceId", e.target.value)}>
                      <option value="">None</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name || s.slug}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Vehicle">
                    <select value={form.vehicleId || ""} onChange={(e) => set("vehicleId", e.target.value)}>
                      <option value="">None</option>
                      {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name || v.slug}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Route">
                    <select value={form.routeId || ""} onChange={(e) => set("routeId", e.target.value)}>
                      <option value="">None</option>
                      {routes.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.slug}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </section>

              <section className="sp-block">
                <h4>3. Google / SEO</h4>
                <div className="sp-grid">
                  <Field label="Browser title" hint="Shows in Google and the browser tab">
                    <input value={form.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} />
                  </Field>
                  <Field label="Primary keyword">
                    <input value={form.primaryKeyword} onChange={(e) => set("primaryKeyword", e.target.value)} />
                  </Field>
                </div>
                <Field label="Meta description">
                  <textarea
                    rows={3}
                    value={form.metaDescription}
                    onChange={(e) => set("metaDescription", e.target.value)}
                  />
                </Field>
                <div className="sp-checks">
                  <label>
                    <input
                      type="checkbox"
                      checked={!!form.indexable}
                      onChange={(e) => set("indexable", e.target.checked)}
                    />
                    Allow Google to index (index)
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={!!form.sitemapEnabled}
                      onChange={(e) => set("sitemapEnabled", e.target.checked)}
                    />
                    Include in sitemap
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={!!form.featured}
                      onChange={(e) => set("featured", e.target.checked)}
                    />
                    Featured
                  </label>
                </div>
              </section>

              <section className="sp-block">
                <h4>4. Page content</h4>
                <div className="sp-grid">
                  <Field label="Hero title">
                    <input value={form.heroTitle} onChange={(e) => set("heroTitle", e.target.value)} />
                  </Field>
                  <Field label="Hero subtitle / badge">
                    <input value={form.heroSubtitle} onChange={(e) => set("heroSubtitle", e.target.value)} />
                  </Field>
                </div>
                <Field label="Intro">
                  <textarea rows={3} value={form.intro} onChange={(e) => set("intro", e.target.value)} />
                </Field>
                <Field label="Main content">
                  <textarea rows={7} value={form.mainContent} onChange={(e) => set("mainContent", e.target.value)} />
                </Field>
                <Field label="Image path" hint="Example: /images/fleet/sedan-white.jpg">
                  <input value={form.featuredImage} onChange={(e) => set("featuredImage", e.target.value)} />
                </Field>
                {form.featuredImage ? (
                  <div className="sp-preview">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={form.featuredImage} alt="" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
                  </div>
                ) : null}
                <Field label="Priority number" hint="Higher = more important in your own sorting">
                  <input
                    type="number"
                    value={form.priority}
                    onChange={(e) => set("priority", Number(e.target.value))}
                  />
                </Field>
              </section>

              <div className="va-actions">
                <button type="submit" className="admin-btn gold" disabled={saving}>
                  {saving ? "Saving…" : editing ? "Save changes" : "Create page"}
                </button>
                <button type="button" className="admin-btn" onClick={closePanel}>
                  Cancel
                </button>
              </div>
              {error && <p style={{ color: "crimson" }}>{error}</p>}
            </form>
          </div>
        </div>
      )}

      <div className="sp-list">
        {shown.map((p) => (
          <article key={p.id} className="sp-card">
            <div className="sp-card-main">
              <div className="sp-card-top">
                <div>
                  <h3>{p.h1 || p.seoTitle || p.slug}</h3>
                  <p className="va-muted">
                    /{p.slug}
                    {p.legacySource ? ` · from ${p.legacySource}` : ""}
                    {p.service?.name ? ` · ${p.service.name}` : ""}
                    {p.location?.name ? ` · ${p.location.name}` : ""}
                  </p>
                </div>
                <div className="sp-card-badges">
                  <span className={statusClass(p.status)}>{p.status}</span>
                  <span className="sp-pill sp-pill-type">
                    {PAGE_TYPES.find((t) => t.value === p.pageType)?.label || p.pageType}
                  </span>
                  <span className={`sp-pill ${p.indexable ? "sp-pill-live" : "sp-pill-off"}`}>
                    {p.indexable ? "Google OK" : "noindex"}
                  </span>
                </div>
              </div>
              {p.primaryKeyword ? <p className="sp-keyword">Keyword: {p.primaryKeyword}</p> : null}
              <div className="sp-card-actions">
                <button type="button" className="admin-btn" onClick={() => openEdit(p)}>
                  Edit
                </button>
                <a className="admin-btn" href={`/${p.slug}`} target="_blank" rel="noreferrer">
                  View
                </a>
                {p.status !== "ARCHIVED" && (
                  <button type="button" className="admin-btn danger" onClick={() => archive(p.id)}>
                    Archive
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
        {!shown.length && (
          <p className="va-muted">
            No CMS pages match. Try chip <strong>Taxi</strong>, or open the live hub at{" "}
            <a href="/taxi">/taxi</a>.
          </p>
        )}
      </div>
    </div>
  );
}
