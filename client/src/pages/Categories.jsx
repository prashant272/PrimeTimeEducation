// =============================
//  CATEGORY PAGE (Premium Look)
//  Data Control: categories array below - saari categories yahin se update hoti hain
//  Table & Layout: TailwindCSS styling niche JSX me, har section ka comment diya hai
// =============================
export default function Categories() {
  // =========================
  // Categories Control - Yahin se add/remove/edit karo!
  // =========================
  const categories = [
    // ========== HEALTHCARE INSTITUTIONS ==========
    {
      category: "Healthcare Institution",
      title: "Excellence in AI-Driven Hospital Transformation",
      desc: "Recognizes hospitals that have strategically adopted Artificial Intelligence across clinical care, diagnostics, operations, and patient engagement to improve outcomes, efficiency, and innovation.",
    },
    {
      category: "Healthcare Institution",
      title: "Outstanding Future-Ready Healthcare Institution",
      desc: "Honors healthcare institutions demonstrating visionary leadership in digital transformation, smart infrastructure, sustainability, and technology-enabled patient-centric care.",
    },
    {
      category: "Healthcare Institution",
      title: "Excellence in Digital & Smart Hospital Infrastructure",
      desc: "Recognizes hospitals implementing advanced digital infrastructure such as HIS, EMR/EHR, IoT-enabled facilities, smart ICUs, and automated clinical workflows.",
    },
    {
      category: "Healthcare Institution",
      title: "Excellence in Telemedicine & Virtual Care",
      desc: "Celebrates healthcare providers delivering high-quality care through teleconsultation platforms, remote monitoring, virtual diagnostics, and digital health ecosystems.",
    },
    {
      category: "Healthcare Institution",
      title: "Excellence in Digital Diagnostics & Imaging Innovation",
      desc: "Recognizes healthcare institutions leveraging AI-powered diagnostics, advanced imaging systems, and data-driven clinical decision support.",
    },
    {
      category: "Healthcare Institution",
      title: "Excellence in Patient Experience & Engagement Innovation",
      desc: "Honors hospitals enhancing patient experience through digital platforms, AI chatbots, mobile health apps, and personalized care journeys.",
    },
    {
      category: "Healthcare Institution",
      title: "Outstanding Technology-Driven Medical Education & Training Institute",
      desc: "Honors medical colleges and healthcare training institutes using simulation labs, virtual learning, AI-assisted diagnostics training, and immersive education technologies.",
    },

    // ========== LEADERSHIP ==========
    {
      category: "Leadership",
      title: "Visionary Healthcare Leader in Digital Transformation",
      desc: "Honors healthcare leaders driving large-scale digital transformation, innovation, and technology-led healthcare excellence.",
    },
    {
      category: "Leadership",
      title: "Transformative Hospital CEO of the Year",
      desc: "Recognizes hospital CEOs leading technology-driven growth, operational excellence, and patient-centric innovation.",
    },
    {
      category: "Leadership",
      title: "Pioneering Medical Director in Clinical Innovation",
      desc: "Honors medical directors advancing clinical excellence through AI-driven diagnostics, digital treatment models, and innovation-led care delivery.",
    },
    {
      category: "Leadership",
      title: "Outstanding Doctor in Technology-Enabled Patient Care",
      desc: "Recognizes doctors leveraging digital tools, telemedicine, AI, and advanced technologies to deliver superior patient outcomes.",
    },
    {
      category: "Leadership",
      title: "Emerging Healthcare Leader in Digital Innovation",
      desc: "Recognizes rising healthcare leaders demonstrating early impact through innovation, technology adoption, and digital healthcare initiatives.",
    },

    // ========== HEALTHTECH / MEDTECH ==========
    {
      category: "HealthTech / MedTech",
      title: "Excellence in AI-Powered Healthcare Solutions",
      desc: "Recognizes companies delivering AI-driven platforms for diagnostics, clinical decision support, and healthcare automation.",
    },
    {
      category: "HealthTech / MedTech",
      title: "Excellence in Digital Health & Telemedicine Innovation",
      desc: "Honors organizations redefining healthcare delivery through telehealth platforms, virtual care, and remote monitoring technologies.",
    },
    {
      category: "HealthTech / MedTech",
      title: "Excellence in Medical Devices & Smart Health Technologies",
      desc: "Recognizes MedTech companies innovating in connected devices, smart diagnostics, wearables, and medical hardware solutions.",
    },
    {
      category: "HealthTech / MedTech",
      title: "Excellence in Healthcare Data Analytics & Intelligence Platforms",
      desc: "Honors companies leveraging healthcare data, predictive analytics, and AI to drive better outcomes and operational efficiency.",
    },
    {
      category: "HealthTech / MedTech",
      title: "Excellence in Digital Mental Health & Wellness Technology",
      desc: "Honors platforms delivering digital mental health services, therapy solutions, wellbeing apps, and emotional support technologies.",
    },
    {
      category: "HealthTech / MedTech",
      title: "Rising Star HealthTech / MedTech Company",
      desc: "Celebrates emerging healthcare technology companies demonstrating strong innovation, scalability, and market impact.",
    },
    {
      category: "HealthTech / MedTech",
      title: "Outstanding HealthTech / MedTech Company of the Year",
      desc: "Recognizes an organization demonstrating exceptional leadership, innovation, and impact in healthcare technology.",
    },
  ];

  return (
    // ========= Outer Section Styling =========
    <section className="relative bg-gradient-to-br from-[#241211] via-[#2b0f12] to-[#43200d] py-28 overflow-hidden">
      {/* Golden glow/shine for premium look - decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 w-40 h-40 bg-[#d4af37]/30 blur-3xl rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute right-4 bottom-4 w-56 h-56 bg-[#ffeec3]/10 blur-2xl rounded-full"></div>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[90vw] h-24 bg-gradient-to-r from-[#ffd96688] via-transparent to-[#ffd96688] blur-2xl opacity-40"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading Section */}
        {/* --- Control: Heading text niche change karo --- */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-transparent bg-gradient-to-r from-[#fffbe5] via-[#d4af37] to-[#fffbe5] bg-clip-text drop-shadow-md mb-6 tracking-tight">
            Healthcare Award <span className="inline-block animate-pulse text-[#ffeec3] drop-shadow">Categories</span>
          </h1>
          <div className="w-56 h-1 bg-gradient-to-r from-transparent via-[#ffd966] to-transparent mx-auto rounded-full shadow-lg shadow-[#ffd96644]" />
          <p className="max-w-2xl mx-auto text-[#ead996] text-lg font-medium mt-4">
            {/* --- Control: Short tagline niche likh sakte ho --- */}
            Recognizing global excellence and innovation across healthcare, leadership and technology.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl shadow-2xl shadow-[#d4af3715] border border-[#eed47c44] bg-black/40">
          {/* --- Table Header --- */}
          <div className="grid grid-cols-12 gap-6 bg-gradient-to-r from-[#ffeec3] via-[#f3e29e] to-[#f9f6e4] text-[#4a370f] font-extrabold rounded-t-2xl px-8 py-5 border-b border-[#ffecc21f] uppercase tracking-widest text-xs sm:text-sm">
            <div className="col-span-2 flex items-center gap-2"><span className="text-[#d4af37] text-xl">🏅</span>CATEGORY</div>
            <div className="col-span-4 flex items-center gap-2"><span className="text-[#d4af37] text-xl">🎖️</span>AWARD TITLE</div>
            <div className="col-span-6 flex items-center gap-2"><span className="text-[#d4af37] text-xl">📝</span>DESCRIPTION</div>
          </div>

          {/* --- Rows: Har row ek category ke liye --- */}
          <div className="divide-y divide-[#ffecc21a]">
            {categories.map((item, index) => (
              <div
                key={index}
                className={`
                  grid grid-cols-12 gap-6 px-8 py-7 transition-all duration-300
                  bg-gradient-to-r from-[#33261d]/60 via-[#3a1418]/70 to-[#281111]/80
                  hover:bg-gradient-to-r hover:from-[#46260e]/80 hover:via-[#44181d]/90 hover:to-[#33261d]/80
                  group
                  relative
                `}
                style={{
                  boxShadow: "0 2px 16px -8px #d4af3733, 0 0.5px 0 #ffecc220 inset",
                }}
              >
                {/* Category */}
                <div className="col-span-2 flex items-center font-bold uppercase tracking-widest text-sm text-[#d4af37] group-hover:text-[#ffe38d] transition">
                  <span className="hidden sm:inline-block text-lg mr-2">🏅</span>
                  {item.category}
                </div>

                {/* Title */}
                <div className="col-span-4 flex items-center font-semibold text-[#fffbe5] group-hover:text-[#ffd966] text-base md:text-lg transition">
                  <span className="hidden sm:inline-block text-lg mr-2">🎖️</span>
                  {item.title}
                </div>

                {/* Description */}
                <div className="col-span-6 text-[#eae0c5] text-sm md:text-base leading-relaxed font-medium group-hover:text-[#fff8dc] transition">
                  <span className="hidden sm:inline-block text-lg mr-2">📝</span>
                  {item.desc}
                </div>

                {/* Golden Glow Accent on Row hover */}
                <div className="absolute left-2 right-2 top-0 h-[4px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 group-hover:opacity-80 rounded-full transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Footer */}
        <div className="text-center mt-14 opacity-70 text-xs sm:text-sm text-[#ffe38d] font-medium">
          {/* --- Control: Footer info niche change karo --- */}
          All award categories are subject to jury review. For queries, <span className="underline decoration-[#d4af37]/70 hover:text-[#ffd966]/90 cursor-pointer transition">contact us</span>.
        </div>
      </div>
    </section>
  );
}
