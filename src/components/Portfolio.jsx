import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiExternalLink } from 'react-icons/hi';

const projects = [
  {
    id: 1,
    title: 'Umm Al Quwain Employee Management System',
    category: 'Enterprise App',
    desc: 'An automated administrative platform engineered to track, manage, and audit employee workflows across regional governances.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind'],
    status: 'Deployed',
    scope: 'Government Operations',
  },
  {
    id: 2,
    title: 'Single Pro',
    category: 'Product Suite',
    desc: 'An unified workflow manager providing real-time data syncs, telemetry metrics, and collaborative work hubs.',
    tech: ['Next.js', 'Firebase Auth', 'Firestore', 'TailwindCSS'],
    status: 'In Production',
    scope: 'SaaS Platform',
  },
  {
    id: 3,
    title: 'Breast Cancer Detection using Machine Learning',
    category: 'AI & Healthcare',
    desc: 'Advanced computer vision models trained to detect early stage indicators of breast cancer using high-resolution mammography scans.',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'Keras', 'Flask'],
    status: 'Validated',
    scope: 'Clinical Trial Software',
  },
  {
    id: 4,
    title: 'AI Virtual Rooms',
    category: 'WebGL & VR',
    desc: 'Immersive browser-based virtual environment rendering real-time AI agents inside modular, interactive 3D virtual spaces.',
    tech: ['React Three Fiber', 'Three.js', 'Drei', 'WebRTC', 'Gemini API'],
    status: 'Prototype',
    scope: 'Cinematic Metaverse',
  },
  {
    id: 5,
    title: 'Confident Speech & Emotion Detection',
    category: 'Machine Learning',
    desc: 'Audio analysis algorithm classifying user vocal inflections, tones, and speeds to predict emotional status and confidence.',
    tech: ['Python', 'Scikit-Learn', 'Librosa', 'FastAPI', 'PyTorch'],
    status: 'Integrated API',
    scope: 'Sales Intelligence',
  },
  {
    id: 6,
    title: 'Ferrari Inspired 3D Website',
    category: '3D Web Experience',
    desc: 'A showcase of Ferrari engineering with high-fidelity 3D car models, custom shaders, and interactive camera orbits.',
    tech: ['Three.js', 'GSAP', 'WebGL', 'Shaders', 'Vanilla JS'],
    status: 'Award Winner',
    scope: 'Interactive Marketing',
  },
  {
    id: 7,
    title: 'Studio Agency',
    category: 'Creative Design',
    desc: 'Portfolio landing page tailored for modern creative agencies, implementing scrolling motion paths and morphing layers.',
    tech: ['React', 'Framer Motion', 'Lenis Scroll', 'Tailwind CSS'],
    status: 'Live',
    scope: 'Digital Showroom',
  },
  {
    id: 8,
    title: 'Spotify Clone',
    category: 'Streaming Media',
    desc: 'Full-featured audio client rendering real-time playback, audio state syncs, and playlist customizers.',
    tech: ['React', 'Redux Toolkit', 'Tailwind', 'Spotify API', 'Supabase'],
    status: 'Sandbox',
    scope: 'Consumer Experience',
  },
  {
    id: 9,
    title: 'Recipe Book',
    category: 'Smart Tool',
    desc: 'Mobile-first cooking companion using generative AI models to curate dynamic steps based on available ingredients.',
    tech: ['React Native', 'Expo', 'Claude AI', 'Node.js'],
    status: 'Internal Beta',
    scope: 'Smart Living',
  },
  {
    id: 10,
    title: 'Personal Portfolio',
    category: 'Digital Space',
    desc: 'Award-winning interactive resume using customized UI themes, physics-based simulations, and neon graphics.',
    tech: ['Vite', 'React', 'GSAP', 'CSS Grid', 'Three.js'],
    status: 'Live',
    scope: 'Self-Marketing',
  },
  {
    id: 11,
    title: 'To Do Application',
    category: 'Productivity Tool',
    desc: 'A minimal task engine deploying local-storage syncs, keyboard-driven actions, and clean grid layouts.',
    tech: ['React', 'Context API', 'LocalStorage', 'TailwindCSS'],
    status: 'Standard App',
    scope: 'Productivity Engine',
  },
  {
    id: 12,
    title: 'BoxCallAi',
    category: 'AI & Automation',
    desc: 'An intelligent conversational AI platform deploying natural language processing models for automated telephony, routing, and cognitive customer operations.',
    tech: ['Python', 'Gemini API', 'FastAPI', 'WebSockets', 'Twilio'],
    status: 'Deployed',
    scope: 'Enterprise Automation',
  },
  {
    id: 13,
    title: 'Predicting Share Market Chart',
    category: 'Data Analytics',
    desc: 'A machine learning platform utilizing long short-term memory (LSTM) neural networks to analyze financial datasets and forecast stock market trajectories.',
    tech: ['Python', 'TensorFlow', 'Pandas', 'NumPy', 'Matplotlib'],
    status: 'Validated',
    scope: 'Financial Forecasting',
  },
  {
    id: 14,
    title: 'Game App Flutter',
    category: 'Mobile Development',
    desc: 'A high-performance cross-platform mobile game rendering fluid animations, physics-based simulations, and interactive gameplay loops.',
    tech: ['Flutter', 'Dart', 'Flame Engine', 'Rive', 'Firebase'],
    status: 'Production Beta',
    scope: 'Consumer Gaming',
  },
  {
    id: 15,
    title: 'Helpdesk System',
    category: 'Web Application',
    desc: 'An automated helpdesk ticketing engine featuring real-time state synchronizations, role-based security access, and telemetry metric logging.',
    tech: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB'],
    status: 'Deployed',
    scope: 'Internal Operations',
  },
];

