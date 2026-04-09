'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin, Bed, Bath, Square, Phone, Share2,
  ArrowLeft, ChevronLeft, ChevronRight, X,
  Heart, Eye, Calendar, Tag, Home, Maximize2
} from 'lucide-react';

export default function PropertyDetailClient({ property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery]             = useState(false);
  const [saved, setSaved]                         = useState(false);
  const [showContact, setShowContact]             = useState(false);
  const [mounted, setMounted]                     = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!property) return null;

  const images    = property.images || [];
  const bedrooms  = property.bedrooms  || 0;
  const bathrooms = property.bathrooms || 0;
  const area      = property.areaSqft  || property.area_sqft || property.area || 0;
  const location  = [property.city, property.state].filter(Boolean).join(', ');

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0,
    }).format(price || 0);

  const nextImage = () =>
    setCurrentImageIndex((p) => (p === images.length - 1 ? 0 : p + 1));
  const prevImage = () =>
    setCurrentImageIndex((p) => (p === 0 ? images.length - 1 : p - 1));

  const imgSrc = (img) => (typeof img === 'string' ? img : img?.url || '');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-dm        { font-family: 'DM Sans', sans-serif; }

        @keyframes fade-up {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fade-in {
          from { opacity:0; } to { opacity:1; }
        }
        @keyframes shimmer {
          from { background-position: -200% center; }
          to   { background-position:  200% center; }
        }

        .fade-up   { animation: fade-up  0.6s ease forwards; }
        .fade-in   { animation: fade-in  0.4s ease forwards; }
        .delay-1   { animation-delay: 0.1s; opacity:0; }
        .delay-2   { animation-delay: 0.2s; opacity:0; }
        .delay-3   { animation-delay: 0.3s; opacity:0; }
        .delay-4   { animation-delay: 0.4s; opacity:0; }

        .gold-shimmer {
          background: linear-gradient(90deg, #C9A96E, #f0d9a8, #C9A96E);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(201,169,110,0.1);
        }

        .thumb-active { border-color: #C9A96E !important; opacity: 1 !important; }

        .contact-btn {
          background: linear-gradient(135deg, #8B6D38, #C9A96E, #8B6D38);
          background-size: 200%;
          background-position: 100%;
          transition: background-position 0.4s, transform 0.2s, box-shadow 0.3s;
        }
        .contact-btn:hover {
          background-position: 0%;
          transform: translateY(-1px);
          box-shadow: 0 12px 40px rgba(201,169,110,0.35);
        }

        .stat-card:hover { border-color: rgba(201,169,110,0.3); background: rgba(201,169,110,0.05); }

        /* Fullscreen gallery */
        .gallery-overlay {
          position: fixed; inset:0; z-index:100;
          background: rgba(0,0,0,0.97);
          display:flex; align-items:center; justify-content:center;
        }

        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:rgba(201,169,110,0.2); border-radius:2px; }
      `}</style>

      <div className="font-dm min-h-screen bg-[#0a0a0f] text-white">

        {/* ── TOP BAR — back link + actions (no duplicate navbar) ── */}
        {/* ── TOP BAR — sits below external Navbar ── */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pt-20 pb-4 sm:px-6">
          <Link
            href="/properties"
            className="group flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-[#C9A96E]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Properties
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSaved(p => !p)}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all
                ${saved
                  ? 'border-red-400/30 bg-red-400/10 text-red-400'
                  : 'border-white/10 text-white/30 hover:border-white/20 hover:text-white/60'
                }`}
            >
              <Heart className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => navigator.share?.({ title: property.title, url: window.location.href })}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10
                         text-white/30 transition-all hover:border-white/20 hover:text-white/60"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── HERO IMAGE ───────────────────────────────── */}
        <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden bg-[#0d0d15]">
          {images.length > 0 ? (
            <>
              <Image
                src={imgSrc(images[currentImageIndex])}
                alt={property.title}
                fill
                className="object-cover transition-all duration-700"
                priority
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/40 via-transparent to-transparent" />

              {/* Image counter */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full
                              border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-white/50 backdrop-blur-sm">
                <Eye className="h-3 w-3" />
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Expand button */}
              <button
                onClick={() => setShowGallery(true)}
                className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full
                           border border-white/10 bg-black/60 px-3 py-1.5 text-xs
                           text-white/50 backdrop-blur-sm transition-colors hover:text-[#C9A96E]"
              >
                <Maximize2 className="h-3 w-3" />
                View All Photos
              </button>

              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center
                               justify-center rounded-full border border-white/10 bg-black/40
                               text-white/50 backdrop-blur-sm transition-all hover:border-[#C9A96E]/40
                               hover:text-[#C9A96E]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center
                               justify-center rounded-full border border-white/10 bg-black/40
                               text-white/50 backdrop-blur-sm transition-all hover:border-[#C9A96E]/40
                               hover:text-[#C9A96E]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <Home className="mx-auto mb-3 h-12 w-12 text-white/10" />
                <p className="text-sm text-white/20">No images available</p>
              </div>
            </div>
          )}
        </div>

        {/* ── THUMBNAIL STRIP ──────────────────────────── */}
        {images.length > 1 && (
          <div className="border-b border-white/[0.06] bg-[#0d0d15]">
            <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`thumb-active relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2
                              transition-all duration-200
                              ${i === currentImageIndex
                                ? 'thumb-active'
                                : 'border-white/10 opacity-40 hover:opacity-70'
                              }`}
                >
                  <Image src={imgSrc(img)} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── MAIN CONTENT ─────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">

            {/* ══ LEFT — Details ══════════════════════════ */}
            <div className="space-y-6 lg:col-span-2">

              {/* Title block */}
              <div className={`fade-up delay-1 ${mounted ? '' : 'opacity-0'}`}>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  {property.listing_type && (
                    <span className="rounded-full border border-[#C9A96E]/30 bg-[#C9A96E]/10
                                     px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-[#C9A96E]">
                      {property.listing_type}
                    </span>
                  )}
                  {property.property_type && (
                    <span className="rounded-full border border-white/10 bg-white/5
                                     px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-white/40">
                      {property.property_type}
                    </span>
                  )}
                  {property.status && (
                    <span className={`rounded-full border px-3 py-1 text-[10px] tracking-[0.2em] uppercase
                      ${property.status === 'available'
                        ? 'border-green-400/20 bg-green-400/10 text-green-400'
                        : 'border-white/10 bg-white/5 text-white/40'
                      }`}>
                      {property.status}
                    </span>
                  )}
                </div>

                <h1 className="font-cormorant text-[clamp(28px,4vw,48px)] font-semibold leading-tight text-white">
                  {property.title}
                </h1>

                <div className="mt-3 flex items-center gap-2 text-white/40">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-[#C9A96E]" />
                  <span className="text-sm">{location}</span>
                </div>

                <div className="mt-4">
                  <p className="font-cormorant gold-shimmer text-4xl font-bold sm:text-5xl">
                    {formatPrice(property.price)}
                  </p>
                  {property.listing_type === 'rent' && (
                    <p className="mt-1 text-xs text-white/25">/month</p>
                  )}
                </div>
              </div>

              {/* Stats row */}
              <div className={`fade-up delay-2 grid grid-cols-3 gap-3 ${mounted ? '' : 'opacity-0'}`}>
                {[
                  { icon: Bed,    label: 'Bedrooms',  value: bedrooms  },
                  { icon: Bath,   label: 'Bathrooms', value: bathrooms },
                  { icon: Square, label: 'Sq. Ft.',   value: area ? area.toLocaleString('en-IN') : '—' },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="stat-card rounded-2xl border border-white/[0.06] bg-[#0d0d15]
                               p-4 text-center transition-all duration-200"
                  >
                    <Icon className="mx-auto mb-2 h-5 w-5 text-[#C9A96E]" />
                    <p className="font-cormorant text-2xl font-semibold text-white">{value}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-widest text-white/25">{label}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className={`fade-up delay-3 rounded-2xl border border-white/[0.06] bg-[#0d0d15] p-6 ${mounted ? '' : 'opacity-0'}`}>
                <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-[#C9A96E]">
                  About This Property
                </p>
                <h2 className="font-cormorant mb-3 text-2xl font-semibold text-white">Description</h2>
                <p className="leading-relaxed text-white/50 text-sm">
                  {property.description || 'No description available.'}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities?.length > 0 && (
                <div className={`fade-up delay-4 rounded-2xl border border-white/[0.06] bg-[#0d0d15] p-6 ${mounted ? '' : 'opacity-0'}`}>
                  <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-[#C9A96E]">
                    Features & Amenities
                  </p>
                  <h2 className="font-cormorant mb-4 text-2xl font-semibold text-white">What's Included</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((a, i) => (
                      <span
                        key={i}
                        className="rounded-xl border border-white/[0.08] bg-white/[0.03]
                                   px-3 py-1.5 text-xs text-white/50 transition-colors
                                   hover:border-[#C9A96E]/20 hover:text-[#C9A96E]"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional details */}
              {(property.furnishing || property.floor || property.total_floors || property.facing) && (
                <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d15] p-6">
                  <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-[#C9A96E]">
                    Property Details
                  </p>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {[
                      { label: 'Furnishing',    value: property.furnishing    },
                      { label: 'Floor',         value: property.floor         },
                      { label: 'Total Floors',  value: property.total_floors  },
                      { label: 'Facing',        value: property.facing        },
                      { label: 'Age',           value: property.age           },
                      { label: 'Possession',    value: property.possession    },
                    ].filter(d => d.value).map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] uppercase tracking-wider text-white/25">{label}</p>
                        <p className="mt-1 text-sm text-white/70 capitalize">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ══ RIGHT — Contact card ════════════════════ */}
            <div className="space-y-4">
              <div className="sticky top-24">

                {/* Price card */}
                <div className="rounded-2xl border border-[rgba(201,169,110,0.15)] bg-[#0d0d15] p-6">
                  <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-white/25">
                    Asking Price
                  </p>
                  <p className="font-cormorant text-3xl font-bold text-[#C9A96E]">
                    {formatPrice(property.price)}
                  </p>
                  {property.listing_type === 'rent' && (
                    <p className="text-xs text-white/25">per month</p>
                  )}

                  <div className="my-5 h-px bg-white/[0.06]" />

                  {/* Quick stats */}
                  <div className="mb-5 space-y-2.5">
                    {[
                      { label: 'Type',     value: property.property_type || '—' },
                      { label: 'Location', value: location || '—'               },
                      { label: 'Area',     value: area ? `${area.toLocaleString('en-IN')} sqft` : '—' },
                      { label: 'Status',   value: property.status || '—'        },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-xs text-white/25">{label}</span>
                        <span className="text-xs font-medium capitalize text-white/60">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA buttons */}
                  <button
                    onClick={() => setShowContact(true)}
                    className="contact-btn w-full rounded-xl py-3.5 text-[13px] font-medium
                               tracking-[0.1em] uppercase text-[#0a0a0f]"
                  >
                    Enquire Now
                  </button>

                  <a
                    href="tel:+919876543210"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl
                               border border-white/10 py-3.5 text-[13px] text-white/50
                               transition-all hover:border-[#C9A96E]/30 hover:text-[#C9A96E]"
                  >
                    <Phone className="h-4 w-4" />
                    Call Agent
                  </a>
                </div>

                {/* Trust badges */}
                <div className="mt-4 rounded-2xl border border-white/[0.06] bg-[#0d0d15] p-4">
                  {[
                    { icon: '✓', text: 'Verified Listing'        },
                    { icon: '✓', text: 'No Brokerage Hidden Fees' },
                    { icon: '✓', text: 'RERA Compliant'          },
                  ].map(({ icon, text }) => (
                    <div key={text} className="mb-2 flex items-center gap-3 last:mb-0">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full
                                       bg-[#C9A96E]/10 text-[10px] text-[#C9A96E]">
                        {icon}
                      </span>
                      <span className="text-xs text-white/30">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FULLSCREEN GALLERY ───────────────────────── */}
        {showGallery && (
          <div className="gallery-overlay fade-in">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center
                         rounded-full border border-white/10 text-white/50
                         transition-colors hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-[80vh] w-full max-w-5xl px-16">
              <Image
                src={imgSrc(images[currentImageIndex])}
                alt={property.title}
                fill
                className="object-contain"
              />

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center
                           justify-center rounded-full border border-white/10 bg-white/5
                           text-white/50 hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center
                           justify-center rounded-full border border-white/10 bg-white/5
                           text-white/50 hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-6 flex gap-2 overflow-x-auto px-6">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2
                              transition-all
                              ${i === currentImageIndex
                                ? 'border-[#C9A96E]'
                                : 'border-white/10 opacity-40 hover:opacity-70'
                              }`}
                >
                  <Image src={imgSrc(img)} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>

            <p className="absolute top-6 left-1/2 -translate-x-1/2 text-sm text-white/30">
              {currentImageIndex + 1} / {images.length}
            </p>
          </div>
        )}

        {/* ── CONTACT MODAL ────────────────────────────── */}
        {showContact && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setShowContact(false)}
          >
            <div
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d0d15] p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E]">Get In Touch</p>
                  <h3 className="font-cormorant mt-1 text-2xl font-semibold text-white">
                    Enquire About Property
                  </h3>
                </div>
                <button
                  onClick={() => setShowContact(false)}
                  className="text-white/30 transition-colors hover:text-white/70"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                {['Your Name', 'Email Address', 'Phone Number'].map((placeholder) => (
                  <input
                    key={placeholder}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04]
                               px-4 py-3 text-sm text-white placeholder-white/20
                               outline-none transition-all focus:border-[#C9A96E]/40
                               focus:bg-[#C9A96E]/5"
                  />
                ))}
                <textarea
                  placeholder="Your message..."
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04]
                             px-4 py-3 text-sm text-white placeholder-white/20
                             outline-none transition-all focus:border-[#C9A96E]/40
                             focus:bg-[#C9A96E]/5 resize-none"
                  defaultValue={`I'm interested in: ${property.title}`}
                />
                <button className="contact-btn w-full rounded-xl py-3.5 text-[13px]
                                   font-medium tracking-[0.1em] uppercase text-[#0a0a0f]">
                  Send Enquiry
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}