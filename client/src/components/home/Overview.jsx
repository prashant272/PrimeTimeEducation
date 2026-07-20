import React from 'react';
import { motion } from 'framer-motion';

const Overview = ({ handleNominateClick, SECTION_BG }) => {
  return (
    <section className={`relative py-16 lg:py-24 overflow-hidden ${SECTION_BG} border-b border-white/5`}>
      {/* Premium Deep Brown Ornaments */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[5%] left-[-5%] w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[130px] opacity-20" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-[#1a120c]/20 rounded-full blur-[140px] opacity-15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* ==== LEFT: OVERVIEW (Col 7) ==== */}
          <div className="lg:col-span-7 space-y-10 flex flex-col justify-center">
            
            {/* Elite Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-[#d4af37]/30 transition-all duration-500 group/badge w-fit"
            >
              <div className="relative">
                <svg className="w-4 h-4 text-[#d4af37] group-hover/badge:rotate-12 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
                <div className="absolute inset-0 bg-[#d4af37]/40 blur-lg rounded-full animate-ping"></div>
              </div>
              <span className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#d6cfc8] uppercase">ABOUT THE AWARDS</span>
            </motion.div>

            {/* Main Header Wrapper */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
                <span className="text-[#f8f8f8] block lg:inline">Overview of </span>
                <span className="bg-gradient-to-r from-[#f1d46b] via-[#d4af37] to-[#8a6d1d] bg-clip-text text-transparent">Global & Indian </span>
                <span className="text-[#f8f8f8]">Education Awards 2026</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#d4af37] to-transparent rounded-full shadow-[0_0_15px_#d4af37]" />
            </motion.div>

            {/* High-End Overview Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37]/20 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-1000 rounded-[2.5rem]" />
              <div className="relative bg-white/[0.04] backdrop-blur-[45px] rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden hover:border-[#d4af37]/30 transition-all duration-700 p-8 lg:p-12">
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-20 h-20 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
                </div>

                <div className="relative space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#8a6d1d] p-[1.5px] shadow-[0_10px_20px_rgba(212,175,55,0.2)]">
                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#050505] to-[#121212] flex items-center justify-center text-[#d4af37]">
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-black text-[#f8f8f8] leading-tight mb-2">
                        Global Education Excellence Awards, 2026
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-[1px] bg-[#d4af37]" />
                        <p className="text-[#d4af37] font-black uppercase text-[10px] tracking-[0.2em]">
                          Achieving Excellence in Education
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#d6cfc8] leading-relaxed text-lg font-medium opacity-90">
                    The <span className="font-bold text-[#f8f8f8]">Global Education Awards, 2026</span> recognize significant contributions in the academic sector, showcasing the highest goals through <span className="text-[#d4af37] italic">innovation, pedagogy, and leadership.</span>
                    <br /><br />
                    This event serves as a converging point for the industry's elite – a celebration of reputation, dedication, and exemplary academic service.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-4">
                    {['Excellence', 'Innovation', 'Leadership'].map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest bg-white/5 text-[#d4af37] border border-white/10 hover:bg-[#d4af37]/10 hover:border-[#d4af37]/30 transition-all duration-300 transform hover:-translate-y-1"
                      >{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ==== RIGHT: KEY DATES (Col 5) ==== */}
          <div className="lg:col-span-5 space-y-10 flex flex-col justify-center">
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
                <span className="text-[#f8f8f8]">Key </span>
                <span className="bg-gradient-to-r from-[#f1d46b] via-[#d4af37] to-[#8a6d1d] bg-clip-text text-transparent">Dates</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#d4af37] to-transparent rounded-full shadow-[0_0_15px_#d4af37]" />
            </motion.div>

            <div className="space-y-6">
              {[
                { title: 'Award Ceremony – Delhi', date: '4 Oct 2026', flag: '🇮🇳' },
                { title: 'Award Ceremony – Dubai', date: '19 Oct 2026', flag: '🇦🇪' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  className="relative group"
                >
                  <div className="relative bg-white/[0.04] backdrop-blur-[40px] rounded-2xl border border-white/10 p-6 flex items-center gap-6 transition-all duration-500 hover:bg-white/[0.08] hover:border-[#d4af37]/30 shadow-xl overflow-hidden group-hover:-translate-x-2">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d4af37]" />
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl shadow-inner border border-white/5">
                      {item.flag}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-[#f8f8f8] leading-tight mb-1">{item.title}</h3>
                      <div className="flex items-center gap-2 text-[#d4af37]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /></svg>
                        <span className="text-sm font-black uppercase tracking-wider">{item.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* CTA Block Redesign */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="relative group mt-4"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37]/30 to-[#c62828]/20 opacity-20 group-hover:opacity-40 blur-2xl transition-all duration-1000 rounded-3xl" />
              <div className="relative bg-gradient-to-br from-[#1a120c]/90 to-[#020202]/98 backdrop-blur-[45px] rounded-3xl border border-[#d4af37]/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-10 text-center overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-block p-3 rounded-full bg-[#d4af37]/10 mb-5 border border-[#d4af37]/20">
                    <span className="text-2xl animate-pulse inline-block">✨</span>
                  </div>
                  <h4 className="text-2xl font-black text-[#f8f8f8] mb-3 uppercase tracking-tight">Be Part of History</h4>
                  <p className="text-[#d6cfc8] leading-relaxed mb-8 opacity-80 text-sm font-medium">
                    Submit your nomination before the deadline and join the ranks of educational innovators globally.
                  </p>
                  
                  {/* Sync Premium Button Style */}
                  <button
                    onClick={handleNominateClick}
                    className="w-full relative py-4 rounded-xl font-black uppercase tracking-[0.2em] text-black text-[10px] sm:text-xs transition-all duration-500 transform group/btn overflow-hidden shadow-[0_5px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.5)] active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#b2872d] via-[#d4af37] to-[#ffeec3] transition-transform duration-700 group-hover/btn:scale-125" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Nominate Now
                      <svg className="w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute top-0 -left-[100%] w-full h-full bg-white/30 skew-x-[-30deg] group-hover/btn:left-[100%] transition-all duration-1000" />
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
