// // // PURPOSE: Optimized Admin Dashboard (Server Rendered)

// // import AdminLayout from "../../components/admin/AdminLayout";
// // import StatCard from "../../components/admin/StatCard";
// // import { timeAgo } from "@/lib/utils";
// // import { adminAPI } from "@/lib/api";
// // import Link from "next/link";

// // export default async function AdminDashboard() {
// //   const isMock = process.env.NEXT_PUBLIC_MOCK_MODE === "true";

// //   let data;

// //   if (isMock) {
// //     data = {
// //       stats: {
// //         totalProperties: 128,
// //         monthlyInquiries: 34,
// //         monthlyVisitors: 1456,
// //       },
// //       recentInquiries: [
// //         {
// //           id: 1,
// //           name: "Rahul Sharma",
// //           property_title: "3BHK in Mumbai",
// //           status: "new",
// //           created_at: new Date().toISOString(),
// //         },
// //         {
// //           id: 2,
// //           name: "Priya Verma",
// //           property_title: "Villa in Bangalore",
// //           status: "contacted",
// //           created_at: new Date().toISOString(),
// //         },
// //       ],
// //     };
// //   } else {
// //     try {
// //       data = await adminAPI.getDashboard();
// //     } catch {
// //       data = { stats: {}, recentInquiries: [] };
// //     }
// //   }
// //   return (
// //     <AdminLayout title="Dashboard">
// //       {/* Stats gird */}

// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //         <StatCard
// //           title="Total Properties"
// //           value={data?.stats?.totalProperties ?? 0}
// //           icon="🏠"
// //           color="blue"
// //         />

// //         <StatCard
// //           title="Monthly Inquiries"
// //           value={data?.stats?.monthlyInquiries ?? 0}
// //           icon="📧"
// //           color="green"
// //         />
// //         <StatCard
// //           title="Monthly visitors"
// //           value={data?.stats?.monthlyVisitors ?? 0}
// //           icon="👥"
// //           color="purple"
// //         />
// //       </div>

// //       {/* Recent Inquiries */}
// //       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
// //         <div className="flex items-center justify-between p-6 border-b border-gray-100">
// //           <h2 className="text-lg font-semibold text-gray-900">
// //             Recent Inquiries
// //           </h2>
// //           <Link
// //             href="/admin/inquiries"
// //             className="text-sm text-blue-600 hover:text-blue-800"
// //           >
// //             View All →
// //           </Link>
// //         </div>

// //         <div className="divide-y divide-gray-50">
// //           {data?.recentInquiries?.length === 0 ? (
// //             <p className="text-center text-gray-400 py-8">No inquiries yet</p>
// //           ) : (
// //             data?.recentInquiries?.map((inquiry) => (
// //               <div
// //                 key={inquiry.id}
// //                 className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
// //               >
// //                 <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
// //                   {inquiry.name?.charAt(0)?.toUpperCase()}
// //                 </div>

// //                 <div className="flex-1 min-w-0">
// //                   <p className="font-medium text-gray-900 truncate">
// //                     {inquiry.name}
// //                   </p>
// //                   <p className="text-sm text-gray-500 truncate">
// //                     {inquiry.property_title || "General Inquiry"}
// //                   </p>
// //                 </div>

// //                 <div className="text-right flex-shrink-0">
// //                   <span
// //                     className={`inline-block px-2 py-1 rounded-full text-xs font-medium
// //                     ${
// //                       inquiry.status === "new"
// //                         ? "bg-red-100 text-red-700"
// //                         : inquiry.status === "contacted"
// //                           ? "bg-yellow-100 text-yellow-700"
// //                           : "bg-green-100 text-green-700"
// //                     }`}
// //                   >
// //                     {inquiry.status}
// //                   </span>

// //                   <p className="text-xs text-gray-400 mt-1">
// //                     {timeAgo(inquiry.created_at)}
// //                   </p>
// //                 </div>
// //               </div>
// //             ))
// //           )}
// //         </div>
// //       </div>

