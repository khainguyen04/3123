const User = require('../models/userModel');

// GET /login
exports.getLoginPage = (req, res) => {
  res.render('user/login', { title: 'Login' });
};

// POST /login
exports.postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      // If the user doesn't exist, send an error
      return res.render('user/login', { title: 'Login', error: 'Invalid username or password' });
    }

    // Compare the provided password with the stored password (no hashing, direct comparison)
    const isMatch = (password === user.password);

    if (!isMatch) {
      // If the password doesn't match, send an error
      return res.render('user/login', { title: 'Login', error: 'Invalid username or password' });
    }

    // If the passwords match, set the session and redirect to the movies page
    req.session.userId = user._id;
    return res.redirect('/movies');
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).render('user/login', { title: 'Login', error: 'An error occurred during login. Please try again.' });
  }
};

// POST /logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/login');
  });
};
