const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

// Create Comment
const createComment = async (req, res) => {
  try {
    const { userId, postId, content } = req.body;

    // Validate input
    if (!userId || !postId || !content) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create a new comment
    const comment = new Comment({
      user: userId,
      post: postId,
      content,
    });

    await comment.save();

    // Add comment to the post
    post.comments.push(comment._id);
    await post.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Comments for a Post
const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;

    // Validate input
    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    // Check if the post exists
    const post = await Post.findById(postId).populate('comments');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post.comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete Comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Validate input
    if (!commentId) {
      return res.status(400).json({ message: 'Comment ID is required' });
    }

    // Check if the comment exists
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Remove comment from the post
    const post = await Post.findById(comment.post);
    if (post) {
      post.comments.pull(comment._id);
      await post.save();
    }

    // Delete the comment
    await comment.delete();

    res.status(200).json({ message: 'Comment has been deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createComment,
  getPostComments,
  deleteComment,
};
