const express = require('express');
const { createComment } = require('../controllers/commentController');

const router = express.Router();

// Comment Routes
router.post('/', createComment); // Add a comment to a post

module.exports = router;
