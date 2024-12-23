const express = require('express');
const router = express.Router();
const dotenv = require('../config/env');
const Content = require('../models/content');

router.post('/', async (req, res) => {
  const { title, poster, cinematography, country, language, budget, box_office, release_date, release_location, is_movie } = req.body;

  try {
    const contentUUID = await Content.create(title, poster, cinematography, country, language, budget, box_office, release_date, release_location, is_movie);
    
    res.status(201).json({ uuid: contentUUID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:uuid', async (req, res) => {
  const { uuid } = req.params;
  
  try {
    const content = await Content.findByUUID(uuid);
    
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const contents = await Content.findAll();
    res.json(contents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:uuid', async (req, res) => {
  const { uuid } = req.params;
  const { title } = req.body;

  try {
    const affectedRows = await Content.update(uuid, title);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json({ message: 'Content updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:uuid', async (req, res) => {
  const { uuid } = req.params;

  try {
    const affectedRows = await Content.delete(uuid);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
    });

    res.json({ message: 'Content deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;