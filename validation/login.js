const { isEmpty } = require('lodash');

module.exports = function validateLoginInput({username = '', password = ''}) {
  const errors = {};

  // username check
  if (isEmpty(username)) {
    errors.username = 'Username is required';
  }

  // password check
  if (isEmpty(password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};
