/*
generating the correct regex for the mongo lookup
https://stackoverflow.com/questions/24486882/ignore-special-characters-before-match-conditions
*/
function convertTitleToRegExp(title) {
  return new RegExp(
    title
      .split('')
      .join('[^a-zA-Z\d]*')
  , 'i');
}

function convertTitleToUrl (title) {
  return title
    .replace(/[.,\/#!$%\^@&\*;:{}=\-_`~()]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

function convertUrlToTitle (url) {
  return url
    .split('-')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};

module.exports = {
  convertTitleToRegExp,
  convertTitleToUrl,
  convertUrlToTitle
}