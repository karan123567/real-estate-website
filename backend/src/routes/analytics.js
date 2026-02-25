import { Router } from 'express';
const router = Router();
import { trackEvent, startSession, endSession, getOverview, getVisitors, getPropertyAnalytics } from '../controllers/analyticsController';
import { authenticateAdmin } from '../middleware/auth';

// Public - track events (called from frontend)
router.post('/track', trackEvent);
router.post('/session/start', startSession);
router.post('/session/end', endSession);

// Admin - view analytics
router.get('/overview', authenticateAdmin, getOverview);
router.get('/visitors', authenticateAdmin, getVisitors);
router.get('/properties/:id', authenticateAdmin, getPropertyAnalytics);

export default router;