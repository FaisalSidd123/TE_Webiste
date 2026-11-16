import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { EASE_EXPO, prefersReducedMotion } from '../lib/motion';
import { useIntro } from '../hooks/useIntro';
import { IMAGES } from '../data/images';
import { COMPANY, TRUST_STATS } from '../data/company';
import TaqwaMark from '../components/brand/TaqwaMark';
import GroundLine from '../components/brand/GroundLine';
import RevealImage from '../components/motion/RevealImage';
import MagneticButton from '../components/motion/MagneticButton';
import TextLink from '../components/ui/TextLink';
import './Hero.css';

/*
  Hero — "Results You Deserve"
  Entrance (after the preloader curtain opens):
    eyebrow → headline lines rise from masks → gold sheen on the italic words →
    sub copy, buttons, trust row; image opens upward from the ground line, its gold
    frame slides into its offset; the background mark draws itself over 3s.
  Scroll (desktop, scrubbed): copy drifts up and fades to 30%, image drifts slower.
*/
export default function Hero() {
  const { revealed } = useIntro();
  const root = useRef(null);

  useGSAP(
    () => {
      if (!revealed) return;
      const q = gsap.utils.selector(root);
      const reduce = prefersReducedMotion();

      if (reduce) {
        gsap.from(q('.hero__copy, .hero__ground-labels'), { autoAlpha: 0, duration: 0.3 });
        return;
      }

      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(q('.hero__eyebrow'), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' })
        .fromTo(
          q('.hero__line'),
          { yPercent: 115 },
          { yPercent: 0, duration: 1.4, stagger: 0.12, ease: EASE_EXPO },
          0.15,
        )
        .call(() => q('.hero__title .sheen').forEach((el) => el.classList.add('is-sheening')), null, 1.05)
        .fromTo(
          q('.hero__sub, .hero__actions, .hero__trust'),
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out' },
          0.75,
        )
        .fromTo(q('.hero__frame'), { x: 0, y: 0, autoAlpha: 0 }, { x: 16, y: 16, autoAlpha: 1, duration: 1.2, ease: 'power3.inOut' }, 0.75)
        .fromTo(q('.hero__ground-labels > *'), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.9);

      // Scroll-scrubbed depth, desktop only.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const scrub = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
        gsap.to(q('.hero__copy'), { yPercent: -18, opacity: 0.3, ease: 'none', scrollTrigger: scrub });
        gsap.to(q('.hero__media'), { yPercent: 10, ease: 'none', scrollTrigger: { ...scrub } });
      });
    },
    { scope: root, dependencies: [revealed] },
  );

  return (
    <section id="top" ref={root} className="hero theme-ivory" aria-labelledby="hero-title">
      <TaqwaMark
        className="hero__bgmark"
        color="rgba(195, 151, 56, 0.12)"
        tone="light"
        strokeWidth={1.5}
        animate={revealed}
        animateOn="mount"
        drawDuration={3}
        drawDelay={0.2}
      />

      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow t-label">{COMPANY.descriptor}</p>

          <h1 id="hero-title" className="t-hero hero__title">
            <span className="rt-mask">
              <span className="hero__line">Property advice</span>
            </span>{' '}
            <span className="rt-mask">
              <span className="hero__line">
                you can <em className="t-accent text-gold sheen">trust</em>.
              </span>
            </span>{' '}
            <span className="rt-mask">
              <span className="hero__line">
                Investments made to <em className="t-accent text-gold sheen">grow</em>.
              </span>
            </span>
          </h1>

          <p className="hero__sub t-body">
            Taqwa Enterprises guides families, investors, and overseas Pakistanis through buying, selling, leasing, and
            strategic property investments in Karachi. Honest counsel, clear paperwork, results you deserve.
          </p>

          <div className="hero__actions">
            <MagneticButton href="#contact">Book a Free Consultation</MagneticButton>
            <TextLink href="#properties">Explore Properties</TextLink>
          </div>

          <ul className="hero__trust">
            {TRUST_STATS.map((s) => (
              <li key={s.label}>
                <span className="hero__trust-value">{s.value}</span> {s.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__media">
          <span className="hero__frame" aria-hidden="true" />
          <RevealImage {...IMAGES.heroHome} className="hero__img" play={revealed} delay={0.45} duration={1.5} priority />
        </div>
      </div>

      <div className="container hero__ground">
        <GroundLine play={revealed} delay={0.5} duration={2} />
        <div className="hero__ground-labels t-label">
          <span>{COMPANY.city}</span>
          <span>Est. {COMPANY.founded}</span>
          <a href="#about" className="hero__scroll">
            Scroll
            <span className="hero__scroll-track" aria-hidden="true">
              <span className="hero__scroll-dot" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
