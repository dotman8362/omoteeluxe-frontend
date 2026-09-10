import { useState } from 'react';
import FaqItem from './FaqItem.jsx';
import './FaqAccordion.css';

function FaqAccordion({ items }) {
  const [openIds, setOpenIds] = useState(() => new Set([items[0]?.id]));

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (items.length === 0) {
    return (
      <div className="faq-accordion faq-accordion--empty">
        <p>No questions match your search yet. Try a different keyword.</p>
      </div>
    );
  }

  return (
    <div className="faq-accordion">
      {items.map((item) => (
        <FaqItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openIds.has(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  );
}

export default FaqAccordion;