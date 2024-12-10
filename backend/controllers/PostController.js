const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { userId, description, image } = req.body;

    // Validate the user input
    if (!userId || !description || !image) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    const post = new Post({
      user: userId,
      description,
      image,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Posts of a user
exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    // Validate input
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const posts = await Post.find({ user: userId })
      .populate('user')
      .populate('comments');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Like Post
exports.likePost = async (req, res) => {
  try {
    const { postId, UserId } = req.body;
    // Validate input
    if (!postId || !userId) {
      return res
        .status(400)
        .json({ message: 'Post ID and User ID are required' });
    }

    const post = await Post.findById(postId);

    // Check if the user already liked the post
    if (!post) {
      return res.status(404).json('Post not found');
    }

    // Check if the user already liked the post
    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
      await post.save();
      return res.status(200).json({ message: 'You unliked this post' });
    } else {
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ message: 'You liked this post' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Post Comments
exports.getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;

    // Validate input
    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    const post = await Post.findById(postId).populate('comments');
    if (!post) {
      return res.status(404).json('Post not found');
    }
    res.status(200).json(post.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { userId, postId, content } = req.body;

    // Validate input
    if (!userId || !postId || !content) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const comment = new Comment({
      user: userId,
      post: postId,
      content,
    });

    await comment.save();

    const post = await Post.findById(postId);
    post.comments.push(comment._id);
    await post.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Validate input
    if (!commentId) {
      return res.status(400).json({ message: 'Comment ID is required' });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json('Comment not found');
    }

    await comment.delete();
    res.status(200).json('Comment has been deleted');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Validate input
    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json('Post not found');
    }

    await post.delete();
    res.status(200).json('Post has been deleted');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Timeline Posts
exports.getTimelinePosts = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate input
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ user: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ user: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getUserPosts,
  likePost,
  getPostComments,
  createComment,
  deleteComment,
  deletePost,
  getTimelinePosts,
};
