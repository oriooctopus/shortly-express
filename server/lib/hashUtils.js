const crypto = require('crypto'),
  algorithm = 'aes-256-ctr',
  passkey = 'd6F3Efeq';

/************************************************************/
// Add any hashing utility functions below
/************************************************************/


module.exports.encrypt = function (value, callback) {

  var cipher = crypto.createCipher(algorithm, passkey);
  var crypted = cipher.update(value, 'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;

};

module.exports.decrypt = function (value) {

  var decipher = crypto.createDecipher(algorithm, passkey);
  var dec = decipher.update(value, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec; 

};