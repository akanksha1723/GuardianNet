import express from 'express';
import {
  getUserStats,
  getVolunteerStats,
  getAdminStats,
  getRecentActivity,
} from '../controllers/dashboardController.js';
import { protect, restrictTo } from '../../middleware/authMiddleware.js';

const router = express.Router();

// All dashboard routes require login
router.use(protect);

router.get('/user/stats',       restrictTo('user', 'admin'),      getUserStats);
router.get('/volunteer/stats',  restrictTo('volunteer', 'admin'), getVolunteerStats);
router.get('/admin/stats',      restrictTo('admin'),              getAdminStats);
router.get('/recent-activity',                                    getRecentActivity);

export default router;