// "use client";

// import { Play, X } from "lucide-react";
// // purpose: Property videos showcase - infinite auto-scroll carousel + Youtube modal
// // Place between FeaturedProperties & WhyChooseUs on homepage

// import { useState, useEffect, useRef } from "react";

// // ─── MOCK VIDEO DATA ──────────────────────────────────────────────────────────
// // TODO: Replace with real YouTube video IDs and property details
// // Thumbnail is auto-fetched from YouTube — no extra setup needed

// const VIDEOS = [
//   {
//     id: "v1",
//     youtubeID: "dQw4w9WgXcQ", // <- replace with real Youtube video ID
//     title: "Luxury Sea-View Villa - Goa",
//     location: "Goa, India",
//     duration: "3:24",
//     type: "Villa Tour",
//   },
//   {
//     id: "v2",
//     youtubeID: "dQw4w9WgXcQ", // <- replace with real Youtube video ID
//     title: "Modern High-Rise — South Mumbai",
//     location: "Mumbai, Maharashtra",
//     duration: "2:48",
//     type: "Apartment Tour",
//   },
//   {
//     id: "v3",
//     youtubeId: "dQw4w9WgXcQ",
//     title: "Heritage Bungalow — Bengaluru",
//     location: "Bengaluru, Karnataka",
//     duration: "4:10",
//     type: "Bungalow Tour",
//   },
//   {
//     id: "v4",
//     youtubeId: "dQw4w9WgXcQ",
//     title: "Penthouse Skyline Views — Delhi",
//     location: "Delhi NCR",
//     duration: "3:55",
//     type: "Penthouse Tour",
//   },
//   {
//     id: "v5",
//     youtubeId: "dQw4w9WgXcQ",
//     title: "Beachfront Retreat — Alibaug",
//     location: "Alibaug, Maharashtra",
//     duration: "2:20",
//     type: "Villa Tour",
//   },
//   {
//     id: "v6",
//     youtubeId: "dQw4w9WgXcQ",
//     title: "Garden Estate — Hyderabad",
//     location: "Hyderabad, Telangana",
//     duration: "3:05",
//     type: "Estate Tour",
//   },
// ];

// // duplicate for infinite loop illusion

// const LOOPED = [...VIDEOS, ...VIDEOS];

// // ─── PLAY ICON SVG ────────────────────────────────────────────────────────────
// function PlayIcon() {
//   return (
//     <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-1">
//       <path d="M8 5.14v14l11-7-11-7z" />
//     </svg>
//   );
// }

// // ─── VIDEO CARD ───────────────────────────────────────────────────────────────
// function VideoCard({ video, onClick }) {
//   const thumb = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
//   const fallback = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
//   const [src, setSrc] = useState(thumb);

//   return (
//     <button
//       onClick={() => onClick(video)}
//       className="group relative flex-shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden cursor-pointer
//         focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
//       aria-label={`Play video: ${video.title}`}
//       style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.28)" }}
//     >
//       {/* Thumbnail */}
//       <div className="relative w-full h-44 overflow-hidden bg-gray-800">
//         <img
//           src={src}
//           alt={video.title}
//           onError={() => setSrc(fallback)}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//         />

//         {/* dark overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transsition-all duration-300" />

//         {/* Play button */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div
//             className="w-14 h-14 rounded-full flex items-center justify-center text-white
//                 border-2 border-white/80 bg-white/10 backdrop-blur-sm
//                 group-hover:scale-110 group-hover:bg-white/20
//                 transition-all duration-300"
//             style={{ boxShadow: "0 0 24px rgba(201,169,110,0.5)" }}
//           >
//             <PlayIcon />
//           </div>
//         </div>

//         {/* Duration badge */}
//         <span
//           className="absolute bottom-3 right-3 bg-black/70 text-white text-xs
//             px-2 py-0.5 rounded-full backdrop-blur-sm font-medium"
//         >
//           {video.duration}
//         </span>

//         {/* Type Badge */}
//         <span
//           className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white"
//           style={{ background: "linear-gradient(135deg, #c9a96e, #b8854a" }}
//         >
//           {video.type}
//         </span>
//       </div>

//       {/* card info */}
//       <div className="bg-gray-900 px-4 py-3 text-left">
//         <h3
//           className="text-white font-semibold text-sm leading-snug mb-1
//         group-hover:text-amber-300 transition-colors duration-200 line-clamp-1"
//         >
//           {video.title}
//         </h3>
//         <div className="flex items-center gap-1 text-gray-400 text-xs">
//           <svg
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             className="w-3 h-3 shrink-0 text-amber-500"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
//             />
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
//             />
//           </svg>
//           {video.location}
//         </div>
//       </div>

