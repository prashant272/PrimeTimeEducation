import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EDITIONS } from "../data/editions.js";

// Each card highlights "Chief Guest" with clean styling, text never overflows, and all info is distinct.

export default function PreviousEditions() {
  const navigate = useNavigate();

  // Editions sorted by newest first
  const sorted = useMemo(
    () => [...EDITIONS].sort((a, b) => b.year - a.year),
    []
  );

  return (
    <section className="bg-gradient-to-tl from-[#1c1001] via-[#2e2312] to-[#1b140a] text-white min-h-screen py-9 px-0 flex items-start w-full">
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10 pt-16 px-0 w-full">
          <div>
            <h1 className="font-extrabold text-[#fdc537] text-[2.8rem] sm:text-[3.6rem] md:text-[4rem] leading-tight tracking-tight drop-shadow-[0_3px_20px_rgba(253,197,55,0.22)] text-left">
              Previous Editions
            </h1>
            <p className="mt-2 text-base md:text-lg text-gray-200 text-left max-w-2xl font-medium">
              <span className="inline-block px-4 py-2 bg-[#212121]/50 rounded-full border border-[#e6b832] text-[#fffbed] font-semibold tracking-wide shadow-sm">
                Explore a gallery of all our past award editions. Click "View Details" for more info on any year!
              </span>
            </p>
          </div>
          <div className="mt-5 md:mt-0 flex items-center">
            <Link
              to="/winners"
              className="rounded-full border-2 border-[#d4af37] bg-gradient-to-br from-[#ffe761] to-[#ffd700] text-[#2f1b07] px-8 py-2 text-lg font-extrabold shadow-md hover:bg-[#fff700] hover:text-[#2f1b07] hover:border-[#e9b904] transition focus:outline-none"
              style={{
                boxShadow: "0 3px 16px 0 #d4af3766,0 1.5px 6px #d4af3732",
                letterSpacing: "0.01em",
              }}
            >
              Winners
            </Link>
          </div>
        </header>
        {/* Card Grid */}
        <div
          className="
            w-full
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-x-8 gap-y-16
            px-0 mb-14 animate-fadein
          "
          style={{ justifyItems: "center", alignItems: "stretch" }}
        >
          {sorted.map((e) => (
            <button
              key={e.year}
              type="button"
              onClick={() =>
                navigate(e.path, {
                  state: { from: "previous" },
                })
              }
              aria-label={`View details for ${e.year} edition`}
              className={`
                group
                bg-gradient-to-br from-[#1f1303] to-[#322109]
                border-[3.5px] border-[#f9d563] hover:border-[#ffd700] transition-all
                rounded-2xl
                shadow-[0_10px_35px_rgba(198,163,59,0.32),0_4px_12px_#ffd70048]
                flex flex-col items-center
                relative overflow-hidden
                w-full max-w-[370px] min-w-[260px]
                py-6 px-6
                min-h-[560px] h-[560px] max-h-[560px]
                cursor-pointer
                focus:outline-none
                bg-clip-padding
              `}
              style={{
                background: "linear-gradient(120deg, #23201b 88%, #4d3309 100%)",
                boxShadow:
                  "0 8px 36px 0 rgba(212,175,55,0.13), 0 2px 16px 0 #f7e7a848",
              }}
            >
              {/* Light Glow - reduced opacity and less white */}
              <span className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#ffe18833] via-[#ffd70008] to-transparent opacity-35 group-hover:opacity-60 transition rounded-2xl" />

              {/* Top badge */}
              <span className="absolute top-5 right-5 bg-[#f8e88a] border border-[#ffd70095] text-[#9e832b] font-bold px-3 py-0.5 text-xs rounded-full z-20 shadow">
                WIN
              </span>

              {/* Chief Guest Section */}
              <div className="mt-2 mb-4 flex flex-col items-center w-full z-20">
                <div className="mb-2 w-full flex justify-center">
                  <span className="bg-[#ffe09a]/70 text-[#a88725] font-extrabold text-xs px-3 py-1 rounded-full border border-[#f9e7b3] shadow whitespace-nowrap">
                    Chief Guest
                  </span>
                </div>
                <div className="w-24 h-24 rounded-full border-4 border-[#ffe391d5] bg-[#fff8e3cc] shadow-md overflow-hidden flex items-center justify-center relative">
                  {e.chiefGuest?.photo ? (
                    <img
                      src={e.chiefGuest.photo}
                      alt={e.chiefGuest.name}
                      className="object-cover w-24 h-24 rounded-full"
                      loading="lazy"
                      style={{ display: "block" }}
                      onError={event => {
                        if (event.target.src !== "/images/jury1.jpeg") event.target.src = "/images/jury1.jpeg";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#ffe391bb] rounded-full" />
                  )}
                </div>
                <span className="text-[1.12rem] font-bold block text-center mt-3 text-[#f8ea9c] leading-tight max-w-[95%] truncate">
                  {e.chiefGuest?.name || (
                    <span className="text-[#dac572] italic">TBA</span>
                  )}
                </span>
                {e.chiefGuest?.designation && (
                  <span className="text-[#e0c66d] text-xs font-medium mt-1 block text-center max-w-[90%] truncate">{e.chiefGuest.designation}</span>
                )}
              </div>

              {/* Divider */}
              <div className="w-[72%] mx-auto h-[2px] bg-gradient-to-r from-[#ffe695]/60 via-[#baa13d]/70 to-[#ffd991]/60 opacity-70 rounded-full my-2" />

              {/* Edition Info */}
              <div className="w-full flex flex-col items-center z-20 px-0">
                <span className="text-[#ffe595] font-semibold text-sm text-center mt-0 max-w-full break-words leading-snug">
                  {e.title}
                </span>
                <span className="text-[#bdb383] text-xs mt-1 text-center block truncate w-full">
                  {e.locations?.join(" · ")}
                </span>
                <div className="mt-1 text-[#fdc537] text-base font-bold tracking-wide max-w-full text-center truncate">
                  {e.editionLabel || "Edition"}
                </div>
                <div className="font-extrabold text-[#ffe780] text-3xl mt-1 mb-3 tracking-wide drop-shadow text-center">
                  {e.year}
                </div>
              </div>

              {/* Award (if any) */}
              {e.winners && Array.isArray(e.winners) && e.winners[0]?.award && (
                <div className="w-full flex justify-center items-center my-2">
                  <span className="bg-[#fffef324] border border-[#ffe28e73] px-3 py-1 rounded-full text-xs font-bold text-[#ac9638] shadow whitespace-nowrap max-w-[92%] overflow-hidden text-ellipsis">
                    {e.winners[0].award}
                  </span>
                </div>
              )}

              {/* Spacer */}
              <div className="flex-1" />

              {/* "View More" Button */}
              <div className="w-full flex justify-center mt-auto z-20">
                <span className="inline-flex items-center bg-gradient-to-r from-[#ffd700]/80 to-[#ffea91]/60 text-[#301a0b] px-5 py-2.5 text-[1rem] font-black rounded-full border-2 border-[#ffe58f]/50 shadow group-hover:scale-105 transition-transform duration-150 tracking-wide">
                  View Details <span className="ml-2 text-[1.3em]">→</span>
                </span>
              </div>

              {/* Card border glow and bottom shadow */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl border-[2.5px] border-[#fffbed12] group-hover:border-[#fff7c055] transition-all duration-300 z-30"></span>
              <span className="pointer-events-none absolute bottom-0 left-0 w-full h-8 rounded-b-2xl bg-gradient-to-t from-[#fffbd908] to-transparent z-10" />
            </button>
          ))}
        </div>
        <div className="hidden">
          {/* Old detailed edition cards not shown in redesign. */}
        </div>
      </div>
    </section>
  );
}
