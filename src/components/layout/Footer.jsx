import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP } from '../../lib/gsap';
import { scrollToTarget } from '../../lib/smoothScroll';
import { prefersReducedMotion } from '../../lib/motion';
import { CONTACT, SOCIALS } from '../../data/contact';
import { NAV_LINKS } from '../../data/navigation';
import { SERVICES } from '../../data/services';
import StarLattice from '../brand/StarLattice';
import GroundLine from '../brand/GroundLine';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import './Footer.css';

export default function Footer() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      const letters = root.querySelectorAll('.footer-wordmark__letter');
      const wordmark = root.querySelector('.footer-wordmark__text');

      // Letters rise from behind the ground line
      gsap.fromTo(
        letters,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wordmark,
            start: 'top 90%',
            once: true,
          },
        }
      );

      // Outline fill with gold gradient scrubbed as user reaches the very bottom
      gsap.fromTo(
        wordmark,
        { '--fill-progress': '0%' },
        {
          '--fill-progress': '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 60%',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      );
    },
    { scope: rootRef }
  );

  const backToTop = (e) => {
    e.preventDefault();
    scrollToTarget(0, { offset: 0 });
  };

  const navTo = (id) => (e) => {
    e.preventDefault();
    scrollToTarget(`#${id}`, { offset: 0 });
  };

  return (
    <footer ref={rootRef} className="footer theme-ink" aria-labelledby="footer-title">
      <StarLattice opacity={0.04} />

      <div className="container footer__container">
        {/* Top CTA Row */}
        <div className="footer__top">
          <p className="footer__ready t-h3">Ready when you are.</p>
          <Button href="#contact" onClick={navTo('contact')} variant="gold">
            Book a Consultation
          </Button>
        </div>

        <GroundLine variant="solid" className="footer__divider" />

        {/* 4 Columns */}
        <div className="footer__grid">
          {/* Col 1: Brand */}
          <div className="footer__col footer__col--brand">
            <img
              src="/brand/taqwa-logo-dark-bg.png"
              alt="Taqwa Enterprises"
              className="footer__logo"
              width="180"
              height="60"
            />
            <p className="footer__desc t-body">
              Premier real estate agency and property consultancy based in Karachi. Guided by mindfulness, integrity, and
              results you deserve.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer__col">
            <h4 className="footer__heading t-label">Quick Links</h4>
            <ul className="footer__list">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} onClick={navTo(link.id)} className="footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="footer__col">
            <h4 className="footer__heading t-label">Services</h4>
            <ul className="footer__list">
              {SERVICES.slice(0, 5).map((srv) => (
                <li key={srv.id}>
                  <a href="#services" onClick={navTo('services')} className="footer__link">
                    {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="footer__col">
            <h4 className="footer__heading t-label">Contact</h4>
            <address className="footer__address">
              <p>{CONTACT.address}</p>
              <p>
                <a href={CONTACT.phoneHref} className="footer__link">
                  {CONTACT.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${CONTACT.email}`} className="footer__link">
                  {CONTACT.email}
                </a>
              </p>
              <p className="footer__hours">{CONTACT.hours}</p>
            </address>

            <div className="footer__socials" aria-label="Social media links">
              {SOCIALS.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__soc-btn"
                  aria-label={soc.name}
                >
                  <Icon name={soc.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Giant wordmark rising from ground line */}
        <div className="footer-wordmark-wrap">
          <GroundLine variant="gradient" className="footer__bottom-line" />
          <div className="footer-wordmark" aria-hidden="true">
            <div className="footer-wordmark__text">
              {'TAQWA'.split('').map((char, i) => (
                <span key={i} className="footer-wordmark__mask">
                  <span className="footer-wordmark__letter">{char}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Very bottom bar */}
        <div className="footer__bottom-bar">
          <p className="footer__copy">© 2026 Taqwa Enterprises. All rights reserved.</p>
          <div className="footer__bottom-links">
            <Link to="/privacy" className="footer__link">
              Privacy
            </Link>
            <a href="#top" onClick={backToTop} className="footer__link footer__back-top">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
