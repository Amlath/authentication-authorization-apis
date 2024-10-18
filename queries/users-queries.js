const SignUp = 'INSERT INTO Users (user_firstname, user_lastname, user_dob, user_place, user_city, user_district, user_state, user_email,user_phone, user_password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING user_id;';
const GetUserByUsername = 'SELECT user_id, user_firstname, user_password FROM Users WHERE user_firstname = $1;';
const GetUserByUserId = 'SELECT user_id, user_firstname, user_password FROM Users WHERE user_id = $1;';
const GetUserRoleByUserId = 'SELECT r.role_name FROM Roles r INNER JOIN UserRole ur ON ur.role_id = r.role_id WHERE ur.user_id = $1';

module.exports = {
  SignUp,
  GetUserByUsername,
  GetUserByUserId,
  GetUserRoleByUserId
};