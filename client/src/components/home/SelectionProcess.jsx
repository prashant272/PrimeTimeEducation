import React from 'react';

const SelectionProcess = ({ SECTION_BG }) => {
  const steps = [
    {
      title: "Step 1: Application submission",
      desc: "Eligible colleges, universities, and individual educators submit their nomination forms along with required academic and operational credentials.",
      icon: "📝",
    },
    {
      title: "Step 2: Primary Screening",
      desc: "Our internal research team reviews each application for authenticity, completeness, and adherence to the award criteria.",
      icon: "🔍",
    },
    {
      title: "Step 3: Jury Review & Assessment",
      desc: "Shortlisted entries are forwarded to an independent jury of industry experts for in-depth evaluation and final selection.",
      icon: "🏆",
    },
    {
      title: "Step 4: Final Announcement",
      desc: "Winners are notified and officially recognised at a prestigious award ceremony, gaining global visibility and leadership status.",
      icon: "📣",
    },
  ];

  return (
    <section className={`relative pt-16 sm:pt-20 pb-20 sm:pb-28 overflow-hidden ${SECTION_BG}`}>
      {/* Cinematic Studio Lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 right-[2%] w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] opacity-15" />
        <div className="absolute bottom-1/4 left-[2%] w-[450px] h-[450px] bg-[#1a120c]/15 rounded-full blur-[130px] opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 mb-6 group hover:bg-[#d4af37]/20 transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#d4af37] uppercase">Elite Journey</span>
          </div>

          <h2 className="text-2xl xs:text-4xl md:text-5xl font-black font-heading mb-4 sm:mb-8 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent drop-shadow-2xl">
            Our Selection Process
          </h2>
          <div className="w-24 sm:w-40 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {steps.map((step, index) => (
            <div key={index} className="group relative flex">
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 left-[65%] w-full h-[1px] bg-gradient-to-r from-[#d4af37]/40 via-[#d4af37]/10 to-transparent z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-1000"></div>
              )}
              
              {/* HIGH-FIDELITY GLASS TILE */}
              <div className="relative w-full flex flex-col min-h-[350px] bg-gradient-to-br from-[#1a120c]/90 via-[#0a0a0a]/95 to-[#1c120d]/90 backdrop-blur-[45px] rounded-[2.5rem] p-8 sm:p-10 border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:shadow-[0_25px_60px_-10px_#d4af3722] group-hover:-translate-y-3 h-full overflow-hidden">
                
                {/* 3D METALLIC MEDALLION ICON */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#f1d46b] to-[#b6932f] p-[1.5px] shadow-[0_15px_30px_rgba(212,175,55,0.4)] mb-8 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-700 border border-[#ffeec3]/20">
                  <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-[#1a120c] to-[#2a1d12] flex items-center justify-center text-3xl sm:text-4xl border border-white/5 relative">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                    {step.icon}
                    {/* Step Badge */}
                    <div className="absolute -top-3 -right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#eed47c] to-[#d4af37] text-black text-[10px] sm:text-xs font-black flex items-center justify-center border-2 border-[#1a0f0a] shadow-[0_5px_15px_rgba(212,175,55,0.5)]">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Internal Glow Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#d4af37]/10 to-transparent rounded-tr-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative group-hover:-translate-y-1 transition-transform duration-500 flex flex-col flex-grow">
                  <h3 className="text-xl sm:text-2xl font-black mb-4 bg-gradient-to-r from-[#ffeec3] to-[#d4af37] bg-clip-text text-transparent group-hover:from-white group-hover:to-[#ffeec3] transition-all duration-500 leading-tight uppercase tracking-tight">
                    {step.title.split(': ')[1] || step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#dbc6ad] leading-relaxed group-hover:text-white/90 transition-all duration-500 flex-grow font-medium">
                    {step.desc}
                  </p>
                  <div className="mt-8 h-[1px] w-14 bg-gradient-to-r from-[#d4af37] to-transparent opacity-40 group-hover:w-full transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectionProcess;
