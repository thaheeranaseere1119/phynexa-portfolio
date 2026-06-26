import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVolumeHigh, FaVolumeXmark, FaExpand, FaCompress, FaTerminal } from 'react-icons/fa6';
import { enableAudio, disableAudio, isAudioEnabled, playSynthSound } from '../utils/synth';

export default function HUDPanel() {
  const [audioActive, setAudioActive] = useState(false);
  const [cinematicMode, setCinematicMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('HERO');
  const [uptime, setUptime] = useState(0.00);

  // Uptime counter
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setUptime(((Date.now() - start) / 1000).toFixed(2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Track mouse coordinates for telemetry
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track active section in viewport
  useEffect(() => {
    const sections = ['hero', 'services', 'portfolio', 'about', 'team', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.toUpperCase());
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    if (audioActive) {
      disableAudio();
      setAudioActive(false);
    } else {
      enableAudio();
      setAudioActive(true);
      playSynthSound('success');
    }
  };

  const toggleCinematic = () => {
    setCinematicMode(!cinematicMode);
    if (audioActive) {
      playSynthSound('click');
    }
  };

  return (
    <>
      {/* Cinematic Widescreen Widescreen Bars */}
      <AnimatePresence>
        {cinematicMode && (
          <>
            {/* Top Bar */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: '7vh' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 right-0 bg-[#020203] border-b border-white/5 z-[9998] pointer-events-none flex items-center justify-between px-12"
            >
              <span className="text-[9px] font-orbitron tracking-[0.2em] text-cyber-blue opacity-50">
                CINEMATIC ASPECT INITIATED
              </span>
              <span className="text-[9px] font-orbitron tracking-[0.2em] text-white/30">
                PHYNEXA // OS WIDESCREEN
              </span>
            </motion.div>
            
            {/* Bottom Bar */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: '7vh' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-0 left-0 right-0 bg-[#020203] border-t border-white/5 z-[9998] pointer-events-none flex items-center justify-between px-12"
            >
              <span className="text-[9px] font-orbitron tracking-[0.2em] text-cyber-purple opacity-50">
                SYS.RESOLUTION: ANAMORPHIC
              </span>
              <span className="text-[9px] font-orbitron tracking-[0.2em] text-white/30">
                2.39:1 CINEMATIC CROP
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating HUD Controller Widget */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex flex-col gap-3 max-w-[280px]">
        <div className="glass-panel rounded-xl p-4 border border-white/5 shadow-2xl flex flex-col gap-3 font-orbitron text-[9px] text-gray-400 select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-1">
            <span className="flex items-center gap-1.5 text-cyber-blue font-bold tracking-wider">
              <FaTerminal className="animate-pulse" /> SYSTEM CONSOLE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan shadow-[0_0_8px_#00f5ff] animate-ping" />
          </div>

          {/* Telemetry Metrics */}
          <div className="space-y-1.5 text-gray-550 leading-tight">
            <div className="flex justify-between">
              <span>ACTIVE NODE:</span>
              <span className="text-white font-bold">{activeSection}</span>
            </div>
            <div className="flex justify-between">
              <span>UPTIME:</span>
              <span className="text-white">{uptime} SEC</span>
            </div>
            <div className="flex justify-between">
              <span>MOUSE.VEC:</span>
              <span className="text-white">X:{mousePos.x} Y:{mousePos.y}</span>
            </div>
            <div className="flex justify-between">
              <span>SOUND_PIPELINE:</span>
              <span className={audioActive ? 'text-cyber-cyan' : 'text-gray-500'}>
                {audioActive ? 'ACTIVE.ONLINE' : 'MUTED.STANDBY'}
              </span>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
            <button
              onClick={toggleSound}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md border transition-all duration-350 ${
                audioActive
                  ? 'border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan shadow-[0_0_8px_rgba(0,245,255,0.2)]'
                  : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/20'
              }`}
            >
              {audioActive ? <FaVolumeHigh size={10} /> : <FaVolumeXmark size={10} />}
              <span>{audioActive ? 'SOUND ON' : 'SOUND OFF'}</span>
            </button>

            <button
              onClick={toggleCinematic}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md border transition-all duration-350 ${
                cinematicMode
                  ? 'border-cyber-purple/40 bg-cyber-purple/10 text-cyber-purple shadow-[0_0_8px_rgba(121,40,202,0.2)]'
                  : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/20'
              }`}
            >
              {cinematicMode ? <FaCompress size={10} /> : <FaExpand size={10} />}
              <span>{cinematicMode ? 'STANDARD' : 'CINEMATIC'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