// Custom 3D Tilt Project Card Component
function ProjectCard({ proj, cardVariants, onClick }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    // Convert pixel offsets to degree rotations (subtle, clean tilt)
    const rotX = -(y / (box.height / 2)) * 10;
    const rotY = (x / (box.width / 2)) * 10;

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
        onClick={onClick}
        className="project-card glass-card rounded-xl p-6 h-[220px] flex flex-col justify-between cursor-pointer relative overflow-hidden group select-none border border-white/5"
      >
        {/* Card Glow Highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyber-purple/5 via-transparent to-cyber-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div style={{ transform: 'translateZ(25px)' }}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-[9px] font-orbitron uppercase tracking-widest text-cyber-blue">
              {proj.category}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#00f5ff] group-hover:shadow-[0_0_8px_#00f5ff] transition-all" />
          </div>
          
          <h3 className="text-base font-bold font-orbitron text-white group-hover:text-cyber-cyan transition-colors line-clamp-2">
            {proj.title}
          </h3>
        </div>

        <div style={{ transform: 'translateZ(15px)' }}>
          <p className="text-[11px] text-gray-400 font-outfit line-clamp-2 mb-4 leading-relaxed">
            {proj.desc}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <span className="text-[9px] uppercase font-orbitron text-gray-500 group-hover:text-white transition-colors">
              Access System
            </span>
            <span className="text-[9px] uppercase font-orbitron text-cyber-blue">
              #{proj.id.toString().padStart(3, '0')}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="portfolio"
      className="relative min-h-screen py-24 px-6 md:px-12 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] font-orbitron text-cyber-blue uppercase">
            // HOLOGRAPHIC ARCHIVES
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white mt-2">
            Selected Nodes
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-cyber-blue to-cyber-purple mx-auto mt-4" />
        </div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((proj) => (
            <ProjectCard
              key={proj.id}
              proj={proj}
              cardVariants={cardVariants}
              onClick={() => setSelectedProject(proj)}
            />
          ))}
        </motion.div>
      </div>

      {/* Premium Glass Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl p-8 md:p-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 hover:border-cyber-blue hover:text-cyber-blue transition-all"
              >
                <HiX size={20} />
              </button>

              {/* Title & Category */}
              <div className="mb-6">
                <span className="text-[10px] uppercase font-orbitron tracking-widest text-cyber-blue">
                  {selectedProject.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-black font-orbitron text-white mt-1 uppercase leading-tight">
                  {selectedProject.title}
                </h2>
              </div>

              {/* Grid Metadata details */}
              <div className="grid grid-cols-2 gap-4 py-4 px-5 rounded-lg bg-white/5 border border-white/5 font-orbitron text-[10px] text-gray-400 mb-6">
                <div>
                  <span className="text-gray-500 uppercase">SYSTEM NODE STATUS:</span>
                  <p className="text-white mt-0.5 uppercase">{selectedProject.status}</p>
                </div>
                <div>
                  <span className="text-gray-500 uppercase">DEPLOYMENT SCOPE:</span>
                  <p className="text-white mt-0.5 uppercase">{selectedProject.scope}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h4 className="text-[11px] uppercase font-orbitron text-gray-400 tracking-wider mb-2">
                  System Description
                </h4>
                <p className="text-sm text-gray-300 font-outfit leading-relaxed">
                  {selectedProject.desc}
                </p>
              </div>

              {/* Tech Stack Tags */}
              <div className="mb-8">
                <h4 className="text-[11px] uppercase font-orbitron text-gray-400 tracking-wider mb-3">
                  Technologies Utilized
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-md text-[10px] font-orbitron border border-cyber-blue/20 bg-cyber-blue/5 text-cyber-blue"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-xs font-orbitron uppercase tracking-widest text-white transition-all"
                >
                  Close Console
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple hover:shadow-neon-blue text-xs font-orbitron uppercase tracking-widest text-white transition-all"
                >
                  Request Deployment <HiExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
