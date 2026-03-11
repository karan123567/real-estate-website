// FILE: frontend/app/components/admin/DashboardCharts.js
// PURPOSE: Client-only chart components for admin dashboard (recharts)

'use client';

import {
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';

const revenueData = [
  { month: 'Aug', revenue: 42, inquiries: 18 },
  { month: 'Sep', revenue: 58, inquiries: 24 },
  { month: 'Oct', revenue: 47, inquiries: 20 },
  { month: 'Nov', revenue: 63, inquiries: 31 },
  { month: 'Dec', revenue: 71, inquiries: 28 },
  { month: 'Jan', revenue: 55, inquiries: 22 },
  { month: 'Feb', revenue: 84, inquiries: 34 },
];

const cityData = [
  { city: 'Mumbai',    listings: 48 },
  { city: 'Delhi',     listings: 34 },
  { city: 'Bangalore', listings: 29 },
  { city: 'Pune',      listings: 17 },
  { city: 'Hyderabad', listings: 14 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#1a1a2e] px-4 py-3 text-xs shadow-2xl">
      <p className="mb-1.5 font-medium text-[#C9A96E]">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="leading-5">
          {p.name}: <span className="font-semibold">{p.value}{p.name === 'revenue' ? 'L' : ''}</span>
        </p>
      ))}
    </div>
  );
};

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

      {/* Area Chart — Revenue & Inquiries */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d15] p-5 lg:col-span-2">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/25">Performance</p>
            <h3
              className="mt-0.5 text-xl font-semibold text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Revenue & Inquiries
            </h3>
          </div>
          <div className="flex gap-4 text-[10px] text-white/25">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-4 rounded-full bg-[#C9A96E]" />
              Revenue (L)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-4 rounded-full bg-[#4a5568]" />
              Inquiries
            </span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#C9A96E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#C9A96E" stopOpacity={0}   />
              </linearGradient>
              <linearGradient id="grayGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#4a5568" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4a5568" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#C9A96E"
              strokeWidth={2}
              fill="url(#goldGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#C9A96E', strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="inquiries"
              stroke="#4a5568"
              strokeWidth={2}
              fill="url(#grayGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#4a5568', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart — Top Cities */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d15] p-5">
        <div className="mb-5">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/25">Distribution</p>
          <h3
            className="mt-0.5 text-xl font-semibold text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Top Cities
          </h3>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={cityData}
            layout="vertical"
            margin={{ top: 0, right: 5, left: 0, bottom: 0 }}
          >
            <XAxis
              type="number"
              tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="city"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={72}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="listings"
              fill="#C9A96E"
              radius={[0, 4, 4, 0]}
              opacity={0.75}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}