const ActivityLog = require('../models/ActivityLog');
const User = require('../models/User');

/**
 * Get Audit Logs
 * GET /api/security/audit-logs
 * Access: Admin
 */
exports.getAuditLogs = async (req, res) => {
  const { action, ip, email } = req.query;
  const filter = {};

  if (action) {
    filter.action = action;
  }
  if (ip) {
    filter.ipAddress = ip;
  }

  try {
    if (email) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        filter.userId = user._id;
      } else {
        // Return empty if user email not found
        return res.json([]);
      }
    }

    const logs = await ActivityLog.find(filter)
      .populate('userId', 'email role firstName lastName')
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve compliance audit logs', error: error.message });
  }
};

/**
 * Toggle User Account Status (Suspend/Activate)
 * PUT /api/security/users/:id/status
 * Access: Admin
 */
exports.toggleUserStatus = async (req, res) => {
  const { status } = req.body; // 'active' or 'suspended'

  if (!['active', 'suspended'].includes(status)) {
    return res.status(400).json({ message: 'Invalid account status value' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const oldStatus = user.accountStatus;
    user.accountStatus = status;
    await user.save();

    // Log this administrative intervention to the compliance audit log
    const ActivityLog = require('../models/ActivityLog');
    await ActivityLog.create({
      userId: req.user._id,
      action: status === 'suspended' ? 'USER_SUSPENDED' : 'USER_ACTIVATED',
      details: `Admin changed account status of user ${user.email} from ${oldStatus} to ${status}`,
      ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
      userAgent: req.headers['user-agent'] || ''
    });

    res.json({ success: true, message: `Account status updated to ${status}`, user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle user status', error: error.message });
  }
};

/**
 * Get Security & Session Metrics
 * GET /api/security/session-metrics
 * Access: Admin
 */
exports.getSecurityMetrics = async (req, res) => {
  try {
    const [
      loginSuccessCount,
      loginFailedCount,
      rateLimitViolations,
      suspendedUsers,
      totalUsers
    ] = await Promise.all([
      ActivityLog.countDocuments({ action: 'LOGIN_SUCCESS' }),
      ActivityLog.countDocuments({ action: 'LOGIN_FAILED' }),
      ActivityLog.countDocuments({ action: 'RATE_LIMIT_EXCEEDED' }),
      User.countDocuments({ accountStatus: 'suspended' }),
      User.countDocuments()
    ]);

    res.json({
      loginSuccessCount,
      loginFailedCount,
      rateLimitViolations,
      suspendedUsers,
      totalUsers
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve session metrics', error: error.message });
  }
};
