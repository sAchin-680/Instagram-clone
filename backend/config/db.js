const mongoose = require('mongoose');
const connectDB = async (retries = 5, delay = 5000) => {
  while (retries) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {});
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      retries -= 1;
      console.log(`Retries left: ${retries}`);

      if (retries === 0) {
        console.log('Could not connect to MongoDB. Exisitng now...');
        process.exit(1);
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

module.exports = connectDB;
