const mongoose = require('mongoose');

const proposalSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    producerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    proposalNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    capacityRequirement: {
      type: String,
      default: ''
    },
    estimatedTariff: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      required: true,
      enum: ['draft', 'under_review', 'approved', 'rejected'],
      default: 'draft'
    },
    amount: {
      type: Number,
      default: 0
    },
    notes: {
      type: String,
      default: ''
    },
    opportunity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Opportunity'
    },
    validUntil: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Proposal || mongoose.model('Proposal', proposalSchema);
