/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: "#050505",
          dark: "#0b0b0f",
          gray: "#15151e",
          blue: "#00d2ff",
          purple: "#7928ca",
          pink: "#ff007a",
          cyan: "#00f5ff",
          neon: "#39ff14",
        }
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-spin': 'glowSpin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
        'laser-sweep': 'laserSweep 4s linear infinite',
      },
      keyframes: {
        glowSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        laserSweep: {
          '0%': { left: '-100%' },
          '100%': { left: '200%' },
        }
      },
      boxShadow: {
        'neon-blue': '0 0 15px rgba(0, 210, 255, 0.35), 0 0 30px rgba(0, 210, 255, 0.15)',
        'neon-purple': '0 0 15px rgba(121, 40, 202, 0.35), 0 0 30px rgba(121, 40, 202, 0.15)',
        'neon-pink': '0 0 15px rgba(255, 0, 122, 0.35), 0 0 30px rgba(255, 0, 122, 0.15)',
        'neon-cyan': '0 0 15px rgba(0, 245, 255, 0.4), 0 0 30px rgba(0, 245, 255, 0.2)',
      }
    },
  },
  plugins: [],
}
