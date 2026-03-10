import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPreviousEditionById, fetchPreviousEditions } from "../services/api";
import EditionYearSwitcher from "../components/EditionYearSwitcher";
import BannerSlider from "../components/BannerSlider";
import VideoGallery from "../components/VideoGallery";
import { Calendar, MapPin, Award } from "lucide-react";

export default function EditionDetail() {
  const { slug, year } = useParams();
  const navigate = useNavigate();

  // If we came from the old /editions/:year route, slug will be undefined but year will exist
  const identifier = slug || year;

  const [edition, setEdition] = useState(null);
  const [allEditions, setAllEditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Load all editions for the year switcher
    fetchPreviousEditions().then(setAllEditions).catch(console.error);
  }, []);

  useEffect(() => {
    if (!identifier) return;

    setLoading(true);
    setError(false);

    fetchPreviousEditionById(identifier)
      .then(data => {
        setEdition(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [identifier]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-24 text-[#d4af37]">
        <div className="w-8 h-8 rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37] animate-spin"></div>
        <span className="ml-3 font-semibold tracking-wider">LOADING ARCHIVE...</span>
      </div>
    );
  }

  if (error || !edition) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center pt-24 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-black text-[#d4af37] mb-4">404</h1>
        <p className="text-gray-400 mb-8 max-w-md">The edition archive you are looking for could not be found or does not exist.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-[#d4af37] to-[#aa8920] text-black font-bold px-8 py-3 rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition"
        >
          Return Home
        </button>
      </div>
    );
  }

  // Marquee duplicates for infinite scroll
  const marqueeImages = [...(edition.images || []), ...(edition.images || []), ...(edition.images || [])];

  return (
    <div className="min-h-screen bg-[#030303] text-white pt-[5.5rem] md:pt-[3.5rem] overflow-hidden selection:bg-[#d4af37]/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#d4af37]/5 to-transparent blur-[150px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-[#d4af37]/10 to-transparent blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10">
        {/* Banner Auto-Slider */}
        <BannerSlider images={edition.images} title={edition.title} label={edition.editionLabel} />

        {/* Dynamic Tabs Manager */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 my-10 border-b border-[#d4af37]/20 pb-4">
          <EditionYearSwitcher editions={allEditions} currentEdition={edition} />
        </div>

        {/* Edition Summary Panel */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
          <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-[#d4af37]/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Award size={160} className="text-[#d4af37]" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-[#d4af37] to-[#aa8920] text-black text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                  {edition.title}
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter bg-gradient-to-r from-white via-[#fbe376] to-[#d4af37] bg-clip-text text-transparent">
                  {edition.year} Edition
                </h2>
                <div className="flex flex-wrap gap-6 text-sm text-[#a89b6f] font-medium tracking-wide">
                  <span className="flex items-center gap-2"><MapPin size={16} className="text-[#d4af37]" /> {edition.locations?.join(", ")}</span>
                  <span className="flex items-center gap-2"><Calendar size={16} className="text-[#d4af37]" /> {edition.date}</span>
                </div>
              </div>
              <div className="flex-1 text-[#e2d5a3]/80 leading-relaxed max-w-lg border-l-2 border-[#d4af37]/30 pl-6 lg:text-lg">
                {edition.hero}
              </div>
            </div>
          </div>
        </div>

        {/* Media Gallery / Marquee */}
        {edition.images && edition.images.length > 0 && (
          <section className="mb-20">
            <div className="text-center mb-8">
              <span className="text-[#d4af37] text-sm font-bold tracking-[0.3em] uppercase">Visual Archive</span>
              <h2 className="text-3xl font-light tracking-wide mt-2">Media <span className="font-bold">Gallery</span></h2>
            </div>

            <div className="relative w-full overflow-hidden flex pb-4 pt-4 border-y border-[#d4af37]/10 bg-black/40">
              <div className="flex w-max animate-marquee space-x-6 hover:[animation-play-state:paused] px-3">
                {marqueeImages.map((src, idx) => (
                  <div key={idx} className="w-[280px] h-[350px] md:w-[350px] md:h-[450px] shrink-0 rounded-2xl overflow-hidden shadow-2xl shadow-black relative group border border-white/5 cursor-pointer">
                    <img src={src} alt="gallery" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Video Gallery */}
        {edition.videoLinks && edition.videoLinks.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
            <div className="text-center mb-10">
              <span className="text-[#d4af37] text-sm font-bold tracking-[0.3em] uppercase">Event Broadcasts</span>
              <h2 className="text-3xl font-light tracking-wide mt-2">Video <span className="font-bold">Moments</span></h2>
            </div>

            <VideoGallery videoLinks={edition.videoLinks} />
          </section>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}} />
    </div>
  );
}
