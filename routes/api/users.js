const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretOrKey = process.env.SECRET_OR_KEY;

// load input validation
const validateSignUpInput = require('../../validation/signUp');
const validateLoginInput = require('../../validation/login');
const isAuthorized = require('../../validation/isAuthorized');

// Load User Model
const User = require('../../models/User');

/* why I don't like this:
the tutorial didn't have the creation of the user extracted to its own function
I tried to do this but since .save() is returning a promise I have to handle it
within the createNewUser function, and I feel like the createNewUser function should be doing one thing
*/
function createNewUser ({ username, password }, res) {  //this sucks
  const newUser = new User({ username, password, sessionToken: bcrypt.genSaltSync() });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => {
          return res.json({
            username: user.username
          })
        })
        .catch(err => console.log(err))
    });
  })
}

// @route POST api/users/signup
// @desc Sign Up user
// @access Public
router.post('/signup', (req, res) => {
  // I don't want anyone to be able to create an account
  // didn't like returning the res out of the helper function for some reason ?
  // todo: dry this up
  const { session: sessionToken } = req.cookies;
  if (!isAuthorized(sessionToken)) {
    return res.status(401).json({ error: 'Forbidden' });
  }

  const { errors, isValid } = validateSignUpInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { username } = req.body;

  User.findOne({ username })
    .then(user => {
      if (user) {
        return res.status(400).json({ username: "Username already exists" })
      } else {
        createNewUser(req.body, res);
      }
    })
})

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { username, password } = req.body;

  // Find user by username
  User.findOne({ username }).then(user => {
    // check user exists
    if (!user) {
      return res.status(404).json({ username: "Username not found"});
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //create jwt payload
        const payload = {
          id: user.id,
          username: user.username
        };

        // update user session token, save, and on success login
        const newSessionToken = bcrypt.genSaltSync();
        user.sessionToken = newSessionToken;
        user.save()
        .then(() => {
          // save cookie
          res.cookie('session', newSessionToken);
          //sign token
          jwt.sign(
            payload,
            secretOrKey,
            { expiresIn: 31556926 },
            (err, token) => res.json({ success: true, token: `Bearer ${token}`})
          )
        })
        .catch(console.log);
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    })
  })
})

router.delete('/delete', (req, res) => {
  const { username, password } = req.body;

  // find by username
  User.findOne({ username })
    .then(user => {
      // confirm user
      if (!user) {
        return res.status(404).json({ username: "Username not found"});
      }

      // check pass word
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          User.deleteOne(user)
            .then(query => res.json(query))
            .catch(console.log)
        } else {
          return res.status(400).json({ password: "Password incorrect" })
        }
      })
    })
})

module.exports = router;