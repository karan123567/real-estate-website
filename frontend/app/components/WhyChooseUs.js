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

export default function WhyChooseUs() {
  const points = [
    {
      number: "01",
      title: "Verified Listings",
      desc: "All properties are thoroughly verified for authenticity and legal compliance.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Trusted Agents",
      desc: "Work with experienced real estate professionals across India.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Transparent Pricing",
      desc: "No hidden charges. Clear pricing with full documentation support.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #ede8e0 0%, #f0ebe2    50%, #e8dfd3 100%)",
      }}
    >
      {/* Decorative background elements */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #c9a96e 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, #b8936a 0%, transparent 70%)",
        }}
      />

      {/* Large faint background number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-playfair text-[20rem] font-bold opacity-[0.06] text-gray-900 leading-none">
          WHY
        </span>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full
                          border border-amber-400/40 bg-amber-400/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-amber-700 text-xs font-semibold tracking-widest uppercase">
              Our Promise
            </span>
          </div>

          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose{" "}
            <span className="relative inline-block">
              LuxEstate
              <span
                className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #c9a96e, #e8c98a)",
                }}
              />
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg">
            We make property buying and renting simple, transparent, and secure.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {points.map((point, i) => (
            <div
              key={point.title}
              className="group relative rounded-2xl p-8 bg-white border border-amber-100
                         hover:border-amber-300 hover:-translate-y-1
                         transition-all duration-300 overflow-hidden"
              style={{ boxShadow: "0 4px 24px rgba(180,140,80,0.08)" }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(201,169,110,0.06) 0%, transparent 60%)",
                }}
              />

              {/* Large faint number */}
              <div
                className="absolute top-4 right-5 font-playfair text-6xl font-bold text-gray-300
                              select-none group-hover:text-amber-100 transition-colors duration-300"
              >
                {point.number}
              </div>

              {/* Icon */}
              <div
                className="relative mb-5 w-14 h-14 rounded-xl flex items-center justify-center text-amber-700
                              group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: "linear-gradient(135deg, #fef3dc, #fde9b8)",
                }}
              >
                {point.icon}
              </div>

              {/* Text */}
              <h3 className="relative text-xl font-bold text-gray-900 mb-3 font-playfair">
                {point.title}
              </h3>
              <p className="relative text-gray-500 text-sm leading-relaxed">
                {point.desc}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full
                              transition-all duration-500 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #c9a96e, #e8c98a)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
