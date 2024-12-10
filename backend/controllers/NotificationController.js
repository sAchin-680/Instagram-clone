const Notification = require('../models/Notification');

// Create Notification
const createNotification = async (req, res) => {
  try {
    const { userId, type, postId, senderId } = req.body;

    // Validate input
    if (!userId || !type || !senderId) {
      return res
        .status(400)
        .json({ message: 'User ID, type, and sender ID are required' });
    }

    // Create a new notification
    const notification = new Notification({
      user: userId,
      type,
      post: postId,
      sender: senderId,
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Notifications
const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate input
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Get notifications
    const notifications = await Notification.find({ user: userId })
      .populate('user', 'profilePicture username')
      .populate('post', 'image')
      .populate('sender', 'username');
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark Notification as read
const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    // Validate input
    if (!notificationId) {
      return res.status(400).json({ message: 'Notification ID is required' });
    }

    // Update notification
    await Notification.findByIdAndUpdate(notificationId, { read: true });
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markNotificationAsRead,
};
