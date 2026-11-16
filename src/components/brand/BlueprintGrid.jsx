import './BlueprintGrid.css';

/**
 * Architectural blueprint grid (thin gold/light lines at 3-4% opacity)
 * used for technical, drafting aesthetic on dark sections like Process.
 */
export default function BlueprintGrid({ opacity = 0.035, size = 48, className = '', style = {} }) {
  return (
    <div
      className={`blueprint-grid ${className}`}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="small-grid" width={size / 4} height={size / 4} patternUnits="userSpaceOnUse">
            <path d={`M ${size / 4} 0 L 0 0 0 ${size / 4}`} fill="none" stroke="var(--gold-500)" strokeWidth="0.5" />
          </pattern>
          <pattern id="blueprint-pattern" width={size} height={size} patternUnits="userSpaceOnUse">
            <rect width={size} height={size} fill="url(#small-grid)" />
            <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke="var(--gold-500)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-pattern)" />
      </svg>
    </div>
  );
}
