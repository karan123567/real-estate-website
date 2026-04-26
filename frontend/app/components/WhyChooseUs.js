// // PURPOSE: Why Choose Us section

// export default function WhyChooseUs() {
//   const points = [
//     {
//       title: 'Verified Listings',
//       desc: 'All properties are thoroughly verified for authenticity and legal compliance.',
//     },
//     {
//       title: 'Trusted Agents',
//       desc: 'Work with experienced real estate professionals across India.',
//     },
//     {
//       title: 'Transparent Pricing',
//       desc: 'No hidden charges. Clear pricing with full documentation support.',
//     },
//   ];

//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-14">
//           <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
//             Why Choose LuxEstate
//           </h2>
//           <p className="text-gray-600 max-w-xl mx-auto">
//             We make property buying and renting simple, transparent, and secure.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-10">
//           {points.map((point) => (
//             <div
//               key={point.title}
//               className="border border-gray-200 rounded-xl p-8 hover:shadow-md transition-shadow"
//             >
//               <h3 className="text-xl font-semibold text-gray-900 mb-3">
//                 {point.title}
//               </h3>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 {point.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// PURPOSE: Why Choose Us section — luxury real estate, warm editorial tone

// export default function WhyChooseUs() {
//   const points = [
//     {
//       number: "01",
//       title: "Verified Listings",
//       desc: "All properties are thoroughly verified for authenticity and legal compliance.",
//       icon: (
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           className="w-7 h-7"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
//           />
//         </svg>
//       ),
//     },
//     {
//       number: "02",
//       title: "Trusted Agents",
//       desc: "Work with experienced real estate professionals across India.",
//       icon: (
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           className="w-7 h-7"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
//           />
//         </svg>
//       ),
//     },
//     {
//       number: "03",
//       title: "Transparent Pricing",
//       desc: "No hidden charges. Clear pricing with full documentation support.",
//       icon: (
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           className="w-7 h-7"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
//           />
//         </svg>
//       ),
//     },
//   ];

//   return (
//     <section
//       className="relative py-24 overflow-hidden"
//       style={{
//         background:
//           "linear-gradient(160deg, #ede8e0 0%, #f0ebe2    50%, #e8dfd3 100%)",
//       }}
//     >
//       {/* Decorative background elements */}
//       <div
//         className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
//         style={{
//           background: "radial-gradient(circle, #c9a96e 0%, transparent 70%)",
//         }}
//       />
//       <div
//         className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-15 blur-3xl"
//         style={{
//           background: "radial-gradient(circle, #b8936a 0%, transparent 70%)",
//         }}
//       />

//       {/* Large faint background number */}
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
//         <span className="font-playfair text-[20rem] font-bold opacity-[0.06] text-gray-900 leading-none">
//           WHY
//         </span>
//       </div>

//       <div className="relative container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div
//             className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full
//                           border border-amber-400/40 bg-amber-400/10"
//           >
//             <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
//             <span className="text-amber-700 text-xs font-semibold tracking-widest uppercase">
//               Our Promise
//             </span>
//           </div>

//           <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Why Choose{" "}
//             <span className="relative inline-block">
//               LuxEstate
//               <span
//                 className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
//                 style={{
//                   background: "linear-gradient(90deg, #c9a96e, #e8c98a)",
//                 }}
//               />
//             </span>
//           </h2>
//           <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg">
//             We make property buying and renting simple, transparent, and secure.
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
//           {points.map((point, i) => (
//             <div
//               key={point.title}
//               className="group relative rounded-2xl p-8 bg-white border border-amber-100
//                          hover:border-amber-300 hover:-translate-y-1
//                          transition-all duration-300 overflow-hidden"
//               style={{ boxShadow: "0 4px 24px rgba(180,140,80,0.08)" }}
//             >
//               {/* Hover glow */}
//               <div
//                 className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, rgba(201,169,110,0.06) 0%, transparent 60%)",
//                 }}
//               />

//               {/* Large faint number */}
//               <div
//                 className="absolute top-4 right-5 font-playfair text-6xl font-bold text-gray-300
//                               select-none group-hover:text-amber-100 transition-colors duration-300"
//               >
//                 {point.number}
//               </div>

//               {/* Icon */}
//               <div
//                 className="relative mb-5 w-14 h-14 rounded-xl flex items-center justify-center text-amber-700
//                               group-hover:scale-110 transition-transform duration-300"
//                 style={{
//                   background: "linear-gradient(135deg, #fef3dc, #fde9b8)",
//                 }}
//               >
//                 {point.icon}
//               </div>

//               {/* Text */}
//               <h3 className="relative text-xl font-bold text-gray-900 mb-3 font-playfair">
//                 {point.title}
//               </h3>
//               <p className="relative text-gray-500 text-sm leading-relaxed">
//                 {point.desc}
//               </p>

