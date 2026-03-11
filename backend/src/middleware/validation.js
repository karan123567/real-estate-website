
import { z } from 'zod'; // ✅ FIX #2: Removed invalid `minLength` and `maxLength` imports — they are not Zod exports
import sanitizeHtml from 'sanitize-html';


// =================================================================
// CONFIGURATION
// =================================================================

const isDevelopment = process.env.NODE_ENV === 'development';

// sanitization configurations
const sanitizeConfig = {
    // for plain text (names, titles, etc..)
    plainText: {
        allowedTags: [],
        allowedAttributes: {},
        disallowedTagsMode: 'discard'
    },

    // for rich text (descriptions, blog posts)
    richText: {
        allowedTags: ['p', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'a', 'h2', 'h3'],
        allowedAttributes: {
            'a': ['href', 'title', 'target']
        },
        transformTags: {
            'a': (tagName, attribs) => {
                return {
                    tagName: 'a',
                    attribs: {
                        ...attribs,
                        target: '_blank',
                        rel: 'noopener noreferrer' // ✅ FIX #3: Was 'nooperner noreferrer' — typo defeated tab-napping protection
                    }
                };
            }
        }
    },

    // For basic formatting only
    basicFormat: {
        allowedTags: ['p', 'br', 'strong', 'em'],
        allowedAttributes: {}
    }
};

// ==========================================================================
// CUSTOM ZOD VALIDATORS (Reusable)
// ==========================================================================

/**
 * Phone number validator with international support
 */

const phoneNumber = z.string().regex(
    /^\+?[\d\s\-\(\)]{7,20}$/,
    'Invalid phone number format'
)
.optional()
.or(z.literal(''))
.transform(val => val || null);

/**
 * URL validator with protocol requirement
 */

const urlString = z.string()
.url('invalid URL format')
.refine(
    (url) => url.startsWith('http://') || url.startsWith('https://'),
    'URL must start with http:// or https://'
);

/**
 * Safe string validator (Sanitized automatically)
 */

const safeString = (minLen = 1, maxLen = 255) => z.string()
.min(minLen, ` Must be at least ${minLen} characters`)
.max(maxLen, ` Must be at most ${maxLen} characters`)
.transform(val => sanitizeHtml(val, sanitizeConfig.plainText).trim());

/**
 * Name validator (letters, spaces, hyphens, apostrophes)
 */

