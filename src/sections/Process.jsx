import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion';
import { PROCESS_STEPS } from '../data/process';
import BlueprintGrid from '../components/brand/BlueprintGrid';
import SectionLabel from '../components/ui/SectionLabel';
import './Process.css';

export default function Process() {
  const rootRef = useRef(null);
  const buildingSvgRef = useRef(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      const svg = buildingSvgRef.current;
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Elements in the building SVG
        const ground = svg.querySelector('.b-ground');
        const foundation = svg.querySelector('.b-foundation');
        const floors12 = svg.querySelectorAll('.b-floor-1, .b-floor-2');
        const floors35 = svg.querySelectorAll('.b-floor-3, .b-floor-4, .b-floor-5');
        const roof = svg.querySelector('.b-roof');
        const windows = svg.querySelectorAll('.b-window');
        const skyGlow = svg.querySelector('.b-sky-glow');

        // Master pinned scrub timeline
        const stepsCount = PROCESS_STEPS.length;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: `+=${window.innerHeight * 3.5}`,
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              const idx = Math.min(stepsCount - 1, Math.floor(self.progress * stepsCount));
              setActiveStepIndex(idx);
            },
          },
        });

        // Step 1: Ground line
        tl.fromTo(ground, { scaleX: 0, transformOrigin: 'center' }, { scaleX: 1, duration: 1 })
          // Step 2: Foundation & Base Structure
          .fromTo(foundation, { opacity: 0, scaleY: 0, transformOrigin: 'bottom' }, { opacity: 1, scaleY: 1, duration: 1 })
          // Step 3: Lower Levels
          .fromTo(floors12, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.3, duration: 1 })
          // Step 4: Upper Floors & Skyline Rise
          .fromTo(floors35, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.3, duration: 1 })
          // Step 5: Roof crown, windows glowing, sky gradient
          .fromTo(roof, { opacity: 0, scaleY: 0, transformOrigin: 'bottom' }, { opacity: 1, scaleY: 1, duration: 1 })
          .fromTo(
            windows,
            { opacity: 0.2, fill: 'transparent' },
            { opacity: 1, fill: 'var(--gold-300)', filter: 'drop-shadow(0 0 6px rgba(243, 230, 108, 0.8))', stagger: 0.05, duration: 0.8 },
            '-=0.5'
          )
          .fromTo(skyGlow, { opacity: 0 }, { opacity: 0.35, duration: 1 }, '-=0.8');
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="process" ref={rootRef} className="process theme-sand" aria-labelledby="process-title">
      <BlueprintGrid opacity={0.035} />

      <div className="container process__container">
        <SectionLabel label="03 / PROCESS" className="process__label" />

        <div className="process__desktop-layout">
          {/* Left half: Rising Building SVG */}
          <div className="process__left">
            <div className="process__building-card">
              <svg
                ref={buildingSvgRef}
                viewBox="0 0 500 650"
                className="process__building-svg"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="sky-glow" cx="50%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="var(--gold-500)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--ink)" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Sky Glow */}
                <rect x="0" y="0" width="500" height="650" fill="url(#sky-glow)" className="b-sky-glow" />

                {/* Ground line */}
                <line x1="20" y1="560" x2="480" y2="560" stroke="var(--gold-500)" strokeWidth="2" className="b-ground" />

                {/* Foundation (Step 2) */}
                <g className="b-foundation" stroke="var(--gold-700)" strokeWidth="1.5">
                  <rect x="120" y="540" width="260" height="20" stroke="var(--gold-500)" strokeWidth="1.5" />
                  <line x1="160" y1="540" x2="160" y2="560" />
                  <line x1="210" y1="540" x2="210" y2="560" />
                  <line x1="260" y1="540" x2="260" y2="560" />
                  <line x1="310" y1="540" x2="310" y2="560" />
                  <line x1="350" y1="540" x2="350" y2="560" />
                </g>

                {/* Floor 1 (Step 3) */}
                <g className="b-floor-1" stroke="var(--gold-500)" strokeWidth="1.5">
                  <rect x="130" y="460" width="240" height="80" />
                  <rect x="155" y="480" width="35" height="40" className="b-window" />
                  <rect x="210" y="480" width="35" height="40" className="b-window" />
                  <rect x="265" y="480" width="35" height="40" className="b-window" />
                  <rect x="320" y="480" width="35" height="40" className="b-window" />
                </g>

                {/* Floor 2 (Step 3) */}
                <g className="b-floor-2" stroke="var(--gold-500)" strokeWidth="1.5">
                  <rect x="130" y="380" width="240" height="80" />
                  <rect x="155" y="400" width="35" height="40" className="b-window" />
                  <rect x="210" y="400" width="35" height="40" className="b-window" />
                  <rect x="265" y="400" width="35" height="40" className="b-window" />
                  <rect x="320" y="400" width="35" height="40" className="b-window" />
                </g>

                {/* Floor 3 (Step 4) */}
                <g className="b-floor-3" stroke="var(--gold-500)" strokeWidth="1.5">
                  <rect x="145" y="300" width="210" height="80" />
                  <rect x="170" y="320" width="35" height="40" className="b-window" />
                  <rect x="235" y="320" width="35" height="40" className="b-window" />
                  <rect x="295" y="320" width="35" height="40" className="b-window" />
                </g>

                {/* Floor 4 (Step 4) */}
                <g className="b-floor-4" stroke="var(--gold-500)" strokeWidth="1.5">
                  <rect x="145" y="220" width="210" height="80" />
                  <rect x="170" y="240" width="35" height="40" className="b-window" />
                  <rect x="235" y="240" width="35" height="40" className="b-window" />
                  <rect x="295" y="240" width="35" height="40" className="b-window" />
                </g>

                {/* Floor 5 (Step 4) */}
                <g className="b-floor-5" stroke="var(--gold-500)" strokeWidth="1.5">
                  <rect x="165" y="150" width="170" height="70" />
                  <rect x="190" y="165" width="35" height="40" className="b-window" />
                  <rect x="275" y="165" width="35" height="40" className="b-window" />
                </g>

                {/* Roof Crown (Step 5, shaped like the tallest tower in logo) */}
                <g className="b-roof" stroke="var(--gold-500)" strokeWidth="2">
                  <path d="M165 150 L250 60 L335 150 Z" />
                  {/* Four-pane arched window under the peak (echo of logo mark) */}
                  <g className="b-window" fill="transparent">
                    <path d="M240 100 Q250 88 260 100 V125 H240 Z" />
                    <line x1="250" y1="90" x2="250" y2="125" stroke="var(--gold-500)" strokeWidth="1" />
                    <line x1="240" y1="110" x2="260" y2="110" stroke="var(--gold-500)" strokeWidth="1" />
                  </g>
                </g>
              </svg>

              <div className="process__building-footer">
                <span className="t-label">PROPERTY REALIZATION ARCHITECTURE · STAGE {PROCESS_STEPS[activeStepIndex].num}</span>
              </div>
            </div>
          </div>

          {/* Right half: Step Details & Vertical Progress Rail */}
          <div className="process__right">
            <div className="process__steps-wrapper">
              <h2 id="process-title" className="process__heading t-h2">
                From Ground Line to <em className="t-accent text-gold">Skyline</em>.
              </h2>

              <div className="process__active-step">
                <div className="process__step-indicator t-label">
                  {PROCESS_STEPS[activeStepIndex].step} · {PROCESS_STEPS[activeStepIndex].short}
                </div>
                <h3 className="process__step-title t-h3">{PROCESS_STEPS[activeStepIndex].title}</h3>
                <p className="process__step-desc t-body">{PROCESS_STEPS[activeStepIndex].description}</p>
              </div>

              {/* Progress Rail */}
              <div className="process__rail">
                {PROCESS_STEPS.map((s, idx) => {
                  const isActive = idx === activeStepIndex;
                  return (
                    <div key={s.num} className={`process__rail-item ${isActive ? 'is-active' : ''}`}>
                      <span className="process__rail-num">{s.num}</span>
                      <span className="process__rail-title">{s.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="process__mobile-timeline">
          <h2 className="process__heading t-h2">
            From Ground Line to <em className="t-accent text-gold">Skyline</em>.
          </h2>

          <div className="process__mobile-steps">
            {PROCESS_STEPS.map((s) => (
              <div key={s.num} className="process__mob-step">
                <div className="process__mob-dot" />
                <div className="process__mob-body">
                  <span className="process__mob-num t-label">{s.step}</span>
                  <h3 className="process__mob-title t-h3">{s.title}</h3>
                  <p className="process__mob-desc t-body">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
