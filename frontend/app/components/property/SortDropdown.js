'use client';

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