//       {/* gold bottom sweep on hover */}
//       <div
//         className="absolute bottom-0 left-0 h-0.5 w-0 group-hover w-full
//       transition-all duration-500"
//         style={{ background: "linear-gradient(90deg, #c9a96e, #e8c98a)" }}
//       />
//     </button>
//   );
// }

// // ─── YOUTUBE MODAL ────────────────────────────────────────────────────────────
// function VideoModal({ video, onClose }) {
//   // close on Escape Key
//   useEffect(() => {
//     const handler = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", handler);
//     document.body.style.overflow = "hidden";
//     return () => {
//       window.removeEventListener("keydown", handler);
//       document.body.style.overflow = "";
//     };
//   }, [onClose]);

//   return (
//     <div
//       className="fixed inset-0 flex-itens-center justify-center p-4"
//       onClick={onClose}
//     >
//       {/* backdrop */}
//       <div className="absolute iset-0 bg-black/85 backdrop-blur-sm" />

//       {/* modal box */}
//       <div
//         className="relative z-10 w-full max-w-4xl rounded-2xl overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//         style={{ background: "0 24px 80px rgba(0,0,0,0.7)" }}
//       >
//         {/* gold top border */}

//         <div
//           className="h-0.5 w-full"
//           style={{
//             background: "linear-gradient(90deg, #c9a96e, #e8c98a, #c9a96e)",
//           }}
//         />

//         {/* Header */}
//         <div className="bg-gray-900 px-5 py-3 flex items-center justify-between gap-3">
//           <div className="min-w-0">
//             <h3 className="text-white font-semibold font-playfair truncate">
//               {video.title}
//             </h3>
//             <p className="text-gray-400 text-xs truncate">{video.location}</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center
//                     justify-center text-white transition-colors duration-200"
//             aria-label="Close video"
//           >
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               className="w-4 h-4"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* youtube embed - 16:9 */}
//         <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
//           <iframe
//             className="absolute inset-0 w-full h-full"
//             src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
//             title={video.title}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── MAIN SECTION ─────────────────────────────────────────────────────────────
// export default function PropertyVideos() {
//   const [activeVideo, setActiveVideo] = useState(null);
//   const [isPaused, setisPaused] = useState(false);
//   const trackRef = useRef(null);

//   return (
//     <section
//       className="relative py-24 overflow-hidden"
//       style={{
//         background:
//           "linear-gradient(160deg, #0f1420 0%, #1a1f2e 50%, #0f1420 100%)",
//       }}
//     >
//       {/* Ambient gold glow */}
//       <div
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
//             w-[700px] h-[300px] rounded-full blur-3xl opacity-10 pointer-events-none"
//         style={{
//           background: "radial-gradient(ellipse, #c9a96e 0%, transparent 70%)",
//         }}
//       />

//       {/* Top gold border */}
//       <div
//         className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
//         style={{
//           background:
//             "linear-gradient(90deg, transparent, #c9a96e, transparent)",
//         }}
//       />

//       <div className="relative container mx-auto px-4 mb-12">
//         {/* Header */}
//         <div className="text-center">
//           <div
//             className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full
//                           border border-amber-400/30 bg-amber-400/10"
//           >
//             <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
//             <span className="text-amber-300 text-xs font-semibold tracking-widest uppercase">
//               Property Walkthroughs
//             </span>
//           </div>

//           <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
//             See Properties{" "}
//             <span className="relative inline-block">
//               <span className="text-amber-300">In Action</span>
//               <span
//                 className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full opacity-60"
//                 style={{
//                   background: "linear-gradient(90deg, #c9a96e, #e8c98a)",
//                 }}
//               />
//             </span>
//           </h2>
//           <p className="text-gray-400 max-w-xl mx-auto">
//             Explore our properties through immersive video tours — from drone
//             flyovers to interior walkthroughs.
//           </p>
//         </div>
//       </div>

//       {/* infinite scroll track */}
//       <div
//         className="relative overflow-hidden"
//         onMouseEnter={() => setisPaused(true)}
//         onMouseLeave={() => setisPaused(false)}
//       >
//         {/* left fade */}
//         <div
//           className="absolute left-0 top-0 w-8 sm:w-24 h-full z-10 pointer-events-none"
//           style={{ background: "linear-gradient(90deg, #0f1420, transparent)" }}
//         />

//         {/* right fade */}
//         <div
//           className="absolute right-0 top-0 w-8 sm:w-24 h-full z-10 pointer-events-none"
//           style={{
//             background: "linear-gradient(-90deg, #0f1420, transparent)",
//           }}
//         />

