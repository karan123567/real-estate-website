// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function FilterSidebar({ filters, onFilterChange }) {
//   const [localFilters, setLocalFilters] = useState(filters);

//   useEffect(() => {
//     setLocalFilters(filters);
//   }, [filters]);

//   const handleChange = (key, value) => {
//     setLocalFilters((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const handleApply = () => {
//     if (onFilterChange) {
//       onFilterChange(localFilters);
//     }
//   };

//   const handleClear = () => {
//     const cleared = {
//       city: '',
//       propertyType: '',
//       listingType: '',
//       minPrice: '',
//       maxPrice: '',
//       bedrooms: '',
//       sortBy: '',
//     };
//     setLocalFilters(cleared);
//     onFilterChange?.(cleared);
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
//       <h3 className="text-lg font-semibold text-gray-900">Filters</h3>

//       {/* Listing Type */}
//       <div>
//         <label className="block text-sm font-medium mb-2">Listing Type</label>
//         <select
//           value={localFilters.listingType}
//           onChange={(e) => handleChange('listingType', e.target.value)}
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
//         >
//           <option value="">All</option>
//           <option value="sale">Buy</option>
//           <option value="rent">Rent</option>
//         </select>
//       </div>

//       {/* Property Type */}
//       <div>
//         <label className="block text-sm font-medium mb-2">Property Type</label>
//         <select
//           value={localFilters.propertyType}
//           onChange={(e) => handleChange('propertyType', e.target.value)}
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
//         >
//           <option value="">All</option>
//           <option value="apartment">Apartment</option>
//           <option value="house">House</option>
//           <option value="villa">Villa</option>
//           <option value="commercial">Commercial</option>
//         </select>
//       </div>

//       {/* Price Range */}
//       <div>
//         <label className="block text-sm font-medium mb-2">Price Range (₹)</label>
//         <div className="flex gap-2">
//           <input
//             type="number"
//             placeholder="Min"
//             value={localFilters.minPrice}
//             onChange={(e) => handleChange('minPrice', e.target.value)}
//             className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm"
//           />
//           <input
//             type="number"
//             placeholder="Max"
//             value={localFilters.maxPrice}
//             onChange={(e) => handleChange('maxPrice', e.target.value)}
//             className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm"
//           />
//         </div>
//       </div>

//       {/* Bedrooms */}
//       <div>
//         <label className="block text-sm font-medium mb-2">Bedrooms</label>
//         <select
//           value={localFilters.bedrooms}
//           onChange={(e) => handleChange('bedrooms', e.target.value)}
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
//         >
//           <option value="">Any</option>
//           <option value="1">1 BHK</option>
//           <option value="2">2 BHK</option>
//           <option value="3">3 BHK</option>
//           <option value="4">4+ BHK</option>
//         </select>
//       </div>

//       {/* Buttons */}
//       <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
//         <button
//           onClick={handleApply}
//           className="bg-gray-900 text-white py-2 rounded-lg text-sm font-medium
//                      hover:bg-gray-700 transition-colors"
//         >
//           Apply Filters
//         </button>

//         <button
//           onClick={handleClear}
//           className="text-gray-600 text-sm hover:text-gray-900"
//         >
//           Clear Filters
//         </button>
//       </div>
//     </div>
//   );
// } // ✅ FilterSidebar function ends here

// // ✅ SortDropdown is defined OUTSIDE, then attached below
// function SortDropdown({ currentSort, baseFilters }) {
//   const router = useRouter();

//   const handleSort = (e) => {
//     const params = new URLSearchParams({
//       ...baseFilters,
//       sortBy: e.target.value,
//       page: 1,
//     });
//     router.push(`/properties?${params.toString()}`);
//   };

//   return (
//     <select
//       value={currentSort}
//       onChange={handleSort}
//       className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
//     >
//       <option value="">Sort By</option>
//       <option value="price_asc">Price: Low to High</option>
//       <option value="price_desc">Price: High to Low</option>
//       <option value="newest">Newest First</option>
//     </select>
//   );
// }

// // ✅ Attach AFTER both functions are defined
// // FilterSidebar.SortDropdown = SortDropdown;

'use client';

// PURPOSE: Filter sidebar for properties listing page

import { useState, useEffect } from 'react';

const selectClass = `w-full border border-amber-100 rounded-xl px-3 py-2.5 text-sm
  text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/40
  focus:border-amber-400 transition-colors cursor-pointer`;

const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2";

export default function FilterSidebar({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onFilterChange?.(localFilters);
  };

  const handleClear = () => {
    const cleared = {
      city: '', propertyType: '', listingType: '',
      minPrice: '', maxPrice: '', bedrooms: '', sortBy: '',
    };
    setLocalFilters(cleared);
    onFilterChange?.(cleared);
  };

  const hasActive = localFilters.listingType || localFilters.propertyType ||
    localFilters.minPrice || localFilters.maxPrice || localFilters.bedrooms;

  return (
    <div className="bg-white rounded-2xl border border-amber-100/60 overflow-hidden"
         style={{ boxShadow: '0 4px 24px rgba(180,140,80,0.08)' }}>

      {/* Header */}
      <div className="px-6 py-4 border-b border-amber-100/60 flex items-center justify-between"
           style={{ background: 'linear-gradient(135deg, #fef9f0, #fdf3e0)' }}>
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
               className="w-4 h-4 text-amber-600">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          <h3 className="font-semibold text-gray-900 text-sm">Filters</h3>
        </div>
        {hasActive && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium text-amber-700"
                style={{ background: 'rgba(201,169,110,0.2)' }}>
            Active
          </span>
        )}
      </div>

      <div className="p-6 space-y-5">

        {/* Listing Type */}
        <div>
          <label className={labelClass}>Listing Type</label>
          <select value={localFilters.listingType}
                  onChange={(e) => handleChange('listingType', e.target.value)}
                  className={selectClass}>
            <option value="">All</option>
            <option value="sale">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className={labelClass}>Property Type</label>
          <select value={localFilters.propertyType}
                  onChange={(e) => handleChange('propertyType', e.target.value)}
                  className={selectClass}>
            <option value="">All</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className={labelClass}>Price Range (₹)</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={localFilters.minPrice}
              onChange={(e) => handleChange('minPrice', e.target.value)}
              className="w-1/2 border border-amber-100 rounded-xl px-3 py-2.5 text-sm
                         text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400/40
                         focus:border-amber-400 transition-colors"
            />
            <input
              type="number"
              placeholder="Max"
              value={localFilters.maxPrice}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
              className="w-1/2 border border-amber-100 rounded-xl px-3 py-2.5 text-sm
                         text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400/40
                         focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className={labelClass}>Bedrooms</label>
          <select value={localFilters.bedrooms}
                  onChange={(e) => handleChange('bedrooms', e.target.value)}
                  className={selectClass}>
            <option value="">Any</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4+ BHK</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="pt-4 border-t border-amber-100/60 space-y-2.5">
          <button
            onClick={handleApply}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white
                       transition-all duration-300 hover:-translate-y-0.5
                       hover:shadow-[0_0_20px_rgba(201,169,110,0.35)]"
            style={{ background: 'linear-gradient(135deg, #c9a96e, #b8854a)' }}
          >
            Apply Filters
          </button>

          {hasActive && (
            <button
              onClick={handleClear}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-gray-500
                         border border-gray-200 hover:border-gray-300 hover:text-gray-700
                         transition-colors duration-200"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}