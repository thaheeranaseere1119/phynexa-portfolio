import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#portfolio' },
  { name: 'Timeline', href: '#about' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 5.0, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-6 md:px-12 py-4 ${
          scrolled
            ? 'bg-cyber-black/70 backdrop-blur-md border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Company Name */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-black/40 border border-cyber-blue/30 group-hover:border-cyber-cyan/70 transition-all duration-300 shadow-neon-blue group-hover:shadow-neon-cyan">
              <img
                src="/logo.png"
                alt="PHYNEXA Logo"
                className="w-7 h-7 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <span className="text-xl font-bold tracking-[0.2em] font-orbitron text-white group-hover:text-cyber-cyan transition-colors duration-300">
              PHYNEXA
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-xs uppercase tracking-[0.2em] font-outfit text-gray-400 hover:text-white transition-colors duration-300 py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyber-blue to-cyber-purple group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              className="relative overflow-hidden px-5 py-2 rounded-full border border-cyber-blue/40 text-xs uppercase tracking-[0.2em] font-orbitron text-cyber-blue hover:text-white transition-all duration-500 bg-cyber-blue/5 hover:bg-cyber-blue/20 hover:shadow-neon-blue"
            >
              Get in Touch
            </a>
          </div>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-cyber-cyan p-2 focus:outline-none z-50"
            aria-label="Toggle Menu"
          >
            {isOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 md:hidden flex justify-end"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Body */}
            <div className="relative w-[75vw] max-w-sm h-full glass-panel border-l border-white/10 flex flex-col justify-between py-24 px-10 z-10">
              <div className="flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-orbitron tracking-wider text-gray-300 hover:text-cyber-cyan transition-colors py-2 border-b border-white/5"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="flex flex-col gap-4 text-center">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 rounded-full border border-cyber-blue/50 text-xs font-orbitron uppercase tracking-widest text-cyber-blue hover:bg-cyber-blue/10 transition-colors"
                >
                  Contact Console
                </a>
                <p className="text-[9px] uppercase tracking-widest text-gray-500">
                  © 2026 PHYNEXA. ALL RIGHTS RESERVED.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
