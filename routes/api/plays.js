const express = require('express');
const router = express.Router();

const validatePlayInput = require('../../validation/play');
const isAuthorized = require('../../validation/isAuthorized');

const Play = require('../../models/Play');

router.get('/', (req, res) => {
  Play.find({}, function(_, plays) {
    res.json({ plays });
  });
});

router.post('/', (req, res) => {
  // todo: dry this up
  const { session: sessionToken } = req.cookies;
  if (!isAuthorized(sessionToken)) {
    return res.status(401).json({ error: 'Forbidden' });
  }

  const { errors, isValid } = validatePlayInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPlay = new Play(req.body);
  newPlay.save()
    .then(play => res.json({ play }))
    .catch((error) => {
      res.status(400).json({ error: error.errors })
    })
});

router.patch('/:id', (req, res) => {
  // todo: dry this up
  const { session: sessionToken } = req.cookies;
  if (!isAuthorized(sessionToken)) {
    return res.status(401).json({ error: 'Forbidden' });
  }

  const { id: _id } = req.params;
  if (!_id) {
    return res.status(400).json({ error: 'need an _id param to search plays db' });
  }
  Play.findOne({ _id })
    .then(play => {
      if (!play) {
        return res.status(404).json({ error: 'could not find a play with that id' });
      }

      const { errors, isValid } = validatePlayInput(req.body);

      if (!isValid) {
        return res.status(400).json({ errors });
      }

      for(key in req.body) {
        play[key] = req.body[key];
      }
      play.save()
        .then(play => {
          return res.status(200).json({ play });
        })
        .catch(errors => res.status(400).json({ errors }));
    })
    .catch((error) => {
      console.log('error ////', error);
      res.status(400).json({ error: 'something went wrong while patching' });
    });
});

router.delete('/:id', (req, res) => {
  // todo: dry this up
  const { session: sessionToken } = req.cookies;
  if (!isAuthorized(sessionToken)) {
    return res.status(401).json({ error: 'Forbidden' });
  }

  const { id: _id } = req.params;
  if (!_id) {
    return res.status(400).json({ error: 'need an _id param to search plays db' });
  }
  Play.findOne({ _id })
    .then(play => {
      if (!play) {
        return res.status(404).json({ error: 'could not find a play with that id' });
      }
      Play.deleteOne(play)
        .then(play => {
          return res.status(200).json({ play });
        })
        .catch(errors => res.status(400).json({ errors }));
    })
    .catch((error) => {
      console.log('error ////', error);
      res.status(400).json({ error: 'something went wrong while deleting - you probably passed a bad id' });
    });
});

module.exports = router;