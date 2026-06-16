const Notification = require('../models/Notification');
const User = require('../models/User');
const { sendNotification } = require('../utils/notificationService');

// @desc    Get current user's notifications
// @route   GET /api/notifications
// @access  Private
const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    notification.read = true;
    const updatedNotification = await notification.save();
    res.json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all platform notification delivery logs
// @route   GET /api/notifications/logs
// @access  Private/Admin
const getNotificationLogs = async (req, res) => {
  try {
    const logs = await Notification.find({})
      .populate('userId', 'email name role')
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a notification (Admin or system triggered / broadcast support)
// @route   POST /api/notifications
// @access  Private/Admin
const createNotification = async (req, res) => {
  const { userId, title, message, type = 'in_app' } = req.body;

  if (!userId || !title || !message) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // 1. Broadcast routing
    if (['all', 'consumer', 'producer'].includes(userId)) {
      const filter = userId === 'all' ? {} : { role: userId };
      const targetUsers = await User.find(filter);

      // Trigger notifications concurrently
      const promises = targetUsers.map((u) =>
        sendNotification({
          userId: u._id,
          customTitle: title,
          customMessage: message,
          type,
          templateId: 'custom_broadcast'
        })
      );
      await Promise.all(promises);
      
      return res.status(201).json({ 
        success: true, 
        message: `Broadcasted notification to ${targetUsers.length} users via ${type}` 
      });
    }

    // 2. Single target route
    const notification = await sendNotification({
      userId,
      customTitle: title,
      customMessage: message,
      type,
      templateId: 'custom_alert'
    });

    if (!notification) {
      return res.status(400).json({ message: 'Failed to create notification' });
    }

    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete notification by ID
// @route   DELETE /api/notifications/:id
// @access  Private
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notification removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMyNotifications,
  markNotificationRead,
  getNotificationLogs,
  createNotification,
  deleteNotification
};
