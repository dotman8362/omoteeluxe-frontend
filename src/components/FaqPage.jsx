import { useMemo, useState } from 'react';
import FaqHero from './FaqHero.jsx';
import FaqCategories from './FaqCategories.jsx';
import FaqAccordion from './FaqAccordion.jsx';
import FaqCta from './FaqCta.jsx';
import './FaqPage.css';

const FAQS = [
  {
    id: 'difference-1',
    category: 'About OmoteeLuxe',
    question: 'What Makes OmoteeLuxe Different?',
    answer:
      'At OmoteeLuxe, We Create Timeless Ready-To-Wear Pieces Designed For Women Who Value Elegance, Comfort, And Confidence. Every Piece Is Carefully Selected To Help You Look Polished And Luxurious Without The Stress Of Overthinking What To Wear.',
  },
  {
    id: 'delivery-1',
    category: 'Orders & Shipping',
    question: 'How Long Does Delivery Take?',
    answer:
      'Orders Within Lagos Are Typically Delivered Within 1–3 Business Days.Orders Outside Lagos Usually Arrive Within 2–7 Business Days.International Delivery Times Vary By Country.Once Your Order Is Shipped, You\'ll Receive A Tracking Update.',
  },
  {
    id: 'delivery-2',
    category: 'Orders & Shipping',
    question: 'Do You Deliver Nationwide And Internationally?',
    answer:
      'Yes We Deliver Across Nigeria And To Selected International Destinations.Shipping Fees Are Calculated At Checkout Based On Your Location.',
  },
  {
    id: 'sizing-1',
    category: 'Sizing & Fit',
    question: 'How Do I Choose The Right Size?',
    answer:
      'Each Product Includes A Detailed Size Guide To Help You Find Your Perfect Fit.If You\'re Unsure, Simply Contact Our Customer Care Team Before Ordering. We\'ll Happily Recommend The Best Size For You.',
  },
  {
    id: 'returns-1',
    category: 'Returns & Exchanges',
    question: 'Do You Accept Returns Or Refunds?',
    answer:
      'Due To The Nature Of Our Products, We Do Not Offer Refunds For Change Of Mind.Refunds Are Only Processed If You Receive A Wrong Or Defective Item.',
  },
  {
    id: 'tracking-1',
    category: 'Orders & Shipping',
    question: 'How Do I Track My Order?',
    answer:
      'Once Your Order Has Been Dispatched, We\'ll Send Your Tracking Details Via WhatsApp, SMS, Or Email.You Can Also Contact Our Customer Care Team At Any Time For Order Updates.',
  },
  {
    id: 'payments-1',
    category: 'Payments',
    question: 'What Payment Methods Do You Accept?',
    answer:
      'We Accept Secure Payments Through Bank Transfer, Debit Cards, Credit Cards, And Other Available Payment Options Displayed At Checkout.All Transactions Are Processed Securely To Protect Your Information.',
  },
  {
    id: 'restocks-1',
    category: 'Products & Collections',
    question: 'Are Your Pieces Restocked?',
    answer:
      'Some Of Our Collections Are Produced In Limited Quantities To Maintain Their Exclusivity.Once A Style Sells Out, It May Not Be Restocked.If You Love A Piece, We Recommend Ordering Before It\'s Gone.',
  },
  {
    id: 'care-1',
    category: 'Product Care',
    question: 'How Do I Care For My Outfit?',
    answer:
      'To Preserve The Beauty Of Your Garment:• Hand Wash Or Use A Gentle Machine Cycle.• Wash With Mild Detergent.• Do Not Bleach.• Air Dry In Shade.• Iron On Low Heat Or Steam For Best Results.Following These Care Instructions Helps Your Outfit Maintain Its Beauty For Years.',
  },
  {
    id: 'whatsapp-1',
    category: 'Orders & Support',
    question: 'Can I Order Through WhatsApp?',
    answer:
      'Absolutely.You Can Place Your Order Directly Through Our Website Or Chat With Us On WhatsApp If You Need Styling Advice, Size Assistance, Or Help Completing Your Purchase.',
  },
  {
    id: 'styling-1',
    category: 'Styling Advice',
    question: 'Do You Offer Styling Advice?',
    answer:
      'Yes.Whether You\'re Dressing For Church, Work, Brunch, Weddings, Vacations, Or Everyday Elegance, Our Team Is Happy To Recommend Pieces That Suit Your Style, Body Shape, And Occasion.',
  },
];

// Optional: Helper to get unique categories
const getUniqueCategories = () => {
  const categories = FAQS.map(faq => faq.category);
  return [...new Set(categories)];
};

// Optional: Group FAQs by category
const getGroupedFAQs = () => {
  return FAQS.reduce((groups, faq) => {
    if (!groups[faq.category]) {
      groups[faq.category] = [];
    }
    groups[faq.category].push(faq);
    return groups;
  }, {});
};

export { FAQS, getUniqueCategories, getGroupedFAQs };

const CATEGORIES = ['All', ...new Set(FAQS.map((faq) => faq.category))];

function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return FAQS.filter((faq) => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        faq.question.toLowerCase().includes(normalizedQuery) ||
        faq.answer.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <main className="faq-page">
      <FaqHero query={query} onQueryChange={setQuery} />
      <FaqCategories
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />
      <FaqAccordion items={filteredFaqs} />
      <FaqCta />
    </main>
  );
}

export default FaqPage;