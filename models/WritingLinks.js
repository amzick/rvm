/*
  - text
  - link
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WritingLinksSchema = new Schema({
  links: [
    {
      section: {
        type: String,
        require: false
      },
      text: {
        type: String,
        require: true
      },
      url: {
        type: String,
        require: true
      }
    }
  ]
});

module.exports = WritingLinks = mongoose.model('writingLinks', WritingLinksSchema);