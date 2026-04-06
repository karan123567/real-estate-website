"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// ── SLIDESHOW IMAGES ───────────────────────────────────────────────────────
// Replace these src paths with your actual property images.
// Recommended: 1920×1080 or wider JPEGs/WebPs for best quality.
const SLIDES = [
  {
    src: "/assets/images/farmhouse image2.jpeg",
    alt: "Luxury villa with pool",
  },
  {
    src: "/assets/images/farmhouse image1.jpeg",
    alt: "Modern apartment skyline view",
  },
  // {
  //   src: "/assets/images/slide-3.jpg",
  //   alt: "Premium commercial space",
  // },
  // {
  //   src: "/assets/images/slide-4.jpg",
  //   alt: "Elegant plot with garden",
  // },
];

const SLIDE_INTERVAL = 5000; // ms between transitions

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(
      () => goTo((current + 1) % SLIDES.length),
      SLIDE_INTERVAL,
    );
    return () => clearInterval(timer);
  }, [current]);

  function goTo(index) {
    if (animating || index === current) return;
    setPrev(current);
    setCurrent(index);
    setAnimating(true);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 900); // must match CSS transition duration
  }

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ minHeight: "100svh" }}
    >
      {/* ── SLIDESHOW IMAGES ─────────────────────────────────────────────── */}
      {SLIDES.map((slide, i) => {
        const isActive = i === current;
        const isPrev = i === prev;
        return (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover select-none"
            style={{
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
              opacity: isActive ? 1 : 0,
              transform: isActive
                ? "scale(1.04)"
                : isPrev
                  ? "scale(1)"
                  : "scale(1.04)",
              transition: isActive
                ? "opacity 0.9s ease, transform 6s ease"
                : isPrev
                  ? "opacity 0.9s ease"
                  : "none",
            }}
          />
        );
      })}

      {/* ── OVERLAYS ─────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.68) 100%)",
        }}
      />
      {/* Warm-gold luxury tint */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(120,53,15,0.18) 0%, transparent 60%)",
        }}
      />

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <div className="relative z-20 container mx-auto px-4 py-28 text-center flex flex-col items-center justify-center min-h-[100svh]">
        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-300 text-xs md:text-sm font-medium tracking-widest uppercase">
            Premium Properties · India
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5 drop-shadow-[0_2px_24px_rgba(0,0,0,0.8)]">
          Find Your Perfect{" "}
          <span className="relative inline-block">
            <span className="text-amber-300">Home</span>
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400/60 rounded-full" />
          </span>{" "}
          in Noida
        </h1>

        {/* Sub-tagline */}
        <p className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto mb-3 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
          Discover verified properties, trusted agents, and the best real estate
          opportunities across Noida city.
        </p>

        {/* Category micro-copy */}
        <p className="text-sm text-amber-200/70 tracking-wide mb-10">
          Villas · Apartments · Commercial Spaces · Plots
        </p>

        {/* CTA buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-14">
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
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-gray-400 text-xs md:text-sm">
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

      {/* ── SLIDE DOTS ───────────────────────────────────────────────────── */}
      {/* <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full transition-all duration-300 focus:outline-none"
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              background: i === current ? "#fbbf24" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div> */}

      {/* ── SCROLL INDICATOR ─────────────────────────────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/40 text-xs tracking-widest">
         <span>SCROLL</span>
        {" "}
        <span className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        {" "}
      </div>
    </section>
  );
}
