const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Import models
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Like = require('./models/Like');
const Follow = require('./models/Follow');
const Notification = require('./models/Notification');
const Message = require('./models/Message');

// Import Controllers
const UserController = require('./controllers/UserController');
const postController = require('./controllers/PostController');
const commentController = require('./controllers/commentController');
const notificationController = require('./controllers/notificationController');
const messageController = require('./controllers/messageController');
const followController = require('./controllers/followController');

// Import Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/posts'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/follow', require('./routes/follow'));

// connect to database
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
