/*
  TEMPORARY review page for build steps 1–2 (design system, motion primitives, brand).
  It is replaced by the real Hero and sections in step 4 — delete this file and its CSS then.
*/
import { useIntro } from '../hooks/useIntro';
import { IMAGES } from '../data/images';
import TaqwaMark from '../components/brand/TaqwaMark';
import LogoLockup from '../components/brand/LogoLockup';
import GroundLine from '../components/brand/GroundLine';
import RevealText from '../components/motion/RevealText';
import RevealImage from '../components/motion/RevealImage';
import Parallax from '../components/motion/Parallax';
import Counter from '../components/motion/Counter';
import MagneticButton from '../components/motion/MagneticButton';
import SectionLabel from '../components/ui/SectionLabel';
import './FoundationPreview.css';

const SWATCHES = [
  ['--ink', '#0E0D0B'],
  ['--ink-2', '#1A1815'],
  ['--ink-3', '#2A2622'],
  ['--ivory', '#F7F3EA'],
  ['--sand', '#ECE4D3'],
  ['--stone', '#8C857A'],
  ['--gold-100', '#F3E66C'],
  ['--gold-300', '#EBCE5A'],
  ['--gold-500', '#D4A73A'],
  ['--gold-700', '#B57E23'],
  ['--gold-900', '#8A5A17'],
];

const sheen = (el) => el.querySelectorAll('.sheen').forEach((s) => s.classList.add('is-sheening'));

export default function FoundationPreview() {
  const { revealed } = useIntro();
  const img = IMAGES.homeDusk;

  return (
    <>
      <section className="fp-hero theme-ink" aria-labelledby="fp-title">
        <div className="fp-bar container">
          <LogoLockup tone="light" />
          <span className="t-label">Build review · Steps 1–2</span>
        </div>

        <TaqwaMark
          className="fp-hero__bgmark"
          color="var(--gold-500)"
          strokeWidth={5}
          animate={revealed}
          animateOn="mount"
          drawDuration={3}
        />

        <div className="container fp-hero__grid">
          <div className="fp-hero__copy">
            <SectionLabel index="00" play={revealed}>
              Real estate consultant &amp; construction
            </SectionLabel>
            <RevealText
              as="h1"
              id="fp-title"
              className="t-hero fp-hero__title"
              play={revealed}
              delay={0.2}
              onRevealed={sheen}
            >
              Property advice you can <em className="t-accent text-gold sheen">trust</em>. Homes built to{' '}
              <em className="t-accent text-gold sheen">last</em>.
            </RevealText>
            <RevealText as="p" className="t-body t-muted" play={revealed} delay={0.6} duration={1.1}>
              Taqwa Enterprises guides families and investors through buying, selling and renting in Karachi, and
              builds homes with the same care we would want for our own.
            </RevealText>
            <div className="fp-actions">
              <MagneticButton href="#fp-system">Book a Free Consultation</MagneticButton>
              <MagneticButton href="#fp-system" variant="outline">
                Explore Our Work
              </MagneticButton>
            </div>
            <ul className="fp-stats">
              <li>
                <Counter to={500} suffix="+" play={revealed} delay={1} /> <span>Properties advised</span>
              </li>
              <li>
                <Counter to={40} suffix="+" play={revealed} delay={1.1} /> <span>Homes built</span>
              </li>
              <li>
                <Counter to={100} suffix="%" play={revealed} delay={1.2} /> <span>Documented deals</span>
              </li>
            </ul>
          </div>

          <Parallax speed={0.12} className="fp-hero__media">
            <span className="fp-frame" aria-hidden="true" />
            <RevealImage {...img} className="fp-hero__img" play={revealed} delay={0.3} priority />
          </Parallax>
        </div>

        <div className="container fp-ground">
          <GroundLine play={revealed} delay={0.4} duration={1.8} />
          <div className="fp-ground__labels t-label">
            <span>Karachi</span>
            <span>Est. 2022</span>
            <span>Scroll ↓</span>
          </div>
        </div>
      </section>

      <section id="fp-system" className="section theme-ivory" aria-labelledby="fp-system-title">
        <div className="container fp-system">
          <div>
            <SectionLabel index="01">Design system</SectionLabel>
            <RevealText as="h2" id="fp-system-title" className="t-h2" onRevealed={sheen}>
              Gold on ivory, <em className="t-accent text-gold sheen">quietly</em>.
            </RevealText>
            <GroundLine className="fp-gap" />
            <ul className="fp-swatches">
              {SWATCHES.map(([name, hex]) => (
                <li key={name}>
                  <span className="fp-swatch" style={{ background: `var(${name})` }} />
                  <span className="t-label">{name}</span>
                  <span className="fp-hex">{hex}</span>
                </li>
              ))}
            </ul>
            <div className="fp-type">
              <p className="t-label">Eyebrow · Oswald · tracked caps</p>
              <p className="t-h3">H3 · Cormorant Garamond 600</p>
              <p className="t-body">
                Body · Manrope. Short sentences, warm and honest. Every file is verified, every price explained, every
                promise written down.
              </p>
              <p className="fp-urdu font-urdu" lang="ur">
                تقویٰ
              </p>
            </div>
          </div>
          <div className="fp-logos">
            <img src="/brand/taqwa-logo-light-bg.png" alt="Taqwa Enterprises logo" width="1871" height="1635" />
            <TaqwaMark className="fp-draw" animate title="Taqwa mark drawing itself" />
            <p className="t-label">Draw on scroll · useDrawSVG</p>
          </div>
        </div>
      </section>

      <section className="section theme-ink fp-dark" aria-label="Logo on dark">
        <div className="container fp-dark__inner">
          <img src="/brand/taqwa-logo-dark-bg.png" alt="Taqwa Enterprises logo" width="1871" height="1635" />
          <div>
            <SectionLabel index="02">Scrubbed draw</SectionLabel>
            <TaqwaMark className="fp-draw" animate scrub start="top 85%" end="center 45%" />
          </div>
        </div>
      </section>
    </>
  );
}
