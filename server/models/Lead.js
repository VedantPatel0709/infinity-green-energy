const mongoose = require('mongoose');

const leadSchema = mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true 
    },
    phone: { 
      type: String, 
      required: true 
    },
    company: { 
      type: String, 
      required: true 
    },
    bill: { 
      type: Number, 
      required: true 
    },
    message: { 
      type: String 
    },
    status: { 
      type: String, 
      default: 'New', 
      enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'] 
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    followUpDate: {
      type: Date
    },
    followUpNotes: {
      type: String
    },
    consultationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Consultation'
    },
    assessmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EnergyAssessment'
    },
    opportunityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Opportunity'
    },
    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proposal'
    },
    notes: [
      {
        content: String,
        author: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    activities: [
      {
        action: String,
        details: String,
        performedBy: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
