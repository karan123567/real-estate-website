// FILE: frontend/src/app/layout.js
// PURPOSE: Root layout (optimized for SEO + performance + Next 16)
// ============================================================

import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// Better structured metadata for SEO (India focused)
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),

  title: {
    default: "LuxEstate | Premium Real Estate in India",
    template: "%s | LuxEstate",
  },

  description:
    "Discover premium apartments, villas, and commercial properties across India. Buy or rent verified real estate listings with LuxEstate.",

  keywords: [
    "real estate India",
    "buy property India",
    "apartments in India",
    "villas for sale",
    "commercial property India",
  ],

  authors: [{ name: "LuxEstate" }],
  creator: "LuxEstate",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "LuxEstate",
    title: "LuxEstate | Premium Real Estate in India",
    description:
      "Find verified premium properties across India. Buy or rent your dream home today.",
  },

  twitter: {
    card: "summary_large_image",
    title: "LuxEstate | Premium Real Estate in India",
    description:
      "Explore premium real estate listings across India.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}

        {/* Global Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#111827",
              color: "#ffffff",
            },
          }}
        />
      </body>
    </html>
  );
}
