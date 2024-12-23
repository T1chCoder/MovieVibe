const express = require('express');
const router = express.Router();
const dotenv = require('../config/env');
const Comment = require('../models/comment');

router.post('/', async (req, res) => {
  const { video_id, sender_id, text, likes } = req.body;

  try {
    const commentUUID = await Comment.create(video_id, sender_id, text, likes);
    
    res.status(201).json({ uuid: commentUUID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:uuid', async (req, res) => {
  const { uuid } = req.params;
  
  try {
    const comment = await Comment.findByUUID(uuid);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:uuid', async (req, res) => {
  const { uuid } = req.params;
  const { video_id, sender_id, text, likes } = req.body;

  try {
    const affectedRows = await Comment.update(uuid, video_id, sender_id, text, likes);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json({ message: 'Comment updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:uuid', async (req, res) => {
  const { uuid } = req.params;

  try {
    const affectedRows = await Comment.delete(uuid);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
    });

    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;