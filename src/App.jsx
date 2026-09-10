// App.js
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import AnnouncementBar from "./components/AnnouncementBar.jsx";
import Navbar from "./components/Navbar.jsx";
import HeroSlider from "./components/HeroSlider.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import ShopPage from "./components/ShopPage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import CheckoutPage from "./components/CheckoutPage.jsx";
import CategoryShowcase from "./components/CategoryShowcase.jsx";
import Footer from "./components/Footer.jsx";
import OrderSuccessPage from "./components/OrderSuccessPage.jsx";

import TrustFeatures from "./components/TrustFeatures.jsx";
import "./App.css";
import CollectionHeader from "./components/CollectionHeader.jsx";
import FaqPage from "./components/FaqPage.jsx"; 
import ShippingPage from "./components/ShippingPage.jsx";
import ContactPage from "./components/ContactPage.jsx";
import PrivacyPolicyPage from "./components/Privacy.jsx";
import TermsOfServicePage from "./components/Terms.jsx";
import RefundsPage from "./components/Refunds.jsx";
import { TawkLiveChat } from 'tawk-react';

// Main App component with Router
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// Separate component for the main content
function AppContent() {
  return (
    <div className="app">
      <AnnouncementBar message="Nigerian Family, please remember to select Paystack at checkout for easy Naira payment." />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSlider />
              <ProductGrid />
              <ProductGrid
                heading="Omoteeluxe"
                collection="omoteeluxe"
                emptyMessage="No Omoteeluxe products available yet."
              />
              <CollectionHeader />
              <CategoryShowcase />
              <TrustFeatures />
            </>
          }
        />
        <Route path="/product/:id" element={<ProductDetailWrapper />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/refunds" element={<RefundsPage />} />
      </Routes>

      <Footer />
        <TawkLiveChat 
        propertyId="6aa2532afd82573442c94209" 
        widgetId="1k2519o9i" 
      />
    </div>
  );
}

// Wrapper for ProductDetail to handle params
function ProductDetailWrapper() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate("/");
  };

  return <ProductDetail productId={id} onBack={handleBack} />;
}

export default App;
