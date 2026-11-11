import { useEffect, useSyncExternalStore } from 'react';
import { lenisStore, lockScroll, unlockScroll } from '../lib/smoothScroll';

/** The active Lenis instance (or null before init / when destroyed). */
export function useLenis() {
  return useSyncExternalStore(lenisStore.subscribe, lenisStore.get, () => null);
}

/** Stops Lenis and native scroll while `active` is true. */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    lockScroll();
    return unlockScroll;
  }, [active]);
}
