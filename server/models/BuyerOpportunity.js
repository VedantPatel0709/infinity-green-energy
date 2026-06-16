const mongoose = require('mongoose');

const buyerOpportunitySchema = mongoose.Schema(
  {
    consumerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
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
    requiredCapacity: {
      type: Number,
      required: true,
      default: 0
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'contacted', 'proposal_sent', 'negotiation', 'closed'],
      default: 'new'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.BuyerOpportunity || mongoose.model('BuyerOpportunity', buyerOpportunitySchema);
