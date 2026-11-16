import { useState, useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion';
import { AREAS } from '../data/areas';
import { IMAGES } from '../data/images';
import SectionLabel from '../components/ui/SectionLabel';
import CurvedCanopy from '../components/layout/CurvedCanopy';
import './Areas.css';

// Coordinates on the 550x550 abstract Karachi map SVG
const MAP_COORDS = {
  dha: { x: 330, y: 450, img: IMAGES.areaDha },
  clifton: { x: 230, y: 400, img: IMAGES.areaClifton },
  pechs: { x: 280, y: 310, img: IMAGES.areaPechs },
  gulshan: { x: 350, y: 250, img: IMAGES.areaGulshan },
  'north-nazimabad': { x: 240, y: 180, img: IMAGES.areaNazimabad },
  scheme33: { x: 390, y: 150, img: IMAGES.areaScheme33 },
  bahria: { x: 450, y: 80, img: IMAGES.areaBahria },
};

export default function Areas() {
  const rootRef = useRef(null);
  const floatingImgRef = useRef(null);
  const [activeArea, setActiveArea] = useState('dha');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      const coastline = root.querySelector('.map-coastline');
      const dots = root.querySelectorAll('.map-dot');

      gsap.fromTo(
        coastline,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        dots,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(2)',
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

  const handleMouseMove = (e) => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left + 24,
      y: e.clientY - rect.top - 80,
    });
  };

  const currentImg = MAP_COORDS[activeArea]?.img || IMAGES.areaDha;

  return (
    <section
      id="areas"
      ref={rootRef}
      className="areas section theme-ivory"
      aria-labelledby="areas-title"
      onMouseMove={handleMouseMove}
    >
      <CurvedCanopy fill="var(--ivory)" type="convex" height={42} withGoldLine={true} withStar={true} />
      <div className="container">
        <SectionLabel label="08 / LOCATIONS" className="areas__label" />

        <div className="areas__layout">
          {/* Left Column: Heading and vertical list */}
          <div className="areas__left">
            <h2 id="areas-title" className="areas__title t-h2">
              Where we <em className="t-accent text-gold">work</em>.
            </h2>

            <p className="areas__desc t-body">
              Deep localized knowledge across Karachi’s most sought-after developments and growth corridors.
            </p>

            <ul className="areas__list">
              {AREAS.map((area) => {
                const isActive = area.id === activeArea;
                return (
                  <li
                    key={area.id}
                    className={`areas__item ${isActive ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveArea(area.id)}
                    onClick={() => setActiveArea(area.id)}
                  >
                    <span className="areas__name t-h3">{area.name}</span>
                    <span className="areas__count t-label">{area.listings} Listings</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column: Abstract Minimal Karachi Line Art Map */}
          <div className="areas__right">
            <div className="areas__map-card">
              <svg
                viewBox="0 0 550 550"
                className="areas__map-svg"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Arabian Sea / Coastline contour */}
                <path
                  d="M 20 480 Q 90 470 140 430 T 230 400 T 320 450 Q 420 510 520 470"
                  stroke="var(--gold-500)"
                  strokeWidth="1.5"
                  className="map-coastline"
                  strokeDasharray="1000"
                />
                {/* Secondary subtle coastal depth contour */}
                <path
                  d="M 10 510 Q 80 500 130 460 T 220 430 T 310 480 Q 410 530 530 500"
                  stroke="rgba(212, 167, 58, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* Ocean label */}
                <text x="70" y="520" fill="var(--stone)" fontSize="11" fontFamily="var(--font-label)" letterSpacing="0.25em">
                  ARABIAN SEA
                </text>

                {/* Highway line / Super Highway corridor */}
                <path
                  d="M 330 330 L 390 150 L 450 80 L 510 30"
                  stroke="rgba(212, 167, 58, 0.25)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text x="470" y="55" fill="var(--stone)" fontSize="9" fontFamily="var(--font-label)">
                  M-9 CORRIDOR →
                </text>

                {/* Map Points */}
                {AREAS.map((area) => {
                  const coord = MAP_COORDS[area.id];
                  if (!coord) return null;
                  const isActive = area.id === activeArea;

                  return (
                    <g
                      key={area.id}
                      className={`map-dot-group ${isActive ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveArea(area.id)}
                      onClick={() => setActiveArea(area.id)}
                    >
                      {/* Active pulsing ring */}
                      {isActive && (
                        <circle
                          cx={coord.x}
                          cy={coord.y}
                          r="16"
                          stroke="var(--gold-300)"
                          strokeWidth="1.5"
                          fill="rgba(212, 167, 58, 0.15)"
                          className="map-pulse-ring"
                        />
                      )}

                      {/* Main Node Dot */}
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r={isActive ? 6 : 4}
                        fill={isActive ? 'var(--gold-300)' : 'var(--gold-700)'}
                        className="map-dot"
                      />

                      {/* Node Label */}
                      <text
                        x={coord.x + 10}
                        y={coord.y + 4}
                        fill={isActive ? 'var(--gold-300)' : 'var(--stone)'}
                        fontSize={isActive ? '12' : '10'}
                        fontFamily="var(--font-label)"
                        letterSpacing="0.1em"
                        fontWeight={isActive ? '600' : '400'}
                      >
                        {area.name.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="areas__map-caption">
                <span className="t-label">KARACHI METROPOLITAN REGIONAL TOPOLOGY · MINIMAL SURVEY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating preview image following cursor (desktop only) */}
        <div
          ref={floatingImgRef}
          className="areas__floating-img"
          style={{
            transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
          }}
          aria-hidden="true"
        >
          <img src={currentImg.src} alt="Area preview" className="areas__preview-photo" />
          <span className="areas__floating-tag t-label">{AREAS.find((a) => a.id === activeArea)?.name}</span>
        </div>
      </div>
    </section>
  );
}
