import { gsap, useGSAP } from '../lib/gsap';
import { drawablesIn, prepareDraw } from '../lib/draw';
import { prefersReducedMotion } from '../lib/motion';

/**
 * Draws every stroked shape inside `ref` (stroke-dashoffset: length → 0).
 *
 * options:
 *  - selector   which elements to draw (default: all SVG geometry)
 *  - duration   seconds per element (default 1.6)
 *  - stagger    seconds between elements (default 0.12)
 *  - delay      seconds before starting
 *  - ease       GSAP ease
 *  - trigger    'scroll' (on enter, once) | 'mount' (immediately) | 'none' (prep only)
 *  - start      ScrollTrigger start (default 'top 80%')
 *  - scrub      true/number to scrub with scroll instead of playing once
 *  - enabled    set false to skip entirely
 */
export function useDrawSVG(ref, options = {}) {
  const {
    selector,
    duration = 1.6,
    stagger = 0.12,
    delay = 0,
    ease = 'power2.inOut',
    trigger = 'scroll',
    start = 'top 80%',
    end = 'bottom 40%',
    scrub = false,
    enabled = true,
  } = options;

  useGSAP(
    () => {
      if (!enabled || !ref.current || prefersReducedMotion()) return;
      const els = prepareDraw(drawablesIn(ref.current, selector));
      if (!els.length || trigger === 'none') return;

      const vars = { strokeDashoffset: 0, duration, stagger, delay, ease };

      if (trigger === 'mount') {
        gsap.to(els, vars);
        return;
      }

      gsap.to(els, {
        ...vars,
        scrollTrigger: {
          trigger: ref.current,
          start,
          ...(scrub ? { end, scrub } : { once: true }),
        },
      });
    },
    { scope: ref, dependencies: [enabled] },
  );
}
