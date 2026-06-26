import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMail, HiPhone, HiCalendar, HiBadgeCheck, HiTerminal, HiX } from 'react-icons/hi';
import { playSynthSound } from '../utils/synth';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showVCard, setShowVCard] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setIsSending(true);
      setSendProgress(0);
      
      const interval = setInterval(() => {
        setSendProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsSending(false);
            setIsSubmitted(true);
            playSynthSound('success');
            
            setTimeout(() => {
              setIsSubmitted(false);
              setFormState({ name: '', email: '', message: '' });
            }, 6000);
            return 100;
          }
          return prev + 5;
        });
      }, 90);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 px-6 md:px-12 z-10 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] font-orbitron text-cyber-blue uppercase">
            // CONTACT CONSOLE
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white mt-2">
            Establish Connection
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-cyber-blue to-cyber-purple mx-auto mt-4" />
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          {/* Glass Form Panel (Col 7) */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-8 md:p-10 border border-white/5 flex flex-col justify-between relative overflow-hidden">

            <AnimatePresence mode="wait">
              {isSending ? (
                <motion.div
                  key="sending"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full flex flex-col justify-center py-12 font-orbitron"
                >
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
                    <HiTerminal className="text-cyber-purple animate-pulse" />
                    <span className="text-[10px] tracking-widest text-cyber-purple font-bold">
                      TRANSMISSION_PROGRESS.SH
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-[11px] text-gray-400">
                      <span>STATUS:</span>
                      <span className="text-cyber-cyan animate-pulse">
                        {sendProgress < 20
                          ? 'RESOLVING HOST...'
                          : sendProgress < 45
                          ? 'ENCRYPTING MESSAGE...'
                          : sendProgress < 75
                          ? 'ROUTING DATA PACKETS...'
                          : 'AWAITING RESPONSE...'}
                      </span>
                    </div>

                    {/* Cyber progress bar */}
                    <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-purple"
                        style={{ width: `${sendProgress}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[10px] text-gray-550">
                      <span>UPLOADING BITSTREAM</span>
                      <span>{sendProgress}%</span>
                    </div>

                    {/* Console logs */}
                    <div className="p-4 rounded-lg bg-black/60 border border-white/5 font-mono text-[9px] text-cyber-blue/80 space-y-1 h-28 overflow-y-auto">
                      <div>&gt; sh_transmit_signal.sh -name "{formState.name}"</div>
                      {sendProgress >= 15 && <div className="text-gray-400">&gt; [OK] SOCKET ESTABLISHED AT PORT 8700</div>}
                      {sendProgress >= 35 && <div className="text-gray-400">&gt; [OK] ENCRYPTION COMPLETED (AES-256)</div>}
                      {sendProgress >= 55 && <div className="text-gray-400">&gt; [OK] PACKET BLOCKS [08/08] SHIPPED</div>}
                      {sendProgress >= 80 && <div className="text-cyber-purple">&gt; [WAIT] VERIFYING HASH CHECKSUMS...</div>}
                    </div>
                  </div>
                </motion.div>
              ) : !isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 mb-2 pb-4 border-b border-white/5">
                    <HiTerminal className="text-cyber-blue" />
                    <span className="text-[10px] font-orbitron tracking-widest text-gray-400">
                      SECURE_COMMUNICATION_LINK.EXE
                    </span>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-orbitron text-gray-550 mb-2 tracking-wider">
                      User Identity (Name)
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full glass-input px-4 py-3 text-sm font-outfit"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-orbitron text-gray-550 mb-2 tracking-wider">
                      Return Frequency (Email Address)
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. user@domain.com"
                      className="w-full glass-input px-4 py-3 text-sm font-outfit"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-orbitron text-gray-550 mb-2 tracking-wider">
                      Payload Core (Message)
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Type details..."
                      className="w-full glass-input px-4 py-3 text-sm font-outfit resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg bg-gradient-to-r from-cyber-blue to-cyber-purple hover:shadow-neon-blue font-orbitron text-xs uppercase tracking-widest text-white transition-all duration-300"
                  >
                    Transmit Signal
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-cyber-blue/10 border border-cyber-blue flex items-center justify-center text-cyber-blue mb-6 shadow-neon-blue">
                    <HiBadgeCheck size={32} />
                  </div>
                  <h3 className="text-xl font-bold font-orbitron text-white mb-2 uppercase">
                    Transmission Success
                  </h3>
                  <p className="text-xs text-gray-400 font-outfit max-w-sm leading-relaxed mb-6">
                    Your packet has been successfully sent. PHYNEXA cognitive routing agents will response shortly.
                  </p>
                  <span className="text-[9px] uppercase font-orbitron text-cyber-blue animate-pulse">
                    LINK ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Channels Panel (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">

            {/* Quick Contact Buttons */}
            <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-6">
              <span className="text-[10px] font-orbitron tracking-widest text-cyber-blue">
                // ACTIVE CHANNELS
              </span>

              <div className="flex flex-col gap-4">
                <a
                  href="mailto:contact@phynexa.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyber-blue/30 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-lg bg-cyber-blue/10 text-cyber-blue group-hover:bg-cyber-blue group-hover:text-white transition-colors duration-300">
                    <HiMail size={20} />
                  </div>
                  <div>
                    <span className="text-[9px] font-orbitron text-gray-500 uppercase">EMAIL ADRESS</span>
                    <p className="text-xs font-orbitron text-white mt-0.5">contact@phynexa.com</p>
                  </div>
                </a>

                <a
                  href="tel:+919944629672"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyber-purple/30 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-lg bg-cyber-purple/10 text-cyber-purple group-hover:bg-cyber-purple group-hover:text-white transition-colors duration-300">
                    <HiPhone size={20} />
                  </div>
                  <div>
                    <span className="text-[9px] font-orbitron text-gray-500 uppercase">DIRECT PHONE</span>
                    <p className="text-xs font-orbitron text-white mt-0.5">+91 9944629672</p>
                    <p className="text-xs font-orbitron text-white mt-0.5">+91 8668158063</p>
                  </div>
                </a>

                <a
                  href="#schedule"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyber-pink/30 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-lg bg-cyber-pink/10 text-cyber-pink group-hover:bg-cyber-pink group-hover:text-white transition-colors duration-300">
                    <HiCalendar size={20} />
                  </div>
                  <div>
                    <span className="text-[9px] font-orbitron text-gray-500 uppercase">MEETING SCHEDULE</span>
                    <p className="text-xs font-orbitron text-white mt-0.5">calendly.com/phynexa</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Interactive QR Code Handshake */}
            <div className="glass-card rounded-2xl p-6 md:p-8 flex items-center justify-between gap-6">
              <div className="max-w-[60%]">
                <span className="text-[10px] font-orbitron text-cyber-blue uppercase">
                  // SECURE HANDSHAKE
                </span>
                <h4 className="text-sm font-bold font-orbitron text-white uppercase mt-2">
                  Digital Card
                </h4>
                <p className="text-[10px] text-gray-400 font-outfit mt-2 leading-relaxed">
                  Scan to import PHYNEXA public keys, corporate configurations, and contact directory nodes instantly.
                </p>
              </div>

              {/* Holographic QR Code SVG */}
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl relative group-hover:border-cyber-cyan/50 transition-colors duration-300">
                <svg className="w-20 h-20 text-cyber-cyan" viewBox="0 0 100 100" fill="currentColor">
                  {/* Outer corners */}
                  <rect x="10" y="10" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="15" y="15" width="15" height="15" fill="currentColor" />
                  <rect x="65" y="10" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="70" y="15" width="15" height="15" fill="currentColor" />
                  <rect x="10" y="65" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="15" y="70" width="15" height="15" fill="currentColor" />

                  {/* Random QR code pixels inside */}
                  <rect x="42" y="10" width="6" height="18" />
                  <rect x="52" y="16" width="6" height="6" />
                  <rect x="42" y="32" width="12" height="6" />

                  <rect x="10" y="42" width="18" height="6" />
                  <rect x="22" y="52" width="6" height="6" />

                  <rect x="72" y="42" width="18" height="12" />
                  <rect x="65" y="58" width="12" height="6" />
                  <rect x="84" y="58" width="6" height="12" />

                  <rect x="42" y="65" width="6" height="25" />
                  <rect x="52" y="72" width="12" height="6" />
                  <rect x="52" y="84" width="18" height="6" />
                  <rect x="78" y="78" width="12" height="12" />
                </svg>
                {/* Laser scan line overlay */}
                <div className="absolute inset-x-0 h-[1.5px] bg-cyber-pink shadow-[0_0_8px_#ff007a] top-1/2 animate-bounce" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
