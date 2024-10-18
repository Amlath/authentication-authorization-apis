const userRepositories = require('../repositories/users-repositories.js');
const ErrorResponse = require('../utils/error-response.js');
const asyncHandler = require('../middlewares/async-handler.js');
const { createJWT } = require('../utils/jwt-helper.js');
const { comparePassword } = require('../utils/password-helper.js');

//@desc = Create new user
//@route = POST /api/auth/signup 
//@access = public
const registerUser = asyncHandler(async(req, res, next) => {
  const { firstname, lastname, dob, place, city, district, state, email, phone, password } = req.body;
  const user = await userRepositories.getUserByUsername(firstname);
  if(user && user.length > 0) {
    return next(new ErrorResponse(`Username ${firstname} already exists`, 400));
  }
  const user_id = await userRepositories.registerUser(firstname, lastname, dob, place, city, district, state, email, phone, password);
  const token = createJWT(user_id);
  if(user_id)
    res.status(201).json({success: true, data: {message: "Successfully created new user", token: token}});
});

//@desc = User login
//@route = POST /api/auth/login
//@access = public
const login = asyncHandler(async(req, res, next) => {
  const { username, password } = req.body;
  const users = await userRepositories.getUserByUsername(username);
  if(!users || users.length == 0) {
    return next(new ErrorResponse(`Invalid credentials`, 400));
  }
  const user = users[0];
  const isValid = comparePassword(password, user.user_password);
  if(isValid) {
    const token = createJWT(user.user_id);
    return res.status(200).json({message: "Logged in successfully", user: {username: username}, token: token});
  }
  return next(new ErrorResponse(`Invalid credentials`, 400));
});

module.exports = {
  registerUser,
  login
};