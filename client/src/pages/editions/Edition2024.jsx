import EditionYearSwitcher from "../../components/EditionYearSwitcher.jsx";
import { useState } from "react";

// Banner images - update with real images in production
const BANNERS = [
  "/images/2024/banner1.jpg",
  "/images/2024/banner2.jpg",
  "/images/2024/banner3.jpg",
];

// Videos for highlights
const VIDEOS = [
  {
    url: "/videos/2024/event_highlight_1.mp4",
    thumb: "/videos/2024/thumb1.jpg",
    title: "Award Ceremony Highlights",
  },
  {
    url: "/videos/2024/event_highlight_2.mp4",
    thumb: "/videos/2024/thumb2.jpg",
    title: "Healthcare Leader Speech",
  },
];

// Winner Data
const WINNER = {
  name: "Healthcare Leader of the Year",
  photo: "/images/jury2.jpeg",
  hospital: "Apollo Hospitals",
  overview: `Exemplary leadership that transformed healthcare delivery, improved patient outcomes, 
  and set new standards in operational excellence. Visionary commitment to quality, innovation, 
  and significant contribution to healthcare advancement.`,
};

// Participants Data
const PARTICIPANTS = [
  {
    name: "Dr. Priya Sharma",
    photo: "/images/jury3.jpeg",
    achievement: "Best Multispeciality Hospital",
    hospital: "Fortis Healthcare",
    desc: "World-class patient care and transformational leadership.",
  },
  {
    name: "Dr. Ayesha Malik",
    photo: "/images/participants/ayesha.jpg",
    achievement: "Excellence in Clinical Research",
    hospital: "Medanta",
    desc: "Breakthrough research driving medical innovation.",
  },
  {
    name: "Dr. Sameer Qureshi",
    photo: "/images/participants/sameer.jpg",
    achievement: "Innovation in Digital Healthcare",
    hospital: "AIIMS Delhi",
    desc: "Technology-driven healthcare solutions.",
  },
  {
    name: "Dr. Lina Fernandes",
    photo: "/images/participants/lina.jpg",
    achievement: "Women Healthcare Achiever",
    hospital: "Narayana Health",
    desc: "Outstanding contribution to public health.",
  },
];

