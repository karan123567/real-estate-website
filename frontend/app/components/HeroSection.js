// // PURPOSE: Homepage Hero Section (Corporate Indian Real Estate)

// import Link from 'next/link';

// export default function HeroSection() {
//   return (
//     <section className="bg-gray-900 text-white relative">
//       <div className="container mx-auto px-4 py-28 text-center">
//         <h1 className="font-playfair text-5xl md:text-6xl font-bold leading-tight mb-6">
//           Find Your Perfect Home in India
//         </h1>

//         <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
//           Discover verified properties, trusted agents, and the best real estate
//           opportunities across major Indian cities.
//         </p>

//         <div className="flex justify-center gap-4 flex-wrap">
//           <Link
//             href="/properties"
//             className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold
//                        hover:bg-gray-200 transition-colors"
//           >
//             Browse Properties
//           </Link>

//           <Link
//             href="/contact"
//             className="border border-white px-8 py-4 rounded-lg font-semibold
//                        hover:bg-white hover:text-gray-900 transition-colors"
//           >
//             Contact Us
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay blocked — silently fallback to poster image
      });
    }
  }, []);

  return (
    <section className="br-gray-900 text-white relative overflow-hidden">
      {/* ── VIDEO BACKGROUND ──────────────────────────────────────────────────
          Replace src with your actual drone villa video, e.g.:
            src="/videos/villa-drone.mp4"
          Add a high-quality still for the loading / autoplay-blocked state:
            poster="/images/villa-poster.jpg"
      ──────────────────────────────*/}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/video/villa-video.mp4"
        poster="/assets/images/villa-image.jpg"
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setIsLoaded(true)}
        aria-hidden="true"
      />

      {/* layered overlays */}
      {/* Primary dark vignette - keeps text legiable on any footage */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
      {/* subtle warm-gold tint for a luxuary real-estate feel */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/20 via-transparent to-transparent z-10" />

      {/* content */}
      <div className="relative z-20 container mx-auto px-4 py-28 text-center">
        {/* eyebrow pill */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-300 text-xs md:text-sm font-medium tracking-widest uppercase">
            Premium Properties · India
          </span>
        </div>

        {/* Main headine - font playfair preserved from original */}
        <h1 className="font-playfair text-5xl md:text-6xl font-bold leading-tight mb-5 drop-shadow-[0_2px_24px_rgba(0,0,0,0.8)]">
          Find Your Perfect{" "}
          <span className="relative inline-block">
            <span className="text-amber-300">Home</span>
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400/60 rounded-full" />
          </span>{" "}
          in India
        </h1>

        {/* Sub-tagline */}
        <p className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto mb-3 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
          Discover verified properties, trusted agents, and the best real estate
          opportunities across major Indian cities.
        </p>

        {/* category micro-copy */}
        <p className="text-sm text-amber-200/70 tracking-wide mb-10">
          Villas · Apartments · Commercial Spaces · Plots
        </p>

        {/* CTA buttons - identivcal hrefs. upgraded styling */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/properties"
            className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 hover:shadow-[0_0_24px_rgba(251,191,36,0.35)] transition-all duration-300 active:scale-95"
          >
            Browse Properties
          </Link>

          <Link
            href="/contact"
            className="border border-white/70 px-8 py-4 rounded-lg font-semibold backdrop-blur-sm bg-white/5 hover:bg-white hover:text-gray-900 hover:border-white transition-all duration-300 active:scale-95"
          >
            Contact Us
          </Link>
        </div>

        {/* Trust strip */}
        <div className="mt-14 flex flex-wrap justify-center gap-6 md:gap-10 text-gray-400 text-xs md:text-sm">
          {[
            { value: "10,000+", label: "Verified Listings" },
            { value: "50+", label: "Cities Covered" },
            { value: "98%", label: "Happy Clients" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-white font-semibold text-base md:text-lg">
                {value}
              </span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/40 text-xs tracking-widest">
        <span>SCROLL</span>
        <span className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
