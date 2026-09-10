import { ChevronDown } from 'lucide-react';
import './FaqItem.css';

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <button
        className="faq-item__question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown size={18} strokeWidth={1.8} className="faq-item__chevron" />
      </button>

      <div className="faq-item__answer-wrap">
        <div className="faq-item__answer">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default FaqItem;