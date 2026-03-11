import { Router } from 'express';
const router = Router();
import { 
  submitInquiry,
  getAllInquiries,
  getInquiryById,
  deleteInquiry,
  getInquiryStats
} from '../controllers/inquiryController.js';
import { validateInquiry } from '../middleware/validation.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { contactFormLimiter } from '../middleware/rateLimiter.js';

// ─── Public Routes ────────────────────────────────────────
router.post('/', contactFormLimiter, validateInquiry, submitInquiry);

// ─── Admin Routes ─────────────────────────────────────────
router.get('/',        authenticateAdmin, getAllInquiries);   // GET /api/inquiries?status=new&page=1
router.get('/stats',   authenticateAdmin, getInquiryStats);  // GET /api/inquiries/stats?days=30
router.get('/:id',     authenticateAdmin, getInquiryById);   // GET /api/inquiries/:id
router.delete('/:id',  authenticateAdmin, deleteInquiry);    // DELETE /api/inquiries/:id

export default router;