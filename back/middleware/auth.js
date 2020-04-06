const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  let decoudedToken;
  try {
    decoudedToken = jwt.verify(token, 'secret');
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decoudedToken) {
    req.isAuth = false;
    return next();
  }
  req.userId = decoudedToken.userId;
  req.isAuth = true;
  next();
};
