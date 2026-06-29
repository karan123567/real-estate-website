// // PURPOSE: Homepage featured property grid
// // ============================================================

// import PropertyCard from "./property/PropertyCard";

// export default function FeaturedProperties({ properties = [] }) {
//   if (!Array.isArray(properties) || properties.length === 0) {
//     return (
//       <div className="text-center py-16">
//         <div className="text-5xl mb-4">🏠</div>
//         <h3 className="text-xl font-semibold text-gray-900 mb-2">
//           No Featured Properties Yet
//         </h3>
//         <p className="text-gray-500">
//           Premium listings will appear here once available.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//       aria-label="Featured properties"
//     >
//       {properties.map((property) => (
//         <PropertyCard key={property.id} property={property} />
//       ))}
//     </div>
//   );
// }

// PURPOSE: Homepage featured property grid
// MOCK DATA: Uses local placeholder images — backend swaps with Cloudinary URLs
// Split: This file handles section layout. Card UI lives in PropertyCard.jsx

// import Link from 'next/link';
// import PropertyCard from './property/PropertyCard';

// // ─── MOCK DATA ────────────────────────────────────────────────────────────────
// // TODO (backend): Remove this block and pass real `properties` prop instead
// // Images: replace with Cloudinary URLs — structure: [{ url: '...', isPrimary: true }]
// const MOCK_PROPERTIES = [
//   {
//     id: '1',
//     title: 'Luxury Sea-View Villa with Private Pool',
//     price: 45000000,
//     listing_type: 'sale',
//     city: 'Goa',
//     state: 'Goa',
//     bedrooms: 5,
//     bathrooms: 4,
//     area_sqft: 4200,
//     featured: true,
//     published_at: new Date(Date.now() - 2 * 86400000).toISOString(),
//     // ✅ Using local public image — add villa.jpg to /public/assets/images/mock/
//     images: [{ url: '/assets/images/villa-1.jpg', isPrimary: true }],
//   },
//   {
//     id: '2',
//     title: 'Modern High-Rise Apartment in South Mumbai',
//     price: 28000000,
//     listing_type: 'sale',
//     city: 'Mumbai',
//     state: 'Maharashtra',
//     bedrooms: 3,
//     bathrooms: 2,
//     area_sqft: 1850,
//     featured: true,
//     published_at: new Date(Date.now() - 5 * 86400000).toISOString(),
//     images: [{ url: '/assets/images/villa-2.jpg', isPrimary: true }],
//   },
//   {
//     id: '3',
//     title: 'Heritage Bungalow with Landscaped Garden',
//     price: 75000,
//     listing_type: 'rent',
//     city: 'Bengaluru',
//     state: 'Karnataka',
//     bedrooms: 4,
//     bathrooms: 3,
//     area_sqft: 3100,
//     featured: false,
//     published_at: new Date(Date.now() - 1 * 86400000).toISOString(),
//     images: [{ url: '/assets/images/villa-3.jpg', isPrimary: true }],
//   },
//   {
//     id: '4',
//     title: 'Contemporary Penthouse with City Skyline Views',
//     price: 62000000,
//     listing_type: 'sale',
//     city: 'Delhi',
//     state: 'Delhi NCR',
//     bedrooms: 4,
//     bathrooms: 4,
//     area_sqft: 5500,
//     featured: true,
//     published_at: new Date(Date.now() - 10 * 86400000).toISOString(),
//     images: [{ url: '/assets/images/villa-4.jpg', isPrimary: true }],
//   },
// ];

// const FEATURED_LIMIT = 10;

// export default function FeaturedProperties({ properties }) {
//   // Use real data if passed from backend, else fall back to mock for preview
//   const data =
//     Array.isArray(properties) && properties.length > 0
//       ? properties
//       : MOCK_PROPERTIES;

//   const visible = data.slice(0, FEATURED_LIMIT);
//   const showViewAll = data.length > FEATURED_LIMIT;

//   return (
//     <section
//       className="relative py-24 overflow-hidden"
//       style={{ background: 'linear-gradient(180deg, #fdf9f4 0%, #f8f3ec 100%)' }}
//     >
//       {/* Ambient glow top-right */}
//       <div
//         className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
//         style={{ background: 'radial-gradient(circle, #c9a96e 0%, transparent 70%)' }}
//       />

//       <div className="relative container mx-auto px-4">

//         {/* ── Section Header ── */}
//         <div className="text-center mb-14">
//           <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full
//                           border border-amber-400/40 bg-amber-400/10">
//             <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
//             <span className="text-amber-700 text-xs font-semibold tracking-widest uppercase">
//               Handpicked For You
//             </span>
//           </div>

//           <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Featured{' '}
//             <span className="relative inline-block">
//               Properties
//               <span
//                 className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
//                 style={{ background: 'linear-gradient(90deg, #c9a96e, #e8c98a)' }}
//               />
//             </span>
//           </h2>
//           <p className="text-gray-500 max-w-xl mx-auto">
//             Handpicked premium listings from our expert agents across India.
//           </p>
//         </div>

//         {/* ── Property Grid ── */}
//         {visible.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="text-5xl mb-4">🏠</div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               No Featured Properties Yet
//             </h3>
//             <p className="text-gray-500">
//               Premium listings will appear here once available.
//             </p>
//           </div>
//         ) : (
//           <div
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
//             aria-label="Featured properties"
//           >
//             {visible.map((property) => (
//               <PropertyCard key={property.id} property={property} />
//             ))}
//           </div>
//         )}

