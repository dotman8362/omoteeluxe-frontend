// Small illustrative icons for the trust-badge row. Flat, rounded shapes in
// the site's tan/brown palette, echoing the handmade crochet toys in the
// reference image without reproducing the photography itself.

export function ShippingIcon(props) {
  return (
    <svg viewBox="0 0 100 100" width="72" height="72" {...props}>
      <rect x="30" y="24" width="26" height="34" rx="3" fill="#c94d3f" />
      <rect x="30" y="34" width="26" height="8" fill="#3f6b4a" />
      <rect x="30" y="46" width="26" height="8" fill="#e0a83a" />
      <rect x="58" y="30" width="10" height="28" rx="2" fill="#c9a877" />
      <rect x="60" y="24" width="6" height="6" fill="#5a4530" />
      <path d="M18 58 L78 58 L70 74 L26 74 Z" fill="#c9a877" />
      <path d="M18 58 L78 58 L74 66 L22 66 Z" fill="#6b7568" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 100 100" width="72" height="72" {...props}>
      <path
        d="M34 22 Q50 14 66 22 L70 58 Q70 70 50 70 Q30 70 30 58 Z"
        fill="#c9a877"
      />
      <circle cx="50" cy="46" r="16" fill="#241b12" />
      <circle cx="50" cy="46" r="1.6" fill="#c9a877" />
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(angle) * 11;
        const y = 46 + Math.sin(angle) * 11;
        return <circle key={i} cx={x} cy={y} r="2.6" fill="#c9a877" />;
      })}
      <path d="M30 30 Q22 34 22 46 Q22 58 30 64" fill="none" stroke="#241b12" strokeWidth="2.5" />
      <path d="M70 26 Q80 30 78 40" fill="none" stroke="#241b12" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function PadlockIcon(props) {
  return (
    <svg viewBox="0 0 100 100" width="72" height="72" {...props}>
      <path
        d="M38 42 V32 Q38 16 50 16 Q62 16 62 32 V42"
        fill="none"
        stroke="#5c5348"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <rect x="28" y="40" width="44" height="38" rx="10" fill="#c9a877" />
      <circle cx="50" cy="56" r="6" fill="#4a3c22" />
      <rect x="47.5" y="58" width="5" height="10" rx="2" fill="#4a3c22" />
    </svg>
  );
}