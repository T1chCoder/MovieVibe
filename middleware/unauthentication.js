const jwt = require('jsonwebtoken');
const dotenv = require('../config/env');
const secret = process.env.JWT_SECRET;

const unauthenticated = (req, res, next) => {
    req.is_authorized = true;
    const token = req.cookies.token;
    if (!token) {
        req.is_authorized = false;
        req.user = null;
        return next();
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            req.is_authorized = false;
            req.user = null;
            return next();
        }

        res.status(403).json({ message: 'User authenticated' });
    });
};

module.exports = unauthenticated;