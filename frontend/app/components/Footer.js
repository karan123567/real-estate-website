
// import Link from "next/link";

// export default function Footer() {
//   const year = new Date().getFullYear();

//   return (
//     <footer className="relative overflow-hidden border-t-2 border-blue-100">
//       {/* ── Light background — clearly different from dark page sections ── */}
//       <div
//         className="absolute inset-0 -z-10"
//         style={{
//           background:
//             "linear-gradient(160deg, #f0f7ff 0%, #e8f2ff 40%, #f8faff 100%)",
//         }}
//       />

//       {/* Decorative top-left orb */}
//       <div
//         className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full -z-10"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
//         }}
//       />
//       {/* Decorative bottom-right orb */}
//       <div
//         className="pointer-events-none absolute -bottom-16 -right-16 h-52 w-52 rounded-full -z-10"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)",
//         }}
//       />

//       {/* ── Main grid ── */}
//       <div className="container mx-auto px-4 py-14 sm:py-16">
//         <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
//           {/* Brand column */}
//           <div className="sm:col-span-2 lg:col-span-1">
//             <div className="mb-5 flex items-center gap-2.5">
//               <div
//                 className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-blue-600"
//                 style={{
//                   background: "rgba(59,130,246,0.1)",
//                   border: "1px solid rgba(59,130,246,0.2)",
//                 }}
//               >
//                 ◈
//               </div>
//               <span
//                 className="text-xl font-bold tracking-wide text-gray-900"
//                 style={{ fontFamily: "Georgia, serif" }}
//               >
//                 Parth<span className="text-blue-600">estatemart</span>
//               </span>
//             </div>

//             <p className="mb-6 max-w-xs text-sm leading-relaxed text-gray-500">
//               Your trusted partner for verified properties across NCR. From
//               first home to dream home — we've got you covered.
//             </p>

//             {/* Social buttons */}
//             <div className="flex gap-2">
//               {[
//                 { label: "Instagram", icon: "IG" },
//                 { label: "LinkedIn", icon: "FB" },
//                 { label: "Twitter", icon: "TW" },
//               ].map((s) => (
//                 <button
//                   key={s.label}
//                   aria-label={s.label}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg
//                              text-[10px] font-semibold text-blue-500
//                              border border-blue-100 bg-white
//                              transition-all hover:border-blue-300 hover:bg-blue-50
//                              hover:text-blue-700 shadow-sm cursor-pointer"
//                 >
//                   {s.icon}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Navigate */}
//           <div>
//             <h4 className="mb-5 text-[10px] tracking-[0.25em] uppercase font-semibold text-blue-500">
//               Navigate
//             </h4>
//             <ul className="space-y-3">
//               {[
//                 { label: "Browse Properties", href: "/properties" },
//                 { label: "About Us", href: "/about" },
//                 { label: "Contact", href: "/contact" },
//               ].map((link) => (
//                 <li key={link.href}>
//                   <Link
//                     href={link.href}
//                     className="group flex items-center gap-2 text-sm text-gray-500
//                                transition-colors hover:text-blue-800"
//                   >
//                     <span
//                       className="h-px w-3 rounded-full bg-blue-300 transition-all
//                                  duration-300 group-hover:w-5 group-hover:bg-blue-500"
//                     />
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Property Types */}
//           <div>
//             <h4 className="mb-5 text-[10px] tracking-[0.25em] uppercase font-semibold text-blue-500">
//               Property Types
//             </h4>
//             <ul className="space-y-3">
//               {[
//                 "Apartments",
//                 "Independent Houses",
//                 "Villas",
//                 "Commercial",
//                 "Plots",
//               ].map((t) => (
//                 <li key={t}>
//                   <Link
//                     href={`/properties?propertyType=${t.toLowerCase().replace(" ", "_")}`}
//                     className="group flex items-center gap-2 text-sm text-gray-500
//                                transition-colors hover:text-blue-800"
//                   >
//                     <span
//                       className="h-px w-3 rounded-full bg-blue-300 transition-all
//                                  duration-300 group-hover:w-5 group-hover:bg-blue-500"
//                     />
//                     {t}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="mb-5 text-[10px] tracking-[0.25em] uppercase font-semibold text-blue-500">
//               Get In Touch
//             </h4>
//             <div className="space-y-4">
//               {[
//                 { icon: "✉️", label: "Email", value: "cschandrahr@gmail.com" },
//                 { icon: "📞", label: "Phone", value: "+91 93190 25925" },
//                 {
//                   icon: "📍",
//                   label: "Office",
//                   value: "Plot No-A-40, Gali No-4, Rajender Nagar Indl.Area Mohan Nagar, Ghaziabad(UP)-201007",
//                 },
//               ].map((item) => (
//                 <div key={item.label} className="flex items-start gap-3">
//                   <div
//                     className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center
//                                justify-center rounded-lg text-xs bg-white
//                                border border-blue-100 shadow-sm"
//                   >
//                     {item.icon}
//                   </div>
//                   <div>
//                     <p className="mb-0.5 text-[10px] uppercase tracking-widest text-blue-800">
//                       {item.label}
//                     </p>
//                     <p className="text-sm leading-snug text-gray-500">
//                       {item.value}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Bottom bar ── */}
//       <div className="border-t border-blue-100 bg-white/60">
//         <div
//           className="container mx-auto flex flex-col items-center justify-between
//                         gap-3 px-4 py-4 text-center sm:flex-row sm:text-left"
//         >
//           <p className="text-[11px] text-gray-700">
//             © {year} Parthestatemart. All rights reserved.
//           </p>
//           <div className="flex items-center gap-4">
//             {["Privacy Policy", "Terms of Service"].map((item) => (
//               <Link
//                 key={item}
//                 href="#"
//                 className="text-[11px] text-gray-700 transition-colors hover:text-blue-500"
//               >
//                 {item}
//               </Link>
//             ))}
//           </div>
//           <div className="flex items-center gap-1.5">
//             <div
//               className="h-1.5 w-1.5 rounded-full bg-green-400"
//               style={{ boxShadow: "0 0 5px #4ade80" }}
//             />
//             <span className="text-[11px] text-gray-700">
//               All systems operational
//             </span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

