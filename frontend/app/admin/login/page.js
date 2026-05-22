// 'use client';

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { adminAPI } from "@/lib/api";

// export default function AdminLoginPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [focused, setFocused] = useState('');

//   useEffect(() => { setMounted(true); }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.email || !formData.password) {
//       toast.error("Please fill in all fields");
//       return;
//     }
//     setLoading(true);
//     try {
//       await adminAPI.login(formData);
//       toast.success("Welcome back!");
//       router.replace("/admin/dashboard");
//     } catch (error) {
//       toast.error(error.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Only CSS that Tailwind cannot do: Google Font, keyframe animations, pseudo-elements */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap');

//         .font-cormorant { font-family: 'Cormorant Garamond', serif; }
//         .font-dm        { font-family: 'DM Sans', sans-serif; }

//         @keyframes orb-drift {
//           from { transform: translate(0,0) scale(1); }
//           to   { transform: translate(40px, 30px) scale(1.1); }
//         }
//         @keyframes orb-drift-rev {
//           from { transform: translate(0,0) scale(1); }
//           to   { transform: translate(-30px, -20px) scale(1.08); }
//         }
//         @keyframes spin-slow { to { transform: rotate(360deg); } }
//         @keyframes pulse-glow {
//           0%,100% { opacity:1; box-shadow: 0 0 6px #4ade80; }
//           50%      { opacity:0.5; box-shadow: 0 0 2px #4ade80; }
//         }
//         @keyframes slide-up {
//           from { opacity:0; transform: translateY(24px); }
//           to   { opacity:1; transform: translateY(0); }
//         }
//         @keyframes focus-bar-in {
//           from { transform: scaleX(0); }
//           to   { transform: scaleX(1); }
//         }

//         .orb-1 { animation: orb-drift 12s ease-in-out infinite alternate; }
//         .orb-2 { animation: orb-drift-rev 15s ease-in-out infinite alternate; }
//         .spinner { animation: spin-slow 0.7s linear infinite; }
//         .pulse-dot { animation: pulse-glow 2s ease-in-out infinite; }
//         .slide-up { animation: slide-up 0.65s ease forwards; }

//         .focus-bar {
//           height: 1px;
//           background: linear-gradient(90deg, transparent, #C9A96E, transparent);
//           transform: scaleX(0);
//           transform-origin: center;
//           transition: transform 0.35s ease;
//         }
//         .focus-bar.active { transform: scaleX(1); }

//         .field-input::placeholder { color: rgba(255,255,255,0.2); }
//         .field-input:focus {
//           border-color: rgba(201,169,110,0.55) !important;
//           background: rgba(201,169,110,0.04) !important;
//           box-shadow: 0 0 0 3px rgba(201,169,110,0.08);
//         }

//         .gold-btn {
//           background: linear-gradient(135deg, #8B6D38 0%, #C9A96E 50%, #8B6D38 100%);
//           background-size: 200% 100%;
//           background-position: 100% 0;
//           transition: background-position 0.4s ease, box-shadow 0.3s ease, transform 0.2s ease;
//         }
//         .gold-btn:hover:not(:disabled) {
//           background-position: 0% 0;
//           box-shadow: 0 8px 32px rgba(201,169,110,0.4);
//           transform: translateY(-1px);
//         }
//         .gold-btn:active:not(:disabled) { transform: translateY(0); }

//         .shine-wrap { overflow: hidden; }
//         .shine {
//           position: absolute; inset: 0;
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
//           transform: translateX(-100%);
//           transition: transform 0s;
//         }
//         .gold-btn:hover .shine {
//           transform: translateX(100%);
//           transition: transform 0.55s ease;
//         }

//         .grid-texture {
//           background-image:
//             linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px);
//           background-size: 60px 60px;
//           mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 80%);
//         }
//       `}</style>

//       {/* ── Root ── */}
//       <div className="font-dm relative flex min-h-screen min-h-[100dvh] overflow-hidden bg-[#0a0a0f]">

