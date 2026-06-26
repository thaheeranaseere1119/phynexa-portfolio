import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [trail, setTrail] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredType, setHoveredType] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);

      // Add point to trail
      setTrail((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Math.random() }];
        if (newTrail.length > 8) newTrail.shift();
        return newTrail;
      });
    };

    const handleMouseOver = (e) => {
      // Find closest interactive element
      const target = e.target.closest('a, button, [role="button"], .interactive-pillar, .project-card, .team-card');
      if (target) {
        setIsHovered(true);
        if (target.classList.contains('interactive-pillar')) {
          setHoveredType('pillar');
        } else if (target.classList.contains('project-card')) {
          setHoveredType('project');
        } else {
          setHoveredType('standard');
        }
      } else {
        setIsHovered(false);
        setHoveredType('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Glow trail */}
      {trail.map((point, index) => {
        const opacity = (index + 1) / trail.length * 0.15;
        const scale = (index + 1) / trail.length * 0.8;
        return (
          <div
            key={point.id}
            className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-40 bg-gradient-to-r from-cyber-blue to-cyber-purple blur-md"
            style={{
              transform: `translate(${point.x - 16}px, ${point.y - 16}px) scale(${scale})`,
              opacity: opacity,
              transition: 'transform 0.1s ease-out',
            }}
          />
        );
      })}

      {/* Main Cursor Dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-screen border border-white"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovered ? 48 : 20,
          height: isHovered ? 48 : 20,
          borderColor: isHovered
            ? hoveredType === 'pillar'
              ? '#00f5ff'
              : hoveredType === 'project'
              ? '#ff007a'
              : '#00d2ff'
            : 'rgba(255, 255, 255, 0.45)',
          backgroundColor: isHovered
            ? hoveredType === 'pillar'
              ? 'rgba(0, 245, 255, 0.1)'
              : hoveredType === 'project'
              ? 'rgba(255, 0, 122, 0.15)'
              : 'rgba(0, 210, 255, 0.15)'
            : 'transparent',
          boxShadow: isHovered
            ? hoveredType === 'pillar'
              ? '0 0 20px rgba(0, 245, 255, 0.6)'
              : hoveredType === 'project'
              ? '0 0 20px rgba(255, 0, 122, 0.6)'
              : '0 0 15px rgba(0, 210, 255, 0.5)'
            : 'none',
        }}
        animate={{
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        {/* Core electric dot inside the circle */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 ${
            isHovered ? 'bg-white scale-125' : 'bg-cyber-blue shadow-neon-blue'
          }`}
        />
      </motion.div>
    </>
  );
}
