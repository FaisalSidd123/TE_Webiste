import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { prepareDraw } from '../../lib/draw';
import { EASE_EXPO, prefersReducedMotion } from '../../lib/motion';
import { useScrollLock } from '../../hooks/useLenis';
import TaqwaMark from '../brand/TaqwaMark';
import './Preloader.css';

const SEEN_KEY = 'taqwa:intro-seen';

const hasSeenIntro = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};

const markSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* storage unavailable — intro will simply replay */
  }
};

const skipToExit = (tl) => {
  if (tl && tl.time() < tl.labels.exit) tl.seek('exit');
};

/**
 * "Drawing the mark" (~2.6s, first visit per session):
 *  1. ground line draws from the house outward (and across the screen)
 *  2. roof rises to the peak
 *  3. towers draw shortest → tallest
 *  4. window panes fade in and glow once
 *  5. TAQWA wordmark rises with a gold sheen
 *  6. the screen splits along the ground line like a curtain
 * Repeat visits and reduced motion get a 0.4s fade. Escape skips.
 *
 * onReveal: curtain starts opening (start hero entrance)
 * onDone:   preloader finished (unmount it)
 */
export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null);
  const tlRef = useRef(null);
  const [mode] = useState(() => (hasSeenIntro() || prefersReducedMotion() ? 'fade' : 'full'));

  useScrollLock(true);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const finish = () => {
        markSeen();
        onDone();
      };

      if (mode === 'fade') {
        gsap
          .timeline({ onComplete: finish })
          .call(onReveal, null, 0.05)
          .to(root.current, { autoAlpha: 0, duration: 0.4, ease: 'power2.out' }, 0.05);
        return;
      }

      const groundPieces = q('.tm-ground-l, .tm-ground-r');
      const roofs = q('.tm-roof-l, .tm-roof-r');
      const towers = q('.tm-tower'); // DOM order is shortest → tallest
      const win = q('.tm-window');
      const full = q('.tm-ground-full');
      const countEl = q('.preloader__count')[0];
      const word = q('.preloader__word')[0];

      prepareDraw([...groundPieces, ...roofs, ...towers]);
      gsap.set(q('.preloader__brand-line'), { yPercent: 110 });
      gsap.set(win, { opacity: 0 });
      gsap.set(full, { opacity: 0 });

      const tl = gsap.timeline({ onComplete: finish });
      tlRef.current = tl;

      tl.to(q('.preloader__line'), { scaleX: 1, duration: 1, ease: 'power3.inOut' }, 0)
        .to(groundPieces, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, 0.1)
        .to(roofs, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, '>-0.05')
        .to(towers, { strokeDashoffset: 0, duration: 0.34, stagger: 0.1, ease: 'power2.inOut' }, '>-0.12')
        .to(win, { opacity: 1, duration: 0.3, ease: 'power1.out' }, '>-0.05')
        .fromTo(
          win,
          { filter: 'drop-shadow(0px 0px 0px rgba(243, 230, 108, 0))' },
          {
            filter: 'drop-shadow(0px 0px 46px rgba(243, 230, 108, 0.95))',
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: 'sine.inOut',
          },
          '<',
        )
        // Swap split pieces for the joined path so the roof corners are crisp.
        .set(full, { opacity: 1 })
        .set([...groundPieces, ...roofs], { opacity: 0 })
        .fromTo(
          q('.preloader__brand-line'),
          { yPercent: 110 },
          { yPercent: 0, duration: 0.8, stagger: 0.08, ease: EASE_EXPO },
          '-=0.45',
        )
        .call(() => word?.classList.add('is-sheening'), null, '<0.15');

      // Counter runs across the whole build phase.
      const counter = { v: 0 };
      tl.to(
        counter,
        {
          v: 100,
          duration: tl.duration(),
          ease: 'power1.inOut',
          onUpdate: () => {
            countEl.textContent = String(Math.round(counter.v)).padStart(3, '0');
          },
        },
        0,
      );

      tl.addLabel('exit', '+=0.3')
        .to(q('.preloader__line, .preloader__meta'), { opacity: 0, duration: 0.3, ease: 'power1.out' }, 'exit')
        .call(onReveal, null, 'exit+=0.05')
        .to(q('.preloader__panel--top'), { yPercent: -100, duration: 1.15, ease: 'power3.inOut' }, 'exit')
        .to(q('.preloader__panel--bottom'), { yPercent: 100, duration: 1.15, ease: 'power3.inOut' }, 'exit');
    },
    { scope: root },
  );

  // Escape (or the Skip button) jumps to the curtain.
  const skip = () => skipToExit(tlRef.current);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && skipToExit(tlRef.current);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (mode === 'fade') {
    return <div ref={root} className="preloader preloader--fade" aria-hidden="true" />;
  }

  return (
    <div ref={root} className="preloader" aria-label="Loading Taqwa Enterprises">
      <div className="preloader__panel preloader__panel--top">
        <div className="preloader__mark">
          <TaqwaMark split strokeWidth={27} />
        </div>
      </div>

      <div className="preloader__panel preloader__panel--bottom">
        <div className="preloader__brand" aria-hidden="true">
          <span className="preloader__mask">
            <span className="preloader__brand-line preloader__word sheen">TAQWA</span>
          </span>
          <span className="preloader__mask">
            <span className="preloader__brand-line preloader__sub">ENTERPRISES</span>
          </span>
        </div>

        <div className="preloader__meta">
          <span className="preloader__count" aria-hidden="true">
            000
          </span>
          <button type="button" className="preloader__skip" onClick={skip}>
            Skip intro
          </button>
        </div>
      </div>

      <span className="preloader__line" aria-hidden="true" />
    </div>
  );
}
