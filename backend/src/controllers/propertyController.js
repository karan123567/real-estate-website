
import db from '../models/db.js';
const { query, pool } = db;
import { uploadToCloudinary, deletePropertyImage } from '../utils/imageUpload.js';

// ============================================================
// GET /api/properties - List with pagination and filters
// Returns: ALWAYS { properties: [], pagination: {...} }
// ============================================================
const getAllProperties = async (req, res, next) => {
  try {
    // ─── 1. Parse and Validate Pagination Parameters ─────────
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 12)); // Min 1, Max 50
    const offset = (page - 1) * limit;

    // ─── 2. Build WHERE Clause with BASE Condition ───────────
    // ALWAYS includes base condition, never empty WHERE clause
    const conditions = ['p.status = $1'];
    const params = ['available'];
    let paramIndex = 2;

    // ─── 3. Add Filters SAFELY ───────────────────────────────
    
    // City filter (string, partial match)
    if (req.query.city && typeof req.query.city === 'string' && req.query.city.trim()) {
      conditions.push(`LOWER(p.city) LIKE LOWER($${paramIndex})`);
      params.push(`%${req.query.city.trim()}%`);
      paramIndex++;
    }

    // Property Type filter (enum)
    if (req.query.propertyType && typeof req.query.propertyType === 'string' && req.query.propertyType.trim()) {
      const validTypes = ['apartment', 'house', 'villa', 'land', 'commercial'];
      const type = req.query.propertyType.trim().toLowerCase();
      if (validTypes.includes(type)) {
        conditions.push(`p.property_type = $${paramIndex}`);
        params.push(type);
        paramIndex++;
      }
    }

    // Listing Type filter (sale/rent)
    if (req.query.listingType && typeof req.query.listingType === 'string' && req.query.listingType.trim()) {
      const validListingTypes = ['sale', 'rent'];
      const listingType = req.query.listingType.trim().toLowerCase();
      if (validListingTypes.includes(listingType)) {
        conditions.push(`p.listing_type = $${paramIndex}`);
        params.push(listingType);
        paramIndex++;
      }
    }

    // State filter
    if (req.query.state && typeof req.query.state === 'string' && req.query.state.trim()) {
      conditions.push(`LOWER(p.state) = LOWER($${paramIndex})`);
      params.push(req.query.state.trim());
      paramIndex++;
    }

    // Min Price filter - 0 IS VALID! Don't use truthy check
    if (req.query.minPrice !== undefined && req.query.minPrice !== null && req.query.minPrice !== '') {
      const minPrice = parseFloat(req.query.minPrice);
      if (!isNaN(minPrice) && minPrice >= 0) {
        conditions.push(`p.price >= $${paramIndex}`);
        params.push(minPrice);
        paramIndex++;
      }
    }

    // Max Price filter - 0 IS VALID!
    if (req.query.maxPrice !== undefined && req.query.maxPrice !== null && req.query.maxPrice !== '') {
      const maxPrice = parseFloat(req.query.maxPrice);
      if (!isNaN(maxPrice) && maxPrice >= 0) {
        conditions.push(`p.price <= $${paramIndex}`);
        params.push(maxPrice);
        paramIndex++;
      }
    }

    // Bedrooms filter - 0 IS VALID (studio apartments)!
    if (req.query.bedrooms !== undefined && req.query.bedrooms !== null && req.query.bedrooms !== '') {
      const bedrooms = parseInt(req.query.bedrooms);
      if (!isNaN(bedrooms) && bedrooms >= 0 && bedrooms <= 50) {
        conditions.push(`p.bedrooms = $${paramIndex}`);
        params.push(bedrooms);
        paramIndex++;
      }
    }

    // Bathrooms filter - 0 IS VALID!
    if (req.query.bathrooms !== undefined && req.query.bathrooms !== null && req.query.bathrooms !== '') {
      const bathrooms = parseInt(req.query.bathrooms);
      if (!isNaN(bathrooms) && bathrooms >= 0 && bathrooms <= 50) {
        conditions.push(`p.bathrooms = $${paramIndex}`);
        params.push(bathrooms);
        paramIndex++;
      }
    }

    // Min Area filter
    if (req.query.minArea !== undefined && req.query.minArea !== null && req.query.minArea !== '') {
      const minArea = parseFloat(req.query.minArea);
      if (!isNaN(minArea) && minArea >= 0) {
        conditions.push(`p.area_sqft >= $${paramIndex}`);
        params.push(minArea);
        paramIndex++;
      }
    }

    // Max Area filter
    if (req.query.maxArea !== undefined && req.query.maxArea !== null && req.query.maxArea !== '') {
      const maxArea = parseFloat(req.query.maxArea);
      if (!isNaN(maxArea) && maxArea >= 0) {
        conditions.push(`p.area_sqft <= $${paramIndex}`);
        params.push(maxArea);
        paramIndex++;
      }
    }

    // ─── 4. Build Final WHERE Clause ─────────────────────────
    // ALWAYS has at least base condition
    const whereClause = conditions.join(' AND ');

    // ─── 5. Determine Sort Order ─────────────────────────────
    let sortBy;
    switch (req.query.sortBy) {
      case 'price_asc':
        sortBy = 'p.price ASC, p.created_at DESC';
        break;
      case 'price_desc':
        sortBy = 'p.price DESC, p.created_at DESC';
        break;
      case 'newest':
        sortBy = 'p.created_at DESC';
        break;
      case 'oldest':
        sortBy = 'p.created_at ASC';
        break;
      default:
        sortBy = 'p.featured DESC, p.created_at DESC'; // Featured first, then newest
    }

    // ─── 6. Get Total Count (ALWAYS runs) ────────────────────
    const countQuery = `
      SELECT COUNT(*) as count
      FROM properties p
      WHERE ${whereClause}
    `;
    
    const countResult = await query(countQuery, params);
    const total = parseInt(countResult.rows[0]?.count) || 0;  // Default to 0 if undefined
    const totalPages = total > 0 ? Math.ceil(total / limit) : 0;

    // ─── 7. Get Properties (ALWAYS runs) ─────────────────────
    const dataQuery = `
      SELECT 
        p.id,
        p.title,
        p.description,
        p.property_type,
        p.listing_type,
        p.price,
        p.address,
        p.city,
        p.state,
        p.country,
        p.zip_code,
        p.latitude,
        p.longitude,
        p.bedrooms,
        p.bathrooms,
        p.area_sqft,
        p.year_built,
        p.status,
        p.featured,
        p.view_count,
        p.published_at,
        p.created_at,
        COALESCE(
          json_agg(
            json_build_object(
              'url', pi.image_url,
              'isPrimary', pi.is_primary,
              'displayOrder', pi.display_order
            ) ORDER BY pi.display_order
          ) FILTER (WHERE pi.id IS NOT NULL),
          '[]'
        ) as images
      FROM properties p
      LEFT JOIN property_images pi ON p.id = pi.property_id
      WHERE ${whereClause}
      GROUP BY p.id
      ORDER BY ${sortBy}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    const dataResult = await query(dataQuery, [...params, limit, offset]);

    // ─── 8. ALWAYS Return Consistent Shape ───────────────────
    res.json({
      properties: dataResult.rows || [],  // ALWAYS array, never null/undefined
      pagination: {                        // ALWAYS present
        currentPage: page,
        totalPages: totalPages,
        totalProperties: total,
        propertiesPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
      // Optional: Include applied filters for debugging/display
      appliedFilters: {
        city: req.query.city || null,
        propertyType: req.query.propertyType || null,
        listingType: req.query.listingType || null,
        minPrice: req.query.minPrice || null,
        maxPrice: req.query.maxPrice || null,
        bedrooms: req.query.bedrooms || null,
        sortBy: req.query.sortBy || 'default'
      }
    });

  } catch (error) {
    console.error('getAllProperties error:', error);
    next(error);
  }
};


// ============================================================
// GET /api/properties/featured - Get featured properties
// Returns: ALWAYS { properties: [], pagination: {...} }
// ============================================================
const getFeaturedProperties = async (req, res, next) => {
  try {
    const limit = Math.min(20, Math.max(1, parseInt(req.query.limit) || 4));

    const { rows } = await query(
      `SELECT 
        p.id,
        p.title,
        p.description,
        p.property_type,
        p.listing_type,
        p.price,
        p.city,
        p.state,
        p.bedrooms,
        p.bathrooms,
        p.area_sqft,
        p.featured,
        p.created_at,
        COALESCE(
          json_agg(
            json_build_object(
              'url', pi.image_url,
              'isPrimary', pi.is_primary
            ) ORDER BY pi.display_order
          ) FILTER (WHERE pi.id IS NOT NULL),
          '[]'
        ) as images
      FROM properties p
      LEFT JOIN property_images pi ON p.id = pi.property_id
      WHERE p.featured = true AND p.status = 'available'
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT $1`,
      [limit]
    );

    // ✅ Consistent shape with pagination object
    res.json({ 
      properties: rows || [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalProperties: rows.length,
        propertiesPerPage: rows.length,
        hasNextPage: false,
        hasPreviousPage: false,
      }
    });

  } catch (error) {
    console.error('getFeaturedProperties error:', error);
    next(error);
  }
};


// ============================================================
// GET /api/properties/:id - Get single property by ID
// Returns: { property: {...} } or 404
// ============================================================
const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate UUID format (prevent SQL injection via invalid UUIDs)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ 
        error: 'Invalid property ID format' 
      });
    }

    const { rows } = await query(
      `SELECT 
        p.*,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'url', pi.image_url, 
              'isPrimary', pi.is_primary,
              'displayOrder', pi.display_order
            ) ORDER BY pi.display_order
          ) FILTER (WHERE pi.id IS NOT NULL),
          '[]'
        ) as images,
        COALESCE(
          array_agg(DISTINCT a.name) FILTER (WHERE a.id IS NOT NULL),
          '{}'
        ) as amenities
      FROM properties p
      LEFT JOIN property_images pi ON p.id = pi.property_id
      LEFT JOIN property_amenities pa ON p.id = pa.property_id
      LEFT JOIN amenities a ON pa.amenity_id = a.id
      WHERE p.id = $1
      GROUP BY p.id`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ 
        error: 'Property not found',
        propertyId: id 
      });
    }

    // Increment view counter (fire and forget, don't wait)
    query(
      'UPDATE properties SET views_count = views_count + 1 WHERE id = $1',
      [id]
    ).catch(err => console.error('View count update failed:', err));

    res.json({ property: rows[0] });

  } catch (error) {
    console.error('getPropertyById error:', error);
    next(error);
  }
};


// ============================================================
// GET /api/properties/:id/similar - Get similar properties
// Returns: ALWAYS { properties: [], pagination: {...} }
// ============================================================
const getSimilarProperties = async (req, res, next) => {
  try {
    const { id } = req.params;
    const limit = Math.min(10, Math.max(1, parseInt(req.query.limit) || 4));

    // Validate UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ error: 'Invalid property ID format' });
    }

    // Get current property details
    const currentProperty = await db.query(
      'SELECT city, property_type, price, listing_type FROM properties WHERE id = $1',
      [id]
    );

    if (currentProperty.rows.length === 0) {
      return res.status(404).json({ 
        error: 'Property not found',
        properties: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalProperties: 0,
          propertiesPerPage: limit,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      });
    }

    const { city, property_type, price, listing_type } = currentProperty.rows[0];
    const priceRange = parseFloat(price) * 0.3; // ±30% price range
    const minPrice = Math.max(0, parseFloat(price) - priceRange);
    const maxPrice = parseFloat(price) + priceRange;

    // Find similar properties (prioritize: same city > same type > similar price)
    const { rows } = await db.query(
      `SELECT 
        p.*,
        COALESCE(
          json_agg(pi.image_url ORDER BY pi.display_order) 
          FILTER (WHERE pi.id IS NOT NULL),
          '[]'
        ) as images,
        -- Calculate similarity score
        (
          CASE WHEN p.city = $2 THEN 3 ELSE 0 END +
          CASE WHEN p.property_type = $3 THEN 2 ELSE 0 END +
          CASE WHEN p.listing_type = $6 THEN 1 ELSE 0 END +
          CASE WHEN p.price BETWEEN $4 AND $5 THEN 1 ELSE 0 END
        ) as similarity_score
      FROM properties p
      LEFT JOIN property_images pi ON p.id = pi.property_id
      WHERE p.id != $1
        AND p.status = 'available'
        AND (
          p.city = $2 
          OR p.property_type = $3 
          OR p.price BETWEEN $4 AND $5
          OR p.listing_type = $6
        )
      GROUP BY p.id
      ORDER BY similarity_score DESC, RANDOM()
      LIMIT $7`,
      [id, city, property_type, minPrice, maxPrice, listing_type, limit]
    );

    res.json({ 
      properties: rows || [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalProperties: rows.length,
        propertiesPerPage: rows.length,
        hasNextPage: false,
        hasPreviousPage: false,
      }
    });

  } catch (error) {
    console.error('getSimilarProperties error:', error);
    next(error);
  }
};


// ============================================================
// POST /api/properties (ADMIN ONLY) - Create new property
// ============================================================
const createProperty = async (req, res, next) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Start transaction

    const {
      title, description, propertyType, listingType, price,
      address, city, state, zipCode, country,
      latitude, longitude, bedrooms, bathrooms,
      areaSqft, yearBuilt, status, featured,
      images, amenities
    } = req.body;

    // Insert property
    const { rows } = await client.query(
      `INSERT INTO properties (
        title, description, property_type, listing_type, price,
        address, city, state, zip_code, country,
        latitude, longitude, bedrooms, bathrooms,
        area_sqft, year_built, status, featured,
        owner_id, published_at
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,NOW())
      RETURNING *`,
      [
        title, description, propertyType, listingType, price,
        address, city, state, zipCode, country || 'USA',
        latitude, longitude, bedrooms, bathrooms,
        areaSqft, yearBuilt, status || 'available', featured || false,
        req.user.id
      ]
    );

    const property = rows[0];

    // Insert images
    if (images && Array.isArray(images) && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const imageUrl = typeof images[i] === 'string' ? images[i] : images[i].url;
        const publicId = images[i].publicId || null;
        
        await client.query(
          `INSERT INTO property_images (property_id, image_url, cloudinary_public_id, display_order, is_primary)
           VALUES ($1, $2, $3, $4, $5)`,
          [property.id, imageUrl, publicId, i, i === 0]
        );
      }
    }

    // Insert amenities
    if (amenities && Array.isArray(amenities) && amenities.length > 0) {
      for (const amenityName of amenities) {
        const amenityResult = await client.query(
          'SELECT id FROM amenities WHERE LOWER(name) = LOWER($1)',
          [amenityName]
        );
        
        if (amenityResult.rows.length > 0) {
          await client.query(
            'INSERT INTO property_amenities (property_id, amenity_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [property.id, amenityResult.rows[0].id]
          );
        }
      }
    }

    await client.query('COMMIT'); // Commit transaction

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      property: {
        ...property,
        images: images || [],
        amenities: amenities || []
      }
    });

  } catch (error) {
    await client.query('ROLLBACK'); // Rollback on error
    console.error('createProperty error:', error);
    next(error);
  } finally {
    client.release(); // Always release connection
  }
};


// ============================================================
// PUT /api/properties/:id (ADMIN ONLY) - Update property
// ============================================================
const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ error: 'Invalid property ID format' });
    }

    // Check property exists
    const existing = await query('SELECT id FROM properties WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Update property
    const { rows } = await query(
      `UPDATE properties SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        property_type = COALESCE($3, property_type),
        listing_type = COALESCE($4, listing_type),
        price = COALESCE($5, price),
        address = COALESCE($6, address),
        city = COALESCE($7, city),
        state = COALESCE($8, state),
        zip_code = COALESCE($9, zip_code),
        bedrooms = COALESCE($10, bedrooms),
        bathrooms = COALESCE($11, bathrooms),
        area_sqft = COALESCE($12, area_sqft),
        year_built = COALESCE($13, year_built),
        status = COALESCE($14, status),
        featured = COALESCE($15, featured),
        updated_at = NOW()
      WHERE id = $16
      RETURNING *`,
      [
        updates.title, updates.description, updates.propertyType, updates.listingType,
        updates.price, updates.address, updates.city, updates.state, updates.zipCode,
        updates.bedrooms, updates.bathrooms, updates.areaSqft, updates.yearBuilt,
        updates.status, updates.featured, id
      ]
    );

    res.json({ 
      success: true,
      message: 'Property updated successfully',
      property: rows[0] 
    });

  } catch (error) {
    console.error('updateProperty error:', error);
    next(error);
  }
};


// ============================================================
// DELETE /api/properties/:id (ADMIN ONLY) - Delete property
// ============================================================
const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ error: 'Invalid property ID format' });
    }

    // Get images to delete from Cloudinary
    const imagesResult = await query(
      'SELECT cloudinary_public_id FROM property_images WHERE property_id = $1 AND cloudinary_public_id IS NOT NULL',
      [id]
    );

    // Delete images from Cloudinary (don't wait, fire and forget)
    if (imagesResult.rows.length > 0) {
      Promise.all(
        imagesResult.rows.map(img => deletePropertyImage(img.cloudinary_public_id))
      ).catch(err => console.error('Cloudinary deletion failed:', err));
    }

    // Delete property (CASCADE will delete related records)
    const { rows } = await query(
      'DELETE FROM properties WHERE id = $1 RETURNING id, title',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json({ 
      success: true,
      message: `Property "${rows[0].title}" deleted successfully`,
      deletedId: rows[0].id
    });

  } catch (error) {
    console.error('deleteProperty error:', error);
    next(error);
  }
};


// ============================================================
// POST /api/properties/upload/images (ADMIN ONLY) - Upload images
// ============================================================
const uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        error: 'No images provided',
        message: 'Please select at least one image to upload'
      });
    }

    // Upload all images to Cloudinary in parallel
    const uploadPromises = req.files.map(file =>
      uploadToCloudinary(file.buffer)
    );

    const results = await Promise.all(uploadPromises);

    res.json({ 
      success: true,
      message: `${results.length} image(s) uploaded successfully`,
      images: results
    });

  } catch (error) {
    console.error('uploadImages error:', error);
    next(error);
  }
};


// ============================================================
// DELETE /api/properties/images/:publicId (ADMIN ONLY) - Delete image
// ============================================================
const deleteImage = async (req, res, next) => {
  try {
    const { publicId } = req.params;
    const decodedPublicId = decodeURIComponent(publicId);

    // Delete from Cloudinary
    await deletePropertyImage(decodedPublicId);

    // Delete from database
    const { rows } = await query(
      'DELETE FROM property_images WHERE cloudinary_public_id = $1 RETURNING id',
      [decodedPublicId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ 
        error: 'Image not found in database',
        message: 'Image may have already been deleted'
      });
    }

    res.json({ 
      success: true,
      message: 'Image deleted successfully'
    });

  } catch (error) {
    console.error('deleteImage error:', error);
    next(error);
  }
};


// ============================================================
// EXPORTS
// ============================================================
export {
  getAllProperties,
  getFeaturedProperties,
  getPropertyById,
  getSimilarProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  uploadImages,
  deleteImage
};