//         {/* ── View All Button — only shown when properties exceed 4 ── */}
//         {showViewAll && (
//           <div className="text-center mt-12">
//             <Link
//               href="/properties"
//               className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold
//                          text-white transition-all duration-300 hover:-translate-y-0.5
//                          hover:shadow-[0_0_30px_rgba(201,169,110,0.4)]"
//               style={{ background: 'linear-gradient(135deg, #c9a96e, #b8854a)' }}
//             >
//               View All Properties
//               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
//                    className="w-4 h-4">
//                 <path strokeLinecap="round" strokeLinejoin="round"
//                   d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
//               </svg>
//             </Link>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }


// PURPOSE: Homepage featured property grid
// No mock data — shows real backend data only
// Empty state shown when backend is down or no properties exist

import Link from 'next/link';
import PropertyCard from './property/PropertyCard';

const FEATURED_LIMIT = 20; // max properties to show
const VISIBLE_DEFAULT = 4; // show 4 on homepage

export default function FeaturedProperties({ properties }) {

  // ── No data / backend down → beautiful empty state ──────────────────────────
  if (!Array.isArray(properties) || properties.length === 0) {
    return (
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #fdf9f4 0%, #f8f3ec 100%)' }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c9a96e 0%, transparent 70%)' }}
        />

        <div className="relative container mx-auto px-4">
          {/* Section header stays visible */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full
                            border border-amber-400/40 bg-amber-400/10">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-amber-700 text-xs font-semibold tracking-widest uppercase">
                Handpicked For You
              </span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured{' '}
              <span className="relative inline-block">
                Properties
                <span
                  className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #c9a96e, #e8c98a)' }}
                />
              </span>
            </h2>
          </div>

          {/* ── Beautiful empty / offline state ── */}
          <div
            className="mx-auto max-w-lg rounded-3xl p-10 text-center"
            style={{
              background: 'linear-gradient(135deg, #fffbf5 0%, #fef3dc 100%)',
              border: '1px solid rgba(201,169,110,0.25)',
              boxShadow: '0 8px 40px rgba(201,169,110,0.12)',
            }}
          >
            {/* Icon */}
            <div
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: 'linear-gradient(135deg, #fef3dc, #fde9b8)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5"
                   className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12
                     M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875
                     c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21
                     h4.125c.621 0 1.125-.504 1.125-1.125V9.75
                     M8.25 21h8.25" />
              </svg>
            </div>

            <h3 className="font-playfair mb-3 text-2xl font-bold text-gray-900">
              Properties Coming Soon
            </h3>
            <p className="mb-2 text-gray-500 leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
              Our featured listings are being curated. Please check back shortly
              or browse all available properties.
            </p>
            <p className="mb-8 text-xs text-gray-400" style={{ fontFamily: 'sans-serif' }}>
              If you're seeing this unexpectedly, our team has been notified.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/properties"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3
                           font-semibold text-sm text-white transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #c9a96e, #b8854a)',
                         boxShadow: '0 4px 20px rgba(201,169,110,0.35)' }}
              >
                Browse All Properties
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3
                           font-semibold text-sm text-gray-600 border border-amber-200
                           transition-all hover:border-amber-400 hover:text-gray-800"
                style={{ fontFamily: 'sans-serif' }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Real data exists ─────────────────────────────────────────────────────────
  // Cap at FEATURED_LIMIT (20), show only 4 on homepage
  const capped   = properties.slice(0, FEATURED_LIMIT); // max 20
  const visible  = capped.slice(0, VISIBLE_DEFAULT);    // show 4
  const remaining = capped.length - VISIBLE_DEFAULT;    // how many more exist

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdf9f4 0%, #f8f3ec 100%)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c9a96e 0%, transparent 70%)' }}
      />

      <div className="relative container mx-auto px-4">

        {/* ── Section Header ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full
                          border border-amber-400/40 bg-amber-400/10">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-amber-700 text-xs font-semibold tracking-widest uppercase">
              Handpicked For You
            </span>
          </div>

          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured{' '}
            <span className="relative inline-block">
              Properties
              <span
                className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                style={{ background: 'linear-gradient(90deg, #c9a96e, #e8c98a)' }}
              />
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto" style={{ fontFamily: 'sans-serif' }}>
            Handpicked premium listings by Chandra Singh and the Parth Estate Mart team.
          </p>
        </div>

        {/* ── Property Grid — always 4 cards ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
          aria-label="Featured properties"
        >
          {visible.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* ── View All Button ── */}
        <div className="mt-12 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold
                       text-white transition-all duration-300 hover:-translate-y-0.5
                       hover:shadow-[0_0_30px_rgba(201,169,110,0.4)]"
            style={{ background: 'linear-gradient(135deg, #c9a96e, #b8854a)',
                     fontFamily: 'sans-serif' }}
          >
            {remaining > 0
              ? `View All ${capped.length} Properties`
              : 'Browse All Properties'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                 className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          {remaining > 0 && (
            <p className="mt-3 text-sm text-gray-400" style={{ fontFamily: 'sans-serif' }}>
              Showing 4 of {capped.length} featured listings
            </p>
          )}
        </div>

      </div>
    </section>
  );
}