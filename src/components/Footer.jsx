import { useState } from "react";
import { Link } from "react-router-dom";
import paystackLogo from "../assets/download.png";
import verveLogo from "../assets/download.jpg";
import mastercardLogo from "../assets/download (1).png";
import visaLogo from "../assets/download (2).png";
import bankTransferLogo from "../assets/download (3).png";
import omoLogo from "../assets/omotee.jpg";
import {
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  ArrowUpRightIcon,
} from "./Icons.jsx";
import { apiUrl, readJson } from "../lib/api.js";
import "./Footer.css";

// Update the links to include proper paths
const LINK_GROUPS = [
  {
    heading: "Shop",
    links: [
      { name: "Ready to wears", path: "/shop?category=ready-to-wears" },
      { name: "Autogele", path: "/shop?category=autogele" },
      { name: "Luxury", path: "/shop?category=luxury" },
      { name: "Handfans", path: "/shop?category=handfans" },
      { name: "New Arrivals", path: "/shop?category=new-arrivals" },
    ],
  },
  {
    heading: "Help",
    links: [
      { name: "Contact Us", path: "/contact" },
      { name: "Track My Order", path: "/contact" },
      { name: "FAQs", path: "/faq" },
    ],
  },
  {
    heading: "Studio",
    links: [{ name: "About Us", path: "/about" }],
  },
];

// SVG Icons for payment methods

const PaymentIcons = {
  Paystack: () => (
    <img src={paystackLogo} alt="Paystack" width="32" height="24" />
  ),

  Verve: () => <img src={verveLogo} alt="Verve" width="54" height="24" />,

  Mastercard: () => (
    <img src={mastercardLogo} alt="Mastercard" width="54" height="24" />
  ),

  Visa: () => <img src={visaLogo} alt="Visa" width="54" height="24" />,

  "Bank Transfer": () => (
    <img src={bankTransferLogo} alt="Bank Transfer" width="54" height="24" />
  ),
};

const PAYMENT_METHODS = [
  "Paystack",
  "Verve",
  "Mastercard",
  "Visa",
  "Bank Transfer",
];

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");

  const handleSubscribe = async (event) => {
    event.preventDefault();

    // Validate email
    if (!email.trim()) {
      setSubscribeError("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscribeError("Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);
    setSubscribeError("");
    setSubscribed(false);

    try {
      const response = await fetch(apiUrl("/api/subscribe"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      await readJson(response);

      // Success
      setSubscribed(true);
      setEmail("");
      setSubscribeError("");
    } catch (error) {
      setSubscribeError(
        error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer__newsletter">
        <div className="footer__newsletter-copy">
          <h2 className="footer__newsletter-heading">
            Join the Omoteeluxe&nbsp;&nbsp; family
          </h2>
          <p className="footer__newsletter-subtext">
            New drops, restocks, and behind-the-hook stories — straight to your
            inbox, once in a while.
          </p>
        </div>

        <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSubscribeError(""); // Clear error on typing
            }}
            className="footer__newsletter-input"
            aria-label="Email address"
            disabled={isSubscribing}
          />
          <button
            type="submit"
            className="footer__newsletter-button"
            disabled={isSubscribing}
          >
            {isSubscribing ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {subscribeError && (
          <p className="footer__newsletter-error" role="alert">
            {subscribeError}
          </p>
        )}

        {subscribed && (
          <p className="footer__newsletter-confirm">
            ✅ You're on the list — welcome!
          </p>
        )}
      </div>

      <div className="footer__divider" />

      <div className="footer__main">
        <div className="footer__brand">
          {/* <span className="footer__logo">OmoteeLuxe</span> */}
          <p className="footer__brand-copy">
            <img
              src={omoLogo}
              alt="OmoteeLuxe: Nigerian Craft, Global Luxury."
              className="footer__brand-image"
            />
          </p>
          <div className="footer__socials">
            <a
              href="https://www.instagram.com/shopteeluxe?igsh=YWo5NGE3dHhkejNm&utm_source=qr"
              aria-label="Instagram"
              className="footer__social-icon"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.tiktok.com/@shopteeluxee?_r=1&_t=ZN-969uRwQB9fy"
              aria-label="TikTok"
              className="footer__social-icon"
            >
              <TikTokIcon />
            </a>
            <a
              href="https://wa.me/2347048304972"
              aria-label="WhatsApp"
              className="footer__social-icon"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        {LINK_GROUPS.map((group) => (
          <div className="footer__group" key={group.heading}>
            <h3 className="footer__group-heading">{group.heading}</h3>
            <ul className="footer__group-links">
              {group.links.map((link) => {
                // Check if link is an object with name and path, or just a string
                const isObject = typeof link === "object" && link !== null;
                const linkName = isObject ? link.name : link;
                const linkPath = isObject
                  ? link.path
                  : `#${linkName.toLowerCase().replace(/\s+/g, "-")}`;

                return (
                  <li key={linkName}>
                    <Link to={linkPath}>{linkName}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="footer__group footer__group--contact">
          <h3 className="footer__group-heading">Visit the shop</h3>
          <address className="footer__contact">
            Lagos State,
            <br />
            Nigeria
          </address>
          <a
            href="mailto:shopteeluxee@gmail.com"
            className="footer__contact-link"
          >
            shopteeluxee@gmail.com <ArrowUpRightIcon />
          </a>
          <a href="tel:+2347048304972" className="footer__contact-link">
            +2347048304972 <ArrowUpRightIcon />
          </a>
        </div>
      </div>

      <div className="footer__divider" />

      <div className="footer__bottom">
        <p className="footer__copyright">
          © {new Date().getFullYear()} Omoteeluxe. All rights reserved.
        </p>

        <ul className="footer__legal">
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms">Terms of Service</Link>
          </li>
          <li>
            <Link to="/refunds">Refund Policy</Link>
          </li>
        </ul>

        <ul className="footer__payments" aria-label="Accepted payment methods">
          {PAYMENT_METHODS.map((method) => {
            const IconComponent = PaymentIcons[method];
            return (
              <li key={method} className="footer__payment-badge" title={method}>
                <IconComponent />
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
