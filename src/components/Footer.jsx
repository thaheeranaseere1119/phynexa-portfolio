import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaTerminal } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative z-10 py-12 px-6 md:px-12 bg-cyber-black/80 border-t border-white/5 overflow-hidden">
      {/* Decorative pulse line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-blue to-transparent" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand info */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-black/50 border border-cyber-blue/30">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-4 h-4 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <span className="text-xs uppercase font-orbitron tracking-widest text-white">
            PHYNEXA
          </span>
          <span className="text-[10px] text-gray-500 font-outfit hidden sm:inline">
            | ENGINEERING TOMORROW'S DIGITAL SUCCESS
          </span>
        </div>

        {/* Center: System stats mockup */}
        <div className="flex items-center gap-2 text-gray-500 font-orbitron text-[9px]">
          <FaTerminal className="text-cyber-blue animate-pulse" />
          <span>SYS.TELEMETRY: ACTIVE (120 FPS)</span>
        </div>

        {/* Right Side: Social links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors duration-300"
              aria-label="GitHub"
            >
              <FaGithub size={16} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors duration-300"
              aria-label="Twitter"
            >
              <FaTwitter size={16} />
            </a>
          </div>
          
          <span className="text-[9px] uppercase tracking-widest text-gray-500 font-outfit">
            © 2026 PHYNEXA. ALL RIGHTS RESERVED.
          </span>
        </div>

      </div>
    </footer>
  );
}
