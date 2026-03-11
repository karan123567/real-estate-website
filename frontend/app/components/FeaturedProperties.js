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

import Link from 'next/link';
import PropertyCard from './property/PropertyCard';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// TODO (backend): Remove this block and pass real `properties` prop instead
// Images: replace with Cloudinary URLs — structure: [{ url: '...', isPrimary: true }]
const MOCK_PROPERTIES = [
  {
    id: '1',
    title: 'Luxury Sea-View Villa with Private Pool',
    price: 45000000,
    listing_type: 'sale',
    city: 'Goa',
    state: 'Goa',
    bedrooms: 5,
    bathrooms: 4,
    area_sqft: 4200,
    featured: true,
    published_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    // ✅ Using local public image — add villa.jpg to /public/assets/images/mock/
    images: [{ url: '/assets/images/villa-1.jpg', isPrimary: true }],
  },
  {
    id: '2',
    title: 'Modern High-Rise Apartment in South Mumbai',
    price: 28000000,
    listing_type: 'sale',
    city: 'Mumbai',
    state: 'Maharashtra',
    bedrooms: 3,
    bathrooms: 2,
    area_sqft: 1850,
    featured: true,
    published_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    images: [{ url: '/assets/images/villa-2.jpg', isPrimary: true }],
  },
  {
    id: '3',
    title: 'Heritage Bungalow with Landscaped Garden',
    price: 75000,
    listing_type: 'rent',
    city: 'Bengaluru',
    state: 'Karnataka',
    bedrooms: 4,
    bathrooms: 3,
    area_sqft: 3100,
    featured: false,
    published_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    images: [{ url: '/assets/images/villa-3.jpg', isPrimary: true }],
  },
  {
    id: '4',
    title: 'Contemporary Penthouse with City Skyline Views',
    price: 62000000,
    listing_type: 'sale',
    city: 'Delhi',
    state: 'Delhi NCR',
    bedrooms: 4,
    bathrooms: 4,
    area_sqft: 5500,
    featured: true,
    published_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    images: [{ url: '/assets/images/villa-4.jpg', isPrimary: true }],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const FEATURED_LIMIT = 4;

export default function FeaturedProperties({ properties }) {
  // Use real data if passed from backend, else fall back to mock for preview
  const data =
    Array.isArray(properties) && properties.length > 0
      ? properties
      : MOCK_PROPERTIES;

  const visible = data.slice(0, FEATURED_LIMIT);
  const showViewAll = data.length > FEATURED_LIMIT;

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdf9f4 0%, #f8f3ec 100%)' }}
    >
      {/* Ambient glow top-right */}
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
          <p className="text-gray-500 max-w-xl mx-auto">
            Handpicked premium listings from our expert agents across India.
          </p>
        </div>

        {/* ── Property Grid ── */}
        {visible.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Featured Properties Yet
            </h3>
            <p className="text-gray-500">
              Premium listings will appear here once available.
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
            aria-label="Featured properties"
          >
            {visible.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* ── View All Button — only shown when properties exceed 4 ── */}
        {showViewAll && (
          <div className="text-center mt-12">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold
                         text-white transition-all duration-300 hover:-translate-y-0.5
                         hover:shadow-[0_0_30px_rgba(201,169,110,0.4)]"
              style={{ background: 'linear-gradient(135deg, #c9a96e, #b8854a)' }}
            >
              View All Properties
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}