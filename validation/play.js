const { isEmpty } = require('lodash');

// rough image verification
// https://stackoverflow.com/questions/9714525/javascript-image-url-verify

function checkImageUrl(url) {
  return ((url.match(/\.(jpeg|jpg|gif|png)$/) != null));
}

module.exports = function validatePlayInput({
  title = '',
  playwright = '',
  location = '',
  date = undefined,
  about = '',
  images = [],
  types = {},
  press = []
}) {
  const errors = {};

  [title, playwright, location, date, about, types].forEach(field => {
    if (isEmpty(field)) {
      errors[field] = (field === 'images')
        ? `${field} is required`
        : 'at least one image is required'
    }
  });

  if (!(date instanceof Date)) {
    errors.date = 'Date must be a js date type'
  }

  if (!images.every(checkImageUrl)) {
    errors.images = 'At least one of your image urls is not a valid file type. Must be jpeg, jpg, gif or png';
  }

  press.forEach(review => {
    if (isEmpty(review.publication)) {
      errors.press = 'You need to enter at least a reviewer or publication name'
    } else if (isEmpty(review.url) || isEmpty(review.quote)) {
      errors.press = 'To enter a review you need either a quotation or a link to the review along with the publication name'
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  }
}