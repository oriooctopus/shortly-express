const utils = require('../lib/hashUtils');
const Model = require('./model');

// Write you session database model methods here

class Sessions extends Model {

  addSession(browser) {
    var newHash = utils.encrypt(String(Math.random()));
    // adds to the database
    var newSess = { hash: newHash };
    console.log('this is the broser', browser);
    this.create({ hash: newHash, browser: browser });
    // returns what was added!
    return newSess;
  }

  checkSession(hash) {

  }


}

module.exports = new Sessions('sessions');