const personName = z.string()
.min(2, 'Name must be at least 2 characters')
.max(100, 'Name too long')
.regex(
    /^[a-zA-Z\s\-']+$/,
    'Name can only contain letters, spaces, hyphens, and apostrophes'
)
.transform(val => sanitizeHtml(val, sanitizeConfig.plainText).trim());

/**
 * Future year validator (for year built, etc.)
 */

const yearValidator = z.number()
.int()
.min(1800, 'Year must be 1800 or later')
.max(new Date().getFullYear() + 2, 'Year cannot be more than 2 years in the future');

/**
 * Positive price validator with max limit
 */

const priceValidator = z.number()
.positive('Price must be positive')
.max(1000000000, 'Price exceeds maximum allowed value')
.refine(
    (price) => Number.isFinite(price),
    'Price must be a valid number'
);


/**
 * Coordinate validators
 */

const latitude = z.number()
.min(-90, 'Latitude must be between -90 and 90')
.max(90, 'Latitude must be between -90 and 90');

const longitude = z.number()
.min(-180, 'Longitude must be between -180 and 180')
.max(180, 'Longitude must be between -180 and 180');

// =============================================================================
// PROPERTY VALIDATION SCHEMA
// =============================================================================

export const propertySchema = z.object({
    //Basic information
    title: safeString(5, 255),
    description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(5000, 'Description must be at most 5000 characters')
    .transform(val => sanitizeHtml(val, sanitizeConfig.richText)),

    propertyType: z.enum(
        ['apartment', 'house', 'villa', 'condo', 'townhouse', 'land', 'commercial'],
        {errorMap:() => ({message: 'Invalid property type'})}
    ),
    listingType: z.enum(
        ['sale', 'rent'],
        { errorMap: () => ({message: 'Listing type must be "sale" or "rent"'})}
    ),
    // Pricing
    price: priceValidator,

    // Location
    address: safeString(10, 255),
    city: safeString(2, 100),
    state: safeString(2, 100),
    zipCode: z.string()
    .regex(/^[\w\s\-]{3,10}$/, 'Invalid ZIP code')
    .optional()
    .or(z.literal('')),
    country: safeString(2, 100).default('India'),

    // Coordinates (optional but validated if provided)
    latitude: latitude.optional(),
    longitude: longitude.optional(),

    // Property details
    bedrooms: z.number()
    .int('Bedrooms must be a whole number')
    .min(0, 'Bedrooms cannot be negative')
    .max(50, 'Bedrooms seems unrealistic')
    .optional(),

    bathrooms: z.number()
    .int('Bathrooms must be a whole number')
    .min(0, 'Bathrooms cannot be negative')
    .max(50,'Bathrooms seems unrealistic')
    .optional(),

    areaSqft: z.number()
    .positive('Area must be positive')
    .max(1000000, 'Area seems unrealistic')
    .optional(),

    yearBuilt: yearValidator.optional(),
  
  // Status
  status: z.enum(
    ['available', 'pending', 'sold', 'rented', 'off-market'],
    { errorMap: () => ({ message: 'Invalid status' }) }
  ).default('available'),
  
  featured: z.boolean().default(false),
  
  // Images (array of URLs)
  images: z.array(urlString)
    .min(1, 'At least 1 image is required')
    .max(20, 'Maximum 20 images allowed')
    .refine(
      (images) => new Set(images).size === images.length,
      'Duplicate image URLs are not allowed'
    ),
  
  // Amenities
  amenities: z.array(
    z.string()
      .min(2, 'Amenity name too short')
      .max(100, 'Amenity name too long')
  )
  .max(50, 'Maximum 50 amenities allowed')
  .default([])
  .transform(amenities => 
    amenities?.map(a => sanitizeHtml(a, sanitizeConfig.plainText).trim())
  ),
  
  // Optional fields
  virtualTourUrl: urlString.optional(),
  videoUrl: urlString.optional(),
  
  // Agent/Owner info (if applicable)
  agentId: z.string().uuid('Invalid agent ID').optional(),
}).refine(
  // Custom validation: If coordinates provided, both must be present
  (data) => {
    if (data.latitude && !data.longitude) return false;
    if (data.longitude && !data.latitude) return false;
    return true;
  },
  {
    message: 'Both latitude and longitude must be provided together',
    path: ['coordinates']
  }
);

// ============================================================
// INQUIRY/CONTACT FORM SCHEMA
// ============================================================

export const inquirySchema = z.object({
  name: personName,
  
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email too long')
    .toLowerCase()
    .trim(),
  
  phone: phoneNumber,
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be at most 1000 characters')
    .transform(val => sanitizeHtml(val, sanitizeConfig.basicFormat)),
  
  propertyId: z.string()
    .uuid('Invalid property ID')
    .optional(),
  
  // Optional: Preferred contact method
  preferredContact: z.enum(['email', 'phone', 'any'])
    .default('any')
    .optional(),
  
  // Optional: Best time to contact
  bestTimeToContact: z.string()
    .max(100)
    .optional(),
  
  // Honeypot field (bot detection)
  website: z.string()
    .max(0, 'Bot detected')
    .optional()
    .default(''),
  
}).refine(
  // Custom validation: If preferredContact is phone, phone must be provided
  (data) => {
    if (data.preferredContact === 'phone' && !data.phone) {
      return false;
    }
    return true;
  },
  {
    message: 'Phone number is required when phone is the preferred contact method',
    path: ['phone']
  }
);


// ============================================================
// ADMIN AUTHENTICATION SCHEMAS
// ============================================================

export const loginSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .toLowerCase()
    .trim(),
  
  password: z.string()
    .min(1, 'Password is required')
    // Don't enforce password rules on login (only on creation)
    .max(255, 'Password too long'),
  
  // Optional: Remember me
  rememberMe: z.boolean().default(false).optional(),
});

export const registerAdminSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .toLowerCase()
    .trim(),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number, and special character'
    ),
  
  confirmPassword: z.string(),
  
  name: personName,
  
  inviteCode: z.string()
    .min(8, 'Invalid invite code')
    .optional(), // Only required if your app uses invite codes
  
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  }
);

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password required'),
  
  newPassword: z.string()
    .min(8, 'New password must be at least 8 characters')
    .max(128, 'Password too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must contain uppercase, lowercase, number, and special character'
    ),
  
  confirmNewPassword: z.string(),
  
}).refine(
  (data) => data.newPassword === data.confirmNewPassword,
  {
    message: 'New passwords do not match',
    path: ['confirmNewPassword']
  }
).refine(
  (data) => data.currentPassword !== data.newPassword,
  {
    message: 'New password must be different from current password',
    path: ['newPassword']
  }
);


// ============================================================
// SEARCH/FILTER SCHEMA
// ============================================================

