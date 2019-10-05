// const { Strategy, ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

/* 
passport: https://www.npmjs.com/package/passport
http://www.passportjs.org/packages/passport-jwt/?source=post_page-----c405048e3669----------------------
*/

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey
};

module.exports = function (passport) {
  passport.use(
    new JwtStrategy(options, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
}