import React from 'react';
import { Users, Fuel, Gauge, Check } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { localBusinessSchema, breadcrumbSchema } from '../data/businessSchema';

const fleet = [
  {
    category: 'Hatchback',
    models: 'Swift, i10, Baleno, Celerio',
    seats: '4 Seater',
    price: '₹1,500 – ₹2,000 / day',
    best: 'City rides, small groups, easy parking',
  },
  {
    category: 'Sedan',
    models: 'Dzire, Xcent, Honda City',
    seats: '4 Seater',
    price: '₹2,000 – ₹2,800 / day',
    best: 'Business travel, airport transfers, comfort trips',
  },
  {
    category: 'Compact SUV',
    models: 'Brezza, Venue, Nexon',
    seats: '5 Seater',
    price: '₹2,500 – ₹3,500 / day',
    best: 'Small families, weekend trips to Mussoorie',
  },
  {
    category: 'SUV / 7-Seater',
    models: 'Creta, Ertiga, Innova',
    seats: '6–7 Seater',
    price: '₹3,500 – ₹5,500 / day',
    best: 'Char Dham Yatra, large families, hill routes',
  },
  {
    category: 'Luxury',
    models: 'Fortuner, Premium Sedans',
    seats: '5–7 Seater',
    price: 'On Request',
    best: 'Weddings, VIP transport, special occasions',
  },
];

export default function FleetPage() {
  return (
    <PageLayout breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Car Fleet', path: '/car-fleet-dehradun' }]}>
      <SEO
        title="Car Fleet in Dehradun | Hatchback, Sedan, SUV & Luxury | Arora Cars"
        description="Browse the Arora Cars fleet in Dehradun — hatchbacks, sedans, compact SUVs, 7-seaters, and luxury cars. Compare seating, price, and best use case."
        path="/car-fleet-dehradun"
        jsonLd={[
          localBusinessSchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Car Fleet', path: '/car-fleet-dehradun' },
          ]),
        ]}
      />

      <section className="ac-hero">
        <div className="ac-hero-inner">
          <span className="ac-hero-badge">🚗 Our Fleet</span>
          <h1>Cars for Every Kind of Trip in Dehradun</h1>
          <p>
            From a compact hatchback for city errands to a 7-seater for the Char Dham
            Yatra — pick the right car for the road ahead.
          </p>
          <div className="ac-hero-actions">
            <a href="tel:+917817993404" className="ac-btn-primary">Check Availability</a>
          </div>
        </div>
      </section>

      <section className="ac-section">
        <div className="ac-section-head">
          <span className="ac-section-badge">Compare</span>
          <h2>Fleet & Pricing at a Glance</h2>
          <p className="ac-section-sub">Exact car model availability depends on the day — call to confirm before you plan around a specific model.</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="ac-price-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Sample Models</th>
                <th>Seating</th>
                <th>Starting Price</th>
                <th>Best For</th>
              </tr>
            </thead>
            <tbody>
              {fleet.map((car) => (
                <tr key={car.category}>
                  <td><strong>{car.category}</strong></td>
                  <td>{car.models}</td>
                  <td>{car.seats}</td>
                  <td>{car.price}</td>
                  <td>{car.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="ac-price-note">Prices vary by season, duration, and delivery location. Confirm final pricing on call: +91-7817993404.</p>
      </section>

      <section className="ac-section alt">
        <div className="ac-section-head">
          <span className="ac-section-badge">Every Car Includes</span>
          <h2>What's Standard on Every Rental</h2>
        </div>
        <ul className="ac-check-list" style={{ maxWidth: 560, margin: '0 auto' }}>
          <li><Check size={18} /> Full insurance coverage</li>
          <li><Check size={18} /> Sanitized interiors before every handover</li>
          <li><Check size={18} /> 24/7 roadside assistance</li>
          <li><Check size={18} /> Unlimited kilometers on select plans</li>
          <li><Check size={18} /> Transparent, no-hidden-fee billing</li>
        </ul>
      </section>

      <section className="ac-section">
        <div className="ac-grid cols-3">
          <div className="ac-card">
            <div className="ac-card-icon"><Users size={22} /></div>
            <h3>Group Size</h3>
            <p>Traveling with 6+ people? Go for an Ertiga or Innova rather than two smaller cars.</p>
          </div>
          <div className="ac-card">
            <div className="ac-card-icon"><Gauge size={22} /></div>
            <h3>Hill Routes</h3>
            <p>For Mussoorie, Chakrata, or Char Dham, an SUV handles inclines and hairpins with more confidence.</p>
          </div>
          <div className="ac-card">
            <div className="ac-card-icon"><Fuel size={22} /></div>
            <h3>City Only</h3>
            <p>Sticking to Dehradun city? A hatchback is the most fuel-efficient and easiest to park.</p>
          </div>
        </div>
      </section>

      <section className="ac-section alt">
        <div className="ac-cta-band">
          <h2>Not sure which car fits your trip?</h2>
          <p>Tell us your route and group size — we'll recommend the right category.</p>
          <a href="tel:+917817993404" className="ac-btn-primary">📞 +91-7817993404</a>
        </div>
      </section>
    </PageLayout>
  );
}
