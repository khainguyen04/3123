const Movie = require('../models/movieModel');

// GET /movies
exports.getAllMovies = async (req, res) => {
  try {
    const genre = req.query.genre; // Get genre from query string

    let query = {};
    if (genre) {
      query.genre = genre; // Filter by genre if provided
    }

    const movies = await Movie.find(query);
    res.render('movie/listMovies', { title: 'All Movies', movies, selectedGenre: genre });
  } catch (err) {
    res.status(500).send('Error fetching movies');
  }
};

// GET /addmovie
exports.getAddMoviePage = (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.render('movie/addMovie', { title: 'Add Movie' });
};

// POST /addmovie
exports.postAddMovie = async (req, res) => {
  const { title, releaseYear, genre } = req.body;
  const newMovie = new Movie({
    title,
    releaseYear,
    genre,
    addedBy: req.session.userId,
  });

  try {
    await newMovie.save();
    res.redirect('/movies');
  } catch (err) {
    res.status(500).send('Error adding movie');
  }
};
