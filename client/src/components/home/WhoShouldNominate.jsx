import React from 'react';

const WhoShouldNominate = ({ nomineeCategories, sectionRefs, HIGHLIGHT_BG }) => {
  return (
    <section className={`relative pt-16 sm:pt-24 pb-20 sm:pb-32 overflow-hidden ${HIGHLIGHT_BG}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[120px] opacity-10" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[#1a120c]/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 mb-6 group hover:bg-[#d4af37]/20 transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#d4af37] uppercase">Nomination Categories</span>
          </div>

          <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent drop-shadow-2xl">
            Who Should Nominate
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
          <p className="mt-8 text-[#dbc6ad] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We invite visionaries and institutions that are shaping the future of global education to join our prestigious circle of excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {nomineeCategories.map((item, index) => (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[25 + index] = el)}
              className="group relative h-full opacity-0 translate-y-8 transition-all duration-700"
            >
              <div className="relative h-full flex flex-col p-8 sm:p-10 bg-gradient-to-br from-[#1a120c]/90 via-[#0a0a0a]/95 to-[#1a120c]/90 backdrop-blur-2xl rounded-[2rem] border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_#d4af3733] hover:-translate-y-3">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#d4af37]/10 to-transparent rounded-tr-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  <div className="absolute inset-0 bg-[#d4af37]/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative text-5xl md:text-6xl filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                    {item.icon || '🏆'}
                  </div>
                </div>
                <div className="relative z-10 flex flex-col flex-grow">
                  <h3 className="text-xl sm:text-2xl font-black mb-4 bg-gradient-to-r from-[#ffeec3] to-[#d4af37] bg-clip-text text-transparent group-hover:from-white group-hover:to-[#ffeec3] transition-all duration-300 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#dbc6ad] leading-relaxed group-hover:text-white/90 transition-colors flex-grow">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-8 h-1 w-12 bg-gradient-to-r from-[#d4af37] to-transparent rounded-full group-hover:w-full transition-all duration-700 opacity-40 group-hover:opacity-100"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoShouldNominate;
