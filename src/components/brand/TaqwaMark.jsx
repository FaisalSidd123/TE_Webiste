import { useId, useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { prepareDraw } from '../../lib/draw';
import { prefersReducedMotion } from '../../lib/motion';

/*
  Stroke-based redraw of the Taqwa mark (viewBox 0 0 1330 930, stroke 27).
  Towers are listed shortest → tallest so a DOM-order stagger "builds" the skyline.
*/
export const MARK_VIEWBOX = '0 0 1330 930';
export const MARK_RATIO = 930 / 1330;
/** y of the ground line inside the viewBox */
export const MARK_GROUND_Y = 901;

const TOWERS = [
  'M694,563 L805,627 V718',
  'M378,845 V627 L498,549',
  'M754,513 L932,621 V845',
  'M571,652 V428 L686,313 V598',
  'M498,725 V322 L619,201',
  'M619,362 V64 L746,194 V570',
];

const GROUND = 'M38,901 H357 L656,602 L955,901 H1295';
// Split pieces for sequenced drawing (preloader): ground from the house outward, roof up to the peak.
const PIECES = {
  'tm-ground-l': 'M357,901 H38',
  'tm-ground-r': 'M955,901 H1295',
  'tm-roof-l': 'M357,901 L656,602',
  'tm-roof-r': 'M955,901 L656,602',
};

/**
 * <TaqwaMark />
 *  - strokeWidth  in viewBox units (27 = original). At ~220px wide, 27 ≈ 4.5px.
 *  - color        'gradient' (brand gold) or any CSS colour / var().
 *  - animate      draws itself (ground → roof → towers, then window fades in).
 *  - animateOn    'scroll' (default, once on enter) | 'mount'
 *  - scrub        ties the draw to scroll position instead of playing once.
 *  - split        renders the ground/roof as separate pieces for custom timelines.
 *  - title        accessible name; omit for decorative use (aria-hidden).
 */
export default function TaqwaMark({
  strokeWidth = 27,
  color = 'gradient',
  animate = false,
  animateOn = 'scroll',
  drawDuration = 2.4,
  drawDelay = 0,
  start = 'top 80%',
  end = 'bottom 30%',
  scrub = false,
  split = false,
  showWindow = true,
  title,
  className = '',
  style,
}) {
  const ref = useRef(null);
  const gid = `tg${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const paint = color === 'gradient' ? `url(#${gid})` : color;

  useGSAP(
    () => {
      if (!animate || prefersReducedMotion()) return;
      const svg = ref.current;
      const strokes = prepareDraw(svg.querySelectorAll('.tm-draw'));
      const win = svg.querySelector('.tm-window');

      const tl = gsap.timeline({
        delay: drawDelay,
        scrollTrigger:
          animateOn === 'scroll'
            ? scrub
              ? { trigger: svg, start, end, scrub: scrub === true ? 1 : scrub }
              : { trigger: svg, start, once: true }
            : undefined,
      });

      tl.to(strokes, {
        strokeDashoffset: 0,
        duration: drawDuration * 0.7,
        stagger: (drawDuration * 0.25) / Math.max(1, strokes.length),
        ease: 'power2.inOut',
      });
      if (win) tl.from(win, { opacity: 0, duration: drawDuration * 0.2, ease: 'power1.out' }, '>-0.1');
    },
    { scope: ref, dependencies: [animate, scrub] },
  );

  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true, focusable: 'false' };

  return (
    <svg
      ref={ref}
      className={`taqwa-mark ${className}`}
      viewBox={MARK_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...a11y}
    >
      {color === 'gradient' && (
        <defs>
          {/* userSpaceOnUse: horizontal pieces have a zero-height bbox */}
          <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1330" y2="930">
            <stop offset="0" stopColor="#F3E66C" />
            <stop offset="0.55" stopColor="#E8C65A" />
            <stop offset="1" stopColor="#D9A441" />
          </linearGradient>
        </defs>
      )}

      <g style={{ stroke: paint }} strokeWidth={strokeWidth} strokeLinejoin="miter" strokeLinecap="butt">
        {split ? (
          <>
            {Object.entries(PIECES).map(([cls, d]) => (
              <path key={cls} className={cls} d={d} />
            ))}
            <path className="tm-ground-full" d={GROUND} />
          </>
        ) : (
          <path className="tm-ground tm-draw" d={GROUND} />
        )}
        {TOWERS.map((d) => (
          <path key={d} className="tm-tower tm-draw" d={d} />
        ))}
      </g>

      {showWindow && (
        <g className="tm-window" style={{ fill: paint }}>
          <path d="M607,818 V800 Q607,772 635,772 H652 V818 Z" />
          <path d="M658,772 H675 Q703,772 703,800 V818 H658 Z" />
          <rect x="607" y="823" width="45" height="44" />
          <rect x="658" y="823" width="45" height="44" />
        </g>
      )}
    </svg>
  );
}
