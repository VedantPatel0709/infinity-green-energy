const mongoose = require('mongoose');

/**
 * EnergyData Schema - Stores solar/green energy calculations and metrics
 */
const energyDataSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    monthlyUsage: { type: Number, required: true },
    savings: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('EnergyData', energyDataSchema);
