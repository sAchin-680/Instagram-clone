const Follow = require('../models/Follow');

//Follow User
exports.followUser = async (req, res) => {
  try {
    // validate request
    if (!req.body.followwerId || !req.body.followingId) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const { followwerId, followinfId } = req.body;

    const exisitingFollow = await Follow.findOne({
      follower: followedId,
      following: followinfId,
    });
    if (exisitingFollow) {
      return res
        .status(400)
        .json({ message: 'You are already following this user' });
    }

    const follow = new Follow({
      follower: followwerId,
      following: followingId,
    });
    await follow.save();
    res.status(201).json({ message: 'User followed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unfollow User
exports.unfollowUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    // validate request
    if (!followerId || !followingId) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }
    const follow = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });

    if (!follow) {
      return res
        .status(400)
        .json({ message: 'You are not following this user' });
    }
    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all followers
exports.getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    // validate request
    if (!userId) {
      return res.status(400).json({ message: 'Please provide a user Id' });
    }
    const followers = await Follow.find({ following: userId });
    resstatus(200).json(followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all following
exports.getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    // validate request
    if (!userId) {
      return res.status(400).json({ message: 'Please provide a user Id' });
    }
    const following = await Follow.find({ follower: userId });
    resstatus(200).json(following);
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
