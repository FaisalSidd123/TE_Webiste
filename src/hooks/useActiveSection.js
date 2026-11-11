import { useEffect, useState } from 'react';
import { ScrollTrigger } from '../lib/gsap';

/**
 * Returns the id of the section currently crossing the middle of the viewport
 * (or null, e.g. over the hero). Sections that don't exist yet are skipped.
 *
 * `refreshPriority: -1` makes these triggers measure *after* pinned sections
 * (Services, Process) add their pin spacing, so positions stay correct even
 * though the navbar mounts before the page sections.
 *
 * `key` (e.g. the route pathname) re-scans the DOM when the page changes.
 */
export function useActiveSection(ids, key) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const triggers = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .map((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          refreshPriority: -1,
          onToggle: (self) => {
            if (self.isActive) setActive(el.id);
            else setActive((cur) => (cur === el.id ? null : cur));
          },
        }),
      );

    // Positions depend on every other trigger on the page; measure once all have mounted.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      triggers.forEach((t) => t.kill());
      setActive(null);
    };
    // ids is a static module constant; key re-runs the scan on route change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
