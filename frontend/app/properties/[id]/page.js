// // Single property detail page

// import { notFound } from 'next/navigation';
// import Navbar from "@/app/components/Navbar";
// import Footer from "@/app/components/Footer";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// async function fetchProperty(id) {
//     try{
//         const res = await fetch(`${API_URL}/api/properties/${id}`,{
//             next: {revalidate: 60}, 
//         });
//         if( !res.ok) return null;

//         const {property} = await res.json();
//         return property;
//     }catch{
//         return null;
//     }
// }

// // SEO Metadata
// export async function generateMetadata({params}) {
//     const property = await fetchProperty(params.id);

//     if(!property) {
//         return {
//             title: "Property Not Found",
//         };

//     }
//     const description = 
//     property.description?.substring(0,160) ||
//     'Explore this premium property listing.';

//     const imageUrl = 
//     property.images?.[0]?.url || '/default-property.jpg';

//     return {
//         title: `${property.title} | LuxEstate`,
//         description,
//         alternates: {
//             canonical: '/properties/${property.id}',
//         },
//         openGraph: {
//             title: property.title,
//             description,
//             images: [
//                 {
//                     url: imageUrl,
//                     width: 1200,
//                     height: 630,
//                 },
//             ],
//             type: 'website',
//         },
//     };
// }

// export default async function PropertyDetailPage({params}){
//     if(!params?.id) {
//         notFound();
//     }

//     const property = await fetchProperty(params.id);

//     if(!property) {
//         notFound();
//     }
//     return (
//         <>
//         <Navbar />
//         {/* <PropertyDetailClient property={property} /> */}
//         <Footer />
//         </>
//     )
// }


// ============================================================
// FILE: app/properties/[id]/page.js
// PURPOSE: Single property detail page (FIXED)
// ============================================================

import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PropertyDetailClient from '../../components/property/PropertyDetailClient';

// ✅ SEO Metadata
export async function generateMetadata({ params }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${params.id}`,
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
  const property = await getProperty(params.id);

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