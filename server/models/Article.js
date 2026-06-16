const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    excerpt: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Open Access', 'Industrial Solar', 'Wind Energy', 'Hybrid Solutions', 'Energy Markets', 'Cost Optimization', 'Industry Regulations']
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    author: {
      type: String,
      default: 'Procurement Desk'
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);
