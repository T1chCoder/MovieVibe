const express = require('express');
const router = express.Router();
const dotenv = require('../../config/env');

router.post("/", (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0
    });
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;