// import ContactForm from '../components/property/ContactForm';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// export default function ContactPage() {
//   return (
//     <>
//       <Navbar />
//       <main className="min-h-screen bg-gray-50 py-16">
//         <div className="container mx-auto px-4 max-w-2xl">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
//             Contact Us
//           </h1>
//           <p className="text-gray-500 text-center mb-10">
//             We'd love to hear from you. Fill out the form below and we'll get back to you shortly.
//           </p>
//           <ContactForm />
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }

// FILE: frontend/app/contact/page.js

import ContactForm from '../components/property/ContactForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden">

        {/* ── Deep blue gradient background ── */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 35%, #1a4a7a 60%, #0f172a 100%)',
          }}
        />

        {/* ── Decorative orbs ── */}
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

        {/* ── Subtle grid texture ── */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container mx-auto px-4 py-20 sm:py-28">

          {/* ── Page Header ── */}
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs tracking-[0.35em] uppercase text-blue-300/70">
              ParthEstateMart · Support
            </p>
            <h1
              className="mb-4 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Let's Talk.
            </h1>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-blue-200/60 sm:text-base">
              Whether you're buying, renting, or just exploring — our team is
              ready to guide you every step of the way.
            </p>

            {/* Decorative divider */}
            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-blue-400/30" />
              <div className="h-1 w-1 rounded-full bg-blue-400/50" />
              <div className="h-px w-12 bg-blue-400/30" />
            </div>
          </div>

          {/* ── Two-column layout on large screens ── */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">

            {/* Left info panel — 2/5 */}
            <div className="flex flex-col justify-center gap-8 lg:col-span-2">

              {/* Info cards */}
              {[
                {
                  icon: '📍',
                  title: 'Our Office',
                  lines: ['Bandra Kurla Complex,', 'Mumbai — 400051, India'],
                },
                {
                  icon: '📞',
                  title: 'Call Us',
                  lines: ['+91 93190 25925', 'Mon–Sat, 9am – 7pm IST'],
                },
                {
                  icon: '✉️',
                  title: 'Email',
                  lines: ['cschandrahr@gmail.com', 'We reply within 24 hours'],
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl p-5"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg"
                    style={{
                      background: 'rgba(59,130,246,0.15)',
                      border: '1px solid rgba(96,165,250,0.2)',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="mb-1 text-xs tracking-widest uppercase text-blue-300/60">{item.title}</p>
                    {item.lines.map((line) => (
                      <p key={line} className="text-sm text-white/70 leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Social links */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <p className="mb-3 text-xs tracking-widest uppercase text-blue-300/60">Follow Us</p>
                <div className="flex gap-3">
                  {['Instagram', 'LinkedIn', 'Twitter'].map((s) => (
                    <span
                      key={s}
                      className="rounded-lg px-3 py-1.5 text-xs text-white/50 transition-colors hover:text-white/80"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right form — 3/5 */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}