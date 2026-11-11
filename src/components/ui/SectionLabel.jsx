import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/motion';
import './SectionLabel.css';

/**
 * Architectural drawing label: ——  03 — ABOUT
 * The 40px rule draws in, then the text fades up.
 */
export default function SectionLabel({ index, children, as: Tag = 'p', className = '', play }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const rule = ref.current.querySelector('.section-label__rule');
      const text = ref.current.querySelector('.section-label__text');
      gsap.set(rule, { scaleX: 0 });
      gsap.set(text, { autoAlpha: 0, x: -8 });
      if (play === false) return;
      gsap
        .timeline({
          scrollTrigger: play === undefined ? { trigger: ref.current, start: 'top 90%', once: true } : undefined,
        })
        .to(rule, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' })
        .to(text, { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.35');
    },
    { scope: ref, dependencies: [play] },
  );

  return (
    <Tag ref={ref} className={`section-label t-label ${className}`}>
      <span className="section-label__rule" aria-hidden="true" />
      <span className="section-label__text">
        {index && <span className="section-label__index">{index} — </span>}
        {children}
      </span>
    </Tag>
  );
}
