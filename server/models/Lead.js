const mongoose = require('mongoose');

/**
 * Lead Schema - Stores potential customer inquiries
 */
const leadSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String, required: true },
    bill: { type: Number, required: true },
    message: { type: String },
    status: { type: String, default: 'New', enum: ['New', 'Contacted', 'Qualified', 'Closed'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
