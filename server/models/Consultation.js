const mongoose = require('mongoose');

const consultationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    consultationType: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'assigned', 'in_progress', 'completed'],
      default: 'pending'
    },
    notes: {
      type: String,
      default: '',
      trim: true
    },
    assignedAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Consultation || mongoose.model('Consultation', consultationSchema);
