import React from 'react';

const CTASection = ({ sectionRefs, PRIMARY_BG, handleNominateClick }) => {
  return (
    <section className={`relative pt-16 sm:pt-24 md:pt-32 pb-20 sm:pb-32 md:pb-40 text-center overflow-hidden ${PRIMARY_BG}`}>
      {/* Cinematic Studio Background & Spotlights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#d4af37]/5 rounded-full blur-[180px] opacity-20" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1a120c]/20 rounded-full blur-[150px] opacity-15" />
      </div>

      <div
        ref={(el) => (sectionRefs.current[21] = el)}
        className="relative z-10 opacity-0 transform translate-y-8 transition-all duration-1000 max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6"
      >
        {/* GRAND CTA TILE */}
        <div className="relative bg-gradient-to-br from-[#1a120c]/80 via-[#0a0a0a]/95 to-[#1c120d]/80 backdrop-blur-[45px] rounded-[3rem] sm:rounded-[4rem] p-10 sm:p-16 md:p-20 border border-[#d4af37]/20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden group">
          
          {/* Internal Glow Effect */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-[100px] opacity-50 transition-opacity duration-1000 group-hover:opacity-100" />
          
          {/* 3D METALLIC TROPHY ICON */}
          <div className="relative mb-10 flex justify-center">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#f1d46b] to-[#b6932f] p-[1.5px] shadow-[0_15px_35px_rgba(212,175,55,0.3)] transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
               <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-[#1a120c] to-[#2a1d12] flex items-center justify-center text-3xl sm:text-4xl border border-white/5">
                 🏆
               </div>
            </div>
            {/* Reflection Line */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#d4af37]/20 blur-3xl rounded-full scale-150 animate-pulse" />
          </div>

          {/* CHAMPAGNE TYPOGRAPHY */}
          <h2 className="text-2xl xs:text-3xl md:text-5xl font-black font-heading mb-6 md:mb-10 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent leading-tight tracking-tight drop-shadow-2xl">
            Get the Recognition <br className="hidden sm:block" /> You and Your Team Deserve
          </h2>

          <div className="w-24 sm:w-48 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-8 sm:mb-12 opacity-60"></div>

          <p className="mb-10 sm:mb-16 text-[#e6ddcc] text-base sm:text-lg md:text-xl font-medium tracking-wide">
            Nomination Extended Deadline – <br className="sm:hidden" />
            <span className="font-black bg-gradient-to-r from-[#f7e7a1] to-[#d4af37] bg-clip-text text-transparent px-2">
              10 March 2026
            </span>
          </p>

          {/* ELITE BUTTON RENDER */}
          <div className="relative inline-block">
             {/* Glow Base behind button */}
             <div className="absolute inset-0 bg-[#d4af37]/30 blur-3xl rounded-full scale-[2.5] opacity-40 animate-pulse"></div>
             
             <button
              type="button"
              onClick={handleNominateClick}
              className="relative overflow-hidden group/btn rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7e7a1] to-[#b6932f] text-[#050505] font-black px-10 sm:px-16 md:px-20 py-4 sm:py-6 text-lg sm:text-xl transition-all duration-500 tracking-[0.1em] uppercase hover:scale-110 hover:shadow-[0_15px_50px_-5px_#d4af3780] hover:brightness-110 focus:outline-none z-10 border-b-4 border-black/20"
            >
              <span className="relative z-10 flex items-center gap-3">
                Nominate Now
                <span className="text-xl sm:text-2xl">⚡</span>
              </span>
              
              {/* Dynamic Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 pointer-events-none skew-x-[30deg]"></div>
            </button>
          </div>

          {/* Final Footer Subtext */}
          <div className="mt-12 sm:mt-16 flex items-center justify-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-700">
             <span className="h-[1px] w-8 sm:w-12 bg-white/20"></span>
             <span className="text-[10px] sm:text-xs font-bold tracking-[0.4em] text-[#d4af37] uppercase">Global Excellence Standard</span>
             <span className="h-[1px] w-8 sm:w-12 bg-white/20"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
