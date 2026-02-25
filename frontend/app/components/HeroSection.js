// PURPOSE: Homepage Hero Section (Corporate Indian Real Estate)

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gray-900 text-white relative">
      <div className="container mx-auto px-4 py-28 text-center">
        <h1 className="font-playfair text-5xl md:text-6xl font-bold leading-tight mb-6">
          Find Your Perfect Home in India
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Discover verified properties, trusted agents, and the best real estate
          opportunities across major Indian cities.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/properties"
            className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold 
                       hover:bg-gray-200 transition-colors"
          >
            Browse Properties
          </Link>

          <Link
            href="/contact"
            className="border border-white px-8 py-4 rounded-lg font-semibold
                       hover:bg-white hover:text-gray-900 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}