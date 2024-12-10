const express = require('express');
const { followUser, unfollowUser } = require('../controllers/followController');

const router = express.Router();

// Follow Routes
router.post('/follow', followUser); // Follow a user
router.post('/unfollow', unfollowUser); // Unfollow a user

module.exports = router;
