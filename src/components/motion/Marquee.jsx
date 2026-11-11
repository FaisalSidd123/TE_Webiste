import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import { lenisStore } from '../../lib/smoothScroll';
import { prefersReducedMotion } from '../../lib/motion';
import './Marquee.css';

/**
 * Infinite marquee row. The track holds two identical halves; x wraps over one half.
 * Scroll velocity from Lenis speeds it up, and scrolling up temporarily flips the
 * direction. The effect is clamped and eased so it never jerks. Pauses on hover,
 * while off screen, and entirely under reduced motion.
 *
 * speed: px per second at rest. direction: 1 = leftward, -1 = rightward.
 */
export default function Marquee({ items, renderItem, copies = 2, speed = 40, direction = 1, className = '' }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return undefined;
      const el = root.current;
      const track = el.querySelector('.marquee__track');

      let half = track.scrollWidth / 2;
      const ro = new ResizeObserver(() => {
        half = track.scrollWidth / 2;
      });
      ro.observe(track);

      let x = 0;
      let factor = 1; // eased velocity/direction multiplier
      let hover = 1; // eased 0 → 1 pause multiplier
      let hovered = false;
      let visible = false;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          visible = self.isActive;
        },
      });

      const tick = (_time, deltaMs) => {
        if (!visible || !half) return;
        const lenis = lenisStore.get();
        const v = lenis ? lenis.velocity : 0;
        // velocity boost clamped to 4×; scrolling up turns the target negative
        const boost = Math.min(Math.abs(v) / 12, 4);
        const target = v < -0.5 ? -(1 + boost) : 1 + boost;
        factor += (target - factor) * 0.06;
        hover += ((hovered ? 0 : 1) - hover) * 0.08;

        x -= (speed * direction * factor * hover * deltaMs) / 1000;
        x = gsap.utils.wrap(-half, 0, x);
        track.style.transform = `translate3d(${x}px, 0, 0)`;
      };
      gsap.ticker.add(tick);

      const enter = () => {
        hovered = true;
      };
      const leave = () => {
        hovered = false;
      };
      // Rows inside one [data-marquee-group] pause together.
      const hoverEl = el.closest('[data-marquee-group]') ?? el;
      hoverEl.addEventListener('pointerenter', enter);
      hoverEl.addEventListener('pointerleave', leave);

      return () => {
        gsap.ticker.remove(tick);
        ro.disconnect();
        st.kill();
        hoverEl.removeEventListener('pointerenter', enter);
        hoverEl.removeEventListener('pointerleave', leave);
      };
    },
    { scope: root, dependencies: [speed, direction] },
  );

  const half = Array.from({ length: copies }, (_, c) => items.map((item, i) => renderItem(item, `${c}-${i}`)));

  return (
    <div ref={root} className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee__track">
        <div className="marquee__half">{half}</div>
        <div className="marquee__half">{half}</div>
      </div>
    </div>
  );
}
