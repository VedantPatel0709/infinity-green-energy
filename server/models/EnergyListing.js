const mongoose = require('mongoose');

const energyListingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    energyType: {
      type: String,
      required: true,
      trim: true
    },
    capacityAvailable: {
      type: Number,
      required: true,
      default: 0
    },
    tariff: {
      type: Number,
      required: true,
      default: 0
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    availabilityDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    notes: {
      type: String,
      default: '',
      trim: true
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'pending', 'approved', 'rejected', 'archived', 'deleted'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.EnergyListing || mongoose.model('EnergyListing', energyListingSchema);
