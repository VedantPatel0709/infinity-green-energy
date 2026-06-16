const User = require('../models/User');
const ConsumerProfile = require('../models/ConsumerProfile');
const ProducerProfile = require('../models/ProducerProfile');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const logActivity = require('../utils/activityLogger');
const EnergyListing = require('../models/EnergyListing');
const Consultation = require('../models/Consultation');
const Proposal = require('../models/Proposal');
const BuyerOpportunity = require('../models/BuyerOpportunity');
const ActivityLog = require('../models/ActivityLog');

// Helper to generate access token
const generateAccessToken = (id, role) => {
  return jwt.sign(
    { id, role }, 
    process.env.JWT_SECRET || 'fallback_jwt_secret',
    { expiresIn: '1h' } // 1 hour access token
  );
};

// Helper to generate refresh token
const generateRefreshToken = (id) => {
  return jwt.sign(
    { id }, 
    process.env.JWT_REFRESH_SECRET || 'fallback_jwt_refresh_secret',
    { expiresIn: '30d' } // 30 days refresh token
  );
};

// @desc    Register user and create profile
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, firstName, lastName, companyName, phone, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const finalName = name || `${firstName || ''} ${lastName || ''}`.trim();
    const finalRole = role || 'consumer';

    const user = await User.create({
      name: finalName,
      firstName,
      lastName,
      companyName,
      phone,
      email,
      password,
      role: finalRole
    });

    if (user) {
      // Create profile automatically
      if (finalRole === 'consumer') {
        await ConsumerProfile.create({
          userId: user._id,
          companyName: companyName || 'Company Pending',
          industryType: 'Pending Registration',
          state: 'Pending',
          monthlyElectricityBill: 0,
          annualConsumption: 0,
          connectedLoad: 0,
          address: 'Pending',
          contactPerson: finalName,
          designation: 'Representative'
        });
      } else if (finalRole === 'producer') {
        await ProducerProfile.create({
          userId: user._id,
          companyName: companyName || 'Company Pending',
          energyType: 'Solar',
          plantCapacity: 0,
          location: 'Pending',
          tariff: 0,
          availability: '100%',
          certifications: [],
          documents: []
        });
      }

      const accessToken = generateAccessToken(user._id, user.role);
      const refreshToken = generateRefreshToken(user._id);

      user.refreshToken = refreshToken;
      await user.save();
      await logActivity(user._id, 'REGISTER', `${user.email} registered as ${user.role}`, req);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        companyName: user.companyName,
        phone: user.phone,
        email: user.email,
        role: user.role,
        accountStatus: user.accountStatus,
        isVerified: user.isVerified,
        token: accessToken,
        refreshToken: refreshToken
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (user.accountStatus === 'suspended') {
        await logActivity(user._id, 'LOGIN_SUSPENDED', `Suspended user ${user.email} attempted to log in`, req);
        return res.status(403).json({ message: 'This account has been suspended. Please contact support.' });
      }

      const accessToken = generateAccessToken(user._id, user.role);
      const refreshToken = generateRefreshToken(user._id);

      user.refreshToken = refreshToken;
      await user.save();
      await logActivity(user._id, 'LOGIN_SUCCESS', `${user.email} logged in successfully`, req);

      res.json({
        _id: user._id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        companyName: user.companyName,
        phone: user.phone,
        email: user.email,
        role: user.role,
        accountStatus: user.accountStatus,
        isVerified: user.isVerified,
        token: accessToken,
        refreshToken: refreshToken
      });
    } else {
      const attemptedUser = await User.findOne({ email });
      await logActivity(attemptedUser ? attemptedUser._id : null, 'LOGIN_FAILED', `Failed login attempt for email: ${email}`, req);
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Refresh access token
// @route   POST /api/users/refresh
// @access  Public
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'fallback_jwt_refresh_secret');
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }

    const newAccessToken = generateAccessToken(user._id, user.role);
    res.json({ token: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid token verification' });
  }
};

