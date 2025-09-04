import React, { useState, useEffect } from 'react';
import { Phone, ChevronLeft, ChevronRight, Menu, X, Star, Award, Users, ShieldCheck } from 'lucide-react';

export default function SimpleWebsite() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Car images for the slider
  const carImages = [
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80',
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [carImages.length]);

  // Scroll detection for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'happy-customers'];
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
    window.location.href = 'tel:+1234567890';
  };

  return (
    <>
      {/* SEO Meta Elements */}
      <div style={{ display: 'none' }}>
        <h1>Premium Car Dealership - Best Cars, Best Prices</h1>
        <meta name="description" content="Find your perfect car from our extensive collection of premium vehicles. 20+ years of experience, competitive pricing, and exceptional customer service." />
        <meta name="keywords" content="car dealership, premium cars, luxury vehicles, car sales, auto dealer, best car prices" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="CarDealer - Premium Cars & Exceptional Service" />
        <meta property="og:description" content="Discover your dream car with our premium collection and expert service" />
        <meta property="og:type" content="website" />
      </div>

      <div className="min-h-screen bg-white">
        {/* Enhanced Header with Glassmorphism */}
        <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CarDealer
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About' },
                  { id: 'happy-customers', label: 'Happy Customers' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium ${
                      activeSection === item.id ? 'text-blue-600' : ''
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform origin-left animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
            
            {/* Enhanced Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-gray-200/50 bg-white/90 backdrop-blur-sm rounded-lg">
                <div className="flex flex-col space-y-4 pt-4">
                  {[
                    { id: 'home', label: 'Home' },
                    { id: 'about', label: 'About' },
                    { id: 'happy-customers', label: 'Happy Customers' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50 rounded-lg ${
                        activeSection === item.id ? 'text-blue-600 bg-blue-50 font-semibold' : ''
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </nav>
        </header>

        {/* Enhanced Home Section with Advanced Slider */}
        <section id="home" className="pt-16">
          <div className="relative h-screen overflow-hidden">
            {/* Image Slider with Enhanced Effects */}
            <div className="relative w-full h-full">
              {carImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 transform ${
                    index === currentSlide 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Premium luxury car ${index + 1} - High-end vehicle showcase`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/50"></div>
                </div>
              ))}
            </div>

            {/* Enhanced Slider Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Enhanced Slider Indicators */}
            <div className="absolute bottom-24 md:bottom-28 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {carImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 border-2 border-white/50 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Enhanced Phone Icon with Animation */}
            <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2">
              <button
                onClick={handlePhoneCall}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 md:p-5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none border-4 border-white/20"
                aria-label="Call us now"
              >
                <Phone className="w-6 h-6 md:w-7 md:h-7 group-hover:animate-bounce" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
              </button>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium">
                Call Now
              </div>
            </div>

            {/* Enhanced Hero Content */}
            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
              <div className="max-w-5xl">
                <div className="mb-6 md:mb-8">
                  <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm md:text-base font-medium border border-white/20 mb-4">
                    ✨ Premium Car Collection
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
                  Luxury Awaits
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 md:mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
                  Discover extraordinary vehicles that redefine your driving experience
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 md:px-10 py-3 md:py-4 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 hover:scale-105 shadow-2xl">
                    Explore Collection
                  </button>
                  <button 
                    onClick={handlePhoneCall}
                    className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 md:px-10 py-3 md:py-4 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 hover:scale-105 border border-white/20"
                  >
                    📞 Call Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced About Section */}
        <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
                  About Our Dealership
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Excellence Since 2003
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Two decades of automotive excellence, delivering premium vehicles and unmatched customer satisfaction
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
                {[
                  { icon: Award, title: 'Premium Quality', desc: 'Rigorously inspected vehicles meeting the highest standards' },
                  { icon: Star, title: 'Best Prices', desc: 'Competitive pricing with flexible financing solutions' },
                  { icon: Users, title: 'Expert Team', desc: 'Seasoned professionals dedicated to your satisfaction' },
                  { icon: ShieldCheck, title: 'Guaranteed', desc: 'Comprehensive warranty coverage for peace of mind' }
                ].map((item, index) => (
                  <div key={index} className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <button 
                  onClick={handlePhoneCall}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  📞 Contact Our Experts
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Happy Customers Section */}
        <section id="happy-customers" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
                  Customer Success Stories
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  What Our Clients Say
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Join thousands of satisfied customers who found their perfect vehicle
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    name: "John Smith",
                    initials: "JS",
                    role: "Business Owner",
                    rating: 5,
                    text: "Exceptional service from start to finish! Found my dream BMW here and the team made everything seamless. Highly recommend!"
                  },
                  {
                    name: "Maria Johnson",
                    initials: "MJ",
                    role: "Marketing Director", 
                    rating: 5,
                    text: "Outstanding experience! Professional staff, great prices, and amazing car selection. Will definitely return for my next purchase."
                  },
                  {
                    name: "David Wilson",
                    initials: "DW",
                    role: "Engineer",
                    rating: 5,
                    text: "Top-notch dealership with incredible customer service. They went above and beyond to help me find the perfect family car."
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                        {testimonial.initials}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-lg text-gray-800">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                        <div className="text-yellow-400 text-lg mt-1">
                          {"★".repeat(testimonial.rating)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <button 
                  onClick={handlePhoneCall}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  📞 Start Your Journey
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
                CarDealer
              </div>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Your trusted partner in finding the perfect luxury vehicle. Experience excellence in every interaction.
              </p>
              <div className="mb-8">
                <button 
                  onClick={handlePhoneCall}
                  className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  <Phone className="w-5 h-5 mr-3 group-hover:animate-bounce" />
                  Call Now: +1 (234) 567-890
                </button>
              </div>
              <div className="border-t border-gray-700 pt-6">
                <p className="text-gray-400">
                  &copy; 2025 CarDealer. All rights reserved. | Premium Automotive Excellence
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}