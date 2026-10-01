import { ChevronDown } from 'lucide-react';
import './FaqItem.css';

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <button
        type="button"
        className="faq-item__question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <svg
          className="faq-item__chevron"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div className="faq-item__answer-wrap">
        <div className="faq-item__answer">
          {Array.isArray(answer) ? (
            <ul className="faq-item__answer-list">
              {answer.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          ) : (
            <p>{answer}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FaqItem;