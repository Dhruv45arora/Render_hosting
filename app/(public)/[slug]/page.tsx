import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { LANDING_PAGES, getPage } from "@/data/pages";
import { getAllVehicles, getVehiclesByCategory } from "@/lib/queries";
import { cmsPublishedLandingSlugs, getLocationFleet, resolveLanding } from "@/lib/cms/resolve-landing";
import { resolveRelatedLinks } from "@/lib/cms/related";
import { getSettings } from "@/lib/settings";
import { landingPageSchemas } from "@/lib/schema-org";
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
export const dynamicParams = true;

export async function generateStaticParams() {
  const cms = await cmsPublishedLandingSlugs();
  const staticSlugs = LANDING_PAGES.map((p) => p.slug);
  return Array.from(new Set([...staticSlugs, ...cms])).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolved = await resolveLanding(params.slug);
  if (resolved.kind !== "page") return {};
  const page = resolved.page;
  const canonicalPath = page.canonicalSlug ? `/${page.canonicalSlug}` : `/${page.slug}`;
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: `${SITE_URL}${canonicalPath}` },
    robots: { index: page.indexable, follow: true },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${SITE_URL}${canonicalPath}`,
      images: page.heroImage ? [page.heroImage] : undefined,
    },
  };
}

export default async function LandingPage({ params }: { params: { slug: string } }) {
  const resolved = await resolveLanding(params.slug);
  if (resolved.kind === "redirect") {
    if (resolved.permanent) permanentRedirect(resolved.to);
    redirect(resolved.to);
  }
  if (resolved.kind === "miss") notFound();

  const page = resolved.page;
  const [settings, override] = await Promise.all([
    getSettings(),
    prisma.pageOverride.findUnique({ where: { slug: page.slug } }).catch(() => null),
  ]);

  const partnerCity = page.enquiryCity;
  let vehicles =
    !page.showFleet || partnerCity
      ? []
      : page.source === "cms" && page.locationId
        ? await getLocationFleet(page.locationId)
        : page.slug === "car-fleet-dehradun"
          ? await getAllVehicles()
          : await getVehiclesByCategory(page.categoryFilter, page.driveFilter);

  if (page.source === "static" && !partnerCity && page.slug === "two-wheeler-rental-dehradun") {
    const scooty = await getVehiclesByCategory("scooty");
    vehicles = [...vehicles, ...scooty];
  }

  if (page.source === "static" && !partnerCity && page.slug === "car-rental-dehradun") {
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

  let preferred: { h1: string } | null = null;
  if (page.canonicalSlug) {
    const canon = await resolveLanding(page.canonicalSlug);
    if (canon.kind === "page") preferred = canon.page;
    else {
      const staticCanon = getPage(page.canonicalSlug);
      if (staticCanon) preferred = staticCanon;
    }
  }

  let parentCrumb: { name: string; path: string } | null = null;
  if (page.locationSlug && page.pageType && page.pageType !== "LOCATION") {
    const hubSlug = `car-rental-${page.locationSlug}`;
    const hub = await resolveLanding(hubSlug);
    if (hub.kind === "page") {
      parentCrumb = { name: hub.page.h1, path: `/${hub.page.slug}` };
    }
  }
  // Taxi / Wave 2 chauffeur cluster → Taxi hub breadcrumb
  if (
    !parentCrumb &&
    page.slug !== "taxi" &&
    (page.slug.startsWith("taxi-service-in-") ||
      page.slug.endsWith("-taxi") ||
      page.slug.includes("-taxi-") ||
      page.slug.includes("sightseeing-taxi") ||
      page.primaryKeyword.toLowerCase().includes("taxi"))
  ) {
    parentCrumb = { name: "Taxi", path: "/taxi" };
  }

  const related = page.relatedSlugs.length
    ? await resolveRelatedLinks(page.relatedSlugs)
    : [];

  const schemaCrumbs = parentCrumb
    ? [{ name: "Home", path: "/" }, parentCrumb, { name: page.h1, path: `/${page.slug}` }]
    : [
        { name: "Home", path: "/" },
        { name: page.h1, path: `/${page.slug}` },
      ];

  return (
    <main>
      <JsonLd data={landingPageSchemas(page, settings, parentCrumb)} />
      <nav className="ac-bc container" aria-label="Breadcrumb">
        {schemaCrumbs.map((c, i) => (
          <span key={c.path}>
            {i > 0 && <span className="ac-bc-sep">/</span>}
            {i < schemaCrumbs.length - 1 ? <Link href={c.path}>{c.name}</Link> : <span>{c.name}</span>}
          </span>
        ))}
      </nav>
      <section className="ac-hero">
        <div className="ac-hero-inner">
          <span className="ac-hero-badge">{page.badge}</span>
          <h1>{page.h1}</h1>
          <p>
            <LinkedText text={intro} />
          </p>
          {blurb && <p>{blurb}</p>}
          {preferred && page.canonicalSlug && (
            <p>
              <Link href={`/${page.canonicalSlug}`} className="ac-btn-secondary">
                Open main page: {preferred.h1}
              </Link>
            </p>
          )}
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
            {partnerCity && (
              <a className="ac-btn-secondary" href="#quote">
                {page.primaryCta || "Enquire / Book"}
              </a>
            )}
          </div>
        </div>
      </section>

      {page.heroImage ? (
        <section className="ac-section" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: 960 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={page.heroImage}
              alt={`${page.h1} — Arora Cars`}
              width={1200}
              height={675}
              fetchPriority="high"
              decoding="async"
              style={{ width: "100%", height: "auto", borderRadius: 8, display: "block", objectFit: "cover" }}
            />
          </div>
        </section>
      ) : null}

      {page.sections.map((s) => (
        <section className="ac-section" key={s.heading}>
          <div className="prose">
            <h2>{s.heading}</h2>
            {page.source === "cms" ? (
              <div dangerouslySetInnerHTML={{ __html: s.body.includes("<") ? s.body : `<p>${s.body}</p>` }} />
            ) : (
              <p>
                <LinkedText text={s.body} />
              </p>
            )}
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

      {page.gallery && page.gallery.length > 0 && (
        <section className="ac-section alt">
          <div className="ac-section-head">
            <h2>On the road</h2>
            <p className="ac-section-sub">Reference photos — confirm the exact vehicle class when you book.</p>
          </div>
          <div className="ac-grid cols-2 container" style={{ maxWidth: 960 }}>
            {page.gallery.map((img) => (
              <figure key={img.src + img.alt} style={{ margin: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: "auto", borderRadius: 8, display: "block", objectFit: "cover" }}
                />
                <figcaption className="va-muted" style={{ marginTop: 8 }}>
                  {img.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {partnerCity && (
        <section className="ac-section alt" id="quote">
          <div className="ac-section-head">
            <h2>{page.primaryCta || "Request a Quote"}</h2>
            <p className="ac-section-sub">
              {page.secondaryCta || "Check Availability with Local Rental Partners"}. The rental city is {partnerCity}.
              Change it if that is wrong.
            </p>
          </div>
          <div className="container" style={{ maxWidth: 640 }}>
            <QuoteForm
              defaultCity={partnerCity}
              whatsapp={settings.whatsapp}
              submitLabel={page.submitLabel || page.primaryCta || "Request a Quote"}
              sourceSlug={page.slug}
              pageType={page.type}
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
              Prices and availability come from our live fleet list. Category photos may be temporary placeholders until
              replaced with real fleet shots.
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

      {related.length > 0 && (
        <section className="ac-section">
          <div className="ac-section-head">
            <h2>Related pages</h2>
          </div>
          <div className="ac-grid cols-3 container">
            {related.map((rel) => (
              <Link key={rel.slug} href={`/${rel.slug}`} className="ac-card">
                <h3>{rel.h1}</h3>
                <p>{rel.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
