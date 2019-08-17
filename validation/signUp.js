const { isEmpty } = require('lodash');

module.exports = function validateSignUpInput({username = '', password = '', password2 = ''}) {
  const errors = {};

  // check username
  if (isEmpty(username)) {
    errors.username = "Username is required";
  }

  // check passwords
  if (isEmpty(password)) {
    errors.password = "Password is required";
  }

  if (isEmpty(password2)) {
    errors.password2 = "Must confirm matching passwords";
  }

  if (password !== password2) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}