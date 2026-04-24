const mongoose = require('mongoose');

const energySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
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

module.exports = mongoose.model('Energy', energySchema);