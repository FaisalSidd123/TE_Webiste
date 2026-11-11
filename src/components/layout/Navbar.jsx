import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import { scrollToTarget } from '../../lib/smoothScroll';
import { prefersReducedMotion } from '../../lib/motion';
import { useIntro } from '../../hooks/useIntro';
import { useScrollLock } from '../../hooks/useLenis';
import { useActiveSection } from '../../hooks/useActiveSection';
import { DESKTOP_NAV_QUERY, useMediaQuery } from '../../hooks/useMediaQuery';
import { NAV_LINKS } from '../../data/navigation';
import { CONTACT } from '../../data/contact';
import LogoLockup from '../brand/LogoLockup';
import MagneticButton from '../motion/MagneticButton';
import MobileMenu from './MobileMenu';
import './Navbar.css';

const NAV_IDS = NAV_LINKS.map((l) => l.id);
const SOLID_AFTER = 80; // px of scroll before the bar gets its ink background
const HIDE_AFTER = 240; // never hide while still near the top

export default function Navbar() {
  const { revealed } = useIntro();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(DESKTOP_NAV_QUERY);
  const active = useActiveSection(NAV_IDS, pathname);

  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

  const innerRef = useRef(null);
  const toggleRef = useRef(null);
  const pendingTarget = useRef(null);

  // The menu only exists below the desktop breakpoint; resizing up closes it.
  const open = menuOpen && !isDesktop;

  // Lenis + native scroll stop while the menu is open.
  useScrollLock(open);

  // After the menu closes (and the scroll lock above is released), go to the chosen section.
  useEffect(() => {
    if (open || pendingTarget.current === null) return;
    scrollToTarget(pendingTarget.current, { offset: 0 });
    pendingTarget.current = null;
  }, [open]);

  // Escape closes; page content is inert while the menu is open (keeps focus inside header + menu).
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    const content = document.querySelectorAll('main, footer');
    content.forEach((el) => {
      el.inert = true;
    });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      content.forEach((el) => {
        el.inert = false;
      });
    };
  }, [open]);

  // Solid background after 80px; hide on scroll down, show on scroll up.
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        setSolid(y > SOLID_AFTER);
        setHidden(self.direction === 1 && y > HIDE_AFTER);
      },
    });
    return () => st.kill();
  }, []);

  // Entrance once the preloader curtain opens.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.set(innerRef.current, { autoAlpha: 0, yPercent: -40 });
      if (!revealed) return;
      gsap.to(innerRef.current, { autoAlpha: 1, yPercent: 0, duration: 1.1, delay: 0.7, ease: 'power3.out' });
    },
    { dependencies: [revealed] },
  );

  const goTo = (id) => (e) => {
    e.preventDefault();
    const target = id ? `#${id}` : 0;
    // Section not on this page (e.g. /privacy): go home and let the page scroll to the hash.
    if ((id && !document.getElementById(id)) || (!id && pathname !== '/')) {
      navigate(id ? `/#${id}` : '/');
      setMenuOpen(false);
      return;
    }
    if (open) {
      pendingTarget.current = target;
      setMenuOpen(false);
    } else {
      scrollToTarget(target, { offset: 0 });
    }
  };

  const classes = ['nav', solid && 'is-solid', hidden && !open && 'is-hidden', open && 'is-open']
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={classes}>
        <div ref={innerRef} className="nav__inner container">
          <LogoLockup tone="dark" href="/" onClick={goTo(null)} className="nav__logo" />

          {isDesktop && (
            <nav className="nav__links" aria-label="Primary">
              <ul>
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={goTo(link.id)}
                      className={`nav__link ${active === link.id ? 'is-active' : ''}`}
                      aria-current={active === link.id ? 'location' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="nav__end">
            {isDesktop ? (
              <>
                <a className="nav__phone" href={CONTACT.phoneHref}>
                  {CONTACT.phoneDisplay}
                </a>
                <MagneticButton href="#contact" variant="outline" className="nav__cta" onClick={goTo('contact')}>
                  Book a Consultation
                </MagneticButton>
              </>
            ) : (
              <button
                ref={toggleRef}
                type="button"
                className="nav__toggle"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className="nav__toggle-line" />
                <span className="nav__toggle-line" />
              </button>
            )}
          </div>
        </div>
      </header>

      {!isDesktop && <MobileMenu open={open} active={active} onNavigate={goTo} returnFocusRef={toggleRef} />}
    </>
  );
}