//               {/* Bottom accent line */}
//               <div
//                 className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full
//                               transition-all duration-500 rounded-full"
//                 style={{
//                   background: "linear-gradient(90deg, #c9a96e, #e8c98a)",
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

export default function WhyChooseUs() {
  const points = [
    {
      number: "01",
      title: "Verified Listings",
      desc: "Every property listed on Parth Estate Mart is thoroughly verified for legal compliance, ownership clarity, and authenticity — so you invest with complete confidence.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "18+ Years of Expertise",
      desc: "Led by Chandra Singh — MBA graduate with 18+ years of experience and 6 years in corporate — you get seasoned guidance at every step of your property journey.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Transparent Pricing",
      desc: "No hidden charges, no surprises. We believe in complete pricing clarity with full documentation support — because trust is built on honesty.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Plot & Farm Land Specialist",
      desc: "Specialising in residential plots, farm lands, and investment properties across Noida and Greater Noida — with deep local market knowledge you can rely on.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
      ),
    },
    {
      number: "05",
      title: "Client-First Always",
      desc: "From first inquiry to final handover, our team ensures every client feels heard, guided, and satisfied. Client satisfaction isn't a goal — it's our identity.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
    {
      number: "06",
      title: "End-to-End Support",
      desc: "We handle everything — site visits, documentation, legal checks, and registration guidance. You focus on finding your dream property; we handle the rest.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f0f7f0 0%, #e8f5e8 50%, #edf5ed 100%)" }}
    >
      {/* Decorative background orbs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #4caf60 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #2d7a3a 0%, transparent 70%)" }}
      />

      {/* Large faint background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[18rem] font-bold opacity-[0.04] text-green-900 leading-none" style={{ fontFamily: "Georgia, serif" }}>
          WHY
        </span>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
            style={{ border: "1px solid rgba(45,122,58,0.35)", background: "rgba(45,122,58,0.08)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#2d7a3a" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#2d7a3a", fontFamily: "sans-serif" }}>
              Our Promise
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Why Choose{" "}
            <span className="relative inline-block">
              Parth Estate Mart
              <span
                className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                style={{ background: "linear-gradient(90deg, #2d7a3a, #a8d878)" }}
              />
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg" style={{ fontFamily: "sans-serif" }}>
            With 18+ years of experience and a client-first philosophy, we make property buying simple, transparent, and secure.
          </p>
        </div>

        {/* Cards — 3 col on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {points.map((point) => (
            <div
              key={point.title}
              className="group relative rounded-2xl p-8 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                border: "1px solid rgba(168,216,120,0.25)",
                boxShadow: "0 4px 24px rgba(45,122,58,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(76,175,96,0.5)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(45,122,58,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(168,216,120,0.25)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(45,122,58,0.06)";
              }}
            >
              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(76,175,96,0.05) 0%, transparent 60%)" }}
              />

              {/* Large faint number */}
              <div
                className="absolute top-4 right-5 text-6xl font-bold select-none transition-colors duration-300"
                style={{ color: "rgba(45,122,58,0.08)", fontFamily: "Georgia, serif" }}
              >
                {point.number}
              </div>

              {/* Icon */}
              <div
                className="relative mb-5 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: "linear-gradient(135deg, #e8f5e8, #d4edda)", color: "#2d7a3a" }}
              >
                {point.icon}
              </div>

              {/* Text */}
              <h3
                className="relative text-xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {point.title}
              </h3>
              <p className="relative text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "sans-serif" }}>
                {point.desc}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: "linear-gradient(90deg, #2d7a3a, #a8d878)" }}
              />
            </div>
          ))}
        </div>

        {/* Bottom trust strip */}
        <div
          className="mt-16 flex flex-wrap items-center justify-center gap-8 py-8 px-6 rounded-2xl"
          style={{ background: "rgba(45,122,58,0.05)", border: "1px solid rgba(168,216,120,0.2)" }}
        >
          {[
            { value: "18+", label: "Years Experience" },
            { value: "2014", label: "In Real Estate Since" },
            { value: "100%", label: "Client Satisfaction" },
            { value: "Be Secure", label: "With Us" },
          ].map((stat, i, arr) => (
            <div key={stat.label} className="text-center px-6" style={{ borderRight: i < arr.length - 1 ? "1px solid rgba(45,122,58,0.15)" : "none" }}>
              <p className="text-2xl font-bold" style={{ color: "#2d7a3a", fontFamily: "Georgia, serif" }}>{stat.value}</p>
              <p className="text-xs uppercase tracking-wide text-gray-400 mt-0.5" style={{ fontFamily: "sans-serif" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}