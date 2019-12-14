/*
  - manifesto
  - bio
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  manifesto: {
    type: String,
    require: true
  },
  bio: {
    type: String,
    require: true
  }
});

module.exports = Info = mongoose.model('info', InfoSchema);