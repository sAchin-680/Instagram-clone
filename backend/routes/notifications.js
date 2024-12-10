const express = require('express');
const {
  createNotification,
  getNotifications,
} = require('../controllers/notificationController');

const router = express.Router();

// Notification Routes
router.post('/', createNotification); // Create a notification
router.get('/:userId', getNotifications); // Get notifications for a user

module.exports = router;
