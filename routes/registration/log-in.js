const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/database');
const dotenv = require('../../config/env');
const secret = process.env.JWT_SECRET;

router.post("/", (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (user.is_active === 1) {
            const token = jwt.sign({ id: user.id, username: user.username }, secret, {
                expiresIn: '1h',
            });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000
            });
            res.json({ token });
        }
        else {
            res.status(401).json({message: 'User banned'});
        }
    });
});

module.exports = router;