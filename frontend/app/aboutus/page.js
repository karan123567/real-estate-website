// // FILE: frontend/app/about/page.js

// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import Link from 'next/link';

// const STATS = [
//   { value: '12+', label: 'Years of Excellence' },
//   { value: '4,800+', label: 'Properties Sold' },
//   { value: '28', label: 'Cities Covered' },
//   { value: '97%', label: 'Client Satisfaction' },
// ];

// const TEAM = [
//   {
//     name: 'Arjun Mehta',
//     role: 'Founder & CEO',
//     bio: 'Former Goldman Sachs banker turned real estate visionary. Arjun built LuxEstate from a single office in Mumbai to India\'s most trusted luxury property platform.',
//     initials: 'AM',
//     accent: '#C9A96E',
//   },
//   {
//     name: 'Priya Nair',
//     role: 'Head of Acquisitions',
//     bio: 'With 15 years navigating India\'s premium property market, Priya has an unmatched eye for undervalued assets and emerging micro-markets.',
//     initials: 'PN',
//     accent: '#8B9D77',
//   },
//   {
//     name: 'Rohit Singhania',
//     role: 'Chief Technology Officer',
//     bio: 'Ex-Flipkart engineering lead who believes the future of real estate is data-driven. Rohit built every line of the platform you\'re using right now.',
//     initials: 'RS',
//     accent: '#7B8FA1',
//   },
//   {
//     name: 'Kavya Iyer',
//     role: 'Client Relations Director',
//     bio: 'Kavya has personally overseen 1,200+ transactions, ensuring every client feels heard, guided, and celebrated at the moment they find their perfect home.',
//     initials: 'KI',
//     accent: '#B07D7D',
//   },
// ];

// const VALUES = [
//   {
//     icon: '◈',
//     title: 'Radical Transparency',
//     desc: 'No hidden fees. No inflated valuations. Every property listing includes verified documentation and honest pricing.',
//   },
//   {
//     icon: '◎',
//     title: 'Local Expertise',
//     desc: 'Our agents live in the neighbourhoods they sell. We know which streets flood, which schools are genuinely good, which localities are quietly appreciating.',
//   },
//   {
//     icon: '◇',
//     title: 'Long-Term Thinking',
//     desc: 'We measure success in decades, not commissions. Our goal is to be the firm you return to for every property decision of your life.',
//   },
//   {
//     icon: '○',
//     title: 'Technology-Forward',
//     desc: 'AI-powered valuations, virtual tours, digital paperwork. We\'ve removed every friction point from the buying process.',
//   },
// ];

// export default function AboutPage() {
//   return (
//     <>
//       <Navbar />

//       <main className="bg-[#0F0F0F] text-white min-h-screen font-['Georgia',serif]">

//         {/* ── HERO ── */}
//         <section className="relative overflow-hidden pt-40 pb-32 px-4">
//           {/* Background texture */}
//           <div className="absolute inset-0 opacity-[0.03]"
//             style={{
//               backgroundImage: `repeating-linear-gradient(
//                 0deg, transparent, transparent 80px,
//                 #ffffff 80px, #ffffff 81px
//               ), repeating-linear-gradient(
//                 90deg, transparent, transparent 80px,
//                 #ffffff 80px, #ffffff 81px
//               )`
//             }}
//           />
//           {/* Gold accent orb */}
//           <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] rounded-full opacity-10"
//             style={{ background: 'radial-gradient(circle, #C9A96E, transparent 70%)' }}
//           />

//           <div className="container mx-auto max-w-5xl relative">
//             <p className="text-[#C9A96E] tracking-[0.3em] text-xs uppercase mb-6 font-sans">
//               Est. 2012 · Mumbai, India
//             </p>
//             <h1 className="text-6xl md:text-8xl font-bold leading-[0.95] mb-10 tracking-tight">
//               We Don't Just
//               <br />
//               <span className="text-transparent" style={{
//                 WebkitTextStroke: '1px rgba(255,255,255,0.4)'
//               }}>
//                 Sell Properties.
//               </span>
//               <br />
//               We Find Homes.
//             </h1>
//             <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed font-sans">
//               LuxEstate was built on a single belief: that finding the right home should feel
//               like a discovery, not a transaction. For over a decade, we've held that standard
//               across every city, every client, every deal.
//             </p>
//           </div>
//         </section>

