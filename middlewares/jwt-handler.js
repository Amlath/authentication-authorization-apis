const { verifyToken } = require('../utils/jwt-helper');
const { getUserRoleByUserId } =require('../repositories/users-repositories');

const verifyTokenHandler = async(req, res, next) => {
  let token = req.headers['authorization'];
  if(token && token.includes('Bearer')){
    verifyToken(token).then((result) => {
      const user_id = result.user_id;
      req.user_id = user_id;
      next();
    }).catch((error) => {
      res.status(401).json({message: 'Invalid token'})
    })
  } else res.status(401).json({message: 'No token provided'});
}

const verifyRole = (roles) => {
  return async(req, res, next) => {
    const user_id = req.user_id;
    const user_roles = await getUserRoleByUserId(user_id);
    let has_Role = false;
    for(let user_role of user_roles){
      if(roles.includes(user_role.role_name)) {
        has_Role = true;
        break;
      }
    }
    if(has_Role) next();
    else res.status(403).json({message: 'You do not have the access'})
  }  
}

module.exports = {
  verifyTokenHandler,
  verifyRole
}