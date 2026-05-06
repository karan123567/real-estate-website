"use client";

// ─── Parth Estate Mart — Facebook Videos Showcase ────────────────────────────
// Videos play DIRECTLY on the site via Facebook embedded player (no redirect)
// HOW TO ADD VIDEOS:
//   1. Go to your Facebook page → open any video → click "..." → "Copy link"
//   2. Paste the full URL as the `url` field below
//   3. Add a custom thumbnail image URL in `thumb` (or leave "" for the blue placeholder)

import { useState, useEffect, useRef } from "react";

// ─── ADD YOUR FACEBOOK VIDEO LINKS HERE ──────────────────────────────────────
const FB_VIDEOS = [
  {
    id: "fbv1",
    url: "https://www.facebook.com/share/18gnmhXaUY/", // ← replace with real video URL
    title: "Property Tour — Noida",
    location: "Noida, UP",
    type: "Property Tour",
    thumb: "", // ← paste a thumbnail image URL, or leave "" for auto placeholder
  },
  {
    id: "fbv2",
    url: "https://www.facebook.com/share/18gnmhXaUY/",
    title: "Plot for Sale — Greater Noida",
    location: "Greater Noida, UP",
    type: "Plot Tour",
    thumb: "",
  },
  {
    id: "fbv3",
    url: "https://www.facebook.com/share/18gnmhXaUY/",
    title: "Farm Land Investment",
    location: "Greater Noida West, UP",
    type: "Farm Land",
    thumb: "",
  },
  {
    id: "fbv4",
    url: "https://www.facebook.com/share/18gnmhXaUY/",
    title: "Villa Walkthrough",
    location: "Noida Extension, UP",
    type: "Villa Tour",
    thumb: "",
  },
  {
    id: "fbv5",
    url: "https://www.facebook.com/share/18gnmhXaUY/",
    title: "Commercial Space — Prime Location",
    location: "Sector 18, Noida",
    type: "Commercial",
    thumb: "",
  },
  {
    id: "fbv6",
    url: "https://www.facebook.com/share/18gnmhXaUY/",
    title: "Affordable Plots — Ready to Register",
    location: "Greater Noida, UP",
    type: "Plot Tour",
    thumb: "",
  },
];

const LOOPED = [...FB_VIDEOS, ...FB_VIDEOS];

