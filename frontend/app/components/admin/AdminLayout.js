// // 

// // FILE: frontend/src/components/admin/AdminLayout.js
// // PURPOSE: Client-side layout wrapper for admin pages

// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { adminAPI } from '@/lib/api';

// const navItems = [
//   { href: '/admin/dashboard', label: 'Dashboard' },
//   { href: '/admin/properties', label: 'Properties' },
//   { href: '/admin/inquiries', label: 'Inquiries' },
//   { href: '/admin/analytics', label: 'Analytics' },
// ];

// export default function AdminLayout({ children, title }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

//   const [adminName, setAdminName] = useState('Admin');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // 🔓 DEMO MODE → Skip backend auth check
//     if (isDemo) {
//       setAdminName('Demo Admin');
//       setLoading(false);
//       return;
//     }

//     const fetchAdmin = async () => {
//       try {
//         const data = await adminAPI.getMe();
//         setAdminName(data.admin?.name || 'Admin');
//       } catch (error) {
//         router.replace('/admin/login');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdmin();
//   }, [router, isDemo]);

//   const handleLogout = async () => {
//     if (isDemo) {
//       toast.success('Demo logout');
//       router.replace('/admin/login');
//       return;
//     }

//     try {
//       await adminAPI.logout();
//       toast.success('Logged out successfully');
//       router.replace('/admin/login');
//     } catch {
//       toast.error('Logout failed');
//     }
//   };

//   // 🔄 Clean loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-gray-500 text-sm">Loading admin panel...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex">

//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-white flex flex-col">
//         <div className="p-6 border-b border-gray-800">
//           <h1 className="font-playfair font-bold text-xl">
//             LuxEstate
//           </h1>
//           <p className="text-gray-400 text-xs mt-1">
//             Admin Panel
//           </p>
//         </div>

//         <nav className="flex-1 p-4 space-y-1">
//           {navItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`block px-3 py-3 rounded-lg text-sm transition-colors
//                 ${
//                   pathname === item.href
//                     ? 'bg-white text-gray-900 font-semibold'
//                     : 'text-gray-300 hover:bg-gray-800 hover:text-white'
//                 }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="p-4 border-t border-gray-800">
//           <p className="text-xs text-gray-500 mb-3">
//             Logged in as {adminName}
//           </p>

//           <button
//             onClick={handleLogout}
//             className="text-red-400 hover:text-red-300 text-sm"
//           >
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="flex-1 flex flex-col">
//         <header className="bg-white border-b border-gray-200 px-6 py-4">
//           <h2 className="text-xl font-semibold text-gray-900">
//             {title}
//           </h2>
//         </header>

//         <main className="flex-1 p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

// FILE: frontend/app/components/admin/AdminLayout.js
// PURPOSE: Client-side layout wrapper for admin pages

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { adminAPI } from '@/lib/api';

const navItems = [
  { href: '/admin/dashboard',  label: 'Dashboard',  icon: '◈' },
  { href: '/admin/properties', label: 'Properties', icon: '⊞' },
  { href: '/admin/inquiries',  label: 'Inquiries',  icon: '◎' },
  { href: '/admin/analytics',  label: 'Analytics',  icon: '◇' },
];

export default function AdminLayout({ children, title }) {
  const pathname = usePathname();
  const router   = useRouter();

  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  const [adminName, setAdminName] = useState('Admin');
  const [loading,   setLoading]   = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isDemo) {
      setAdminName('Demo Admin');
      setLoading(false);
      return;
    }
    const fetchAdmin = async () => {
      try {
        const data = await adminAPI.getMe();
        setAdminName(data.admin?.name || 'Admin');
      } catch {
        router.replace('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, [router, isDemo]);

 const handleLogout = async () => {
    try {
      await adminAPI.logout();
      toast.success('Logged out successfully');
    } catch {
      console.error('Logout API failed, clearing session anyway');
    } finally {
      // ✅ ALWAYS runs — success or fail
      window.location.href = '/admin/login';
    }
  };
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#C9A96E]" />
          <p className="text-xs tracking-[0.2em] uppercase text-white/25">Loading</p>
        </div>
      </div>
    );
  }

  const initials = adminName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-dm        { font-family: 'DM Sans', sans-serif; }
        .nav-link { transition: background 0.18s, color 0.18s; }
        .nav-link:hover { background: rgba(201,169,110,0.07); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.15); border-radius: 2px; }
      `}</style>

      <div className="font-dm flex h-screen overflow-hidden bg-[#0a0a0f]">

        {/* ── Mobile overlay ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ══ SIDEBAR ══════════════════════════════════════ */}
        <aside className={`
          fixed z-30 flex h-full w-60 flex-col border-r border-white/[0.06] bg-[#0d0d15]
          transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>

          {/* Brand */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-5">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg
                            border border-[rgba(201,169,110,0.35)] text-[#C9A96E] text-sm">
              ◈
            </div>
            <div>
              <div className="font-cormorant text-[17px] font-semibold tracking-wide text-white">
                Lux<span className="text-[#C9A96E]">Estate</span>
              </div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-white/20">Admin Portal</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-0.5">
            <p className="mb-2 px-3 text-[9px] tracking-[0.25em] uppercase text-white/15">Menu</p>
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`nav-link flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px]
                    ${active
                      ? 'bg-[rgba(201,169,110,0.1)] text-[#C9A96E]'
                      : 'text-white/35 hover:text-white/75'
                    }`}
                >
                  <span className={`text-sm ${active ? 'text-[#C9A96E]' : 'text-white/20'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                  {active && (
                    <span className="ml-auto h-1 w-1 rounded-full bg-[#C9A96E]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User + logout */}
          <div className="border-t border-white/[0.06] p-3">
            <div className="flex items-center gap-2.5 rounded-xl px-2 py-2">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full
                              bg-[rgba(201,169,110,0.12)] text-[10px] font-semibold text-[#C9A96E]">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium text-white/60">{adminName}</p>
                <p className="text-[10px] text-white/20">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-1 w-full rounded-xl px-3 py-2 text-left text-[12px] text-white/25
                         transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              ← Sign Out
            </button>
          </div>
        </aside>

        {/* ══ MAIN ══════════════════════════════════════════ */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Top bar */}
          <header className="flex flex-shrink-0 items-center justify-between
                             border-b border-white/[0.06] bg-[#0d0d15]/80
                             px-4 py-3.5 backdrop-blur-sm sm:px-6">
            <div className="flex items-center gap-3">
              {/* Hamburger */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-1.5 text-white/30 transition-colors
                           hover:bg-white/5 hover:text-white/70 lg:hidden"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6"  x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>

              <div>
                <h1 className="font-cormorant text-[22px] font-semibold text-white sm:text-[26px]">
                  {title}
                </h1>
                <p className="hidden text-[10px] text-white/20 sm:block">
                  LuxEstate Admin Panel
                </p>
              </div>
            </div>

            {/* Header right */}
            <div className="flex items-center gap-2">
              <Link
                href="/admin/properties/new"
                className="hidden items-center gap-1.5 rounded-xl border border-[rgba(201,169,110,0.2)]
                           bg-[rgba(201,169,110,0.08)] px-3 py-2 text-[11px] font-medium
                           tracking-wide text-[#C9A96E] transition-colors
                           hover:bg-[rgba(201,169,110,0.15)] sm:flex"
              >
                <span className="text-base leading-none">+</span> Add Property
              </Link>
              <div className="flex h-8 w-8 items-center justify-center rounded-full
                              bg-[rgba(201,169,110,0.12)] text-[11px] font-semibold text-[#C9A96E]">
                {initials}
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}