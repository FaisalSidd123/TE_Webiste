import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/motion';

/**
 * Moves its child on Y relative to scroll (scrubbed).
 * `speed` is a fraction of viewport height travelled across the element's pass:
 * positive drifts up (feels further away), negative drifts down.
 */
export default function Parallax({ speed = 0.15, as: Tag = 'div', className, children, ...rest }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !speed) return;
      const dist = () => window.innerHeight * speed * 0.5;
      gsap.fromTo(
        ref.current,
        { y: () => dist() },
        {
          y: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [speed] },
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
