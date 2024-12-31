const express = require('express');
const router = express.Router();
const dotenv = require('../config/env');
const Genre = require('../models/genre');

router.post('/', async (req, res) => {
  const { title } = req.body;

  try {
    const genreUUID = await Genre.create(title);
    
    res.status(201).json({ uuid: genreUUID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:uuid', async (req, res) => {
  const { uuid } = req.params;
  
  try {
    const genre = await Genre.findByUUID(uuid);
    
    if (!genre) {
      return res.status(404).json({ error: 'Genre not found' });
    }
    
    res.json(genre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:uuid', async (req, res) => {
  const { uuid } = req.params;
  const { title } = req.body;

  try {
    const affectedRows = await Genre.update(uuid, title);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Genre not found' });
    }

    res.json({ message: 'Genre updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:uuid', async (req, res) => {
  const { uuid } = req.params;

  try {
    const affectedRows = await Genre.delete(uuid);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Genre not found' });
    }

    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
    });

    res.json({ message: 'Genre deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;