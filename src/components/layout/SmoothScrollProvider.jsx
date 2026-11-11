import { useEffect } from 'react';
import { initLenis, scrollToTarget } from '../../lib/smoothScroll';
import { ScrollTrigger } from '../../lib/gsap';
import { fontsReady } from '../../lib/motion';

/**
 * Creates the single Lenis instance and keeps ScrollTrigger in sync with it.
 * Read the instance anywhere with `useLenis()`; scroll with `scrollToTarget()`.
 */
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const destroy = initLenis();
    let alive = true;

    fontsReady().then(() => alive && ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    // Any in-page "#id" link scrolls smoothly through Lenis (unless a handler already took it).
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const link = e.target instanceof Element ? e.target.closest('a[href^="#"]') : null;
      const hash = link?.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      scrollToTarget(target, { offset: 0 });
    };
    document.addEventListener('click', onClick);

    return () => {
      alive = false;
      window.removeEventListener('load', onLoad);
      document.removeEventListener('click', onClick);
      destroy();
    };
  }, []);

  return children;
}