// Banner slider with more elegant overlay and bigger navigation dots for a premium look
function BannerSlider() {
  const [curr, setCurr] = useState(0);

  function next() {
    setCurr((c) => (c + 1) % BANNERS.length);
  }
  function prev() {
    setCurr((c) => (c - 1 + BANNERS.length) % BANNERS.length);
  }

  return (
    <div className="relative w-full h-[340px] sm:h-[460px] mb-12 rounded-[2.5rem] overflow-hidden shadow-2xl group ring-4 ring-[#ffe38c33]">
      <img
        src={BANNERS[curr]}
        className="w-full h-full object-cover scale-110 group-hover:scale-105 transition duration-700"
        alt={`Banner ${curr + 1}`}
        loading="lazy"
      />
      {/* Luxe gradient overlay with gold shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#181208cc] via-[#ffeab024] to-[#201207b2] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/3 -top-10 w-60 h-32 bg-[#ffe38c76] rounded-full blur-3xl opacity-50"></div>
        <div className="absolute right-10 bottom-6 w-36 h-16 bg-[#d4af3788] rotate-12 rounded-full blur-2xl opacity-40"></div>
      </div>
      {/* Navigation Buttons */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute top-1/2 -translate-y-1/2 left-6 bg-white/20 hover:bg-[#ffd966]/90 hover:text-[#23140f] text-[#ffe184] rounded-full p-3.5 transition z-10 border-2 border-[#ffeeb088] shadow-2xl focus:outline-none scale-125 backdrop-blur-md"
      >
        <svg width="28" height="28" viewBox="0 0 22 22" fill="none"><path d="M14.5 18.5L8 12L14.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute top-1/2 -translate-y-1/2 right-6 bg-white/20 hover:bg-[#ffd966]/90 hover:text-[#23140f] text-[#ffe184] rounded-full p-3.5 transition z-10 border-2 border-[#ffeeb088] shadow-2xl focus:outline-none scale-125 backdrop-blur-md"
      >
        <svg width="28" height="28" viewBox="0 0 22 22" fill="none"><path d="M7.5 18.5L14 12L7.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
      {/* Navigation Dots - bigger with shadow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to banner ${i + 1}`}
            onClick={() => setCurr(i)}
            className={`w-5 h-5 rounded-full border-2 border-[#ffeca088] shadow-md duration-150 ${
              curr === i
                ? "bg-gradient-to-br from-[#ffe184] to-[#f7c53a] scale-125 ring-2 ring-[#ffc53096]"
                : "bg-[#342612]/90 opacity-60"
            } transition-all`}
          />
        ))}
      </div>
      {/* Optional: Decorative sparkles */}
      <div className="pointer-events-none absolute top-4 right-8 text-[#ffe184aa] text-2xl animate-pulse">✨</div>
    </div>
  );
}

// Video Gallery with neater controls and highlight
function VideoGallery() {
  const [active, setActive] = useState(0);

  if (!VIDEOS.length) return null;

  return (
    <div className="mb-14">
      <h3 className="text-2xl font-bold text-[#fbd24e] mb-3 tracking-wide flex items-center gap-3 drop-shadow-md">
        <span className="inline-block w-3 h-3 rounded-full bg-[#d4af37]"></span>
        <span className="drop-shadow glow">2024 Edition Highlights</span>
        <span className="text-[#ffebaa] text-lg">📹</span>
      </h3>
      <div className="flex flex-col md:flex-row md:gap-8 gap-6 items-stretch">
        <div className="w-full md:w-[470px] bg-gradient-to-br from-[#151108]/90 via-[#201406]/80 to-[#d4af3714] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#fff4de51] flex items-center">
          <video
            src={VIDEOS[active].url}
            controls
            poster={VIDEOS[active].thumb}
            className="w-full h-[250px] md:h-[320px] object-cover bg-black transition-all"
            style={{ background: "#181208" }}
          />
        </div>
        <div className="flex md:flex-col flex-row gap-3 md:gap-4 md:mt-0 mt-1">
          {VIDEOS.map((v, ix) => (
            <button
              key={ix}
              onClick={() => setActive(ix)}
              className={`flex items-center gap-3 rounded-xl border-2 px-3 py-2 min-w-[130px] max-w-[230px] shadow transition active:scale-95 ${
                active === ix
                  ? "border-[#ffd966] bg-[#2a1606]/95 ring-2 ring-[#ffe890cc] scale-105 shadow-lg"
                  : "border-[#ffe38c26] bg-[#2417119e] hover:border-[#ffd966bb] hover:shadow-lg"
              } focus:outline-none`}
            >
              <img
                src={v.thumb}
                alt={v.title}
                className="w-16 h-12 object-cover rounded-lg ring-2 ring-[#d4af3777] transition"
                style={{
                  filter: active === ix ? "none" : "grayscale(70%) brightness(0.65)",
                  opacity: active === ix ? 1 : 0.85,
                }}
              />
              <span className="text-sm text-[#ffeab0] font-semibold text-left line-clamp-2">{v.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Winner Card with gold shadow and aurora effect
function WinnerCard() {
  return (
    <div className="rounded-[2.25rem] bg-gradient-to-tr from-[#19110a]/90 via-[#3e2501]/70 to-[#23140f]/95 shadow-[0_6px_48px_0_#ffe38c22] border-4 border-[#ffe29e3b] p-8 flex flex-col items-center text-center relative group overflow-hidden z-10">
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-72 h-28 bg-[#ffe18436] blur-2xl opacity-80 rounded-full z-0" />
      <div className="absolute top-6 left-16 w-36 h-20 bg-[#ffd34b35] blur-xl rotate-12 rounded-full z-0" />
      <div className="relative z-10 mb-7 w-48 h-48 lg:w-44 lg:h-44 rounded-full overflow-hidden border-[10px] border-[#fff0cbec] shadow-2xl ring-2 ring-[#ffe18499]">
        <img
          src={WINNER.photo}
          alt={WINNER.name}
          loading="lazy"
          className="object-cover w-full h-full scale-110 hover:scale-100 transition-transform duration-300"
        />
      </div>
      <div className="text-2xl md:text-[1.65rem] font-extrabold bg-gradient-to-r from-[#fff8c9] via-[#ffe174] to-[#d2a21d] bg-clip-text text-transparent drop-shadow-lg">
        🏆 {WINNER.name}
      </div>
      <div className="font-bold text-[#fdc537] text-lg mb-1 mt-0.5 block drop-shadow">{WINNER.hospital}</div>
      <div className="text-[#fffbeee] text-[1.09rem] font-medium leading-relaxed drop-shadow max-w-xs mx-auto">{WINNER.overview}</div>
      <span className="absolute bottom-4 right-5 text-lg text-[#ffe184bb] animate-bounce">✨</span>
    </div>
  );
}

// Participants grid with new badge style and more elegant participant layout
function ParticipantsGrid() {
  return (
    <div>
      <h3 className="text-xl text-[#fdde4e] font-extrabold mb-6 ml-2 tracking-wider flex items-center gap-2">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#d4af37]"></span>
        <span>👥 Other Winners & Participants</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PARTICIPANTS.map((p, idx) => (
          <div
            key={p.name + idx}
            className="flex flex-col items-center gap-2.5 px-5 pt-7 pb-6 rounded-2xl bg-gradient-to-br from-[#251a12]/70 to-[#ffe5a437] border-2 border-[#ffe38c30] shadow-2xl group hover:shadow-[0_8px_36px_0_#ffe18453] transition relative hover:border-[#ffd966] min-h-[320px]"
          >
            <span className="absolute -top-2 right-4 text-[1.08rem] font-bold px-3 py-1 shadow ring-2 ring-[#fdde4e88] rounded-2xl bg-gradient-to-br from-[#ffeeb0c8] to-[#e3c57d5d] text-[#ae800f] tracking-wide uppercase scale-95">
              {idx === 0 ? "2nd" : idx === 1 ? "3rd" : `${idx+2}th`}
            </span>
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#ffd34bcc] shadow-lg mb-1.5 bg-[#19110a]/90">
              <img
                src={p.photo}
                alt={p.name}
                className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="font-extrabold text-[#ffeab2] text-[1.22rem] text-center">{p.name}</div>
            <div className="text-[1.01rem] font-semibold text-[#f6ca36] mb-1 tracking-wide text-center">{p.achievement}</div>
            <div className="text-xs text-[#ffeabbbd] font-semibold mb-0.5">{p.hospital}</div>
            <div className="text-xs text-[#c9a947d5] italic text-center">{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Edition2024() {
  return (
    <section className="bg-gradient-to-br from-[#241305] via-[#23140f] to-[#1e1106] text-white min-h-screen py-16 px-2 sm:px-6 font-inter">
      <div className="max-w-6xl mx-auto">
        <EditionYearSwitcher currentYear={2024} />

        {/* Hero Banner */}
        <BannerSlider />

        {/* Video Gallery */}
        <VideoGallery />

        <div className="flex flex-col lg:flex-row gap-14 mt-7">
          {/* LEFT: Winner & Participants */}
          <aside className="lg:w-[41%] flex flex-col gap-12">
            <WinnerCard />
            <ParticipantsGrid />
          </aside>

          {/* RIGHT: 2024 Edition Content */}
          <main className="flex-1">
            {/* Hero Header */}
            <header className="mb-14">
              <div className="text-[0.85rem] uppercase tracking-widest text-[#f9de9c]/80 font-extrabold mb-4 flex items-center gap-3">
                <span className="text-2xl">🌍</span> <span>2nd Edition</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-sm">
                <span className="text-[#fffce6]">Global Healthcare Excellence Awards</span> &nbsp;
                <br />
                <span className="text-[#fff188] drop-shadow-md">India Excellence Awards</span>
                <span className="text-[#d4af37] font-bold block text-2xl tracking-widest mt-2 mb-1">2024</span>
              </h1>
              <div className="text-lg text-[#efd680] font-semibold bg-gradient-to-r from-[#1a1308]/65 to-[#2b1d0a]/65 px-7 py-3 rounded-3xl border-2 border-[#ffe38c41] shadow">
                <span className="mr-2">🌟</span> A Prestigious Celebration of Excellence, Innovation & Leadership
              </div>
            </header>

            {/* About Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-black text-[#ffe19f] mb-6 tracking-tight flex gap-3 items-center">
                <span className="text-3xl">📌</span>
                <span>About the 2024 Edition</span>
              </h2>
              <div className="text-lg text-[#fffaddcb] leading-relaxed space-y-4">
                <p>
                  Organised by <strong>Prime Time Research Media Pvt. Ltd.</strong>, the 2024 edition marked yet another milestone in recognising excellence across healthcare and allied sectors.
                </p>
                <p>
                  This grand celebration brought together renowned healthcare leaders, hospitals, medical professionals, innovators, and institutions making remarkable impact through quality care, innovation, leadership, and ethical practices.
                </p>
              </div>
            </section>

            {/* Awards Overview */}
            <section className="mb-14">
              <h2 className="text-xl font-black text-[#d4af37] mb-9 flex items-center gap-3">
                <span className="w-3 h-3 inline-block rounded-full bg-[#d4af37]"></span>
                🩺 Global Healthcare Excellence Awards 2024
              </h2>
              <div className="grid md:grid-cols-2 gap-9 mb-6">
                <div className="space-y-3 text-[#ffeab8ed]">
                  <p className="font-bold">Honouring:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Hospitals delivering world-class patient care</li>
                    <li>Healthcare leaders driving transformational change</li>
                    <li>Medical professionals excelling in clinical outcomes</li>
                    <li>Institutions adopting innovation & ethical standards</li>
                  </ul>
                </div>
                <div className="space-y-3 text-[#ffeab8ed]">
                  <p className="font-bold">Key Domains:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Hospital management & clinical research</li>
                    <li>Digital health & diagnostics</li>
                    <li>Preventive healthcare & community outreach</li>
                  </ul>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#fff188] mb-3 mt-7 flex items-center gap-2">
                <span className="text-2xl">🇮🇳</span>
                India Excellence Awards 2024
              </h3>
              <div className="rounded-3xl bg-[#1f170b]/60 border-2 border-[#ffe28c45] p-7 shadow-md flex flex-col gap-3">
                <p className="text-[#ffeab3eb] mb-3 font-semibold">Recognising excellence across:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-base">
                  {[
                    "Healthcare",
                    "Education",
                    "Business",
                    "Real Estate",
                    "Startups",
                    "Leadership"
                  ].map((item, i) => (
                    <span
                      key={item}
                      className="bg-gradient-to-br from-[#ffeab045] to-[#31210621] px-3 py-1 rounded-full border border-[#d4af37]/40 font-semibold text-[#fff4d7] text-[1em] shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Award Categories with more style */}
            <section className="mb-12">
              <h2 className="text-xl font-extrabold text-[#ffe19f] mb-7 tracking-tight flex gap-3 items-center">
                <span className="text-2xl">🏆</span>
                <span>Award Categories – <span className="text-[#ffe184]">2024 Highlights</span></span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Healthcare Leader of the Year",
                  "Best Multispeciality Hospital",
                  "Excellence in Clinical Research",
                  "Innovation in Digital Healthcare",
                  "Women Healthcare Achiever",
                  "Best Hospital Administrator",
                  "Outstanding Contribution to Public Health",
                  "Emerging Healthcare Brand"
                ].map((category, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-tr from-[#251a12]/65 to-[#ffe5a430] border-2 border-[#ffe38c25] hover:border-[#d4af37]/70 transition-all hover:scale-[1.025] shadow"
                  >
                    <span className="text-3xl group-hover:scale-110 transition font-semibold text-[#ffd966] drop-shadow-sm">
                      {String.fromCharCode(0x2460 + idx)}
                    </span>
                    <span className="font-bold text-[#ffeab2] text-lg">{category}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Selection Process */}
            <div className="rounded-3xl bg-gradient-to-r from-[#1a1308]/85 via-[#2b1e0f]/68 to-[#1f170b]/82 border-l-8 border-[#d4af37da] p-9 mb-12 shadow-2xl">
              <h3 className="text-xl font-black text-[#ffd966] mb-6 flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-[#ffe184]"></span>
                🧠 Selection & Evaluation Process
              </h3>
              <div className="grid md:grid-cols-2 gap-8 text-[#ffeab8f6]">
                <ul className="list-none space-y-3 text-base font-medium">
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffd966] font-bold min-w-[25px] text-lg drop-shadow">01</span>
                    <span>Open nominations & research-based identification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffd966] font-bold min-w-[25px] text-lg drop-shadow">02</span>
                    <span>Industry analysis & performance benchmarking</span>
                  </li>
                </ul>
                <ul className="list-none space-y-3 text-base font-medium">
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffd966] font-bold min-w-[25px] text-lg drop-shadow">03</span>
                    <span>Evaluation on innovation, leadership & impact</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffd966] font-bold min-w-[25px] text-lg drop-shadow">04</span>
                    <span>Independent jury panel review</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Key Highlights - more visually appealing */}
            <section>
              <h2 className="text-xl font-extrabold text-[#fff188] mb-7 flex items-center gap-3">
                <span className="text-2xl">🌟</span>
                <span>Key Highlights of 2024 Edition</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-[#ffeab3fa]">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-5 rounded-xl bg-gradient-to-br from-[#ffe29e18] to-[#d4af3705] border border-[#ffe28c25] shadow hover:scale-[1.019] transition cursor-default">
                    <span className="text-[#ffd966] text-2xl mt-0.5">👥</span>
                    <span className="font-semibold">Leading healthcare brands participation</span>
                  </div>
                  <div className="flex items-start gap-3 p-5 rounded-xl bg-gradient-to-br from-[#ffe29e18] to-[#d4af3705] border border-[#ffe28c25] shadow hover:scale-[1.019] transition cursor-default">
                    <span className="text-[#ffd966] text-2xl mt-0.5">🎤</span>
                    <span className="font-semibold">High-profile award ceremony with dignitaries</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-5 rounded-xl bg-gradient-to-br from-[#ffe29e18] to-[#d4af3705] border border-[#ffe28c25] shadow hover:scale-[1.019] transition cursor-default">
                    <span className="text-[#ffd966] text-2xl mt-0.5">📈</span>
                    <span className="font-semibold">Enhanced media visibility for winners</span>
                  </div>
                  <div className="flex items-start gap-3 p-5 rounded-xl bg-gradient-to-br from-[#ffe29e18] to-[#d4af3705] border border-[#ffe28c25] shadow hover:scale-[1.019] transition cursor-default">
                    <span className="text-[#ffd966] text-2xl mt-0.5">✨</span>
                    <span className="font-semibold">Focus on innovation & patient-centric care</span>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </section>
  );
}
