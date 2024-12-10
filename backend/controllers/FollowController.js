const Follow = require('../models/Follow');
const User = require('../models/User');

// Follow a user
const followUser = async (req, res) => {
  try {
    const { userId, followId } = req.body;

    // Validate input
    if (!userId || !followId) {
      return res
        .status(400)
        .json({ message: 'User ID and Follow ID are required' });
    }

    // Check if the user and follow user exist
    const user = await User.findById(userId);
    const followUser = await User.findById(followId);
    if (!user || !followUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already following
    const existingFollow = await Follow.findOne({
      follower: userId,
      following: followId,
    });
    if (existingFollow) {
      return res.status(400).json({ message: 'Already following this user' });
    }

    // Create a new follow
    const follow = new Follow({
      follower: userId,
      following: followId,
    });

    await follow.save();
    res.status(201).json({ message: 'User followed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
  try {
    const { userId, unfollowId } = req.body;

    // Validate input
    if (!userId || !unfollowId) {
      return res
        .status(400)
        .json({ message: 'User ID and Unfollow ID are required' });
    }

    // Check if the user and unfollow user exist
    const user = await User.findById(userId);
    const unfollowUser = await User.findById(unfollowId);
    if (!user || !unfollowUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if not following
    const existingFollow = await Follow.findOne({
      follower: userId,
      following: unfollowId,
    });
    if (!existingFollow) {
      return res.status(400).json({ message: 'Not following this user' });
    }

    // Remove follow
    await Follow.deleteOne({ follower: userId, following: unfollowId });
    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all followers
const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate request
    if (!userId) {
      return res.status(400).json({ message: 'Please provide a user ID' });
    }

    const followers = await Follow.find({ following: userId }).populate(
      'follower'
    );
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all following
const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate request
    if (!userId) {
      return res.status(400).json({ message: 'Please provide a user ID' });
    }

    const following = await Follow.find({ follower: userId }).populate(
      'following'
    );
    res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
