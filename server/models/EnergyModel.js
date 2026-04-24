const mongoose = require('mongoose');

/**
 * Energy Schema - Stores user energy calculations
 */
const energySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    monthlyUsage: {
      type: Number,
      required: true,
    },
    savings: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Energy || mongoose.model('Energy', energySchema);