import express from 'express';
import {
  applyAsVolunteer,
  getMyProfile,
  updateMyProfile,
  getNearbyVolunteers,
  updateLocation,
  toggleAvailability,
  getPendingVerifications,
  verifyVolunteer,
} from '../controllers/volunteerController.js';
import { protect, restrictTo } from '../../middleware/authMiddleware.js';

const router = express.Router();

// All routes require login
router.use(protect);

// Volunteer routes
router.post('/apply',            applyAsVolunteer);
router.get('/profile',           getMyProfile);
router.put('/profile',           updateMyProfile);
router.get('/nearby',            getNearbyVolunteers);
router.put('/location',          updateLocation);
router.put('/availability',      toggleAvailability);

// Admin only routes
router.get('/admin/pending',           restrictTo('admin'), getPendingVerifications);
router.put('/admin/:id/verify',        restrictTo('admin'), verifyVolunteer);

export default router;