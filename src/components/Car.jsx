import React, { useState, useEffect } from 'react';
import { Phone, ChevronLeft, ChevronRight, Menu, X, Star, Award, Users, ShieldCheck } from 'lucide-react';
import './Car_rental.css'; // Import the CSS file

export default function CarRentalDehradun() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Car images for the slider - focusing on Indian roads and Dehradun
  const carImages = [
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2274&q=80',
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carImages.length]);

  // Scroll detection for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carImages.length) % carImages.length);
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhoneCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* SEO Meta Elements - Hidden but important for search engines */}
      <div style={{ display: 'none' }}>
        <h1>Car Rental Dehradun | Best Car Rental Services in Dehradun, Uttarakhand</h1>
        <h2>Rent Premium Cars in Dehradun - SUVs, Sedans, Luxury Cars</h2>
        <h3>Car Rental Services: Dehradun, Mussoorie, Haridwar, Rishikesh</h3>
        <p>Best car rental in Dehradun, Uttarakhand. Rent cars for tourism, business travel. Premium vehicles, affordable rates, 24/7 service. Book now!</p>
      </div>

      <div className="car-rental-website">
        {/* Enhanced Header */}
        <header className="header">
          <nav className="nav container">
            <a href="#" className="logo">CarRental Dehradun</a>
            <ul className="nav-links">
              <li><a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={() => scrollToSection('home')}>Home</a></li>
              <li><a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => scrollToSection('about')}>Services</a></li>
              <li><a href="#testimonials" className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`} onClick={() => scrollToSection('testimonials')}>Reviews</a></li>
              <li><a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => scrollToSection('contact')}>Contact</a></li>
            </ul>
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
              <div className="mobile-nav-links">
                <a href="#home" className={`mobile-nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={() => scrollToSection('home')}>Home</a>
                <a href="#about" className={`mobile-nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => scrollToSection('about')}>Services</a>
                <a href="#testimonials" className={`mobile-nav-link ${activeSection === 'testimonials' ? 'active' : ''}`} onClick={() => scrollToSection('testimonials')}>Reviews</a>
                <a href="#contact" className={`mobile-nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => scrollToSection('contact')}>Contact</a>
              </div>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-slider">
            {carImages.map((image, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
              >
                <img
                  src={image}
                  alt={`Car rental in Dehradun - Premium vehicle ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="hero-overlay"></div>

          {/* Slider Controls */}
          <button onClick={prevSlide} className="slider-control prev">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="slider-control next">
            <ChevronRight size={24} />
          </button>

          {/* Slider Dots */}
          <div className="slider-dots">
            {carImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
              />
            ))}
          </div>

          {/* Hero Content */}
          <div className="hero-content">
            <div className="hero-badge">
              🚗 Best Car Rental in Dehradun
            </div>
            <h1 className="hero-title">Premium Cars</h1>
            <p className="hero-subtitle">
              Explore Uttarakhand with our premium car rental services in Dehradun. 
              Perfect for tourism, business, and family trips.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollToSection('about')}>
                View Our Cars
              </button>
              <button className="btn-secondary" onClick={handlePhoneCall}>
                📞 Book Now: +91-7817993404
              </button>
            </div>
          </div>

          {/* Call Button */}
          <div className="call-button">
            <a href="tel:+919876543210" className="call-btn">
              <Phone size={28} />
            </a>
          </div>
        </section>

        {/* About/Services Section */}
        <section id="about" className="about">
          <div className="container">
            <div className="section-header animate-on-scroll">
              <div className="section-badge">Our Services</div>
              <h2 className="section-title">Car Rental in Dehradun</h2>
              <p className="section-subtitle">
                Premium car rental services for all your travel needs in Uttarakhand. 
                From city tours to mountain adventures.
              </p>
            </div>

            <div className="features">
              <div className="feature animate-on-scroll">
                <div className="feature-icon">
                  <Award size={36} />
                </div>
                <h3 className="feature-title">Premium Fleet</h3>
                <p className="feature-desc">
                  Well-maintained luxury cars, SUVs, and sedans perfect for Dehradun's terrain and weather conditions.
                </p>
              </div>

              <div className="feature animate-on-scroll">
                <div className="feature-icon">
                  <Star size={36} />
                </div>
                <h3 className="feature-title">Best Rates</h3>
                <p className="feature-desc">
                  Competitive pricing with transparent billing. No hidden charges. Special rates for long-term rentals.
                </p>
              </div>

              <div className="feature animate-on-scroll">
                <div className="feature-icon">
                  <Users size={36} />
                </div>
                <h3 className="feature-title">Expert Drivers</h3>
                <p className="feature-desc">
                  Experienced local drivers who know every route in Dehradun, Mussoorie, Haridwar, and Rishikesh.
                </p>
              </div>

              <div className="feature animate-on-scroll">
                <div className="feature-icon">
                  <ShieldCheck size={36} />
                </div>
                <h3 className="feature-title">24/7 Support</h3>
                <p className="feature-desc">
                  Round-the-clock customer support and roadside assistance throughout your journey in Uttarakhand.
                </p>
              </div>
            </div>

            {/* Location Information */}
            <div className="location-info animate-on-scroll">
              <h3 className="location-title">🌍 Areas We Serve in Uttarakhand</h3>
              <div className="location-details">
                <div className="location-item">
                  <span>📍</span>
                  <span>Dehradun City & Airport Transfers</span>
                </div>
                <div className="location-item">
                  <span>🏔️</span>
                  <span>Mussoorie Hill Station Tours</span>
                </div>
                <div className="location-item">
                  <span>🕉️</span>
                  <span>Haridwar & Rishikesh Spiritual Tours</span>
                </div>
                <div className="location-item">
                  <span>🌲</span>
                  <span>Jim Corbett National Park</span>
                </div>
                <div className="location-item">
                  <span>⛰️</span>
                  <span>Chakrata & Kempty Falls</span>
                </div>
                <div className="location-item">
                  <span>🏛️</span>
                  <span>Rajaji National Park</span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <button className="btn-primary" onClick={handlePhoneCall}>
                📞 Call Now: +91-9876543210
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="testimonials">
          <div className="container">
            <div className="section-header">
              <div className="section-badge">Customer Reviews</div>
              <h2 className="section-title">What Our Clients Say</h2>
              <p className="section-subtitle">
                Thousands of satisfied customers have trusted us for their car rental needs in Dehradun
              </p>
            </div>

            <div className="testimonial-grid">
              <div className="testimonial animate-on-scroll">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">RS</div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">Rajesh Sharma</h4>
                    <p className="testimonial-role">Business Traveler</p>
                    <div className="testimonial-rating">★★★★★</div>
                  </div>
                </div>
                <p className="testimonial-text">
                  Excellent car rental service in Dehradun! The car was clean, well-maintained, and the driver was very professional. Perfect for my business trip to Mussoorie.
                </p>
              </div>

              <div className="testimonial animate-on-scroll">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">PG</div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">Priya Gupta</h4>
                    <p className="testimonial-role">Tourist from Delhi</p>
                    <div className="testimonial-rating">★★★★★</div>
                  </div>
                </div>
                <p className="testimonial-text">
                  Amazing experience with CarRental Dehradun! They provided us with a spacious SUV for our family trip to Rishikesh. The driver knew all the best routes and spots.
                </p>
              </div>

              <div className="testimonial animate-on-scroll">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">AK</div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">Amit Kumar</h4>
                    <p className="testimonial-role">Local Resident</p>
                    <div className="testimonial-rating">★★★★★</div>
                  </div>
                </div>
                <p className="testimonial-text">
                  Best car rental service in Dehradun! Reasonable rates, reliable cars, and excellent customer service. I always book with them for outstation trips.
                </p>
              </div>

              <div className="testimonial animate-on-scroll">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">SK</div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">Sunita Kashyap</h4>
                    <p className="testimonial-role">Wedding Planner</p>
                    <div className="testimonial-rating">★★★★★</div>
                  </div>
                </div>
                <p className="testimonial-text">
                  Fantastic service for wedding transportation! They provided multiple luxury cars for our destination wedding in Dehradun. Highly professional team.
                </p>
              </div>

              <div className="testimonial animate-on-scroll">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">VT</div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">Vikram Thakur</h4>
                    <p className="testimonial-role">Adventure Enthusiast</p>
                    <div className="testimonial-rating">★★★★★</div>
                  </div>
                </div>
                <p className="testimonial-text">
                  Perfect for adventure trips! Rented their 4WD for trekking to Valley of Flowers. The car handled mountain roads excellently. Will book again!
                </p>
              </div>

              <div className="testimonial animate-on-scroll">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">MJ</div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">Meera Joshi</h4>
                    <p className="testimonial-role">Corporate Executive</p>
                    <div className="testimonial-rating">★★★★★</div>
                  </div>
                </div>
                <p className="testimonial-text">
                  Reliable and punctual service! Used their cars for multiple corporate events in Dehradun. Their drivers are courteous and the vehicles are always spotless.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer/Contact Section */}
        <footer id="contact" className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-logo">CarRental Dehradun</div>
              <p className="footer-desc">
                Your trusted partner for premium car rental services in Dehradun and throughout Uttarakhand. 
                Experience the beauty of the Himalayas with our reliable and comfortable vehicles.
              </p>
              
              <div className="location-info">
                <h3 className="location-title">📍 Serving Dehradun & Uttarakhand</h3>
                <div className="location-details">
                  <div className="location-item">
                    <span>🏢</span>
                    <span>Office: Clock Tower, Dehradun - 248001</span>
                  </div>
                  <div className="location-item">
                    <span>✈️</span>
                    <span>Airport Pickup: Jolly Grant Airport</span>
                  </div>
                  <div className="location-item">
                    <span>🚂</span>
                    <span>Railway Pickup: Dehradun Railway Station</span>
                  </div>
                  <div className="location-item">
                    <span>⏰</span>
                    <span>Available: 24/7 Service</span>
                  </div>
                  <div className="location-item">
                    <span>🌐</span>
                    <span>Coverage: All Uttarakhand Districts</span>
                  </div>
                  <div className="location-item">
                    <span>📧</span>
                    <span>Email: info@carrentaldehradun.com</span>
                  </div>
                </div>
              </div>

              <div className="footer-contact">
                <a href="tel:+919876543210" className="footer-phone">
                  <Phone size={20} />
                  Call Now: +91-9876543210
                </a>
              </div>
            </div>

            <div className="footer-bottom">
              <p>
                &copy; 2024 CarRental Dehradun. All rights reserved. | Best Car Rental Services in Uttarakhand | 
                Premium Cars for Tourism, Business & Events in Dehradun, Mussoorie, Haridwar, Rishikesh
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}