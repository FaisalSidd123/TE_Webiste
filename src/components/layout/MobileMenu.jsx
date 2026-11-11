import { useEffect, useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { prepareDraw } from '../../lib/draw';
import { EASE_EXPO, prefersReducedMotion } from '../../lib/motion';
import { NAV_LINKS } from '../../data/navigation';
import { CONTACT, SOCIALS } from '../../data/contact';
import TaqwaMark from '../brand/TaqwaMark';
import MagneticButton from '../motion/MagneticButton';
import Icon from '../ui/Icon';
import './MobileMenu.css';

/**
 * Full-screen ink overlay (below the desktop breakpoint).
 * Opens like a blind dropping from the top; links rise in, the mark draws faintly bottom-right.
 * Scroll locking, Escape and inert page content are handled by Navbar.
 */
export default function MobileMenu({ open, active, onNavigate, returnFocusRef }) {
  const root = useRef(null);
  const tl = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const t = gsap.timeline({ paused: true });

      if (prefersReducedMotion()) {
        t.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
      } else {
        const strokes = prepareDraw(q('.mm__mark .tm-draw'));
        t.set(root.current, { autoAlpha: 1 })
          .fromTo(
            root.current,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power3.inOut' },
          )
          .fromTo(
            q('.mm__link-inner'),
            { yPercent: 110 },
            { yPercent: 0, duration: 0.9, stagger: 0.07, ease: EASE_EXPO },
            '-=0.35',
          )
          .fromTo(q('.mm__foot > *'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06 }, '-=0.6')
          .to(strokes, { strokeDashoffset: 0, duration: 1.8, stagger: 0.06, ease: 'power2.inOut' }, 0.4)
          .fromTo(q('.mm__mark .tm-window'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, '>-0.3');
      }

      gsap.set(root.current, { autoAlpha: 0 });
      tl.current = t;
    },
    { scope: root },
  );

  useEffect(() => {
    const t = tl.current;
    if (!t) return undefined;

    if (open) {
      t.timeScale(1).play();
      // Move focus into the menu once it is visible.
      const id = setTimeout(() => root.current?.querySelector('a')?.focus({ preventScroll: true }), 80);
      return () => clearTimeout(id);
    }

    t.timeScale(1.7).reverse();
    if (root.current?.contains(document.activeElement)) returnFocusRef.current?.focus({ preventScroll: true });
    return undefined;
  }, [open, returnFocusRef]);

  return (
    <div id="mobile-menu" ref={root} className="mm" inert={!open} data-lenis-prevent>
      <TaqwaMark className="mm__mark" color="var(--gold-500)" strokeWidth={6} />

      <div className="mm__body container">
        <nav aria-label="Mobile">
          <ol className="mm__links">
            {NAV_LINKS.map((link, i) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={onNavigate(link.id)}
                  className={`mm__link ${active === link.id ? 'is-active' : ''}`}
                  aria-current={active === link.id ? 'location' : undefined}
                >
                  <span className="mm__mask">
                    <span className="mm__link-inner">
                      <span className="mm__num" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {link.label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mm__foot">
          <MagneticButton href="#contact" onClick={onNavigate('contact')}>
            Book a Consultation
          </MagneticButton>

          <ul className="mm__contact">
            <li>
              <a href={CONTACT.phoneHref}>
                <Icon name="phone" size={18} />
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`}>
                <Icon name="mail" size={18} />
                {CONTACT.email}
              </a>
            </li>
          </ul>

          <ul className="mm__socials">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                  <Icon name={s.icon} size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
