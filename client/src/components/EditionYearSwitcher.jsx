import { Link } from "react-router-dom";

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

export default function EditionYearSwitcher({ editions, currentEdition }) {
  if (!editions || editions.length === 0) return null;

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar items-center">
      <span className="text-[#888] text-sm uppercase tracking-widest font-bold whitespace-nowrap shrink-0 mr-2">
        Archive List:
      </span>
      {editions.map(ed => {
        const isActive = currentEdition && currentEdition._id === ed._id;

        if (isActive) {
          return (
            <div
              key={ed._id}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa8920] text-black font-black text-sm tracking-wider whitespace-nowrap shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)] border border-[#d4af37]"
            >
              {ed.editionLabel || ed.year}
            </div>
          );
        }

        return (
          <Link
            key={ed._id}
            to={`/${ed.year}/${ed.slug}`}
            className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#d4af37]/50 text-gray-300 hover:text-[#d4af37] font-semibold text-sm tracking-wider whitespace-nowrap shrink-0 transition-all duration-300"
          >
            {ed.editionLabel || ed.year}
          </Link>
        );
      })}
    </div>
  );
}
