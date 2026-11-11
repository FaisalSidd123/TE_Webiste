import { useMediaQuery } from './useMediaQuery';

/** True when the user prefers reduced motion. Updates live if the setting changes. */
export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
