import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion';
import { DIFFERENCE_ITEMS } from '../data/difference';
import SectionLabel from '../components/ui/SectionLabel';
import Icon from '../components/ui/Icon';
import CurvedCanopy from '../components/layout/CurvedCanopy';
import './Difference.css';

export default function Difference() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      const rows = root.querySelectorAll('.diff-row');

      rows.forEach((row) => {
        const strike = row.querySelector('.diff-strike');
        const rightText = row.querySelector('.diff-right');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            once: true,
          },
        });

        tl.fromTo(strike, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }).fromTo(
          rightText,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="difference" ref={rootRef} className="difference section theme-ivory" aria-labelledby="diff-title">
      <CurvedCanopy fill="var(--ivory)" type="convex" height={42} withGoldLine={true} withStar={true} />
      <div className="container">
        <SectionLabel label="06 / DIFFERENCE" className="diff__label" />

        <h2 id="diff-title" className="diff__title t-h2">
          The usual way vs. <em className="t-accent text-gold">the Taqwa way</em>.
        </h2>

        <div className="diff-table">
          {/* Table Headers */}
          <div className="diff-header-row">
            <span className="diff-col-header diff-col-header--left t-label">The Usual Way</span>
            <span className="diff-col-header diff-col-header--right t-label">The Taqwa Way</span>
          </div>

          {/* Rows */}
          {DIFFERENCE_ITEMS.map((item) => (
            <div key={item.id} className="diff-row">
              {/* Left Column: Usual */}
              <div className="diff-left">
                <span className="diff-text diff-text--usual">{item.usual}</span>
                <span className="diff-strike" aria-hidden="true" />
              </div>

              {/* Right Column: Taqwa */}
              <div className="diff-right">
                <div className="diff-check">
                  <Icon name="check" size={18} />
                </div>
                <span className="diff-text diff-text--taqwa">{item.taqwa}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
