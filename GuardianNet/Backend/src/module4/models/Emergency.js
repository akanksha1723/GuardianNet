import mongoose from 'mongoose';

const emergencySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    category: {
      type: String,
      enum: [
        'medical', 'harassment', 'stalking', 'accident',
        'vehicle_breakdown', 'fire', 'escort', 'child_safety',
        'elderly', 'general',
      ],
      required: true,
    },

    status: {
      type: String,
      enum: [
        'pending',      // waiting for volunteer
        'accepted',     // volunteer accepted
        'in_progress',  // help is on the way
        'completed',    // emergency resolved
        'cancelled',    // user cancelled
        'escalated',    // no volunteer found in 30s
      ],
      default: 'pending',
    },

    // Location — hidden from volunteers until accepted
    exactLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    // Approximate location shown before acceptance
    approximateArea: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      maxlength: 500,
      default: '',
    },

    // Assigned volunteer
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    volunteerAcceptedAt: { type: Date },
    completedAt:         { type: Date },

    // Escalation
    escalatedAt:        { type: Date },
    escalationReason:   { type: String, default: '' },

    // AI priority score (used in Module 10)
    priorityScore: { type: Number, default: 5, min: 1, max: 10 },

    // Ratings (filled after completion)
    userRating:       { type: Number, min: 1, max: 5 },
    userReview:       { type: String, default: '' },
    volunteerRating:  { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

// Geospatial index
emergencySchema.index({ exactLocation: '2dsphere' });

const Emergency = mongoose.model('Emergency', emergencySchema);
export default Emergency;