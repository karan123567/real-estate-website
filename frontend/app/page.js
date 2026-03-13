// FILE: frontend/src/app/page.js
// PURPOSE: Homepage (Server-rendered, SEO optimized)
// ============================================================

import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import FeaturedProperties from "./components/FeaturedProperties";
import WhyChooseUs from "./components/WhyChooseUs";
import StatsSection from "./components/StatsSection";
import CTASection from "./components/CTASection";
import PropertyVideos from "./components/PropertyVideo";

// Server-side fetch (ISR enabled)
async function getFeaturedProperties() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "";

    const res = await fetch(
      `${baseUrl}/api/properties/featured?limit=4`,
      {
        next: { revalidate: 300 }, // Revalidate every 5 mins
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch featured properties");
      return [];
    }

    const data = await res.json();
    return Array.isArray(data?.properties) ? data.properties : [];
  } catch (error) {
    console.error("Homepage fetch error:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <>
      <Navbar />

      <main>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Stats */}
        <StatsSection />

        {/* {/* 3. Featured Properties */}

        <FeaturedProperties properties={featuredProperties} />
          {/* <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Handpicked premium listings from our expert agents
              </p>
            </div>
            <FeaturedProperties properties={featuredProperties} />
            <div className="text-center mt-12">
              <a
                href="/properties"
                className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg 
                           hover:bg-gray-700 transition-colors font-semibold tracking-wide"
              >
                View All Properties →
              </a>
            </div>
          </div>
        </section>
        */}
        {/* Propertyvideo section  */}
        <PropertyVideos />

        {/* 4. Why Choose Us */}
        <WhyChooseUs />

        {/* 5. CTA */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
