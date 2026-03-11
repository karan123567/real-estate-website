import { Router } from 'express';
const router = Router();
import { getAllProperties, getFeaturedProperties, getPropertyById, getSimilarProperties, createProperty, updateProperty, deleteProperty, uploadImages, deleteImage } from '../controllers/propertyController.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { validateProperty, validatePropertyUpdate } from '../middleware/validation.js';
import { uploadLimiter } from '../middleware/rateLimiter.js';
import multer, { memoryStorage } from 'multer';

const upload = multer({
  storage: memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 20 }, // 5MB, 20 files max
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files allowed'));
    }
    cb(null, true);
  }
});

// ─── Public Routes (no authentication) ───────────────────
/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Get all properties with pagination and filters
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: propertyType
 *         schema:
 *           type: string
 *       - in: query
 *         name: bedrooms
 *         schema:
 *           type: integer
 */
router.get('/', getAllProperties);
router.get('/featured', getFeaturedProperties);
router.get('/:id', getPropertyById);
router.get('/:id/similar', getSimilarProperties);

// ─── Admin Routes (authentication required) ───────────────
router.post('/',
  authenticateAdmin,
  validateProperty,
  createProperty
);

router.put('/:id',
  authenticateAdmin,
  validatePropertyUpdate,  // ← allows partial updates
  updateProperty
);

router.delete('/:id',
  authenticateAdmin,
  deleteProperty
);

// Image upload endpoint
router.post('/upload/images',
  authenticateAdmin,
  uploadLimiter,
  upload.array('images', 20),
  uploadImages
);

// Delete image endpoint
router.delete('/images/:publicId',
  authenticateAdmin,
  deleteImage
);

export default router;