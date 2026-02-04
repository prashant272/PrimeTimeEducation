import { useEffect, useState } from "react";
import { fetchMyNominations } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Crown, UserCircle } from "lucide-react";

const STATUS_LABELS = {
  nominated: "Nominated",
  evaluation: "Under Evaluation",
  selected: "Selected",
  rejected: "Rejected",
};
const STATUS_COLORS = {
  nominated:
    "bg-gradient-to-tr from-blue-800/60 via-blue-400/20 to-blue-700/10 text-blue-100 border-blue-400/50",
  evaluation:
    "bg-gradient-to-tr from-yellow-900/70 via-yellow-400/20 to-yellow-800/10 text-yellow-100 border-yellow-400/50",
  selected:
    "bg-gradient-to-tr from-emerald-800/60 via-emerald-500/20 to-emerald-700/10 text-emerald-100 border-emerald-400/50",
  rejected:
    "bg-gradient-to-tr from-red-900/60 via-red-500/20 to-red-800/10 text-red-100 border-red-400/50",
};

export default function UserDashboard() {
  const { token, user } = useAuth();
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setError("");
      try {
        const data = await fetchMyNominations(token);
        if (!cancelled) {
          setNominations(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load your nominations");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    if (token) {
      load();
    } else {
      setLoading(false);
      setNominations([]);
    }
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <section className="relative min-h-screen py-30 px-3 bg-gradient-to-br from-[#140a08] via-[#2f1a12] to-[#5d3e13] text-white flex items-start justify-center">
      {/* Decorations for premium look */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-0 w-[700px] h-[220px] rounded-[90px] blur-[110px] opacity-80 bg-gradient-to-br from-[#ffeec3]/40 via-[#d4af37]/50 to-[#c62828]/30" />
      <div className="pointer-events-none absolute right-[-20vw] bottom-9 z-0 w-[430px] h-[300px] rounded-[100px] blur-[110px] opacity-70 bg-gradient-to-br from-[#ffd966]/30 via-[#d4af37]/20 to-transparent" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-2 md:px-0">
        {/* Dashboard Card */}
        <div className="rounded-3xl border border-[#ffeec3]/25 bg-black/40 shadow-[0_18px_48px_#c4a44048] backdrop-blur-3xl overflow-hidden">
          {/* Header Premium */}
          <header className="relative px-9 md:px-14 pt-10 pb-7 bg-gradient-to-br from-[#211207]/80 via-[#2b1911]/90 to-[#291e16]/75 shadow-gold flex flex-col items-center gap-3 border-b border-[#ffd966]/15">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <Crown className="w-8 h-8 text-[#ffedc3] drop-shadow-gold animate-gold-glow" />
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider bg-gradient-to-r from-[#ffeec3] via-[#ffd966] to-[#d4af37] bg-clip-text text-transparent [text-shadow:0_1px_6px_#d4af3740] drop-shadow-2xl">
                My Nominations Dashboard
              </h1>
              <Crown className="w-8 h-8 text-[#ffedc3] drop-shadow-gold animate-gold-glow-slow" />
            </div>
            <div className="h-[3px] w-44 rounded-full my-2 bg-gradient-to-r from-[#d4af37] via-[#ffeec3] to-[#c62828] opacity-90" />
            {user && (
              <div className="flex items-center gap-3 mt-1 mb-1.5">
                <UserCircle className="w-6 h-6 text-[#ffd966] bg-black/40 rounded-full shadow-md ring-1 ring-[#d4af37]/25" />
                <div className="text-base sm:text-lg font-semibold text-[#ffeec3]">
                  {user.name}
                  <span className="text-xs sm:text-sm text-[#ffeec3]/70 ml-2 font-medium">
                    ({user.email})
                  </span>
                </div>
              </div>
            )}
            {nominations[0] && (
              <div className="flex flex-wrap items-center gap-3 justify-center mt-3 text-xs md:text-base">
                <span className="text-[#ffeec3]/80 font-medium">
                  Latest Nomination Status:
                </span>
                <StatusBadge status={nominations[0].status} />
                <span className="text-[#ffeec3]/35 font-medium">
                  (Latest nomination only)
                </span>
              </div>
            )}
          </header>

          {error && (
            <div className="mx-6 mt-7 rounded-lg border border-red-700/40 bg-gradient-to-br from-red-900/40 to-black/50 backdrop-blur px-4 py-3 text-base text-red-100 shadow-lg animate-shake">
              {error}
            </div>
          )}

          <div className="px-4 sm:px-8 py-8 min-h-[100px]">
            {loading ? (
              <div className="flex items-center justify-center text-lg text-[#ffeec3]/70 h-32 animate-pulse">
                Loading your nominations...
              </div>
            ) : nominations.length === 0 ? (
              <div className="flex items-center justify-center text-base text-[#ffeec3]/70 h-32">
                You have not submitted any nominations yet.
              </div>
            ) : (
              <div className="grid gap-8 py-2">
                {nominations.map((n, i) => (
                  <article
                    key={n._id}
                    className={`
                      relative overflow-visible
                      rounded-2xl group border border-[#ffd966]/30 bg-gradient-to-tr
                      from-[#1b120b]/70 via-[#252014]/85 to-[#2b1510]/80 shadow-[0_4px_24px_0_#d4af371a]
                      hover:shadow-[0_6px_34px_0_#ffeec370] transition duration-300
                      px-6 pt-7 pb-6 sm:px-10 sm:pt-9 sm:pb-8
                    `}
                    style={{
                      animation: `fade-in-bottom 0.4s both ${i * 90}ms`,
                    }}
                  >
                    {/* Card Glow Top Left */}
                    <div className="absolute -top-6 -left-8 w-32 h-28 bg-gradient-to-br from-[#d4af37]/15 via-[#ffeec3]/15 to-transparent rounded-full blur-2xl pointer-events-none z-0" />

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div className="flex-1 min-w-[180px]">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-black text-transparent bg-gradient-to-r from-[#ffeec3] via-[#d4af37] to-[#ffd966] bg-clip-text mb-0.5">
                          {n.nomineeName}
                        </h2>
                        <p className="text-sm sm:text-base text-[#ffeec3]/80 font-semibold">
                          {n.organization}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2 text-xs sm:text-sm font-medium text-[#ffeec3]/80">
                          <span className="inline-block bg-[#d4af37]/20 px-2.5 py-0.5 rounded-full border border-[#d4af37]/40 text-[#d4af37] font-semibold shadow ring-[1.5px] ring-[#ffd966]/10">
                            {n.registrationType}
                          </span>
                          <span className="inline-block bg-[#c62828]/15 px-2.5 py-0.5 rounded-full border border-[#c62828]/25 text-[#c62828] font-semibold shadow ring-1 ring-[#ffd966]/10">
                            {n.category}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 md:mt-0 self-end">
                        <StatusBadge status={n.status} />
                      </div>
                    </div>
                    <div className="mt-4 pt-2 sm:pt-3 flex flex-col-reverse md:flex-row gap-2 md:gap-6 items-start justify-between text-xs sm:text-sm text-[#ffeec3]/80 italic">
                      <span>
                        <span className="font-bold text-[#ffd966] not-italic">
                          Submitted on{" "}
                        </span>
                        {n.createdAt
                          ? new Date(n.createdAt).toLocaleString()
                          : "-"}
                      </span>
                      {n.remarks && (
                        <span className="line-clamp-2 max-w-xl text-[#ffb6b6] not-italic">
                          <span className="font-semibold text-[#fff]/90">
                            Remarks:
                          </span>{" "}
                          <span className="text-[#ffeec3]">{n.remarks}</span>
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Custom CSS for premium UI */}
        <style>{`
          @keyframes fade-in-bottom {
            0% { opacity: 0; transform: translateY(24px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .drop-shadow-gold {
            filter: drop-shadow(0 0 15px #ffd966) drop-shadow(0 0 6px #d4af37a3);
          }
          .animate-gold-glow {
            animation: gold-glow 2.1s infinite alternate;
          }
          .animate-gold-glow-slow {
            animation: gold-glow 3.7s infinite alternate;
          }
          .shadow-gold {
            box-shadow: 0 2px 28px 0 #d4af3770;
          }
          @keyframes gold-glow {
            from { filter: drop-shadow(0 0 8px #ffd966cc);}
            to { filter: drop-shadow(0 0 24px #ffeec388); }
          }
          .hover\\:shadow-gold:hover {
            box-shadow: 0 8px 36px 0 #ffeec340, 0 4px 18px #d4af3760;
          }
        `}</style>
      </div>
    </section>
  );
}

function StatusBadge({ status }) {
  const normalized = status || "nominated";
  const label = STATUS_LABELS[normalized] || "Nominated";
  const colorClasses = STATUS_COLORS[normalized] || STATUS_COLORS.nominated;
  let dotColor =
    normalized === "selected"
      ? "bg-emerald-300"
      : normalized === "evaluation"
      ? "bg-yellow-300"
      : normalized === "rejected"
      ? "bg-red-400"
      : "bg-blue-400";

  return (
    <span
      className={`
        inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs lg:text-base
        font-bold uppercase tracking-widest shadow
        ${colorClasses}
      `}
      style={{
        letterSpacing: "0.11em",
        boxShadow: "0 2px 14px 0 rgba(212,175,55,0.12)",
      }}
    >
      <span
        className={`w-2.5 h-2.5 rounded-full mr-2 border-2 border-current ${dotColor}`}
      />
      <span className="tracking-wide">{label}</span>
    </span>
  );
}
