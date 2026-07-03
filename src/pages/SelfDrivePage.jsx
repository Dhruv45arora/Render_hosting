import React from 'react';
import { Link } from 'react-router-dom';
import { Car, KeyRound, ShieldCheck, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import FAQAccordion from '../components/FAQAccordion';
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '../data/businessSchema';

const faqs = [
  {
    q: 'What documents do I need to rent a self drive car in Dehradun?',
    a: 'A valid driving license, one government photo ID (Aadhaar, passport, or voter ID), and a refundable security deposit. NRI and outstation customers can share documents digitally before pickup.',
  },
  {
    q: 'Is there a minimum age to rent a self drive car?',
    a: 'Yes, drivers must be at least 21 years old and hold a driving license valid for at least one year.',
  },
  {
    q: 'Can I take the self drive car outside Dehradun to Mussoorie or Rishikesh?',
    a: 'Yes. Our self drive cars are permitted for outstation use across Uttarakhand, including Mussoorie, Rishikesh, Haridwar, and the Char Dham route, with prior intimation.',
  },
  {
    q: 'Do you deliver the car to my hotel or the airport?',
    a: 'Yes, we offer doorstep delivery and pickup across Dehradun city, Jolly Grant Airport, and Dehradun Railway Station for an additional convenience charge.',
  },
  {
    q: 'What happens in case of a breakdown during self drive?',
    a: 'All rentals include 24/7 roadside assistance. Call our support number and we will arrange help or a replacement vehicle depending on the situation.',
  },
];

export default function SelfDrivePage() {
  return (
    <PageLayout breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Self Drive Car Rental', path: '/self-drive-car-rental-dehradun' }]}>
      <SEO
        title="Self Drive Car Rental in Dehradun | Hourly, Daily & Weekly | Arora Cars"
        description="Rent a self drive car in Dehradun with Arora Cars. Hatchbacks, sedans & SUVs, doorstep delivery, 24/7 roadside assistance, and transparent pricing. Book now."
        path="/self-drive-car-rental-dehradun"
        jsonLd={[
          localBusinessSchema,
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Self Drive Car Rental', path: '/self-drive-car-rental-dehradun' },
          ]),
        ]}
      />

      <section className="ac-hero">
        <div className="ac-hero-inner">
          <span className="ac-hero-badge">🔑 Self Drive, Your Rules</span>
          <h1>Self Drive Car Rental in Dehradun</h1>
          <p>
            Skip the driver, skip the schedule. Pick up a well-maintained hatchback,
            sedan, or SUV and explore Dehradun, Mussoorie, and Rishikesh entirely on
            your own terms.
          </p>
          <div className="ac-hero-actions">
            <a href="tel:+917817993404" className="ac-btn-primary">Book a Self Drive Car</a>
            <Link to="/car-fleet-dehradun" className="ac-btn-secondary">View Fleet</Link>
          </div>
        </div>
      </section>

      <section className="ac-section">
        <div className="ac-section-head">
          <span className="ac-section-badge">Why Self Drive</span>
          <h2>Total Freedom, Local Support</h2>
          <p className="ac-section-sub">
            Self driving in the hills is different from city driving — our cars and
            process are built around that.
          </p>
        </div>
        <div className="ac-grid cols-4">
          <div className="ac-card">
            <div className="ac-card-icon"><Car size={22} /></div>
            <h3>Hill-Ready Fleet</h3>
            <p>Serviced and inspected specifically for Dehradun's terrain and hill routes to Mussoorie.</p>
          </div>
          <div className="ac-card">
            <div className="ac-card-icon"><KeyRound size={22} /></div>
            <h3>Doorstep Delivery</h3>
            <p>Get the car delivered to your hotel, home, the airport, or the railway station.</p>
          </div>
          <div className="ac-card">
            <div className="ac-card-icon"><ShieldCheck size={22} /></div>
            <h3>24/7 Roadside Help</h3>
            <p>A dedicated support line for breakdowns, punctures, or route guidance, day or night.</p>
          </div>
          <div className="ac-card">
            <div className="ac-card-icon"><MapPin size={22} /></div>
            <h3>Uttarakhand-Wide</h3>
            <p>Drive to Mussoorie, Rishikesh, Haridwar, and the Char Dham circuit — no restrictions.</p>
          </div>
        </div>
      </section>

      <section className="ac-section alt">
        <div className="ac-section-head">
          <span className="ac-section-badge">How It Works</span>
          <h2>Book in 3 Simple Steps</h2>
        </div>
        <div className="ac-grid cols-3">
          <div className="ac-card">
            <div className="ac-card-icon"><Clock size={22} /></div>
            <h3>1. Choose Your Slot</h3>
            <p>Call or WhatsApp us with your pickup date, time, and preferred car category.</p>
          </div>
          <div className="ac-card">
            <div className="ac-card-icon"><CheckCircle2 size={22} /></div>
            <h3>2. Verify & Confirm</h3>
            <p>Share your driving license and ID for quick verification, then confirm with a deposit.</p>
          </div>
          <div className="ac-card">
            <div className="ac-card-icon"><Car size={22} /></div>
            <h3>3. Pick Up & Drive</h3>
            <p>Collect the car at your chosen location — or have it delivered — and hit the road.</p>
          </div>
        </div>
      </section>

      <section className="ac-section">
        <div className="ac-section-head">
          <span className="ac-section-badge">FAQs</span>
          <h2>Self Drive Rental Questions</h2>
        </div>
        <FAQAccordion faqs={faqs} />
      </section>

      <section className="ac-section alt">
        <div className="ac-cta-band">
          <h2>Ready to hit the road?</h2>
          <p>Call now to check live availability for your dates.</p>
          <a href="tel:+917817993404" className="ac-btn-primary">📞 +91-7817993404</a>
        </div>
      </section>
    </PageLayout>
  );
}
