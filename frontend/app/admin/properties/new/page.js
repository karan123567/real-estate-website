'use client';

import { useState } from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import { propertyAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AddProperty() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'apartment',
    listingType: 'sale',
    price: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    bedrooms: '',
    bathrooms: '',
    areaSqft: '',
    yearBuilt: '',
    status: 'available',
    featured: false,
    images: [],
    amenities: [],
  });

  const [imageUrls, setImageUrls] = useState(['']);

  const amenitiesList = [
    'Swimming Pool', 'Gym', 'Parking', 'Garden', 'Security', 'Elevator',
    'Air Conditioning', 'Balcony', 'WiFi', 'Power Backup', 'Water Supply',
    'CCTV', 'Playground', 'Club House', 'Intercom', 'Maintenance Staff'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUrlChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
    
    // Update formData images (filter out empty strings)
    const validUrls = newUrls.filter(url => url.trim());
    setFormData(prev => ({ ...prev, images: validUrls }));
  };

  const addImageField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageField = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls.length === 0 ? [''] : newUrls);
    setFormData(prev => ({ ...prev, images: newUrls.filter(url => url.trim()) }));
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }

    try {
      setLoading(true);
      
      // Convert string numbers to numbers
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
        areaSqft: formData.areaSqft ? parseFloat(formData.areaSqft) : undefined,
        yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : undefined,
      };

      await propertyAPI.create(propertyData);
      toast.success('Property created successfully!');
      router.push('/admin/properties');
    } catch (error) {
      toast.error(error.message || 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add New Property">
      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d15] p-6">
          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 focus:border-[#C9A96E] focus:outline-none"
                  placeholder="e.g., Luxury 3BHK Apartment in Bandra"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 focus:border-[#C9A96E] focus:outline-none"
                  placeholder="Describe the property..."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    Property Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-[#C9A96E] focus:outline-none"
                  >
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    Listing Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="listingType"
                    value={formData.listingType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-[#C9A96E] focus:outline-none"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Price {formData.listingType === 'rent' && '(per month)'} <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">₹</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 pl-8 text-white placeholder-white/30 focus:border-[#C9A96E] focus:outline-none"
                    placeholder="Enter price"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6 border-t border-white/[0.06] pt-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Location</h3>
            
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 focus:border-[#C9A96E] focus:outline-none"
                  placeholder="Full address"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    City <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 focus:border-[#C9A96E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    State <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 focus:border-[#C9A96E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/70">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 focus:border-[#C9A96E] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="mb-6 border-t border-white/[0.06] pt-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Property Details</h3>
            
            <div className="grid gap-4 sm:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm text-white/70">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  min="0"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 focus:border-[#C9A96E] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  min="0"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 focus:border-[#C9A96E] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Area (sqft)</label>
                <input
                  type="number"
                  name="areaSqft"
                  value={formData.areaSqft}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 focus:border-[#C9A96E] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Year Built</label>
                <input
                  type="number"
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleChange}
                  min="1800"
                  max={new Date().getFullYear() + 2}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 focus:border-[#C9A96E] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="mb-6 border-t border-white/[0.06] pt-6">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Images <span className="text-red-400">*</span>
            </h3>
            
            <div className="space-y-3">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 focus:border-[#C9A96E] focus:outline-none"
                  />
                  {imageUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="rounded-lg bg-red-500/10 px-4 text-red-400 hover:bg-red-500/20"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="text-sm text-[#C9A96E] hover:underline"
              >
                + Add another image
              </button>
            </div>
            <p className="mt-2 text-xs text-white/40">
              Use Unsplash or Cloudinary URLs. First image will be the primary image.
            </p>
          </div>

          {/* Amenities */}
          <div className="mb-6 border-t border-white/[0.06] pt-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Amenities</h3>
            
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {amenitiesList.map(amenity => (
                <label
                  key={amenity}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition-colors hover:bg-white/10"
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="rounded border-white/20 bg-white/5 text-[#C9A96E] focus:ring-[#C9A96E]"
                  />
                  <span className="text-sm text-white/70">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status & Featured */}
          <div className="border-t border-white/[0.06] pt-6">
            <div className="flex items-center gap-6">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-white/20 bg-white/5 text-[#C9A96E] focus:ring-[#C9A96E]"
                />
                <span className="text-white/70">Mark as Featured</span>
              </label>

              <div className="flex items-center gap-3">
                <label className="text-white/70">Status:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-[#C9A96E] focus:outline-none"
                >
                  <option value="available">Available</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold/Rented</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-xl bg-[#C9A96E] px-6 py-3 font-semibold text-[#0d0d15] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Property'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-white/10 px-6 py-3 text-white/70 transition-colors hover:bg-white/5"
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}