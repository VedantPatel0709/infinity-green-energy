const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getMyNotifications,
  markNotificationRead,
  getNotificationLogs,
  createNotification,
  deleteNotification
} = require('../controllers/notificationController');

router.route('/')
  .get(protect, getMyNotifications)
  .post(protect, admin, createNotification);

router.route('/logs')
  .get(protect, admin, getNotificationLogs);

router.route('/:id/read')
  .put(protect, markNotificationRead);

router.route('/:id')
  .delete(protect, deleteNotification);

module.exports = router;
