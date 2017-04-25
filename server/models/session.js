const utils = require('../lib/hashUtils');
const Model = require('./model');

// Write you session database model methods here

class Sessions extends Model {

  addSession(hash) {
    this.create({ hash: hash });
  }

  checkSession(hash) {

  }

}

module.exports = new Sessions('session');