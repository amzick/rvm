const express = require('express');
const router = express.Router();
const isAuthorized = require('../../validation/isAuthorized');
const WritingLinks = require('../../models/WritingLinks');
const validateWritingLinks = require('../../validation/writingLink');

// postman array of objects
// https://stackoverflow.com/questions/44270322/how-can-i-post-array-of-objects-in-postman-in-nodejs

router.get('/', (_, res) => {
  WritingLinks.findOne({}, function(_, writingLinks) {
    res.json({ writingLinks })
  });
});

// my initial approach was to handle each link individually but now just editing the one array
// router.post('/', (req, res) => {
//   const { session: sessionToken } = req.cookies;
//   if (!isAuthorized(sessionToken)) {
//     return res.status(401).json({ error: 'Forbidden' });
//   }

//   const { links } = req.body;

//   if (!links) {
//     return res.status(400).json({ errors: 'No Links found' });
//   }
//   links.forEach((link) => validateWritingLinks({ res, ...link }));

//   const newWritingLinks = new WritingLinks({ links });
//   newWritingLinks.save()
//     .then(writingLinks => res.json({ writingLinks }))
//     .catch((error) => {
//       res.status(400).json({ error: error.errors })
//     });
// });

router.patch('/:id', (req, res) => {
  // todo: dry this up
  const { session: sessionToken } = req.cookies;
  if (!isAuthorized(sessionToken)) {
    return res.status(401).json({ error: 'Forbidden' });
  }
  const { id: _id } = req.params;

  if (!_id) {
    return res.status(400).json({ error: 'need an _id param to search db' });
  }
  
  const { links } = req.body;

  links.forEach(link => validateWritingLinks({ res, ...link }));
  
  WritingLinks.findOne({ _id })
    .then((writingLinks) => {
      writingLinks.links = links;
      writingLinks.save()
        .then(writingLinks => {
          return res.status(200).json({ writingLinks })
        })
        .catch(errors => res.status(400).json({ errors }));
    })
    .catch(error => {
      console.log('error ////', error);
      res.status(400).json({ error: 'something went wrong while patching writing links' });
    });
});

// router.delete('/:id', (req, res) => {
//   // todo: dry this up
//   const { session: sessionToken } = req.cookies;
//   if (!isAuthorized(sessionToken)) {
//     return res.status(401).json({ error: 'Forbidden' });
//   }

//   const { id: _id } = req.params;
//   if (!_id) {
//     return res.status(400).json({ error: 'need an _id param to search db' });
//   }

//   WritingLinks.findOne({ _id })
//     .then(writingLink => {
//       if (!writingLink) {
//         return res.status(404).json({ error: 'could not find a writing link with that id' });
//       }
//       WritingLinks.deleteOne(writingLink)
//         .then(writingLink => {
//           return res.status(200).json({ writingLink });
//         })
//         .catch(errors => res.status(400).json({ errors }));
//     })
//     .catch((error) => {
//       console.log('error ////', error);
//       res.status(400).json({ error: 'something went wrong while deleting writing link - you probably passed a bad id' });
//     });
// });

module.exports = router;
