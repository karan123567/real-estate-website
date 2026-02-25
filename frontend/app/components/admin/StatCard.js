// statCard for admin dashboard

import { Span } from "next/dist/trace";

export default function StatCard({
  title,
  value = 0,
  icon,
  change,
  color = "blue",
}) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    purple: "bg-purple-50 border-purple-200",
    red: "bg-red-50 border-red-200",
  };

  const safeColor = colorClasses[color] || colorClasses.blue;

  const formatValue =
    typeof value === "number" ? value.toLocaleString("en-IN") : (value ?? "-");

  const isPositive =
    typeof change === "string" && change.trim().startsWith("+");

  return (
    <div
      className={`${safeColor} border rounded-xl p-6 transition-shadow hover:shadow-md`}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>

      <p className="text-3xl font-bold text-gray-900">{formatedValue}</p>

      {change && (
        <p
          className={`text-xs mt-1 ${isPositive ? "text-green-600" : "text-red-600"}`}
        >
          {change} from last month
        </p>
      )}
    </div>
  );
}
