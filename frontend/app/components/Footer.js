// PURPOSE: Global footer

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
            LuxEstate
          </h3>
          <p className="text-gray-600 text-sm">
            Premium real estate platform helping clients find verified properties across India.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/properties">Browse Properties</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Contact</h4>
          <p className="text-sm text-gray-600">
            support@luxestate.in <br />
            +91 98765 43210
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-6 border-t border-gray-200">
        © {new Date().getFullYear()} LuxEstate. All rights reserved.
      </div>
    </footer>
  );
}