export const propertySearchSchema = z.object({
  query: z.string()
    .max(100, 'Search query too long')
    .optional()
    .transform(val => val ? sanitizeHtml(val, sanitizeConfig.plainText) : undefined),
  
  propertyType: z.enum(['apartment', 'house', 'villa', 'condo', 'townhouse', 'land', 'commercial'])
    .optional(),
  
  listingType: z.enum(['sale', 'rent']).optional(),
  
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  
  minBedrooms: z.coerce.number().int().min(0).optional(),
  maxBedrooms: z.coerce.number().int().min(0).optional(),
  
  minBathrooms: z.coerce.number().int().min(0).optional(),
  maxBathrooms: z.coerce.number().int().min(0).optional(),
  
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  
  // Pagination
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  
  // Sorting
  sortBy: z.enum(['price', 'date', 'bedrooms', 'area']).default('date'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  
}).refine(
  (data) => {
    if (data.minPrice && data.maxPrice) {
      return data.minPrice <= data.maxPrice;
    }
    return true;
  },
  {
    message: 'Minimum price cannot be greater than maximum price',
    path: ['minPrice']
  }
);


// ============================================================
// UPDATE SCHEMAS (Partial versions for PUT/PATCH requests)
// ============================================================

export const propertyUpdateSchema = z.object({
  // Basic information
  title: safeString(5, 255).optional(),
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(5000, 'Description must be at most 5000 characters')
    .transform(val => sanitizeHtml(val, sanitizeConfig.richText))
    .optional(),

  propertyType: z.enum(
    ['apartment', 'house', 'villa', 'condo', 'townhouse', 'land', 'commercial'],
    {errorMap:() => ({message: 'Invalid property type'})}
  ).optional(),
  
  listingType: z.enum(
    ['sale', 'rent'],
    { errorMap: () => ({message: 'Listing type must be "sale" or "rent"'})}
  ).optional(),

  // Pricing
  price: priceValidator.optional(),

  // Location
  address: safeString(10, 255).optional(),
  city: safeString(2, 100).optional(),
  state: safeString(2, 100).optional(),
  zipCode: z.string()
    .regex(/^[\w\s\-]{3,10}$/, 'Invalid ZIP code')
    .optional()
    .or(z.literal('')),
  country: safeString(2, 100).optional(),

  // Coordinates
  latitude: latitude.optional(),
  longitude: longitude.optional(),

  // Property details
  bedrooms: z.number()
    .int('Bedrooms must be a whole number')
    .min(0, 'Bedrooms cannot be negative')
    .max(50, 'Bedrooms seems unrealistic')
    .optional(),

  bathrooms: z.number()
    .int('Bathrooms must be a whole number')
    .min(0, 'Bathrooms cannot be negative')
    .max(50,'Bathrooms seems unrealistic')
    .optional(),

  areaSqft: z.number()
    .positive('Area must be positive')
    .max(1000000, 'Area seems unrealistic')
    .optional(),

  yearBuilt: yearValidator.optional(),

  // Status
  status: z.enum(
    ['available', 'pending', 'sold', 'rented', 'off-market'],
    { errorMap: () => ({ message: 'Invalid status' }) }
  ).optional(),

  featured: z.boolean().optional(),

  // Images
  images: z.array(urlString)
    .min(1, 'At least 1 image is required')
    .max(20, 'Maximum 20 images allowed')
    .refine(
      (images) => new Set(images).size === images.length,
      'Duplicate image URLs are not allowed'
    )
    .optional(),

  // ✅ FIX #1 (THE CRASH): Use optional chaining `?.map()` instead of a ternary.
  // When `amenities` is absent from the request body, Zod passes `undefined` to
  // the transform callback — the ternary guard was unreliable across Zod v3 versions.
  // Optional chaining is atomic and guaranteed safe.
  amenities: z.array(
    z.string()
      .min(2, 'Amenity name too short')
      .max(100, 'Amenity name too long')
  )
  .max(50, 'Maximum 50 amenities allowed')
  .optional()
  .transform(amenities => amenities?.map(a => sanitizeHtml(a, sanitizeConfig.plainText).trim())),

  // Optional fields
  virtualTourUrl: urlString.optional(),
  videoUrl: urlString.optional(),
  agentId: z.string().uuid('Invalid agent ID').optional(),
});

// inquiryUpdateSchema - manually created to be safe with Zod v4
export const inquiryUpdateSchema = z.object({
  name: personName.optional(),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email too long')
    .toLowerCase()
    .trim()
    .optional(),
  phone: phoneNumber.optional(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be at most 1000 characters')
    .transform(val => sanitizeHtml(val, sanitizeConfig.basicFormat))
    .optional(),
  propertyId: z.string().uuid('Invalid property ID').optional(),
  preferredContact: z.enum(['email', 'phone', 'any']).optional(),
  bestTimeToContact: z.string().max(100).optional(),
  website: z.string().max(0, 'Bot detected').optional().default(''),
});

// ============================================================
// VALIDATION MIDDLEWARE FACTORY
// ============================================================

/**
 * Creates a validation middleware for the given schema
 * 
 * @param {ZodSchema} schema - Zod validation schema
 * @param {Object} options - Validation options
 * @returns {Function} Express middleware
 */
export const validate = (schema, options = {}) => {
  // ✅ FIX #4 & #5: Removed `abortEarly` and `stripUnknown` — both were accepted
  // but never actually applied to Zod (Zod reports all errors by default and
  // strips unknown keys by default). Keeping dead options causes confusion.
  const {
    source = 'body',  // 'body', 'query', 'params'
  } = options;
  
  return async (req, res, next) => {
    try {
      // Get data from specified source
      const dataToValidate = req[source];
      
      // Parse and validate (Zod strips unknown keys and returns all errors by default)
      const validated = await schema.parseAsync(dataToValidate);
      
      // Replace original data with validated & sanitized data
      req[source] = validated;
      
      // Log validation in development
      if (isDevelopment) {
        console.log(`✅ Validation passed for ${req.method} ${req.path}`);
      }
      
      next();
      
    } catch (error) {
      // Zod validation error
      if (error.name === 'ZodError') {
  const issues = error.issues ?? error.errors ?? [];  // v4 uses .issues, v3 uses .errors
  const formattedErrors = issues.map(err => ({
    field: err.path.join('.'),
    message: err.message,
    code: err.code,
    ...(isDevelopment && { received: err.received })
  }));
        
        return res.status(400).json({
          error: 'Validation failed',
          message: 'The provided data is invalid',
          details: formattedErrors,
          ...(isDevelopment && { 
            timestamp: new Date().toISOString(),
            path: req.path 
          })
        });
      }
      
      // Other errors
      console.error('❌ Validation error:', error);
      return res.status(500).json({
        error: 'Validation error',
        message: 'An error occurred during validation',
        ...(isDevelopment && { details: error.message })
      });
    }
  };
};


// ============================================================
// SANITIZATION HELPERS
// ============================================================

/**
 * Sanitize a single string
 */
export const sanitizeString = (str, type = 'plain') => {
  const config = {
    plain: sanitizeConfig.plainText,
    rich: sanitizeConfig.richText,
    basic: sanitizeConfig.basicFormat
  }[type] || sanitizeConfig.plainText;
  
  return sanitizeHtml(str, config).trim();
};

/**
 * Sanitize all string fields in an object
 */
export const sanitizeObject = (obj, type = 'plain') => {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value, type);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitizeString(item, type) : item
      );
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value, type);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};


