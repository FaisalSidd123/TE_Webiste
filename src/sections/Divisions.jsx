import { useState, useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion';
import { IMAGES } from '../data/images';
import { scrollToTarget } from '../lib/smoothScroll';
import SectionLabel from '../components/ui/SectionLabel';
import Icon from '../components/ui/Icon';
import './Divisions.css';

export default function Divisions() {
  const rootRef = useRef(null);
  const [hovered, setHovered] = useState(null); // 'residential' | 'commercial' | null

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      const divider = root.querySelector('.divisions__divider-line');
      const titles = root.querySelectorAll('.division__title-line');
      const icons = root.querySelectorAll('.division__icon');
      const contents = root.querySelectorAll('.division__content');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          once: true,
        },
      });

      tl.fromTo(divider, { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: 'power3.inOut' })
        .fromTo(
          titles,
          { yPercent: 120 },
          { yPercent: 0, duration: 1.1, stagger: 0.15, ease: 'expo.out' },
          '-=0.6'
        )
        .fromTo(
          icons,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
          '-=0.8'
        )
        .fromTo(
          contents,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
          '-=0.6'
        );
    },
    { scope: rootRef }
  );

  const navTo = (id) => (e) => {
    e.preventDefault();
    scrollToTarget(`#${id}`, { offset: -60 });
  };

  return (
    <section id="divisions" ref={rootRef} className="divisions theme-ivory" aria-labelledby="divisions-heading">
      <h2 id="divisions-heading" className="sr-only">
        Our Core Practice Areas: Residential and Commercial Real Estate
      </h2>

      {/* Center vertical divider on desktop, horizontal on mobile */}
      <div
        className={`divisions__divider ${hovered === 'residential' ? 'shift-right' : ''} ${hovered === 'commercial' ? 'shift-left' : ''
          }`}
      >
        <span className="divisions__divider-line" aria-hidden="true" />
      </div>

      <div className="divisions__grid">
        {/* Left Half: Residential Advisory */}
        <div
          className={`division division--consult ${hovered === 'residential' ? 'is-expanded' : ''} ${hovered === 'commercial' ? 'is-shrunk' : ''
            }`}
          onMouseEnter={() => setHovered('residential')}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="division__bg">
            <img
              src={IMAGES.consultApartment.src}
              srcSet={IMAGES.consultApartment.srcSet}
              alt="Luxury residential property"
              className="division__bg-img"
              loading="lazy"
            />
            <div className="division__overlay" />
          </div>

          <div className="division__inner">
            <SectionLabel label="DIVISION 01 · RESIDENTIAL" className="division__label" />

            <div className="division__header">
              <div className="division__icon">
                <Icon name="roof" size={48} strokeWidth={1.2} />
              </div>
              <h3 className="division__title t-h2">
                <span className="rt-mask">
                  <span className="division__title-line">Residential.</span>
                </span>
              </h3>
            </div>

            <div className="division__content">
              <p className="division__desc t-body">
                Navigating Karachi’s premier residential enclaves with discerning taste, rigorous legal title checks, and
                bespoke buying, selling, and luxury leasing advisory.
              </p>

              <ul className="division__bullets">
                <li>
                  <Icon name="check" size={16} /> Luxury Villas & Penthouse Acquisition
                </li>
                <li>
                  <Icon name="check" size={16} /> Exhaustive Legal & Title Verification
                </li>
                <li>
                  <Icon name="check" size={16} /> High-End Family Leasing & Rentals
                </li>
                <li>
                  <Icon name="check" size={16} /> Private Sales & Discrete Representation
                </li>
              </ul>

              <a href="#properties" onClick={navTo('properties')} className="division__link t-label">
                Explore Residential <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Half: Commercial & Investment */}
        <div
          className={`division division--construct ${hovered === 'commercial' ? 'is-expanded' : ''} ${hovered === 'residential' ? 'is-shrunk' : ''
            }`}
          onMouseEnter={() => setHovered('commercial')}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="division__bg">
            <img
              src={IMAGES.srvInvest.src}
              srcSet={IMAGES.srvInvest.srcSet}
              alt="Commercial real estate skyline"
              className="division__bg-img"
              loading="lazy"
            />
            <div className="division__overlay" />
          </div>

          <div className="division__inner">
            <SectionLabel label="DIVISION 02 · COMMERCIAL" className="division__label" />

            <div className="division__header">
              <div className="division__icon">
                <Icon name="towers" size={48} strokeWidth={1.2} />
              </div>
              <h3 className="division__title t-h2">
                <span className="rt-mask">
                  <span className="division__title-line">Commercial.</span>
                </span>
              </h3>
            </div>

            <div className="division__content">
              <p className="division__desc t-body">
                Strategic corporate real estate, commercial plots, high-yield retail assets, and long-term portfolio growth
                across Karachi’s most vibrant economic corridors.
              </p>

              <ul className="division__bullets">
                <li>
                  <Icon name="check" size={16} /> Prime Commercial Plots & Boulevard Plazas
                </li>
                <li>
                  <Icon name="check" size={16} /> High-Yield Rental Portfolios & ROI Modeling
                </li>
                <li>
                  <Icon name="check" size={16} /> Corporate Office Floors & Retail Spaces
                </li>
                <li>
                  <Icon name="check" size={16} /> Strategic Land Banking & Emerging Corridors
                </li>
              </ul>

              <a href="#services" onClick={navTo('services')} className="division__link t-label">
                Explore Commercial <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
