import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/motion';
import './GroundLine.css';

/**
 * The site's signature motif: a 1px gold line that draws itself (scaleX 0 → 1)
 * when it enters the viewport. Everything else "rises" from it.
 *
 * origin: 'left' | 'center' | 'right'
 * variant: 'solid' | 'gradient' | 'fade' (fades out at both ends)
 * play: undefined → scroll; boolean → waits for true.
 */
export default function GroundLine({
  origin = 'left',
  variant = 'solid',
  duration = 1.6,
  delay = 0,
  start = 'top 92%',
  play,
  className = '',
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.set(ref.current, { scaleX: 0, transformOrigin: `${origin} center` });
      if (play === false) return;
      gsap.to(ref.current, {
        scaleX: 1,
        duration,
        delay,
        ease: 'power3.inOut',
        scrollTrigger: play === undefined ? { trigger: ref.current, start, once: true } : undefined,
      });
    },
    { scope: ref, dependencies: [play] },
  );

  return <span ref={ref} className={`ground-line ground-line--${variant} ${className}`} aria-hidden="true" />;
}
