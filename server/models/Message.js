const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    subject: {
      type: String,
      trim: true
    },
    body: {
      type: String,
      required: true
    },
    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proposal'
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Message || mongoose.model('Message', messageSchema);