//         <div
//           ref={trackRef}
//           //   className="flex gap-5 py-4 px-6"
//           //   style={{
//           //     width: "max-content",
//           //     animation: isPaused ? "none" : "scroll-left 30s linear infinite",
//           //   }}
//           // ✅ Fix — inline style for animation, keyframes already in globals.css
//           className="flex gap-5 py-4 px-6 w-max"
//           style={{
//             animation: isPaused ? "none" : "scroll-left 30s linear infinite",
//           }}
//         >
//           {LOOPED.map((video, i) => (
//             <VideoCard
//               key={`${video.id}-${i}`}
//               video={video}
//               onClick={setActiveVideo}
//             />
//           ))}
//         </div>
//       </div>

//       {/* CSS KEYFRAME (injected inline) */}
//       {/* <style jsx>{`
//         @keyframes scroll-left {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//       `}</style> */}

//       {/* MODAL */}
//       {activeVideo && (
//         <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
//       )}
//     </section>
//   );
// }

"use client";

// ─── Parth Estate Mart — Property Videos Showcase ─────────────────────────────
// Videos play DIRECTLY on the site via YouTube embedded player (no redirect)
// Auto-fetches latest videos from @parthestatemart1 | ID: UCPzGdbiRjnqGMp9ZmZgWKaQ

import { useState, useEffect } from "react";

const CHANNEL_ID = "UCPzGdbiRjnqGMp9ZmZgWKaQ";

function detectType(title = "") {
  const t = title.toLowerCase();
  if (t.includes("villa"))                                        return "Villa Tour";
  if (t.includes("plot") || t.includes("land"))                  return "Plot Tour";
  if (t.includes("flat") || t.includes("bhk") || t.includes("apartment")) return "Apartment Tour";
  if (t.includes("farm"))                                        return "Farm Land";
  if (t.includes("commercial") || t.includes("shop"))           return "Commercial";
  if (t.includes("house") || t.includes("home"))                return "House Tour";
  return "Property Tour";
}

// ─── PLAY ICON ────────────────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-1">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

