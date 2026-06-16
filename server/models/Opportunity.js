const mongoose = require('mongoose');

const opportunitySchema = mongoose.Schema(
  {
    consumerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    producerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'EnergyListing'
    },
    requirementId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'EnergyRequirement'
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'contacted', 'proposal_sent', 'negotiation', 'won', 'lost'],
      default: 'new'
    },
    notes: {
      type: String,
      default: '',
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Opportunity || mongoose.model('Opportunity', opportunitySchema);
