const db = require('../config/database');
const authenticated = require('./authentication');
const User = require('../models/user');

const authorized = (requiredRole) => {
  return [authenticated, async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (user.is_staff === 1) {
      if (requiredRole === 'SUPERUSER' && user.is_superuser === 1) {
        return next();
      } else if (requiredRole === 'STAFF') {
        return next();
      }
    }
    res.status(403).json({ message: 'Forbidden' });
  }];
};

module.exports = authorized;