import EditionYearSwitcher from "../../components/EditionYearSwitcher.jsx";
import { useState } from "react";

// Dummy images for slider - replace with real banner image URLs in production
const BANNERS = [
  "/images/2026/banner1.jpg",
  "/images/2026/banner2.jpg",
  "/images/2026/banner3.jpg",
];

// Sample videos for 2026 event highlights
const VIDEOS = [
  {
    url: "/videos/2026/event_highlight_1.mp4",
    thumb: "/videos/2026/thumb1.jpg",
    title: "Award Ceremony Highlights",
  },
  {
    url: "/videos/2026/event_highlight_2.mp4",
    thumb: "/videos/2026/thumb2.jpg",
    title: "Chief Guest Speech",
  },
];

// Winner & Participants Data (normally from editions.js or API)
const WINNER = {
  name: "Dr. Rajesh Kumar",
  photo: "/images/jury2.jpeg",
  award: "Best Multispeciality Hospital",
  hospital: "Apollo Hospitals",
  overview: `Dr. Rajesh Kumar's visionary leadership at Apollo Hospitals set new benchmarks of excellence in multispeciality care. Under his guidance, the hospital achieved record patient satisfaction, cutting-edge research in medical science, and international recognition for quality and compassionate care.`,
};

const PARTICIPANTS = [
  {
    name: "Dr. Priya Sharma",
    photo: "/images/jury3.jpeg",
    achievement: "Best Doctor of the Year",
    hospital: "Fortis Healthcare",
    desc: "Renowned for patient-centered approach and innovative practices in internal medicine.",
  },
  {
    name: "Dr. Ayesha Malik",
    photo: "/images/participants/ayesha.jpg",
    achievement: "Outstanding Young Surgeon",
    hospital: "Medanta",
    desc: "Recognized for landmark minimally invasive procedures and outreach camps.",
  },
  {
    name: "Dr. Sameer Qureshi",
    photo: "/images/participants/sameer.jpg",
    achievement: "Innovator in Public Health",
    hospital: "AIIMS Delhi",
    desc: "Transformative work in rural outreach, preventive care, and health technology.",
  },
  {
    name: "Dr. Lina Fernandes",
    photo: "/images/participants/lina.jpg",
    achievement: "Excellence in Pediatrics",
    hospital: "Narayana Health",
    desc: "Fighting childhood diseases and extensive charity work.",
  },
  // Add more as needed...
];

// Minimal slider logic (can swap for Swiper or Splide in actual prod)
function BannerSlider() {
  const [curr, setCurr] = useState(0);
  function next() {
    setCurr((c) => (c + 1) % BANNERS.length);
  }
  function prev() {
    setCurr((c) => (c - 1 + BANNERS.length) % BANNERS.length);
  }

  return (
    <div className="relative w-full h-[320px] sm:h-[420px] mb-10 rounded-3xl overflow-hidden shadow-xl group ring-2 ring-[#ffe38c33]">
      <img
        src={BANNERS[curr]}
        className="w-full h-full object-cover transition duration-700 scale-105 group-hover:scale-100"
        alt={`Banner ${curr + 1}`}
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60 pointer-events-none" />
      {/* Controls */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute top-1/2 -translate-y-1/2 left-5 bg-[#221409]/70 hover:bg-[#d4af37]/80 hover:text-[#23140f] text-[#ffe184] rounded-full p-2.5 transition z-10 border-2 border-[#ffe18488] shadow-md focus:outline-none scale-110"
        style={{ backdropFilter: "blur(3px)" }}
      >
        <svg width="25" height="25" viewBox="0 0 22 22" fill="none"><path d="M14.5 18.5L8 12L14.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute top-1/2 -translate-y-1/2 right-5 bg-[#221409]/70 hover:bg-[#d4af37]/80 hover:text-[#23140f] text-[#ffe184] rounded-full p-2.5 transition z-10 border-2 border-[#ffe18488] shadow-md focus:outline-none scale-110"
        style={{ backdropFilter: "blur(3px)" }}
      >
        <svg width="25" height="25" viewBox="0 0 22 22" fill="none"><path d="M7.5 18.5L14 12L7.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to banner ${i + 1}`}
            onClick={() => setCurr(i)}
            className={`w-4 h-4 rounded-full border-2 border-[#f9d750d0] transition-all duration-200 shadow ${curr === i ? "bg-[#ffe184] scale-110" : "bg-[#23140f]/70"}`}
          />
        ))}
      </div>
    </div>
  );
}

