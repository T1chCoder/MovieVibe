const bcrypt = require('bcrypt');
const db = require('../config/database');

const Comment = {
  create: async (video_uuid, sender_uuid, text, likes) => {
    const query = `INSERT INTO comments (video_uuid, sender_uuid, text, likes) VALUES (?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
      db.query(query, [video_uuid, sender_uuid, text, likes], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertUUID);
      });
    });
  },

  findByUUID: (uuid) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM comments WHERE uuid = ?';
      db.query(query, [uuid], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null);
        resolve(results[0]);
      });
    });
  },

  findAll: async () => {
    const query = 'SELECT * FROM comments';
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  update: async (uuid, video_uuid, sender_uuid, text, likes) => {
    const query = 'UPDATE comments SET video_uuid = ?, sender_uuid = ?, text = ?, likes = ?, WHERE uuid = ?';

    return new Promise((resolve, reject) => {
      db.query(query, [video_uuid, sender_uuid, text, likes, uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },

  delete: async (uuid) => {
    const query = 'DELETE FROM comments WHERE uuid = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },
};

module.exports = Comment;
