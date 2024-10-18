const jwt = require('jsonwebtoken');

var SECRET = "123456";

function createJWT(user_id) {
  var token = jwt.sign({user_id: user_id}, SECRET);
  return token;
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    const formatted_token = token.replace('Bearer ', '');
    jwt.verify(formatted_token, SECRET, (error, decoded) => {
      if(error) return reject({valid: false, error: error});
      return resolve({valid: true, user_id: decoded.user_id});
    })
  })  
}

module.exports = {
  createJWT,
  verifyToken
};