const mongoose = require('mongoose');

const activityLogSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    action: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    ipAddress: {
      type: String,
      required: false
    },
    userAgent: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.ActivityLog || mongoose.model('ActivityLog', activityLogSchema);
