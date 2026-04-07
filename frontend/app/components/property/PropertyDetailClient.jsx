'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Phone,
  Share2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

export default function PropertyDetailClient({ property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreenGallery, setShowFullscreenGallery] = useState(false);

  if (!property) return null;

  // ✅ Normalize fields (VERY IMPORTANT)
  const images = property.images || [];
  const bedrooms = property.bedrooms || 0;
  const bathrooms = property.bathrooms || 0;
  const area = property.areaSqft || property.area || 0;
  const location = `${property.city || ''}, ${property.state || ''}`;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price || 0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Back */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/properties" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Properties
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className="relative h-[400px] bg-black">
        {images.length > 0 ? (
          <>
            <Image
              src={images[currentImageIndex]?.url || images[currentImageIndex]}
              alt={property.title}
              fill
              className="object-cover"
            />

            {images.length > 1 && (
              <>
                <button onClick={previousImage} className="absolute left-4 top-1/2">
                  <ChevronLeft className="text-white" />
                </button>

                <button onClick={nextImage} className="absolute right-4 top-1/2">
                  <ChevronRight className="text-white" />
                </button>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold">{property.title}</h1>

            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <MapPin className="w-4 h-4" />
              {location}
            </div>

            <p className="text-2xl text-blue-600 mt-4">
              {formatPrice(property.price)}
            </p>

            <div className="flex gap-6 mt-4">
              <div><Bed /> {bedrooms}</div>
              <div><Bath /> {bathrooms}</div>
              <div><Square /> {area} sqft</div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-bold mb-2">Description</h2>
            <p>{property.description}</p>
          </div>

          {/* Amenities */}
          {property.amenities?.length > 0 && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="font-bold mb-2">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((a, i) => (
                  <span key={i} className="bg-gray-200 px-3 py-1 rounded">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white p-6 rounded shadow h-fit">
          <button className="w-full bg-blue-600 text-white py-3 rounded mb-3">
            Contact Agent
          </button>

          <a
            href="tel:+919876543210"
            className="block text-center border py-3 rounded"
          >
            <Phone className="inline mr-2" />
            Call Now
          </a>
        </div>

      </div>
    </div>
  );
}