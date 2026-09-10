import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ShippingPage.css';

// Shipping data
const SHIPPING_INFO = {
  domestic: {
    title: 'Domestic Shipping (Nigeria)',
    zones: [
      {
        zone: 'Lagos',
        deliveryTime: '1–3 business days',
        cost: '₦2,500',
        note: 'Same-day delivery available for select areas'
      },
      {
        zone: 'Outside Lagos',
        deliveryTime: '2–7 business days',
        cost: '₦4,000 – ₦6,000',
        note: 'Delivery time depends on location'
      },
      {
        zone: 'Remote Areas',
        deliveryTime: '5–10 business days',
        cost: '₦7,000 – ₦10,000',
        note: 'May require additional processing time'
      }
    ]
  },
  international: {
    title: 'International Shipping',
    zones: [
      {
        zone: 'West Africa',
        deliveryTime: '5–10 business days',
        cost: '$25 – $40',
        note: 'Countries: Ghana, Benin, Togo, Ivory Coast'
      },
      {
        zone: 'Europe & UK',
        deliveryTime: '7–14 business days',
        cost: '$40 – $60',
        note: 'Includes UK, France, Germany, Italy'
      },
      {
        zone: 'North America',
        deliveryTime: '7–14 business days',
        cost: '$45 – $65',
        note: 'USA and Canada'
      },
      {
        zone: 'Rest of World',
        deliveryTime: '10–20 business days',
        cost: '$50 – $80',
        note: 'Contact us for specific rates'
      }
    ]
  },
  processing: {
    title: 'Order Processing',
    details: [
      'All orders are processed within 1–2 business days',
      'Custom orders require 5–7 business days for processing',
      'You will receive a confirmation email with tracking details',
      'Orders placed on weekends will be processed the next business day'
    ]
  },
  tracking: {
    title: 'Track Your Order',
    steps: [
      'Once your order ships, you\'ll receive a tracking number via email and WhatsApp',
      'Track your package using our carrier\'s website',
      'For domestic orders, track via our local courier partner',
      'For international orders, track using the global courier service'
    ]
  }
};

// Shipping FAQ data
const SHIPPING_FAQS = [
  {
    id: 'ship-1',
    question: 'How much does shipping cost?',
    answer: 'Shipping costs vary based on your location and order weight. The exact shipping cost will be calculated at checkout before you confirm your order.'
  },
  {
    id: 'ship-2',
    question: 'Can I change my shipping address after placing an order?',
    answer: 'Please contact our customer care team immediately at hello@omoteeluxe.com. We can update your address if the order hasn\'t been processed or shipped yet.'
  },
  {
    id: 'ship-3',
    question: 'Do you offer express shipping?',
    answer: 'Yes, express shipping is available for Lagos orders. Please select the express option at checkout or contact our team for assistance.'
  },
  {
    id: 'ship-4',
    question: 'What happens if I\'m not home for delivery?',
    answer: 'Our courier partners will attempt delivery three times. After that, you can pick up your package from their nearest office or request redelivery.'
  },
  {
    id: 'ship-5',
    question: 'Do I have to pay customs fees for international orders?',
    answer: 'Customs fees and import duties may apply depending on your country\'s regulations. These fees are the responsibility of the recipient.'
  }
];

