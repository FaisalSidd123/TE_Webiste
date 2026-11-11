import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
import { prefersReducedMotion } from './motion';

/*
  Lenis lives in a tiny external store so any component can read it with
  `useLenis()` (useSyncExternalStore) without prop drilling or setState-in-effect.
*/
let instance = null;
const listeners = new Set();

const emit = () => listeners.forEach((l) => l());

export const lenisStore = {
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  get: () => instance,
};

export function initLenis() {
  const reduce = prefersReducedMotion();

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !reduce,
  });

  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  instance = lenis;
  emit();

  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
    if (instance === lenis) {
      instance = null;
      emit();
    }
  };
}

/** Smooth-scroll to a selector, element or number. Falls back to native scrolling. */
export function scrollToTarget(target, options = {}) {
  const opts = { offset: -80, ...options };
  if (instance) {
    instance.scrollTo(target, opts);
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + opts.offset });
}

/*
  Scroll lock with a counter, so the preloader, mobile menu and property drawer
  can each lock without unlocking one another.
*/
let lockCount = 0;

export function lockScroll() {
  lockCount += 1;
  if (lockCount === 1) {
    instance?.stop();
    document.documentElement.classList.add('is-scroll-locked');
  }
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    instance?.start();
    document.documentElement.classList.remove('is-scroll-locked');
  }
}

/** Keep a newly created Lenis consistent with any lock taken before it existed. */
lenisStore.subscribe(() => {
  if (instance && lockCount > 0) instance.stop();
});
