import Link from "next/link";

export default function NotFound() {
  return (
    <main className="ac-hero">
      <div className="ac-hero-inner">
        <h1>Page not found</h1>
        <p>That URL is not in the Arora Cars sitemap.</p>
        <Link className="ac-btn-primary" href="/">
          Back home
        </Link>
      </div>
    </main>
  );
}
