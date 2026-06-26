import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading, revealing, done
  const revealStarted = useRef(false);

  useEffect(() => {
    // Artificial progress increments to make it feel organic & futuristic
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Random incremental steps to simulate loading modules
        const step = Math.floor(Math.random() * 12) + 2;
        const nextProgress = Math.min(prev + step, 100);
        
        return nextProgress;
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100 && !revealStarted.current) {
      revealStarted.current = true;
      // Small pause at 100% for the cinematic logo reveal
      setTimeout(() => {
        setPhase('revealing');
        setTimeout(() => {
          setPhase('done');
          setTimeout(() => {
            onComplete();
          }, 800); // Allow fade out animation to finish
        }, 5000); // Extended to 5 seconds for the cinematic logo showcase
      }, 500);
    }
  }, [progress, onComplete]);

  // Cyberpunk audio-spectrum lines
  const visualLines = Array.from({ length: 24 }).map((_, i) => ({
    height: Math.floor(Math.random() * 60) + 10,
    delay: i * 0.05,
  }));

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030305] overflow-hidden"
        >
          {/* Neon Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,210,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,210,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* Glowing Radial Fog background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyber-purple/10 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-cyber-blue/10 blur-[80px] pointer-events-none" />

          <div className="relative flex flex-col items-center justify-center max-w-md px-4">
            {/* Holographic scanning laser line (repeated sweep for 5-sec reveal) */}
            {phase === 'revealing' && (
              <motion.div 
                initial={{ top: '-10%' }}
                animate={{ top: '110%' }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_15px_#00f5ff] z-25"
              />
            )}

            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative w-40 h-40 mb-10 flex items-center justify-center"
            >
              {/* Outer Circular Tech Grid */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-cyber-gray/30 fill-none"
                  strokeWidth="1.5"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-cyber-blue fill-none drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]"
                  strokeWidth="2"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progress) / 100}
                  transition={{ strokeDashoffset: 0.3 }}
                />
              </svg>

              {/* Glowing Phoenix Colorful Wings / Auroras (representing taking flight) */}
              {phase === 'revealing' && (
                <>
                  <motion.div
                    initial={{ scale: 0.7, rotate: 0, opacity: 0 }}
                    animate={{ scale: [1, 1.9, 1.4], rotate: 360, opacity: [0, 0.85, 0.45] }}
                    transition={{ duration: 5.0, ease: 'easeInOut' }}
                    className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-[#ff4500] via-[#ff007a] to-[#7928ca] blur-xl mix-blend-screen pointer-events-none"
                  />
                  <motion.div
                    initial={{ scale: 0.7, rotate: 180, opacity: 0 }}
                    animate={{ scale: [1, 2.2, 1.6], rotate: -360, opacity: [0, 0.75, 0.35] }}
                    transition={{ duration: 5.0, ease: 'easeInOut' }}
                    className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-[#ff00f5] via-[#00f5ff] to-[#ff8a00] blur-2xl mix-blend-screen pointer-events-none"
                  />
                </>
              )}

              {/* Logo Image (5-sec slowly morphing scale, flight lift & color saturation boost) */}
              <motion.div
                animate={
                  phase === 'revealing'
                    ? { 
                        scale: [1, 1.25, 1.12], 
                        y: [0, -16, -8], // Taking flight lift motion
                        filter: [
                          'brightness(1) saturate(1) contrast(1)', 
                          'brightness(1.8) saturate(2.4) contrast(1.1) drop-shadow(0 0 15px rgba(255, 69, 0, 0.6))', 
                          'brightness(1.4) saturate(1.8) contrast(1) drop-shadow(0 0 8px rgba(0, 210, 255, 0.4))'
                        ] 
                      }
                    : { y: [0, -5, 0] }
                }
                transition={
                  phase === 'revealing'
                    ? { duration: 5.0, ease: 'easeInOut' }
                    : { repeat: Infinity, duration: 4, ease: 'easeInOut' }
                }
                className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-black/60 border border-cyber-blue/30 backdrop-blur-md shadow-neon-blue z-10"
              >
                <img
                  src="/logo.png"
                  alt="PHYNEXA Logo"
                  className="w-20 h-20 object-contain p-2"
                  onError={(e) => {
                    // Fallback in case image is missing
                    e.target.style.display = 'none';
                  }}
                />
              </motion.div>

              {/* Pulse rings */}
              {phase === 'revealing' && (
                <>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: 2 }}
                    className="absolute inset-0 border-2 border-cyber-blue rounded-full"
                  />
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale: 2.7, opacity: 0 }}
                    transition={{ duration: 1.8, delay: 0.2, repeat: 2 }}
                    className="absolute inset-0 border border-cyber-purple rounded-full"
                  />
                </>
              )}
            </motion.div>

            {/* Title & Slogan */}
            <div className="text-center z-10">
              <motion.h1 
                className="text-3xl font-extrabold tracking-[0.25em] text-white font-orbitron drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] mb-1"
                animate={phase === 'revealing' ? { color: '#00f5ff' } : {}}
              >
                PHYNEXA
              </motion.h1>
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-cyber-blue to-transparent mx-auto my-3" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-cyber-blue font-outfit opacity-80">
                Engineering Tomorrow's Success
              </p>
            </div>

            {/* Audio Spectrum / Loading Status */}
            <div className="flex items-center justify-center gap-1.5 h-16 my-6 w-full">
              {phase === 'loading' ? (
                visualLines.map((line, idx) => (
                  <motion.div
                    key={idx}
                    className="w-[2px] bg-cyber-blue/60 rounded-full"
                    animate={{
                      height: [
                        line.height * 0.3,
                        line.height,
                        line.height * 0.5,
                        line.height * 0.3,
                      ],
                      backgroundColor: idx % 2 === 0 ? '#00d2ff' : '#7928ca',
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      delay: line.delay,
                      ease: 'easeInOut',
                    }}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0, 1] }}
                  transition={{ duration: 0.8 }}
                  className="text-xs uppercase font-orbitron tracking-widest text-[#00f5ff] drop-shadow-[0_0_8px_#00f5ff]"
                >
                  SYSTEMS ONLINE
                </motion.div>
              )}
            </div>

            {/* Progress Percentage */}
            <div className="font-orbitron text-sm tracking-widest text-cyber-gray/70">
              <span className="text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]">{progress}%</span> LOADING CORE INTERFACE
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
