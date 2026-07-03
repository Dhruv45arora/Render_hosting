export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'CarRental',
  name: 'Arora Cars',
  image: 'https://aroracars.com/logo512.png',
  '@id': 'https://aroracars.com/',
  url: 'https://aroracars.com/',
  telephone: '+91-7817993404',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Clock Tower',
    addressLocality: 'Dehradun',
    addressRegion: 'Uttarakhand',
    postalCode: '248001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 30.3165,
    longitude: 78.0322,
  },
  areaServed: [
    'Dehradun',
    'Mussoorie',
    'Rishikesh',
    'Haridwar',
    'Jolly Grant Airport',
    'Uttarakhand',
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  },
  sameAs: [],
};

export function breadcrumbSchema(items) {
  // items: [{ name, path }]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://aroracars.com${item.path}`,
    })),
  };
}

export function faqSchema(faqs) {
  // faqs: [{ q, a }]
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}
