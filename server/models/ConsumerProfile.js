const mongoose = require('mongoose');

const consumerProfileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    industryType: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    monthlyElectricityBill: {
      type: Number,
      required: true,
      default: 0
    },
    annualConsumption: {
      type: Number,
      required: true,
      default: 0
    },
    connectedLoad: {
      type: Number,
      required: true,
      default: 0
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    contactPerson: {
      type: String,
      required: true,
      trim: true
    },
    designation: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.ConsumerProfile || mongoose.model('ConsumerProfile', consumerProfileSchema);
