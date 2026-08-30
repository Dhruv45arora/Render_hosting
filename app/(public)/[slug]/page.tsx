import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANDING_PAGES, getPage } from "@/data/pages";
import { getAllVehicles, getVehiclesByCategory } from "@/lib/queries";
import { getSettings } from "@/lib/settings";
import { breadcrumbSchema, faqSchema } from "@/lib/schema-org";
import { phoneHref, SITE_URL, whatsappHref } from "@/lib/constants";
import VehicleCard from "@/components/VehicleCard";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export function generateStaticParams() {
  return LANDING_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = getPage(params.slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `${SITE_URL}/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${SITE_URL}/${page.slug}`,
      images: [page.heroImage],
    },
  };
}

export default async function LandingPage({ params }: { params: { slug: string } }) {
  const page = getPage(params.slug);
  if (!page) notFound();

  const [settings, override] = await Promise.all([
    getSettings(),
    prisma.pageOverride.findUnique({ where: { slug: page.slug } }).catch(() => null),
  ]);

  let vehicles =
    page.slug === "car-fleet-dehradun"
      ? await getAllVehicles()
      : await getVehiclesByCategory(page.categoryFilter, page.driveFilter);

  if (page.slug === "two-wheeler-rental-dehradun") {
    const scooty = await getVehiclesByCategory("scooty");
    vehicles = [...vehicles, ...scooty];
  }

  const intro = override?.heroText || page.intro;
  const blurb = override?.pricingBlurb || "";
  const crumbs = [
    { name: "Home", path: "/" },
    { name: page.h1, path: `/${page.slug}` },
  ];

  return (
    <main>
      <JsonLd data={[breadcrumbSchema(crumbs), ...(page.faqs.length ? [faqSchema(page.faqs)] : [])]} />
      <nav className="ac-bc container" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="ac-bc-sep">/</span>
        <span>{page.h1}</span>
      </nav>
      <section className="ac-hero">
        <div className="ac-hero-inner">
          <span className="ac-hero-badge">{page.badge}</span>
          <h1>{page.h1}</h1>
          <p>{intro}</p>
          {blurb && <p>{blurb}</p>}
          <div className="ac-hero-actions">
            <a className="ac-btn-primary" href={phoneHref(settings.phone)}>
              Call {settings.phone}
            </a>
            <a
              className="ac-btn-secondary ac-btn-wa"
              href={whatsappHref(settings.whatsapp, `Hi Arora Cars, enquiry for ${page.h1}`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {page.sections.map((s) => (
        <section className="ac-section" key={s.heading}>
          <div className="prose">
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </div>
        </section>
      ))}

      {vehicles.length > 0 && (
        <section className="ac-section alt">
          <div className="ac-section-head">
            <span className="ac-section-badge">FLEET</span>
            <h2>Vehicles you can book</h2>
          </div>
          <div className="ac-grid cols-3 container">
            {vehicles.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} whatsapp={settings.whatsapp} />
            ))}
          </div>
        </section>
      )}

      {page.faqs.length > 0 && (
        <section className="ac-section">
          <div className="ac-section-head">
            <span className="ac-section-badge">FAQ</span>
            <h2>Questions</h2>
          </div>
          <FaqList faqs={page.faqs} />
        </section>
      )}

      {page.relatedSlugs.length > 0 && (
        <section className="ac-section alt">
          <div className="ac-section-head">
            <h2>Related pages</h2>
          </div>
          <div className="ac-grid cols-3 container">
            {page.relatedSlugs.map((slug) => {
              const rel = getPage(slug);
              return (
                <Link key={slug} href={`/${slug}`} className="ac-card">
                  <h3>{rel?.h1 || slug}</h3>
                  <p>{rel?.description}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
