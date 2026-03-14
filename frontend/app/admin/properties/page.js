"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/app/components/admin/AdminLayout";
import { adminAPI, propertyAPI } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
// import { Span } from "next/dist/trace";

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchProperties();
  }, [filter]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const params = filter !== "all" ? { status: filter } : {};
      const data = await propertyAPI.getAll(params);
      setProperties(data.properties || []);
    } catch (error) {
      toast.error("Failed to load Properties");
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      await propertyAPI.delete(id);
      toast.success("Property deleted");
      fetchProperties();
    } catch (error) {
      toast.error("Failed to delete Property");
    }
  };

  const toggleFeatured = async (id, currentFeatured) => {
    try {
      await propertyAPI.update(id, { featured: !currentFeatured });
      toast.success(
        currentFeatured ? "Removed from featured" : "Added to featured",
      );
      fetchProperties();
    } catch (error) {
      toast.error("Failed to update");
    }
  };
  return (
    <AdminLayout title="Properties">
      {/* HEader */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2">
          {[
            { key: "all", label: "All" },
            { key: "available", label: "Available" },
            { key: "pending", label: "Pending" },
            { key: "sold", label: "Sold/Rented" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`rounded-xl px-4 py-2 text-sm hover:cursor-pointer font-medium transition-all ${
                filter === tab.key
                  ? "bg-[#C9A96E] text-[#0d0d15]"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Link
          href="/admin/properties/new"
          className="roudned-xl bg-[#C9A96E] px-6 py-2.5 text-sm font-semibold text-[#0d0d15] transition-opacity hover:opacity-90"
        >
          + Add Property
        </Link>
      </div>

      {/* Properties grid */}
      {loading ? (
        <div className="py-20 text-center text-white/40">
          Loading properties...
        </div>
      ) : properties.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d15] py-20 text-center">
          <p className="text-white/40">No properties found</p>
          <Link
            href="/admin/properties/new"
            className="mt-4 inline-block text-sm text-[#C9A96E] hover:underline"
          >
            Add your first property
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d0d15] transition-all hover:border-white/10"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                {property.images?.[0]?.url ? (
                  <Image
                    src={property.images[0].url}
                    alt={property.title}
                    fill
                    className="object-cober transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/20">
                    No Image
                  </div>
                )}

                {/* Featured badge */}
                {property.featured && (
                  <div className="absolute left-3 top-3 rounded-full bg-[#C9A96E] px-3 py-1 text-xs font-semibold text-[#0d0d15]">
                    FEATURED
                  </div>
                )}

                {/* status Badge */}

                <div
                  className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                    property.status === "available"
                      ? "bg-green-500/20 text-green-400"
                      : property.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {property.status}
                </div>
              </div>

              {/* content */}
              <div className="p-4">
                <h3 className="line-clamp-1 font-semibold text-white">
                  {property.title}
                </h3>
                <p className="mt-1 text-sm text-white/50">
                  {property.city}, {property.state}
                </p>

                <div className="mt-3 flex items-center gap-4 text-xs text-white/40">
                  {property.bedrooms && <span>{property.bedrooms} Beds</span>}
                  {property.bathrooms && (
                    <span>{property.bathrooms} Baths</span>
                  )}
                  {property.area_sqft && <span>{property.area_sqft} sqft</span>}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <p>
                    {formatPrice(property.price)}
                    {property.listing_type === "rent" && (
                      <span className="text-sm">/mo</span>
                    )}
                  </p>
                  <p className="text-xs text-white/40">
                    {property.views_count || 0} views
                  </p>
                </div>

                {/* actions */}
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/admin/properties/edit/${property.id}`}
                    className="flex-1 rounded-lg bg-white/5 py-2 text-center text-sm text-white/70 transition-colors hover:bg-white/10"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      toggleFeatured(property.id, property.featured)
                    }
                    className="flex-1 rounded-lg bg-white/5 py-2 text-sm text-white/70 transition-colors hover:bg-white/10"
                  >
                    {property.featured ? "Unfeature" : "Feature"}
                  </button>

                  <button
                    onClick={() => deleteProperty(property.id)}
                    className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
