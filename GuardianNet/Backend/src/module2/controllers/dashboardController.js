import User from '../../module1/models/User.js';

// GET /api/dashboard/user/stats
export const getUserStats = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        totalEmergencies:  0,
        volunteersNearby:  0,
        avgResponseTime:  'N/A',
        avgRating:        'N/A',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/dashboard/volunteer/stats
export const getVolunteerStats = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        requestsHandled:     0,
        trustScore:          req.user.trustScore || 0,
        avgResponseTime:    'N/A',
        activeRequestsNearby: 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/dashboard/admin/stats
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers          = await User.countDocuments({ role: 'user' });
    const verifiedVolunteers  = await User.countDocuments({ role: 'volunteer', isVerified: true });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        verifiedVolunteers,
        activeEmergencies: 0,
        resolvedToday:     0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/dashboard/recent-activity
export const getRecentActivity = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: [],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};