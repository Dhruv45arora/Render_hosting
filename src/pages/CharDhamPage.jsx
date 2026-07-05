import React from 'react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import FAQAccordion from '../components/FAQAccordion';
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '../data/businessSchema';

const dhams = [
  { name: 'Yamunotri', distance: '~210 km from Dehradun', note: 'Farthest trek point; last stretch is on foot/pony from Janki Chatti.' },
  { name: 'Gangotri', distance: '~225 km from Dehradun', note: 'Motorable almost to the temple; scenic Bhagirathi valley drive.' },
  { name: 'Kedarnath', distance: '~210 km to Sonprayag, then trek/heli', note: 'Car goes up to Sonprayag or Gaurikund; the temple itself needs a trek.' },
  { name: 'Badrinath', distance: '~300 km from Dehradun', note: 'Fully motorable route via Rudraprayag and Joshimath.' },
];

const faqs = [
  {
    q: 'Can I do the full Char Dham Yatra with a self drive car from Dehradun?',
    a: 'The route is drivable for most of the circuit, but Yamunotri and Kedarnath require the final stretch on foot, pony, or helicopter since roads don\'t reach the temples directly. We recommend a driver-assisted SUV for the Char Dham circuit given the mountain roads, tight schedules, and multiple overnight halts.',
  },
  {
    q: 'What type of car is recommended for Char Dham Yatra?',
    a: 'A robust SUV or 7-seater like an Ertiga, Innova, or similar is recommended for comfort, ground clearance, and luggage space over the multi-day mountain route.',
  },
  {
    q: 'How many days does the Char Dham Yatra from Dehradun typically take?',
    a: 'Most travelers take 10 to 12 days to comfortably cover all four dhams from Dehradun, including travel days and darshan time, though it can be compressed with a tighter itinerary.',
  },
  {
    q: 'Do I need any special permit for the Char Dham route?',
    a: 'Yatra registration (biometric/online) is mandatory for pilgrims and is separate from vehicle permits. We can guide you on the current registration process when you book with us.',
  },
];

export default function CharDhamPage() {
  return (
    <PageLayout breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Char Dham Yatra', path: '/char-dham-yatra-car-rental' }]}>
      <SEO
        title="Char Dham Yatra Car Rental from Dehradun | Arora Cars"
        description="Book a car for the Char Dham Yatra from Dehradun — Yamunotri, Gangotri, Kedarnath & Badrinath. SUV & driver-assisted options for the full circuit."
        path="/char-dham-yatra-car-rental"
        jsonLd={[
          localBusinessSchema,
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Char Dham Yatra', path: '/char-dham-yatra-car-rental' },
          ]),
        ]}
      />

      <section className="ac-hero">
        <div className="ac-hero-inner">
          <span className="ac-hero-badge">🛕 4 Dhams · 1 Journey</span>
          <h1>Char Dham Yatra Car Rental from Dehradun</h1>
          <p>
            Yamunotri, Gangotri, Kedarnath, and Badrinath — plan the full pilgrimage
            circuit with a reliable SUV and a route-experienced team behind you.
          </p>
          <div className="ac-hero-actions">
            <a href="tel:+917817993404" className="ac-btn-primary">Plan My Yatra</a>
          </div>
        </div>
      </section>

      <section className="ac-section">
        <div className="ac-section-head">
          <span className="ac-section-badge">The Four Dhams</span>
          <h2>Distance & Access from Dehradun</h2>
        </div>
        <div className="ac-grid cols-4">
          {dhams.map((d) => (
            <div className="ac-card" key={d.name}>
              <h3>{d.name}</h3>
              <p style={{ fontWeight: 600, color: '#667eea', marginBottom: 8 }}>{d.distance}</p>
              <p>{d.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ac-section alt">
        <div className="ac-section-head">
          <span className="ac-section-badge">Plan Ahead</span>
          <h2>What to Know Before You Book</h2>
        </div>
        <div className="ac-grid cols-2">
          <div className="ac-card">
            <h3>Best Season</h3>
            <p>The Yatra typically runs from late April/May through October or November, based on the annual temple opening dates announced each year. Roads and weather vary a lot by month — talk to us before locking your dates.</p>
          </div>
          <div className="ac-card">
            <h3>Self Drive vs Driver-Assisted</h3>
            <p>Given narrow mountain roads, landslide-prone stretches, and multiple overnight halts, we recommend a driver-assisted vehicle for Char Dham rather than pure self drive, though self drive SUVs are available on request for experienced hill drivers.</p>
          </div>
        </div>
      </section>

      <section className="ac-section">
        <div className="ac-section-head">
          <span className="ac-section-badge">FAQs</span>
          <h2>Char Dham Yatra Rental FAQs</h2>
        </div>
        <FAQAccordion faqs={faqs} />
      </section>

      <section className="ac-section alt">
        <div className="ac-cta-band">
          <h2>Start planning your Char Dham Yatra</h2>
          <p>Talk to us about your dates, dhams, and group size — we'll suggest the right vehicle and route plan.</p>
          <a href="tel:+917817993404" className="ac-btn-primary">📞 +91-7817993404</a>
        </div>
      </section>
    </PageLayout>
  );
}
