import mongoose from 'mongoose';

const volunteerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    // Verification documents
    governmentIdType: {
      type: String,
      enum: ['aadhar', 'pan', 'passport', 'driving_license', 'voter_id'],
      required: true,
    },

    governmentIdNumber: {
      type: String,
      required: true,
      trim: true,
    },

    governmentIdPhoto: {
      type: String, // Firebase Storage URL
      default: '',
    },

    // Verification status
    verificationStatus: {
      type: String,
      enum: ['pending', 'under_review', 'approved', 'rejected'],
      default: 'pending',
    },

    verificationNote: {
      type: String,
      default: '',
    },

    verifiedAt: {
      type: Date,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    // Availability
    isAvailable: {
      type: Boolean,
      default: true,
    },

    availableCategories: {
      type: [String],
      enum: [
        'medical', 'harassment', 'stalking', 'accident',
        'vehicle_breakdown', 'fire', 'escort', 'child_safety',
        'elderly', 'general',
      ],
      default: ['general'],
    },

    // Location (updated in real time via Socket.IO in Module 6)
    currentLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },

    // Stats
    totalRequestsHandled: { type: Number, default: 0 },
    totalRatings:         { type: Number, default: 0 },
    sumOfRatings:         { type: Number, default: 0 },
    trustScore:           { type: Number, default: 0, min: 0, max: 100 },

    // Bio
    bio: { type: String, maxlength: 300, default: '' },
    skills: { type: [String], default: [] },
    languages: { type: [String], default: ['English'] },
  },
  { timestamps: true }
);

// Geospatial index for finding nearby volunteers
volunteerProfileSchema.index({ currentLocation: '2dsphere' });

// Calculate average rating
volunteerProfileSchema.virtual('averageRating').get(function () {
  if (this.totalRatings === 0) return 0;
  return (this.sumOfRatings / this.totalRatings).toFixed(1);
});

volunteerProfileSchema.set('toJSON', { virtuals: true });

const VolunteerProfile = mongoose.model('VolunteerProfile', volunteerProfileSchema);
export default VolunteerProfile;