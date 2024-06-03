const express = require('express');
const app = express();
const methodOverride=require("method-override")
const path = require('path');
const authRoute = require("./routes/auth");
const homeroute=require("./routes/home");
const passport = require('passport');
const localstrategy = require('passport-local');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const ejsMate = require('ejs-mate');
const axios = require('axios'); // Import axios
const { isLoggedIn } = require('./middleware');

const Movie = require('./models/movie');
const Playlist = require('./models/playlist');

app.engine('ejs', ejsMate);
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/moviesdb')
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log(err);
    });
let dbURL = 'mongodb://127.0.0.1:27017/moviesdb';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

const User = require('./models/user');
let secret = 'weneedabettersecretkey';

let store = MongoStore.create({
    secret: secret,
    mongoUrl: dbURL,
    touchAfter: 24 * 60 * 60
})
const sessionConfig = {
    store: store,
    name: 'ojoio',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 1,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new localstrategy(User.authenticate()));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})
app.use(methodOverride('_method'));

app.use(authRoute)
app.use(homeroute);



const OMDB_API_KEY = '61a97da2'; // Your actual API key

app.get('/search', async (req, res) => {
    try {
        const searchQuery = req.query.q; // Accessing query parameters from the request
        const apiUrl = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(searchQuery)}`;
        const response = await axios.get(apiUrl); // Use axios to get the data from OMDB API
        const searchData = response.data; // Get the data from the response
        res.render('search-results', { searchData });
    } catch (error) {
        console.error('Error fetching data from OMDB API:', error);
        res.status(500).send('Internal Server Error');
    }
});
// app.post('/add-movie', async (req, res) => {
//     try {
//         const { title, year, type, poster } = req.body;
//         const newMovie = new Movie({ title, year, type, poster });
//         await newMovie.save();
//         res.redirect('/home'); // Redirect to the home page after adding the movie
//     } catch (error) {
//         console.error('Error adding movie:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });


// // routes/home.js or the main route file


// app.get('/home', async (req, res) => {
//     const movies = await Movie.find({});
//     res.render('home', { movies });
// });

// // Add movie route
// app.post('/add-movie', async (req, res) => {
//     const { title, year, type, poster } = req.body;
//     // 
    
//     res.redirect('/home');
// });



// In index.js
// In index.js
// app.get('/home', async (req, res) => {
//     try {
//         const movies = await Movie.find({});
//         console.log(movies);
//         res.render('home', { movies:movies }); // Pass the movies variable to the template
//     } catch (error) {
//         console.error('Error fetching movies:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// 

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})
