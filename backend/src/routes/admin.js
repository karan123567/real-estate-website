import { Router } from 'express';
const router = Router();
import { login, logout, getMe, getDashboard, getInquiries, updateInquiryStatus, getAnalytics } from '../controllers/adminController.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { validateLogin } from '../middleware/validation.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: Admin@123456
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginLimiter, validateLogin, login);

// Protected routes (require JWT)
router.post('/logout', authenticateAdmin, logout);
router.get('/me', authenticateAdmin, getMe);
router.get('/dashboard', authenticateAdmin, getDashboard);
router.get('/inquiries', authenticateAdmin, getInquiries);
router.put('/inquiries/:id/status', authenticateAdmin, updateInquiryStatus);
router.get('/analytics', authenticateAdmin, getAnalytics);

export default router;