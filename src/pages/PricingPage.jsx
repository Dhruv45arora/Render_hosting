import React from 'react';
import { Check } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import FAQAccordion from '../components/FAQAccordion';
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '../data/businessSchema';

const plans = [
  { name: 'Hourly', use: 'Local errands, short meetings', rate: 'From ₹150 / hour', km: '10 km/hour included' },
  { name: 'Daily', use: 'Day trips, sightseeing', rate: 'From ₹1,500 / day', km: '150–200 km/day included' },
  { name: 'Weekly', use: 'Extended stays, NRI visits', rate: 'From ₹9,000 / week', km: 'Custom km packages' },
  { name: 'Outstation', use: 'Mussoorie, Rishikesh, Char Dham', rate: 'Route-based quote', km: 'Actual km + toll/parking' },
];

const faqs = [
  {
    q: 'Are there any hidden charges on top of the quoted price?',
    a: 'No. The rate we quote includes the vehicle and standard insurance. Extra charges only apply for kilometers beyond the included limit, tolls, state permits (for outstation), and fuel, all of which are explained before you book.',
  },
  {
    q: 'Is a security deposit required?',
    a: 'Yes, a refundable security deposit is collected at pickup and returned in full after the car is checked in, provided there is no damage or extra usage beyond the plan.',
  },
  {
    q: 'Do prices change during peak tourist season?',
    a: 'Yes, rates can be higher during peak season (April–June, September–November) and around major festivals due to high demand. Booking a few days in advance helps lock in a better rate.',
  },
  {
    q: 'Is fuel included in the rental price?',
    a: 'Fuel is not included by default — cars are handed over with a certain fuel level and should be returned at the same level, or the difference is billed at actual cost.',
  },
];

export default function PricingPage() {
  return (
    <PageLayout breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/car-rental-pricing-dehradun' }]}>
      <SEO
        title="Car Rental Pricing in Dehradun | Hourly, Daily & Weekly Rates | Arora Cars"
        description="Transparent car rental pricing in Dehradun. Compare hourly, daily, weekly, and outstation rates with Arora Cars. No hidden charges."
        path="/car-rental-pricing-dehradun"
        jsonLd={[
          localBusinessSchema,
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Pricing', path: '/car-rental-pricing-dehradun' },
          ]),
        ]}
      />

      <section className="ac-hero">
        <div className="ac-hero-inner">
          <span className="ac-hero-badge">💳 Transparent Pricing</span>
          <h1>Car Rental Pricing in Dehradun</h1>
          <p>
            No hidden fees, no surprise add-ons at return. Here's exactly how our
            pricing works across every plan.
          </p>
          <div className="ac-hero-actions">
            <a href="tel:+917817993404" className="ac-btn-primary">Get a Custom Quote</a>
          </div>
        </div>
      </section>

      <section className="ac-section">
        <div style={{ overflowX: 'auto' }}>
          <table className="ac-price-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Best For</th>
                <th>Starting Rate</th>
                <th>Km Included</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.name}>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.use}</td>
                  <td>{p.rate}</td>
                  <td>{p.km}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="ac-price-note">Final pricing depends on car category (see our <a href="/car-fleet-dehradun" style={{ color: '#667eea' }}>fleet page</a>), season, and delivery location. Call for an exact quote.</p>
      </section>

      <section className="ac-section alt">
        <div className="ac-section-head">
          <span className="ac-section-badge">Included in Every Plan</span>
          <h2>What You're Paying For</h2>
        </div>
        <ul className="ac-check-list" style={{ maxWidth: 560, margin: '0 auto' }}>
          <li><Check size={18} /> Standard insurance coverage</li>
          <li><Check size={18} /> 24/7 roadside assistance</li>
          <li><Check size={18} /> Sanitized, inspected vehicle at handover</li>
          <li><Check size={18} /> No booking or platform fee</li>
        </ul>
      </section>

      <section className="ac-section">
        <div className="ac-section-head">
          <span className="ac-section-badge">FAQs</span>
          <h2>Pricing Questions</h2>
        </div>
        <FAQAccordion faqs={faqs} />
      </section>

      <section className="ac-section alt">
        <div className="ac-cta-band">
          <h2>Want an exact quote for your trip?</h2>
          <p>Tell us your dates, car category, and route — we'll give you a straight number.</p>
          <a href="tel:+917817993404" className="ac-btn-primary">📞 +91-7817993404</a>
        </div>
      </section>
    </PageLayout>
  );
}