"use-cleint";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t-2 border-blue-100">
      {/* ── Light background ── */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(160deg, #f0f7ff 0%, #e8f2ff 40%, #f8faff 100%)" }}
      />
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full -z-10"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }}
      />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-52 w-52 rounded-full -z-10"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)" }}
      />

      {/* ── Main grid ── */}
      <div className="container mx-auto px-4 py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5 flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-blue-600"
                style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}
              >
                ◈
              </div>
              <span className="text-xl font-bold tracking-wide text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
                Parth<span className="text-blue-600">estatemart</span>
              </span>
            </div>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-gray-500">
              Your trusted partner for verified properties across NCR. From
              first home to dream home — we've got you covered.
            </p>

            {/* Social buttons — real links */}
            <div className="flex gap-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/parth_estate__mart"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-white shadow-sm transition-all hover:bg-pink-50 hover:border-pink-300 hover:text-pink-600 text-gray-400 border-blue-100"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/18gnmhXaUY/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-white shadow-sm transition-all hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 text-gray-400 border-blue-100"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@parthestatemart1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-white shadow-sm transition-all hover:bg-red-50 hover:border-red-400 hover:text-red-600 text-gray-400 border-blue-100"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="mb-5 text-[10px] tracking-[0.25em] uppercase font-semibold text-blue-500">Navigate</h4>
            <ul className="space-y-3">
              {[
                { label: "Browse Properties", href: "/properties" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-blue-800">
                    <span className="h-px w-3 rounded-full bg-blue-300 transition-all duration-300 group-hover:w-5 group-hover:bg-blue-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="mb-5 text-[10px] tracking-[0.25em] uppercase font-semibold text-blue-500">Property Types</h4>
            <ul className="space-y-3">
              {["Apartments", "Independent Houses", "Villas", "Commercial", "Plots"].map((t) => (
                <li key={t}>
                  <Link href={`/properties?propertyType=${t.toLowerCase().replace(" ", "_")}`} className="group flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-blue-800">
                    <span className="h-px w-3 rounded-full bg-blue-300 transition-all duration-300 group-hover:w-5 group-hover:bg-blue-500" />
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-[10px] tracking-[0.25em] uppercase font-semibold text-blue-500">Get In Touch</h4>
            <div className="space-y-4">
              {[
                { icon: "✉️", label: "Email", value: "cschandrahr@gmail.com" },
                { icon: "📞", label: "Phone", value: "+91 93190 25925" },
                { icon: "📍", label: "Office", value: "Plot No-A-40, Gali No-4, Rajender Nagar Indl.Area Mohan Nagar, Ghaziabad(UP)-201007" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-xs bg-white border border-blue-100 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="mb-0.5 text-[10px] uppercase tracking-widest text-blue-800">{item.label}</p>
                    <p className="text-sm leading-snug text-gray-500">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-blue-100 bg-white/60">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-4 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] text-gray-700">© {year} Parthestatemart. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <Link key={item} href="#" className="text-[11px] text-gray-700 transition-colors hover:text-blue-500">
                {item}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400" style={{ boxShadow: "0 0 5px #4ade80" }} />
            <span className="text-[11px] text-gray-700">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}