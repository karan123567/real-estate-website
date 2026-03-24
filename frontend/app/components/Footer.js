
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t-2 border-blue-100">

      {/* ── Light background — clearly different from dark page sections ── */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(160deg, #f0f7ff 0%, #e8f2ff 40%, #f8faff 100%)',
        }}
      />

      {/* Decorative top-left orb */}
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full -z-10"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)' }}
      />
      {/* Decorative bottom-right orb */}
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-52 w-52 rounded-full -z-10"
        style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)' }}
      />

      {/* ── Main grid ── */}
      <div className="container mx-auto px-4 py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5 flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-blue-600"
                style={{
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.2)',
                }}
              >
                ◈
              </div>
              <span
                className="text-xl font-bold tracking-wide text-gray-900"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Parth<span className="text-blue-600">estatemart</span>
              </span>
            </div>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-gray-500">
              Premium real estate platform helping clients find verified
              properties across India. Trusted by 4,800+ families.
            </p>

            {/* Social buttons */}
            <div className="flex gap-2">
              {[
                { label: 'Instagram', icon: 'IG' },
                { label: 'LinkedIn',  icon: 'IN' },
                { label: 'Twitter',   icon: 'TW' },
              ].map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg
                             text-[10px] font-semibold text-blue-500
                             border border-blue-100 bg-white
                             transition-all hover:border-blue-300 hover:bg-blue-50
                             hover:text-blue-700 shadow-sm cursor-pointer"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="mb-5 text-[10px] tracking-[0.25em] uppercase font-semibold text-blue-500">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Browse Properties', href: '/properties' },
                { label: 'About Us',          href: '/about'      },
                { label: 'Contact',           href: '/contact'    },
                { label: 'Admin Portal',      href: '/admin/login'},
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-gray-500
                               transition-colors hover:text-blue-800"
                  >
                    <span
                      className="h-px w-3 rounded-full bg-blue-300 transition-all
                                 duration-300 group-hover:w-5 group-hover:bg-blue-500"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="mb-5 text-[10px] tracking-[0.25em] uppercase font-semibold text-blue-500">
              Property Types
            </h4>
            <ul className="space-y-3">
              {['Apartments', 'Independent Houses', 'Villas', 'Commercial', 'Plots'].map((t) => (
                <li key={t}>
                  <Link
                    href={`/properties?propertyType=${t.toLowerCase().replace(' ', '_')}`}
                    className="group flex items-center gap-2 text-sm text-gray-500
                               transition-colors hover:text-blue-800"
                  >
                    <span
                      className="h-px w-3 rounded-full bg-blue-300 transition-all
                                 duration-300 group-hover:w-5 group-hover:bg-blue-500"
                    />
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-[10px] tracking-[0.25em] uppercase font-semibold text-blue-500">
              Get In Touch
            </h4>
            <div className="space-y-4">
              {[
                { icon: '✉️', label: 'Email',  value: 'support@luxestate.in'        },
                { icon: '📞', label: 'Phone',  value: '+91 98765 43210'             },
                { icon: '📍', label: 'Office', value: 'Bandra Kurla Complex, Mumbai'},
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div
                    className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center
                               justify-center rounded-lg text-xs bg-white
                               border border-blue-100 shadow-sm"
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="mb-0.5 text-[10px] uppercase tracking-widest text-blue-800">
                      {item.label}
                    </p>
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
        <div className="container mx-auto flex flex-col items-center justify-between
                        gap-3 px-4 py-4 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] text-gray-700">
            © {year} Parthestatemart. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[11px] text-gray-700 transition-colors hover:text-blue-500"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="h-1.5 w-1.5 rounded-full bg-green-400"
              style={{ boxShadow: '0 0 5px #4ade80' }}
            />
            <span className="text-[11px] text-gray-700">All systems operational</span>
          </div>
        </div>
      </div>

    </footer>
  );
}