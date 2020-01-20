const validateWritingLinks = ({ res, url, text }) => {
  const errors = {};
  if (!url) {
    errors.url = 'url required'
  }

  if (!text) {
    errors.text = 'Text required'
  }

  if (!url || !text) {
    return res.status(400).json({ errors });
  }
}

module.exports = validateWritingLinks;

