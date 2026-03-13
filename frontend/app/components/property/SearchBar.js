// 'use client';

// import { useState } from 'react';

// export default function SearchBar({ initialValue = '', onSearch }) {
//   const [city, setCity] = useState(initialValue);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (onSearch) {
//       onSearch(city.trim());
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row gap-3"
//     >
//       <input
//         type="text"
//         placeholder="Search by city (e.g. Mumbai, Delhi, Bangalore)"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm
//                    focus:outline-none focus:ring-2 focus:ring-gray-900"
//       />

//       <button
//         type="submit"
//         className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold
//                    hover:bg-gray-700 transition-colors"
//       >
//         Search
//       </button>
//     </form>
//   );
// }
'use client';

// PURPOSE: Property search bar — city/title search

import { useState } from 'react';

export default function SearchBar({ initialValue = '', onSearch }) {
  const [city, setCity] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(city.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl"
    >
      {/* Input */}
      <div className="relative flex-1">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
               className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search by city — Mumbai, Delhi, Bengaluru..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-gray-900
                     bg-white/95 backdrop-blur-sm border border-white/20
                     focus:outline-none focus:ring-2 focus:ring-amber-400/50
                     placeholder:text-gray-400"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="px-7 py-3.5 rounded-xl font-semibold text-sm text-white
                   transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap
                   hover:shadow-[0_0_20px_rgba(201,169,110,0.4)]"
        style={{ background: 'linear-gradient(135deg, #c9a96e, #b8854a)' }}
      >
        Search
      </button>
    </form>
  );
}