// ============================================================
// PRE-CONFIGURED MIDDLEWARE EXPORTS
// ============================================================

// Property validation
export const validateProperty = validate(propertySchema);
export const validatePropertyUpdate = validate(propertyUpdateSchema);

// Inquiry validation
export const validateInquiry = validate(inquirySchema);

// Authentication validation
export const validateLogin = validate(loginSchema);
export const validateRegister = validate(registerAdminSchema);
export const validateChangePassword = validate(changePasswordSchema);

// Search validation
export const validateSearch = validate(propertySearchSchema, { source: 'query' });

// ID validation (for route parameters)
export const validateId = validate(
  z.object({ id: z.string().uuid('Invalid ID format') }),
  { source: 'params' }
);


// ============================================================
// VALIDATION ERROR FORMATTER (for consistent error responses)
// ============================================================

export const formatValidationError = (zodError) => {
  return {
    error: 'Validation failed',
    message: 'The provided data is invalid',
    details: zodError.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message,
      type: err.code
    })),
    timestamp: new Date().toISOString()
  };
};


// ============================================================
// EXPORTS
// ============================================================

export default {
  // Schemas
  propertySchema,
  inquirySchema,
  loginSchema,
  registerAdminSchema,
  changePasswordSchema,
  propertySearchSchema,
  propertyUpdateSchema,
  inquiryUpdateSchema,
  
  // Middleware
  validate,
  validateProperty,
  validatePropertyUpdate,
  validateInquiry,
  validateLogin,
  validateRegister,
  validateChangePassword,
  validateSearch,
  validateId,
  
  // Helpers
  sanitizeString,
  sanitizeObject,
  formatValidationError
};