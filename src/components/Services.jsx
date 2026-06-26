import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiCode, HiChip, HiLightningBolt, HiCloudUpload, HiAdjustments } from 'react-icons/hi';

const services = [
  {
    icon: <HiCode size={30} />,
    title: 'Website Development',
    desc: 'High-speed, 3D WebGL interfaces, interactive animations, and responsive engines engineered on modern stacks.',
    tag: 'SYSTEM.DEV',
    color: 'from-cyan-400 to-blue-500',
    shadowColor: 'rgba(0, 245, 255, 0.25)',
  },
  {
    icon: <HiChip size={30} />,
    title: 'AI Solutions',
    desc: 'Predictive modeling, deep learning models, natural language processing networks, and cognitive automation pipelines.',
    tag: 'COGNITIVE.AI',
    color: 'from-purple-500 to-indigo-600',
    shadowColor: 'rgba(121, 40, 202, 0.25)',
  },
  {
    icon: <HiLightningBolt size={30} />,
    title: 'UI UX Design',
    desc: 'High-end cyber interfaces, clean user flows, dark mode systems, and volumetric digital products tailored for luxury.',
    tag: 'VISUAL.OS',
    color: 'from-pink-500 to-red-500',
    shadowColor: 'rgba(255, 0, 122, 0.25)',
  },
  {
    icon: <HiCloudUpload size={30} />,
    title: 'Cloud Applications',
    desc: 'Serverless structures, distributed networks, instant deployments, security encryptions, and scalable data endpoints.',
    tag: 'NETWORK.CLOUD',
    color: 'from-blue-500 to-purple-600',
    shadowColor: 'rgba(0, 210, 255, 0.25)',
  },
  {
    icon: <HiAdjustments size={30} />,
    title: 'Brand Identity',
    desc: 'Handcrafted visuals, logo engineering, cyber-themed typography, and detailed design languages that win international awards.',
    tag: 'CORE.BRAND',
    color: 'from-yellow-400 to-orange-500',
    shadowColor: 'rgba(255, 138, 0, 0.25)',
  },
];

// Custom 3D Tilt Card Component
function ServiceCard({ svc, idx, cardVariants }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    // Convert pixel offsets to degree rotations
    const rotX = -(y / (box.height / 2)) * 12;
    const rotY = (x / (box.width / 2)) * 12;

    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className="w-full h-full"
    >
      <motion.div
        variants={cardVariants}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 180, mass: 0.5 }}
        className="interactive-pillar glass-card p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between h-[360px] cursor-pointer group border border-white/5"
      >
        {/* Glowing Corner Ambient Light */}
        <div 
          className="absolute top-0 right-0 w-24 h-24 rounded-full filter blur-[40px] opacity-20 group-hover:opacity-40 transition-all duration-500 pointer-events-none" 
          style={{ backgroundColor: svc.shadowColor.replace('0.25', '0.6'), transform: 'translateZ(10px)' }}
        />

        {/* Top Section */}
        <div style={{ transform: 'translateZ(30px)' }}>
          {/* Tech tag and Line sweep */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-[9px] font-orbitron tracking-widest text-cyber-blue/80">
              {svc.tag}
            </span>
            <div className="text-gray-500 font-orbitron text-xs">
              [0{idx + 1}]
            </div>
          </div>

          {/* Service Icon with Glow */}
          <div className="inline-flex p-3 rounded-xl bg-white/5 border border-white/10 text-white mb-6 group-hover:border-cyber-cyan/50 group-hover:text-cyber-cyan transition-all duration-300">
            {svc.icon}
          </div>

          {/* Service Title */}
          <h3 className="text-xl font-bold font-orbitron text-white group-hover:text-cyber-cyan transition-colors duration-300 mb-4">
            {svc.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-400 font-outfit leading-relaxed tracking-wide">
            {svc.desc}
          </p>
        </div>

        {/* Bottom laser sweep link */}
        <div className="relative mt-8 pt-4 border-t border-white/5" style={{ transform: 'translateZ(15px)' }}>
          <span className="text-[10px] uppercase font-orbitron tracking-widest text-cyber-blue group-hover:text-white transition-colors duration-300">
            Initialize Module
          </span>
          
          {/* Laser animation */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-blue to-transparent transform -translate-y-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="services"
      className="relative min-h-screen flex items-center justify-center py-24 px-6 md:px-12 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] font-orbitron text-cyber-blue uppercase">
            // OPERATIONAL MODULES
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white mt-2">
            Our Services
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-cyber-blue to-cyber-purple mx-auto mt-4" />
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((svc, idx) => (
            <ServiceCard key={idx} svc={svc} idx={idx} cardVariants={cardVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
