import { useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { EDITIONS, getEditionByYear } from "../data/editions.js";

export default function EditionDetail() {
  const { year } = useParams();
  const location = useLocation();
  const from = location.state?.from || "previous";

  const edition = useMemo(() => getEditionByYear(year), [year]);

  if (!edition) {
    return (
      <section className="bg-[#23140f] text-white min-h-screen py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">
            Edition not found
          </h1>
          <p className="mt-2 text-gray-300">
            We couldn&apos;t find an edition for year <b>{year}</b>.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              to="/previous-editions"
              className="rounded-full border border-[#d4af37]/50 px-5 py-2 text-sm hover:bg-[#d4af37] hover:text-black transition"
            >
              Back to Previous Editions
            </Link>
            <Link
              to="/media"
              className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black transition"
            >
              Media
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#23140f] text-white min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#d4af37]/80 font-bold">
                {edition.editionLabel}
              </p>
              <h1 className="text-2xl md:text-4xl font-extrabold">
                {edition.title}{" "}
                <span className="text-[#d4af37]">{edition.year}</span>
              </h1>
              <p className="mt-2 text-gray-200 max-w-2xl">
                {edition.hero}
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Locations:{" "}
                <span className="text-gray-200">
                  {edition.locations.join(" · ")}
                </span>
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                to={from === "media" ? "/media" : "/previous-editions"}
                className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black transition"
              >
                Back
              </Link>
              <Link
                to="/nominate"
                className="rounded-full bg-[#d4af37] px-5 py-2 text-sm font-semibold text-black hover:bg-[#c9a530] transition"
              >
                Nominate Now
              </Link>
            </div>
          </div>
        </header>

        {/* Placeholder sections (you’ll add real content later) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card title="Overview (placeholder)">
              Add your edition story, theme, jury highlights, and event summary
              here.
            </Card>

            <Card title="Winners (placeholder)">
              Add winner categories + winners list here. (This page is shared for
              Winners → View More and Previous Editions → View Edition)
            </Card>

            <Card title="Gallery / Media (placeholder)">
              Add photos, videos, press coverage links, etc.
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Quick Links">
              <ul className="text-sm text-gray-200 space-y-2">
                <li>
                  <Link
                    to="/media"
                    className="underline text-[#9fd4ff] hover:text-white"
                  >
                    Media page
                  </Link>
                </li>
                <li>
                  <Link
                    to="/previous-editions"
                    className="underline text-[#9fd4ff] hover:text-white"
                  >
                    Previous editions
                  </Link>
                </li>
              </ul>
            </Card>

            <Card title="Other Editions">
              <div className="flex flex-wrap gap-2">
                {EDITIONS.map((e) => (
                  <Link
                    key={e.year}
                    to={`/editions/${e.year}`}
                    state={{ from }}
                    className={`rounded-full border px-3 py-1 text-xs transition ${e.year === edition.year
                        ? "border-[#d4af37] text-[#d4af37]"
                        : "border-white/20 text-gray-200 hover:bg-white hover:text-black"
                      }`}
                  >
                    {e.year}
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5 md:p-6">
      <h2 className="text-base md:text-lg font-bold mb-2">{title}</h2>
      <div className="text-sm md:text-base text-gray-200 leading-relaxed">
        {children}
      </div>
    </div>
  );
}


