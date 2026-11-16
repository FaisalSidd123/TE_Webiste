import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion';
import { SERVICES } from '../data/services';
import SectionLabel from '../components/ui/SectionLabel';
import Icon from '../components/ui/Icon';
import CurvedCanopy from '../components/layout/CurvedCanopy';
import './Services.css';

export default function Services() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);
  const [activeAccordion, setActiveAccordion] = useState(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      const track = trackRef.current;
      const progressBar = progressBarRef.current;

      const mm = gsap.matchMedia();

      // Desktop pinned horizontal scroll
      mm.add('(min-width: 1024px)', () => {
        const totalScroll = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBar) {
                progressBar.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        // Subtly animate service cards when scrolled
        const cards = root.querySelectorAll('.srv-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card.querySelector('.srv-card__img-wrap'),
            { clipPath: 'inset(100% 0 0 0)' },
            {
              clipPath: 'inset(0% 0 0 0)',
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: gsap.getTweensOf(track)[0],
                start: 'left 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      });
    },
    { scope: rootRef }
  );

  const toggleAccordion = (id) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" ref={rootRef} className="services theme-sand" aria-labelledby="services-title">
      <CurvedCanopy fill="var(--sand)" type="convex" height={42} withGoldLine={true} withStar={true} />
      <div className="services__pinned-wrap">
        {/* Horizontal track for desktop */}
        <div ref={trackRef} className="services__track">
          {/* Panel 0: Intro panel (40vw) */}
          <div className="services__panel services__panel--intro">
            <div className="services__intro-content">
              <SectionLabel label="02 / SERVICES" className="services__label" />
              <h2 id="services-title" className="services__headline t-h2">
                Everything your property journey <em className="t-accent text-gold">needs</em>.
              </h2>
              <p className="services__sub t-body">
                Comprehensive property advisory, legal diligence, and asset management under one trusted roof.
              </p>

              {/* Progress indicator */}
              <div className="services__progress-wrap">
                <span className="t-label">Scroll to explore</span>
                <div className="services__progress-track">
                  <div ref={progressBarRef} className="services__progress-bar" />
                </div>
              </div>
            </div>
          </div>

          {/* 8 Service Panels */}
          {SERVICES.map((srv) => (
            <div key={srv.id} className="services__panel srv-card">
              <div className="srv-card__inner">
                <div className="srv-card__top">
                  <span className="srv-card__num">{srv.num}</span>
                  <div className="srv-card__icon">
                    <Icon name={srv.icon} size={28} />
                  </div>
                </div>

                <div className="srv-card__content">
                  <h3 className="srv-card__title t-h3">{srv.title}</h3>
                  <p className="srv-card__desc t-body">{srv.description}</p>
                </div>

                <div className="srv-card__img-wrap">
                  <img
                    src={srv.image.src}
                    srcSet={srv.image.srcSet}
                    alt={srv.title}
                    className="srv-card__img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Accordion view (hidden on desktop) */}
      <div className="services__mobile container">
        <SectionLabel label="02 / SERVICES" className="services__label" />
        <h2 className="services__headline t-h2">
          Everything your property journey <em className="t-accent text-gold">needs</em>.
        </h2>
        <p className="services__sub t-body">
          Comprehensive property advisory, legal diligence, and asset management under one trusted roof.
        </p>

        <div className="services__mobile-list">
          {SERVICES.map((srv) => {
            const isOpen = activeAccordion === srv.id;
            return (
              <div key={srv.id} className={`srv-mob-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="srv-mob-trigger"
                  onClick={() => toggleAccordion(srv.id)}
                  aria-expanded={isOpen}
                >
                  <div className="srv-mob-trigger__left">
                    <span className="srv-mob-num">{srv.num}</span>
                    <span className="srv-mob-title t-h3">{srv.title}</span>
                  </div>
                  <div className="srv-mob-icon">
                    <Icon name={isOpen ? 'minus' : 'plus'} size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="srv-mob-body">
                    <p className="srv-mob-desc t-body">{srv.description}</p>
                    <div className="srv-mob-img-wrap">
                      <img src={srv.image.src} alt={srv.title} className="srv-mob-img" loading="lazy" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
