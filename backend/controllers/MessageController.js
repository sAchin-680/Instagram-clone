const Message = require('../models/Message');
const User = require('../models/User');

// Send Message
const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    // Validate input
    if (!senderId || !receiverId || !content) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the sender and receiver exist
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!sender || !receiver) {
      return res.status(404).json({ message: 'User not found' });
    }

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Messages between Users
const getMessages = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;

    // Validate input
    if (!userId1 || !userId2) {
      return res.status(400).json({ message: 'Both user IDs are required' });
    }

    // Check if the users exist
    const user1 = await User.findById(userId1);
    const user2 = await User.findById(userId2);
    if (!user1 || !user2) {
      return res.status(404).json({ message: 'User not found' });
    }

    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    }).sort('createdAt');

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete Message
const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    // Validate input
    if (!messageId) {
      return res.status(400).json({ message: 'Message ID is required' });
    }

    // Check if the message exists
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await message.delete();
    res.status(200).json({ message: 'Message has been deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  deleteMessage,
};
