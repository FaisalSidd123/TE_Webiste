import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { START_ENTER, prefersReducedMotion } from '../../lib/motion';

const format = (n, decimals) =>
  Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/**
 * Counts up once when it enters the viewport.
 * The visible digits are aria-hidden; screen readers get the final value.
 */
export default function Counter({
  to,
  from = 0,
  duration = 1.8,
  decimals = 0,
  prefix = '',
  suffix = '',
  delay = 0,
  play,
  start = START_ENTER,
  className,
}) {
  const ref = useRef(null);
  const final = `${prefix}${format(to, decimals)}${suffix}`;

  useGSAP(
    () => {
      const el = ref.current;
      if (prefersReducedMotion()) return;

      const state = { v: from };
      const render = () => {
        el.textContent = `${prefix}${format(state.v, decimals)}${suffix}`;
      };
      render();
      if (play === false) return;

      gsap.to(state, {
        v: to,
        duration,
        delay,
        ease: 'power3.out',
        onUpdate: render,
        scrollTrigger: play === undefined ? { trigger: el, start, once: true } : undefined,
      });
    },
    { scope: ref, dependencies: [play, to] },
  );

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
