import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ videoRef, sectionRefs, events, handleNominateClick, getGridCols }) => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* ===== BACKGROUND VIDEO ===== */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none select-none">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 brightness-[0.7] contrast-[1.1]"
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/hero-poster.jpg"
        />

        {/* Dynamic Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-1" />
        <div className="absolute inset-0 bg-black/20 z-1" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 md:px-8 pt-20 pb-10 text-center">

        {/* Floating Premium Particles (Gold Dust) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none text-black">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: [0, 0.4, 0],
                y: [-20, -120],
                x: Math.sin(i) * 20
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute rounded-full bg-[#d4af37]/40 blur-[1px]"
              style={{
                width: Math.random() * 6 + 2 + 'px',
                height: Math.random() * 6 + 2 + 'px',
                left: `${Math.random() * 100}%`,
                bottom: '10%',
              }}
            />
          ))}
        </div>

        {/* HERO HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto mb-6 sm:mb-8"
        >
          <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-tight drop-shadow-2xl mb-4">
            <span className="text-white">Global </span>
            <span className="bg-gradient-to-r from-[#b2872d] via-[#d4af37] to-[#ffeec3] bg-clip-text text-transparent inline-block">
              Education
            </span>
            <span className="text-white"> Awards, 2026</span>
          </h1>

          <div className="bg-gradient-to-r from-transparent via-[#d4af37] to-transparent rounded-full -mb-2" />

          <p className="text-[10px] sm:text-xs md:text-sm text-[#d6cfc8] font-bold uppercase tracking-[0.15em] drop-shadow-lg opacity-90">
            Organised by <span className="text-[#d4af37]">Prime Time Research Media Pvt. Ltd.</span> – Global & Indian Award Events
          </p>
        </motion.div>

        {/* GLASSMORPHISM EVENT CARDS */}
        <div className="w-full max-w-6xl mx-auto">
          <div className={`grid gap-4 sm:gap-8 mb-3 ${getGridCols(events.length)}`}>
            {events.map((event, index) => (
              <motion.div
                key={event.title + index}
                ref={(el) => (sectionRefs.current[index] = el)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                {/* GLASS CARD */}
                <div className="relative h-full overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-1xl p-4 sm:p-5 transition-all duration-500 hover:bg-white/[0.07] hover:border-white/30 group-hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)]">

                  {/* Glowing Accent Top Right */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#d4af37]/10 blur-1xl rounded-full group-hover:bg-[#d4af37]/20 transition-all duration-700" />

                  {/* Icon Section */}
                  <div className="mb-4 flex justify-center scale-75 sm:scale-90">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#8a6d1d] p-[1px]">
                      <div className="w-full h-full rounded-xl bg-[#130606] flex items-center justify-center text-[#d4af37]">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-4.94-1.57c1.213-1.464 2.143-3.093 2.753-4.881m4.94-4.691a6.704 6.704 0 01-1.396 1.353m0 0a6.704 6.704 0 01-1.397-1.353m1.397 1.353c1.213 1.464 2.143 3.093 2.753 4.881m-2.753-4.881a6.704 6.704 0 00-1.397-1.353m1.397 1.353c-1.213-1.464-2.143-3.093-2.753-4.881m2.753 4.881V13l-4 4m4-4l4 4" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight group-hover:text-[#f5f0e1] transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-[#d6cfc8] text-xs sm:text-sm leading-relaxed mb-6 opacity-80 group-hover:opacity-100 transition-opacity line-clamp-2">
                    {event.desc}
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 bg-white/[0.05] p-1 rounded-lg border border-white/10 group-hover:border-[#d4af37]/30 transition-all duration-500">
                      <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-sm shadow-[0_0_10px_rgba(212,175,55,0.2)]">📅</div>
                      <span className="font-black text-white text-xs sm:text-sm tracking-wide uppercase">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/[0.05] p-1 rounded-lg border border-white/10 group-hover:border-[#d4af37]/30 transition-all duration-500">
                      <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-sm shadow-[0_0_10px_rgba(212,175,55,0.2)]">📍</div>
                      <span className="font-black text-white text-xs sm:text-sm tracking-wide">{event.place}</span>
                    </div>
                  </div>

                  {/* PREMIUM BUTTON */}
                  <button
                    onClick={handleNominateClick}
                    className="w-full relative py-3 rounded-lg font-black uppercase tracking-widest text-black text-xs sm:text-sm transition-all duration-300 transform group/btn overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#b2872d] via-[#d4af37] to-[#ffeec3] transition-transform duration-500 group-hover/btn:scale-110" />
                    <span className="relative z-10">Nominate Now</span>
                    <div className="absolute top-0 -left-[100%] w-full h-full bg-white/20 skew-x-[-20deg] group-hover/btn:left-[100%] transition-all duration-700" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
