import React from 'react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import FAQAccordion from '../components/FAQAccordion';
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '../data/businessSchema';

const faqs = [
  {
    q: 'How far are Rishikesh and Haridwar from Dehradun?',
    a: 'Rishikesh is about 43 km (roughly 1 hour) from Dehradun, and Haridwar is about 52 km (roughly 1.25 hours). Both can be covered in a single day trip.',
  },
  {
    q: 'Can I visit both Rishikesh and Haridwar in one self drive trip?',
    a: 'Yes, most customers combine both — Rishikesh in the morning for the ghats and cafes, then Haridwar in the evening for Ganga Aarti at Har Ki Pauri, which starts around sunset.',
  },
  {
    q: 'Is parking available near Laxman Jhula and Har Ki Pauri?',
    a: 'Yes, paid parking is available near both, though it fills up fast during Ganga Aarti time and weekends. We share the least crowded parking spots based on your visit time.',
  },
  {
    q: 'Do I need a bigger car for a group visiting Haridwar for Aarti?',
    a: 'For groups of 5 or more, an Ertiga or similar 7-seater is more comfortable, especially since some walking and waiting near the ghats is involved.',
  },
];

export default function RishikeshHaridwarPage() {
  return (
    <PageLayout breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Rishikesh & Haridwar', path: '/dehradun-to-rishikesh-haridwar-self-drive' }]}>
      <SEO
        title="Dehradun to Rishikesh & Haridwar Self Drive Car Rental | Arora Cars"
        description="Self drive from Dehradun to Rishikesh (43 km) and Haridwar (52 km). Plan a same-day trip covering Laxman Jhula, ghats, and Ganga Aarti with Arora Cars."
        path="/dehradun-to-rishikesh-haridwar-self-drive"
        jsonLd={[
          localBusinessSchema,
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Rishikesh & Haridwar', path: '/dehradun-to-rishikesh-haridwar-self-drive' },
          ]),
        ]}
      />

      <section className="ac-hero">
        <div className="ac-hero-inner">
          <span className="ac-hero-badge">🕉️ Rishikesh 43 km · Haridwar 52 km</span>
          <h1>Dehradun to Rishikesh & Haridwar — Self Drive</h1>
          <p>
            Ghats, Ganga Aarti, and riverside cafes — both cities are close enough
            to combine into one relaxed self drive day trip from Dehradun.
          </p>
          <div className="ac-hero-actions">
            <a href="tel:+917817993404" className="ac-btn-primary">Book This Route</a>
          </div>
        </div>
      </section>

      <section className="ac-section">
        <div className="ac-grid cols-2">
          <div className="ac-card">
            <h3>Dehradun → Rishikesh</h3>
            <p style={{ marginBottom: 10 }}>~43 km, about 1 hour via NH334 / Rishikesh Road. Flat, easy driving — suitable for any car category.</p>
            <p>Highlights: Laxman Jhula, Ram Jhula, Beatles Ashram, riverside cafes along the Ganga.</p>
          </div>
          <div className="ac-card">
            <h3>Dehradun → Haridwar</h3>
            <p style={{ marginBottom: 10 }}>~52 km, about 1 hour 15 minutes. Best timed to arrive before sunset for Ganga Aarti at Har Ki Pauri.</p>
            <p>Highlights: Har Ki Pauri, Mansa Devi ropeway, the old market lanes near Chandi Chowk.</p>
          </div>
        </div>
      </section>

      <section className="ac-section alt">
        <div className="ac-section-head">
          <span className="ac-section-badge">Suggested Plan</span>
          <h2>A Same-Day Rishikesh + Haridwar Route</h2>
        </div>
        <div className="ac-timeline">
          <div className="ac-timeline-item">
            <div className="ac-timeline-dot">1</div>
            <h3>Morning — Leave Dehradun</h3>
            <p>Start by 8 AM to reach Rishikesh in about an hour, avoiding later traffic on Rishikesh Road.</p>
          </div>
          <div className="ac-timeline-item">
            <div className="ac-timeline-dot">2</div>
            <h3>Late Morning — Rishikesh</h3>
            <p>Spend 2–3 hours around Laxman Jhula and Ram Jhula, then head toward Haridwar.</p>
          </div>
          <div className="ac-timeline-item">
            <div className="ac-timeline-dot">3</div>
            <h3>Afternoon — Drive to Haridwar</h3>
            <p>Rishikesh to Haridwar is about 25 km, roughly 40 minutes along the Ganga canal road.</p>
          </div>
          <div className="ac-timeline-item">
            <div className="ac-timeline-dot">4</div>
            <h3>Evening — Ganga Aarti at Har Ki Pauri</h3>
            <p>Time your arrival for sunset, then drive back to Dehradun (~52 km, about 1.25 hours).</p>
          </div>
        </div>
      </section>

      <section className="ac-section">
        <div className="ac-section-head">
          <span className="ac-section-badge">FAQs</span>
          <h2>Rishikesh & Haridwar Self Drive FAQs</h2>
        </div>
        <FAQAccordion faqs={faqs} />
      </section>

      <section className="ac-section alt">
        <div className="ac-cta-band">
          <h2>Plan your Rishikesh & Haridwar day trip</h2>
          <p>Comfortable cars, flexible timing, doorstep delivery in Dehradun.</p>
          <a href="tel:+917817993404" className="ac-btn-primary">📞 +91-7817993404</a>
        </div>
      </section>
    </PageLayout>
  );
}
