import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Guides: Chakrata, Char Dham, Mussoorie & Dehradun Rentals",
  description:
    "Practical road-trip and rental guides from Arora Cars Dehradun — Chakrata, Kedarnath, Mussoorie, scooty tips.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogIndex() {
  return (
    <main>
      <section className="ac-hero">
        <div className="ac-hero-inner">
          <span className="ac-hero-badge">GUIDES</span>
          <h1>Hill-road notes from Dehradun</h1>
          <p>
            Long-tail pages that answer real trip questions — then send you to a bookable vehicle.
            Studio writing is on{" "}
            <a className="inline-link" href="https://tirupati-technologies.com/blog">
              their articles
            </a>
            .
          </p>
        </div>
      </section>
      <section className="ac-section">
        <div className="ac-grid cols-3 container">
          {BLOG_POSTS.map((p) => (
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
