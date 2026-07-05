import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import '../pages/pages.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/self-drive-car-rental-dehradun', label: 'Self Drive' },
  { to: '/car-fleet-dehradun', label: 'Fleet' },
  { to: '/car-rental-pricing-dehradun', label: 'Pricing' },
  { to: '/about-us', label: 'About' },
  { to: '/contact-book-now', label: 'Contact' },
];

export default function PageLayout({ children, breadcrumb }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="ac-page">
      <header className="ac-header">
        <nav className="ac-nav container">
          <Link to="/" className="ac-logo">Arora Cars</Link>
          <ul className="ac-nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="ac-nav-link">{link.label}</Link>
              </li>
            ))}
          </ul>
          <a href="tel:+917817993404" className="ac-nav-call">
            <Phone size={16} /> +91-7817993404
          </a>
          <button
            className="ac-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="ac-mobile-menu">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="ac-mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {breadcrumb && (
        <nav className="ac-breadcrumb container" aria-label="Breadcrumb">
          {breadcrumb.map((item, i) => (
            <span key={item.path}>
              {i > 0 && <span className="ac-breadcrumb-sep">/</span>}
              {i === breadcrumb.length - 1 ? (
                <span className="ac-breadcrumb-current">{item.name}</span>
              ) : (
                <Link to={item.path}>{item.name}</Link>
              )}
            </span>
          ))}
        </nav>
      )}

      <main>{children}</main>

      <footer className="ac-footer">
        <div className="container ac-footer-grid">
          <div>
            <div className="ac-footer-logo">Arora Cars</div>
            <p className="ac-footer-desc">
              Self-drive and chauffeur-driven car rental in Dehradun, serving
              Mussoorie, Rishikesh, Haridwar and the Char Dham route.
            </p>
            <a href="tel:+917817993404" className="ac-footer-phone">
              <Phone size={18} /> +91-7817993404
            </a>
          </div>

          <div>
            <h4>Explore</h4>
            <ul className="ac-footer-links">
              {NAV_LINKS.slice(1).map((link) => (
                <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Routes</h4>
            <ul className="ac-footer-links">
              <li><Link to="/dehradun-to-mussoorie-self-drive">Dehradun → Mussoorie</Link></li>
              <li><Link to="/dehradun-to-rishikesh-haridwar-self-drive">Dehradun → Rishikesh/Haridwar</Link></li>
              <li><Link to="/char-dham-yatra-car-rental">Char Dham Yatra</Link></li>
              <li><Link to="/jolly-grant-airport-car-rental">Jolly Grant Airport</Link></li>
            </ul>
          </div>

          <div>
            <h4>Office</h4>
            <p className="ac-footer-desc">
              Clock Tower, Dehradun - 248001, Uttarakhand<br />
              info@aroracars.com<br />
              Available 24/7
            </p>
          </div>
        </div>
        <div className="ac-footer-bottom">
          &copy; {new Date().getFullYear()} Arora Cars. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
