const { isEmpty } = require('lodash');

// rough image verification
// https://stackoverflow.com/questions/9714525/javascript-image-url-verify

function checkImageUrl(url) {
  return ((url.match(/\.(jpeg|jpg|gif|png)$/) != null));
}

function checkVideoUrl(url) {
  return ((url.match(/(youtube|vimeo)/) != null));
}

// this modifies body to make sure type is an object because i'm lazy
module.exports = function validatePlayInput(body) {
  const errors = {};
  const {
    title = '',
    playwright = '',
    location = '',
    date = undefined,
    about = '',
    images = [],
    videos = [],
    types = {},
    press = []
  } = body;

  ['title', 'playwright', 'location', 'date', 'about', 'images', 'types'].forEach(field => {
    if (isEmpty(body[field])) {
      errors[field] = (field !== 'images')
        ? `${field} is required`
        : 'at least one image is required'
    }
  });

  if (!(Date.parse(date))) {
    errors.date = 'Please enter a valid date';
  }

  if (!images.every(checkImageUrl)) {
    errors.images = 'At least one of your image urls is not a valid file type. Must be jpeg, jpg, gif or png';
  }

  if (!videos.every(checkVideoUrl)) {
    errors.videos = 'Videos must be from Youtube or Vimeo';
  }

  press.forEach(review => {
    if (isEmpty(review.publication)) {
      errors.press = 'You need to enter at least a reviewer or publication name'
    } else if (isEmpty(review.url) && isEmpty(review.quote)) {
      errors.press = `To enter a review you need either a quotation or a link to the review along with the publication name for ${review.publication}`
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  }
}