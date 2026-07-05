import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SimpleWebsite from "./components/Car";
import SelfDrivePage from "./pages/SelfDrivePage";
import FleetPage from "./pages/FleetPage";
import MussooriePage from "./pages/MussooriePage";
import RishikeshHaridwarPage from "./pages/RishikeshHaridwarPage";
import CharDhamPage from "./pages/CharDhamPage";
import AirportPage from "./pages/AirportPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Homepage - existing component, unchanged */}
          <Route path="/" element={<div><SimpleWebsite /></div>} />

          {/* New SEO landing pages */}
          <Route path="/self-drive-car-rental-dehradun" element={<SelfDrivePage />} />
          <Route path="/car-fleet-dehradun" element={<FleetPage />} />
          <Route path="/dehradun-to-mussoorie-self-drive" element={<MussooriePage />} />
          <Route path="/dehradun-to-rishikesh-haridwar-self-drive" element={<RishikeshHaridwarPage />} />
          <Route path="/char-dham-yatra-car-rental" element={<CharDhamPage />} />
          <Route path="/jolly-grant-airport-car-rental" element={<AirportPage />} />
          <Route path="/car-rental-pricing-dehradun" element={<PricingPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-book-now" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
