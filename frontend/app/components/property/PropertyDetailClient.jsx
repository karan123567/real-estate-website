'use client';

export default function PropertyDetailClient({ property }) {
  if (!property) return null;

  return (
    <div className="container mx-auto px-4 py-10">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-4">
        {property.title}
      </h1>

      {/* IMAGE GALLERY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {property.images?.map((img, index) => (
          <img
            key={index}
            src={img.url || img}
            alt="Property"
            className="w-full h-72 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* PRICE */}
      <p className="text-2xl font-semibold text-amber-600 mb-4">
        ₹{Number(property.price).toLocaleString('en-IN')}
        {property.listingType === 'rent' && '/month'}
      </p>

      {/* LOCATION */}
      <p className="text-gray-600 mb-6">
        {property.address}, {property.city}, {property.state}
      </p>

      {/* FEATURES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>🛏 Bedrooms: {property.bedrooms || 'N/A'}</div>
        <div>🛁 Bathrooms: {property.bathrooms || 'N/A'}</div>
        <div>📐 Area: {property.areaSqft || 'N/A'} sqft</div>
        <div>🏗 Year: {property.yearBuilt || 'N/A'}</div>
      </div>

      {/* DESCRIPTION */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 leading-relaxed">
          {property.description}
        </p>
      </div>

      {/* AMENITIES */}
      {property.amenities?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((item, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}