import express from 'express';
import {
  createEmergency,
  getActiveEmergency,
  cancelEmergency,
  acceptEmergency,
  completeEmergency,
  escalateEmergency,
  getEmergencyHistory,
  rateEmergency,
  getEmergencyContacts,
  saveEmergencyContacts,
  getAllEmergencies,
} from '../controllers/emergencyController.js';
import { protect, restrictTo } from '../../middleware/authMiddleware.js';

const router = express.Router();

// All routes require login
router.use(protect);

// User routes
router.post('/sos',              createEmergency);
router.get('/active',            getActiveEmergency);
router.put('/:id/cancel',        cancelEmergency);
router.put('/:id/escalate',      escalateEmergency);
router.put('/:id/rate',          rateEmergency);
router.get('/history',           getEmergencyHistory);
router.get('/contacts',          getEmergencyContacts);
router.post('/contacts',         saveEmergencyContacts);

// Volunteer routes
router.put('/:id/accept',        restrictTo('volunteer', 'admin'), acceptEmergency);
router.put('/:id/complete',      restrictTo('volunteer', 'admin'), completeEmergency);

// Admin routes
router.get('/admin/all',         restrictTo('admin'), getAllEmergencies);

export default router;