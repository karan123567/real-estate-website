// // FILE: frontend/src/app/properties/page.js
// // PURPOSE: Hybrid SSR Property Listing (SEO + URL-driven filters)

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import PropertyCard from "../components/property/PropertyCard";
// import FilterSidebar from "../components/property/FilterSidebar";
// import SearchBar from "../components/property/SearchBar";
// import Pagination from "../components/ui/Pagination";
// import SortDropdown from "../components/property/SortDropdown";
// import { redirect } from "next/navigation";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// // Fetch properties on server
// async function getProperties(searchParams) {
//   const query = new URLSearchParams(searchParams).toString();

//   try {
//     const res = await fetch(`${API_URL}/api/properties?${query}`, {
//       next: { revalidate: 60 },
//     });

//     if (!res.ok) return { properties: [], pagination: null };

//     return res.json();
//   } catch (error) {
//     console.error("Failed to fetch properties:", error.message);
//     return { properties: [], pagination: null }; // ✅ Page won't crash if backend is down
//   }
// }

// export default async function PropertiesPage({ searchParams }) {
//   const currentPage = Math.max(1, parseInt(searchParams.page) || 1);

//   const filters = {
//     city: searchParams.city || "",
//     propertyType: searchParams.propertyType || "",
//     listingType: searchParams.listingType || "",
//     minPrice: searchParams.minPrice || "",
//     maxPrice: searchParams.maxPrice || "",
//     bedrooms: searchParams.bedrooms || "",
//     sortBy: searchParams.sortBy || "",
//     page: currentPage,
//     limit: 12,
//   };

//   const { properties, pagination } = await getProperties(filters);

//   return (
//     <>
//       <Navbar />

//       <main className="min-h-screen bg-gray-50">
//         {/* Page Header */}
//         <div className="bg-gray-900 text-white py-16">
//           <div className="container mx-auto px-4">
//             <h1 className="font-playfair text-4xl font-bold mb-4">
//               Browse Properties
//             </h1>

//             <SearchBar initialValue={filters.city} baseFilters={filters} />
//           </div>
//         </div>

//         <div className="container mx-auto px-4 py-8">
//           <div className="flex gap-8">
//             {/* Sidebar */}
//             <aside className="hidden lg:block w-72 flex-shrink-0">
//               <FilterSidebar filters={filters} />
//             </aside>

//             {/* Main */}
//             <div className="flex-1">
//               {/* Results Header */}
//               <div className="flex items-center justify-between mb-6">
//                 <p className="text-gray-600">
//                   {pagination
//                     ? `Showing ${(currentPage - 1) * 12 + 1}–${Math.min(
//                         currentPage * 12,
//                         pagination.totalProperties,
//                       )} of ${pagination.totalProperties} properties`
//                     : "No properties found"}
//                 </p>

//                 {/* <FilterSidebar.SortDropdown
//                   currentSort={filters.sortBy}
//                   baseFilters={filters}
//                 /> */}
//                 <SortDropdown
//                   currentSort={filters.sortBy}
//                   baseFilters={filters}
//                 />
//               </div>

//               {/* Empty State */}
//               {properties.length === 0 && (
//                 <div className="text-center py-20">
//                   <div className="text-6xl mb-4">🏠</div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                     No properties found
//                   </h3>
//                   <p className="text-gray-500 mb-6">
//                     Try adjusting your search filters
//                   </p>
//                 </div>
//               )}

//               {/* Grid */}
//               {properties.length > 0 && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                   {properties.map((property) => (
//                     <PropertyCard key={property.id} property={property} />
//                   ))}
//                 </div>
//               )}

//               {/* Pagination */}
//               {pagination && pagination.totalPages > 1 && (
//                 <div className="mt-10">
//                   <Pagination
//                     currentPage={currentPage}
//                     totalPages={pagination.totalPages}
//                     baseFilters={filters}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }

// FILE: app/properties/page.js
// PURPOSE: Hybrid SSR Property Listing (SEO + URL-driven filters)

