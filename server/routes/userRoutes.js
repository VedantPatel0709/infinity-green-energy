const express = require('express');
const router = express.Router();
const rateLimiter = require('../middleware/rateLimiter');
const { protect, admin } = require('../middleware/authMiddleware');

// Import controllers
const {
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
} = require('../controllers/userController');

// Rate limiting configurations
const loginRateLimit = rateLimiter({ max: 10, windowMs: 15 * 60 * 1000 }); // 10 attempts per 15m
const otpRateLimit = rateLimiter({ max: 5, windowMs: 5 * 60 * 1000 }); // 5 OTPs per 5m
const resetRateLimit = rateLimiter({ max: 3, windowMs: 15 * 60 * 1000 }); // 3 resets per 15m

// Standard credentials Auth
router.post('/register', registerUser);
router.post('/login', loginRateLimit, authUser);
router.post('/refresh', refreshAccessToken);

// Phone OTP SMS Auth
router.post('/otp-send', otpRateLimit, sendOtp);
router.post('/otp-verify', verifyOtp);

// Google SSO Auth
router.post('/google-login', googleLogin);

// Password recovery
router.post('/forgot-password', resetRateLimit, forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Admin-only operations
router.route('/')
  .get(protect, admin, getAllUsers);

router.route('/metrics')
  .get(protect, admin, getAdminMetrics);

router.route('/activity-logs')
  .get(protect, admin, getActivityLogs);

router.route('/:id')
  .put(protect, admin, updateUserByAdmin)
  .delete(protect, admin, deleteUserByAdmin);

router.route('/:id/status')
  .put(protect, admin, toggleUserStatus);

module.exports = router;