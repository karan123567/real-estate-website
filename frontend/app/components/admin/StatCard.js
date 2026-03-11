// // statCard for admin dashboard

// // import { Span } from "next/dist/trace";

// export default function StatCard({
//   title,
//   value = 0,
//   icon,
//   change,
//   color = "blue",
// }) {
//   const colorClasses = {
//     blue: "bg-blue-50 border-blue-200",
//     green: "bg-green-50 border-green-200",
//     purple: "bg-purple-50 border-purple-200",
//     red: "bg-red-50 border-red-200",
//   };

//   const safeColor = colorClasses[color] || colorClasses.blue;

//   const formatValue =
//     typeof value === "number" ? value.toLocaleString("en-IN") : (value ?? "-");

//   const isPositive =
//     typeof change === "string" && change.trim().startsWith("+");

//   return (
//     <div
//       className={`${safeColor} border rounded-xl p-6 transition-shadow hover:shadow-md`}
//     >
//       <div className="flex items-center justify-between mb-3">
//         <p className="text-sm font-medium text-gray-600">{title}</p>
//         {icon && <span className="text-2xl">{icon}</span>}
//       </div>

//       <p className="text-3xl font-bold text-gray-900">{formatValue}</p>

//       {change && (
//         <p
//           className={`text-xs mt-1 ${isPositive ? "text-green-600" : "text-red-600"}`}
//         >
//           {change} from last month
//         </p>
//       )}
//     </div>
//   );
// }

// FILE: frontend/app/components/admin/StatCard.js
// PURPOSE: KPI stat card for admin dashboard

export default function StatCard({ title, value = 0, icon, change, color = 'gold' }) {

  const formatValue =
    typeof value === 'number' ? value.toLocaleString('en-IN') : (value ?? '-');

  const isPositive = typeof change === 'string' && change.trim().startsWith('+');
  const hasChange  = !!change;

  // Progress bar widths per color (cosmetic only)
  const progressMap = {
    gold:   '72%',
    green:  '58%',
    blue:   '84%',
    purple: '45%',
    red:    '35%',
  };
  const progress = progressMap[color] || '60%';

  // Icon background tints
  const iconTintMap = {
    gold:   'rgba(201,169,110,0.1)',
    green:  'rgba(74,222,128,0.08)',
    blue:   'rgba(96,165,250,0.08)',
    purple: 'rgba(167,139,250,0.08)',
    red:    'rgba(248,113,113,0.08)',
  };
  const iconColorMap = {
    gold:   '#C9A96E',
    green:  '#4ade80',
    blue:   '#60a5fa',
    purple: '#a78bfa',
    red:    '#f87171',
  };
  const accentColor = iconColorMap[color] || iconColorMap.gold;
  const iconTint    = iconTintMap[color]  || iconTintMap.gold;

  return (
    <div
      className="group rounded-2xl border border-white/[0.06] bg-[#0d0d15] p-4
                 transition-all duration-200 hover:-translate-y-0.5
                 hover:border-white/10 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]
                 sm:p-5"
    >
      {/* Top row */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <p className="text-[10px] tracking-[0.2em] uppercase leading-relaxed text-white/30">
          {title}
        </p>
        {icon && (
          <div
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center
                       rounded-xl text-sm border"
            style={{
              background: iconTint,
              borderColor: accentColor + '22',
              color: accentColor,
            }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <p
        className="font-cormorant text-3xl font-bold leading-none text-white sm:text-4xl"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {formatValue}
      </p>

      {/* Change indicator */}
      {hasChange && (
        <div className="mt-2 flex items-center gap-1.5">
          <span className={`text-[10px] font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
          <span className="text-[10px] text-white/20">vs last month</span>
        </div>
      )}

      {/* Mini progress bar */}
      <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-white/[0.05]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: progress,
            background: `linear-gradient(90deg, ${accentColor}80, ${accentColor})`,
          }}
        />
      </div>
    </div>
  );
}