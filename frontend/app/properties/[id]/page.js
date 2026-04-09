
import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PropertyDetailClient from '../../components/property/PropertyDetailClient';

// ✅ SEO Metadata
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) return {};

    const data = await res.json();
    const property = data.property || data; // ✅ FIX

    return {
      title: property.title || "Property",
      description: property.description?.substring(0, 160),
      openGraph: {
        title: property.title,
        description: property.description?.substring(0, 160),
        images: property.images?.[0]?.url
          ? [property.images[0].url]
          : [],
      },
    };
  } catch {
    return {};
  }
}

// ✅ Fetch property safely
async function getProperty(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.property || data; // ✅ FIX

  } catch {
    return null;
  }
}

export default async function PropertyDetailPage({ params }) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <PropertyDetailClient property={property} />
      <Footer />
    </>
  );
}