// //       {/* quick actions */}
// //       <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
// //         {[
// //           { label: "Add Property", href: "/admin/properties/new", icon: "➕" },
// //           { label: "View Inquiries", href: "/admin/inquiries", icon: "📬" },
// //           { label: "Analytics", href: "/admin/analytics", icon: "📊" },
// //           { label: "View Site", href: "/", icon: "🌐", external: true },
// //         ].map((action) =>
// //           action.external ? (
// //             <a
// //               key={action.label}
// //               href={action.href}
// //               target="_blank"
// //               rel="noopener norefferer"
// //               className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-gray-400 transition-colors"
// //             >
// //               <div className="text-2xl mb-2">{action.icon}</div>
// //               <p className="text-sm font-medium text-gray-700">
// //                 {action.label}
// //               </p>
// //             </a>
// //           ) : (
// //             <Link
// //               key={action.label}
// //               href={action.href}
// //               className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-gray-400 transition-colors"
// //             >
// //               <div className="text-2xl mb-2">{action.icon}</div>
// //               <p className="text-sm font-medium text-gray-700">
// //                 {action.label}
// //               </p>
// //             </Link>
// //           ),
// //         )}
// //       </div>
// //     </AdminLayout>
// //   );
// // }


// // FILE: frontend/app/admin/dashboard/page.js
// // PURPOSE: Admin Dashboard — luxury dark theme with charts

// import AdminLayout from '../../components/admin/AdminLayout';
// import StatCard    from '../../components/admin/StatCard';
// import DashboardCharts from '../../components/admin/DashboardCharts';
// import { timeAgo } from '@/lib/utils';
// import { adminAPI } from '@/lib/api';
// import Link from 'next/link';

// const STATUS_STYLES = {
//   new:       'bg-[rgba(74,222,128,0.1)] text-green-400 border border-green-400/20',
//   contacted: 'bg-[rgba(201,169,110,0.1)] text-[#C9A96E] border border-[#C9A96E]/20',
//   closed:    'bg-white/5 text-white/25 border border-white/10',
//   resolved:  'bg-white/5 text-white/25 border border-white/10',
// };

// export default async function AdminDashboard() {
//   const isMock = process.env.NEXT_PUBLIC_MOCK_MODE === 'true';

//   let data;

//   if (isMock) {
//     data = {
//       stats: {
//         totalProperties:  128,
//         monthlyInquiries: 34,
//         monthlyVisitors:  1456,
//       },
//       recentInquiries: [
//         { id: 1, name: 'Rahul Sharma',  property_title: '3BHK Sea-View, Bandra',      status: 'new',       created_at: new Date().toISOString() },
//         { id: 2, name: 'Priya Verma',   property_title: 'Villa, Whitefield Bangalore', status: 'contacted', created_at: new Date(Date.now() - 18*60000).toISOString() },
//         { id: 3, name: 'Arjun Kapoor',  property_title: 'Studio, Connaught Place',    status: 'new',       created_at: new Date(Date.now() - 60*60000).toISOString() },
//         { id: 4, name: 'Sunita Rao',    property_title: '2BHK, Koramangala',           status: 'closed',    created_at: new Date(Date.now() - 3*60*60000).toISOString() },
//         { id: 5, name: 'Vikram Nair',   property_title: 'Penthouse, Juhu',             status: 'contacted', created_at: new Date(Date.now() - 5*60*60000).toISOString() },
//       ],
//     };
//   } else {
//     try {
//       data = await adminAPI.getDashboard();
//     } catch {
//       data = { stats: {}, recentInquiries: [] };
//     }
//   }

//   const initials = (name) =>
//     name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '?';

//   const AVATAR_COLORS = ['#C9A96E', '#8B9D77', '#7B8FA1', '#B07D7D', '#9B8EA0', '#6B8A9E'];

//   return (
//     <AdminLayout title="Dashboard">

//       {/* ── STAT CARDS ─────────────────────────────────── */}
//       <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
//         <StatCard
//           title="Total Properties"
//           value={data?.stats?.totalProperties ?? 0}
//           icon="⊞"
//           change="+12%"
//           color="gold"
//         />
//         <StatCard
//           title="Monthly Inquiries"
//           value={data?.stats?.monthlyInquiries ?? 0}
//           icon="◎"
//           change="+8%"
//           color="green"
//         />
//         <StatCard
//           title="Monthly Visitors"
//           value={data?.stats?.monthlyVisitors ?? 0}
//           icon="◇"
//           change="+23%"
//           color="blue"
//         />
//         <StatCard
//           title="Avg. Response"
//           value="2.4h"
//           icon="○"
//           change="-18%"
//           color="purple"
//         />
//       </div>

//       {/* ── CHARTS (client component) ──────────────────── */}
//       <div className="mt-4">
//         <DashboardCharts />
//       </div>

//       {/* ── INQUIRIES + QUICK ACTIONS ──────────────────── */}
//       <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">

