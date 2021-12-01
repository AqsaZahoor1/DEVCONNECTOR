const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-webToken');

  if (!token) {
    return res.sendStatus(401).json({ msg: 'No token , Authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.sendStatus(401).json({ msg: 'Server Error' });
  }
};
