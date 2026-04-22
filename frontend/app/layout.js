import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

// ── Site constants ──────────────────────────────────────────
const SITE_URL    = process.env.NEXT_PUBLIC_SITE_URL || "https://www.parthestatemart.com";
const SITE_NAME   = "ParthEstateMart";
const TAGLINE     = "Noida's Most Trusted Property Portal";
const DESCRIPTION =
  "Buy, sell or rent properties in Noida, Greater Noida, Jewar City & Gaur City. " +
  "ParthEstateMart offers verified residential & commercial listings — flats, villas, " +
  "plots, and builder floors across NCR at the best prices.";

const KEYWORDS = [
  // Primary — high intent Noida
  "property in Noida",
  "best property in Noida",
  "Noida property best",
  "buy flat in Noida",
  "flats for sale in Noida",
  "2BHK in Noida",
  "3BHK in Noida",
  "apartments in Noida",
  "Noida real estate",
  "property dealer Noida",
  "property consultant Noida",

  // Greater Noida
  "property in Greater Noida",
  "flats in Greater Noida",
  "buy property Greater Noida",
  "Greater Noida real estate",
  "affordable flats Greater Noida",
  "2BHK Greater Noida",
  "3BHK Greater Noida West",
  "Greater Noida West property",

  // Jewar City
  "property near Jewar airport",
  "Jewar city property",
  "investment near Jewar",
  "plots near Jewar airport",
  "real estate Jewar Noida",

  // Gaur City
  "Gaur City property",
  "flats in Gaur City",
  "Gaur City 2 flats",
  "Gaur City Greater Noida West",
  "Gaur City real estate",

  // NCR general
  "NCR property",
  "property in NCR",
  "real estate NCR",
  "buy property NCR",
  "NCR flats for sale",
  "Delhi NCR real estate",

  // Intent based
  "best real estate agent Noida",
  "verified property listings Noida",
  "RERA registered projects Noida",
  "ready to move flats Noida",
  "new projects in Noida",
  "under construction projects Noida",
  "luxury apartments Noida",
  "affordable housing Noida",
  "plot for sale Noida",
  "commercial property Noida",
  "office space Noida",
  "ParthEstateMart",
];

// ── Structured Data — Organization ─────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: DESCRIPTION,
  areaServed: [
    { "@type": "City", name: "Noida",         sameAs: "https://en.wikipedia.org/wiki/Noida"         },
    { "@type": "City", name: "Greater Noida", sameAs: "https://en.wikipedia.org/wiki/Greater_Noida" },
    { "@type": "City", name: "Jewar",         sameAs: "https://en.wikipedia.org/wiki/Jewar"         },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+919319025925",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    `${SITE_URL}`,
  ],
};

// ── Structured Data — Website + Sitelinks Searchbox ────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/properties?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ── Structured Data — BreadcrumbList ───────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",       item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Properties", item: `${SITE_URL}/properties` },
  ],
};

// ── Metadata export ─────────────────────────────────────────
export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} | Best Property in Noida, Greater Noida & NCR`,
    template: `%s | ${SITE_NAME}`,
  },

  description: DESCRIPTION,
  keywords: KEYWORDS,

  authors:  [{ name: SITE_NAME, url: SITE_URL }],
  creator:  SITE_NAME,
  publisher: SITE_NAME,

  // ── Canonical & alternates ────────────────────────────────
  alternates: {
    canonical: SITE_URL,
    languages: { "en-IN": SITE_URL },
  },

  // ── Robots ───────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ───────────────────────────────────────────
  openGraph: {
    type:        "website",
    locale:      "en_IN",
    url:         SITE_URL,
    siteName:    SITE_NAME,
    title:       `${SITE_NAME} | Best Property in Noida, Greater Noida & NCR`,
    description: DESCRIPTION,
    images: [
      {
        url:    `${SITE_URL}/og-image.png`,
        width:  1200,
        height: 630,
        alt:    `${SITE_NAME} — Noida Real Estate`,
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────
  twitter: {
    card:        "summary_large_image",
    title:       `${SITE_NAME} | Best Property in Noida & NCR`,
    description: DESCRIPTION,
    images:      [`${SITE_URL}/og-image.png`],
  },

  // ── Verification (add your codes here) ───────────────────
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    // bing: "your-bing-code",
  },

  // ── App metadata ─────────────────────────────────────────
  applicationName: SITE_NAME,
  category: "Real Estate",
  classification: "Real Estate, Property, Housing",

  // ── Geo targeting (important for local SEO) ──────────────
  other: {
    "geo.region":       "IN-UP",
    "geo.placename":    "Noida, Uttar Pradesh, India",
    "geo.position":     "28.5355;77.3910",
    "ICBM":             "28.5355, 77.3910",
    "language":         "English",
    "revisit-after":    "3 days",
    "rating":           "general",
    "distribution":     "global",
    "coverage":         "Noida, Greater Noida, Jewar, Gaur City, NCR, India",
    "target":           "all",
    "HandheldFriendly": "True",
    "MobileOptimized":  "320",
  },
};

export const viewport = {
  width:          "device-width",
  initialScale:   1,
  maximumScale:   5,
  themeColor:     "#C9A96E",
};

// ── Root Layout ─────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <head>
        {/* ── Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        {/* ── Preconnects for performance ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ── Favicons ── */}
        <link rel="icon"             href="/favicon.ico" sizes="any" />
        <link rel="icon"             href="/icon.svg"    type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest"         href="/manifest.json" />
      </head>

      <body className="font-sans antialiased bg-[#0a0a0f] text-white">
        {children}

        {/* ── Google Analytics ── */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* ── Toast Notifications ── */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#0d0d15",
              color: "#ffffff",
              border: "1px solid rgba(201,169,110,0.2)",
            },
          }}
        />
      </body>
    </html>
  );
}