//         {/* Recent Inquiries — 2/3 */}
//         <div className="xl:col-span-2 rounded-2xl border border-white/[0.06] bg-[#0d0d15]">
//           <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
//             <div>
//               <p className="text-[10px] tracking-[0.2em] uppercase text-white/25">Latest</p>
//               <h2
//                 className="mt-0.5 text-xl font-semibold text-white"
//                 style={{ fontFamily: "'Cormorant Garamond', serif" }}
//               >
//                 Recent Inquiries
//               </h2>
//             </div>
//             <Link
//               href="/admin/inquiries"
//               className="text-[10px] tracking-[0.15em] uppercase text-[#C9A96E]
//                          transition-opacity hover:opacity-60"
//             >
//               View All →
//             </Link>
//           </div>

//           <div className="divide-y divide-white/[0.04]">
//             {!data?.recentInquiries?.length ? (
//               <p className="py-10 text-center text-sm text-white/20">No inquiries yet</p>
//             ) : (
//               data.recentInquiries.map((inq, idx) => (
//                 <div
//                   key={inq.id}
//                   className="flex items-center gap-3 px-5 py-3.5
//                              transition-colors hover:bg-white/[0.02]"
//                 >
//                   {/* Avatar */}
//                   <div
//                     className="flex h-8 w-8 flex-shrink-0 items-center justify-center
//                                rounded-full text-[11px] font-semibold"
//                     style={{
//                       background: AVATAR_COLORS[idx % AVATAR_COLORS.length] + '22',
//                       color:      AVATAR_COLORS[idx % AVATAR_COLORS.length],
//                       border:    `1px solid ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}33`,
//                     }}
//                   >
//                     {initials(inq.name)}
//                   </div>

//                   {/* Info */}
//                   <div className="min-w-0 flex-1">
//                     <p className="truncate text-[13px] font-medium text-white/75">
//                       {inq.name}
//                     </p>
//                     <p className="truncate text-[11px] text-white/25">
//                       {inq.property_title || 'General Inquiry'}
//                     </p>
//                   </div>

//                   {/* Status + time */}
//                   <div className="flex flex-shrink-0 flex-col items-end gap-1">
//                     <span
//                       className={`rounded-full px-2 py-0.5 text-[9px] tracking-wide uppercase
//                         ${STATUS_STYLES[inq.status] || STATUS_STYLES.closed}`}
//                     >
//                       {inq.status}
//                     </span>
//                     <span className="text-[10px] text-white/20">
//                       {timeAgo(inq.created_at)}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Quick Actions — 1/3 */}
//         <div className="flex flex-col gap-3">
//           <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d15] p-5">
//             <p className="mb-4 text-[10px] tracking-[0.2em] uppercase text-white/25">
//               Quick Actions
//             </p>
//             <div className="space-y-2">
//               {[
//                 { label: 'Add New Property',  desc: 'List a property',       icon: '+', href: '/admin/properties/new' },
//                 { label: 'View Inquiries',    desc: '5 pending responses',   icon: '◎', href: '/admin/inquiries'       },
//                 { label: 'Analytics Report',  desc: 'Full performance data', icon: '◇', href: '/admin/analytics'       },
//                 { label: 'View Public Site',  desc: 'See how it looks live', icon: '↗', href: '/', external: true      },
//               ].map((action) => {
//                 const Tag = action.external ? 'a' : Link;
//                 const extraProps = action.external
//                   ? { href: action.href, target: '_blank', rel: 'noopener noreferrer' }
//                   : { href: action.href };

