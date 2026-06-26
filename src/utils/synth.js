// Web Audio API Synthesizer for Cinematic Cyberpunk sound effects
// This runs 100% locally and generates sound dynamically in the browser.

let audioCtx = null;
let soundEnabled = false;

export const enableAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  soundEnabled = true;
  // Play a startup chime
  playSynthSound('startup');
};

export const disableAudio = () => {
  soundEnabled = false;
};

export const isAudioEnabled = () => {
  return soundEnabled;
};

export const playSynthSound = (type) => {
  if (!soundEnabled || !audioCtx) return;

  // Ensure AudioContext is running
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const time = audioCtx.currentTime;

  switch (type) {
    case 'startup': {
      // Double note rising chime
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      
      osc1.frequency.setValueAtTime(261.63, time); // C4
      osc1.frequency.exponentialRampToValueAtTime(523.25, time + 0.35); // C5
      
      osc2.frequency.setValueAtTime(329.63, time + 0.08); // E4
      osc2.frequency.exponentialRampToValueAtTime(659.25, time + 0.4); // E5

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.12, time + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start(time);
      osc2.start(time + 0.08);
      osc1.stop(time + 0.5);
      osc2.stop(time + 0.5);
      break;
    }

    case 'click': {
      // Sharp metallic digital click
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, time);
      osc.frequency.exponentialRampToValueAtTime(300, time + 0.08);

      gain.gain.setValueAtTime(0.15, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(time);
      osc.stop(time + 0.09);
      break;
    }

    case 'hover': {
      // Extremely subtle soft tick
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, time);
      gain.gain.setValueAtTime(0.02, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(time);
      osc.stop(time + 0.03);
      break;
    }

    case 'warp': {
      // Rising pitch swoosh / sweep representing hyperspeed or warping
      const osc = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, time);
      osc.frequency.exponentialRampToValueAtTime(850, time + 0.35);

      filter.type = 'lowpass';
      filter.Q.setValueAtTime(5, time);
      filter.frequency.setValueAtTime(300, time);
      filter.frequency.exponentialRampToValueAtTime(2000, time + 0.35);

      gain.gain.setValueAtTime(0.06, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(time);
      osc.stop(time + 0.36);
      break;
    }

    case 'success': {
      // Cyber confirm chime (Major triad)
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time + i * 0.06);
        
        gain.gain.setValueAtTime(0, time + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.08, time + i * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, time + i * 0.06 + 0.25);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(time + i * 0.06);
        osc.stop(time + i * 0.06 + 0.35);
      });
      break;
    }

    default:
      break;
  }
};
