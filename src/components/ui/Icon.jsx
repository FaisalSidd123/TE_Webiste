/*
  Thin line icons in the same stroke language as the mark: square-ish joins, single weight.
  Decorative by default (aria-hidden); pass `title` when an icon stands alone.
*/
const PATHS = {
  arrowRight: <path d="M4 12h15M13 6l6 6-6 6" />,
  arrowUp: <path d="M12 20V5M6 11l6-6 6 6" />,
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
      {PATHS[name]}
    </svg>
  );
}
