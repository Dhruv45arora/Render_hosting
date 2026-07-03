import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://aroracars.com';
const DEFAULT_IMAGE = `${SITE_URL}/logo512.png`;

/**
 * SEO component - sets unique title, meta description, canonical URL,
 * Open Graph tags, Twitter card tags, and JSON-LD structured data for each page.
 *
 * jsonLd: pass one schema object or an array of schema objects (LocalBusiness, FAQPage, etc.)
 */
export default function SEO({ title, description, path = '/', jsonLd, image }) {
  const canonical = `${SITE_URL}${path}`;
  const schemaList = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image || DEFAULT_IMAGE} />
      <meta property="og:site_name" content="Arora Cars" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || DEFAULT_IMAGE} />

      {schemaList.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export { SITE_URL };
