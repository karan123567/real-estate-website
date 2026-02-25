'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FilterSidebar({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApply = () => {
    if (onFilterChange) {
      onFilterChange(localFilters);
    }
  };

  const handleClear = () => {
    const cleared = {
      city: '',
      propertyType: '',
      listingType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      sortBy: '',
    };
    setLocalFilters(cleared);
    onFilterChange?.(cleared);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Filters</h3>

      {/* Listing Type */}
      <div>
        <label className="block text-sm font-medium mb-2">Listing Type</label>
        <select
          value={localFilters.listingType}
          onChange={(e) => handleChange('listingType', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All</option>
          <option value="sale">Buy</option>
          <option value="rent">Rent</option>
        </select>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium mb-2">Property Type</label>
        <select
          value={localFilters.propertyType}
          onChange={(e) => handleChange('propertyType', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="villa">Villa</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium mb-2">Price Range (₹)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={localFilters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={localFilters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-sm font-medium mb-2">Bedrooms</label>
        <select
          value={localFilters.bedrooms}
          onChange={(e) => handleChange('bedrooms', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Any</option>
          <option value="1">1 BHK</option>
          <option value="2">2 BHK</option>
          <option value="3">3 BHK</option>
          <option value="4">4+ BHK</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={handleApply}
          className="bg-gray-900 text-white py-2 rounded-lg text-sm font-medium
                     hover:bg-gray-700 transition-colors"
        >
          Apply Filters
        </button>

        <button
          onClick={handleClear}
          className="text-gray-600 text-sm hover:text-gray-900"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
} // ✅ FilterSidebar function ends here

// ✅ SortDropdown is defined OUTSIDE, then attached below
function SortDropdown({ currentSort, baseFilters }) {
  const router = useRouter();

  const handleSort = (e) => {
    const params = new URLSearchParams({
      ...baseFilters,
      sortBy: e.target.value,
      page: 1,
    });
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <select
      value={currentSort}
      onChange={handleSort}
      className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
    >
      <option value="">Sort By</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="newest">Newest First</option>
    </select>
  );
}

// ✅ Attach AFTER both functions are defined
// FilterSidebar.SortDropdown = SortDropdown;