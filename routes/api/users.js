const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// load input validation
const validateSignUpInput = require('../../validation/signUp');
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/User');

function createNewUser ({ username, password }) {
  const newUser = new User({ username, password });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err))
    });
  })
}

// @route POST api/users/signup
// @desc Sign Up user
// @access Public
router.post('/signup', (req, res) => {
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
        createNewUser(req.body);
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

        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 31556926 },
          (err, token) => res.json({ success: true, token: `Bearer ${token}`})
        )
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    })
  })
})

module.exports = router;