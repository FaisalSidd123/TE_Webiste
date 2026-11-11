import { useEffect } from 'react';
import { initLenis } from '../../lib/smoothScroll';
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

    return () => {
      alive = false;
      window.removeEventListener('load', onLoad);
      destroy();
    };
  }, []);

  return children;
}
