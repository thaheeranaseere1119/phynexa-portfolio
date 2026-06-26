import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import thaheeImg from '../assets/thahee.jpeg';
import vichuImg from '../assets/vichu.jpeg';

const team = [
  {
    name: 'Thaheera Naseere',
    role: 'Founder & Director',
    tag: 'FOUNDER.DIR',
    avatar: thaheeImg,
    bio: 'Pioneering custom technology strategies, AI pipelines, and structural product integrations.',
    socials: {
      linkedin: 'www.linkedin.com/in/thaheera-naseere-0851032b4',
      github: 'https://github.com/thaheeranaseere1119',
      twitter: '#',
    },
  },
  {
    name: 'Vishvavasanth Sakthivel',
    role: 'Co-Founder & Tech Lead',
    tag: 'COFOUNDER.CTO',
    avatar: vichuImg,
    bio: 'Architecting highly scalable cloud products, 3D WebGL interfaces, and microservices.',
    socials: {
      linkedin: '#',
      github: '#',
      twitter: '#',
    },
  },
];

// Custom 3D Tilt Card Component
function TeamCard({ member }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    // Convert pixel offsets to degree rotations
    const rotX = -(y / (box.height / 2)) * 10;
    const rotY = (x / (box.width / 2)) * 10;

    setTilt({ x: rotX, y: rotY });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className="w-full sm:w-[350px] aspect-[3/4]"
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150, mass: 0.5 }}
        className="w-full h-full glass-card rounded-2xl p-8 flex flex-col justify-between items-center relative overflow-hidden group select-none cursor-pointer border border-white/5 hover:border-cyber-blue/30"
      >
        {/* Glow ambient background element */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyber-blue/5 via-transparent to-cyber-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Top Info */}
        <div className="w-full flex items-center justify-between pointer-events-none">
          <span className="text-[9px] font-orbitron tracking-widest text-cyber-blue">
            {member.tag}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-cyber-cyan group-hover:shadow-[0_0_8px_rgba(0,245,255,1)]" />
        </div>

        {/* Member Avatar */}
        <div
          style={{ transform: 'translateZ(40px)' }}
          className="relative w-32 h-32 rounded-full overflow-hidden border border-white/10 p-1 bg-black/40 group-hover:border-cyber-cyan/50 transition-colors duration-300"
        >
          <img
            src={member.avatar}
            alt={member.name}
            style={{ filter: isHovered ? 'grayscale(0%) contrast(1.1)' : 'grayscale(100%) contrast(1.1)' }}
            className="w-full h-full object-cover rounded-full transition-all duration-500"
          />
        </div>

        {/* Text Details */}
        <div className="text-center w-full" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-lg font-bold font-orbitron text-white group-hover:text-cyber-cyan transition-colors">
            {member.name}
          </h3>
          <p className="text-[10px] uppercase font-outfit tracking-wider text-gray-500 mt-1">
            {member.role}
          </p>
          <p className="text-xs text-gray-400 font-outfit mt-4 leading-relaxed line-clamp-2 px-2">
            {member.bio}
          </p>
        </div>

        {/* Social Icons */}
        <div
          style={{ transform: 'translateZ(20px)' }}
          className="flex items-center gap-5 relative z-10"
        >
          <a
            href={member.socials.linkedin}
            className="text-gray-400 hover:text-cyber-blue transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href={member.socials.github}
            className="text-gray-400 hover:text-cyber-purple transition-colors duration-300"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            href={member.socials.twitter}
            className="text-gray-400 hover:text-cyber-pink transition-colors duration-300"
            aria-label="Twitter"
          >
            <FaTwitter size={18} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function Team() {
  return (
    <section
      id="team"
      className="relative min-h-screen py-24 px-6 md:px-12 z-10 flex items-center justify-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Title */}
        <div className="text-center mb-20">
          <span className="text-[10px] tracking-[0.3em] font-orbitron text-cyber-blue uppercase">
            // CORE DIRECTIVES
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white mt-2">
            The Founders
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-cyber-blue to-cyber-purple mx-auto mt-4" />
        </div>

        {/* Flex cards */}
        <div className="flex flex-col sm:flex-row gap-12 items-center justify-center">
          {team.map((member, idx) => (
            <TeamCard key={idx} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
