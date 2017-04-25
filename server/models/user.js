const utils = require('../lib/hashUtils');
const Model = require('./model');

// Write you user database model methods here

//export a function 
class Users extends Model {

  usernameExists (user) {
    return this.getAll().then(function(result) {
      for (var i = 0; i < result.length; i++) {
        if (result[i].username === user) {
          return true;
        }
      }
      return false;
    });
    // var newObj = {
    //     username: data.username,
    //     password: newPassword
    // }
    // return this.get({})
  }

  addUser (data) {

    var newPassword = utils.encrypt(data.password)

    var newObj = {
      username: data.username,
      password: newPassword
    }
    return this.create(newObj);

  }

  checkCredentials (data) {


    return this.get({username: data.username})

    .then((result) => {
      if (result === undefined) {
        return false;
      }
      var newPass = utils.decrypt(result.password);
      if (data.password === newPass) {
        return true;
      } else {
        return false;
      }
    })

   
  }

};


module.exports = new Users('users');


//want it to be refernces in app moduel.

//has username and password

