import { Search } from 'lucide-react';
import './FaqHero.css';

function FaqHero({ query, onQueryChange }) {
  return (
    <header className="faq-hero">
      <span className="faq-hero__eyebrow">Support</span>
      <h1 className="faq-hero__heading">
        Questions? <em>We've got answers.</em>
      </h1>
      <p className="faq-hero__subtext">
        Everything you need to know about ordering, sizing, shipping, and caring for your
        OmoteeLuxe pieces.
      </p>

      <div className="faq-hero__search">
        <Search size={18} strokeWidth={1.7} className="faq-hero__search-icon" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search a question…"
          className="faq-hero__search-input"
          aria-label="Search FAQs"
        />
      </div>
    </header>
  );
}

export default FaqHero;