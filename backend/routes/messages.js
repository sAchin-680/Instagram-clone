const express = require('express');
const {
  sendMessage,
  getMessages,
} = require('../controllers/messageController');

const router = express.Router();

// Message Routes
router.post('/', sendMessage); // Send a message
router.get('/:userId1/:userId2', getMessages); // Get messages between two users

module.exports = router;
