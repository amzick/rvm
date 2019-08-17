const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const Config = require('./config');

const app = express();

// bodyParser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// initialize app configuration
// const config = new Config();

// DB Config
const db = require('./config/keys').MONGO_URI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => 'MongoDB successfully connected')
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port}!`));