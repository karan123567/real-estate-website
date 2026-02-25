"use client";  // ✅ Fix #1 — Add this at the very top

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [  // ✅ Fix #3 — was NAV_LINK, used as NAV_LINKS everywhere
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/aboutus", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const pathname = usePathname();
  const sentinelRef = useRef(null);  // ✅ Fix #2 — consistent casing

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 },
    );
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);  // ✅ Fix #2
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const handlekey = (e) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    if (isMobileOpen) {
      window.addEventListener("keydown", handlekey);
    }
    return () => window.removeEventListener("keydown", handlekey);
  }, [isMobileOpen]);

  const headerStyles = isScrolled
    ? "bg-white shadow-md py-3"
    : "bg-transparent py-5";

  const textColor = isScrolled ? "text-gray-800" : "text-white";

  return (
    <>
      <div ref={sentinelRef} className="absolute top-0 h-[1px] w-full" />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerStyles}`}
      >
        <nav className="container mx-auto px-4 flex items-center justify-between">
          <Link
            href="/"
            className={`text-2xl font-bold transition-colors ${textColor}`}
          >
            LuxEstate
          </Link>

          <ul className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`${textColor} font-medium hover:opacity-70 transition
                            ${isActive ? "underline underline-offset-4 font-semibold" : ""}`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ✅ Fix #4 & #5 — heref → href, br-gray-900 → bg-gray-900 */}
          <Link
            href="/contact"
            className="hidden md:block bg-gray-900 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Get in Touch
          </Link>

          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-expanded={isMobileOpen}
            aria-label="Toggle navigation"
            className={`md:hidden p-2 ${textColor}`}
          >
            {isMobileOpen ? "✕" : "☰"}
          </button>
        </nav>

        <div
          className={`md:hidden bg-white transition-transform duration-300 ease-in-out
                ${isMobileOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
        >
          <ul>
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block px-6 py-4 border-b border-gray-100
                      ${isActive ? "bg-gray-50 font-semibold" : ""}`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="p-4">
            <Link
              href="/contact"
              className="block w-full text-center bg-gray-900 text-white py-3 rounded-lg font-semibold"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