//         {/* ── Background ── */}
//         <div className="pointer-events-none absolute inset-0">
//           {/* Gradient mesh */}
//           <div className="absolute inset-0"
//             style={{
//               background: `
//                 radial-gradient(ellipse 80% 60% at 20% 50%, rgba(201,169,110,0.08) 0%, transparent 60%),
//                 radial-gradient(ellipse 60% 80% at 80% 20%, rgba(99,82,153,0.07) 0%, transparent 60%),
//                 radial-gradient(ellipse 40% 40% at 60% 80%, rgba(201,169,110,0.05) 0%, transparent 50%),
//                 linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)
//               `
//             }}
//           />
//           {/* Grid texture */}
//           <div className="grid-texture absolute inset-0" />
//           {/* Orbs */}
//           <div className="orb-1 absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full"
//             style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)' }}
//           />
//           <div className="orb-2 absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full"
//             style={{ background: 'radial-gradient(circle, rgba(99,82,153,0.09) 0%, transparent 70%)' }}
//           />
//         </div>

//         {/* ══════════════════════════════════════
//             LEFT PANEL — hidden below lg
//         ══════════════════════════════════════ */}
//         <div className="relative hidden w-[45%] flex-col justify-between border-r border-[rgba(201,169,110,0.08)] px-14 py-14 lg:flex xl:px-16 xl:py-16">

//           {/* Brand */}
//           <div className="flex items-center gap-3">
//             <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(201,169,110,0.5)] text-[#C9A96E] text-base">
//               ◈
//             </div>
//             <span className="font-cormorant text-xl font-semibold tracking-wide text-white">
//               Parth<span className="text-[#C9A96E]">EstateMart</span>
//             </span>
//           </div>

//           {/* Headline */}
//           <div className="flex flex-col justify-center py-10">
//             <p className="mb-5 text-[10px] tracking-[0.3em] uppercase text-[#C9A96E]">
//               Admin Command Centre
//             </p>
//             <h2 className="font-cormorant mb-6 text-[clamp(38px,3.5vw,56px)] font-light leading-[1.08] text-white">
//               Your Empire,<br />
//               <strong className="font-bold italic text-[#C9A96E]">One Dashboard</strong><br />
//               Away.
//             </h2>
//             <p className="max-w-xs text-sm leading-relaxed text-white/35">
//               Manage listings, track inquiries, oversee agents, and close
//               deals — all from one beautifully crafted workspace built for
//               India's finest real estate platform.
//             </p>
//           </div>

//           {/* Stats */}
//           <div className="flex gap-10 border-t border-white/[0.06] pt-10">
//             {[
//               { val: '4+', label: 'Properties' },
//               { val: '2',     label: 'Cities' },
//               { val: '100%',    label: 'Satisfaction' },
//             ].map((s) => (
//               <div key={s.label}>
//                 <div className="font-cormorant text-3xl font-bold leading-none text-[#C9A96E]">{s.val}</div>
//                 <div className="mt-1 text-[10px] tracking-[0.15em] uppercase text-white/30">{s.label}</div>
//               </div>
//             ))}
//           </div>

//           {/* Decorative dots on right edge */}
//           <div className="absolute right-[-2px] top-1/2 flex -translate-y-1/2 flex-col items-center gap-1.5">
//             {[...Array(7)].map((_, i) => (
//               <span key={i} className={`rounded-full bg-[#C9A96E] ${i === 3 ? 'h-1 w-1 opacity-100' : 'h-0.5 w-0.5 opacity-40'}`} />
//             ))}
//           </div>
//         </div>

//         {/* ══════════════════════════════════════
//             RIGHT PANEL — login form
//         ══════════════════════════════════════ */}
//         <div className="relative flex flex-1 items-center justify-center px-5 py-10 sm:px-8 sm:py-12 lg:py-10">

//           <div
//             className={`w-full max-w-[400px] transition-all duration-700 ease-out
//               ${mounted ? 'slide-up opacity-100' : 'opacity-0 translate-y-5'}`}
//           >

//             {/* Mobile-only brand */}
//             <div className="mb-10 text-center lg:hidden">
//               <div className="font-cormorant mb-1 text-[28px] font-semibold tracking-wide text-white">
//                 Lux<span className="text-[#C9A96E]">Estate</span>
//               </div>
//               <div className="text-[10px] tracking-[0.2em] uppercase text-white/30">Admin Portal</div>
//             </div>

//             {/* Card header */}
//             <div className="mb-10">
//               <p className="mb-3 text-[10px] tracking-[0.3em] uppercase text-[#C9A96E]">
//                 Secure Access
//               </p>
//               <h1 className="font-cormorant mb-2 text-[38px] font-semibold leading-[1.1] text-white sm:text-[42px]">
//                 Welcome<br />Back.
//               </h1>
//               <p className="text-[13px] text-white/35">Sign in to your admin portal</p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} noValidate className="space-y-7">

