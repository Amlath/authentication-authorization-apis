const pool = require('../config/database');
const { SignUp, GetUserByUsername, GetUserByUserId, GetUserRoleByUserId } = require('../queries/users-queries');
const { hashPassword } = require('../utils/password-helper');

const registerUser = (firstname, lastname, dob, place, city, district, state, email, phone, password) => {
  const hashedPassword = hashPassword(password);
  return new Promise((resolve, reject) => {
    pool.query(SignUp, [firstname, lastname, dob, place, city, district, state, email, phone, hashedPassword], (error, results) => {
      if(error) reject(error);
      else {
        const user_id = results.rows ? results.rows[0].user_id : undefined;
        resolve (user_id)
      } 
    })
  })
}

const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(GetUserByUsername, [username], (error, results) => {
      if(error) reject(error);
      else resolve(results.rows);
    })
  })  
}

const getUserByUserId = (userid) => {
  return new Promise((resolve, reject) => {
    pool.query(GetUserByUserId, [userid], (error, results) => {
      if(error) reject(error);
      else resolve(results.rows);
    })
  })  
}

const getUserRoleByUserId = (userid) => {
  return new Promise((resolve, reject) => {
    pool.query(GetUserRoleByUserId, [userid], (error, results) => {
      if(error) reject(error);
      else resolve(results.rows);
    })
  })  
}

module.exports = {
  registerUser,
  getUserByUsername,
  getUserByUserId,
  getUserRoleByUserId
};