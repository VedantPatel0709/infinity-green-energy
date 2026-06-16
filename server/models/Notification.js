const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    read: {
      type: Boolean,
      required: true,
      default: false
    },
    type: {
      type: String,
      required: true,
      enum: ['email', 'sms', 'in_app', 'broadcast'],
      default: 'in_app'
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'sent', 'failed'],
      default: 'sent'
    },
    recipient: {
      type: String,
      trim: true,
      required: false
    },
    templateId: {
      type: String,
      trim: true,
      required: false
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      required: false
    },
    deliveryLog: [
      {
        attempt: { type: Number, default: 1 },
        error: { type: String, default: null },
        sentAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
