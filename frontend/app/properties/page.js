// FILE: frontend/src/app/properties/page.js
// PURPOSE: Hybrid SSR Property Listing (SEO + URL-driven filters)

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/property/PropertyCard";
import FilterSidebar from "../components/property/FilterSidebar";
import SearchBar from "../components/property/SearchBar";
import Pagination from "../components/ui/Pagination";
import SortDropdown from "../components/property/SortDropdown";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Fetch properties on server
async function getProperties(searchParams) {
  const query = new URLSearchParams(searchParams).toString();

  try {
    const res = await fetch(`${API_URL}/api/properties?${query}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return { properties: [], pagination: null };

    return res.json();
  } catch (error) {
    console.error("Failed to fetch properties:", error.message);
    return { properties: [], pagination: null }; // ✅ Page won't crash if backend is down
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

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="font-playfair text-4xl font-bold mb-4">
              Browse Properties
            </h1>

            <SearchBar initialValue={filters.city} baseFilters={filters} />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <FilterSidebar filters={filters} />
            </aside>

            {/* Main */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  {pagination
                    ? `Showing ${(currentPage - 1) * 12 + 1}–${Math.min(
                        currentPage * 12,
                        pagination.totalProperties,
                      )} of ${pagination.totalProperties} properties`
                    : "No properties found"}
                </p>

                {/* <FilterSidebar.SortDropdown
                  currentSort={filters.sortBy}
                  baseFilters={filters}
                /> */}
                <SortDropdown
                  currentSort={filters.sortBy}
                  baseFilters={filters}
                />
              </div>

              {/* Empty State */}
              {properties.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No properties found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your search filters
                  </p>
                </div>
              )}

              {/* Grid */}
              {properties.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-10">
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