//               {/* Email field */}
//               <div>
//                 <label className={`mb-2.5 block text-[10px] tracking-[0.25em] uppercase transition-colors duration-300
//                   ${focused === 'email' ? 'text-[#C9A96E]' : 'text-white/35'}`}>
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
//                   onFocus={() => setFocused('email')}
//                   onBlur={() => setFocused('')}
//                   placeholder="admin@luxestate.in"
//                   autoComplete="email"
//                   required
//                   className="field-input w-full rounded-xl border border-white/10 bg-white/[0.04]
//                              px-4 py-3.5 text-sm text-white outline-none transition-all duration-300"
//                 />
//                 <div className={`focus-bar mt-0 ${focused === 'email' ? 'active' : ''}`} />
//               </div>

//               {/* Password field */}
//               <div>
//                 <label className={`mb-2.5 block text-[10px] tracking-[0.25em] uppercase transition-colors duration-300
//                   ${focused === 'password' ? 'text-[#C9A96E]' : 'text-white/35'}`}>
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={formData.password}
//                     onChange={(e) => setFormData(p => ({ ...p, password: e.target.value }))}
//                     onFocus={() => setFocused('password')}
//                     onBlur={() => setFocused('')}
//                     placeholder="Enter your password"
//                     autoComplete="current-password"
//                     required
//                     className="field-input w-full rounded-xl border border-white/10 bg-white/[0.04]
//                                py-3.5 pl-4 pr-12 text-sm text-white outline-none transition-all duration-300"
//                   />
//                   <button
//                     type="button"
//                     tabIndex={-1}
//                     onClick={() => setShowPassword(p => !p)}
//                     className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1
//                                text-white/30 transition-colors hover:text-white/70"
//                   >
//                     {showPassword ? (
//                       <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
//                         <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
//                         <line x1="1" y1="1" x2="23" y2="23"/>
//                       </svg>
//                     ) : (
//                       <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//                         <circle cx="12" cy="12" r="3"/>
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//                 <div className={`focus-bar mt-0 ${focused === 'password' ? 'active' : ''}`} />
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="gold-btn shine-wrap relative mt-1 w-full rounded-xl py-4 text-[13px]
//                            font-medium tracking-[0.15em] uppercase text-[#0a0a0f]
//                            disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 <span className="shine" />
//                 <span className="relative flex items-center justify-center gap-2">
//                   {loading ? (
//                     <>
//                       <svg className="spinner h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
//                       </svg>
//                       Authenticating
//                     </>
//                   ) : (
//                     <>
//                       Sign In to Dashboard
//                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                         <path d="M5 12h14M12 5l7 7-7 7"/>
//                       </svg>
//                     </>
//                   )}
//                 </span>
//               </button>

//             </form>

//             {/* Footer badge */}
//             <div className="mt-8 flex justify-center">
//               <div className="flex items-center gap-2 rounded-full border border-[rgba(201,169,110,0.15)]
//                               bg-[rgba(201,169,110,0.05)] px-4 py-1.5">
//                 <div className="pulse-dot h-1.5 w-1.5 rounded-full bg-green-400" />
//                 <span className="text-[10px] tracking-[0.15em] uppercase text-white/30">
//                   256-bit SSL Encrypted
//                 </span>
//               </div>
//             </div>

//           </div>
//         </div>

//       </div>
//     </>
//   );
// }


'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { adminAPI } from "@/lib/api";

