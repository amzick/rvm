const User = require('../models/User');

module.exports = function (sessionToken) {
  if (!sessionToken) {
    return false;
  }

  User.findOne({ sessionToken }).then(user => {
    if (!user) {
      return false;
    }
  })

  return true;
}
