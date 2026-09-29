import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blog";
import { articleSchema, breadcrumbSchema } from "@/lib/schema-org";
import { SITE_URL } from "@/lib/constants";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.description, images: [post.heroImage] },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();
  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleSchema({
            title: post.title,
            description: post.description,
            slug: post.slug,
            date: post.date,
            image: post.heroImage,
          }),
        ]}
      />
      <nav className="ac-bc container">
        <Link href="/">Home</Link>
        <span className="ac-bc-sep">/</span>
        <Link href="/blog">Guides</Link>
        <span className="ac-bc-sep">/</span>
        <span>{post.title}</span>
      </nav>
      <section className="ac-hero">
        <div className="ac-hero-inner">
          <span className="ac-hero-badge">{post.date}</span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </div>
      </section>
      <section className="ac-section">
        <article className="prose">
          {post.body.map((block, i) => (
            <div key={i}>
              {block.heading && <h2>{block.heading}</h2>}
              <div dangerouslySetInnerHTML={{ __html: block.html }} />
            </div>
          ))}
          <div className="ac-cta-band" style={{ marginTop: 40 }}>
            <h2>Ready to book from Dehradun?</h2>
            <p>Call or WhatsApp 8445619130 — Clock Tower desk, railway, ISBT or Jolly Grant pickup.</p>
            <Link href="/contact-book-now" className="ac-btn-primary">
              Contact & book
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
