import { useState } from 'react';
import { ChevronDownIcon } from './Icons.jsx';
import './CurrencySelector.css';

const CURRENCIES = [
  { code: 'NGN', flag: '🇳🇬', label: 'Nigerian Naira' },
  { code: 'USD', flag: '🇺🇸', label: 'US Dollar' },
  { code: 'GBP', flag: '🇬🇧', label: 'British Pound' },
];

function CurrencySelector() {
  const [dismissed, setDismissed] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(CURRENCIES[0]);

  if (dismissed) return null;

  return (
    <div className="currency-selector">
      <button
        className="currency-selector__close"
        aria-label="Dismiss currency selector"
        onClick={() => setDismissed(true)}
      >
        &times;
      </button>

      <div className="currency-selector__dropdown">
        <button className="currency-selector__trigger" onClick={() => setOpen((o) => !o)}>
          <span className="currency-selector__flag">{selected.flag}</span>
          <span>{selected.code}</span>
          <ChevronDownIcon />
        </button>

        {open && (
          <ul className="currency-selector__menu" role="listbox">
            {CURRENCIES.map((c) => (
              <li key={c.code}>
                <button
                  className="currency-selector__option"
                  onClick={() => {
                    setSelected(c);
                    setOpen(false);
                  }}
                >
                  <span className="currency-selector__flag">{c.flag}</span> {c.code}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CurrencySelector;