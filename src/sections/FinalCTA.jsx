import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion';
import { CONTACT } from '../data/contact';
import { scrollToTarget } from '../lib/smoothScroll';
import TaqwaMark from '../components/brand/TaqwaMark';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import './FinalCTA.css';

export default function FinalCTA() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      const bgMark = root.querySelector('.final-cta__bg-mark');
      const lines = root.querySelectorAll('.final-cta__headline-line');
      const sub = root.querySelector('.final-cta__sub');
      const actions = root.querySelector('.final-cta__actions');

      // Headline lines rise from masks
      gsap.fromTo(
        lines,
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 70%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        [sub, actions],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 65%',
            once: true,
          },
        }
      );

      // Background mark scrub scale
      gsap.fromTo(
        bgMark,
        { scale: 0.88, opacity: 0.02 },
        {
          scale: 1,
          opacity: 0.07,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    },
    { scope: rootRef }
  );

  const navToContact = (e) => {
    e.preventDefault();
    scrollToTarget('#contact', { offset: -60 });
  };

  return (
    <section id="cta" ref={rootRef} className="final-cta theme-ink" aria-labelledby="final-cta-title">
      {/* Huge background mark */}
      <div className="final-cta__bg-mark" aria-hidden="true">
        <TaqwaMark color="var(--gold-500)" strokeWidth={2} showWindow={true} />
      </div>

      {/* Breathing soft radial gold glow behind text */}
      <div className="final-cta__glow" aria-hidden="true" />

      <div className="container final-cta__container">
        <h2 id="final-cta-title" className="final-cta__headline t-hero">
          <span className="rt-mask">
            <span className="final-cta__headline-line">Discover what you</span>
          </span>{' '}
          <span className="rt-mask">
            <span className="final-cta__headline-line">
              <em className="t-accent text-gold">deserve</em>.
            </span>
          </span>
        </h2>

        <p className="final-cta__sub t-body">
          Tell us what you are looking for. We will reply with detailed guidance within one working day.
        </p>

        <div className="final-cta__actions">
          <Button href="#contact" onClick={navToContact} variant="gold">
            Book a Free Consultation
          </Button>

          <Button
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
          >
            <Icon name="whatsapp" size={18} /> Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
