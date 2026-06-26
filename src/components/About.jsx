import React from 'react';
import { motion } from 'framer-motion';

const timelineSteps = [
  {
    year: '2021',
    title: 'System Bootup',
    desc: 'Studio initialized with a mission to develop bespoke Web solutions, building high-quality, pixel-perfect platforms.',
    meta: 'MODULE.INIT',
  },
  {
    year: '2022',
    title: 'AI Core Integration',
    desc: 'Incorporated cognitive machine learning modules, designing predictive algorithms and natural language analytics.',
    meta: 'COGNITIVE.UPGRADE',
  },
  {
    year: '2023',
    title: 'WebGL Engine Active',
    desc: 'Expanded core stacks into Three.js, building fluid WebGL environments and physics-based graphics.',
    meta: 'GRAPHICS.LOADED',
  },
  {
    year: '2024',
    title: 'Cloud Scalability',
    desc: 'Deployed robust serverless pipelines, distributed cloud clusters, and high-frequency database grids.',
    meta: 'NETWORK.ONLINE',
  },
  {
    year: '2026',
    title: 'PHYNEXA Era',
    desc: 'Rebranded as PHYNEXA. Orchestrating complex digital experiences and next-generation products worldwide.',
    meta: 'CORE.STABLE',
  },
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 px-6 md:px-12 z-10 overflow-hidden"
    >
      {/* Floating dust/stars overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),rgba(255,255,255,0))]" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Title */}
        <div className="text-center mb-20">
          <span className="text-[10px] tracking-[0.3em] font-orbitron text-cyber-blue uppercase">
            // METRIC HISTORY
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white mt-2">
            Timeline
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-cyber-blue to-cyber-purple mx-auto mt-4" />
        </div>

        {/* Timeline Path container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative pl-8 md:pl-0"
        >
          {/* Vertical Center Axis Line (Desktop) */}
          <div className="absolute left-[8px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyber-blue via-cyber-purple to-transparent -translate-x-1/2" />

          {/* Timeline Cards */}
          <div className="flex flex-col gap-12 md:gap-16">
            {timelineSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  variants={stepVariants}
                  className={`flex flex-col md:flex-row items-stretch md:justify-between relative w-full ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Node Dot on Timeline Line */}
                  <div className="absolute left-0 md:left-1/2 top-6 -translate-x-1/2 z-20">
                    <div className="w-4 h-4 rounded-full bg-cyber-black border-2 border-cyber-blue flex items-center justify-center shadow-neon-blue">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping" />
                    </div>
                  </div>

                  {/* Left spacer for desktop */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Timeline Glass Card */}
                  <div className="w-full md:w-[45%] glass-card p-6 rounded-xl relative hover:border-cyber-blue/30 transition-all group">
                    {/* Corner Tag */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-orbitron tracking-widest text-cyber-blue">
                        {step.meta}
                      </span>
                      <span className="text-xl md:text-2xl font-black font-orbitron text-white group-hover:text-cyber-cyan transition-colors">
                        {step.year}
                      </span>
                    </div>

                    {/* Milestone title */}
                    <h3 className="text-base font-bold font-orbitron text-white mb-2 uppercase">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-400 font-outfit leading-relaxed">
                      {step.desc}
                    </p>

                    {/* Connected horizontal visual pointer line */}
                    <div
                      className={`hidden md:block absolute top-[28px] w-8 h-[1px] bg-cyber-blue/40 ${
                        isEven ? 'right-full' : 'left-full'
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
