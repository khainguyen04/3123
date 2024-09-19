const mongoose = require('mongoose');

// MongoDB connection string and database name
const dbURL = 'mongodb+srv://khainguyen:1234567890@cluster0.sytcd.mongodb.net/test'; // Use your actual URL

// Connect to MongoDB without deprecated options
const connectDB = async () => {
  try {
    await mongoose.connect(dbURL, {
      dbName: 'test', // Replace with your actual database name
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