// ─── VIDEO CARD ───────────────────────────────────────────────────────────────
function VideoCard({ video, onClick }) {
  const [src, setSrc] = useState(
    `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`
  );
  if (!video.youtubeId) return null;

  return (
    <button
      onClick={() => onClick(video)}
      className="group relative flex-shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden cursor-pointer focus:outline-none"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)", border: "1px solid rgba(168,216,120,0.08)" }}
      aria-label={`Play: ${video.title}`}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-44 overflow-hidden bg-gray-900">
        <img
          src={src}
          alt={video.title}
          onError={() => setSrc(`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white border-2 border-white/70 backdrop-blur-sm group-hover:scale-110 transition-all duration-300"
            style={{ background: "rgba(255,255,255,0.15)", boxShadow: "0 0 32px rgba(76,175,96,0.5)" }}
          >
            <PlayIcon />
          </div>
        </div>

        {/* "Play on site" hover hint */}
        <div className="absolute bottom-12 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ background: "rgba(45,122,58,0.85)", fontFamily: "sans-serif" }}>
            ▶ Play on site
          </span>
        </div>

        {/* Type badge */}
        <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: "linear-gradient(135deg, #2d7a3a, #4caf60)", fontFamily: "sans-serif" }}>
          {video.type}
        </span>
      </div>

      {/* Info */}
      <div className="px-4 py-3 text-left" style={{ background: "rgba(10,20,12,0.97)", borderTop: "1px solid rgba(100,200,100,0.07)" }}>
        <h3 className="text-white font-semibold text-sm leading-snug mb-1 line-clamp-2 group-hover:text-green-300 transition-colors duration-200">
          {video.title}
        </h3>
        <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(160,210,130,0.5)", fontFamily: "sans-serif" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3 shrink-0" style={{ color: "#4caf60" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {video.location}
        </div>
      </div>

      {/* Green sweep */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: "linear-gradient(90deg, #2d7a3a, #a8d878)" }} />
    </button>
  );
}

// ─── ON-SITE VIDEO MODAL ─────────────────────────────────────────────────────
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
        style={{ boxShadow: "0 32px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(168,216,120,0.2)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #1a5c28, #a8d878, #4caf60, #1a5c28)" }} />

        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4" style={{ background: "rgba(8,16,10,0.99)" }}>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "rgba(168,216,120,0.5)", fontFamily: "sans-serif" }}>
              Now Playing · Parth Estate Mart
            </p>
            <h3 className="text-white font-semibold text-base leading-snug truncate" style={{ fontFamily: "Georgia, serif" }}>
              {video.title}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "rgba(168,216,120,0.4)", fontFamily: "sans-serif" }}>
              {video.location}
            </p>
          </div>

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

        {/* ══ YOUTUBE EMBEDDED PLAYER — plays on this site ══ */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%", background: "#000" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&color=white`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ border: "none" }}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 gap-3" style={{ background: "rgba(8,16,10,0.99)", borderTop: "1px solid rgba(168,216,120,0.07)" }}>
          <p className="text-xs" style={{ color: "rgba(168,216,120,0.3)", fontFamily: "sans-serif" }}>
            Press <kbd className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}>Esc</kbd> or click outside to close
          </p>
          <a
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs transition-colors duration-200 hover:text-white"
            style={{ color: "rgba(168,216,120,0.35)", fontFamily: "sans-serif" }}
          >
            <svg viewBox="0 0 24 24" fill="#ff4444" className="w-3.5 h-3.5">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Open in YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── SKELETON ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden animate-pulse" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(168,216,120,0.06)" }}>
      <div className="w-full h-44" style={{ background: "rgba(255,255,255,0.07)" }} />
      <div className="px-4 py-3" style={{ background: "rgba(10,20,12,0.97)" }}>
        <div className="h-3 rounded mb-2" style={{ background: "rgba(255,255,255,0.08)", width: "80%" }} />
        <div className="h-2.5 rounded" style={{ background: "rgba(255,255,255,0.05)", width: "55%" }} />
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function PropertyVideos() {
  const [videos, setVideos]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPaused, setIsPaused]       = useState(false);

  useEffect(() => {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=12`;
    fetch(apiUrl)
      .then((r) => r.json())
      .then((data) => {
        if (data.status !== "ok" || !data.items?.length) throw new Error("empty");
        const parsed = data.items
          .map((item, i) => {
            const match = item.link?.match(/[?&]v=([^&]+)/);
            return { id: `yt-${i}`, youtubeId: match?.[1] || "", title: item.title || "Property Tour", location: "Noida / Greater Noida, UP", type: detectType(item.title) };
          })
          .filter((v) => v.youtubeId);
        setVideos(parsed);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const looped = videos.length > 0 ? [...videos, ...videos] : [];
  const speed  = Math.max(30, looped.length * 3);

  return (
    <section className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(160deg, #0d1a0f 0%, #0f2218 50%, #0a1208 100%)" }}>
      <style>{`@keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse, #4caf60 0%, transparent 70%)" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px" style={{ background: "linear-gradient(90deg, transparent, #4caf60, transparent)" }} />

      {/* Header */}
      <div className="relative container mx-auto px-4 mb-12 text-center">
        <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full" style={{ border: "1px solid rgba(100,200,100,0.3)", background: "rgba(100,200,100,0.08)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(160,220,130,0.8)", fontFamily: "sans-serif" }}>Watch Property Videos</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
          See Properties{" "}
          <span className="relative inline-block">
            <span style={{ color: "#a8d878" }}>In Action</span>
            <span className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full opacity-60" style={{ background: "linear-gradient(90deg, #2d7a3a, #a8d878)" }} />
          </span>
        </h2>

        <p className="max-w-xl mx-auto mb-4" style={{ fontFamily: "sans-serif", color: "rgba(160,210,130,0.45)" }}>
          Click any video card to watch it right here — no redirects, no new tabs.
        </p>

        {/* On-site badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs" style={{ background: "rgba(45,122,58,0.15)", border: "1px solid rgba(45,122,58,0.3)", color: "rgba(168,216,120,0.7)", fontFamily: "sans-serif" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
          Videos play directly on this page
        </div>
      </div>

      {/* Scroll track */}
      <div className="relative overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className="absolute left-0 top-0 w-8 sm:w-24 h-full z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, #0d1a0f, transparent)" }} />
        <div className="absolute right-0 top-0 w-8 sm:w-24 h-full z-10 pointer-events-none" style={{ background: "linear-gradient(-90deg, #0d1a0f, transparent)" }} />

        {loading ? (
          <div className="flex gap-5 py-4 px-6 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error || videos.length === 0 ? (
          <div className="flex items-center justify-center py-16 px-4 text-center">
            <div>
              <p className="mb-4" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "sans-serif" }}>Could not load videos. Please try again later.</p>
              <a href="https://youtube.com/@parthestatemart1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #cc0000, #ff4444)", fontFamily: "sans-serif" }}>
                View on YouTube
              </a>
            </div>
          </div>
        ) : (
          <div className="flex gap-5 py-4 px-6 w-max" style={{ animation: isPaused ? "none" : `scroll-left ${speed}s linear infinite` }}>
            {looped.map((video, i) => (
              <VideoCard key={`${video.id}-${i}`} video={video} onClick={setActiveVideo} />
            ))}
          </div>
        )}
      </div>

      {!loading && !error && videos.length > 0 && (
        <p className="text-center mt-8 text-xs" style={{ color: "rgba(160,210,130,0.3)", fontFamily: "sans-serif" }}>
          {videos.length} latest videos · Auto-updates with every new upload
        </p>
      )}

      {/* ON-SITE PLAYER */}
      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </section>
  );
}