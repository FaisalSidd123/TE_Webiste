import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTarget } from '../lib/smoothScroll';
import { useIntro } from '../hooks/useIntro';

import Hero from '../sections/Hero';
import LocationsMarquee from '../sections/LocationsMarquee';
import About from '../sections/About';
import Divisions from '../sections/Divisions';
import Services from '../sections/Services';
import Process from '../sections/Process';
import Properties from '../sections/Properties';
import Showcase from '../sections/Showcase';
import Numbers from '../sections/Numbers';
import Difference from '../sections/Difference';
import Testimonials from '../sections/Testimonials';
import Areas from '../sections/Areas';
import FAQ from '../sections/FAQ';
import FinalCTA from '../sections/FinalCTA';
import Contact from '../sections/Contact';

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
      {/* 02. Hero (Ink) */}
      <Hero />

      {/* 03. Locations Marquee (Transition Band) */}
      <LocationsMarquee />

      {/* 04. About: The Taqwa Principle (Ivory) */}
      <About />

      {/* 05. Two Practice Areas: Residential / Commercial (Ink) */}
      <Divisions />

      {/* 06. Services: Horizontal Gallery (Sand) */}
      <Services />

      {/* 07. Process: From Search to Settlement (Ink) */}
      <Process />

      {/* 08. Featured Properties: Handpicked for You (Ivory) */}
      <Properties />

      {/* 09. Signature Mandates Showcase: Curated Acquisitions (Ink) */}
      <Showcase />

      {/* 10. Numbers Band (Ink) */}
      <Numbers />

      {/* 11. The Taqwa Difference (Ivory) */}
      <Difference />

      {/* 12. Testimonials: In Their Words (Sand) */}
      <Testimonials />

      {/* 13. Areas We Serve (Ink) */}
      <Areas />

      {/* 14. FAQ: Questions, Answered (Ivory) */}
      <FAQ />

      {/* 15. Final CTA: Let's Build What You Deserve (Ink) */}
      <FinalCTA />

      {/* 16. Contact: Visit, Call, or Write (Ivory) */}
      <Contact />
    </main>
  );
}
