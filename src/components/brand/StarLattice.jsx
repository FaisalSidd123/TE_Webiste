import './StarLattice.css';

/**
 * Geometric eight-point star lattice pattern inspired by traditional Islamic architecture.
 * Drawn with thin gold lines at low opacity (4-6%) as a faint background texture.
 */
export default function StarLattice({ opacity = 0.05, className = '', style = {} }) {
  return (
    <div
      className={`star-lattice ${className}`}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="islamic-star-pattern"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* 8-point star geometry using intersecting squares and diagonal lines */}
            <path
              d="M40 0 L49.5 25.5 L75 16 L65.5 40 L91 49.5 L65.5 59 L75 84 L49.5 74.5 L40 100 L30.5 74.5 L5 84 L14.5 59 L-11 49.5 L14.5 40 L5 16 L30.5 25.5 Z"
              fill="none"
              stroke="var(--gold-500)"
              strokeWidth="0.8"
            />
            <rect
              x="20"
              y="20"
              width="40"
              height="40"
              fill="none"
              stroke="var(--gold-500)"
              strokeWidth="0.5"
            />
            <rect
              x="20"
              y="20"
              width="40"
              height="40"
              transform="rotate(45 40 40)"
              fill="none"
              stroke="var(--gold-500)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-star-pattern)" />
      </svg>
    </div>
  );
}
