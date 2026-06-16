const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema - Stores authentication and profile data
 */
const userSchema = mongoose.Schema(
  {
    name: { 
      type: String,
      required: false
    },

    firstName: {
      type: String,
      trim: true,
      required: false
    },

    lastName: {
      type: String,
      trim: true,
      required: false
    },

    companyName: {
      type: String,
      trim: true,
      required: false
    },

    phone: {
      type: String,
      trim: true,
      required: false
    },

    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },

    password: { 
      type: String, 
      required: false 
    },

    role: {
      type: String,
      enum: ['consumer', 'producer', 'admin'],
      default: 'consumer'
    },

    accountStatus: {
      type: String,
      enum: ['active', 'pending', 'suspended'],
      default: 'active'
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true
    },

    otpCode: {
      type: String,
      default: null
    },

    otpExpires: {
      type: Date,
      default: null
    },

    resetPasswordToken: {
      type: String,
      default: null
    },

    resetPasswordExpire: {
      type: Date,
      default: null
    },

    refreshToken: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

// 🔐 Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🔐 Hash password before saving
userSchema.pre('save', async function (next) {
  if ((this.firstName || this.lastName) && !this.name) {
    this.name = `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }

  if (!this.password || !this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);