const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/db'); // Import the DB connection logic

// Controllers
const userController = require('./controllers/userController');
const movieController = require('./controllers/movieController');

// Create Express app
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectDB();

// Session setup
app.use(
  session({
    secret: 'mysecret', // Use a strong secret in production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://khainguyen:1234567890@cluster0.sytcd.mongodb.net/test',
      collectionName: 'sessions',
    }),
    cookie: { maxAge: 180 * 60 * 1000 }, // 3-hour session expiration
  })
);

// Custom middleware to pass user data to views
app.use((req, res, next) => {
    res.locals.user = req.session.userId ? { username: 'uniqueuser' } : null; 
    next();
  });
  
// Routes
app.get('/login', userController.getLoginPage);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);

app.get('/movies', movieController.getAllMovies);
app.get('/addmovie', movieController.getAddMoviePage);
app.post('/addmovie', movieController.postAddMovie);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('movie/404', { title: 'Page Not Found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
