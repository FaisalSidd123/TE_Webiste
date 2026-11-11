import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTarget } from '../lib/smoothScroll';
import { useIntro } from '../hooks/useIntro';
import Hero from '../sections/Hero';
import LocationsMarquee from '../sections/LocationsMarquee';

export default function Home() {
  const { hash } = useLocation();
  const { ready } = useIntro();

  // Arriving with "/#section" (e.g. from /privacy): scroll there once the preloader has gone.
  useEffect(() => {
    if (!ready || !hash) return undefined;
    const id = requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) scrollToTarget(target, { offset: 0 });
    });
    return () => cancelAnimationFrame(id);
  }, [hash, ready]);

  return (
    <main id="main">
      <Hero />
      <LocationsMarquee />
      {/* TEMPORARY: stands in for the ivory About section until step 5. */}
      <section id="about" className="section theme-ivory" style={{ minHeight: '80vh' }} aria-label="About (coming in step 5)">
        <div className="container">
          <p className="t-label">03 — About · arrives in step 5</p>
        </div>
      </section>
    </main>
  );
}
