import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import FAQAccordion from '../components/FAQAccordion';
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '../data/businessSchema';

const faqs = [
  {
    q: 'What is the fastest way to book a car with Arora Cars?',
    a: 'Calling us directly at +91-7817993404 is the fastest way — we confirm availability and pricing on the call, usually within a few minutes.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'For regular dates, a few hours notice is usually enough. During peak season (April–June, September–November) or festival weekends, we recommend booking 2–3 days in advance.',
  },
  {
    q: 'What are your operating hours?',
    a: 'We operate 24/7 for bookings, pickups, drops, and roadside support.',
  },
];

export default function ContactPage() {
  return (
    <PageLayout breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact-book-now' }]}>
      <SEO
        title="Contact & Book a Car | Arora Cars Dehradun"
        description="Book a self drive or chauffeur-driven car with Arora Cars in Dehradun. Call, get a quote, or find our office at Clock Tower. Available 24/7."
        path="/contact-book-now"
        jsonLd={[
          localBusinessSchema,
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact-book-now' },
          ]),
        ]}
      />

      <section className="ac-hero">
        <div className="ac-hero-inner">
          <span className="ac-hero-badge">📞 We're Available 24/7</span>
          <h1>Book Your Car With Arora Cars</h1>
          <p>
            The fastest way to book is a direct call — we'll confirm your car,
            pricing, and pickup details in one conversation.
          </p>
          <div className="ac-hero-actions">
            <a href="tel:+917817993404" className="ac-btn-primary">📞 +91-7817993404</a>
          </div>
        </div>
      </section>

      <section className="ac-section">
        <div className="ac-grid cols-4">
          <div className="ac-card">
            <div className="ac-card-icon"><Phone size={20} /></div>
            <h3>Call / WhatsApp</h3>
            <p>+91-7817993404</p>
          </div>
          <div className="ac-card">
            <div className="ac-card-icon"><Mail size={20} /></div>
            <h3>Email</h3>
            <p>info@aroracars.com</p>
          </div>
          <div className="ac-card">
            <div className="ac-card-icon"><MapPin size={20} /></div>
            <h3>Office</h3>
            <p>Clock Tower, Dehradun - 248001</p>
          </div>
          <div className="ac-card">
            <div className="ac-card-icon"><Clock size={20} /></div>
            <h3>Hours</h3>
            <p>Open 24/7</p>
          </div>
        </div>
      </section>

      <section className="ac-section alt">
        <div className="ac-section-head">
          <span className="ac-section-badge">FAQs</span>
          <h2>Booking Questions</h2>
        </div>
        <FAQAccordion faqs={faqs} />
      </section>
    </PageLayout>
  );
}
