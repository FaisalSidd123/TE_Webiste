import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { isFinePointer, prefersReducedMotion } from '../../lib/motion';
import './MagneticButton.css';

/**
 * Button / link that gently follows the cursor within a small radius (desktop only)
 * and fills with a wipe from the left on hover.
 *
 * variant: 'solid' (gold fill, ink text) | 'outline' (gold line, gold wipe on hover)
 * Renders <a> when `href` is set, otherwise <button>.
 */
export default function MagneticButton({
  href,
  variant = 'solid',
  strength = 0.28,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const el = ref.current;
      if (!isFinePointer() || prefersReducedMotion()) return undefined;

      const label = el.querySelector('.mbtn__label');
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
      const lxTo = gsap.quickTo(label, 'x', { duration: 0.6, ease: 'power3.out' });
      const lyTo = gsap.quickTo(label, 'y', { duration: 0.6, ease: 'power3.out' });

      const onMove = contextSafe((e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        xTo(dx * strength);
        yTo(dy * strength);
        lxTo(dx * strength * 0.35);
        lyTo(dy * strength * 0.35);
      });
      const onLeave = contextSafe(() => {
        xTo(0);
        yTo(0);
        lxTo(0);
        lyTo(0);
      });

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      return () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      };
    },
    { scope: ref, dependencies: [strength] },
  );

  const Tag = href ? 'a' : 'button';
  const typeProp = href ? {} : { type: rest.type ?? 'button' };

  return (
    <Tag ref={ref} href={href} className={`mbtn mbtn--${variant} ${className}`} data-cursor="link" {...typeProp} {...rest}>
      <span className="mbtn__fill" aria-hidden="true" />
      <span className="mbtn__label">{children}</span>
    </Tag>
  );
}
