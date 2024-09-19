const mongoose = require('mongoose');
const User = require('./models/userModel'); // Make sure this path is correct

// MongoDB connection string
const dbURL = 'mongodb+srv://khainguyen:1234567890@cluster0.sytcd.mongodb.net/test'; // Replace with your actual MongoDB URL

// Connect to MongoDB
mongoose.connect(dbURL, { dbName: 'test' })
  .then(() => {
    console.log('Connected to MongoDB');
    createNewUser(); // Call the function to create a new user
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Function to create a new user
const createNewUser = async () => {
    const username = 'uniqueuser';  // Replace with a new, unique username
    const password = 'newpassword123';  // Replace with the desired password
    

  // Create a new user object without hashing the password
  const user = new User({
    username: username,
    password: password // No hashing, storing the password as plain text
  });

  try {
    // Save the new user to the database
    await user.save();
    console.log(`New user created successfully! Username: ${username}`);
    mongoose.connection.close();  // Close the connection after saving
  } catch (error) {
    console.error('Error creating user:', error);
    mongoose.connection.close();
  }
};
