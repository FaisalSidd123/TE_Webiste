import './CurvedCanopy.css';

/**
 * Architectural Curved Canopy Divider
 * Provides a dignified, high-end curved transition between sections.
 * 
 * Props:
 *  - fill: background color of the incoming section (e.g. 'var(--ivory)', 'var(--sand)', 'var(--ink)')
 *  - from: background color of previous section
 *  - type: 'convex' (gentle upward arch) | 'concave' (gentle downward bowl) | 'straight'
 *  - height: height of the curve in pixels (default 44)
 *  - withGoldLine: whether to render a 1px delicate gold hairline accent along the curve
 *  - withStar: whether to place the brand 4-point star at the crest
 */
export default function CurvedCanopy({
  fill = 'var(--ivory)',
  type = 'convex',
  height = 46,
  withGoldLine = true,
  withStar = false,
  className = '',
}) {
  const d =
    type === 'convex'
      ? `M0,${height} Q720,0 1440,${height} L1440,${height} L0,${height} Z`
      : `M0,0 Q720,${height} 1440,0 L1440,${height} L0,${height} Z`;

  const pathLine =
    type === 'convex'
      ? `M0,${height} Q720,0 1440,${height}`
      : `M0,0 Q720,${height} 1440,0`;

  return (
    <div
      className={`curved-canopy curved-canopy--${type} ${className}`}
      style={{ height: `${height}px`, marginTop: `-${height - 1}px` }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        className="curved-canopy__svg"
      >
        <path d={d} fill={fill} />
        {withGoldLine && (
          <path
            d={pathLine}
            fill="none"
            stroke="var(--gold-500)"
            strokeWidth="1.2"
            strokeOpacity="0.45"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
      {withStar && (
        <div className="curved-canopy__star">
          <svg viewBox="0 0 20 20" className="curved-canopy__star-icon">
            <path d="M10 0 C10.9 6.6 13.4 9.1 20 10 C13.4 10.9 10.9 13.4 10 20 C9.1 13.4 6.6 10.9 0 10 C6.6 9.1 9.1 6.6 10 0 Z" fill="var(--gold-500)" />
          </svg>
        </div>
      )}
    </div>
  );
}
