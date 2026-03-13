"use client";

import { Section } from "lucide-react";
// purpose: Property videos showcase - infinite auto-scroll carousel + Youtube modal
// Place between FeaturedProperties & WhyChooseUs on homepage

import { useState, useEffect, useRef } from "react";

// ─── MOCK VIDEO DATA ──────────────────────────────────────────────────────────
// TODO: Replace with real YouTube video IDs and property details
// Thumbnail is auto-fetched from YouTube — no extra setup needed

const VIDEOS = [
  {
    id: "v1",
    youtubeID: "dQw4w9WgXcQ", // <- replace with real Youtube video ID
    title: "Luxury Sea-View Villa - Goa",
    location: "Goa, India",
    duration: "3:24",
    type: "Villa Tour",
  },
  {
    id: "v2",
    youtubeID: "dQw4w9WgXcQ", // <- replace with real Youtube video ID
    title: "Modern High-Rise — South Mumbai",
    location: "Mumbai, Maharashtra",
    duration: "2:48",
    type: "Apartment Tour",
  },
  {
    id: "v3",
    youtubeId: "dQw4w9WgXcQ",
    title: "Heritage Bungalow — Bengaluru",
    location: "Bengaluru, Karnataka",
    duration: "4:10",
    type: "Bungalow Tour",
  },
  {
    id: "v4",
    youtubeId: "dQw4w9WgXcQ",
    title: "Penthouse Skyline Views — Delhi",
    location: "Delhi NCR",
    duration: "3:55",
    type: "Penthouse Tour",
  },
  {
    id: "v5",
    youtubeId: "dQw4w9WgXcQ",
    title: "Beachfront Retreat — Alibaug",
    location: "Alibaug, Maharashtra",
    duration: "2:20",
    type: "Villa Tour",
  },
  {
    id: "v6",
    youtubeId: "dQw4w9WgXcQ",
    title: "Garden Estate — Hyderabad",
    location: "Hyderabad, Telangana",
    duration: "3:05",
    type: "Estate Tour",
  },
];

// duplicate for infinite loop illusion

const LOOPED = [...VIDEOS, ...VIDEOS];

// ─── PLAY ICON SVG ────────────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-1">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

// ─── VIDEO CARD ───────────────────────────────────────────────────────────────
function VideoCard({ video, onClick }) {
  const thumb = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
  const fallback = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
  const [src, setSrc] = useState(thumb);

  return (
    <button
      onClick={() => onClick(video)}
      className="group relative flex-shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      aria-label={`Play video: ${video.title}`}
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.28)" }}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-44 overflow-hidden bg-gray-800">
        <img
          src={src}
          alt={video.title}
          onError={() => setSrc(fallback)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transsition-all duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white
                border-2 border-white/80 bg-white/10 backdrop-blur-sm
                group-hover:scale-110 group-hover:bg-white/20
                transition-all duration-300"
            style={{ boxShadow: "0 0 24px rgba(201,169,110,0.5)" }}
          >
            <PlayIcon />
          </div>
        </div>

        {/* Duration badge */}
        <span
          className="absolute bottom-3 right-3 bg-black/70 text-white text-xs
            px-2 py-0.5 rounded-full backdrop-blur-sm font-medium"
        >
          {video.duration}
        </span>

        {/* Type Badge */}
        <span
          className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white"
          style={{ background: "linear-gradient(135deg, #c9a96e, #b8854a" }}
        >
          {video.type}
        </span>
      </div>

      {/* card info */}
      <div className="bg-gray-900 px-4 py-3 text-left">
        <h3
          className="text-white font-semibold text-sm leading-snug mb-1
        group-hover:text-amber-300 transition-colors duration-200 line-clamp-1"
        >
          {video.title}
        </h3>
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-3 h-3 shrink-0 text-amber-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          {video.location}
        </div>
      </div>

      {/* gold bottom sweep on hover */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover w-full
      transition-all duration-500"
        style={{ background: "linear-gradient(90deg, #c9a96e, #e8c98a)" }}
      />
    </button>
  );
}

// ─── YOUTUBE MODAL ────────────────────────────────────────────────────────────
function VideoModal({ video, onClose }) {
  // close on Escape Key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex-itens-center justify-center p-4"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute iset-0 bg-black/85 backdrop-blur-sm" />

      {/* modal box */}
      <div
        className="relative z-10 w-full max-w-4xl rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ background: "0 24px 80px rgba(0,0,0,0.7)" }}
      >
        {/* gold top border */}

        <div
          className="h-0.5 w-full"
          style={{
            background: "linear-gradient(90deg, #c9a96e, #e8c98a, #c9a96e)",
          }}
        />

        {/* Header */}
        <div className="bg-gray-900 px-5 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-white font-semibold font-playfair truncate">
              {video.title}
            </h3>
            <p className="text-gray-400 text-xs truncate">{video.location}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center
                    justify-center text-white transition-colors duration-200"
            aria-label="Close video"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* youtube embed - 16:9 */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
export default function PropertyVideos() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPaused, setisPaused] = useState(false);
  const trackRef = useRef(null);

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0f1420 0%, #1a1f2e 50%, #0f1420 100%)",
      }}
    >
      {/* Ambient gold glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[700px] h-[300px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #c9a96e 0%, transparent 70%)",
        }}
      />

      {/* Top gold border */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #c9a96e, transparent)",
        }}
      />

      <div className="relative container mx-auto px-4 mb-12">
        {/* Header */}
        <div className="text-center">
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full
                          border border-amber-400/30 bg-amber-400/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold tracking-widest uppercase">
              Property Walkthroughs
            </span>
          </div>

          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            See Properties{" "}
            <span className="relative inline-block">
              <span className="text-amber-300">In Action</span>
              <span
                className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full opacity-60"
                style={{
                  background: "linear-gradient(90deg, #c9a96e, #e8c98a)",
                }}
              />
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Explore our properties through immersive video tours — from drone
            flyovers to interior walkthroughs.
          </p>
        </div>
      </div>

      {/* infinite scroll track */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setisPaused(true)}
        onMouseLeave={() => setisPaused(false)}
      >
        {/* left fade */}
        <div
          className="absolute left-0 top-0 w-8 sm:w-24 h-full z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #0f1420, transparent)" }}
        />

        {/* right fade */}
        <div
          className="absolute right-0 top-0 w-8 sm:w-24 h-full z-10 pointer-events-none"
          style={{
            background: "linear-gradient(-90deg, #0f1420, transparent)",
          }}
        />

        <div
          ref={trackRef}
          //   className="flex gap-5 py-4 px-6"
          //   style={{
          //     width: "max-content",
          //     animation: isPaused ? "none" : "scroll-left 30s linear infinite",
          //   }}
          // ✅ Fix — inline style for animation, keyframes already in globals.css
          className="flex gap-5 py-4 px-6 w-max"
          style={{
            animation: isPaused ? "none" : "scroll-left 30s linear infinite",
          }}
        >
          {LOOPED.map((video, i) => (
            <VideoCard
              key={`${video.id}-${i}`}
              video={video}
              onClick={setActiveVideo}
            />
          ))}
        </div>
      </div>

      {/* CSS KEYFRAME (injected inline) */}
      {/* <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style> */}

      {/* MODAL */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </section>
  );
}
