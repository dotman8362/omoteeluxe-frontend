// Small, dependency-free inline SVG icons used across the site.
// Kept in one file so components/Navbar.jsx and components/ChatWidget.jsx
// stay focused on layout rather than icon markup.

export function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      {...props}
    >
      <path d="M16.5 3c.4 2.1 1.8 3.6 4 3.9v2.6c-1.5.1-2.9-.3-4-1.1v6.4c0 3.2-2.6 5.7-5.8 5.5-2.9-.2-5.2-2.6-5.2-5.5 0-3 2.4-5.5 5.5-5.5.3 0 .6 0 .9.1v2.7a3 3 0 1 0 2.1 2.9V3h2.5z" />
    </svg>
  );
}

export function UserIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...props}
    >
      <circle cx="12" cy="8" r="3.5" />
      <path
        d="M4.5 20c1.4-3.6 4.3-5.5 7.5-5.5s6.1 1.9 7.5 5.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SearchIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...props}
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

export function BagIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...props}
    >
      <path d="M6 8h12l-1 12.5a1.5 1.5 0 0 1-1.5 1.5H8.5A1.5 1.5 0 0 1 7 20.5L6 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowIcon({ direction = "right", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path
        d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChatBubbleIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="currentColor"
      {...props}
    >
      <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-5 4V5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}
export function WhatsAppIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      {...props}
    >
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm0 1.8a7.2 7.2 0 1 1-3.9 13.2l-.3-.2-2.7.7.7-2.6-.2-.3A7.2 7.2 0 0 1 12 4.8Zm-3.4 3.6c-.2 0-.5.1-.7.4-.2.2-.8.8-.8 2s.9 2.3 1 2.5c.1.1 1.7 2.7 4.2 3.7 2.1.9 2.5.7 3 .6.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.6-.3l-1.7-.8c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-.7-.3-1.6-.8-2.3-1.6-.6-.7-1-1.4-1.2-1.7-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.4.1-.5l-.8-1.9c-.1-.3-.3-.3-.5-.3Z" />
    </svg>
  );
}

export function PinterestIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      {...props}
    >
      <path d="M12 3a9 9 0 0 0-3.3 17.4c0-.7 0-1.6.2-2.4l1.3-5.5s-.3-.7-.3-1.6c0-1.5.9-2.6 1.9-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.5 2 1.6 2 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8-3.1 0-5 2.3-5 4.8 0 .9.3 1.5.7 2 .2.2.2.3.1.6l-.2.9c-.1.3-.3.4-.6.3-1.4-.6-2.1-2.1-2.1-3.9 0-2.9 2.4-6.3 7.1-6.3 3.8 0 6.3 2.7 6.3 5.7 0 3.9-2.1 6.7-5.2 6.7-1 0-2-.6-2.4-1.2l-.7 2.6c-.2.9-.7 1.9-1.1 2.6A9 9 0 1 0 12 3Z" />
    </svg>
  );
}

export function ArrowUpRightIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path
        d="M7 17L17 7M8 7h9v9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path
        d="M12 20s-6.5-4.2-8.2-8.1C2.8 8.6 4.2 5.7 7.2 5.1c1.5-.3 3 .2 4.1 1.4 1.1-1.2 2.6-1.7 4.1-1.4 3 .6 4.4 3.5 3.4 6.8C18.5 15.8 12 20 12 20Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CompareIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M6 4v16" strokeLinecap="round" />
      <path d="M12 8v12" strokeLinecap="round" />
      <path d="M18 1v19" strokeLinecap="round" />
    </svg>
  );
}

export function ExpandIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M4 9V4h5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 15v5h-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m4 4 6 6" strokeLinecap="round" />
      <path d="m20 20-6-6" strokeLinecap="round" />
    </svg>
  );
}

export function StarIcon({ filled = false, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path
        d="m12 3 2.7 5.4 6 .9-4.4 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6L3.3 9.3l6-.9L12 3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MinusIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M12 5v14" strokeLinecap="round" />
      <path d="M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export function FacebookIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}
    >
      <path d="M13.2 21v-8.3h2.8l.4-3.2h-3.2V3.8c0-.9.3-1.6 1.6-1.6h1.7V.1C15.8.1 14.7 0 13.4 0c-2.4 0-4.1 1.5-4.1 4.2v2.3H6.6v3.2h2.7V21h3.9Z" />
    </svg>
  );
}

export function XIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}
    >
      <path d="M18.9 2H22l-6.8 7.7L23.3 22h-5.9l-4.6-6-5.3 6H2l7.1-8.1L.7 2h6.1l4.2 5.5L18.9 2Z" />
    </svg>
  );
}

export function LinkedInIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}
    >
      <path d="M6.9 8.2A1.7 1.7 0 1 0 6.9 4.8a1.7 1.7 0 0 0 0 3.4ZM5.5 9.8h2.8V20H5.5V9.8Zm4.7 0h2.7v1.4h.1c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.4V20h-2.8v-9.3c0-2.2-.1-5.1-3.1-5.1-3.1 0-3.5 2.4-3.5 4.9V20H10.2V9.8Z" />
    </svg>
  );
}
