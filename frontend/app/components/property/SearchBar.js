'use client';

import { useState } from 'react';

export default function SearchBar({ initialValue = '', onSearch }) {
  const [city, setCity] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(city.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row gap-3"
    >
      <input
        type="text"
        placeholder="Search by city (e.g. Mumbai, Delhi, Bangalore)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm
                   focus:outline-none focus:ring-2 focus:ring-gray-900"
      />

      <button
        type="submit"
        className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold
                   hover:bg-gray-700 transition-colors"
      >
        Search
      </button>
    </form>
  );
}