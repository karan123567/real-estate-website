'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/app/components/admin/AdminLayout';
import { propertyAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';

export default function EditProperty() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading]     = useState(false);
  const [fetching, setFetching]   = useState(true);
  const [imageUrls, setImageUrls] = useState(['']);

  const [formData, setFormData] = useState({
    title: '', description: '', propertyType: 'apartment', listingType: 'sale',
    price: '', address: '', city: '', state: '', zipCode: '', country: 'India',
    bedrooms: '', bathrooms: '', areaSqft: '', yearBuilt: '',
    status: 'available', featured: false, images: [], amenities: [],
  });

  const amenitiesList = [
    'Swimming Pool','Gym','Parking','Garden','Security','Elevator',
    'Air Conditioning','Balcony','WiFi','Power Backup','Water Supply',
    'CCTV','Playground','Club House','Intercom','Maintenance Staff',
  ];

  // ── Fetch existing property ──────────────────────────────────────────────
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setFetching(true);
        const data = await propertyAPI.getById(id);
        const p = data.property || data;

        const urls = p.images?.length
          ? p.images.map((img) => (typeof img === 'string' ? img : img.url || ''))
          : [''];
        setImageUrls(urls.length ? urls : ['']);

        setFormData({
          title:        p.title                            || '',
          description:  p.description                      || '',
          propertyType: p.property_type || p.propertyType  || 'apartment',
          listingType:  p.listing_type  || p.listingType   || 'sale',
          price:        p.price         ? String(p.price)  : '',
          address:      p.address                          || '',
          city:         p.city                             || '',
          state:        p.state                            || '',
          zipCode:      p.zip_code      || p.zipCode       || '',
          country:      p.country                          || 'India',
          bedrooms:     p.bedrooms      ? String(p.bedrooms)                    : '',
          bathrooms:    p.bathrooms     ? String(p.bathrooms)                   : '',
          areaSqft:     (p.area_sqft    || p.areaSqft)  ? String(p.area_sqft || p.areaSqft) : '',
          yearBuilt:    (p.year_built   || p.yearBuilt) ? String(p.year_built || p.yearBuilt) : '',
          status:       p.status                           || 'available',
          featured:     p.featured                         || false,
          images:       urls.filter(Boolean),
          amenities:    p.amenities                        || [],
        });
      } catch {
        toast.error('Failed to load property details');
        router.push('/admin/properties');
      } finally {
        setFetching(false);
      }
    })();
  }, [id]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageUrlChange = (index, value) => {
    const next = [...imageUrls];
    next[index] = value;
    setImageUrls(next);
    setFormData((p) => ({ ...p, images: next.filter((u) => u.trim()) }));
  };

  const addImageField = () => setImageUrls((u) => [...u, '']);

  const removeImageField = (index) => {
    const next = imageUrls.filter((_, i) => i !== index);
    const safe = next.length ? next : [''];
    setImageUrls(safe);
    setFormData((p) => ({ ...p, images: safe.filter((u) => u.trim()) }));
  };

  const toggleAmenity = (amenity) =>
    setFormData((p) => ({
      ...p,
      amenities: p.amenities.includes(amenity)
        ? p.amenities.filter((a) => a !== amenity)
        : [...p.amenities, amenity],
    }));

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.price) {
      toast.error('Please fill in all required fields'); return;
    }
    if (!formData.images.length) {
      toast.error('Please add at least one image URL'); return;
    }
    try {
      setLoading(true);
      await propertyAPI.update(id, {
        ...formData,
        price:     parseFloat(formData.price),
        bedrooms:  formData.bedrooms  ? parseInt(formData.bedrooms)    : undefined,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms)   : undefined,
        areaSqft:  formData.areaSqft  ? parseFloat(formData.areaSqft) : undefined,
        yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt)   : undefined,
      });
      toast.success('Property updated successfully!');
      router.push('/admin/properties');
    } catch (err) {
      toast.error(err.message || 'Failed to update property');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = 'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 focus:border-[#C9A96E] focus:outline-none transition-colors';

  // ── Loading ───────────────────────────────────────────────────────────────
  if (fetching) {
    return (
      <AdminLayout title="Edit Property">
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4">
            <svg className="h-8 w-8 animate-spin text-[#C9A96E]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <p className="text-sm text-white/40">Loading property details...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Edit — ${formData.title || id}`}>

      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-white/40">
        <button onClick={() => router.push('/admin/properties')} className="hover:text-white/70 transition-colors">
          Properties
        </button>
        <span>/</span>
        <span className="text-white/70 max-w-xs truncate">{formData.title || 'Edit'}</span>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d15] p-6">

          {/* Basic Information */}
          <SectionHead title="Basic Information" />
          <div className="mb-6 space-y-4">
            <Field label="Title" required>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., 3BHK Plot in Greater Noida" className={inputCls} />
            </Field>

            <Field label="Description" required>
              <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} placeholder="Describe the property..." className={inputCls} />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Property Type" required>
                <select name="propertyType" value={formData.propertyType} onChange={handleChange} className={inputCls}>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="land">Land / Plot</option>
                  <option value="commercial">Commercial</option>
                  <option value="farm">Farm Land</option>
                </select>
              </Field>
              <Field label="Listing Type" required>
                <select name="listingType" value={formData.listingType} onChange={handleChange} className={inputCls}>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </Field>
            </div>

            <Field label={`Price${formData.listingType === 'rent' ? ' (per month)' : ''}`} required>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">₹</span>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="Enter price" className={`${inputCls} pl-8`} />
              </div>
            </Field>
          </div>

          {/* Location */}
          <SectionHead title="Location" />
          <div className="mb-6 space-y-4">
            <Field label="Address" required>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Full address" className={inputCls} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="City" required>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required className={inputCls} />
              </Field>
              <Field label="State" required>
                <input type="text" name="state" value={formData.state} onChange={handleChange} required className={inputCls} />
              </Field>
              <Field label="ZIP Code">
                <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className={inputCls} />
              </Field>
            </div>
          </div>

          {/* Property Details */}
          <SectionHead title="Property Details" />
          <div className="mb-6">
            <div className="grid gap-4 sm:grid-cols-4">
              <Field label="Bedrooms">
                <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} min="0" className={inputCls} />
              </Field>
              <Field label="Bathrooms">
                <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} min="0" className={inputCls} />
              </Field>
              <Field label="Area (sqft)">
                <input type="number" name="areaSqft" value={formData.areaSqft} onChange={handleChange} className={inputCls} />
              </Field>
              <Field label="Year Built">
                <input type="number" name="yearBuilt" value={formData.yearBuilt} onChange={handleChange} min="1800" max={new Date().getFullYear() + 2} className={inputCls} />
              </Field>
            </div>
          </div>

          {/* Images */}
          <SectionHead title="Images" required />
          <div className="mb-6 space-y-3">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className={`flex-1 ${inputCls}`}
                />
                {url.trim() && (
                  <img
                    src={url}
                    alt=""
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                    className="h-10 w-14 flex-shrink-0 rounded-lg object-cover border border-white/10"
                  />
                )}
                {imageUrls.length > 1 && (
                  <button type="button" onClick={() => removeImageField(index)}
                    className="flex-shrink-0 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 transition-colors">
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addImageField} className="text-sm text-[#C9A96E] hover:underline">
              + Add another image
            </button>
            <p className="text-xs text-white/30">First image will be the primary thumbnail.</p>
          </div>

          {/* Amenities */}
          <SectionHead title="Amenities" />
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {amenitiesList.map((amenity) => (
              <label key={amenity}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 transition-all ${
                  formData.amenities.includes(amenity)
                    ? 'border-[#C9A96E]/50 bg-[#C9A96E]/10 text-[#C9A96E]'
                    : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                <input type="checkbox" checked={formData.amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)}
                  className="rounded border-white/20 bg-white/5 text-[#C9A96E] focus:ring-[#C9A96E]" />
                <span className="text-sm">{amenity}</span>
              </label>
            ))}
          </div>

          {/* Status & Featured */}
          <SectionHead title="Status & Visibility" />
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex cursor-pointer items-center gap-3">
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange}
                className="h-5 w-5 rounded border-white/20 bg-white/5 text-[#C9A96E] focus:ring-[#C9A96E]" />
              <span className="text-white/70">Mark as Featured</span>
            </label>
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/70">Status:</span>
              <select name="status" value={formData.status} onChange={handleChange}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-[#C9A96E] focus:outline-none transition-colors">
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold / Rented</option>
              </select>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button type="submit" disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#C9A96E] px-6 py-3 font-semibold text-[#0d0d15] transition-opacity hover:opacity-90 disabled:opacity-50">
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Saving Changes...
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                Save Changes
              </>
            )}
          </button>
          <button type="button" onClick={() => router.push('/admin/properties')}
            className="rounded-xl border border-white/10 px-6 py-3 text-white/70 transition-colors hover:bg-white/5">
            Cancel
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}

function SectionHead({ title, required }) {
  return (
    <h3 className="mb-4 mt-6 border-t border-white/[0.06] pt-6 first:mt-0 first:border-t-0 first:pt-0 text-lg font-semibold text-white flex items-center gap-1">
      {title}{required && <span className="text-red-400">*</span>}
    </h3>
  );
}

function Field({ label, children, required }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/70">
        {label}{required && <span className="text-red-400"> *</span>}
      </label>
      {children}
    </div>
  );
}