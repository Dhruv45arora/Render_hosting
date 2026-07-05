import React from 'react';
import { MapPin, Users, ShieldCheck, Clock } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { localBusinessSchema, breadcrumbSchema } from '../data/businessSchema';

export default function AboutPage() {
  return (
    <PageLayout breadcrumb={[{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about-us' }]}>
      <SEO
        title="About Arora Cars | Local Car Rental Company in Dehradun"
        description="Arora Cars is a Dehradun-based, locally run car rental service offering self drive and chauffeur-driven cars across Uttarakhand. Learn who we are and how we operate."
        path="/about-us"
        jsonLd={[
          localBusinessSchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about-us' },
          ]),
        ]}
      />

      <section className="ac-hero">
        <div className="ac-hero-inner">
          <span className="ac-hero-badge">📍 Based in Dehradun</span>
          <h1>About Arora Cars</h1>
          <p>
            A locally run car rental service in Dehradun, built around knowing the
            hill roads better than a generic booking app ever could.
          </p>
        </div>
      </section>

      <section className="ac-section">
        <div className="ac-grid cols-2" style={{ alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 16 }}>Why We Started</h2>
            <p style={{ color: '#555', lineHeight: 1.8, marginBottom: 14 }}>
              Arora Cars started in Dehradun with a simple observation: most car
              rental options in the city were either large national platforms with
              no local knowledge, or informal operators with no accountability.
            </p>
            <p style={{ color: '#555', lineHeight: 1.8 }}>
              We built a fleet and a process around the specific needs of Dehradun
              and its surrounding hill routes — Mussoorie, Rishikesh, Haridwar, and
              the Char Dham circuit — with cars that are actually maintained for
              those roads, not just a city commute.
            </p>
          </div>
          <div className="ac-grid cols-2" style={{ gap: 18 }}>
            <div className="ac-card">
              <div className="ac-card-icon"><MapPin size={20} /></div>
              <h3 style={{ fontSize: 16 }}>Local Base</h3>
              <p style={{ fontSize: 14 }}>Office at Clock Tower, Dehradun</p>
            </div>
            <div className="ac-card">
              <div className="ac-card-icon"><Clock size={20} /></div>
              <h3 style={{ fontSize: 16 }}>24/7 Support</h3>
              <p style={{ fontSize: 14 }}>Roadside help any time, any day</p>
            </div>
            <div className="ac-card">
              <div className="ac-card-icon"><Users size={20} /></div>
              <h3 style={{ fontSize: 16 }}>Local Team</h3>
              <p style={{ fontSize: 14 }}>Staff who know the hill routes firsthand</p>
            </div>
            <div className="ac-card">
              <div className="ac-card-icon"><ShieldCheck size={20} /></div>
              <h3 style={{ fontSize: 16 }}>Insured Fleet</h3>
              <p style={{ fontSize: 14 }}>Every car covered before it leaves our lot</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ac-section alt">
        <div className="ac-section-head">
          <span className="ac-section-badge">Our Approach</span>
          <h2>How We Operate</h2>
        </div>
        <div className="ac-grid cols-3">
          <div className="ac-card">
            <h3>Transparent Pricing</h3>
            <p>No surprise charges at return. See our full <a href="/car-rental-pricing-dehradun" style={{ color: '#667eea' }}>pricing breakdown</a>.</p>
          </div>
          <div className="ac-card">
            <h3>Route-Specific Fleet</h3>
            <p>Cars are matched to the terrain — hatchbacks for the city, SUVs for the hills. See our <a href="/car-fleet-dehradun" style={{ color: '#667eea' }}>fleet</a>.</p>
          </div>
          <div className="ac-card">
            <h3>Direct Support</h3>
            <p>Call us directly — no ticketing system or chatbot loop when you need help on the road.</p>
          </div>
        </div>
      </section>

      <section className="ac-section">
        <div className="ac-cta-band">
          <h2>Have questions before booking?</h2>
          <p>Call us directly — we're happy to walk you through routes, pricing, and car options.</p>
          <a href="tel:+917817993404" className="ac-btn-primary">📞 +91-7817993404</a>
        </div>
      </section>
    </PageLayout>
  );
}
