import { useCallback, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IntroContext } from './hooks/useIntro';
import { ScrollTrigger } from './lib/gsap';
import SmoothScrollProvider from './components/layout/SmoothScrollProvider';
import Preloader from './components/layout/Preloader';
import GrainOverlay from './components/layout/GrainOverlay';
import Navbar from './components/layout/Navbar';
import Cursor from './components/layout/Cursor';
import Home from './pages/Home';

export default function App() {
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleReveal = useCallback(() => setRevealed(true), []);
  const handleDone = useCallback(() => {
    setLoading(false);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  const intro = useMemo(() => ({ revealed, ready: !loading }), [revealed, loading]);

  return (
    <SmoothScrollProvider>
      <IntroContext.Provider value={intro}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {loading && <Preloader onReveal={handleReveal} onDone={handleDone} />}
        <Navbar />
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
        <GrainOverlay />
        <Cursor />
      </IntroContext.Provider>
    </SmoothScrollProvider>
  );
}
