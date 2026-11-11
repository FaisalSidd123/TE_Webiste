import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { DUR, START_ENTER, prefersReducedMotion } from '../../lib/motion';
import './RevealImage.css';

/**
 * Image that opens upward from a horizontal line, like a building going up:
 * clip-path inset(100% 0 0 0) → inset(0) while the photo settles from scale 1.25 → 1.
 *
 * - `play` undefined → on scroll enter; boolean → waits for true.
 * - `arched` gives the frame the arched top of the logo's window.
 */
export default function RevealImage({
  src,
  srcSet,
  sizes,
  alt,
  width,
  height,
  className = '',
  arched = false,
  priority = false,
  play,
  delay = 0,
  duration = DUR.lg,
  start = START_ENTER,
  children,
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const frame = ref.current;
      const img = frame.querySelector('img');

      if (prefersReducedMotion()) {
        gsap.set(frame, { autoAlpha: play === false ? 0 : 1 });
        if (play !== false) gsap.from(frame, { autoAlpha: 0, duration: 0.3, delay });
        return;
      }

      gsap.set(frame, { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(img, { scale: 1.25 });
      if (play === false) return;

      const tl = gsap.timeline({
        delay,
        scrollTrigger: play === undefined ? { trigger: frame, start, once: true } : undefined,
      });
      tl.to(frame, { clipPath: 'inset(0% 0% 0% 0%)', duration, ease: 'power3.inOut' }).to(
        img,
        { scale: 1, duration: duration + 0.4, ease: 'power3.out' },
        0,
      );
    },
    { scope: ref, dependencies: [play] },
  );

  return (
    <div ref={ref} className={`reveal-img ${arched ? 'reveal-img--arched' : ''} ${className}`}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
      />
      {children}
    </div>
  );
}
