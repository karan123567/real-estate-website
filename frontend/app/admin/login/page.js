'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { adminAPI } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focused, setFocused] = useState('');

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await adminAPI.login(formData);
      toast.success("Welcome back!");
      router.replace("/admin/dashboard");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Only CSS that Tailwind cannot do: Google Font, keyframe animations, pseudo-elements */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-dm        { font-family: 'DM Sans', sans-serif; }

        @keyframes orb-drift {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(40px, 30px) scale(1.1); }
        }
        @keyframes orb-drift-rev {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(-30px, -20px) scale(1.08); }
        }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes pulse-glow {
          0%,100% { opacity:1; box-shadow: 0 0 6px #4ade80; }
          50%      { opacity:0.5; box-shadow: 0 0 2px #4ade80; }
        }
        @keyframes slide-up {
          from { opacity:0; transform: translateY(24px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes focus-bar-in {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .orb-1 { animation: orb-drift 12s ease-in-out infinite alternate; }
        .orb-2 { animation: orb-drift-rev 15s ease-in-out infinite alternate; }
        .spinner { animation: spin-slow 0.7s linear infinite; }
        .pulse-dot { animation: pulse-glow 2s ease-in-out infinite; }
        .slide-up { animation: slide-up 0.65s ease forwards; }

        .focus-bar {
          height: 1px;
          background: linear-gradient(90deg, transparent, #C9A96E, transparent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.35s ease;
        }
        .focus-bar.active { transform: scaleX(1); }

        .field-input::placeholder { color: rgba(255,255,255,0.2); }
        .field-input:focus {
          border-color: rgba(201,169,110,0.55) !important;
          background: rgba(201,169,110,0.04) !important;
          box-shadow: 0 0 0 3px rgba(201,169,110,0.08);
        }

        .gold-btn {
          background: linear-gradient(135deg, #8B6D38 0%, #C9A96E 50%, #8B6D38 100%);
          background-size: 200% 100%;
          background-position: 100% 0;
          transition: background-position 0.4s ease, box-shadow 0.3s ease, transform 0.2s ease;
        }
        .gold-btn:hover:not(:disabled) {
          background-position: 0% 0;
          box-shadow: 0 8px 32px rgba(201,169,110,0.4);
          transform: translateY(-1px);
        }
        .gold-btn:active:not(:disabled) { transform: translateY(0); }

        .shine-wrap { overflow: hidden; }
        .shine {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: translateX(-100%);
          transition: transform 0s;
        }
        .gold-btn:hover .shine {
          transform: translateX(100%);
          transition: transform 0.55s ease;
        }

        .grid-texture {
          background-image:
            linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 80%);
        }
      `}</style>

      {/* ── Root ── */}
      <div className="font-dm relative flex min-h-screen min-h-[100dvh] overflow-hidden bg-[#0a0a0f]">

        {/* ── Background ── */}
        <div className="pointer-events-none absolute inset-0">
          {/* Gradient mesh */}
          <div className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 20% 50%, rgba(201,169,110,0.08) 0%, transparent 60%),
                radial-gradient(ellipse 60% 80% at 80% 20%, rgba(99,82,153,0.07) 0%, transparent 60%),
                radial-gradient(ellipse 40% 40% at 60% 80%, rgba(201,169,110,0.05) 0%, transparent 50%),
                linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)
              `
            }}
          />
          {/* Grid texture */}
          <div className="grid-texture absolute inset-0" />
          {/* Orbs */}
          <div className="orb-1 absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)' }}
          />
          <div className="orb-2 absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(99,82,153,0.09) 0%, transparent 70%)' }}
          />
        </div>

        {/* ══════════════════════════════════════
            LEFT PANEL — hidden below lg
        ══════════════════════════════════════ */}
        <div className="relative hidden w-[45%] flex-col justify-between border-r border-[rgba(201,169,110,0.08)] px-14 py-14 lg:flex xl:px-16 xl:py-16">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(201,169,110,0.5)] text-[#C9A96E] text-base">
              ◈
            </div>
            <span className="font-cormorant text-xl font-semibold tracking-wide text-white">
              Lux<span className="text-[#C9A96E]">Estate</span>
            </span>
          </div>

          {/* Headline */}
          <div className="flex flex-col justify-center py-10">
            <p className="mb-5 text-[10px] tracking-[0.3em] uppercase text-[#C9A96E]">
              Admin Command Centre
            </p>
            <h2 className="font-cormorant mb-6 text-[clamp(38px,3.5vw,56px)] font-light leading-[1.08] text-white">
              Your Empire,<br />
              <strong className="font-bold italic text-[#C9A96E]">One Dashboard</strong><br />
              Away.
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-white/35">
              Manage listings, track inquiries, oversee agents, and close
              deals — all from one beautifully crafted workspace built for
              India's finest real estate platform.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-10 border-t border-white/[0.06] pt-10">
            {[
              { val: '4,800+', label: 'Properties' },
              { val: '28',     label: 'Cities' },
              { val: '97%',    label: 'Satisfaction' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-cormorant text-3xl font-bold leading-none text-[#C9A96E]">{s.val}</div>
                <div className="mt-1 text-[10px] tracking-[0.15em] uppercase text-white/30">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Decorative dots on right edge */}
          <div className="absolute right-[-2px] top-1/2 flex -translate-y-1/2 flex-col items-center gap-1.5">
            {[...Array(7)].map((_, i) => (
              <span key={i} className={`rounded-full bg-[#C9A96E] ${i === 3 ? 'h-1 w-1 opacity-100' : 'h-0.5 w-0.5 opacity-40'}`} />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            RIGHT PANEL — login form
        ══════════════════════════════════════ */}
        <div className="relative flex flex-1 items-center justify-center px-5 py-10 sm:px-8 sm:py-12 lg:py-10">

          <div
            className={`w-full max-w-[400px] transition-all duration-700 ease-out
              ${mounted ? 'slide-up opacity-100' : 'opacity-0 translate-y-5'}`}
          >

            {/* Mobile-only brand */}
            <div className="mb-10 text-center lg:hidden">
              <div className="font-cormorant mb-1 text-[28px] font-semibold tracking-wide text-white">
                Lux<span className="text-[#C9A96E]">Estate</span>
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/30">Admin Portal</div>
            </div>

            {/* Card header */}
            <div className="mb-10">
              <p className="mb-3 text-[10px] tracking-[0.3em] uppercase text-[#C9A96E]">
                Secure Access
              </p>
              <h1 className="font-cormorant mb-2 text-[38px] font-semibold leading-[1.1] text-white sm:text-[42px]">
                Welcome<br />Back.
              </h1>
              <p className="text-[13px] text-white/35">Sign in to your admin portal</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-7">

              {/* Email field */}
              <div>
                <label className={`mb-2.5 block text-[10px] tracking-[0.25em] uppercase transition-colors duration-300
                  ${focused === 'email' ? 'text-[#C9A96E]' : 'text-white/35'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  placeholder="admin@luxestate.in"
                  autoComplete="email"
                  required
                  className="field-input w-full rounded-xl border border-white/10 bg-white/[0.04]
                             px-4 py-3.5 text-sm text-white outline-none transition-all duration-300"
                />
                <div className={`focus-bar mt-0 ${focused === 'email' ? 'active' : ''}`} />
              </div>

              {/* Password field */}
              <div>
                <label className={`mb-2.5 block text-[10px] tracking-[0.25em] uppercase transition-colors duration-300
                  ${focused === 'password' ? 'text-[#C9A96E]' : 'text-white/35'}`}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(p => ({ ...p, password: e.target.value }))}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused('')}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="field-input w-full rounded-xl border border-white/10 bg-white/[0.04]
                               py-3.5 pl-4 pr-12 text-sm text-white outline-none transition-all duration-300"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1
                               text-white/30 transition-colors hover:text-white/70"
                  >
                    {showPassword ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
                <div className={`focus-bar mt-0 ${focused === 'password' ? 'active' : ''}`} />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="gold-btn shine-wrap relative mt-1 w-full rounded-xl py-4 text-[13px]
                           font-medium tracking-[0.15em] uppercase text-[#0a0a0f]
                           disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="shine" />
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="spinner h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Authenticating
                    </>
                  ) : (
                    <>
                      Sign In to Dashboard
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </>
                  )}
                </span>
              </button>

            </form>

            {/* Footer badge */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2 rounded-full border border-[rgba(201,169,110,0.15)]
                              bg-[rgba(201,169,110,0.05)] px-4 py-1.5">
                <div className="pulse-dot h-1.5 w-1.5 rounded-full bg-green-400" />
                <span className="text-[10px] tracking-[0.15em] uppercase text-white/30">
                  256-bit SSL Encrypted
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
