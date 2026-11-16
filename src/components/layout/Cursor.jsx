import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { FINE_POINTER_QUERY, useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Cursor.css';

const LINK_SELECTOR = 'a, button, [role="button"], label, summary, select, [data-cursor="link"]';
const TEXT_SELECTOR = 'input, textarea, [contenteditable="true"]';

/**
 * Gold dot + lagging ring. Desktop mouse only:
 * not mounted at all on touch / coarse pointers or with reduced motion,
 * and the native cursor is only hidden while this component is mounted.
 *
 * States (from what is under the pointer):
 *  [data-cursor="view"] → ring grows to 90px and reads VIEW
 *  links / buttons      → ring shrinks
 *  text inputs          → custom cursor fades, native caret shows
 */
export default function Cursor() {
  const finePointer = useMediaQuery(FINE_POINTER_QUERY);
  const reduce = useReducedMotion();
  if (!finePointer || reduce) return null;
  return <CursorFollower />;
}

function CursorFollower() {
  const root = useRef(null);

  useGSAP(
    () => {
      const el = root.current;
      const dot = el.querySelector('.cursor__dot');
      const ring = el.querySelector('.cursor__ring');
      const html = document.documentElement;

      gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
      const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
      const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
      const ringX = gsap.quickTo(ring, 'x', { duration: 0.18, ease: 'power2.out' });
      const ringY = gsap.quickTo(ring, 'y', { duration: 0.18, ease: 'power2.out' });

      let state = '';
      const setState = (next) => {
        if (next === state) return;
        state = next;
        el.dataset.state = next;
      };

      const show = (visible) => el.classList.toggle('is-hidden', !visible);

      const onMove = (e) => {
        // A touch or pen on a hybrid device: get out of the way and restore the native cursor.
        if (e.pointerType !== 'mouse') {
          show(false);
          html.classList.remove('has-custom-cursor');
          return;
        }
        html.classList.add('has-custom-cursor');
        show(true);
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);

        const t = e.target instanceof Element ? e.target : null;
        if (t?.closest('[data-cursor="view"]')) setState('view');
        else if (t?.closest(TEXT_SELECTOR)) setState('text');
        else if (t?.closest(LINK_SELECTOR)) setState('link');
        else setState('');
      };

      const onLeave = () => show(false);
      const onDown = () => el.classList.add('is-pressed');
      const onUp = () => el.classList.remove('is-pressed');

      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onDown, { passive: true });
      window.addEventListener('pointerup', onUp, { passive: true });
      html.addEventListener('pointerleave', onLeave);

      return () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        html.removeEventListener('pointerleave', onLeave);
        html.classList.remove('has-custom-cursor');
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="cursor is-hidden" aria-hidden="true">
      <span className="cursor__ring">
        <span className="cursor__label">View</span>
      </span>
      <span className="cursor__dot" />
    </div>
  );
}
