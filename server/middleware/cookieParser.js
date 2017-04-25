const utils = require('../lib/hashUtils.js');

const parseCookies = (req, res, next) => {
  if (req.headers && req.headers.cookie) {
    var newHeader = {};
    req.headers.cookie = req.headers.cookie.replace(/;/g, '');
    var headerArray = req.headers.cookie.match(/\S+/g);

    headerArray.forEach((element, index) => {
      var precursor = element.replace(/=(.*)/, '');
      var hash = element.replace(/(.*)=/, '')
      newHeader[precursor] = hash;
    }) 
    req.cookies = newHeader;
    next(req, res, next);
  } else {
    next(req, res, next);
  }

};

module.exports = parseCookies;