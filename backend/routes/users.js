const express = require('express');
const {
  register,
  login,
  updateProfile,
  getUserProfile,
} = require('../controllers/userController');

const router = express.Router();

// User Routes
router.post('/register', register); // Register a new user
router.post('/login', login); // Login user
router.put('/update/:userId', updateProfile); // Update user profile
router.get('/:userId', getUserProfile); // Get user profile

module.exports = router;
