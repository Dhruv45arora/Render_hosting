import React from 'react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import FAQAccordion from '../components/FAQAccordion';
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '../data/businessSchema';

const stops = [
  { title: 'Dehradun (Clock Tower) — Start', desc: 'Pick up your self drive car from our Clock Tower office or have it delivered to your hotel.' },
  { title: 'Mussoorie Road / Kempty Fall Junction', desc: 'A gradual climb through pine forests — around 20 km in, roughly halfway up.' },
  { title: 'Library Chowk, Mussoorie', desc: 'The main market and viewpoint area — arrival point, roughly 33–35 km and 1–1.5 hours from Dehradun.' },
  { title: 'Kempty Falls (Optional Detour)', desc: 'A popular waterfall stop about 15 km further from Mussoorie town, worth an extra hour.' },
];

const faqs = [
  {
    q: 'How far is Mussoorie from Dehradun by road?',
    a: 'Mussoorie is approximately 34 km from Dehradun via the Dehradun–Mussoorie Road, typically a 1 to 1.5 hour drive depending on traffic near weekends.',
  },
  {
    q: 'Is self driving to Mussoorie difficult for a first-timer?',
    a: 'The road has continuous curves but is well-paved and well-signed. We recommend a compact SUV or hatchback with good low-end power for the climb, and starting before 10 AM to avoid weekend traffic jams near Mussoorie town.',
  },
  {
    q: 'Where can I park in Mussoorie town?',
    a: 'Private vehicles are increasingly restricted near the Mall Road core. Paid parking is available near Library Chowk and Picture Palace; we can guide you to the least congested option based on your visit day.',
  },
  {
    q: 'Can I extend the rental if I decide to stay overnight in Mussoorie?',
    a: 'Yes, just call us before your original return time and we will extend the booking and adjust billing accordingly.',
  },
];

export default function MussooriePage() {
  return (
    <PageLayout breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Dehradun to Mussoorie', path: '/dehradun-to-mussoorie-self-drive' }]}>
      <SEO
        title="Dehradun to Mussoorie Self Drive Car Rental | Route Guide | Arora Cars"
        description="Self drive from Dehradun to Mussoorie with Arora Cars — 34 km, ~1.5 hour hill drive. Route guide, parking tips, and hill-ready cars. Book your self drive car today."
        path="/dehradun-to-mussoorie-self-drive"
        jsonLd={[
          localBusinessSchema,
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Dehradun to Mussoorie', path: '/dehradun-to-mussoorie-self-drive' },
          ]),
        ]}
      />

      <section className="ac-hero">
        <div className="ac-hero-inner">
          <span className="ac-hero-badge">🏔️ 34 km · ~1.5 Hours</span>
          <h1>Dehradun to Mussoorie — Self Drive Route</h1>
          <p>
            The Queen of Hills is a short, scenic climb from Dehradun. Take a
            self drive car and stop wherever the view demands it.
          </p>
          <div className="ac-hero-actions">
            <a href="tel:+917817993404" className="ac-btn-primary">Book This Route</a>
          </div>
        </div>
      </section>

      <section className="ac-section">
        <div className="ac-section-head">
          <span className="ac-section-badge">Route Guide</span>
          <h2>What the Drive Looks Like</h2>
        </div>
        <div className="ac-timeline">
          {stops.map((stop, i) => (
            <div className="ac-timeline-item" key={stop.title}>
              <div className="ac-timeline-dot">{i + 1}</div>
              <h3>{stop.title}</h3>
              <p>{stop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ac-section alt">
        <div className="ac-section-head">
          <span className="ac-section-badge">Good to Know</span>
          <h2>Tips for Driving to Mussoorie</h2>
        </div>
        <div className="ac-grid cols-3">
          <div className="ac-card">
            <h3>Best Time to Start</h3>
            <p>Leave before 10 AM on weekends to beat the traffic jam that builds up near Kincraig and Library Chowk by midday.</p>
          </div>
          <div className="ac-card">
            <h3>Right Car for the Climb</h3>
            <p>A compact SUV or a well-serviced hatchback handles the continuous curves comfortably; we service every car specifically for hill routes.</p>
          </div>
          <div className="ac-card">
            <h3>Fuel Up First</h3>
            <p>Fill up in Dehradun before starting — fuel stations thin out once you're on the hill road.</p>
          </div>
        </div>
      </section>

      <section className="ac-section">
        <div className="ac-section-head">
          <span className="ac-section-badge">FAQs</span>
          <h2>Dehradun to Mussoorie Self Drive FAQs</h2>
        </div>
        <FAQAccordion faqs={faqs} />
      </section>

      <section className="ac-section alt">
        <div className="ac-cta-band">
          <h2>Book your Mussoorie self drive car</h2>
          <p>Hill-ready cars, doorstep delivery in Dehradun, and 24/7 support on the route.</p>
          <a href="tel:+917817993404" className="ac-btn-primary">📞 +91-7817993404</a>
        </div>
      </section>
    </PageLayout>
  );
}
