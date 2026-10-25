"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Cat = { id: number; name: string; slug: string };
type Tag = { id: number; name: string; slug: string };

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  featuredImageAlt: string;
  author: string;
  categoryId: number | null;
  status: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  indexable: boolean;
  featured: boolean;
  category?: Cat | null;
  tags?: { tag: Tag }[];
};

const empty = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  featuredImageAlt: "",
  author: "Arora Cars",
  categoryId: "",
  status: "DRAFT",
  seoTitle: "",
  metaDescription: "",
  primaryKeyword: "",
  indexable: true,
  featured: false,
  tagIds: [] as number[],
};

export default function BlogsAdmin({
  posts,
  categories,
  tags,
}: {
  posts: BlogPost[];
  categories: Cat[];
  tags: Tag[];
}) {
  const router = useRouter();
  const [form, setForm] = useState<any>(empty);
  const [editing, setEditing] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [newCat, setNewCat] = useState("");
  const [newTag, setNewTag] = useState("");

  function set(k: string, v: any) {
    setForm((f: any) => ({ ...f, [k]: v }));
  }

  function toggleTag(id: number) {
    setForm((f: any) => {
      const ids: number[] = f.tagIds || [];
      return {
        ...f,
        tagIds: ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
      };
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const payload = { ...form, categoryId: form.categoryId || null };
    const res = await fetch("/api/admin/blogs", {
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
    if (!confirm("Archive this post?")) return;
    await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function createMeta(kind: "category" | "tag", name: string) {
    if (!name.trim()) return;
    await fetch("/api/admin/blog-meta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, name }),
    });
    if (kind === "category") setNewCat("");
    else setNewTag("");
    router.refresh();
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <input placeholder="New category" value={newCat} onChange={(e) => setNewCat(e.target.value)} />
        <button type="button" className="admin-btn" onClick={() => createMeta("category", newCat)}>
          Add category
        </button>
        <input placeholder="New tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} />
        <button type="button" className="admin-btn" onClick={() => createMeta("tag", newTag)}>
          Add tag
        </button>
      </div>

      <form className="ac-form" onSubmit={save} style={{ maxWidth: 800, margin: "20px 0 32px" }}>
        <h3>{editing ? "Edit post" : "Add post"}</h3>
        <input placeholder="Title" value={form.title} onChange={(e) => set("title", e.target.value)} required />
        <input placeholder="Slug" value={form.slug} onChange={(e) => set("slug", e.target.value)} />
        <select value={form.status} onChange={(e) => set("status", e.target.value)}>
          <option value="DRAFT">DRAFT</option>
          <option value="PUBLISHED">PUBLISHED</option>
          <option value="ARCHIVED">ARCHIVED</option>
        </select>
        <select value={form.categoryId || ""} onChange={(e) => set("categoryId", e.target.value)}>
          <option value="">Category…</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {tags.map((t) => (
            <label key={t.id} style={{ fontSize: 13 }}>
              <input
                type="checkbox"
                checked={(form.tagIds || []).includes(t.id)}
                onChange={() => toggleTag(t.id)}
              />{" "}
              {t.name}
            </label>
          ))}
        </div>
        <input placeholder="Author" value={form.author} onChange={(e) => set("author", e.target.value)} />
        <input placeholder="SEO title" value={form.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} />
        <textarea
          placeholder="Meta description"
          value={form.metaDescription}
          onChange={(e) => set("metaDescription", e.target.value)}
        />
        <input
          placeholder="Primary keyword"
          value={form.primaryKeyword}
          onChange={(e) => set("primaryKeyword", e.target.value)}
        />
        <input placeholder="Featured image" value={form.featuredImage} onChange={(e) => set("featuredImage", e.target.value)} />
        <input
          placeholder="Image alt"
          value={form.featuredImageAlt}
          onChange={(e) => set("featuredImageAlt", e.target.value)}
        />
        <textarea placeholder="Excerpt" value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
        <textarea placeholder="Content (HTML ok)" value={form.content} onChange={(e) => set("content", e.target.value)} rows={8} />
        <label>
          <input type="checkbox" checked={!!form.indexable} onChange={(e) => set("indexable", e.target.checked)} />{" "}
          Indexable
        </label>
        <label>
          <input type="checkbox" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} /> Featured
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
            <th>Post</th>
            <th>Category</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id}>
              <td>
                {p.title}
                <div style={{ color: "#888", fontSize: 11 }}>/blog/{p.slug}</div>
              </td>
              <td>{p.category?.name || "—"}</td>
              <td>{p.status}</td>
              <td>
                <button
                  className="admin-btn"
                  onClick={() => {
                    setEditing(p.id);
                    setForm({
                      ...p,
                      categoryId: p.categoryId ?? "",
                      tagIds: (p.tags || []).map((t) => t.tag.id),
                    });
                  }}
                >
                  Edit
                </button>{" "}
                {p.status !== "ARCHIVED" && (
                  <button className="admin-btn danger" onClick={() => archive(p.id)}>
                    Archive
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
