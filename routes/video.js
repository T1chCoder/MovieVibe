const express = require('express');
const router = express.Router();
const dotenv = require('../config/env');
const Video = require('../models/video');

router.post('/', async (req, res) => {
  const { video } = req.body;

  try {
    const videoUUID = await Video.create(video);
    
    res.status(201).json({ uuid: videoUUID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:uuid', async (req, res) => {
  const { uuid } = req.params;
  
  try {
    const video = await Video.findByUUID(uuid);
    
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:uuid', async (req, res) => {
  const { uuid } = req.params;
  const { video } = req.body;

  try {
    const affectedRows = await Video.update(uuid, video);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json({ message: 'Video updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:uuid', async (req, res) => {
  const { uuid } = req.params;

  try {
    const affectedRows = await Video.delete(uuid);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
    });

    res.json({ message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;