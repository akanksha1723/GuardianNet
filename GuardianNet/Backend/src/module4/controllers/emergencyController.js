import Emergency from '../models/Emergency.js';
import EmergencyContact from '../models/EmergencyContact.js';
import {
  notifyEmergencyContacts,
  notifySecurityPersonnel,
} from '../utils/smsService.js';
import { getEmergencyNumbers } from '../utils/emergencyNumbers.js';

const sanitizeEmergency = (e) => e;

export const createEmergency = async (req, res) => {
  try {
    const { category, longitude, latitude, description, approximateArea } = req.body;

    if (!category || !longitude || !latitude) {
      return res.status(400).json({
        success: false,
        message: 'Category, longitude and latitude are required.',
      });
    }

    const activeEmergency = await Emergency.findOne({
      user:   req.user._id,
      status: { $in: ['pending', 'accepted', 'in_progress'] },
    });

    if (activeEmergency) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active emergency request.',
        data: activeEmergency,
      });
    }

    const emergency = await Emergency.create({
      user: req.user._id,
      category,
      description:     description || '',
      approximateArea: approximateArea || 'Your area',
      exactLocation: {
        type:        'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    });

    await emergency.populate('user', 'name phone');

    res.status(201).json({
      success: true,
      message: 'Emergency request created. Finding nearby volunteers…',
      data:    emergency,
    });
  } catch (error) {
    console.error('Create emergency error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getActiveEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.findOne({
      user:   req.user._id,
      status: { $in: ['pending', 'accepted', 'in_progress'] },
    }).populate('volunteer', 'name phone profilePhoto');

    res.status(200).json({ success: true, data: emergency || null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.findOneAndUpdate(
      {
        _id:    req.params.id,
        user:   req.user._id,
        status: { $in: ['pending', 'escalated'] },
      },
      { status: 'cancelled' },
      { new: true }
    );

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: 'Emergency not found or cannot be cancelled.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Emergency cancelled.',
      data:    emergency,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const escalateEmergency = async (req, res) => {
  try {
    const { state } = req.body;

    const emergency = await Emergency.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id, status: 'pending' },
      {
        status:           'escalated',
        escalatedAt:       Date.now(),
        escalationReason: 'No volunteer responded within 30 seconds.',
      },
      { new: true }
    ).populate('user', 'name phone');

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: 'Emergency not found or already handled.',
      });
    }

    // Get this user's emergency contacts
    const contactsDoc = await EmergencyContact.findOne({ user: req.user._id });
    const contacts    = contactsDoc?.contacts || [];

    // 1. SMS emergency contacts
    let contactResults = [];
    if (contacts.length > 0) {
      contactResults = await notifyEmergencyContacts(
        contacts,
        emergency.user.name,
        emergency.category,
        { approximateArea: emergency.approximateArea }
      );
      console.log(`📱 Notified ${contactResults.length} emergency contacts`);
    } else {
      console.log('⚠️  No emergency contacts configured for this user');
    }

    // 2. SMS security personnel
    await notifySecurityPersonnel(
      emergency.user.name,
      emergency.category,
      { approximateArea: emergency.approximateArea }
    );

    // 3. Official emergency numbers for the user's state
    const emergencyNumbers = getEmergencyNumbers(state || '');

    res.status(200).json({
      success: true,
      message: 'Emergency escalated. Contacts and security notified.',
      data: {
        emergency,
        contactsNotified: contactResults.length,
        contactResults,
        emergencyNumbers,
      },
    });
  } catch (error) {
    console.error('Escalate emergency error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const acceptEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.findOneAndUpdate(
      { _id: req.params.id, status: 'pending' },
      {
        status:              'accepted',
        volunteer:            req.user._id,
        volunteerAcceptedAt:  Date.now(),
      },
      { new: true }
    )
      .populate('user',      'name phone')
      .populate('volunteer', 'name phone');

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: 'Emergency not found or already accepted.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Emergency accepted. Navigate to the user.',
      data:    emergency,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const completeEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.findOneAndUpdate(
      {
        _id:       req.params.id,
        volunteer: req.user._id,
        status:    'accepted',
      },
      {
        status:      'completed',
        completedAt:  Date.now(),
      },
      { new: true }
    );

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: 'Emergency not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Emergency marked as completed.',
      data:    emergency,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEmergencyHistory = async (req, res) => {
  try {
    const emergencies = await Emergency.find({
      user:   req.user._id,
      status: { $in: ['completed', 'cancelled', 'escalated'] },
    })
      .populate('volunteer', 'name profilePhoto')
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count:   emergencies.length,
      data:    emergencies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const rateEmergency = async (req, res) => {
  try {
    const { rating, review } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5.',
      });
    }

    const emergency = await Emergency.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id, status: 'completed' },
      { userRating: rating, userReview: review || '' },
      { new: true }
    );

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: 'Emergency not found or not completed.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Rating submitted. Thank you!',
      data:    emergency,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEmergencyContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.findOne({ user: req.user._id });
    res.status(200).json({
      success: true,
      data:    contacts?.contacts || [],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const saveEmergencyContacts = async (req, res) => {
  try {
    const { contacts } = req.body;

    if (!contacts || !Array.isArray(contacts)) {
      return res.status(400).json({
        success: false,
        message: 'Contacts must be an array.',
      });
    }

    if (contacts.length > 5) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 5 emergency contacts allowed.',
      });
    }

    const saved = await EmergencyContact.findOneAndUpdate(
      { user: req.user._id },
      { contacts },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Emergency contacts saved.',
      data:    saved.contacts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find()
      .populate('user',      'name phone')
      .populate('volunteer', 'name phone')
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count:   emergencies.length,
      data:    emergencies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};