//         {/* ── STATS ── */}
//         <section className="border-t border-b border-white/10 py-16 px-4">
//           <div className="container mx-auto max-w-5xl">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
//               {STATS.map((stat) => (
//                 <div key={stat.label} className="px-8 py-6 first:pl-0 last:pr-0 text-center md:text-left">
//                   <p className="text-4xl md:text-5xl font-bold text-[#C9A96E] mb-2">
//                     {stat.value}
//                   </p>
//                   <p className="text-gray-500 text-sm font-sans tracking-wide uppercase">
//                     {stat.label}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── STORY ── */}
//         <section className="py-28 px-4">
//           <div className="container mx-auto max-w-5xl">
//             <div className="grid md:grid-cols-2 gap-20 items-start">
//               <div>
//                 <p className="text-[#C9A96E] tracking-[0.3em] text-xs uppercase mb-6 font-sans">
//                   Our Story
//                 </p>
//                 <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
//                   Built from<br />frustration.<br />Refined by trust.
//                 </h2>
//                 {/* Decorative vertical line */}
//                 <div className="w-px h-16 bg-[#C9A96E] ml-1 mb-8 opacity-60" />
//               </div>

//               <div className="space-y-6 text-gray-400 leading-relaxed font-sans text-[15px] pt-4 md:pt-16">
//                 <p>
//                   In 2012, Arjun Mehta returned from a decade in finance with one observation:
//                   India's real estate market was broken. Not just inefficient — fundamentally
//                   opaque. Buyers were misled. Sellers were underserved. Agents had every
//                   incentive to close fast and none to close right.
//                 </p>
//                 <p>
//                   He started LuxEstate with four people, one office in Bandra, and a
//                   commitment to doing the opposite. Verified listings only. Transparent pricing.
//                   Agents paid on client satisfaction, not speed.
//                 </p>
//                 <p>
//                   Today, we operate across 28 cities, have helped nearly 5,000 families find
//                   their homes, and still hold the same standard Arjun wrote on a whiteboard
//                   that first day: <em className="text-white">earn the second transaction.</em>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── VALUES ── */}
//         <section className="py-20 px-4 bg-[#141414]">
//           <div className="container mx-auto max-w-5xl">
//             <p className="text-[#C9A96E] tracking-[0.3em] text-xs uppercase mb-4 font-sans text-center">
//               What We Stand For
//             </p>
//             <h2 className="text-4xl font-bold text-center mb-16">Our Principles</h2>

//             <div className="grid md:grid-cols-2 gap-px bg-white/10">
//               {VALUES.map((v) => (
//                 <div key={v.title} className="bg-[#141414] p-10 hover:bg-[#1A1A1A] transition-colors group">
//                   <span className="text-3xl text-[#C9A96E] block mb-5 group-hover:scale-110 transition-transform inline-block">
//                     {v.icon}
//                   </span>
//                   <h3 className="text-xl font-bold mb-3">{v.title}</h3>
//                   <p className="text-gray-500 leading-relaxed font-sans text-sm">{v.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── TEAM ── */}
//         <section className="py-28 px-4">
//           <div className="container mx-auto max-w-5xl">
//             <p className="text-[#C9A96E] tracking-[0.3em] text-xs uppercase mb-4 font-sans">
//               The People
//             </p>
//             <h2 className="text-4xl md:text-5xl font-bold mb-16">
//               Leadership Team
//             </h2>

