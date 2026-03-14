"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/app/components/admin/AdminLayout";
import { adminAPI } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { toast } from "react-hot-toast";
import StatCard from "@/app/components/admin/StatCard";

export default function AdminAnalytics() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30");
  const [analytics, setAnlytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getAnalytics(parseInt(timeRange));
      setAnlytics(data);
    } catch (error) {
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <AdminLayout title="Analytics">
        <div className="py-20 text-center text-white/40">
          Loading analytics...
        </div>
      </AdminLayout>
    );
  }

  const visitors = analytics?.visitors || {};
  const conversion = analytics?.conversion || {};
  const topProperties = analytics?.topProperties || [];
  const topSearches = analytics?.topSearches || [];

  return (
    <AdminLayout title="Analytics">
      <div className="mb-6 flex gap-2">
        {[
          { value: "7", label: "Last 7 days" },
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

      {/* Overview stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Visitors"
          value={visitors.total || 0}
          subtitle={`${((visitors.returing / (visitors.total || 1)) * 100).toFixed(0)} % return`}
        />

        <StatCard
          title="Total Inquiries"
          value={conversion.inquiries || 0}
          subtitle={`${conversion.sessionWithInquiry || 0} sessions converted`}
        />
        <StatCard
          title="Conversion Rate"
          value={`${conversion.rate || 0}%`}
          subtitle={`${conversion.inquiries} / ${conversion.visitors} visitors`}
        />
      </div>

      {/* Top properties */}
      <div className="mb-6">
        <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d15]">
          <div className="border-b border-white/[0.06] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Top properties by Views
            </h2>
            <p className="text-sm text-white/40">
              Properties with the most visitor engagement
            </p>
          </div>
          {topProperties.length === 0 ? (
            <div className="py-10 text-center text-white/40">
              No data available
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {topProperties.map((property, index) => (
                <div
                  key={property.id}
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-white/[0.02]"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#C9A96E]/10 text-sm font-semibold text-[#C9A96E]">
                    #{index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-white">{property.title}</h3>
                    <p className="text-sm text-white/40">
                      {property.city} • {formatPrice(property.price)}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-6 text-right">
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {property.view_count}
                      </p>
                      <p className="text-xs text-white/40">Views</p>
                    </div>

                    <div>
                      <p className="text-lg font-semibold text-white">
                        {property.unique_visitors}
                      </p>
                      <p className="text-xs text-white/40">Unique</p>
                    </div>

                    <div>
                      <p className="text-lg font-semibold text-white">
                        {Math.round(property.avg_time_spent)}s
                      </p>
                      <p className="text-xs text-white/40">Avg Time</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
