var bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);

function hashPassword(password) {
  var hash = bcrypt.hashSync(password, salt);
  return hash;
}

function comparePassword(plain_password, hashed_password) {
  var isMatch = bcrypt.compareSync(plain_password, hashed_password);
  return isMatch;
}

module.exports = {
  hashPassword,
  comparePassword
}