// FILE: app/properties/page.js
// PURPOSE: Hybrid SSR Property Listing (SEO + URL-driven filters)

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/property/PropertyCard";
import FilterSidebar from "../components/property/FilterSidebar";
import SearchBar from "../components/property/SearchBar";
import Pagination from "../components/ui/Pagination";
import SortDropdown from "../components/property/SortDropdown";
import MobileFilterDrawer from "../components/property/MobileFilterDrawer";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function getProperties(searchParams) {
  const query = new URLSearchParams(searchParams).toString();
  try {
    const res = await fetch(`/api/properties?${query}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return { properties: [], pagination: null };
    return res.json();
  } catch (error) {
    console.error("Failed to fetch properties:", error.message);
    return { properties: [], pagination: null };
  }
}

export default async function PropertiesPage({ searchParams }) {
  const currentPage = Math.max(1, parseInt(searchParams.page) || 1);

  const filters = {
    city: searchParams.city || "",
    propertyType: searchParams.propertyType || "",
    listingType: searchParams.listingType || "",
    minPrice: searchParams.minPrice || "",
    maxPrice: searchParams.maxPrice || "",
    bedrooms: searchParams.bedrooms || "",
    sortBy: searchParams.sortBy || "",
    page: currentPage,
    limit: 12,
  };

  const { properties, pagination } = await getProperties(filters);

  const hasActiveFilters = filters.city || filters.propertyType ||
    filters.listingType || filters.minPrice || filters.maxPrice || filters.bedrooms;

  return (
    <>
      <Navbar />

      <main className="min-h-screen" style={{ background: 'linear-gradient(180deg, #fdf9f4 0%, #f8f3ec 100%)' }}>

        {/* ── PAGE HEADER ── */}
        <div className="relative overflow-hidden pt-24 pb-12"
             style={{ background: 'linear-gradient(135deg, #1a1f2e 0%, #0f1420 100%)' }}>

          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
               style={{ background: 'radial-gradient(circle, #c9a96e 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
               style={{ background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)' }} />

          <div className="relative container mx-auto px-4">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full
                            border border-amber-400/30 bg-amber-400/10">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-amber-300 text-xs font-semibold tracking-widest uppercase">
                {pagination?.totalProperties
                  ? `${pagination.totalProperties} Properties Available`
                  : 'All Properties'}
              </span>
            </div>

            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              Browse{' '}
              <span className="relative inline-block">
                <span className="text-amber-300">Properties</span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full opacity-60"
                      style={{ background: 'linear-gradient(90deg, #c9a96e, #e8c98a)' }} />
              </span>
            </h1>

            <SearchBar initialValue={filters.city} baseFilters={filters} />
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="container mx-auto px-4 py-10">
          <div className="flex gap-8 items-start">

            {/* ── FILTER SIDEBAR ── */}
            <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
              <FilterSidebar filters={filters} />
            </aside>

            {/* ── RESULTS AREA ── */}
            <div className="flex-1 min-w-0">

              {/* Results bar */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  {/* Mobile filter trigger */}
                  <MobileFilterDrawer filters={filters} />

                  <p className="text-gray-600 text-sm">
                    {pagination
                      ? `Showing ${(currentPage - 1) * 12 + 1}–${Math.min(
                          currentPage * 12,
                          pagination.totalProperties
                        )} of ${pagination.totalProperties} properties`
                      : 'No properties found'}
                  </p>
                  {hasActiveFilters && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium text-amber-700"
                          style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)' }}>
                      Filtered
                    </span>
                  )}
                </div>
                <SortDropdown currentSort={filters.sortBy} baseFilters={filters} />
              </div>

              {/* Empty State */}
              {properties.length === 0 && (
                <div className="text-center py-24 rounded-2xl bg-white border border-amber-100/60"
                     style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                       style={{ background: 'linear-gradient(135deg, #fef3dc, #fde9b8)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                         className="w-9 h-9 text-amber-600">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                    No Properties Found
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                    Try adjusting your search filters or browse all available listings.
                  </p>
                  <a href="/properties"
                     className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
                                text-white transition-all duration-300 hover:-translate-y-0.5"
                     style={{ background: 'linear-gradient(135deg, #c9a96e, #b8854a)' }}>
                    Clear All Filters
                  </a>
                </div>
              )}

              {/* Property Grid */}
              {properties.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.totalPages}
                    baseFilters={filters}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}