//                 return (
//                   <Tag
//                     key={action.label}
//                     {...extraProps}
//                     className="group flex items-center gap-3 rounded-xl px-3 py-3
//                                transition-colors hover:bg-white/[0.04]"
//                   >
//                     <div
//                       className="flex h-8 w-8 flex-shrink-0 items-center justify-center
//                                  rounded-xl border border-[rgba(201,169,110,0.12)]
//                                  bg-[rgba(201,169,110,0.06)] text-sm text-[#C9A96E]
//                                  transition-colors group-hover:bg-[rgba(201,169,110,0.12)]"
//                     >
//                       {action.icon}
//                     </div>
//                     <div className="min-w-0">
//                       <p className="text-[13px] font-medium text-white/70
//                                    group-hover:text-white/90 transition-colors">
//                         {action.label}
//                       </p>
//                       <p className="text-[11px] text-white/20">{action.desc}</p>
//                     </div>
//                     <svg
//                       className="ml-auto h-3.5 w-3.5 flex-shrink-0 text-white/15
//                                  group-hover:text-white/40 transition-colors"
//                       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
//                     >
//                       <path d="M9 18l6-6-6-6"/>
//                     </svg>
//                   </Tag>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Mini status summary */}
//           <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d15] p-5">
//             <p className="mb-4 text-[10px] tracking-[0.2em] uppercase text-white/25">
//               Inquiry Status
//             </p>
//             {[
//               { label: 'New',       count: data?.recentInquiries?.filter(i => i.status === 'new').length || 0,       color: '#4ade80' },
//               { label: 'Contacted', count: data?.recentInquiries?.filter(i => i.status === 'contacted').length || 0, color: '#C9A96E' },
//               { label: 'Closed',    count: data?.recentInquiries?.filter(i => i.status === 'closed').length || 0,    color: '#ffffff40' },
//             ].map((s) => (
//               <div key={s.label} className="mb-3 last:mb-0">
//                 <div className="mb-1 flex items-center justify-between">
//                   <span className="text-[11px] text-white/40">{s.label}</span>
//                   <span className="text-[11px] font-medium text-white/60">{s.count}</span>
//                 </div>
//                 <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.05]">
//                   <div
//                     className="h-full rounded-full"
//                     style={{
//                       width: `${Math.min(100, (s.count / (data?.recentInquiries?.length || 1)) * 100)}%`,
//                       background: s.color,
//                       opacity: 0.8,
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Bottom spacer */}
//       <div className="h-6" />
//     </AdminLayout>
//   );
// }

import AdminLayout from '../../components/admin/AdminLayout';
import StatCard from '../../components/admin/StatCard';
import DashboardCharts from '../../components/admin/DashboardCharts';
import { timeAgo } from '@/lib/utils';
import { adminAPI } from '@/lib/api';
import Link from 'next/link';

const STATUS_STYLES = {
  new:       'bg-[rgba(74,222,128,0.1)] text-green-400 border border-green-400/20',
  contacted: 'bg-[rgba(201,169,110,0.1)] text-[#C9A96E] border border-[#C9A96E]/20',
  closed:    'bg-white/5 text-white/25 border border-white/10',
  resolved:  'bg-white/5 text-white/25 border border-white/10',
};

