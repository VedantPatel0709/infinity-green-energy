const mongoose = require('mongoose');

const contractSchema = mongoose.Schema(
  {
    contractNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    proposal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proposal',
      required: true
    },
    consumer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    producer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['draft', 'pending_signature', 'active', 'expired', 'terminated'],
      default: 'draft'
    },
    signedByConsumer: {
      type: Boolean,
      default: false
    },
    signedByProducer: {
      type: Boolean,
      default: false
    },
    notes: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Contract || mongoose.model('Contract', contractSchema);
