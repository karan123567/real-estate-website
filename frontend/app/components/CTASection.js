// // PURPOSE: Final Call-To-Action section

// import Link from 'next/link';

// export default function CTASection() {
//   return (
//     <section className="bg-gray-900 text-white py-20">
//       <div className="container mx-auto px-4 text-center">
//         <h2 className="font-playfair text-4xl font-bold mb-6">
//           Ready to Find Your Dream Home?
//         </h2>

//         <p className="text-gray-300 mb-8 max-w-xl mx-auto">
//           Explore thousands of verified listings across India and connect with trusted agents today.
//         </p>

//         <Link
//           href="/properties"
//           className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold 
//                      hover:bg-gray-200 transition-colors"
//         >
//           Start Exploring
//         </Link>
//       </div>
//     </section>
//   );
// }

// PURPOSE: Final Call-To-Action section

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative bg-gray-900 text-white py-24 overflow-hidden">

      {/* Decorative radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
                      rounded-full blur-3xl opacity-20 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse, #c9a96e 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
           style={{ background: 'radial-gradient(circle, #c9a96e 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
           style={{ background: 'radial-gradient(circle, #c9a96e 0%, transparent 70%)' }} />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{
             backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
             backgroundSize: '60px 60px'
           }} />

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full
                        border border-amber-400/30 bg-amber-400/10">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-300 text-xs font-semibold tracking-widest uppercase">
            Your Journey Starts Here
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Ready to Find Your{' '}
          <span className="relative inline-block">
            <span className="text-amber-300">Dream Home?</span>
            <span className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full opacity-60"
                  style={{ background: 'linear-gradient(90deg, #c9a96e, #e8c98a)' }} />
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 mb-10 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          Explore thousands of verified listings across India and connect with
          trusted agents today.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/properties"
            className="group relative px-8 py-4 rounded-lg font-semibold text-gray-900
                       overflow-hidden transition-all duration-300 hover:-translate-y-0.5
                       hover:shadow-[0_0_30px_rgba(201,169,110,0.4)]"
            style={{ background: 'linear-gradient(135deg, #e8c98a, #c9a96e)' }}
          >
            Start Exploring
          </Link>

          <Link
            href="/contact"
            className="px-8 py-4 rounded-lg font-semibold border border-white/20
                       text-white bg-white/5 backdrop-blur-sm
                       hover:bg-white/10 hover:border-white/40
                       transition-all duration-300 hover:-translate-y-0.5"
          >
            Talk to an Agent
          </Link>
        </div>

        {/* Trust note */}
        <p className="mt-8 text-gray-600 text-xs tracking-wide">
          No registration required &nbsp;·&nbsp; Free to browse &nbsp;·&nbsp; 10,000+ listings
        </p>

      </div>
    </section>
  );
}