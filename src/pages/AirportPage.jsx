import React from 'react';
import { PlaneLanding, Clock, Wallet, ShieldCheck } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import FAQAccordion from '../components/FAQAccordion';
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '../data/businessSchema';

const faqs = [
  {
    q: 'Is Jolly Grant Airport far from Dehradun city?',
    a: 'Jolly Grant Airport is about 22–25 km from central Dehradun, roughly a 40–50 minute drive depending on traffic near the ISBT and Sahastradhara crossing.',
  },
  {
    q: 'Can I pick up a self drive car directly at the airport?',
    a: 'Yes, we deliver the car directly to Jolly Grant Airport arrivals so you can start driving as soon as you land, avoiding a taxi to the city first.',
  },
  {
    q: 'How early should I book an airport self drive car?',
    a: 'We recommend booking at least 24 hours in advance, especially during peak tourist season (April–June and September–November) when demand is high.',
  },
  {
    q: 'Can I drop the car back at the airport for my return flight?',
    a: 'Yes, one-way airport drop is available — just confirm your return flight time when booking so we can coordinate the handover.',
  },
];

export default function AirportPage() {
  return (
    <PageLayout breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Jolly Grant Airport', path: '/jolly-grant-airport-car-rental' }]}>
      <SEO
        title="Jolly Grant Airport Self Drive Car Rental | Dehradun | Arora Cars"
        description="Pick up a self drive car at Jolly Grant Airport, Dehradun. Doorstep delivery to arrivals, flexible one-way drop, and 24/7 support. Book ahead for peak season."
        path="/jolly-grant-airport-car-rental"
        jsonLd={[
          localBusinessSchema,
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Jolly Grant Airport', path: '/jolly-grant-airport-car-rental' },
          ]),
        ]}
      />

      <section className="ac-hero">
        <div className="ac-hero-inner">
          <span className="ac-hero-badge">✈️ Land & Drive</span>
          <h1>Jolly Grant Airport Self Drive Car Rental</h1>
          <p>
            Skip the arrivals taxi queue. We deliver your self drive car straight to
            Jolly Grant Airport so your trip starts the moment you land.
          </p>
          <div className="ac-hero-actions">
            <a href="tel:+917817993404" className="ac-btn-primary">Book Airport Pickup</a>
          </div>
        </div>
      </section>

      <section className="ac-section">
        <div className="ac-grid cols-4">
          <div className="ac-card">
            <div className="ac-card-icon"><PlaneLanding size={22} /></div>
            <h3>Arrivals Delivery</h3>
            <p>Car ready and waiting at Jolly Grant Airport arrivals when you land.</p>
          </div>
          <div className="ac-card">
            <div className="ac-card-icon"><Clock size={22} /></div>
            <h3>~40–50 Min to City</h3>
            <p>Jolly Grant to central Dehradun is about 22–25 km via the Rishikesh Road.</p>
          </div>
          <div className="ac-card">
            <div className="ac-card-icon"><Wallet size={22} /></div>
            <h3>Transparent Charges</h3>
            <p>Delivery fee is quoted upfront — no surprise charges at handover.</p>
          </div>
          <div className="ac-card">
            <div className="ac-card-icon"><ShieldCheck size={22} /></div>
            <h3>Flexible One-Way Drop</h3>
            <p>Drop the car back at the airport for your return flight — just share your timing in advance.</p>
          </div>
        </div>
      </section>

      <section className="ac-section alt">
        <div className="ac-section-head">
          <span className="ac-section-badge">Good to Know</span>
          <h2>From Landing to Driving</h2>
        </div>
        <div className="ac-timeline">
          <div className="ac-timeline-item">
            <div className="ac-timeline-dot">1</div>
            <h3>Book Before You Fly</h3>
            <p>Share your flight number and expected landing time — we track it in case of delays.</p>
          </div>
          <div className="ac-timeline-item">
            <div className="ac-timeline-dot">2</div>
            <h3>Meet at Arrivals</h3>
            <p>Our representative meets you at the arrivals gate with the car and paperwork ready.</p>
          </div>
          <div className="ac-timeline-item">
            <div className="ac-timeline-dot">3</div>
            <h3>Quick Verification</h3>
            <p>ID and license check, deposit, and you're handed the keys — typically under 15 minutes.</p>
          </div>
          <div className="ac-timeline-item">
            <div className="ac-timeline-dot">4</div>
            <h3>Drive Straight Out</h3>
            <p>Head to Dehradun city, or straight toward Rishikesh — both are close to the airport road.</p>
          </div>
        </div>
      </section>

      <section className="ac-section">
        <div className="ac-section-head">
          <span className="ac-section-badge">FAQs</span>
          <h2>Airport Self Drive FAQs</h2>
        </div>
        <FAQAccordion faqs={faqs} />
      </section>

      <section className="ac-section alt">
        <div className="ac-cta-band">
          <h2>Landing at Jolly Grant soon?</h2>
          <p>Share your flight details and we'll have the car ready when you arrive.</p>
          <a href="tel:+917817993404" className="ac-btn-primary">📞 +91-7817993404</a>
        </div>
      </section>
    </PageLayout>
  );
}
