// "use client";

// import { useState, useEffect } from "react";
// import AdminLayout from "@/app/components/admin/AdminLayout";
// import { adminAPI } from "@/lib/api";
// import { formatPrice } from "@/lib/utils";
// import { toast } from "react-hot-toast";
// import StatCard from "@/app/components/admin/StatCard";

// export default function AdminAnalytics() {
//   const [loading, setLoading] = useState(true);
//   const [timeRange, setTimeRange] = useState("30");
//   const [analytics, setAnlytics] = useState(null);

//   useEffect(() => {
//     fetchAnalytics();
//   }, [timeRange]);

//   const fetchAnalytics = async () => {
//     try {
//       setLoading(true);
//       const data = await adminAPI.getAnalytics(parseInt(timeRange));
//       setAnlytics(data);
//     } catch (error) {
//       toast.error("Failed to load analytics");
//     } finally {
//       setLoading(false);
//     }
//   };
//   if (loading) {
//     return (
//       <AdminLayout title="Analytics">
//         <div className="py-20 text-center text-white/40">
//           Loading analytics...
//         </div>
//       </AdminLayout>
//     );
//   }

//   const visitors = analytics?.visitors || {};
//   const conversion = analytics?.conversion || {};
//   const topProperties = analytics?.topProperties || [];
//   const topSearches = analytics?.topSearches || [];

//   return (
//     <AdminLayout title="Analytics">
//       <div className="mb-6 flex gap-2">
//         {[
//           { value: "7", label: "Last 7 days" },
//           { value: "30", label: "Last 30 days" },
//           { value: "90", label: "Last 90 days" },
//         ].map((range) => (
//           <button
//             key={range.value}
//             onClick={() => setTimeRange(range.value)}
//             className={`rounded-xl px-4 py-2 text-sm font-medium hover:cursor-pointer transition-all ${
//               timeRange === range.value
//                 ? "bg-[#C9A96E] text-[#0d0d15]"
//                 : "bg-white/5 text-white/60 hover:bg-white/10"
//             }`}
//           >
//             {range.label}
//           </button>
//         ))}
//       </div>

//       {/* Overview stats */}
//       <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <StatCard
//           title="Total Visitors"
//           value={visitors.total || 0}
//           subtitle={`${((visitors.returing / (visitors.total || 1)) * 100).toFixed(0)} % return`}
//         />

//         <StatCard
//           title="Total Inquiries"
//           value={conversion.inquiries || 0}
//           subtitle={`${conversion.sessionWithInquiry || 0} sessions converted`}
//         />
//         <StatCard
//           title="Conversion Rate"
//           value={`${conversion.rate || 0}%`}
//           subtitle={`${conversion.inquiries} / ${conversion.visitors} visitors`}
//         />
//       </div>

//       {/* Top properties */}
//       <div className="mb-6">
//         <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d15]">
//           <div className="border-b border-white/[0.06] px-6 py-4">
//             <h2 className="text-lg font-semibold text-white">
//               Top properties by Views
//             </h2>
//             <p className="text-sm text-white/40">
//               Properties with the most visitor engagement
//             </p>
//           </div>
//           {topProperties.length === 0 ? (
//             <div className="py-10 text-center text-white/40">
//               No data available
//             </div>
//           ) : (
//             <div className="divide-y divide-white/[0.04]">
//               {topProperties.map((property, index) => (
//                 <div
//                   key={property.id}
//                   className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-white/[0.02]"
//                 >
//                   <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#C9A96E]/10 text-sm font-semibold text-[#C9A96E]">
//                     #{index + 1}
//                   </div>

//                   <div className="min-w-0 flex-1">
//                     <h3 className="font-medium text-white">{property.title}</h3>
//                     <p className="text-sm text-white/40">
//                       {property.city} • {formatPrice(property.price)}
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-3 gap-6 text-right">
//                     <div>
//                       <p className="text-lg font-semibold text-white">
//                         {property.view_count}
//                       </p>
//                       <p className="text-xs text-white/40">Views</p>
//                     </div>

//                     <div>
//                       <p className="text-lg font-semibold text-white">
//                         {property.unique_visitors}
//                       </p>
//                       <p className="text-xs text-white/40">Unique</p>
//                     </div>

//                     <div>
//                       <p className="text-lg font-semibold text-white">
//                         {Math.round(property.avg_time_spent)}s
//                       </p>
//                       <p className="text-xs text-white/40">Avg Time</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/app/components/admin/AdminLayout";
import { adminAPI } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { toast } from "react-hot-toast";
import StatCard from "@/app/components/admin/StatCard";

