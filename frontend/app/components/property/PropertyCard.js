// 'use client'; // ✅ Fix #1 — removed hyphen

// import { useState, useMemo } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { formatPrice, truncate } from "@/lib/utils";

// export default function PropertyCard({ property }) {
//   const [imgError, setImgError] = useState(false);

//   if (!property) return null;

//   const images = Array.isArray(property.images) ? property.images : [];

//   const primaryImage = useMemo(() => {
//     const primary = images.find((img) => img?.isPrimary)?.url;
//     return primary || images[0]?.url || images[0] || null; // ✅ Fix #2 — image → images
//   }, [images]);

//   const daysOld = useMemo(() => {
//     if (!property.published_at) return null;

//     const published = new Date(property.published_at);
//     if (isNaN(published.getTime())) return null;

//     return Math.floor((Date.now() - published.getTime()) / 86400000);
//   }, [property.published_at]);

//   const listingType = property.listing_type?.toLowerCase() || "sale"; // ✅ Fix #3 — toLowercase → toLowerCase

//   return (
//     <Link href={`/properties/${property.id}`} className="block">
//       <article
//         className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl 
//                    transition-all duration-300 group border border-gray-100
//                    hover:-translate-y-1"
//       >
//         {/* Image */}
//         <div className="relative h-56 bg-gray-200 overflow-hidden">
//           {primaryImage && !imgError ? (
//             <Image
//               src={primaryImage}
//               alt={property.title || "Property Image"}
//               fill
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               className="object-cover group-hover:scale-105 transition-transform duration-500"
//               onError={() => setImgError(true)}
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
//               No Image Available
//             </div>
//           )}

//           {/* Badges */}
//           <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
//             {property.featured && (
//               <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded">
//                 Featured
//               </span>
//             )}

//             {daysOld !== null && daysOld <= 7 && (
//               <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
//                 New
//               </span>
//             )}

//             <span
//               className={`text-white text-xs font-semibold px-2 py-1 rounded
//                 ${listingType === "sale" ? "bg-blue-600" : "bg-purple-600"}`}
//             >
//               {listingType === "rent" ? "For Rent" : "For Sale"}
//             </span>
//           </div>

//           {/* Image Count */}
//           {images.length > 1 && (
//             <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
//               {images.length} Photos
//             </span>
//           )}
//         </div>

//         {/* Content */}
//         <div className="p-4">
//           {/* Price */}
//           <p className="text-2xl font-bold text-gray-900 mb-1">
//             {property.price
//               ? formatPrice(property.price, "INR")
//               : "Price on Request"}

//             {listingType === "rent" && (
//               <span className="text-sm font-normal text-gray-500">
//                 {" "}
//                 / month
//               </span>
//             )}
//           </p>

//           {/* Title */}
//           <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-gray-600 transition-colors">
//             {truncate(property.title || "Untitled Property", 60)}
//           </h3>

//           {/* Location */}
//           <p className="text-gray-500 text-sm mb-3">
//             {property.city}
//             {property.state ? `, ${property.state}` : ""}
//           </p>

//           {/* Features */}
//           <div className="flex items-center gap-4 text-sm text-gray-600 pt-3 border-t border-gray-100">
//             {property.bedrooms ? <span>{property.bedrooms} Bed</span> : null}
//             {property.bathrooms ? <span>{property.bathrooms} Bath</span> : null}
//             {property.area_sqft ? (
//               <span>
//                 {Number(property.area_sqft).toLocaleString("en-IN")} sq ft
//               </span>
//             ) : null}
//           </div>
//         </div>
//       </article>
//     </Link>
//   );
// }

'use client';

// PURPOSE: Reusable Property Card UI component
// Used in: FeaturedProperties (homepage), Properties listing page, etc.

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, truncate } from '@/lib/utils';

export default function PropertyCard({ property }) {
  const [imgError, setImgError] = useState(false);

  if (!property) return null;

  const images = Array.isArray(property.images) ? property.images : [];

  const primaryImage = useMemo(() => {
    const primary = images.find((img) => img?.isPrimary)?.url;
    return primary || images[0]?.url || images[0] || null;
  }, [images]);

  const daysOld = useMemo(() => {
    if (!property.published_at) return null;
    const published = new Date(property.published_at);
    if (isNaN(published.getTime())) return null;
    return Math.floor((Date.now() - published.getTime()) / 86400000);
  }, [property.published_at]);

  const listingType = property.listing_type?.toLowerCase() || 'sale';
  const isNew = daysOld !== null && daysOld <= 7;

  return (
    <Link href={`/properties/${property.id}`} className="block group">
      <article
        className="relative rounded-2xl overflow-hidden border border-amber-100/60
                   hover:-translate-y-1.5 transition-all duration-300 bg-white h-full flex flex-col"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
      >
        {/* ── IMAGE ── */}
        <div className="relative h-56 overflow-hidden bg-gray-100">
          {primaryImage && !imgError ? (
            <Image
              src={primaryImage}
              alt={property.title || 'Property Image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                   className="w-10 h-10 opacity-40">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5A1.5 1.5 0 003.75 21zm10.5-8.25h.008v.008h-.008V12.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="text-xs">No Image Available</span>
            </div>
          )}

          {/* Dark gradient for bottom text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

          {/* Top-left badges */}
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            {property.featured && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                    style={{ background: 'linear-gradient(135deg, #c9a96e, #e8c98a)' }}>
                ★ Featured
              </span>
            )}
            {isNew && (
              <span className="bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                New
              </span>
            )}
          </div>

          {/* Top-right: For Sale / Rent */}
          <div className="absolute top-3 right-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full text-white
              ${listingType === 'rent' ? 'bg-violet-600' : 'bg-blue-600'}`}>
              {listingType === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
          </div>

          {/* Photo count */}
          {images.length > 1 && (
            <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs
                             px-2 py-1 rounded-full backdrop-blur-sm">
              📷 {images.length}
            </span>
          )}

          {/* Price pinned to bottom-left of image */}
          <div className="absolute bottom-3 left-4">
            <p className="text-white font-bold text-lg drop-shadow-lg font-playfair leading-tight">
              {property.price
                ? listingType === 'rent'
                  ? `₹${Number(property.price).toLocaleString('en-IN')}/mo`
                  : `₹${Number(property.price).toLocaleString('en-IN')}`
                : 'Price on Request'}
            </p>
          </div>
        </div>

        {/* ── CARD BODY ── */}
        <div className="p-4 flex-1">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-1.5 leading-snug
                         group-hover:text-amber-700 transition-colors duration-200">
            {truncate(property.title || 'Untitled Property', 55)}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                 className="w-3.5 h-3.5 shrink-0 text-amber-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>{property.city}{property.state ? `, ${property.state}` : ''}</span>
          </div>

          {/* Features row */}
          <div className="flex items-center gap-3 text-xs text-gray-500 pt-3 border-t border-gray-100">
            {property.bedrooms && (
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 7.5V18m0-10.5A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5M3 7.5h18M3 12h18" />
                </svg>
                {property.bedrooms} Bed
              </span>
            )}
            {property.bathrooms && (
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {property.bathrooms} Bath
              </span>
            )}
            {property.area_sqft && (
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
                {Number(property.area_sqft).toLocaleString('en-IN')} sq_yd
              </span>
            )}
          </div>
        </div>

        {/* Gold sweep bottom border on hover */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full
                        transition-all duration-500 rounded-full"
             style={{ background: 'linear-gradient(90deg, #c9a96e, #e8c98a)' }} />
      </article>
    </Link>
  );
}