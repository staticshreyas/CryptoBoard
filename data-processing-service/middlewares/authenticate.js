// middlewares/authenticate.js

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) return res.status(401).send('No token, authorization denied');

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).send('Token is not valid');
  }
};