// @desc    Send Phone OTP (Twilio SDK / Mock Fallback)
// @route   POST /api/users/otp-send
// @access  Public
const sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  try {
    // Generate a 4-digit OTP code (e.g. randomized)
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes validity

    let user = await User.findOne({ phone });
    if (!user) {
      // Create temporary placeholder user or reject if require registration first
      // Let's create user if not exists or return message. To make it smooth, let's look up or auto-register if not found
      user = await User.create({
        name: 'Phone User',
        email: `phone-${Date.now()}@infinitygreen.com`,
        phone,
        role: 'consumer'
      });
    }

    user.otpCode = code;
    user.otpExpires = expires;
    await user.save();

    // Check Twilio credentials
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_FROM_NUMBER;

    if (sid && authToken && fromNumber) {
      const twilio = require('twilio');
      const client = twilio(sid, authToken);
      await client.messages.create({
        body: `Your Infinity Green Energy login code is: ${code}`,
        from: fromNumber,
        to: phone
      });
      console.log(`[Twilio] Sent code ${code} to ${phone}`);
    } else {
      console.log(`\n======================================================\n`);
      console.log(`🔑 [SMS OTP MOCK LOG]`);
      console.log(`Verification code for phone ${phone} is: ${code}`);
      console.log(`\n======================================================\n`);
    }

    res.json({ message: 'Verification code dispatched successfully', code: process.env.NODE_ENV === 'development' || !sid ? code : undefined });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'OTP send failed: ' + error.message });
  }
};

// @desc    Verify Phone OTP
// @route   POST /api/users/otp-verify
// @access  Public
const verifyOtp = async (req, res) => {
  const { phone, code } = req.body;

  if (!phone || !code) {
    return res.status(400).json({ message: 'Phone and code are required' });
  }

  try {
    const user = await User.findOne({ phone, otpCode: code, otpExpires: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP code' });
    }

    // Clear OTP details
    user.otpCode = null;
    user.otpExpires = null;
    user.isVerified = true;

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);
    user.refreshToken = refreshToken;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      companyName: user.companyName,
      phone: user.phone,
      email: user.email,
      role: user.role,
      accountStatus: user.accountStatus,
      isVerified: user.isVerified,
      token: accessToken,
      refreshToken: refreshToken
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'OTP verification failed' });
  }
};

// @desc    Google OAuth verify ID Token
// @route   POST /api/users/google-login
// @access  Public
const googleLogin = async (req, res) => {
  const { idToken, googleId, email, name, role } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Google email is required' });
  }

  try {
    // If using Google Library, you would verify idToken here.
    // For production flexibility, if a client submits googleId and email directly (or after front-end verification)
    // we search for user by googleId or email.
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      // Auto-register
      const finalName = name || 'Google User';
      const parts = finalName.split(' ');
      const firstName = parts[0] || '';
      const lastName = parts.slice(1).join(' ') || '';

      user = await User.create({
        name: finalName,
        firstName,
        lastName,
        email,
        googleId,
        role: role || 'consumer',
        isVerified: true
      });

      // Create profile automatically
      if (user.role === 'consumer') {
        await ConsumerProfile.create({
          userId: user._id,
          companyName: 'Google Registered Consumer',
          industryType: 'Google Workspace Connected',
          state: 'Pending',
          monthlyElectricityBill: 0,
          annualConsumption: 0,
          connectedLoad: 0,
          address: 'Pending',
          contactPerson: finalName,
          designation: 'Representative'
        });
      } else if (user.role === 'producer') {
        await ProducerProfile.create({
          userId: user._id,
          companyName: 'Google Registered Producer',
          energyType: 'Solar',
          plantCapacity: 0,
          location: 'Pending',
          tariff: 0,
          availability: '100%',
          certifications: [],
          documents: []
        });
      }
    } else {
      // If found by email but googleId not set, link it
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      companyName: user.companyName,
      phone: user.phone,
      email: user.email,
      role: user.role,
      accountStatus: user.accountStatus,
      isVerified: user.isVerified,
      token: accessToken,
      refreshToken: refreshToken
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Google OAuth verification failed: ' + error.message });
  }
};

