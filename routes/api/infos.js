const express = require('express');
const router = express.Router();
const isAuthorized = require('../../validation/isAuthorized');
const Info = require('../../models/Info');

router.get('/:username', (req, res) => {
  const { username } = req.params;
  Info.findOne({ username }, function(_, info) {
    res.json({ info });
  });
});

router.post('/', (req, res) => {
  const { session: sessionToken } = req.cookies;
  if (!isAuthorized(sessionToken)) {
    return res.status(401).json({ error: 'Forbidden' });
  }

  const newInfo = new Info(req.body);
  newInfo.save()
    .then(info => res.json({ info }))
    .catch((error) => {
      res.status(400).json({ error: error.errors })
    });
});

router.patch('/:username', (req, res) => {
  // todo: dry this up
  const { session: sessionToken } = req.cookies;
  if (!isAuthorized(sessionToken)) {
    return res.status(401).json({ error: 'Forbidden' });
  }

  const { username } = req.params;
  Info.findOne({ username })
    .then((info) => {
      for (key in req.body) {
        info[key] = req.body[key];
      }
      info.save()
        .then(info => {
          return res.status(200).json({ info })
        })
        .catch(errors => res.status(400).json({ errors }));
    })
    .catch(error => {
      console.log('error ////', error);
      res.status(400).json({ error: 'something went wrong while patching info' });
    });
});

module.exports = router;