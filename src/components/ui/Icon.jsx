/*
  Thin line icons in the same stroke language as the mark: square-ish joins, single weight.
  Decorative by default (aria-hidden); pass `title` when an icon stands alone.
*/
const PATHS = {
  arrowRight: <path d="M4 12h15M13 6l6 6-6 6" />,
  arrowUp: <path d="M12 20V5M6 11l6-6 6 6" />,
  arrowDown: <path d="M12 4v15M6 13l6 6 6-6" />,
  arrowLeft: <path d="M20 12H5M11 6l-6 6 6 6" />,
  chevronRight: <path d="M9 18l6-6-6-6" />,
  chevronLeft: <path d="M15 18l-6-6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="M18 6L6 18M6 6l12 12" />,
  check: <path d="M20 6L9 17l-5-5" />,
  star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  quote: (
    <>
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2 0 4-1 6-1 8Z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2 0 4-1 6-1 8Z" />
    </>
  ),
  phone: (
    <path d="M5 3.5h3.2l1.6 4.4-2.2 1.4a11.5 11.5 0 0 0 7.1 7.1l1.4-2.2 4.4 1.6V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.1A1.5 1.5 0 0 1 5 3.5Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.8" r="2.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  // Architectural & property icons
  roof: (
    <>
      <path d="M3 13.5L12 4.5l9 9" />
      <path d="M5 13.5v7h14v-7" />
      <path d="M10 20.5v-5h4v5" />
    </>
  ),
  towers: (
    <>
      <path d="M4 21V9l5-3v15" />
      <path d="M9 21V4l7-3v20" />
      <path d="M16 21V10l4-2v13" />
    </>
  ),
  bed: (
    <>
      <path d="M3 7v13M21 7v13M3 16h18M7 11h10M7 8a2 2 0 0 0-2 2v1h14v-1a2 2 0 0 0-2-2H7Z" />
    </>
  ),
  bath: (
    <>
      <path d="M4 12h16c1.1 0 2 .9 2 2v2c0 2.2-1.8 4-4 4H6c-2.2 0-4-1.8-4-4v-2c0-1.1.9-2 2-2Z" />
      <path d="M7 12V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M6 20v2M18 20v2" />
    </>
  ),
  area: (
    <>
      <path d="M3 7V3h4M21 7V3h-4M3 17v4h4M21 17v4h-4" />
      <rect x="7" y="7" width="10" height="10" strokeDasharray="2 2" />
    </>
  ),
  shield: (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
  ),
  document: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 15 2 2 4-4" />
      <path d="m7 11 4-4 3 3-4 4" />
      <path d="M2 13l4-4 4 4-4 4z" />
      <path d="m15 5 7 7-4 4-7-7z" />
    </>
  ),
  tools: (
    <>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </>
  ),
  key: (
    <>
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="m21 3-9.5 9.5M15.5 7.5l2 2M18.5 4.5l2 2" />
    </>
  ),
  chart: (
    <>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  facebook: <path d="M14.5 3.5h-2a3.5 3.5 0 0 0-3.5 3.5v3H6.5v3.5H9v7h3.5v-7H15l.5-3.5h-3V7.5a1 1 0 0 1 1-1h2v-3Z" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8h.01" strokeWidth="2" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
      <path d="M8 10.5v6M8 7.5v.01M11.5 16.5v-6M11.5 13a2.5 2.5 0 0 1 5 0v3.5" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="m10 9 5 3-5 3V9Z" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.2-4.1A8.5 8.5 0 1 1 8.4 19L4 20Z" />
      <path d="M9 8.5c0 3.6 2.9 6.5 6.5 6.5l1-1.6-2-1-1 .9a4.5 4.5 0 0 1-2.8-2.8l.9-1-1-2L9 8.5Z" />
    </>
  ),
};

export default function Icon({ name, size = 20, strokeWidth = 1.25, title, className = '' }) {
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true, focusable: 'false' };
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
    >
      {PATHS[name] || PATHS.star}
    </svg>
  );
}