export default function AdminAnalytics() {
  const [loading, setLoading]     = useState(true);
  const [timeRange, setTimeRange] = useState("30");
  // ✅ Bug 1 fixed: was setAnlytics (typo) → setAnalytics
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => { fetchAnalytics(); }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getAnalytics(parseInt(timeRange));
      setAnalytics(data); // ✅ Bug 1 fixed
    } catch (error) {
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Analytics">
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#C9A96E]" />
            <p className="text-sm text-white/40">Loading analytics...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // ✅ Bug 3 & 5 fixed: correct field names matching backend response
  const visitors         = analytics?.visitors         || {};
  const conversion       = analytics?.conversion       || {};
  const topProperties    = analytics?.topProperties    || [];
  const topSearches      = analytics?.topSearches      || [];
  const visitorsOverTime = analytics?.visitorsOverTime || [];

  return (
    <AdminLayout title="Analytics">

      {/* Time range tabs */}
      <div className="mb-6 flex gap-2">
        {[
          { value: "7",  label: "Last 7 days"  },
          { value: "30", label: "Last 30 days" },
          { value: "90", label: "Last 90 days" },
        ].map((range) => (
          <button
            key={range.value}
            onClick={() => setTimeRange(range.value)}
            className={`rounded-xl px-4 py-2 text-sm font-medium hover:cursor-pointer transition-all ${
              timeRange === range.value
                ? "bg-[#C9A96E] text-[#0d0d15]"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* ── Overview Stats ── */}
      {/* ✅ Bug 6 fixed: was lg:grid-cols-4 with 3 cards → now 4 cards properly */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Visitors"
          value={visitors.total || 0}
          subtitle={`${visitors.returning || 0} returning`}
        />
        {/* ✅ Bug 2 fixed: was visitors.returing (typo) */}
        <StatCard
          title="New Visitors"
          value={(visitors.total || 0) - (visitors.returning || 0)}
          subtitle={`of ${visitors.total || 0} total`}
        />
        <StatCard
          title="Total Inquiries"
          value={conversion.inquiries || 0}
          subtitle={`from ${conversion.visitors || 0} visitors`}
        />
        {/* ✅ Bug 4&5 fixed: was conversion.sessionWithInquiry & wrong field names */}
        <StatCard
          title="Conversion Rate"
          value={`${conversion.rate || 0}%`}
          subtitle="visitors → inquiries"
        />
      </div>

      {/* ── Visitors Over Time chart ── */}
      {visitorsOverTime.length > 0 && (
        <div className="mb-6 rounded-2xl border border-white/[0.06] bg-[#0d0d15]">
          <div className="border-b border-white/[0.06] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Visitors Over Time</h2>
            <p className="text-sm text-white/40">Daily visitor count for the selected period</p>
          </div>
          <div className="p-6">
            <div className="flex items-end gap-1" style={{ height: "100px" }}>
              {(() => {
                const max = Math.max(...visitorsOverTime.map(d => parseInt(d.visitors) || 0), 1);
                return visitorsOverTime.map((day, i) => {
                  const count = parseInt(day.visitors) || 0;
                  const pct   = Math.max((count / max) * 100, 2);
                  return (
                    <div key={i} className="group relative flex flex-1 flex-col items-center justify-end h-full">
                      <div
                        className="w-full rounded-t-sm bg-[#C9A96E]/50 group-hover:bg-[#C9A96E] transition-colors"
                        style={{ height: `${pct}%` }}
                      />
                      <div className="absolute bottom-full mb-1 hidden rounded bg-black/80 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap z-10">
                        {day.date}: {count}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
            <div className="mt-2 flex justify-between text-xs text-white/30">
              <span>{visitorsOverTime[0]?.date}</span>
              <span>{visitorsOverTime[visitorsOverTime.length - 1]?.date}</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* ── Top Properties ── */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d15]">
          <div className="border-b border-white/[0.06] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Top Properties by Views</h2>
            <p className="text-sm text-white/40">Most visited listings</p>
          </div>
          {topProperties.length === 0 ? (
            <div className="py-10 text-center text-white/40">No data available</div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {topProperties.map((property, index) => (
                <div key={property.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#C9A96E]/10 text-xs font-semibold text-[#C9A96E]">
                    #{index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium text-white">{property.title}</h3>
                    <p className="text-sm text-white/40">{property.city} • {formatPrice(property.price)}</p>
                  </div>
                  <div className="flex gap-4 text-right">
                    <div>
                      <p className="font-semibold text-white">{property.view_count}</p>
                      <p className="text-xs text-white/40">Views</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{property.unique_visitors}</p>
                      <p className="text-xs text-white/40">Unique</p>
                    </div>
                    {property.avg_time_spent != null && (
                      <div>
                        <p className="font-semibold text-white">{Math.round(property.avg_time_spent)}s</p>
                        <p className="text-xs text-white/40">Avg Time</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Top Searches ── */}
        {/* ✅ Bug 6 fixed: was never rendered despite being fetched */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d15]">
          <div className="border-b border-white/[0.06] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Top Search Queries</h2>
            <p className="text-sm text-white/40">What visitors are searching for</p>
          </div>
          {topSearches.length === 0 ? (
            <div className="py-10 text-center text-white/40">No search data yet</div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {topSearches.map((search, index) => {
                const maxCount = topSearches[0]?.count || 1;
                const pct = Math.round(((search.count || search.search_count) / maxCount) * 100);
                return (
                  <div key={index} className="px-6 py-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="max-w-[65%] truncate text-sm font-medium text-white">
                        {search.search_query}
                      </span>
                      <span className="text-sm text-white/50">
                        {search.count || search.search_count} searches
                      </span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-white/[0.06]">
                      <div className="h-1 rounded-full bg-[#C9A96E]/60" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="mt-1 text-xs text-white/30">
                      Avg {search.avg_results || 0} results
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}