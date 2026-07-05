import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu, X, Award, Users, ShieldCheck, MapPin } from 'lucide-react';
import './Car_rental.css';

const ROUTES = [
  { code: 'MSR', name: 'Mussoorie', km: '34', time: '1h 15m', path: '/dehradun-to-mussoorie-self-drive' },
  { code: 'RSK', name: 'Rishikesh', km: '43', time: '1h 05m', path: '/dehradun-to-rishikesh-haridwar-self-drive' },
  { code: 'HDW', name: 'Haridwar', km: '52', time: '1h 20m', path: '/dehradun-to-rishikesh-haridwar-self-drive' },
  { code: 'CHD', name: 'Char Dham', km: '210+', time: 'Multi-day', path: '/char-dham-yatra-car-rental' },
];

const FLEET = [
  { cat: 'Hatchback', use: 'City runs', price: '1,500' },
  { cat: 'Sedan', use: 'Business & airport', price: '2,000' },
  { cat: 'Compact SUV', use: 'Hill weekends', price: '2,500' },
  { cat: '7-Seater', use: 'Char Dham & groups', price: '3,500' },
];

const REVIEWS = [
  { name: 'Rajesh Sharma', role: 'Business Traveler', text: 'Clean car, professional handover, handled the Mussoorie climb without a hitch.' },
  { name: 'Priya Gupta', role: 'Tourist, Delhi', text: 'Spacious SUV for our Rishikesh family trip. Driver knew every shortcut.' },
  { name: 'Amit Kumar', role: 'Local Resident', text: 'Reasonable rates, reliable cars — my default for every outstation trip.' },
  { name: 'Sunita Kashyap', role: 'Wedding Planner', text: 'Multiple luxury cars for a destination wedding, zero coordination issues.' },
  { name: 'Vikram Thakur', role: 'Adventure Enthusiast', text: 'Rented a 4WD for a Valley of Flowers trek. Handled mountain roads excellently.' },
  { name: 'Meera Joshi', role: 'Corporate Executive', text: 'Punctual, courteous drivers for repeat corporate bookings in Dehradun.' },
];

