const mongoose = require('mongoose');

// Movie Schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  releaseYear: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear(),
  },
  genre: {
    type: String,
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Export the Movie model
const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