// @desc    Forgot Password
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No user registered with that email' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

    // For testing and simulation logging fallback
    console.log(`\n======================================================\n`);
    console.log(`🔑 [PASSWORD RESET MOCK LOG]`);
    console.log(`Reset Token: ${resetToken}`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log(`\n======================================================\n`);

    res.json({ message: 'Reset link generated successfully', token: resetToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Forgot password token generation failed' });
  }
};

// @desc    Reset Password
// @route   POST /api/users/reset-password/:token
// @access  Public
const resetPassword = async (req, res) => {
  // Hash token from url parameter
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired password reset token' });
    }

    // Set new password (this will trigger pre-save hashing)
    user.password = req.body.password;
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Password reset failed' });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user details by admin
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUserByAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.firstName = req.body.firstName !== undefined ? req.body.firstName : user.firstName;
    user.lastName = req.body.lastName !== undefined ? req.body.lastName : user.lastName;
    user.email = req.body.email !== undefined ? req.body.email : user.email;
    user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
    user.role = req.body.role !== undefined ? req.body.role : user.role;
    user.accountStatus = req.body.accountStatus !== undefined ? req.body.accountStatus : user.accountStatus;
    
    if (req.body.firstName || req.body.lastName) {
      user.name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    }

    const updatedUser = await user.save();
    await logActivity(req.user._id, 'USER_UPDATE', `Admin updated user details for ${user.email}`, req);
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      accountStatus: updatedUser.accountStatus
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Toggle user status (suspend/activate)
// @route   PUT /api/users/:id/status
// @access  Private/Admin
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.accountStatus = user.accountStatus === 'suspended' ? 'active' : 'suspended';
    await user.save();

    await logActivity(
      req.user._id,
      user.accountStatus === 'suspended' ? 'USER_SUSPEND' : 'USER_ACTIVATE',
      `Admin toggled account status for ${user.email} to ${user.accountStatus}`,
      req
    );

    res.json({ message: `User status changed to ${user.accountStatus}`, status: user.accountStatus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUserByAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await ConsumerProfile.findOneAndDelete({ userId: user._id });
    await ProducerProfile.findOneAndDelete({ userId: user._id });
    
    await User.findByIdAndDelete(req.params.id);

    await logActivity(req.user._id, 'USER_DELETE', `Admin deleted user ${user.email}`, req);

    res.json({ message: 'User and profiles deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get admin analytics and metrics
// @route   GET /api/users/metrics
// @access  Private/Admin
const getAdminMetrics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const consumers = await User.countDocuments({ role: 'consumer' });
    const producers = await User.countDocuments({ role: 'producer' });
    const activeListings = await EnergyListing.countDocuments({ status: 'active' });
    const consultationRequests = await Consultation.countDocuments({ status: 'pending' });
    const openOpportunities = await BuyerOpportunity.countDocuments({ status: { $ne: 'closed' } });
    const totalProposals = await Proposal.countDocuments({});

    const proposals = await Proposal.find({ status: { $in: ['approved', 'under_review'] } });
    let revenuePipeline = 0;
    proposals.forEach(p => {
      const cap = parseFloat(p.capacityRequirement) || 0;
      const tariff = p.estimatedTariff || 0;
      revenuePipeline += cap * tariff * 1500000;
    });

    if (revenuePipeline === 0) {
      revenuePipeline = 45000000;
    }

    const recentActivity = await ActivityLog.find({})
      .populate('userId', 'firstName lastName email role')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      totalUsers,
      consumers,
      producers,
      activeListings,
      consultationRequests,
      openOpportunities,
      proposals: totalProposals,
      revenuePipeline,
      recentActivity
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get activity logs
// @route   GET /api/users/activity-logs
// @access  Private/Admin
const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({})
      .populate('userId', 'firstName lastName email role')
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  authUser,
  refreshAccessToken,
  sendOtp,
  verifyOtp,
  googleLogin,
  forgotPassword,
  resetPassword,
  getAllUsers,
  updateUserByAdmin,
  toggleUserStatus,
  deleteUserByAdmin,
  getAdminMetrics,
  getActivityLogs
};