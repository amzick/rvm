const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const plays = require('./routes/api/plays');
// const Config = require('./config');

const app = express();

// bodyParser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// cookie-parser for server side auth
app.use(cookieParser());

// initialize app configuration
// const config = new Config();

// DB Config
const db = require('./config/keys').MONGO_URI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => 'MongoDB successfully connected')
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/plays', plays);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port}!`));