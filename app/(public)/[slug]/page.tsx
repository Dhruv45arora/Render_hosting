import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANDING_PAGES, getPage } from "@/data/pages";
import { getAllVehicles, getVehiclesByCategory } from "@/lib/queries";
import { getSettings } from "@/lib/settings";
import { breadcrumbSchema, faqSchema, localBusinessSchema, webPageSchema } from "@/lib/schema-org";
import { ADDRESS_LINE, phoneHref, SITE_URL, whatsappHref } from "@/lib/constants";
import VehicleCard from "@/components/VehicleCard";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import QuoteForm from "@/components/QuoteForm";
import { prisma } from "@/lib/prisma";

function LinkedText({ text }: { text: string }) {
  const re = /\[([^\]]+)\]\((https:\/\/tirupati-technologies\.com[^)\s]*|\/[a-z0-9\-/]+)\)/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    nodes.push(
      <a key={i++} className="inline-link" href={match[2]}>
        {match[1]}
      </a>
    );
    last = match.index + match[0].length;
  }
  if (nodes.length === 0) return <>{text}</>;
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

export const revalidate = 60;

export function generateStaticParams() {
  return LANDING_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = getPage(params.slug);
  if (!page) return {};
  const canonicalPath = page.canonicalSlug ? `/${page.canonicalSlug}` : `/${page.slug}`;
  const indexable = !page.canonicalSlug || page.canonicalSlug === page.slug;
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: `${SITE_URL}${canonicalPath}` },
    robots: { index: indexable, follow: true },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${SITE_URL}${canonicalPath}`,
      images: page.heroImage ? [page.heroImage] : undefined,
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

  const partnerCity = page.enquiryCity;
  let vehicles = partnerCity
    ? []
    : page.slug === "car-fleet-dehradun"
      ? await getAllVehicles()
      : await getVehiclesByCategory(page.categoryFilter, page.driveFilter);

  if (!partnerCity && page.slug === "two-wheeler-rental-dehradun") {
    const scooty = await getVehiclesByCategory("scooty");
    vehicles = [...vehicles, ...scooty];
  }

  if (!partnerCity && page.slug === "car-rental-dehradun") {
    const suvs = await getVehiclesByCategory("suv");
    const cars = await getVehiclesByCategory("car");
    const seen = new Set<string>();
    vehicles = [...cars, ...suvs].filter((v) => {
      if (seen.has(v.slug)) return false;
      seen.add(v.slug);
      return true;
    });
  }

  const intro = override?.heroText || page.intro;
  const blurb = override?.pricingBlurb || "";
  const crumbs = [
    { name: "Home", path: "/" },
    { name: page.h1, path: `/${page.slug}` },
  ];

  const preferred = page.canonicalSlug ? getPage(page.canonicalSlug) : null;

  return (
    <main>
      <JsonLd
        data={[
          webPageSchema({ name: page.h1, description: page.description, path: `/${page.slug}` }),
          breadcrumbSchema(crumbs),
          ...(page.faqs.length ? [faqSchema(page.faqs)] : []),
          ...(!partnerCity ? [localBusinessSchema(settings.phone, settings.email)] : []),
        ]}
      />
      <nav className="ac-bc container" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="ac-bc-sep">/</span>
        <span>{page.h1}</span>
      </nav>
      <section className="ac-hero">
        <div className="ac-hero-inner">
          <span className="ac-hero-badge">{page.badge}</span>
          <h1>{page.h1}</h1>
          <p>
            <LinkedText text={intro} />
          </p>
          {blurb && <p>{blurb}</p>}
          {preferred && (
            <p>
              <Link href={`/${page.canonicalSlug}`} className="ac-btn-secondary">
                Open main page: {preferred.h1}
              </Link>
            </p>
          )}
          <div className="ac-hero-actions">
            {partnerCity ? (
              <>
                <a className="ac-btn-primary" href="#quote">
                  {page.primaryCta || "Request a Quote"}
                </a>
                <a className="ac-btn-secondary" href="#quote">
                  {page.secondaryCta || "Check Availability with Local Rental Partners"}
                </a>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </section>

      {page.sections.map((s) => (
        <section className="ac-section" key={s.heading}>
          <div className="prose">
            <h2>{s.heading}</h2>
            <p>
              <LinkedText text={s.body} />
            </p>
          </div>
        </section>
      ))}

      {(page.includes?.length || page.excludes?.length || page.howToBook?.length) && (
        <section className="ac-section alt">
          <div className="ac-grid cols-3 container">
            {page.howToBook && page.howToBook.length > 0 && (
              <div className="ac-card">
                <h3>How to book</h3>
                <ol className="ac-check-list" style={{ listStyle: "decimal", paddingLeft: 18 }}>
                  {page.howToBook.map((step) => (
                    <li key={step} style={{ display: "list-item" }}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {page.includes && page.includes.length > 0 && (
              <div className="ac-card">
                <h3>Typically included</h3>
                <ul className="ac-check-list">
                  {page.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {page.excludes && page.excludes.length > 0 && (
              <div className="ac-card">
                <h3>Usually extra / not included</h3>
                <ul className="ac-check-list">
                  {page.excludes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <p className="ac-section-sub" style={{ textAlign: "center", marginTop: 20 }}>
            Desk: {ADDRESS_LINE}. Confirm inclusions on the call before you pay an advance.
          </p>
        </section>
      )}

      {partnerCity && (
        <section className="ac-section alt" id="quote-section">
          <div className="ac-section-head">
            <h2>{page.primaryCta || "Request a Quote"}</h2>
            <p className="ac-section-sub">
              {page.secondaryCta || "Check Availability with Local Rental Partners"}. The rental city is {partnerCity}. Change it if that is wrong.
            </p>
          </div>
          <div className="container" style={{ maxWidth: 640 }}>
            <QuoteForm
              defaultCity={partnerCity}
              whatsapp={settings.whatsapp}
              submitLabel={page.submitLabel || page.primaryCta || "Request a Quote"}
            />
          </div>
        </section>
      )}

      {vehicles.length > 0 && (
        <section className="ac-section">
          <div className="ac-section-head">
            <span className="ac-section-badge">FLEET</span>
            <h2>Vehicles you can book</h2>
            <p className="ac-section-sub">
              Prices and availability come from our live fleet list. Category photos may be temporary
              placeholders until replaced with real fleet shots.
            </p>
          </div>
          <div className="ac-grid cols-3 container">
            {vehicles.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} whatsapp={settings.whatsapp} />
            ))}
          </div>
        </section>
      )}

      {page.faqs.length > 0 && (
        <section className="ac-section alt">
          <div className="ac-section-head">
            <span className="ac-section-badge">FAQ</span>
            <h2>Questions</h2>
          </div>
          <FaqList faqs={page.faqs} />
        </section>
      )}

      {page.relatedSlugs.length > 0 && (
        <section className="ac-section">
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
