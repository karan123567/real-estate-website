'use client';

// PURPOSE: Mobile filter drawer — wraps FilterSidebar in a slide-up modal for small screens

import { useState, useEffect } from 'react';
import FilterSidebar from './FilterSidebar';

export default function MobileFilterDrawer({ filters }) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const hasActive = filters.listingType || filters.propertyType ||
    filters.minPrice || filters.maxPrice || filters.bedrooms;

  return (
    <>
      {/* ── TRIGGER BUTTON — only visible on mobile ── */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                   border border-amber-200 bg-white text-gray-700
                   hover:border-amber-400 hover:text-amber-700 transition-all duration-200"
        style={{ boxShadow: '0 2px 8px rgba(180,140,80,0.1)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
             className="w-4 h-4 text-amber-600">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
        Filters
        {hasActive && (
          <span className="w-2 h-2 rounded-full bg-amber-500" />
        )}
      </button>

      {/* ── BACKDROP ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── DRAWER ── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden
                    rounded-t-3xl bg-white transition-transform duration-300 ease-in-out
                    max-h-[85vh] overflow-y-auto`}
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-amber-100/60">
          <h3 className="font-semibold text-gray-900">Filters</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200
                       flex items-center justify-center transition-colors"
            aria-label="Close filters"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                 className="w-4 h-4 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filter content — reuse existing FilterSidebar */}
        <div className="p-4">
          <FilterSidebar
            filters={filters}
            onFilterChange={() => setIsOpen(false)}
          />
        </div>
      </div>
    </>
  );
}