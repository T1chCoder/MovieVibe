const express = require('express');
const router = express.Router();
const dotenv = require('../config/env');
const Profile = require('../models/profile');

router.post('/', async (req, res) => {
  const { user_id, language } = req.body;

  try {
    const ProfileUUID = await Profile.create(user_id, language);
    
    res.status(201).json({ uuid: profileUUID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:uuid', async (req, res) => {
  const { uuid } = req.params;
  
  try {
    const profile = await Profile.findByUUID(uuid);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const user_profiles = await Profile.findAll();
    res.json(user_profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:uuid', async (req, res) => {
  const { uuid } = req.params;
  const { user_id, language } = req.body;

  try {
    const affectedRows = await Profile.update(uuid, user_id, language);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:uuid', async (req, res) => {
  const { uuid } = req.params;

  try {
    const affectedRows = await Profile.delete(uuid);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
    });

    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;