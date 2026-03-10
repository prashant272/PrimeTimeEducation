import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

export default function BannerSlider({ images, title, label }) {
    const [curr, setCurr] = useState(0);

    useEffect(() => {
        if (!images || images.length === 0) return;
        const timer = setInterval(() => {
            setCurr((c) => (c + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [images]);

    if (!images || images.length === 0) {
        return (
            <div className="relative w-full max-w-7xl mx-auto h-[300px] sm:h-[400px] md:h-[500px] mb-8 sm:mb-12 mt-4 sm:mt-8 rounded-[2rem] overflow-hidden bg-black/40 border border-[#d4af37]/20 flex flex-col items-center justify-center text-center p-6 shadow-2xl">
                <div className="text-[#d4af37]/50 mb-4 bg-[#d4af37]/10 p-4 rounded-full border border-[#d4af37]/20">
                    <ImageIcon size={48} />
                </div>
                <h3 className="text-xl md:text-3xl font-bold text-[#eed99b] mb-2 tracking-wide">Building the visual archive</h3>
                <p className="text-[#e2d5a3]/60 text-sm max-w-md">We are actively preparing the high-quality retrospective gallery for {title}. Please check back later.</p>
            </div>
        );
    }

    function next() {
        setCurr((c) => (c + 1) % images.length);
    }
    function prev() {
        setCurr((c) => (c - 1 + images.length) % images.length);
    }

    return (
        <div className="relative w-full max-w-7xl mx-auto h-[300px] sm:h-[450px] md:h-[550px] lg:h-[650px] mt-4 sm:mt-8 rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] group ring-1 ring-white/10 md:ring-0">
            <img
                src={images[curr]}
                className="w-full h-full object-cover scale-[1.02] group-hover:scale-100 transition duration-1000 ease-out"
                alt={`Banner ${curr + 1}`}
                loading="lazy"
            />
            {/* Premium Vignette/Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a05] via-transparent to-transparent pointer-events-none" />

            {/* Hero overlay text on the banner if needed, or we just rely on the section below.
          Adding a subtle label inside the banner upper corner adds to the premium feel. */}
            {label && (
                <div className="absolute top-6 right-6 lg:top-10 lg:right-10 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[#d4af37] text-xs font-black uppercase tracking-[0.2em] shadow-xl">
                    {label}
                </div>
            )}

            {/* Navigation Buttons */}
            <button
                onClick={prev}
                className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-[#d4af37] hover:text-black text-white rounded-full transition-all duration-300 z-10 border border-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 shadow-[0_0_20px_rgba(0,0,0,0.4)]"
            >
                <ChevronLeft size={24} className="mr-1" />
            </button>
            <button
                onClick={next}
                className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-[#d4af37] hover:text-black text-white rounded-full transition-all duration-300 z-10 border border-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 shadow-[0_0_20px_rgba(0,0,0,0.4)]"
            >
                <ChevronRight size={24} className="ml-1" />
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20 items-center">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurr(i)}
                        className={`transition-all duration-500 rounded-full h-1.5 ${curr === i
                                ? "bg-gradient-to-r from-[#d4af37] to-[#aa8920] w-10 shadow-[0_0_15px_rgba(212,175,55,0.8)]"
                                : "bg-white/40 hover:bg-white/80 w-2.5 h-2.5"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