function VideoGallery() {
  const [active, setActive] = useState(0);

  if (!VIDEOS.length) return null;

  return (
    <div className="mb-12">
      <h3 className="text-xl font-extrabold text-[#fbd24e] mb-4 tracking-wide flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37]"></span>
        Event Highlights: 2026 Videos
      </h3>
      <div className="flex flex-col md:flex-row md:gap-8 gap-4 items-start">
        <div className="w-full md:w-[420px] bg-black/60 rounded-2xl overflow-hidden shadow-lg border-2 border-[#fff4de33]">
          <video
            src={VIDEOS[active].url}
            controls
            poster={VIDEOS[active].thumb}
            className="w-full h-[230px] md:h-[270px] object-cover bg-black"
            style={{ background: "#111" }}
          />
        </div>
        <div className="flex md:flex-col flex-row gap-2 md:gap-3 mt-1 md:mt-0">
          {VIDEOS.map((v, ix) => (
            <button
              key={ix}
              onClick={() => setActive(ix)}
              className={`flex items-center gap-2 rounded-lg transition border-2 ${
                active === ix
                  ? "border-[#d4af37] bg-[#23130a] ring-2 ring-[#ffe89099]"
                  : "border-transparent hover:border-[#ffe38c90] bg-[#241711]"
              } px-2 py-1 focus:outline-none`}
              style={{ minWidth: "120px" }}
            >
              <img
                src={v.thumb}
                alt={v.title}
                className="w-14 h-10 object-cover rounded"
                style={{
                  filter: active === ix ? "none" : "grayscale(70%) brightness(0.7)",
                }}
              />
              <span className="text-xs text-[#ffeab0] font-semibold">{v.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Edition2026() {
  return (
    <section className="bg-[#23140f] text-white min-h-screen py-16 px-2 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Year Switcher Header */}
        <EditionYearSwitcher currentYear={2026} />

        {/* Banner Section */}
        <BannerSlider />

        {/* Event Videos */}
        <VideoGallery />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 mt-6">
          {/* LEFT: Winner Highlight & Participants */}
          <aside className="lg:w-[41%] flex flex-col gap-10">
            {/* Winner Card */}
            <div className="rounded-3xl bg-gradient-to-tr from-[#181208] via-[#3e2501]/60 to-[#23140f]/80 shadow-2xl border-2 border-[#ffe29e29] p-8 flex flex-col items-center text-center relative group overflow-hidden z-10">
              {/* Glow/Blurr behind image */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-56 h-24 bg-[#ffd34b33] blur-2xl opacity-70 rounded-full z-0"></div>
              <div className="relative z-10 mb-5 w-44 h-44 rounded-full overflow-hidden border-8 border-[#ffe9b3de] shadow-xl">
                <img
                  src={WINNER.photo}
                  alt={WINNER.name}
                  loading="lazy"
                  className="object-cover w-full h-full scale-110 group-hover:scale-100 transition-transform duration-300"
                />
              </div>
              <div className="text-2xl font-extrabold bg-gradient-to-r from-[#fff8c9] via-[#ffe174] to-[#d2a21d] bg-clip-text text-transparent drop-shadow">
                {WINNER.name}
              </div>
              <div className="font-bold text-[#fdc537] text-[1.14rem] mb-1 mt-1 block">{WINNER.hospital}</div>
              <div className="inline-block rounded-full bg-[#d4af37]/20 text-[#d4af37] px-5 py-1.5 text-sm font-black uppercase tracking-wide border border-[#ffeab855] shadow mb-4 mt-2">
                {WINNER.award}
              </div>
              <div className="text-[#ffeac9ee] text-base font-medium leading-relaxed drop-shadow">{WINNER.overview}</div>
            </div>

            {/* Other Participants */}
            <div>
              <h3 className="text-xl text-[#fdde4e] font-extrabold mb-6 ml-2 tracking-wider flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37]"></span>
                More Winners &amp; Participants
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {PARTICIPANTS.map((p, idx) => (
                  <div
                    key={p.name + idx}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-[#251a12]/50 to-[#ffe5a424] border-2 border-[#ffe38c18] shadow-xl group hover:shadow-2xl transition relative hover:border-[#d4af37]/80"
                    style={{
                      minHeight: "330px",
                    }}
                  >
                    <span className="absolute top-3 right-3 text-[0.90rem] text-[#ae800f77] font-semibold px-2 py-0.5 bg-[#fde38522] rounded-lg tracking-tight">
                      {idx + 2}st
                    </span>
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#ffd34bcb] shadow-lg mb-0.5 relative">
                      <img
                        src={p.photo}
                        alt={p.name}
                        className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="font-extrabold text-[#ffeab2] text-[1.19rem] text-center">{p.name}</div>
                    <div className="text-[0.98rem] font-semibold text-[#f6ca36] mb-1 tracking-wide text-center">{p.achievement}</div>
                    <div className="text-xs text-[#ffeabbbd] font-semibold mb-1">{p.hospital}</div>
                    <div className="text-xs text-[#bda667bc] italic text-center">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT: Edition Overview & Details */}
          <main className="flex-1">
            <header className="mb-9">
              <div className="text-xs uppercase tracking-widest text-[#f9de9c]/80 font-extrabold mb-1">3rd Edition</div>
              <h1 className="text-2xl md:text-4xl font-extrabold mb-1">
                Global Healthcare Excellence Awards <span className="text-[#fff188] drop-shadow-xl">2026</span>
              </h1>
              <p className="text-lg text-[#ecd987] font-semibold mb-1">
                Dubai &amp; London &middot; <span className="text-[#d4af37] font-bold">Celebrating Excellence in Healthcare</span>
              </p>
            </header>
            <section className="mb-10">
              <h2 className="text-xl font-extrabold text-[#ffe19f] mb-3 tracking-tight flex gap-2 items-center">
                <span className="w-2 h-2 inline-block rounded-full bg-[#d4af37]"></span>
                Prestigious Global Recognition
              </h2>
              <p className="text-base text-[#fffaddcb] mb-4">
                The 3<sup>rd</sup> edition of the Global Healthcare Excellence Awards, held in Dubai and London, united the most influential healthcare leaders and innovative organizations under one roof. The event celebrated achievements in patient care, groundbreaking research, and innovations shaping the future of global health.
              </p>
              <ul className="list-inside list-disc text-base text-[#ffeab8ed] space-y-2 mb-5 pl-1 font-medium">
                <li>Multi-country participation with 50+ institutions and thought-leaders.</li>
                <li>Special panel on digital healthcare and hospital management advancements.</li>
                <li>Exclusive networking gala and award ceremony in iconic international venues.</li>
                <li>Emphasis on ethical standards, patient focus, and medical innovation.</li>
              </ul>
              <div className="rounded-xl bg-[#1f170b]/60 border-l-4 border-[#ffe28c] px-5 py-4 mb-4 shadow-md text-[#ffe29e] font-semibold text-[1.08rem]">
                <svg className="inline mr-2 -mt-1" width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#FFDF5C" strokeWidth="2"/><path d="M8 13l2 2 4-4" stroke="#FFDF5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Now featuring on-stage moments, interviews, and event highlights below!
              </div>
            </section>
            <section>
              <h2 className="text-lg font-extrabold text-[#d4af37] mb-3 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37]"></span>
                2026 Chief Guest
              </h2>
              <div className="flex items-center gap-4 mb-6 bg-gradient-to-r from-[#fffad515] to-[#ffe46a22] p-3 rounded-xl border border-[#ffe28e3c] shadow-md max-w-[400px]">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#ffe28e] shadow-lg flex-shrink-0">
                  <img src="/images/jury1.jpeg" alt="Dr. Virender Sehwag" className="object-cover w-full h-full" />
                </div>
                <div>
                  <div className="font-black text-[#ffeab5] text-lg">Dr. Virender Sehwag</div>
                  <div className="text-xs text-[#d4af37] font-semibold uppercase tracking-wide">Chief Guest</div>
                </div>
              </div>
              <p className="text-base text-[#ffeab3eb] max-w-2xl">
                Dr. Virender Sehwag, an eminent figure, presided over the 2026 awards as Chief Guest, inspiring attendees with his vision for a healthier, more connected global community. His presence elevated the event’s commitment to recognizing world-class achievement.
              </p>
            </section>
          </main>
        </div>
      </div>
    </section>
  );
}
