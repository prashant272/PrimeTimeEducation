import React, { useState } from 'react';

const FAQSection = ({ homeFaqs, HIGHLIGHT_BG }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`relative pt-12 sm:pt-16 pb-20 sm:pb-28 overflow-hidden ${HIGHLIGHT_BG}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-0 w-64 md:w-96 h-64 md:h-96 bg-[#d4af37]/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#c62828]/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-2xl xs:text-4xl md:text-5xl font-extrabold font-heading mb-4 sm:mb-7 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-500">
            Frequently Asked Questions
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {homeFaqs.map((faq, index) => (
            <div
              key={index}
              className="group relative bg-[#1a110a]/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-300 overflow-hidden shadow-2xl hover:shadow-[0_8px_32px_-8px_#d4af3744]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-6 focus:outline-none"
              >
                <span className="text-lg sm:text-xl font-black text-[#ffeec3] group-hover:text-white transition-colors uppercase tracking-tight">
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-[#d4af37]/40 flex items-center justify-center transition-transform duration-500 ${openIndex === index ? 'rotate-180 bg-[#d4af37] text-black' : 'text-[#d4af37]'}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div className={`transition-all duration-500 ease-in-out px-6 sm:px-8 overflow-hidden ${openIndex === index ? 'max-h-96 pb-6 sm:pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="w-full h-px bg-gradient-to-r from-[#d4af37]/30 to-transparent mb-6 sm:mb-8"></div>
                <p className="text-base sm:text-lg text-[#dbc6ad] leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
