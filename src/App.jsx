// App.js
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import ScrollReveal from "scrollreveal";
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
import { TawkLiveChat } from "tawk-react";
import CollectionHeader2 from "./components/CollectionHeader2.jsx";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "bottom",
      distance: "40px",
      duration: 800,
      delay: 100,
      easing: "cubic-bezier(0.6, 0.2, 0.1, 1)",
      reset: false,
      viewFactor: 0.15,
    });

    sr.reveal(".sr-item", { interval: 100 });
    sr.reveal("section:not(.sr-item)", { interval: 100 });
    sr.reveal("footer:not(.sr-item)");

    return () => sr.destroy();
  }, [location.pathname]);

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
              <CollectionHeader2 />
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
      <Analytics />
    </div>
  );
}

function ProductDetailWrapper() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate("/");
  };

  return <ProductDetail productId={id} onBack={handleBack} />;
}

export default App;