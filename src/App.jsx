import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Scene3D from './components/Scene3D';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HUDPanel from './components/HUDPanel';
import { playSynthSound } from './utils/synth';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [flash, setFlash] = useState(false);
  const [clickTrigger, setClickTrigger] = useState(0);

  // Global Interactive Click Flash Effect & 3D Warp Trigger
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target.closest('a, button, [role="button"], .project-card, .interactive-pillar, .team-card');
      if (target) {
        setFlash(true);
        setClickTrigger((prev) => prev + 1);
        playSynthSound('warp');
        const timeout = setTimeout(() => setFlash(false), 120);
        return () => clearTimeout(timeout);
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Global Hover UI Sound triggers
  useEffect(() => {
    const handleGlobalMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], .project-card, .interactive-pillar, .team-card');
      if (target) {
        playSynthSound('hover');
      }
    };
    window.addEventListener('mouseover', handleGlobalMouseOver);
    return () => window.removeEventListener('mouseover', handleGlobalMouseOver);
  }, []);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false,
    });

    const updateScroll = (e) => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(window.scrollY / scrollHeight);
      }
    };

    lenis.on('scroll', updateScroll);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    // Initial trigger
    updateScroll();

    return () => {
      lenis.destroy();
    };
  }, [loaded]);

  // Handle fallback scroll tracking in case Lenis event fails
  useEffect(() => {
    if (!loaded) return;

    const handleFallbackScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(window.scrollY / scrollHeight);
      }
    };

    window.addEventListener('scroll', handleFallbackScroll);
    return () => window.removeEventListener('scroll', handleFallbackScroll);
  }, [loaded]);

  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Cinematic Custom Cursor */}
      <CustomCursor />

      {/* Cinematic HUD Optical Flash */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0.95 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 bg-gradient-to-tr from-cyan-400/20 via-white/70 to-purple-600/20 z-[99999] pointer-events-none mix-blend-screen"
          />
        )}
      </AnimatePresence>

      {/* Loader */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {/* Main Content Layer */}
      {loaded && (
        <div className="relative w-full min-h-screen">
          {/* WebGL Scene Background */}
          <Scene3D scrollProgress={scrollProgress} clickTrigger={clickTrigger} />

          {/* Floating Navbar */}
          <Navbar />

          {/* Cinematic HUD Overlay Panel */}
          <HUDPanel />

          {/* DOM Overlay content */}
          <main className="relative z-10 w-full">
            <Hero />
            <Services />
            <Portfolio />
            <About />
            <Team />
            <Contact />
          </main>

          {/* Minimalist Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
