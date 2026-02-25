// // PURPOSE: Reusable pagination component (optimized + accessible)

// 'use-client';

// import { useMemo } from "react";

// export default function Pagination({
//   currentPage = 1,
//   totalPages = 1,
//   onPageChange,
// }) {
//   // prevent invalid vlaues
//   const safeCurrent = Math.max(1, Math.min(currentPage, totalPages));
//   const hasPagination = totalPages > 1;

//   // Memoized page number calculation
//   const pageNumbers = useMemo(() => {
//     if (!hasPagination) return [];

//     const pages = [];
//     const range = 2;

//     for (let i = 1; i <= totalPages; i++) {
//       if (
//         i === 1 ||
//         i === totalPages ||
//         (i >= safeCurrent - range && i <= safeCurrent + range)
//       ) {
//         pages.push(i);
//       } else if (pages[pages.length - 1] !== "...") {
//         pages.push("...");
//       }
//     }
//     return pages;
//   }, [safeCurrent, totalPages, hasPagination]);

//   if (!hasPagination) return null;

//   return (
//     <nav
//       className="flex flex-col items-center gap-4"
//       aria-label="Pagination Navigation"
//     >
//       <p className="text-sm text-gray-500">
//         Page {safeCurrent} of {totalPages}
//       </p>

//       <div className="flex items-center gap-2">
//         {/* previous */}
//         <button
//           type="button"
//           onClick={() => onPageChange?.(safeCurrent - 1)}
//           disabled={safeCurrent === 1}
//           aria-label="Previous page"
//           className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium
//                      disabled:opacity-40 disabled:cursor-not-allowed
//                      hover:bg-gray-50 transition-colors"
//         >
//           ← Previous
//         </button>

//         {/* page number  */}
//         {pageNumbers.map((page, index) => (
//           <button
//             key={`${page} - ${index}`}
//             type="button"
//             onClick={() => typeof page === "number" && onPageChange?.(page)}
//             disabled={page === "..."}
//             aria-current={page === safeCurrent ? "page" : undefined}
//             className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors
//             ${
//               page === safeCurrent
//                 ? "bg-gray-900 text-white"
//                 : page === "..."
//                   ? "cursor-default text-gray-400"
//                   : "border border-gray-300 hover:bg-gray-50"
//             }`}
//           >
//             {page}
//           </button>
//         ))}
//         {/* next */}
//         <button
//           type="button"
//           onClick={() => onPageChange?.(safeCurrent + 1)}
//           disabled={safeCurrent === totalPages}
//           aria-label="Next-page"
//           className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium
//                      disabled:opacity-40 disabled:cursor-not-allowed
//                      hover:bg-gray-50 transition-colors"
//         >
//           Next →
//         </button>
//       </div>
//     </nav>
//   );
// }

'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  baseFilters = {},
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const safeCurrent = Math.max(1, Math.min(currentPage, totalPages));
  const hasPagination = totalPages > 1;

  const pageNumbers = useMemo(() => {
    if (!hasPagination) return [];

    const pages = [];
    const range = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= safeCurrent - range && i <= safeCurrent + range)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return pages;
  }, [safeCurrent, totalPages, hasPagination]);

  if (!hasPagination) return null;

  const updatePage = (page) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', page);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <nav
      className="flex flex-col items-center gap-4"
      aria-label="Pagination Navigation"
    >
      <p className="text-sm text-gray-500">
        Page {safeCurrent} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          type="button"
          onClick={() => updatePage(safeCurrent - 1)}
          disabled={safeCurrent === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium
                     disabled:opacity-40 disabled:cursor-not-allowed
                     hover:bg-gray-50 transition-colors"
        >
          ← Previous
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <button
            key={`${page}-${index}`}
            type="button"
            onClick={() => typeof page === 'number' && updatePage(page)}
            disabled={page === '...'}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors
              ${
                page === safeCurrent
                  ? 'bg-gray-900 text-white'
                  : page === '...'
                  ? 'cursor-default text-gray-400'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          type="button"
          onClick={() => updatePage(safeCurrent + 1)}
          disabled={safeCurrent === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium
                     disabled:opacity-40 disabled:cursor-not-allowed
                     hover:bg-gray-50 transition-colors"
        >
          Next →
        </button>
      </div>
    </nav>
  );
}
