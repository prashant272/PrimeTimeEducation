import EditionYearSwitcher from "../../components/EditionYearSwitcher.jsx";
import { useState, useEffect } from "react";

// Initial set (will be supplemented by discovery)
const DEFAULT_IMAGES = [
  "/2024/1.jpg",
  "/2024/2.jpg",
  "/2024/3.jpg",
  "/2024/4.jpg",
  "/2024/5.jpg",
  "/2024/6.jpg",
  "/2024/7.jpg",
  "/2024/8.jpg",
  "/2024/9.jpg",
  "/2024/10.jpg",
  "/2024/11.jpg",
  "/2024/12.jpg",
  "/2024/13.jpg",
  "/2024/14.jpg",
  
];

// Helper to check if an image exists
const checkImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

// Banner slider with auto-scroll and modern UI
function BannerSlider({ images }) {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurr((c) => (c + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return <div className="h-[300px] w-full bg-black/20 animate-pulse rounded-[2.5rem] mb-12" />;

  function next() {
    setCurr((c) => (c + 1) % images.length);
  }
  function prev() {
    setCurr((c) => (c - 1 + images.length) % images.length);
  }

  return (
    <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-8 sm:mb-12 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl group ring-2 sm:ring-4 ring-[#ffe38c33]">
      <img
        src={images[curr]}
        className="w-full h-full object-cover scale-105 group-hover:scale-100 transition duration-1000"
        alt={`Banner ${curr + 1}`}
        loading="lazy"
      />
      {/* Luxe gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#18120888] via-transparent to-[#201207bb] pointer-events-none" />

      {/* Navigation Buttons */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-6 bg-black/30 hover:bg-[#ffd966] hover:text-[#23140f] text-[#ffe184] rounded-full p-2 sm:p-3 transition z-10 border border-[#ffeeb044] backdrop-blur-md opacity-0 group-hover:opacity-100"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 22 22" fill="none"><path d="M14.5 18.5L8 12L14.5 5.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-6 bg-black/30 hover:bg-[#ffd966] hover:text-[#23140f] text-[#ffe184] rounded-full p-2 sm:p-3 transition z-10 border border-[#ffeeb044] backdrop-blur-md opacity-0 group-hover:opacity-100"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 22 22" fill="none"><path d="M7.5 18.5L14 12L7.5 5.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-4 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to banner ${i + 1}`}
            onClick={() => setCurr(i)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${curr === i
              ? "bg-[#ffd966] w-6 sm:w-10 shadow-[0_0_15px_#ffd966]"
              : "bg-white/30 hover:bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

// Event Gallery - Scrolling Image Marquee
function EventGallery({ images }) {
  if (images.length === 0) return null;

  return (
    <div className="mb-16 sm:mb-24 overflow-hidden">
      <h3 className="text-2xl sm:text-3xl font-black text-[#fbd24e] mb-6 sm:mb-10 tracking-wide flex items-center gap-3 sm:gap-4">
        <span className="w-8 sm:w-12 h-1 bg-[#d4af37] rounded-full"></span>
        Event Highlights
      </h3>

      <div className="relative group">
        <div className="flex gap-4 sm:gap-6 animate-marquee hover:[animation-play-state:paused]">
          {/* Multiply for infinite effect */}
          {[...images, ...images, ...images].map((img, i) => (
            <div
              key={i}
              className="shrink-0 w-[240px] h-[160px] sm:w-[350px] sm:h-[240px] md:w-[400px] md:h-[260px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/10 shadow-xl transition-all duration-500 hover:scale-[1.05] hover:border-[#ffd966]/50"
            >
              <img
                src={img}
                alt={`Highlight ${i}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Edition2024() {
  const [images, setImages] = useState(DEFAULT_IMAGES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function discover() {
      const found = [];
      // Brute force check 1-40
      for (let i = 1; i <= 40; i++) {
        const url = `/2024/${i}.jpg`;
        const exists = await checkImage(url);
        if (exists) found.push(url);
      }
      if (found.length > 0) setImages(found);
      setLoading(false);
    }
    discover();
  }, []);

  return (
    <section className="bg-[#0f0a07] text-white min-h-screen pt-24 sm:pt-32 pb-16 px-4 sm:px-8 md:px-12 lg:px-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <EditionYearSwitcher currentYear={2024} />

        <BannerSlider images={images} />

        <EventGallery images={images} />

        <div className="space-y-16 sm:space-y-24">
          {/* Hero Content */}
          <header className="max-w-4xl text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-4 sm:mb-6">
              ✨ 12th Milestone Edition
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-[1.1] tracking-tight">
              Honoring Global <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd966] via-[#f7c53a] to-[#b2872d]">Healthcare Excellence</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#ffeab0a0] leading-relaxed max-w-2xl mx-auto sm:mx-0">
              The 2024 Global Healthcare Excellence Awards celebrated the visionaries, institutions, and clinical leaders who are redefining medical standards across the globe.
            </p>
          </header>

          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16">
            {/* Mission Section */}
            <section className="space-y-6 sm:space-y-8">
              <div className="bg-gradient-to-br from-white/5 to-transparent p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-white/10 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 blur-3xl rounded-full group-hover:bg-[#d4af37]/20 transition-colors" />
                <h2 className="text-2xl sm:text-3xl font-black text-[#ffe19f] mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
                  <span className="text-3xl sm:text-4xl">📌</span>
                  The 2024 Legacy
                </h2>
                <div className="text-base sm:text-lg text-[#fffaddcc] leading-relaxed space-y-4 sm:space-y-6">
                  <p>
                    Organized by <strong className="text-[#ffd966]">Prime Time Research Media Pvt. Ltd.</strong>, the 2024 ceremony served as a powerful platform for networking, knowledge exchange, and national recognition.
                  </p>
                  <p>
                    From specialized clinics to multi-specialty conglomerates, we identified leaders who prioritize patient safety, ethical practice, and technological advancement in an ever-evolving medical landscape.
                  </p>
                </div>
              </div>
            </section>

            {/* Impact Section */}
            <section className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                { label: "500+", sub: "Nominations Received" },
                { label: "40+", sub: "Award Categories" },
                { label: "100+", sub: "Hospitals Represented" },
                { label: "12th", sub: "Successful Edition" }
              ].map((item, i) => (
                <div key={i} className="bg-[#1a130d] p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-[#d4af37]/10 flex flex-col justify-center text-center group hover:border-[#d4af37]/30 transition-all">
                  <div className="text-3xl sm:text-4xl text-[#ffd966] font-black mb-1 sm:mb-2">{item.label}</div>
                  <div className="text-[10px] sm:text-xs font-bold text-[#ffeab080] uppercase tracking-widest leading-tight">{item.sub}</div>
                </div>
              ))}
            </section>
          </div>

          {/* Pillars Section */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: "🩺", title: "Clinical Excellence", desc: "Recognizing organizations that have demonstrated superior clinical outcomes and innovative surgical techniques." },
              { icon: "🏢", title: "Infrastructure Focus", desc: "Awards for state-of-the-art medical facilities and hospitals investing in modern diagnostic infrastructure." },
              { icon: "💡", title: "HealthTech Leaders", desc: "Honoring the integration of digital health, AI diagnostics, and telemedicine in patient care delivery." }
            ].map((pillar, i) => (
              <div key={i} className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors shadow-lg">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{pillar.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-[#ffd966] mb-2 sm:mb-3">{pillar.title}</h3>
                <p className="text-[#ffeab0a0] text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </section>

          {/* Process Section */}
          <section className="bg-gradient-to-r from-[#1a1308] to-[#140e0a] p-8 sm:p-12 rounded-[2rem] sm:rounded-[3.5rem] border border-[#d4af37]/20 shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#d4af37]/5 blur-[100px] rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-10 sm:mb-16 tracking-tight">
              Rigorous <span className="text-[#ffd966]">Evaluation</span> Architecture
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 relative z-10">
              {[
                { title: "Nomination", desc: "Open call for healthcare leaders and institutions." },
                { title: "Audit", desc: "Detailed performance analysis and benchmarking." },
                { title: "Review", desc: "Secondary feedback from industry peers." },
                { title: "Jury", desc: "Final verification by our elite board of experts." }
              ].map((step, i) => (
                <div key={i} className="text-center group">
                  <div className="text-4xl sm:text-5xl font-black text-[#d4af37]/20 mb-4 sm:mb-6 group-hover:text-[#d4af37]/40 transition-colors">0{i + 1}</div>
                  <h4 className="text-lg sm:text-xl font-bold text-[#ffd966] mb-2 sm:mb-3">{step.title}</h4>
                  <p className="text-xs sm:text-sm text-[#ffeab080] leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
