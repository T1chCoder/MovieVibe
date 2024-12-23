const express = require('express');
const router = express.Router();
const dotenv = require('../config/env');
const User = require('../models/user');

router.post('/', async (req, res) => {
  const { username, name, patronymic, surname, email, password, photo, gender, birthday, is_user, is_actor, is_director, is_producer, is_staff, is_superuser } = req.body;

  try {
    const userUUID = await User.create(username, name, patronymic, surname, email, password, photo, gender, birthday, is_user, is_actor, is_director, is_producer, is_staff, is_superuser);
    
    res.status(201).json({ uuid: userUUID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:uuid', async (req, res) => {
  const { uuid } = req.params;
  
  try {
    const user = await User.findByUUID(uuid);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:uuid', async (req, res) => {
  const { uuid } = req.params;
  const { username, email, password } = req.body;

  try {
    const affectedRows = await User.update(uuid, username, email, password);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:uuid', async (req, res) => {
  const { uuid } = req.params;

  try {
    const affectedRows = await User.delete(uuid);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
    });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;