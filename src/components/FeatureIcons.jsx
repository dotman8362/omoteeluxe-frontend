// Outlined gray icons for the horizontal trust-features strip.

export function AwardBadgeIcon(props) {
  return (
    <svg viewBox="0 0 48 48" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="24" cy="18" r="11" />
      <path d="M24 12.5l1.8 3.7 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6Z" />
      <path d="M18 27.5 15 40l9-4.5 9 4.5-3-12.5" strokeLinejoin="round" />
    </svg>
  );
}

export function TruckIcon(props) {
  return (
    <svg viewBox="0 0 48 48" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="4" y="16" width="22" height="14" rx="1.5" />
      <path d="M26 20h7l6 6v4h-13Z" strokeLinejoin="round" />
      <circle cx="14" cy="34" r="3.2" />
      <circle cx="34" cy="34" r="3.2" />
      <path d="M4 22h8M4 26h5" strokeLinecap="round" />
    </svg>
  );
}

export function PercentBadgeIcon(props) {
  return (
    <svg viewBox="0 0 48 48" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        d="M24 5l4 3h5l1.5 4.7 4.5 2-1 4.9 3 4.4-3 4.4 1 4.9-4.5 2L33 35.4h-5l-4 3-4-3h-5l-1.5-4.7-4.5-2 1-4.9-3-4.4 3-4.4-1-4.9 4.5-2L20 8h5Z"
        strokeLinejoin="round"
      />
      <path d="M18.5 18.5h.02M29.5 29.5h.02M30 18l-12 12" strokeLinecap="round" />
    </svg>
  );
}

export function CheckBadgeIcon({ filled = false, ...props }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width="34"
      height="34"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.6"
      {...props}
    >
      <path
        d="M24 5l4.2 2.4h4.9l2.5 4.2 4.2 2.4v4.9l2.4 4.1-2.4 4.1v4.9l-4.2 2.4-2.5 4.2h-4.9L24 41l-4.2-2.4h-4.9l-2.5-4.2-4.2-2.4v-4.9L6 24l2.2-4.1v-4.9l4.2-2.4 2.5-4.2h4.9Z"
        strokeLinejoin="round"
      />
      <path
        d="M17 24l4.5 4.5L31 18.5"
        stroke={filled ? '#ffffff' : 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}