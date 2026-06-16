const mongoose = require('mongoose');

const producerProfileSchema = mongoose.Schema(
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
    energyType: {
      type: String,
      required: true,
      trim: true
    },
    plantCapacity: {
      type: Number,
      required: true,
      default: 0
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    tariff: {
      type: Number,
      required: true,
      default: 0
    },
    availability: {
      type: String,
      required: true,
      trim: true
    },
    certifications: {
      type: [String],
      default: []
    },
    documents: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.ProducerProfile || mongoose.model('ProducerProfile', producerProfileSchema);
