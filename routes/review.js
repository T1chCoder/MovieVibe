const express = require('express');
const router = express.Router();
const dotenv = require('../config/env');
const Review = require('../models/review');

router.post('/', async (req, res) => {
  const { content_id, sender_id, comment } = req.body;

  try {
    const reviewUUID = await Review.create(content_id, sender_id, comment);
    
    res.status(201).json({ uuid: reviewUUID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:uuid', async (req, res) => {
  const { uuid } = req.params;
  
  try {
    const review = await Review.findByUUID(uuid);
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:uuid', async (req, res) => {
  const { uuid } = req.params;
  const { content_id, sender_id, comment } = req.body;

  try {
    const affectedRows = await Review.update(uuid, content_id, sender_id, comment);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:uuid', async (req, res) => {
  const { uuid } = req.params;

  try {
    const affectedRows = await Review.delete(uuid);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
    });

    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;