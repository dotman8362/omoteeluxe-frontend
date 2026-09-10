import { useState } from 'react';
import { MinusIcon, PlusIcon } from './Icons.jsx';
import './QuantitySelector.css';

function QuantitySelector({ min = 1, max = 99, onChange }) {
  const [qty, setQty] = useState(min);

  const update = (next) => {
    const clamped = Math.min(max, Math.max(min, next));
    setQty(clamped);
    onChange?.(clamped);
  };

  return (
    <div className="quantity-selector">
      <button
        type="button"
        className="quantity-selector__btn"
        onClick={() => update(qty - 1)}
        aria-label="Decrease quantity"
      >
        <MinusIcon />
      </button>
      <input
        type="text"
        inputMode="numeric"
        className="quantity-selector__value"
        value={qty}
        onChange={(e) => {
          const parsed = parseInt(e.target.value, 10);
          if (!Number.isNaN(parsed)) update(parsed);
        }}
        aria-label="Quantity"
      />
      <button
        type="button"
        className="quantity-selector__btn"
        onClick={() => update(qty + 1)}
        aria-label="Increase quantity"
      >
        <PlusIcon />
      </button>
    </div>
  );
}

export default QuantitySelector;