function ShippingPage() {
  const [activeFaqId, setActiveFaqId] = useState(null);

  const toggleFaq = (id) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  return (
    <main className="shipping-page">
      {/* Hero Section */}
      <section className="shipping-hero">
        <div className="container">
          <h1 className="shipping-hero__title">Shipping & Delivery</h1>
          <p className="shipping-hero__subtitle">
            We deliver elegance to your doorstep, wherever you are in the world.
          </p>
          <div className="shipping-hero__stats">
            <div className="shipping-stat">
              <span className="shipping-stat__number">1-3</span>
              <span className="shipping-stat__label">Days Delivery in Lagos</span>
            </div>
            <div className="shipping-stat">
              <span className="shipping-stat__number">100%</span>
              <span className="shipping-stat__label">Order Tracking</span>
            </div>
            <div className="shipping-stat">
              <span className="shipping-stat__number">24/7</span>
              <span className="shipping-stat__label">Customer Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Domestic Shipping Section */}
      <section className="shipping-section">
        <div className="container">
          <h2 className="shipping-section__title">{SHIPPING_INFO.domestic.title}</h2>
          <div className="shipping-grid">
            {SHIPPING_INFO.domestic.zones.map((zone, index) => (
              <div key={index} className="shipping-card">
                <div className="shipping-card__icon">📍</div>
                <h3 className="shipping-card__zone">{zone.zone}</h3>
                <div className="shipping-card__details">
                  <div className="shipping-detail">
                    <span className="shipping-detail__label">Delivery Time</span>
                    <span className="shipping-detail__value">{zone.deliveryTime}</span>
                  </div>
                  <div className="shipping-detail">
                    <span className="shipping-detail__label">Cost</span>
                    <span className="shipping-detail__value shipping-detail__value--highlight">
                      {zone.cost}
                    </span>
                  </div>
                  {zone.note && (
                    <p className="shipping-card__note">{zone.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Shipping Section */}
      <section className="shipping-section shipping-section--alt">
        <div className="container">
          <h2 className="shipping-section__title">{SHIPPING_INFO.international.title}</h2>
          <div className="shipping-grid">
            {SHIPPING_INFO.international.zones.map((zone, index) => (
              <div key={index} className="shipping-card shipping-card--international">
                <div className="shipping-card__icon">✈️</div>
                <h3 className="shipping-card__zone">{zone.zone}</h3>
                <div className="shipping-card__details">
                  <div className="shipping-detail">
                    <span className="shipping-detail__label">Delivery Time</span>
                    <span className="shipping-detail__value">{zone.deliveryTime}</span>
                  </div>
                  <div className="shipping-detail">
                    <span className="shipping-detail__label">Cost</span>
                    <span className="shipping-detail__value shipping-detail__value--highlight">
                      {zone.cost}
                    </span>
                  </div>
                  {zone.note && (
                    <p className="shipping-card__note">{zone.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processing & Tracking Section */}
      <section className="shipping-section">
        <div className="container">
          <div className="shipping-info-grid">
            {/* Processing Info */}
            <div className="shipping-info-card">
              <h3 className="shipping-info-card__title">
                <span className="shipping-info-card__icon">⏱️</span>
                {SHIPPING_INFO.processing.title}
              </h3>
              <ul className="shipping-info-card__list">
                {SHIPPING_INFO.processing.details.map((detail, index) => (
                  <li key={index} className="shipping-info-card__item">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tracking Info */}
            <div className="shipping-info-card">
              <h3 className="shipping-info-card__title">
                <span className="shipping-info-card__icon">📦</span>
                {SHIPPING_INFO.tracking.title}
              </h3>
              <ul className="shipping-info-card__list shipping-info-card__list--numbered">
                {SHIPPING_INFO.tracking.steps.map((step, index) => (
                  <li key={index} className="shipping-info-card__item">
                    <span className="shipping-info-card__step">{index + 1}.</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping FAQ Section */}
      <section className="shipping-section shipping-section--faq">
        <div className="container">
          <h2 className="shipping-section__title">Frequently Asked Questions</h2>
          <div className="shipping-faq">
            {SHIPPING_FAQS.map((faq) => (
              <div key={faq.id} className="shipping-faq__item">
                <button
                  className="shipping-faq__trigger"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={activeFaqId === faq.id}
                >
                  <span className="shipping-faq__question">{faq.question}</span>
                  <span className="shipping-faq__icon">
                    {activeFaqId === faq.id ? '−' : '+'}
                  </span>
                </button>
                {activeFaqId === faq.id && (
                  <div className="shipping-faq__answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="shipping-cta">
        <div className="container">
          <div className="shipping-cta__content">
            <h2 className="shipping-cta__title">Need Help With Your Order?</h2>
            <p className="shipping-cta__text">
              Our customer care team is here to assist you with any shipping questions.
            </p>
            <div className="shipping-cta__buttons">
              <Link to="/contact" className="button button--primary">
                Contact Us
              </Link>
              <a href="https://wa.me/2347048304972" className="button button--secondary">
                <span>💬</span> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ShippingPage;
