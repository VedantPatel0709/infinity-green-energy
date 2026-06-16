const mongoose = require('mongoose');

const documentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    documentType: {
      type: String,
      required: true,
      trim: true
    },
    fileName: {
      type: String,
      required: true,
      trim: true
    },
    fileUrl: {
      type: String,
      required: true,
      trim: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Document || mongoose.model('Document', documentSchema);
