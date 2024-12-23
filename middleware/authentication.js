const jwt = require('jsonwebtoken');
const dotenv = require('../config/env');
const User = require('../models/user');
const secret = process.env.JWT_SECRET;

const authenticated = (req, res, next) => {
    req.is_authorized = false;
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const user = await User.findById(decoded.id);
        if (user.is_active === 1) {
            req.is_authorized = true;
            req.user = decoded;
            return next();
        }
        res.status(401).json({ message: "User banned", redirectTo: '/log-out'})
    });
};

module.exports = authenticated;