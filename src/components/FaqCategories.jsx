import { LayoutGrid, Truck, RotateCcw, Ruler, CreditCard, Sparkles, HelpCircle } from 'lucide-react';
import './FaqCategories.css';

// Maps each category label to a lucide icon, used directly inline below.
const CATEGORY_ICONS = {
  All: LayoutGrid,
  'Orders & Shipping': Truck,
  'Returns & Exchanges': RotateCcw,
  'Sizing & Fit': Ruler,
  Payments: CreditCard,
  'Custom Orders': Sparkles,
};

function FaqCategories({ categories, activeCategory, onSelect }) {
  return (
    <nav className="faq-categories" aria-label="FAQ categories">
      {categories.map((category) => {
        const Icon = CATEGORY_ICONS[category] || HelpCircle;
        return (
          <button
            key={category}
            className={`faq-categories__pill ${
              category === activeCategory ? 'faq-categories__pill--active' : ''
            }`}
            onClick={() => onSelect(category)}
          >
            <Icon size={15} strokeWidth={2} className="faq-categories__icon" />
            {category}
          </button>
        );
      })}
    </nav>
  );
}

export default FaqCategories;