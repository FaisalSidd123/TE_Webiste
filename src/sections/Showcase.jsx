import { useState, useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion';
import { PROJECTS } from '../data/projects';
import SectionLabel from '../components/ui/SectionLabel';
import BeforeAfter from '../components/ui/BeforeAfter';
import Icon from '../components/ui/Icon';
import './Showcase.css';

export default function Showcase() {
  const rootRef = useRef(null);
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS[0].id);

  const activeProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      gsap.fromTo(
        root.querySelector('.showcase__slider-wrap'),
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            once: true,
          },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section id="projects" ref={rootRef} className="showcase section theme-ivory" aria-labelledby="showcase-title">
      <div className="container">
        <SectionLabel label="05 / SIGNATURE MANDATES" className="showcase__label" />

        <div className="showcase__layout">
          {/* Left Column: Heading, description, clickable project rows */}
          <div className="showcase__left">
            <h2 id="showcase-title" className="showcase__title t-h2">
              Curated acquisitions. <em className="t-accent text-gold">Landmark properties.</em>
            </h2>

            <p className="showcase__desc t-body">
              Explore how our rigorous due diligence and private advisory connect discerning families and investors
              with Karachi’s most sought-after architectural addresses.
            </p>

            <div className="showcase__list" role="tablist" aria-label="Select signature property mandate">
              {PROJECTS.map((proj) => {
                const isSelected = proj.id === selectedProjectId;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`showcase__item ${isSelected ? 'is-active' : ''}`}
                    onClick={() => setSelectedProjectId(proj.id)}
                  >
                    <div className="showcase__item-header">
                      <span className="showcase__item-name t-h3">{proj.name}</span>
                      <span className="showcase__item-year t-label">{proj.year}</span>
                    </div>

                    <div className="showcase__item-meta">
                      <span>{proj.location}</span>
                      <span>·</span>
                      <span>{proj.area}</span>
                      <span>·</span>
                      <span>{proj.category}</span>
                    </div>

                    {isSelected && <p className="showcase__item-info">{proj.description}</p>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dual-Perspective comparison slider (Exterior vs Interior) */}
          <div className="showcase__right">
            <div className="showcase__slider-wrap">
              <BeforeAfter
                key={activeProject.id}
                beforeImage={activeProject.beforeImage}
                afterImage={activeProject.afterImage}
                beforeLabel={activeProject.beforeLabel}
                afterLabel={activeProject.afterLabel}
              />

              <div className="showcase__caption">
                <span className="t-label">
                  <Icon name="compass" size={14} /> Drag slider horizontally to explore exterior and interior perspectives
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
