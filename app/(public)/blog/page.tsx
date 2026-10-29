import type { Metadata } from "next";
import Link from "next/link";
import { listBlogPosts } from "@/lib/cms/resolve-blog";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Guides: Chakrata, Char Dham, Mussoorie & Dehradun Rentals",
  description:
    "Practical road-trip and rental guides from Arora Cars Dehradun — Chakrata, Kedarnath, Mussoorie, scooty tips.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default async function BlogIndex() {
  const posts = await listBlogPosts();
  return (
    <main>
      <section className="ac-hero">
        <div className="ac-hero-inner">
          <span className="ac-hero-badge">GUIDES</span>
          <h1>Hill-road notes from Dehradun</h1>
          <p>
            Long-tail pages that answer real trip questions — then send you to a bookable vehicle.
          </p>
        </div>
      </section>
      <section className="ac-section">
        <div className="ac-grid cols-3 container">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="ac-card">
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
