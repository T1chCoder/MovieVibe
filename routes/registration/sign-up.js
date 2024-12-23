const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)';
    id = uuidv4();
    db.query(query, [id, username, email, hashedPassword], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "User registered successfully" })
    });
});

module.exports = router;