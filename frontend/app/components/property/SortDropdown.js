// 'use client';

// import { useRouter } from 'next/navigation';

// export default function SortDropdown({ currentSort, baseFilters }) {
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

'use client';

// PURPOSE: Sort dropdown for properties listing page

import { useRouter } from 'next/navigation';

export default function SortDropdown({ currentSort, baseFilters }) {
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
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
             className="w-3.5 h-3.5 text-amber-600">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
        </svg>
      </div>
      <select
        value={currentSort}
        onChange={handleSort}
        className="pl-8 pr-4 py-2.5 text-sm rounded-xl border border-amber-100
                   text-gray-700 bg-white focus:outline-none focus:ring-2
                   focus:ring-amber-400/40 focus:border-amber-400
                   transition-colors cursor-pointer appearance-none"
        style={{ boxShadow: '0 2px 8px rgba(180,140,80,0.08)' }}
      >
        <option value="">Sort By</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="newest">Newest First</option>
      </select>
    </div>
  );
}