const ActivityLog = require('../models/ActivityLog');

/**
 * Log an activity to the database
 * @param {string} userId - User ID who triggered the action (optional)
 * @param {string} action - Action category (e.g. 'LOGIN', 'USER_SUSPEND')
 * @param {string} details - Detailed human readable description of action
 * @param {Object} req - Express request object to fetch IP and user agent (optional)
 */
const logActivity = async (userId, action, details, req = null) => {
  try {
    let ipAddress = '';
    let userAgent = '';

    if (req) {
      ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
      userAgent = req.headers['user-agent'] || '';
    }

    await ActivityLog.create({
      userId: userId || null,
      action,
      details,
      ipAddress,
      userAgent
    });
  } catch (error) {
    console.error('Error logging activity:', error.message);
  }
};

module.exports = logActivity;