export default async function AdminDashboard() {
  // ✅ Fetch both dashboard + analytics in parallel
  let dashboard = { stats: {}, recentInquiries: [] };
  let analytics = { visitorsOverTime: [], topProperties: [] };

  try {
    [dashboard, analytics] = await Promise.all([
      adminAPI.getDashboard(),
      adminAPI.getAnalytics(30),
    ]);
  } catch {
    // show empty state if API fails
  }

  // ✅ Fix key mapping to match backend response
  const stats = dashboard?.stats || {};
  const totalProperties  = stats?.properties?.total    ?? 0;
  const monthlyInquiries = stats?.inquiries?.monthly   ?? 0;
  const newInquiries     = stats?.inquiries?.new       ?? 0;
  const monthlyVisitors  = stats?.visitors?.monthly    ?? 0;
  const recentInquiries  = dashboard?.recentInquiries  ?? [];

  // ✅ Build chart data from real analytics
  const visitorsChartData = (analytics?.visitorsOverTime || []).map((d) => ({
    month: new Date(d.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    visitors: d.visitors || 0,
    returning: d.returning_visitors || 0,
  }));

  // ✅ Build top cities from top properties
  const cityMap = {};
  (analytics?.topProperties || []).forEach((p) => {
    if (p.city) {
      cityMap[p.city] = (cityMap[p.city] || 0) + (p.view_count || 1);
    }
  });
  const cityChartData = Object.entries(cityMap)
    .map(([city, views]) => ({ city, listings: views }))
    .sort((a, b) => b.listings - a.listings)
    .slice(0, 5);

  const initials = (name) =>
    name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '?';

  const AVATAR_COLORS = ['#C9A96E', '#8B9D77', '#7B8FA1', '#B07D7D', '#9B8EA0', '#6B8A9E'];

  return (
    <AdminLayout title="Dashboard">

      {/* ── STAT CARDS ─────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Properties"
          value={totalProperties}
          icon="⊞"
          color="gold"
        />
        <StatCard
          title="Monthly Inquiries"
          value={monthlyInquiries}
          icon="◎"
          color="green"
        />
        <StatCard
          title="Monthly Visitors"
          value={monthlyVisitors}
          icon="◇"
          color="blue"
        />
        <StatCard
          title="New Inquiries"
          value={newInquiries}
          icon="○"
          color="purple"
        />
      </div>

      {/* ── CHARTS ─────────────────────────────────────── */}
      <div className="mt-4">
        <DashboardCharts
          visitorsData={visitorsChartData}
          cityData={cityChartData}
        />
      </div>

      {/* ── INQUIRIES + QUICK ACTIONS ──────────────────── */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">

        {/* Recent Inquiries */}
        <div className="xl:col-span-2 rounded-2xl border border-white/[0.06] bg-[#0d0d15]">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/25">Latest</p>
              <h2
                className="mt-0.5 text-xl font-semibold text-white"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Recent Inquiries
              </h2>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-[10px] tracking-[0.15em] uppercase text-[#C9A96E]
                         transition-opacity hover:opacity-60"
            >
              View All →
            </Link>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {!recentInquiries.length ? (
              <p className="py-10 text-center text-sm text-white/20">No inquiries yet</p>
            ) : (
              recentInquiries.map((inq, idx) => (
                <div
                  key={inq.id}
                  className="flex items-center gap-3 px-5 py-3.5
                             transition-colors hover:bg-white/[0.02]"
                >
                  <div
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center
                               rounded-full text-[11px] font-semibold"
                    style={{
                      background: AVATAR_COLORS[idx % AVATAR_COLORS.length] + '22',
                      color:      AVATAR_COLORS[idx % AVATAR_COLORS.length],
                      border:    `1px solid ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}33`,
                    }}
                  >
                    {initials(inq.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-white/75">{inq.name}</p>
                    <p className="truncate text-[11px] text-white/25">
                      {inq.property_title || 'General Inquiry'}
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 flex-col items-end gap-1">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] tracking-wide uppercase
                        ${STATUS_STYLES[inq.status] || STATUS_STYLES.closed}`}
                    >
                      {inq.status}
                    </span>
                    <span className="text-[10px] text-white/20">
                      {timeAgo(inq.created_at)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d15] p-5">
            <p className="mb-4 text-[10px] tracking-[0.2em] uppercase text-white/25">
              Quick Actions
            </p>
            <div className="space-y-2">
              {[
                { label: 'Add New Property',  desc: 'List a property',       icon: '+', href: '/admin/properties/new' },
                { label: 'View Inquiries',    desc: `${newInquiries} pending`, icon: '◎', href: '/admin/inquiries' },
                { label: 'Analytics Report',  desc: 'Full performance data', icon: '◇', href: '/admin/analytics' },
                { label: 'View Public Site',  desc: 'See how it looks live', icon: '↗', href: '/', external: true },
              ].map((action) => {
                const Tag = action.external ? 'a' : Link;
                const extraProps = action.external
                  ? { href: action.href, target: '_blank', rel: 'noopener noreferrer' }
                  : { href: action.href };
                return (
                  <Tag
                    key={action.label}
                    {...extraProps}
                    className="group flex items-center gap-3 rounded-xl px-3 py-3
                               transition-colors hover:bg-white/[0.04]"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center
                                   rounded-xl border border-[rgba(201,169,110,0.12)]
                                   bg-[rgba(201,169,110,0.06)] text-sm text-[#C9A96E]
                                   transition-colors group-hover:bg-[rgba(201,169,110,0.12)]">
                      {action.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-white/70
                                   group-hover:text-white/90 transition-colors">
                        {action.label}
                      </p>
                      <p className="text-[11px] text-white/20">{action.desc}</p>
                    </div>
                    <svg className="ml-auto h-3.5 w-3.5 flex-shrink-0 text-white/15
                                   group-hover:text-white/40 transition-colors"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </Tag>
                );
              })}
            </div>
          </div>

          {/* Inquiry Status */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d15] p-5">
            <p className="mb-4 text-[10px] tracking-[0.2em] uppercase text-white/25">
              Inquiry Status
            </p>
            {[
              { label: 'New',       count: recentInquiries.filter(i => i.status === 'new').length,       color: '#4ade80' },
              { label: 'Contacted', count: recentInquiries.filter(i => i.status === 'contacted').length, color: '#C9A96E' },
              { label: 'Closed',    count: recentInquiries.filter(i => i.status === 'closed').length,    color: '#ffffff40' },
            ].map((s) => (
              <div key={s.label} className="mb-3 last:mb-0">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[11px] text-white/40">{s.label}</span>
                  <span className="text-[11px] font-medium text-white/60">{s.count}</span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.05]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(100, (s.count / (recentInquiries.length || 1)) * 100)}%`,
                      background: s.color,
                      opacity: 0.8,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-6" />
    </AdminLayout>
  );
}