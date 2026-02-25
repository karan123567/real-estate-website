'use client'; // ✅ Fix #1 — removed hyphen

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice, truncate } from "@/lib/utils";

export default function PropertyCard({ property }) {
  const [imgError, setImgError] = useState(false);

  if (!property) return null;

  const images = Array.isArray(property.images) ? property.images : [];

  const primaryImage = useMemo(() => {
    const primary = images.find((img) => img?.isPrimary)?.url;
    return primary || images[0]?.url || images[0] || null; // ✅ Fix #2 — image → images
  }, [images]);

  const daysOld = useMemo(() => {
    if (!property.published_at) return null;

    const published = new Date(property.published_at);
    if (isNaN(published.getTime())) return null;

    return Math.floor((Date.now() - published.getTime()) / 86400000);
  }, [property.published_at]);

  const listingType = property.listing_type?.toLowerCase() || "sale"; // ✅ Fix #3 — toLowercase → toLowerCase

  return (
    <Link href={`/properties/${property.id}`} className="block">
      <article
        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl 
                   transition-all duration-300 group border border-gray-100
                   hover:-translate-y-1"
      >
        {/* Image */}
        <div className="relative h-56 bg-gray-200 overflow-hidden">
          {primaryImage && !imgError ? (
            <Image
              src={primaryImage}
              alt={property.title || "Property Image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No Image Available
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            {property.featured && (
              <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded">
                Featured
              </span>
            )}

            {daysOld !== null && daysOld <= 7 && (
              <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                New
              </span>
            )}

            <span
              className={`text-white text-xs font-semibold px-2 py-1 rounded
                ${listingType === "sale" ? "bg-blue-600" : "bg-purple-600"}`}
            >
              {listingType === "rent" ? "For Rent" : "For Sale"}
            </span>
          </div>

          {/* Image Count */}
          {images.length > 1 && (
            <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {images.length} Photos
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {property.price
              ? formatPrice(property.price, "INR")
              : "Price on Request"}

            {listingType === "rent" && (
              <span className="text-sm font-normal text-gray-500">
                {" "}
                / month
              </span>
            )}
          </p>

          {/* Title */}
          <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-gray-600 transition-colors">
            {truncate(property.title || "Untitled Property", 60)}
          </h3>

          {/* Location */}
          <p className="text-gray-500 text-sm mb-3">
            {property.city}
            {property.state ? `, ${property.state}` : ""}
          </p>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-gray-600 pt-3 border-t border-gray-100">
            {property.bedrooms ? <span>{property.bedrooms} Bed</span> : null}
            {property.bathrooms ? <span>{property.bathrooms} Bath</span> : null}
            {property.area_sqft ? (
              <span>
                {Number(property.area_sqft).toLocaleString("en-IN")} sq ft
              </span>
            ) : null}
          </div>
        </div>
      </article>
    </Link>
  );
}