export default function CarRentalDehradun() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in-view')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.rd-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const call = () => { window.location.href = 'tel:+917817993404'; };

  return (
    <>
      <div style={{ display: 'none' }}>
        <h1>Car Rental Dehradun | Best Car Rental Services in Dehradun, Uttarakhand</h1>
        <p>Self drive and chauffeur-driven car rental in Dehradun for Mussoorie, Rishikesh, Haridwar and Char Dham.</p>
      </div>

      <div className="rd-site">
        {/* Header */}
        <header className={`rd-header ${scrolled ? 'is-scrolled' : ''}`}>
          <nav className="rd-nav container">
            <a href="#top" className="rd-logo" onClick={() => scrollTo('top')}>
              ARORA<span>CARS</span>
            </a>
            <ul className="rd-nav-links">
              <li><Link to="/self-drive-car-rental-dehradun">Self Drive</Link></li>
              <li><Link to="/car-fleet-dehradun">Fleet</Link></li>
              <li><Link to="/car-rental-pricing-dehradun">Pricing</Link></li>
              <li><button onClick={() => scrollTo('routes')}>Routes</button></li>
              <li><button onClick={() => scrollTo('reviews')}>Reviews</button></li>
              <li><Link to="/contact-book-now">Contact</Link></li>
            </ul>
            <button className="rd-call-pill" onClick={call}>
              <Phone size={15} /> +91-7817993404
            </button>
            <button className="rd-burger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
          {mobileMenuOpen && (
            <div className="rd-mobile-menu">
              <Link to="/self-drive-car-rental-dehradun" onClick={() => setMobileMenuOpen(false)}>Self Drive</Link>
              <Link to="/car-fleet-dehradun" onClick={() => setMobileMenuOpen(false)}>Fleet</Link>
              <Link to="/car-rental-pricing-dehradun" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              <button onClick={() => scrollTo('routes')}>Routes</button>
              <button onClick={() => scrollTo('reviews')}>Reviews</button>
              <Link to="/contact-book-now" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </div>
          )}
        </header>

        {/* Hero */}
        <section id="top" className="rd-hero">
          <svg className="rd-contours" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-50,600 C 200,500 300,700 600,620 C 900,540 1000,650 1250,580" />
            <path d="M-50,680 C 250,590 350,760 650,690 C 950,610 1050,720 1250,660" />
            <path d="M-50,750 C 300,670 400,820 700,760 C 1000,690 1100,790 1250,740" />
          </svg>

          <div className="rd-hero-inner container">
            <div className="rd-hero-copy">
              <div className="rd-eyebrow">DEHRADUN · UTTARAKHAND</div>
              <h1 className="rd-hero-title">DRIVE THE<br />HILLS<br />YOURSELF</h1>
              <p className="rd-hero-sub">
                Self drive and chauffeur-driven cars out of Dehradun — built for
                the climb to Mussoorie, the run to Rishikesh, and the long road
                to Char Dham.
              </p>
              <div className="rd-hero-actions">
                <button className="rd-btn-signal" onClick={call}>Book Now — Call</button>
                <button className="rd-btn-outline" onClick={() => scrollTo('routes')}>See Routes</button>
              </div>
            </div>

            <div className="rd-board">
              <div className="rd-board-head">
                <span>NEXT DEPARTURES</span>
                <span className="rd-board-live">● LIVE</span>
              </div>
              {ROUTES.map((r) => (
                <Link to={r.path} className="rd-board-row" key={r.code}>
                  <span className="rd-board-code">{r.code}</span>
                  <span className="rd-board-name">{r.name}</span>
                  <span className="rd-board-km">{r.km} KM</span>
                  <span className="rd-board-time">{r.time}</span>
                </Link>
              ))}
            </div>
          </div>

          <svg className="rd-road" viewBox="0 0 24 400" preserveAspectRatio="none" aria-hidden="true">
            <line x1="12" y1="0" x2="12" y2="400" />
          </svg>
        </section>

        {/* Route markers */}
        <section id="routes" className="rd-section">
          <div className="container">
            <div className="rd-section-head rd-reveal">
              <span className="rd-tag">01 — WHERE THE ROAD GOES</span>
              <h2>Four Routes Out of Dehradun</h2>
            </div>
            <div className="rd-mile-grid">
              {ROUTES.map((r, i) => (
                <Link to={r.path} className="rd-mile-card rd-reveal" key={r.code} style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="rd-mile-sign">{r.km}<span>KM</span></div>
                  <h3>{r.name}</h3>
                  <p>{r.time} from Dehradun</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Fleet */}
        <section id="fleet" className="rd-section rd-section-dark">
          <div className="container">
            <div className="rd-section-head rd-reveal">
              <span className="rd-tag rd-tag-light">02 — WHAT YOU DRIVE</span>
              <h2>Fleet, Priced Straight</h2>
            </div>
            <div className="rd-fleet-grid">
              {FLEET.map((f, i) => (
                <div className="rd-fleet-card rd-reveal" key={f.cat} style={{ transitionDelay: `${i * 80}ms` }}>
                  <h3>{f.cat}</h3>
                  <p className="rd-fleet-use">{f.use}</p>
                  <div className="rd-fleet-price">₹{f.price}<span>/day onward</span></div>
                </div>
              ))}
            </div>
            <div className="rd-badges rd-reveal">
              <div className="rd-badge"><ShieldCheck size={18} /> Insured Fleet</div>
              <div className="rd-badge"><Award size={18} /> Hill-Serviced</div>
              <div className="rd-badge"><Users size={18} /> Local Drivers</div>
              <div className="rd-badge"><MapPin size={18} /> 24/7 Roadside Help</div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="rd-section">
          <div className="container">
            <div className="rd-section-head rd-reveal">
              <span className="rd-tag">03 — WHO'S DRIVEN WITH US</span>
              <h2>From the Road</h2>
            </div>
            <div className="rd-postcards">
              {REVIEWS.map((r, i) => (
                <div className="rd-postcard rd-reveal" key={r.name} style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                  <p className="rd-postcard-text">"{r.text}"</p>
                  <div className="rd-postcard-name">{r.name}</div>
                  <div className="rd-postcard-role">{r.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / Footer */}
        <footer id="contact" className="rd-footer">
          <div className="container rd-footer-grid">
            <div>
              <div className="rd-logo rd-footer-logo">ARORA<span>CARS</span></div>
              <p>Self drive & chauffeur-driven car rental based in Dehradun, serving all of Uttarakhand.</p>
              <button className="rd-btn-signal" onClick={call}><Phone size={16} /> +91-7817993404</button>
            </div>
            <div>
              <h4>Office</h4>
              <p>Clock Tower, Dehradun – 248001</p>
              <p>Jolly Grant Airport pickup</p>
              <p>Dehradun Railway Station pickup</p>
              <p>Open 24/7</p>
            </div>
            <div>
              <h4>Coverage</h4>
              <p>Mussoorie · Rishikesh · Haridwar</p>
              <p>Chakrata · Rajaji National Park</p>
              <p>Char Dham circuit</p>
              <p>info@aroracars.com</p>
            </div>
            <div>
              <h4>Explore</h4>
              <Link to="/self-drive-car-rental-dehradun" className="rd-footer-link">Self Drive Rental</Link>
              <Link to="/car-fleet-dehradun" className="rd-footer-link">Fleet & Categories</Link>
              <Link to="/car-rental-pricing-dehradun" className="rd-footer-link">Pricing</Link>
              <Link to="/dehradun-to-mussoorie-self-drive" className="rd-footer-link">Dehradun → Mussoorie</Link>
              <Link to="/dehradun-to-rishikesh-haridwar-self-drive" className="rd-footer-link">Rishikesh & Haridwar</Link>
              <Link to="/char-dham-yatra-car-rental" className="rd-footer-link">Char Dham Yatra</Link>
              <Link to="/jolly-grant-airport-car-rental" className="rd-footer-link">Airport Pickup</Link>
              <Link to="/about-us" className="rd-footer-link">About Us</Link>
              <Link to="/contact-book-now" className="rd-footer-link">Contact</Link>
            </div>
          </div>
          <div className="rd-footer-bottom container">
            &copy; 2026 Arora Cars. All rights reserved. Car rental in Dehradun, Mussoorie, Haridwar & Rishikesh.
          </div>
        </footer>
      </div>
    </>
  );
}
