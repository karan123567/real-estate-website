// PURPOSE: Final Call-To-Action section

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-playfair text-4xl font-bold mb-6">
          Ready to Find Your Dream Home?
        </h2>

        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Explore thousands of verified listings across India and connect with trusted agents today.
        </p>

        <Link
          href="/properties"
          className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold 
                     hover:bg-gray-200 transition-colors"
        >
          Start Exploring
        </Link>
      </div>
    </section>
  );
}