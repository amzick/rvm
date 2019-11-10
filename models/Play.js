/*
  - title (becomes url)
  - playwright
  - show location
  - show date (will determine year which is part of url)
  - about (rem enters whatever)
  - images (array of private imgur links)
  - type: plays / youth / dramaturg
  - press (reviews): array of objects with links with optional quote

  USING OBJECTS IN MONGOOSE
  https://stackoverflow.com/questions/42019679/object-type-in-mongoose
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const PlaySchema = new Schema({
  title: {
    type: String,
    require: true
  },
  playwright: {
    type: String,
    require: true
  },
  location: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    require: true
  },
  about: {
    type: String,
    require: true
  },
  images: {
    type: [String],
    require: true
  },
  types: {
    isPlay: {
      type: Boolean,
      require: true,
      default: true
    },
    isWriting: {
      type: Boolean,
      require: true,
      default: false
    },
    isYouth: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  press: [{
    publication: {
      type: String,
      required: true
    },
    url: String,
    quote: String
  }]
});

module.exports = Play = mongoose.model('plays', PlaySchema);