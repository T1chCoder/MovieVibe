const bcrypt = require('bcrypt');
const db = require('../config/database');

const Review = {
  create: async (content_id, sender_id, comment) => {
    const query = `INSERT INTO reviews (content_id, sender_id, comment) VALUES (?, ?, ?)`;

    return new Promise((resolve, reject) => {
      db.query(query, [content_id, sender_id, comment], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertUUID);
      });
    });
  },

  findByUUID: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM reviews WHERE uuid = ?';
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null);
        resolve(results[0]);
      });
    });
  },

  findAll: async () => {
    const query = 'SELECT * FROM reviews';
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  update: async (id, content_id, sender_id, comment) => {
    const query = 'UPDATE reviews SET content_id = ?, sender_id = ?, comment = ?, WHERE uuid = ?';

    return new Promise((resolve, reject) => {
      db.query(query, [content_id, sender_id, comment, uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },

  delete: async (id) => {
    const query = 'DELETE FROM reviews WHERE uuid = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },
};

module.exports = Review;
