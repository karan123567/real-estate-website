// PURPOSE: Optimized Admin Dashboard (Server Rendered)

import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import { timeAgo } from "@/lib/utils";
import { adminAPI } from "@/lib/api";
import Link from "next/link";

export default async function AdminDashboard() {
  let data = null;

  try {
    data = await adminAPI.getDashboard();
  } catch (error) {
    console.log("Dashboard fetch error: ", error);
  }
  return (
    <AdminLayout title="Dashboard">
      {/* Stats gird */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Properties"
          value={data?.stats?.totalProperties ?? 0}
          icon="🏠"
          color="blue"
        />

        <StatCard
          title="Monthly Inquiries"
          value={data?.stats?.monthlyInquiries ?? 0}
          icon="📧"
          color="green"
        />
        <StatCard
          title="Monthly visitors"
          value={data?.stats?.monthlyVisitors ?? 0}
          icon="👥"
          color="purple"
        />
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Inquiries
          </h2>
          <Link
            href="/admin/inquiries"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            View All →
          </Link>
        </div>

        <div className="divide-y divide-gray-50">
          {data?.recentInquiries?.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No inquiries yet</p>
          ) : (
            data?.recentInquiries?.map((inquiry) => (
              <div
                key={inquiry.id}
                className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
                  {inquiry.name?.charAt(0)?.toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {inquiry.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {inquiry.property_title || "General Inquiry"}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                    ${
                      inquiry.status === "new"
                        ? "bg-red-100 text-red-700"
                        : inquiry.status === "contacted"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {inquiry.status}
                  </span>

                  <p className="text-xs text-gray-400 mt-1">
                    {timeAgo(inquiry.created_at)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* quick actions */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Add Property", href: "/admin/properties/new", icon: "➕" },
          { label: "View Inquiries", href: "/admin/inquiries", icon: "📬" },
          { label: "Analytics", href: "/admin/analytics", icon: "📊" },
          { label: "View Site", href: "/", icon: "🌐", external: true },
        ].map((action) =>
          action.external ? (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener norefferer"
              className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-gray-400 transition-colors"
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <p className="text-sm font-medium text-gray-700">
                {action.label}
              </p>
            </a>
          ) : (
            <Link
              key={action.label}
              href={action.href}
              className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-gray-400 transition-colors"
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <p className="text-sm font-medium text-gray-700">
                {action.label}
              </p>
            </Link>
          ),
        )}
      </div>
    </AdminLayout>
  );
}
