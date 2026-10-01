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
    answer: [
      'We create timeless ready-to-wear pieces designed for women who value elegance, comfort, and confidence.',
      'Every piece is carefully selected to help you look polished and luxurious.',
      'No stress of overthinking what to wear.',
    ],
  },
  {
    id: 'delivery-1',
    category: 'Orders & Shipping',
    question: 'How Long Does Delivery Take?',
    answer: [
      'Orders within Lagos are typically delivered within 1–3 business days.',
      'Orders outside Lagos usually arrive within 2–7 business days.',
      'International delivery times vary by country.',
      'Once your order is shipped, you\'ll receive a tracking update.',
    ],
  },
  {
    id: 'delivery-2',
    category: 'Orders & Shipping',
    question: 'Do You Deliver Nationwide And Internationally?',
    answer: [
      'Yes, we deliver across Nigeria and to selected international destinations.',
      'Shipping fees are calculated at checkout based on your location.',
    ],
  },
  {
    id: 'sizing-1',
    category: 'Sizing & Fit',
    question: 'How Do I Choose The Right Size?',
    answer: [
      'Each product includes a detailed size guide to help you find your perfect fit.',
      'If you\'re unsure, contact our customer care team before ordering.',
      'We\'ll happily recommend the best size for you.',
    ],
  },
  {
    id: 'returns-1',
    category: 'Returns & Exchanges',
    question: 'Do You Accept Returns Or Refunds?',
    answer: [
      'Due to the nature of our products, we do not offer refunds for change of mind.',
      'Refunds are only processed if you receive a wrong or defective item.',
    ],
  },
  {
    id: 'tracking-1',
    category: 'Orders & Shipping',
    question: 'How Do I Track My Order?',
    answer: [
      'Once your order has been dispatched, we\'ll send your tracking details via WhatsApp, SMS, or email.',
      'You can also contact our customer care team at any time for order updates.',
    ],
  },
  {
    id: 'payments-1',
    category: 'Payments',
    question: 'What Payment Methods Do You Accept?',
    answer: [
      'We accept secure payments through bank transfer, debit cards, credit cards, and other available payment options displayed at checkout.',
      'All transactions are processed securely to protect your information.',
    ],
  },
  {
    id: 'restocks-1',
    category: 'Products & Collections',
    question: 'Are Your Pieces Restocked?',
    answer: [
      'Some of our collections are produced in limited quantities to maintain their exclusivity.',
      'Once a style sells out, it may not be restocked.',
      'If you love a piece, we recommend ordering before it\'s gone.',
    ],
  },
  {
    id: 'care-1',
    category: 'Product Care',
    question: 'How Do I Care For My Outfit?',
    answer: [
      'Hand wash or use a gentle machine cycle.',
      'Wash with mild detergent.',
      'Do not bleach.',
      'Air dry in shade.',
      'Iron on low heat or steam for best results.',
      'Following these care instructions helps your outfit maintain its beauty for years.',
    ],
  },
  {
    id: 'whatsapp-1',
    category: 'Orders & Support',
    question: 'Can I Order Through WhatsApp?',
    answer: [
      'Absolutely.',
      'You can place your order directly through our website.',
      'Or chat with us on WhatsApp if you need styling advice, size assistance, or help completing your purchase.',
    ],
  },
  {
    id: 'styling-1',
    category: 'Styling Advice',
    question: 'Do You Offer Styling Advice?',
    answer: [
      'Yes.',
      'Whether you\'re dressing for church, work, brunch, weddings, vacations, or everyday elegance, our team is happy to recommend pieces that suit your style, body shape, and occasion.',
    ],
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