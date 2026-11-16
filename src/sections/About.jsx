import { useRef } from 'react';
import SplitType from 'split-type';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion, fontsReady } from '../lib/motion';
import StarLattice from '../components/brand/StarLattice';
import SectionLabel from '../components/ui/SectionLabel';
import Icon from '../components/ui/Icon';
import './About.css';

export default function About() {
  const rootRef = useRef(null);

  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion()) return undefined;
      const root = rootRef.current;

      // Urdu word blur to sharp fade
      gsap.fromTo(
        root.querySelector('.about__urdu'),
        { filter: 'blur(12px)', opacity: 0 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: root.querySelector('.about__urdu'),
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Scroll-scrubbed word highlight for the 3 paragraphs
      const paragraphs = root.querySelectorAll('.about__scrub-text');
      let instances = [];
      let cancelled = false;

      fontsReady().then(
        contextSafe(() => {
          if (cancelled) return;
          paragraphs.forEach((p) => {
            const split = new SplitType(p, { types: 'words', tagName: 'span' });
            instances.push(split);

            // Words start dimmed (20% opacity) and turn full text-dark as scrolled
            gsap.fromTo(
              split.words,
              { opacity: 0.22, color: 'var(--stone)' },
              {
                opacity: 1,
                color: 'var(--text-dark)',
                stagger: 0.05,
                ease: 'none',
                scrollTrigger: {
                  trigger: p,
                  start: 'top 75%',
                  end: 'bottom 45%',
                  scrub: true,
                },
              }
            );
          });
        })
      );

      // Pillar icons draw-on animation
      const pillars = root.querySelectorAll('.about__pillar');
      gsap.fromTo(
        pillars,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.querySelector('.about__pillars'),
            start: 'top 80%',
            once: true,
          },
        }
      );

      return () => {
        cancelled = true;
        instances.forEach((inst) => inst.revert());
      };
    },
    { scope: rootRef }
  );

  return (
    <section id="about" ref={rootRef} className="about section theme-ivory" aria-labelledby="about-title">
      <StarLattice opacity={0.05} />

      <div className="container about__container">
        <div className="about__layout">
          {/* Left Column: Urdu philosophy and Fiduciary Pledge Card */}
          <div className="about__left">
            <div className="about__sticky">
              <SectionLabel label="01 / ABOUT" className="about__label" />

              <div className="about__urdu-box">
                <span className="about__urdu" lang="ur">
                  تقویٰ
                </span>
                <span className="about__translit t-label">TAQWA</span>
                <p className="about__definition t-accent">
                  Mindfulness. Integrity. Accountability in every action.
                </p>
              </div>

              {/* Fiduciary Commitment Card to balance layout and eliminate empty space */}
              <div className="about__credo card-curved">
                <div className="about__credo-header">
                  <div className="about__credo-icon">
                    <Icon name="shield" size={20} />
                  </div>
                  <span className="about__credo-tag t-label">FIDUCIARY COMMITMENT</span>
                </div>
                <h4 className="about__credo-title">Uncompromising Title Integrity</h4>
                <p className="about__credo-text">
                  We never take dual commissions on disputed files. Every plot, residence, and commercial asset under our counsel undergoes multi-authority legal vetting before you commit a single rupee.
                </p>
                <div className="about__credo-badges">
                  <span className="about__credo-badge">✦ DHA & Clifton Verified</span>
                  <span className="about__credo-badge">✦ Clear Sub-Registrar Records</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="about__right">
            <h2 id="about-title" className="about__headline t-h2">
              The principle behind <em className="t-accent text-gold">every decision</em>.
            </h2>

            <div className="about__paragraphs">
              <p className="about__scrub-text t-body">
                Taqwa is the quiet discipline of doing the right thing even when no one is checking. It is the reason we
                started this company and the standard we hold ourselves to every single day.
              </p>
              <p className="about__scrub-text t-body">
                In a market where buyers often discover hidden issues after the deal, we do the opposite: we tell you
                everything first. Every file is verified, every price explained, and every promise written down.
              </p>
              <p className="about__scrub-text t-body">
                Whether you are buying your first home, securing a high-yield commercial asset, or managing an overseas
                portfolio, you deserve an advisor who is genuinely on your side. That is what <em>Results You Deserve</em> means to us.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Pillars — Full Width Grid across the bottom */}
        <div className="about__pillars">
          <div className="about__pillar">
            <div className="about__pillar-icon">
              <Icon name="handshake" size={24} />
            </div>
            <h3 className="about__pillar-title t-label">Honest Counsel</h3>
            <p className="about__pillar-desc">
              Objective market realities, clear yield forecasts, and advice to walk away if an investment isn’t sound.
            </p>
          </div>

          <div className="about__pillar">
            <div className="about__pillar-icon">
              <Icon name="document" size={24} />
            </div>
            <h3 className="about__pillar-title t-label">Clear Documentation</h3>
            <p className="about__pillar-desc">
              Exhaustive legal vetting across all Karachi civic authorities before you commit a single rupee.
            </p>
          </div>

          <div className="about__pillar">
            <div className="about__pillar-icon">
              <Icon name="chart" size={24} />
            </div>
            <h3 className="about__pillar-title t-label">Strategic Advisory</h3>
            <p className="about__pillar-desc">
              Data-driven valuation, high-growth corridor analysis, and disciplined asset security for long-term prosperity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
