const express = require('express');
const {
  createPost,
  getUserPosts,
  likePost,
  getPostComments,
} = require('../controllers/postController');

const router = express.Router();

// Post Routes
router.post('/', createPost); // Create a post
router.get('/:userId', getUserPosts); // Get posts of a user
router.put('/like', likePost); // Like/Unlike a post
router.get('/comments/:postId', getPostComments); // Get comments of a post

module.exports = router;
