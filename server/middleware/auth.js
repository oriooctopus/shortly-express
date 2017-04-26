const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

  models.Sessions.get({ hash: req.cookies.shortlyid })
  // if database has correct reference
  .then((data) => {
    if (data === undefined) {
      throw '';
    }
    if (data.browser !== req.headers['user-agent']) {
      models.Sessions.delete({ hash: req.cookies.shortlyid })
      throw '';
    }

    req.session = { hash: data.hash };
    if (data.user_id) {
      req.session.user_id = data.user_id;
      models.Users.get({ id: data.user_id })

      .then(query => {
        req.session.username = query.username;
        next();
      });

    } else {
      next();
    }
  })
  
  .catch(() => {
    var newSession = models.Sessions.addSession(req.headers['user-agent']);
    req.session = newSession;
    req.browser = req.headers['user-agent'];

    res.cookies.shortlyid = {value: newSession.hash};
    setTimeout(function() {
      next()
    }, 100);
  });

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.checkValidity = (req, res, next) => {

  if (req.cookies.shortlyid === undefined) {
    this.createSession(req, res, next);
    next();
  }
}