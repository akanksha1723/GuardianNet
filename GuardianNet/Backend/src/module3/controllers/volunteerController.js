import User from '../../module1/models/User.js';
import VolunteerProfile from '../models/VolunteerProfile.js';

// ─────────────────────────────────────────────
// POST /api/volunteers/apply
// Volunteer submits verification application
// ─────────────────────────────────────────────
export const applyAsVolunteer = async (req, res) => {
  try {
    const { governmentIdType, governmentIdNumber, bio, skills, languages, availableCategories } = req.body;

    if (!governmentIdType || !governmentIdNumber) {
      return res.status(400).json({
        success: false,
        message: 'Government ID type and number are required.',
      });
    }

    // Check if already applied
    const existing = await VolunteerProfile.findOne({ user: req.user._id });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a verification application.',
      });
    }

    // Create volunteer profile
    const profile = await VolunteerProfile.create({
      user: req.user._id,
      governmentIdType,
      governmentIdNumber,
      bio: bio || '',
      skills: skills || [],
      languages: languages || ['English'],
      availableCategories: availableCategories || ['general'],
      verificationStatus: 'pending',
    });

    // Update user role to volunteer
    await User.findByIdAndUpdate(req.user._id, { role: 'volunteer' });

    res.status(201).json({
      success: true,
      message: 'Verification application submitted successfully. Admin will review within 24-48 hours.',
      data: profile,
    });
  } catch (error) {
    console.error('Apply volunteer error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// GET /api/volunteers/profile
// Get own volunteer profile
// ─────────────────────────────────────────────
export const getMyProfile = async (req, res) => {
  try {
    const profile = await VolunteerProfile.findOne({ user: req.user._id })
      .populate('user', 'name email phone profilePhoto');

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer profile not found. Please apply first.',
      });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// PUT /api/volunteers/profile
// Update volunteer profile
// ─────────────────────────────────────────────
export const updateMyProfile = async (req, res) => {
  try {
    const { bio, skills, languages, availableCategories, isAvailable } = req.body;

    const profile = await VolunteerProfile.findOneAndUpdate(
      { user: req.user._id },
      { bio, skills, languages, availableCategories, isAvailable },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer profile not found.',
      });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// GET /api/volunteers/nearby
// Find verified volunteers near a location
// ─────────────────────────────────────────────
export const getNearbyVolunteers = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 5000 } = req.query;

    if (!longitude || !latitude) {
      return res.status(400).json({
        success: false,
        message: 'longitude and latitude are required query parameters.',
      });
    }

    const volunteers = await VolunteerProfile.find({
      verificationStatus: 'approved',
      isAvailable: true,
      currentLocation: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(maxDistance),
        },
      },
    })
      .populate('user', 'name profilePhoto')
      .limit(20);

    res.status(200).json({
      success: true,
      count: volunteers.length,
      data: volunteers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// PUT /api/volunteers/location
// Update volunteer's current location
// ─────────────────────────────────────────────
export const updateLocation = async (req, res) => {
  try {
    const { longitude, latitude } = req.body;

    if (!longitude || !latitude) {
      return res.status(400).json({
        success: false,
        message: 'longitude and latitude are required.',
      });
    }

    await VolunteerProfile.findOneAndUpdate(
      { user: req.user._id },
      {
        currentLocation: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
      }
    );

    res.status(200).json({
      success: true,
      message: 'Location updated successfully.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// PUT /api/volunteers/availability
// Toggle volunteer availability
// ─────────────────────────────────────────────
export const toggleAvailability = async (req, res) => {
  try {
    const profile = await VolunteerProfile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer profile not found.',
      });
    }

    profile.isAvailable = !profile.isAvailable;
    await profile.save();

    res.status(200).json({
      success: true,
      message: `You are now ${profile.isAvailable ? 'available' : 'unavailable'}.`,
      data: { isAvailable: profile.isAvailable },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// ADMIN: GET /api/volunteers/admin/pending
// Get all pending verification applications
// ─────────────────────────────────────────────
export const getPendingVerifications = async (req, res) => {
  try {
    const pending = await VolunteerProfile.find({
      verificationStatus: { $in: ['pending', 'under_review'] },
    }).populate('user', 'name email phone createdAt');

    res.status(200).json({
      success: true,
      count: pending.length,
      data: pending,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// ADMIN: PUT /api/volunteers/admin/:id/verify
// Approve or reject a volunteer
// ─────────────────────────────────────────────
export const verifyVolunteer = async (req, res) => {
  try {
    const { status, note } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be approved or rejected.',
      });
    }

    const profile = await VolunteerProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer profile not found.',
      });
    }

    profile.verificationStatus = status;
    profile.verificationNote   = note || '';
    profile.verifiedAt         = Date.now();
    profile.verifiedBy         = req.user._id;
    await profile.save();

    // Update user isVerified flag
    await User.findByIdAndUpdate(profile.user, {
      isVerified: status === 'approved',
    });

    res.status(200).json({
      success: true,
      message: `Volunteer ${status} successfully.`,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};