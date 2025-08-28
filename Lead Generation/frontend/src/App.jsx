import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import InquiryButton from "./components/InquiryButton"; // Floating Inquiry Button

// Import pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import ClientSatisfaction from "./pages/ClientSatisfaction";
import Auth from "./pages/Auth";
import VendorDashboard from "./pages/VendorDashboard";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import VendorProfile from "./pages/VendorProfile";

import ScrapedData from "./pages/ScrapedData";
const App = () => {
  return (
    <div className="app-container">
      {/* Header - Visible on all pages */}
      <Header />

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/client-satisfaction" element={<ClientSatisfaction />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/subscription-plans" element={<SubscriptionPlans />} />
          <Route path="/scraped-data" element={<ScrapedData />} /> 
          <Route path="/vendor-profile" element={<VendorProfile />} /> {/* ✅ Add Route for Vendor Profile */}
        </Routes>
      </main>

      {/* Floating Inquiry Button - Always Visible */}
      <InquiryButton />
    </div>
  );
};

export default App;
