import React from 'react';

const WhyEnter = ({ sectionRefs, HIGHLIGHT_BG, getGridCols }) => {
  const items = [
    {
      title: "National & Global Recognition",
      desc: "Gain prestigious recognition across the education sector and position your institution among the most trusted and respected academic leaders.",
      icon: "🌟",
    },
    {
      title: "Independent Jury Validation",
      desc: "All nominations are evaluated by an eminent and independent jury panel, ensuring credibility, transparency, and unbiased assessment.",
      icon: "⚖️",
    },
    {
      title: "Showcase Innovation & Impact",
      desc: "Highlight your pedagogical innovations, academic achievements, and measurable student impact before policymakers and industry leaders.",
      icon: "💡",
    },
    {
      title: "Strengthen Brand Authority",
      desc: "Enhance institutional reputation and reinforce trust among parents, students, partners, and the broader educational ecosystem.",
      icon: "🏆",
    },
    {
      title: "Benchmark Against Industry Leaders",
      desc: "Measure your performance against industry best practices, global standards, and emerging educational trends.",
      icon: "📊",
    },
    {
      title: "Future-Ready Positioning",
      desc: "Demonstrate your organisation's readiness for future challenges through leadership, scalability, and sustainable growth.",
      icon: "🚀",
    },
  ];

  return (
    <section className={`relative pt-6 pb-16 md:pb-24 overflow-hidden ${HIGHLIGHT_BG}`}>
      {/* Cinematic Studio Lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[140px] opacity-20" />
        <div className="absolute bottom-[10%] left-[5%] w-[700px] h-[700px] bg-[#1a120c]/20 rounded-full blur-[150px] opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div
          ref={(el) => (sectionRefs.current[4] = el)}
          className="opacity-0 transform translate-y-8 transition-all duration-700 text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 mb-6 group hover:bg-[#d4af37]/20 transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#d4af37] uppercase">Elite Recognition</span>
          </div>

          <h2 className="text-2xl xs:text-4xl md:text-5xl font-extrabold font-heading mb-4 sm:mb-7 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent drop-shadow-2xl">
            Why Enter Global & Indian Education Awards 2026
          </h2>
          <div className="w-24 sm:w-40 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
        </div>

        <div className={`w-full grid ${getGridCols(2)} md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 md:gap-12`}>
          {items.map((item, index) => (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[5 + index] = el)}
              className="group relative opacity-0 transform translate-y-8 transition-all duration-700 flex backdrop-blur-[2px]"
            >
              {/* ULTRA-GLASS TILE */}
              <div className="relative bg-gradient-to-br from-[#1a120c]/90 via-[#0a0a0a]/95 to-[#1c120d]/90 backdrop-blur-[45px] rounded-[2.5rem] flex flex-col flex-grow p-8 sm:p-12 border border-[#d4af37]/30 group-hover:border-[#d4af37]/80 transition-all duration-700 shadow-[0_20px_60px_-15px_#d4af3722] group-hover:shadow-[0_25px_70px_-10px_#d4af3744] hover:-translate-y-3 overflow-hidden">

                {/* Internal Glow Effect - Always Visible but Subtle */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#d4af37]/15 to-transparent rounded-tr-[2.5rem] opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* ICON MEDALLION */}
                <div className="relative mb-8">
                  {/* Aura always visible */}
                  <div className="absolute inset-0 bg-[#d4af37]/20 blur-2xl rounded-full scale-150 opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#d4af37]/20 to-[#1a120c] border border-[#d4af37]/40 flex items-center justify-center text-4xl sm:text-5xl transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700 shadow-2xl">
                    <span className="filter drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]">
                      {item.icon}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col flex-grow">
                  <h3 className="text-xl sm:text-2xl font-black mb-4 bg-gradient-to-r from-[#ffeec3] to-[#d4af37] bg-clip-text text-transparent group-hover:from-white group-hover:to-[#ffeec3] transition-all duration-500 leading-tight tracking-tight uppercase">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#dbc6ad] leading-relaxed group-hover:text-white/90 transition-all duration-500 flex-grow font-medium">
                    {item.desc}
                  </p>
                </div>

                {/* Decorative Progress bar - Always Visible */}
                <div className="mt-8 h-[1px] w-20 bg-gradient-to-r from-[#d4af37] to-transparent rounded-full group-hover:w-full transition-all duration-1000 opacity-60"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyEnter;
