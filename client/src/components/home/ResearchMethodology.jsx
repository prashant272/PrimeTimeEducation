import React from 'react';

const ResearchMethodology = ({ SECTION_BG }) => {
  const items = [
    {
      title: "Data Collection & Screening",
      desc: "All nominations are collected through a structured submission process. Each entry undergoes an initial screening to ensure eligibility, completeness, and alignment with the award category.",
      number: "01",
    },
    {
      title: "Qualitative & Quantitative Analysis",
      desc: "Submissions are evaluated using a balanced research framework combining qualitative insights and quantitative metrics to assess performance, innovation, and impact.",
      number: "02",
    },
    {
      title: "Expert Jury Evaluation",
      desc: "An independent panel of industry experts, academicians, and subject-matter specialists reviews shortlisted entries to ensure unbiased and credible assessment.",
      number: "03",
    },
    {
      title: "Benchmarking & Industry Standards",
      desc: "Each nomination is benchmarked against industry best practices, regulatory standards, and emerging global trends to measure relevance and excellence.",
      number: "04",
    },
    {
      title: "Score Normalisation & Validation",
      desc: "Scores from multiple evaluators are normalised to eliminate bias and ensure consistency, fairness, and transparency across all categories.",
      number: "05",
    },
    {
      title: "Final Review & Approval",
      desc: "The final results undergo an internal audit and validation process before approval, ensuring accuracy, integrity, and credibility of the award outcomes.",
      number: "06",
    },
  ];

  return (
    <section className={`relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-24 ${SECTION_BG}`}>
      {/* Cinematic Studio Lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 right-[5%] w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px] opacity-15" />
        <div className="absolute bottom-1/4 left-[5%] w-[600px] h-[600px] bg-[#1a120c]/20 rounded-full blur-[140px] opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 mb-6 group hover:bg-[#d4af37]/20 transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#d4af37] uppercase">Academic Excellence</span>
          </div>
          
          <h2 className="text-2xl xs:text-4xl md:text-5xl font-black font-heading mb-4 sm:mb-8 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent drop-shadow-2xl">
            Research Methodology
          </h2>
          <div className="w-24 sm:w-40 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {items.map((item, index) => (
            <div key={index} className="relative group flex">
              {/* HIGH-FIDELITY GLASS TILE */}
              <div className="relative w-full flex flex-col min-h-[320px] sm:min-h-[350px] bg-gradient-to-br from-[#1a120c]/90 via-[#0a0a0a]/95 to-[#1c120d]/90 backdrop-blur-[45px] rounded-[2.5rem] p-8 sm:p-10 border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:shadow-[0_25px_60px_-10px_#d4af3722] group-hover:-translate-y-3 h-full">
                
                {/* 3D METALLIC STEP MEDALLION */}
                <div className="absolute -top-5 -left-5 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#f7e7a1] via-[#eed47c] to-[#c9a530] p-[1.5px] shadow-[0_10px_25px_rgba(212,175,55,0.4)] transform group-hover:rotate-[15deg] transition-transform duration-500 z-20">
                  <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-[#1a120c] to-[#2a1d12] flex items-center justify-center border border-white/10">
                    <span className="bg-gradient-to-br from-[#f7e7a1] via-[#eed47c] to-[#c9a530] bg-clip-text text-transparent font-black text-lg sm:text-xl">
                      {item.number}
                    </span>
                  </div>
                </div>

                {/* Internal Glow Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#d4af37]/10 to-transparent rounded-tr-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-[#ffeec3] to-[#d4af37] bg-clip-text text-transparent group-hover:from-white group-hover:to-[#ffeec3] transition-all duration-500 leading-tight uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-[#dbc6ad] leading-relaxed group-hover:text-white/90 transition-all duration-500 flex-grow font-medium">
                  {item.desc}
                </p>
                <div className="mt-8 h-[1px] w-14 bg-gradient-to-r from-[#d4af37] to-transparent opacity-40 group-hover:w-full transition-all duration-1000"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchMethodology;
