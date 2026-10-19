import mongoose from 'mongoose';

const emergencyContactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    contacts: [
      {
        name:         { type: String, required: true, trim: true },
        phone:        { type: String, required: true, trim: true },
        relationship: { type: String, default: 'Friend' },
        notifyOnSOS:  { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true }
);

const EmergencyContact = mongoose.model('EmergencyContact', emergencyContactSchema);
export default EmergencyContact;