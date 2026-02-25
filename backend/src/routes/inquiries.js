import { Router } from 'express';
const router = Router();
import { submitInquiry } from '../controllers/inquiryController';
import { validateInquiry } from '../middleware/validation';
import { contactFormLimiter } from '../middleware/rateLimiter';

// Public route - submit inquiry (with strict rate limiting)
router.post('/', contactFormLimiter, validateInquiry, submitInquiry);

export default router;
