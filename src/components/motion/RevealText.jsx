import { useRef } from 'react';
import SplitType from 'split-type';
import { gsap, useGSAP } from '../../lib/gsap';
import { DUR, EASE_EXPO, START_ENTER, STAGGER, fontsReady, prefersReducedMotion } from '../../lib/motion';

const TYPES = { lines: 'lines,words', words: 'lines,words', chars: 'lines,words,chars' };

/**
 * Text that rises from behind a mask line, as if emerging from the ground.
 *
 *  <RevealText as="h2" split="lines" className="t-h2">Advice you can <em>trust</em></RevealText>
 *
 * - `play` undefined → plays when scrolled into view.
 * - `play` false/true → waits, then plays when it becomes true (e.g. after the preloader).
 * - `onRevealed(el)` fires after the rise completes (text is un-split by then).
 */
export default function RevealText({
  as: Tag = 'div',
  split = 'lines',
  children,
  className,
  delay = 0,
  duration = DUR.lg,
  stagger,
  start = START_ENTER,
  play,
  onRevealed,
  ...rest
}) {
  const ref = useRef(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const el = ref.current;
      if (!el) return undefined;

      gsap.set(el, { autoAlpha: 0 });
      if (play === false) return undefined;

      const scrollTrigger = play === undefined ? { trigger: el, start, once: true } : undefined;

      if (prefersReducedMotion()) {
        gsap.to(el, { autoAlpha: 1, duration: 0.3, delay, scrollTrigger, onComplete: () => onRevealed?.(el) });
        return undefined;
      }

      let instance = null;
      let cancelled = false;

      fontsReady().then(
        contextSafe(() => {
          if (cancelled) return;
          instance = new SplitType(el, { types: TYPES[split] ?? TYPES.lines, tagName: 'span' });
          const units = instance[split] ?? instance.lines;

          units.forEach((unit) => {
            const mask = document.createElement('span');
            mask.className = split === 'lines' ? 'rt-mask' : 'rt-mask rt-mask--inline';
            unit.parentNode.insertBefore(mask, unit);
            mask.appendChild(unit);
          });

          gsap.set(el, { autoAlpha: 1 });
          gsap.fromTo(
            units,
            { yPercent: 115 },
            {
              yPercent: 0,
              duration,
              delay,
              ease: EASE_EXPO,
              stagger: stagger ?? STAGGER[split] ?? STAGGER.lines,
              scrollTrigger,
              onComplete: () => {
                // Hand the text back to normal flow so it reflows on resize.
                instance?.revert();
                instance = null;
                onRevealed?.(el);
              },
            },
          );
        }),
      );

      return () => {
        cancelled = true;
        instance?.revert();
      };
    },
    { scope: ref, dependencies: [play] },
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
