import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion';
import Counter from '../components/motion/Counter';
import './Numbers.css';

const STATS = [
  { value: 500, suffix: '+', label: 'Properties Advised' },
  { value: 350, suffix: '+', label: 'Families & Investors' },
  { value: 12, suffix: '', label: 'Years Market Expertise' },
  { value: 100, suffix: '%', label: 'Documented & Clean Deals' },
];

export default function Numbers() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      const groundLine = root.querySelector('.numbers__line');
      const ticks = root.querySelectorAll('.numbers__tick');
      const items = root.querySelectorAll('.numbers__item');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(groundLine, { scaleX: 0, transformOrigin: 'center' }, { scaleX: 1, duration: 1.4, ease: 'power3.inOut' })
        .fromTo(
          ticks,
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(2)' },
          '-=0.6'
        )
        .fromTo(
          items,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
          '-=0.6'
        );
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="numbers theme-sand" aria-label="Key Performance Numbers">
      <div className="container numbers__container">
        {/* Central continuous ground line */}
        <div className="numbers__line-wrap">
          <div className="numbers__line" aria-hidden="true" />
        </div>

        {/* 4 Stats evenly spaced */}
        <div className="numbers__grid">
          {STATS.map((stat, i) => (
            <div key={i} className="numbers__col">
              <div className="numbers__top">
                <span className="numbers__value t-hero text-gold">
                  <Counter to={stat.value} suffix={stat.suffix} duration={2} />
                </span>
              </div>

              {/* Tick mark dropping on the line */}
              <div className="numbers__tick-wrap">
                <span className="numbers__tick" aria-hidden="true" />
              </div>

              <div className="numbers__bottom">
                <p className="numbers__label t-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