//             <div className="grid md:grid-cols-2 gap-12">
//               {TEAM.map((person) => (
//                 <div key={person.name} className="group flex gap-6 items-start">
//                   {/* Avatar */}
//                   <div
//                     className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 transition-transform group-hover:scale-105"
//                     style={{ backgroundColor: person.accent + '22', color: person.accent, border: `1px solid ${person.accent}44` }}
//                   >
//                     {person.initials}
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold mb-0.5">{person.name}</h3>
//                     <p className="text-xs font-sans tracking-widest uppercase mb-3"
//                       style={{ color: person.accent }}>
//                       {person.role}
//                     </p>
//                     <p className="text-gray-500 text-sm leading-relaxed font-sans">{person.bio}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── CTA ── */}
//         <section className="py-24 px-4 border-t border-white/10">
//           <div className="container mx-auto max-w-3xl text-center">
//             <p className="text-[#C9A96E] tracking-[0.3em] text-xs uppercase mb-6 font-sans">
//               Ready to Begin?
//             </p>
//             <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
//               Let's find your<br />perfect home.
//             </h2>
//             <p className="text-gray-500 font-sans mb-12 text-lg">
//               Whether you're buying your first apartment or your fifth investment property,
//               we're here to guide every step.
//             </p>
//             <div className="flex justify-center gap-4 flex-wrap">
//               <Link
//                 href="/properties"
//                 className="bg-[#C9A96E] text-[#0F0F0F] px-8 py-4 rounded-lg font-semibold font-sans
//                            hover:bg-[#B8956A] transition-colors text-sm tracking-wide uppercase"
//               >
//                 Browse Properties
//               </Link>
//               <Link
//                 href="/contact"
//                 className="border border-white/30 text-white px-8 py-4 rounded-lg font-semibold font-sans
//                            hover:border-white/60 transition-colors text-sm tracking-wide uppercase"
//               >
//                 Get in Touch
//               </Link>
//             </div>
//           </div>
//         </section>

//       </main>

//       <Footer />
//     </>
//   );
// } 

// FILE: frontend/app/about/page.js

'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

const STATS = [
  { value: '12+',    label: 'Years of Excellence' },
  { value: '4,800+', label: 'Properties Sold'     },
  { value: '28',     label: 'Cities Covered'      },
  { value: '97%',    label: 'Client Satisfaction' },
];

const TEAM = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & CEO',
    bio: "Former Goldman Sachs banker turned real estate visionary. Arjun built LuxEstate from a single office in Mumbai to India's most trusted luxury property platform.",
    initials: 'AM',
    accent: '#60a5fa',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Acquisitions',
    bio: "With 15 years navigating India's premium property market, Priya has an unmatched eye for undervalued assets and emerging micro-markets.",
    initials: 'PN',
    accent: '#93c5fd',
  },
  {
    name: 'Rohit Singhania',
    role: 'Chief Technology Officer',
    bio: "Ex-Flipkart engineering lead who believes the future of real estate is data-driven. Rohit built every line of the platform you're using right now.",
    initials: 'RS',
    accent: '#7dd3fc',
  },
  {
    name: 'Kavya Iyer',
    role: 'Client Relations Director',
    bio: 'Kavya has personally overseen 1,200+ transactions, ensuring every client feels heard, guided, and celebrated at the moment they find their perfect home.',
    initials: 'KI',
    accent: '#a5b4fc',
  },
];

