import { useCallback, useSyncExternalStore } from 'react';

/** Live boolean for a CSS media query. */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    [query],
  );
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}

export const DESKTOP_NAV_QUERY = '(min-width: 1200px)';
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
