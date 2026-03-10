import { useState } from "react";
import { Play } from "lucide-react";

// Extracts YouTube Video ID from any standard youtube URL
function extractVideoID(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
}

function VideoCard({ videoLink }) {
    const [isHovered, setIsHovered] = useState(false);
    const videoId = extractVideoID(videoLink);

    if (!videoId) return null;

    // Uses maxresdefault if available, otherwise youtube auto-falls back (we can just point to maxres)
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const hqUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <div
            className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black group border border-[#d4af37]/20 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {!isHovered ? (
                <>
                    {/* We try maxres, and provide an onError fallback just in case */}
                    <img
                        src={thumbnailUrl}
                        onError={(e) => { e.target.onerror = null; e.target.src = hqUrl; }}
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-50"
                        loading="lazy"
                    />
                    {/* Translucent Play Button Overlaid */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 ml-1" fill="currentColor" />
                        </div>
                    </div>
                </>
            ) : (
                /* Iframe plays dynamically on hover */
                <iframe
                    className="w-full h-full absolute inset-0"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            )}
        </div>
    );
}

export default function VideoGallery({ videoLinks }) {
    if (!videoLinks || videoLinks.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {videoLinks.map((link, idx) => (
                <VideoCard key={idx} videoLink={link} />
            ))}
        </div>
    );
}