// ─── FACEBOOK EMBED URL ───────────────────────────────────────────────────────
function getFbEmbedUrl(videoUrl) {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=false&width=734&mute=0`;
}

// ─── PLAY ICON ────────────────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-1">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

// ─── THUMBNAIL PLACEHOLDER (when no thumb URL given) ─────────────────────────
function FbThumbPlaceholder({ title, type }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2"
      style={{ background: "linear-gradient(135deg, #1877f2 0%, #0d5bba 100%)" }}
    >
      {/* Facebook logo */}
      <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10 opacity-80">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
      <p className="text-white/70 text-xs text-center px-3 line-clamp-2" style={{ fontFamily: "sans-serif" }}>{title}</p>
    </div>
  );
}

// ─── VIDEO CARD ───────────────────────────────────────────────────────────────
function VideoCard({ video, onClick }) {
  return (
    <button
      onClick={() => onClick(video)}
      className="group relative flex-shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden cursor-pointer focus:outline-none"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)", border: "1px solid rgba(24,119,242,0.15)" }}
      aria-label={`Play: ${video.title}`}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-44 overflow-hidden bg-gray-900">
        {video.thumb ? (
          <img
            src={video.thumb}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <FbThumbPlaceholder title={video.title} type={video.type} />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white border-2 border-white/70 backdrop-blur-sm group-hover:scale-110 transition-all duration-300"
            style={{ background: "rgba(255,255,255,0.15)", boxShadow: "0 0 32px rgba(24,119,242,0.6)" }}
          >
            <PlayIcon />
          </div>
        </div>

        {/* "Play on site" hover hint */}
        <div className="absolute bottom-12 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ background: "rgba(24,119,242,0.85)", fontFamily: "sans-serif" }}>
            ▶ Play on site
          </span>
        </div>

        {/* Type badge */}
        <span
          className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white"
          style={{ background: "linear-gradient(135deg, #1877f2, #42a5f5)", fontFamily: "sans-serif" }}
        >
          {video.type}
        </span>

        {/* Facebook logo watermark */}
        <div className="absolute top-3 right-3">
          <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 opacity-60">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
      </div>

      {/* Info */}
      <div
        className="px-4 py-3 text-left"
        style={{ background: "rgba(8,12,20,0.97)", borderTop: "1px solid rgba(24,119,242,0.12)" }}
      >
        <h3 className="text-white font-semibold text-sm leading-snug mb-1 line-clamp-2 group-hover:text-blue-300 transition-colors duration-200">
          {video.title}
        </h3>
        <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(100,160,255,0.55)", fontFamily: "sans-serif" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3 shrink-0" style={{ color: "#1877f2" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {video.location}
        </div>
      </div>

      {/* Blue sweep on hover */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
        style={{ background: "linear-gradient(90deg, #1877f2, #42a5f5)" }}
      />
    </button>
  );
}

// ─── ON-SITE FACEBOOK VIDEO MODAL ────────────────────────────────────────────
function VideoModal({ video, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-3 sm:p-6"
      style={{ zIndex: 9999, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 32px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(24,119,242,0.3)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Blue top accent */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #0d5bba, #1877f2, #42a5f5, #1877f2, #0d5bba)" }} />

        {/* Header */}
        <div
          className="flex items-center justify-between gap-4 px-5 py-4"
          style={{ background: "rgba(6,10,18,0.99)" }}
        >
          <div className="min-w-0 flex-1 flex items-center gap-3">
            {/* Facebook icon */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#1877f2" }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "rgba(100,160,255,0.5)", fontFamily: "sans-serif" }}>
                Now Playing · Parth Estate Mart
              </p>
              <h3 className="text-white font-semibold text-base leading-snug truncate" style={{ fontFamily: "Georgia, serif" }}>
                {video.title}
              </h3>
              <p className="text-xs mt-0.5 truncate" style={{ color: "rgba(100,160,255,0.4)", fontFamily: "sans-serif" }}>
                {video.location}
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(200,50,50,0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
            aria-label="Close player"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ══ FACEBOOK EMBEDDED PLAYER — plays on this site ══ */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%", background: "#000" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={getFbEmbedUrl(video.url)}
            title={video.title}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            scrolling="no"
            style={{ border: "none", overflow: "hidden" }}
          />
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-5 py-3 gap-3"
          style={{ background: "rgba(6,10,18,0.99)", borderTop: "1px solid rgba(24,119,242,0.1)" }}
        >
          <p className="text-xs" style={{ color: "rgba(100,160,255,0.3)", fontFamily: "sans-serif" }}>
            Press <kbd className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}>Esc</kbd> or click outside to close
          </p>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs transition-colors duration-200 hover:text-white"
            style={{ color: "rgba(100,160,255,0.4)", fontFamily: "sans-serif" }}
          >
            <svg viewBox="0 0 24 24" fill="#1877f2" className="w-3.5 h-3.5">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Open in Facebook
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function FacebookVideos() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPaused, setIsPaused]       = useState(false);
  const speed = Math.max(30, LOOPED.length * 3);

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #06090f 0%, #0a1020 50%, #06090f 100%)" }}
    >
      <style>{`@keyframes scroll-left-fb { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>

      {/* Blue ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #1877f2 0%, transparent 70%)" }}
      />
      {/* Top blue border */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #1877f2, transparent)" }}
      />

      {/* Header */}
      <div className="relative container mx-auto px-4 mb-12 text-center">
        {/* Facebook badge */}
        <div
          className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
          style={{ border: "1px solid rgba(24,119,242,0.35)", background: "rgba(24,119,242,0.1)" }}
        >
          <svg viewBox="0 0 24 24" fill="#1877f2" className="w-3.5 h-3.5">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(100,180,255,0.85)", fontFamily: "sans-serif" }}>
            Facebook Videos
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
          Explore on{" "}
          <span className="relative inline-block">
            <span style={{ color: "#42a5f5" }}>Facebook</span>
            <span
              className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full opacity-60"
              style={{ background: "linear-gradient(90deg, #1877f2, #42a5f5)" }}
            />
          </span>
        </h2>

        <p className="max-w-xl mx-auto mb-4" style={{ fontFamily: "sans-serif", color: "rgba(100,160,255,0.45)" }}>
          Watch our Facebook property videos right here — no redirects, no new tabs.
        </p>

        {/* On-site badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs"
          style={{ background: "rgba(24,119,242,0.12)", border: "1px solid rgba(24,119,242,0.25)", color: "rgba(100,180,255,0.7)", fontFamily: "sans-serif" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
          Videos play directly on this page
        </div>
      </div>

      {/* Scroll track */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 w-8 sm:w-24 h-full z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, #06090f, transparent)" }} />
        <div className="absolute right-0 top-0 w-8 sm:w-24 h-full z-10 pointer-events-none" style={{ background: "linear-gradient(-90deg, #06090f, transparent)" }} />

        <div
          className="flex gap-5 py-4 px-6 w-max"
          style={{ animation: isPaused ? "none" : `scroll-left-fb ${speed}s linear infinite` }}
        >
          {LOOPED.map((video, i) => (
            <VideoCard key={`${video.id}-${i}`} video={video} onClick={setActiveVideo} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-10">
        <a
          href="https://www.facebook.com/share/18gnmhXaUY/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #1877f2, #42a5f5)", boxShadow: "0 4px 20px rgba(24,119,242,0.35)", fontFamily: "sans-serif" }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Follow us on Facebook
        </a>
      </div>

      {/* ON-SITE PLAYER */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </section>
  );
}