const VALUES = [
  {
    icon: '◈',
    title: 'Radical Transparency',
    desc: 'No hidden fees. No inflated valuations. Every property listing includes verified documentation and honest pricing.',
  },
  {
    icon: '◎',
    title: 'Local Expertise',
    desc: 'Our agents live in the neighbourhoods they sell. We know which streets flood, which schools are genuinely good, which localities are quietly appreciating.',
  },
  {
    icon: '◇',
    title: 'Long-Term Thinking',
    desc: 'We measure success in decades, not commissions. Our goal is to be the firm you return to for every property decision of your life.',
  },
  {
    icon: '○',
    title: 'Technology-Forward',
    desc: "AI-powered valuations, virtual tours, digital paperwork. We've removed every friction point from the buying process.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden" style={{ fontFamily: 'Georgia, serif' }}>

        {/* ══ BACKGROUND — exact copy from contact page ══ */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 35%, #1a4a7a 60%, #0f172a 100%)',
          }}
        />
        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Orbs */}
        <div
          className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full -z-10"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full -z-10"
          style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full -z-10"
          style={{ background: 'radial-gradient(circle, rgba(30,80,140,0.25) 0%, transparent 60%)' }}
        />

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section className="relative px-4 pb-24 pt-40">
          <div className="container mx-auto max-w-5xl">
            {/* Label — was text-[#C9A96E], now text-blue-300/70 */}
            <p className="mb-6 text-xs tracking-[0.3em] uppercase text-blue-300/70" style={{ fontFamily: 'sans-serif' }}>
              Est. 2012 · Mumbai, India
            </p>
            <h1 className="mb-10 text-6xl font-bold leading-[0.95] tracking-tight text-white md:text-8xl">
              We Don't Just
              <br />
              {/* Ghost text — was rgba(255,255,255,0.4), now rgba(147,197,253,0.45) */}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: '1px rgba(147,197,253,0.45)' }}
              >
                Sell Properties.
              </span>
              <br />
              We Find Homes.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-blue-200/55 md:text-xl" style={{ fontFamily: 'sans-serif' }}>
              LuxEstate was built on a single belief: that finding the right home should feel
              like a discovery, not a transaction. For over a decade, we've held that standard
              across every city, every client, every deal.
            </p>
          </div>
        </section>

        {/* ══ STATS ══════════════════════════════════════════════ */}
        <section
          className="px-4 py-16"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 gap-0 md:grid-cols-4">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="px-8 py-6 text-center md:text-left"
                  style={{
                    borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  }}
                >
                  {/* Stat value — was text-[#C9A96E] gold, now text-blue-300 */}
                  <p className="mb-2 text-4xl font-bold text-blue-300 md:text-5xl">
                    {stat.value}
                  </p>
                  <p className="text-sm uppercase tracking-wide text-blue-200/40" style={{ fontFamily: 'sans-serif' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STORY ══════════════════════════════════════════════ */}
        <section className="px-4 py-28">
          <div className="container mx-auto max-w-5xl">
            <div className="grid items-start gap-20 md:grid-cols-2">
              <div>
                {/* Label — was text-[#C9A96E], now text-blue-300/70 */}
                <p className="mb-6 text-xs tracking-[0.3em] uppercase text-blue-300/70" style={{ fontFamily: 'sans-serif' }}>
                  Our Story
                </p>
                <h2 className="mb-8 text-4xl font-bold leading-tight text-white md:text-5xl">
                  Built from<br />frustration.<br />Refined by trust.
                </h2>
                {/* Decorative line — was bg-[#C9A96E] gold, now blue */}
                <div
                  className="mb-8 ml-1 h-16 w-px opacity-50"
                  style={{ background: 'linear-gradient(to bottom, #60a5fa, transparent)' }}
                />
              </div>

              <div className="space-y-6 pt-4 text-[15px] leading-relaxed text-blue-100/45 md:pt-16" style={{ fontFamily: 'sans-serif' }}>
                <p>
                  In 2012, Arjun Mehta returned from a decade in finance with one observation:
                  India's real estate market was broken. Not just inefficient — fundamentally
                  opaque. Buyers were misled. Sellers were underserved. Agents had every
                  incentive to close fast and none to close right.
                </p>
                <p>
                  He started LuxEstate with four people, one office in Bandra, and a
                  commitment to doing the opposite. Verified listings only. Transparent pricing.
                  Agents paid on client satisfaction, not speed.
                </p>
                <p>
                  Today, we operate across 28 cities, have helped nearly 5,000 families find
                  their homes, and still hold the same standard Arjun wrote on a whiteboard
                  that first day: <em className="text-blue-200/80">earn the second transaction.</em>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ VALUES ══════════════════════════════════════════════ */}
        <section
          className="px-4 py-20"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="container mx-auto max-w-5xl">
            <p className="mb-4 text-center text-xs tracking-[0.3em] uppercase text-blue-300/70" style={{ fontFamily: 'sans-serif' }}>
              What We Stand For
            </p>
            <h2 className="mb-16 text-center text-4xl font-bold text-white">Our Principles</h2>

            {/* Grid — was bg-white/10 gap-px on bg-[#141414], now same but on blue-tinted bg */}
            <div
              className="grid gap-px md:grid-cols-2"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="group p-10 transition-colors duration-200 cursor-default"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59,130,246,0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                >
                  {/* Icon — was text-[#C9A96E] gold, now text-blue-400 */}
                  <span className="mb-5 inline-block text-3xl text-blue-400 transition-transform duration-200 group-hover:scale-110">
                    {v.icon}
                  </span>
                  <h3 className="mb-3 text-xl font-bold text-white">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-blue-200/40" style={{ fontFamily: 'sans-serif' }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TEAM ══════════════════════════════════════════════ */}
        <section className="px-4 py-28">
          <div className="container mx-auto max-w-5xl">
            <p className="mb-4 text-xs tracking-[0.3em] uppercase text-blue-300/70" style={{ fontFamily: 'sans-serif' }}>
              The People
            </p>
            <h2 className="mb-16 text-4xl font-bold text-white md:text-5xl">
              Leadership Team
            </h2>

            <div className="grid gap-10 md:grid-cols-2">
              {TEAM.map((person) => (
                <div
                  key={person.name}
                  className="group flex items-start gap-6 rounded-2xl p-6 transition-colors duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59,130,246,0.07)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  {/* Avatar — accent colors changed from gold/green/gray to blue shades */}
                  <div
                    className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full
                               text-lg font-bold transition-transform duration-200 group-hover:scale-105"
                    style={{
                      backgroundColor: person.accent + '22',
                      color: person.accent,
                      border: `1px solid ${person.accent}44`,
                    }}
                  >
                    {person.initials}
                  </div>
                  <div>
                    <h3 className="mb-0.5 text-lg font-bold text-white">{person.name}</h3>
                    <p
                      className="mb-3 text-xs tracking-widest uppercase"
                      style={{ color: person.accent, fontFamily: 'sans-serif' }}
                    >
                      {person.role}
                    </p>
                    <p className="text-sm leading-relaxed text-blue-200/45" style={{ fontFamily: 'sans-serif' }}>
                      {person.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══════════════════════════════════════════════ */}
        <section
          className="px-4 py-24"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="container mx-auto max-w-3xl text-center">
            <p className="mb-6 text-xs tracking-[0.3em] uppercase text-blue-300/70" style={{ fontFamily: 'sans-serif' }}>
              Ready to Begin?
            </p>
            <h2 className="mb-8 text-4xl font-bold leading-tight text-white md:text-6xl">
              Let's find your<br />perfect home.
            </h2>
            <p className="mb-10 text-lg text-blue-200/50" style={{ fontFamily: 'sans-serif' }}>
              Whether you're buying your first apartment or your fifth investment property,
              we're here to guide every step.
            </p>

            {/* Decorative divider — same as contact page */}
            <div className="mx-auto mb-10 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-blue-400/30" />
              <div className="h-1 w-1 rounded-full bg-blue-400/50" />
              <div className="h-px w-12 bg-blue-400/30" />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {/* Primary CTA — was bg-[#C9A96E] gold, now blue gradient matching contact page button */}
              <Link
                href="/properties"
                className="rounded-xl px-8 py-4 text-sm font-semibold uppercase
                           tracking-wide text-white transition-all hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                  boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
                  fontFamily: 'sans-serif',
                }}
              >
                Browse Properties
              </Link>
              {/* Secondary CTA — was border border-white/30, now blue-tinted border */}
              <Link
                href="/contact"
                className="rounded-xl px-8 py-4 text-sm font-semibold uppercase
                           tracking-wide text-blue-200/70 transition-all
                           hover:text-white hover:-translate-y-0.5"
                style={{
                  border: '1px solid rgba(96,165,250,0.3)',
                  background: 'rgba(255,255,255,0.04)',
                  fontFamily: 'sans-serif',
                }}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}