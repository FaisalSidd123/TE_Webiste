// Global motion language. Slow, architectural, never bouncy.
export const EASE_OUT = 'power3.out';
export const EASE_INOUT = 'power2.inOut';
export const EASE_EXPO = 'expo.out';

export const DUR = { sm: 0.6, md: 1.0, lg: 1.4 };
export const STAGGER = { chars: 0.06, words: 0.08, lines: 0.12, cards: 0.12 };

/** Vertical reveal distance in px (40–60). Never fly in horizontally. */
export const REVEAL_Y = 50;

/** Default ScrollTrigger start for "on enter" reveals. */
export const START_ENTER = 'top 85%';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Resolves once web fonts are loaded so text splitting measures real glyphs. */
export const fontsReady = () =>
  typeof document !== 'undefined' && document.fonts ? document.fonts.ready : Promise.resolve();
