const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// No pre-save hooks or hashing

// Export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
