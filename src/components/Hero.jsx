import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 5.0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-12 py-32 z-10"
    >
      {/* Background Watermark Logo (Large, colorful phoenix taking flight) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25 mix-blend-screen">
        <motion.img
          initial={{ scale: 0.8, rotate: -15, y: 50, x: -30 }}
          animate={{
            scale: [0.95, 1.05, 0.95],
            y: [-20, 20, -20],
            x: [-15, 15, -15],
            rotate: [-4, 4, -4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          src="/logo.png"
          alt="Watermark"
          className="w-[85vw] max-w-[800px] h-auto object-contain select-none filter saturate-[1.3] drop-shadow-[0_0_50px_rgba(255,110,0,0.15)]"
        />
      </div>

      <div className="max-w-6xl mx-auto w-full text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center"
        >
          {/* Subtitle tag */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyber-blue/30 bg-cyber-blue/5 text-cyber-blue text-[10px] tracking-[0.3em] font-orbitron uppercase mb-8 shadow-neon-blue/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-ping" />
            OPERATING SYSTEM v1.0.4 ONLINE
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-8xl font-black font-orbitron tracking-tight leading-[1.05] mb-8 uppercase text-white"
          >
            Engineering <br />
            <span className="gradient-text-blue-purple drop-shadow-[0_0_30px_rgba(0,210,255,0.2)]">Tomorrow's</span> <br />
            Digital Success
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 font-outfit text-sm md:text-lg max-w-2xl leading-relaxed tracking-wider mb-12"
          >
            We architect, engineer, and deploy high-performance digital products, 
            intelligent AI engines, and immersive WebGL interfaces designed for the next generation of internet scale.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full sm:w-auto"
          >
            <a
              href="#portfolio"
              className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple font-orbitron text-xs uppercase tracking-widest text-white overflow-hidden transition-all duration-300 hover:shadow-neon-blue shadow-lg"
            >
              {/* Button sweep light */}
              <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-white/20 skew-x-12 group-hover:left-[150%] transition-all duration-1000 ease-out" />
              Explore Codebase <HiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 hover:border-cyber-blue/50 bg-white/5 hover:bg-cyber-blue/5 font-orbitron text-xs uppercase tracking-widest text-white transition-all duration-500 hover:shadow-neon-blue/20"
            >
              Initialize Contact
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-50">
        <span className="text-[9px] uppercase tracking-[0.3em] font-orbitron text-gray-500 animate-pulse">
          SCROLL TO NAVIGATE
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-cyber-blue to-transparent" />
      </div>
    </section>
  );
}
