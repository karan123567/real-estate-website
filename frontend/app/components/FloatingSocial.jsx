// "use client";

// // ─── FloatingSocial.jsx ───────────────────────────────────────────────────────
// // Fixed floating sidebar on the LEFT side of every page
// // Add <FloatingSocial /> inside your root layout.jsx, outside <main>

// export default function FloatingSocial() {
//   const WHATSAPP_NUMBER = "919319025925"; // 91 = India country code + number (no + or spaces)
//   const WHATSAPP_MESSAGE = "Hello! I'm interested in a property from Parth Estate Mart.";
//   const INSTAGRAM_URL = "https://www.instagram.com/parth_estate__mart";

//   const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

//   return (
//     <div
//       className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-start"
//       style={{ gap: "2px" }}
//     >
//       {/* WhatsApp */}
//       <a
//         href={whatsappUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         aria-label="Chat on WhatsApp"
//         className="group flex items-center rounded-r-2xl overflow-hidden transition-all duration-300"
//         style={{
//           background: "#25d366",
//           boxShadow: "2px 2px 16px rgba(37,211,102,0.35)",
//           width: "48px",
//           height: "48px",
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.width = "160px";
//           e.currentTarget.style.boxShadow = "4px 4px 24px rgba(37,211,102,0.5)";
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.width = "48px";
//           e.currentTarget.style.boxShadow = "2px 2px 16px rgba(37,211,102,0.35)";
//         }}
//       >
//         {/* Icon */}
//         <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
//           <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
//             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//           </svg>
//         </div>
//         {/* Label — slides in on hover */}
//         <span
//           className="whitespace-nowrap text-white text-xs font-semibold pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//           style={{ fontFamily: "sans-serif", transitionDelay: "100ms" }}
//         >
//           Chat with us
//         </span>
//       </a>

//       {/* Spacer */}
//       <div style={{ height: "6px" }} />

//       {/* Instagram */}
//       <a
//         href={`https://www.instagram.com/parth_estate__mart?utm_source=qr&igsh=d3lleWFuZmRrODRv`}
//         target="_blank"
//         rel="noopener noreferrer"
//         aria-label="Follow on Instagram"
//         className="group flex items-center rounded-r-2xl overflow-hidden transition-all duration-300"
//         style={{
//           background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
//           boxShadow: "2px 2px 16px rgba(253,29,29,0.3)",
//           width: "48px",
//           height: "48px",
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.width = "165px";
//           e.currentTarget.style.boxShadow = "4px 4px 24px rgba(253,29,29,0.45)";
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.width = "48px";
//           e.currentTarget.style.boxShadow = "2px 2px 16px rgba(253,29,29,0.3)";
//         }}
//       >
//         {/* Icon */}
//         <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
//           <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
//             <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//           </svg>
//         </div>
//         {/* Label */}
//         <span
//           className="whitespace-nowrap text-white text-xs font-semibold pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//           style={{ fontFamily: "sans-serif", transitionDelay: "100ms" }}
//         >
//           Follow us
//         </span>
//       </a>
//     </div>
//   );
// }

"use client";

// ─── FloatingSocial.jsx ───────────────────────────────────────────────────────
// Fixed floating sidebar on the LEFT side of every page
// Add <FloatingSocial /> inside your root layout.jsx, outside <main>

export default function FloatingSocial() {
  const WHATSAPP_NUMBER  = "+919319025925";
  const WHATSAPP_MESSAGE = "Hello! I'm interested in a property from Parth Estate Mart.";
  const whatsappUrl      = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const INSTAGRAM_URL    = "https://www.instagram.com/parth_estate__mart";
  const FACEBOOK_URL     = "https://www.facebook.com/share/18gnmhXaUY/";

  // ── Shared button size ──────────────────────────────────────────────────────
  // Desktop: 48px collapsed → expands on hover
  // Mobile:  40px, no expand (touch devices don't have hover)
  const ICON_SIZE        = "w-10 h-10 sm:w-12 sm:h-12";
  const COLLAPSED_WIDTH  = "40px";
  const COLLAPSED_WIDTH_SM = "48px";

  const handleEnter = (e, expandedWidth, shadow) => {
    // Only expand on non-touch (pointer: fine) — handled via CSS
    e.currentTarget.style.width = expandedWidth;
    e.currentTarget.style.boxShadow = shadow;
  };

  const handleLeave = (e, shadow) => {
    e.currentTarget.style.width = COLLAPSED_WIDTH_SM;
    e.currentTarget.style.boxShadow = shadow;
  };

  return (
    <>
      {/* ── Responsive expand: only on sm+ screens ── */}
      <style>{`
        @media (max-width: 639px) {
          .social-btn { width: 40px !important; }
          .social-label { display: none !important; }
        }
      `}</style>

      <div
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-start"
        style={{ gap: "6px" }}
      >

        {/* ── WhatsApp ── */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="social-btn group flex items-center rounded-r-2xl overflow-hidden transition-all duration-300"
          style={{
            background: "#25d366",
            boxShadow: "2px 2px 16px rgba(37,211,102,0.35)",
            width: COLLAPSED_WIDTH_SM,
            height: "48px",
          }}
          onMouseEnter={(e) => handleEnter(e, "165px", "4px 4px 24px rgba(37,211,102,0.5)")}
          onMouseLeave={(e) => handleLeave(e, "2px 2px 16px rgba(37,211,102,0.35)")}
        >
          <div className={`flex-shrink-0 ${ICON_SIZE} flex items-center justify-center`}>
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <span className="social-label whitespace-nowrap text-white text-xs font-semibold pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ fontFamily: "sans-serif", transitionDelay: "100ms" }}>
            Chat with us
          </span>
        </a>

        {/* ── Facebook ── */}
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow on Facebook"
          className="social-btn group flex items-center rounded-r-2xl overflow-hidden transition-all duration-300"
          style={{
            background: "#1877f2",
            boxShadow: "2px 2px 16px rgba(24,119,242,0.35)",
            width: COLLAPSED_WIDTH_SM,
            height: "48px",
          }}
          onMouseEnter={(e) => handleEnter(e, "165px", "4px 4px 24px rgba(24,119,242,0.5)")}
          onMouseLeave={(e) => handleLeave(e, "2px 2px 16px rgba(24,119,242,0.35)")}
        >
          <div className={`flex-shrink-0 ${ICON_SIZE} flex items-center justify-center`}>
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
          <span className="social-label whitespace-nowrap text-white text-xs font-semibold pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ fontFamily: "sans-serif", transitionDelay: "100ms" }}>
            Follow on Facebook
          </span>
        </a>

        {/* ── Instagram ── */}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow on Instagram"
          className="social-btn group flex items-center rounded-r-2xl overflow-hidden transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
            boxShadow: "2px 2px 16px rgba(253,29,29,0.3)",
            width: COLLAPSED_WIDTH_SM,
            height: "48px",
          }}
          onMouseEnter={(e) => handleEnter(e, "165px", "4px 4px 24px rgba(253,29,29,0.45)")}
          onMouseLeave={(e) => handleLeave(e, "2px 2px 16px rgba(253,29,29,0.3)")}
        >
          <div className={`flex-shrink-0 ${ICON_SIZE} flex items-center justify-center`}>
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
          <span className="social-label whitespace-nowrap text-white text-xs font-semibold pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ fontFamily: "sans-serif", transitionDelay: "100ms" }}>
            Follow us
          </span>
        </a>

      </div>
    </>
  );
}