const LOGO = "data:image/jpeg;base64,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";

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-dm        { font-family: 'DM Sans', sans-serif; }

        @keyframes orb-drift     { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,30px) scale(1.1); } }
        @keyframes orb-drift-rev { from { transform: translate(0,0) scale(1); } to { transform: translate(-30px,-20px) scale(1.08); } }
        @keyframes spin-slow     { to   { transform: rotate(360deg); } }
        @keyframes pulse-glow    { 0%,100% { opacity:1; box-shadow:0 0 6px #4ade80; } 50% { opacity:0.5; box-shadow:0 0 2px #4ade80; } }
        @keyframes slide-up      { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes logo-float    { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-6px); } }

        .orb-1     { animation: orb-drift 12s ease-in-out infinite alternate; }
        .orb-2     { animation: orb-drift-rev 15s ease-in-out infinite alternate; }
        .spinner   { animation: spin-slow 0.7s linear infinite; }
        .pulse-dot { animation: pulse-glow 2s ease-in-out infinite; }
        .slide-up  { animation: slide-up 0.65s ease forwards; }
        .logo-float { animation: logo-float 4s ease-in-out infinite; }

        .focus-bar {
          height: 1px;
          background: linear-gradient(90deg, transparent, #4caf60, transparent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.35s ease;
        }
        .focus-bar.active { transform: scaleX(1); }

        .field-input::placeholder { color: rgba(255,255,255,0.2); }
        .field-input:focus {
          border-color: rgba(76,175,96,0.55) !important;
          background: rgba(76,175,96,0.04) !important;
          box-shadow: 0 0 0 3px rgba(76,175,96,0.08);
        }

        .green-btn {
          background: linear-gradient(135deg, #1a5c28 0%, #4caf60 50%, #1a5c28 100%);
          background-size: 200% 100%;
          background-position: 100% 0;
          transition: background-position 0.4s ease, box-shadow 0.3s ease, transform 0.2s ease;
        }
        .green-btn:hover:not(:disabled) {
          background-position: 0% 0;
          box-shadow: 0 8px 32px rgba(76,175,96,0.4);
          transform: translateY(-1px);
        }
        .green-btn:active:not(:disabled) { transform: translateY(0); }

        .shine-wrap { overflow: hidden; }
        .shine {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: translateX(-100%);
          transition: transform 0s;
        }
        .green-btn:hover .shine {
          transform: translateX(100%);
          transition: transform 0.55s ease;
        }

        .grid-texture {
          background-image:
            linear-gradient(rgba(76,175,96,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(76,175,96,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 80%);
        }
      `}</style>

      {/* ── Root ── */}
      <div className="font-dm relative flex min-h-screen min-h-[100dvh] overflow-hidden" style={{ background: "#070f09" }}>

        {/* ── Background ── */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 50%, rgba(76,175,96,0.07) 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 80% 20%, rgba(45,122,58,0.06) 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 60% 80%, rgba(168,216,120,0.04) 0%, transparent 50%),
              linear-gradient(135deg, #070f09 0%, #0d1a0f 50%, #070f09 100%)
            `
          }} />
          <div className="grid-texture absolute inset-0" />
          <div className="orb-1 absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(76,175,96,0.08) 0%, transparent 70%)' }} />
          <div className="orb-2 absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(45,122,58,0.09) 0%, transparent 70%)' }} />
        </div>

        {/* ══════════════════════════════════════
            LEFT PANEL
        ══════════════════════════════════════ */}
        <div
          className="relative hidden w-[45%] flex-col justify-between px-14 py-14 lg:flex xl:px-16 xl:py-16"
          style={{ borderRight: "1px solid rgba(76,175,96,0.1)" }}
        >
          {/* Top: Brand text */}
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg text-base"
              style={{ border: "1px solid rgba(76,175,96,0.5)", color: "#4caf60", background: "rgba(76,175,96,0.08)" }}
            >
              ◈
            </div>
            <span className="font-cormorant text-xl font-semibold tracking-wide text-white">
              Parth<span style={{ color: "#4caf60" }}>EstateMart</span>
            </span>
          </div>

          {/* Centre: Company logo + tagline */}
          <div className="flex flex-col items-center justify-center py-8 gap-8">
            {/* Logo card */}
            <div
              className="logo-float w-full max-w-sm rounded-3xl overflow-hidden p-6"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(76,175,96,0.18)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 80px rgba(76,175,96,0.06)",
                backdropFilter: "blur(12px)",
              }}
            >
              <img
                src={LOGO}
                alt="Parth Estate Mart — Be Secure With Us"
                className="w-full object-contain"
                style={{ maxHeight: "160px" }}
              />
            </div>

            {/* Tagline */}
            <div className="text-center">
              <p className="mb-2 text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(168,216,120,0.5)", fontFamily: "sans-serif" }}>
                Admin Command Centre
              </p>
              <h2 className="font-cormorant mb-4 text-[clamp(32px,3vw,48px)] font-light leading-[1.1] text-white">
                Manage Your<br />
                <strong className="font-bold italic" style={{ color: "#a8d878" }}>Properties &amp; Clients</strong><br />
                With Ease.
              </h2>
              <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "sans-serif" }}>
                Manage listings, track inquiries, and close deals — all from one
                powerful workspace built for Parth Estate Mart.
              </p>
            </div>
          </div>

          {/* Bottom: Stats */}
          <div
            className="flex gap-10 pt-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              { val: '18+',   label: 'Yrs Experience' },
              { val: '2014',  label: 'Est. Since' },
              { val: '100%',  label: 'Satisfaction' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-cormorant text-3xl font-bold leading-none" style={{ color: "#a8d878" }}>{s.val}</div>
                <div className="mt-1 text-[10px] tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "sans-serif" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Decorative dots on right edge */}
          <div className="absolute right-[-2px] top-1/2 flex -translate-y-1/2 flex-col items-center gap-1.5">
            {[...Array(7)].map((_, i) => (
              <span key={i} className="rounded-full" style={{ background: "#4caf60", width: i === 3 ? "4px" : "2px", height: i === 3 ? "4px" : "2px", opacity: i === 3 ? 1 : 0.4 }} />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            RIGHT PANEL — login form
        ══════════════════════════════════════ */}
        <div className="relative flex flex-1 items-center justify-center px-5 py-6 sm:px-8 sm:py-10 lg:py-10">

          <div className={`w-full max-w-[400px] transition-all duration-700 ease-out ${mounted ? 'slide-up opacity-100' : 'opacity-0 translate-y-5'}`}>

            {/* Mobile-only brand + logo */}
            <div className="mb-5 sm:mb-8 text-center lg:hidden">
              <div
                className="mx-auto mb-4 overflow-hidden rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(76,175,96,0.18)", maxWidth: "220px" }}
              >
                <img src={LOGO} alt="Parth Estate Mart" className="w-full object-contain" style={{ maxHeight: "80px" }} />
              </div>
              <div className="font-cormorant mb-1 text-[24px] font-semibold tracking-wide text-white">
                Parth<span style={{ color: "#4caf60" }}>EstateMart</span>
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "sans-serif" }}>Admin Portal</div>
            </div>

            {/* Card header */}
            <div className="mb-6 sm:mb-10">
              <p className="mb-3 text-[10px] tracking-[0.3em] uppercase" style={{ color: "#4caf60", fontFamily: "sans-serif" }}>
                Secure Access
              </p>
              <h1 className="font-cormorant mb-2 text-[28px] font-semibold leading-[1.1] text-white sm:text-[36px] lg:text-[42px]">
                Welcome<br />Back.
              </h1>
              <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "sans-serif" }}>Sign in to your Parth Estate Mart admin portal</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-7">

              {/* Email */}
              <div>
                <label className={`mb-2.5 block text-[10px] tracking-[0.25em] uppercase transition-colors duration-300`}
                  style={{ color: focused === 'email' ? '#4caf60' : 'rgba(255,255,255,0.35)', fontFamily: "sans-serif" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  placeholder="admin@parthestatemart.in"
                  autoComplete="email"
                  required
                  className="field-input w-full rounded-xl border bg-white/[0.04] px-4 py-3 sm:py-3.5 text-sm text-white outline-none transition-all duration-300"
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                />
                <div className={`focus-bar mt-0 ${focused === 'email' ? 'active' : ''}`} />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2.5 block text-[10px] tracking-[0.25em] uppercase transition-colors duration-300"
                  style={{ color: focused === 'password' ? '#4caf60' : 'rgba(255,255,255,0.35)', fontFamily: "sans-serif" }}>
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
                    className="field-input w-full rounded-xl border bg-white/[0.04] py-3 sm:py-3.5 pl-4 pr-12 text-sm text-white outline-none transition-all duration-300"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 transition-colors"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
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
                className="green-btn shine-wrap relative mt-1 w-full rounded-xl py-3.5 sm:py-4 text-[13px] font-medium tracking-[0.15em] uppercase text-white disabled:cursor-not-allowed disabled:opacity-50"
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

            {/* SSL badge */}
            <div className="mt-6 sm:mt-8 flex justify-center">
              <div
                className="flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{ border: "1px solid rgba(76,175,96,0.2)", background: "rgba(76,175,96,0.05)" }}
              >
                <div className="pulse-dot h-1.5 w-1.5 rounded-full bg-green-400" />
                <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "sans-serif" }}>
                  256-bit SSL Encrypted
                </span>
              </div>
            </div>

            {/* Be Secure With Us tagline */}
            <p className="mt-5 text-center text-[11px] tracking-widest uppercase" style={{ color: "rgba(168,216,120,0.25)", fontFamily: "sans-serif" }}>
              Be Secure With Us
            </p>

          </div>
        </div>

      </div>
    </>
  );
}