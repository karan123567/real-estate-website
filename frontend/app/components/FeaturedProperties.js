// PURPOSE: Homepage featured property grid
// ============================================================

import PropertyCard from "./property/PropertyCard";

export default function FeaturedProperties({ properties = [] }) {
  if (!Array.isArray(properties) || properties.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🏠</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Featured Properties Yet
        </h3>
        <p className="text-gray-500">
          Premium listings will appear here once available.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      aria-label="Featured properties"
    >
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}