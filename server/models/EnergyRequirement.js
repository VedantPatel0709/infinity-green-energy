const mongoose = require('mongoose');

const energyRequirementSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    industry: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    requiredCapacity: {
      type: Number,
      required: true,
      default: 0
    },
    monthlyConsumption: {
      type: Number,
      required: true,
      default: 0
    },
    preferredTariff: {
      type: Number,
      required: true,
      default: 0
    },
    notes: {
      type: String,
      default: '',
      trim: true
    },
    status: {
      type: String,
      required: true,
      enum: ['open', 'matched', 'negotiation', 'closed'],
      default: 'open'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.EnergyRequirement || mongoose.model('EnergyRequirement', energyRequirementSchema);
