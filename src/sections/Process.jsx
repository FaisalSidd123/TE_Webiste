import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion';
import { PROCESS_STEPS } from '../data/process';
import SectionLabel from '../components/ui/SectionLabel';
import Icon from '../components/ui/Icon';
import './Process.css';

const VERIFICATION_CHECKS = [
  'DHA / KDA / MDA Title Registry Verified',
  'Non-Encumbrance & Mutation Records Cleared',
  'Comparative Market Valuation & Yield Forecast',
  'Fiduciary Escrow & Transparent Contract',
  'Official Authority Transfer & Key Handover',
];

export default function Process() {
  const rootRef = useRef(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const stepsCount = PROCESS_STEPS.length;

        gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: `+=${window.innerHeight * 2.2}`,
            pin: true,
            scrub: 0.8,
            onUpdate: (self) => {
              const idx = Math.min(stepsCount - 1, Math.floor(self.progress * stepsCount));
              setActiveStepIndex(idx);
            },
          },
        });
      });
    },
    { scope: rootRef }
  );

  const activeStep = PROCESS_STEPS[activeStepIndex] || PROCESS_STEPS[0];

  return (
    <section id="process" ref={rootRef} className="process theme-sand" aria-labelledby="process-title">
      <div className="container process__container">
        <SectionLabel index="04" label="PROCESS" className="process__label" />

        <div className="process__desktop-layout">
          {/* Left half: Real Estate Due Diligence & Mandate Dossier Card */}
          <div className="process__left">
            <div className="process__dossier-card card-curved">
              <div className="process__dossier-header">
                <div className="process__dossier-emblem">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="dossier-icon">
                    <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
                    <path d="M9 12l2 2 4-4" stroke="var(--gold-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <span className="process__dossier-badge t-label">FIDUCIARY ADVISORY MANDATE</span>
                  <h4 className="process__dossier-code">TAQWA / VERIFIED PROTOCOL</h4>
                </div>
              </div>

              <div className="process__dossier-body">
                <div className="process__active-banner">
                  <span className="process__step-tag">{activeStep.step}</span>
                  <h3 className="process__active-step-title">{activeStep.title}</h3>
                  <p className="process__active-step-desc">{activeStep.description}</p>
                </div>

                <div className="process__checklist">
                  <p className="process__checklist-title t-label">VERIFICATION CHECKLIST</p>
                  <ul className="process__checklist-items">
                    {VERIFICATION_CHECKS.map((check, idx) => {
                      const isCompleted = idx <= activeStepIndex;
                      const isCurrent = idx === activeStepIndex;
                      return (
                        <li
                          key={idx}
                          className={`process__check-item ${isCompleted ? 'is-complete' : ''} ${isCurrent ? 'is-current' : ''}`}
                        >
                          <span className="process__check-icon">
                            {isCompleted ? '✓' : '○'}
                          </span>
                          <span className="process__check-text">{check}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="process__dossier-footer">
                <div className="process__seal">
                  <span className="process__seal-dot" />
                  <span>100% Documented Title Clearance</span>
                </div>
                <span className="process__guarantee">Karachi Property Standard</span>
              </div>
            </div>
          </div>

          {/* Right half: Step Milestones */}
          <div className="process__right">
            <h2 id="process-title" className="process__title t-h2">
              From initial scope to <em className="t-accent text-gold">verified keys</em>.
            </h2>
            <p className="process__intro t-body">
              Real estate in Karachi requires absolute transparency and meticulous diligence. Our 5-stage advisory journey eliminates uncertainty at every milestone.
            </p>

            <div className="process__steps-wrapper">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                return (
                  <button
                    key={step.num}
                    type="button"
                    className={`process__step-card ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveStepIndex(idx)}
                  >
                    <div className="process__step-rail">
                      <span className="process__step-num">{step.num}</span>
                      {idx < PROCESS_STEPS.length - 1 && <span className="process__step-line" />}
                    </div>
                    <div className="process__step-content">
                      <div className="process__step-header">
                        <h3 className="process__step-heading">{step.title}</h3>
                        <span className="process__step-subtitle">{step.short}</span>
                      </div>
                      <p className="process__step-desc">{step.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
