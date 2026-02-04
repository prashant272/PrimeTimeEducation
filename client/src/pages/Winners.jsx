import { Link, useNavigate } from "react-router-dom";
import { EDITIONS } from "../data/editions.js";

export default function Winners() {
  const navigate = useNavigate();

  // Flatten all winners from all editions
  const allWinners = [];
  EDITIONS.forEach((edition) => {
    if (edition.winners && edition.winners.length > 0) {
      edition.winners.forEach((winner) => {
        allWinners.push({
          ...winner,
          editionYear: edition.year,
          editionPath: edition.path,
        });
      });
    }
  });

  return (
    <section className="bg-gradient-to-tl from-[#23140f] via-[#181013] to-[#301a0b] text-white min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-[#d4af37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]">
              Winners
            </h1>
            <p className="mt-2 text-gray-200 max-w-2xl">
              Celebrating excellence across all editions. Click "View more" to see the full award page.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/previous-editions"
              className="rounded-full border border-[#d4af37] px-5 py-2 text-sm font-semibold text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition shadow-md"
            >
              Previous Editions
            </Link>
          </div>
        </header>

        {allWinners.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No winners data available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allWinners.map((winner, idx) => (
              <article
                key={`${winner.editionYear}-${idx}`}
                className="relative rounded-3xl border-2 border-[#d4af37]/70 bg-gradient-to-br from-[#31230c]/80 to-[#111] shadow-[0_4px_30px_rgba(212,175,55,0.15)] p-7 hover:shadow-[0_8px_36px_rgba(212,175,55,0.28)] hover:border-[#ffd700] transition group overflow-hidden"
              >
                {/* Shimmering Overlay */}
                <span className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-[#d4af37]/20 to-transparent opacity-60 group-hover:opacity-80 transition rounded-3xl" />
                {/* Premium Corner Ribbon */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="relative">
                    <span className="absolute left-1/2 -translate-x-1/2 top-0 text-xs font-extrabold px-5 py-1 bg-gradient-to-r from-[#d4af37]/90 to-[#ffd700]/80 text-black rounded-bl-lg shadow-lg tracking-widest drop-shadow-lg uppercase">🏆 Winner</span>
                  </div>
                </div>
                {/* Glow Effect */}
                <div className="absolute -inset-1 z-0 rounded-3xl border-2 border-[#d4af37]/40 opacity-40 blur-lg pointer-events-none"></div>
                {/* Card Content */}
                <div className="relative z-10">
                {/* Winner Photo */}
                <div className="mb-4 flex justify-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#ffd700] shadow-[0_0_24px_6px_#d4af3780] bg-gradient-to-br from-[#fbe7a2]/40 via-[#d4af37]/20 to-black">
                    <img
                      src={winner.photo || "/images/jury1.jpeg"}
                      alt={winner.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/images/jury1.jpeg";
                      }}
                    />
                    {/* subtle gold ring shimmer */}
                    <span className="absolute inset-0 rounded-full border-2 border-[#fff7d1]/80 animate-pulse z-10 pointer-events-none"></span>
                  </div>
                </div>

                {/* Winner Info */}
                <div className="text-center mb-4">
                  <h2 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#cfb465] via-[#d4af37] to-[#fff7d1] drop-shadow-[0_1px_6px_rgba(212,175,55,0.17)] mb-1 uppercase tracking-tight">
                    {winner.name}
                  </h2>
                  <p className="text-base text-[#ffe9a8] font-medium mb-2 drop-shadow-sm">
                    {winner.hospital}
                  </p>
                  <p className="text-sm font-bold text-[#fff7d1]/90 uppercase tracking-widest bg-[#d4af37]/30 rounded-lg px-2 py-1 mb-1 inline-block shadow">
                    {winner.award}
                  </p>
                  <p className="text-xs text-[#d4af37]/80 mt-2 tracking-wider font-semibold">
                    Edition {winner.editionYear}
                  </p>
                </div>

                {/* View More Button */}
                <div className="mt-7 flex justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(winner.editionPath, {
                        state: { from: "winners" },
                      })
                    }
                    className="relative rounded-full bg-gradient-to-r from-[#ffe483] via-[#d4af37] to-[#bfa73a] px-7 py-2.5 text-base font-bold text-black shadow-lg hover:scale-105 hover:from-[#ffe483]/90 hover:to-[#ffe483]/95 transition transform uppercase tracking-wider overflow-hidden"
                  >
                    <span className="relative z-10">View more</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#fff7d1]/70 to-transparent opacity-80 rounded-full pointer-events-none blur-[2px] scale-110" />
                  </button>
                </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
