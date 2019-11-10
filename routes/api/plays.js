const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');

const validatePlayInput = require('../../validation/play');
const isAuthorized = require('../../validation/isAuthorized');

const Play = require('../../models/Play');

router.get('/', (req, res) => {
  Play.find({}, function(_, plays) {
    res.json({ plays });
  })
})

router.post('/', (req, res) => {
  // const { sessionToken } = req.cookies;
  // if (!isAuthorized(sessionToken)) {
  //   return res.status(401).send('Forbidden');
  // }

  try {
    JSON.parse(req.body.types);
  }
  catch {
    return res.status(400).json({ types: 'types not valid js object' });
  }
  
  // just lazy. sending objects in postman is a pain so parsing a string is fine
  req.body.types = JSON.parse(req.body.types);

  try {
    req.body.press.forEach(JSON.parse);
  }
  catch {
    return res.status(400).json({ press: 'some of your press objects are not formatted correctly '})
  }
  req.body.press = req.body.press.map(JSON.parse);

  const { errors, isValid } = validatePlayInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { title } = req.body;
  Play.findOne({ title })
    .then(play => {
      if (play) {
        return res.status(400).json({ play: 'Play already exists' });
      } else {
       const newPlay = new Play(req.body);
       newPlay.save()
        .then(play => res.json({ play }))
        .catch(() => res.status(400).json({ error: 'something went wrong somewhere' }))
      }
    })
})

// router.patch
// router.delete

module.exports = router;