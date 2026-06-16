const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getAuditLogs,
  toggleUserStatus,
  getSecurityMetrics
} = require('../controllers/securityController');

router.get('/audit-logs', protect, admin, getAuditLogs);
router.put('/users/:id/status', protect, admin, toggleUserStatus);
router.get('/session-metrics', protect, admin, getSecurityMetrics);

module.exports = router;
