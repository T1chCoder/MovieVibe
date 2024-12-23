const bcrypt = require('bcrypt');
const db = require('../config/database');

const Video = {
  create: async (video) => {
    const query = `INSERT INTO videos (video) VALUES (?)`;

    return new Promise((resolve, reject) => {
      db.query(query, [video], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertUUID);
      });
    });
  },

  findByUUID: (uuid) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM videos WHERE uuid = ?';
      db.query(query, [uuid], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null);
        resolve(results[0]);
      });
    });
  },

  findAll: async () => {
    const query = 'SELECT * FROM videos';
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  update: async (uuid, video) => {
    const query = 'UPDATE videos SET video = ?, WHERE uuid = ?';

    return new Promise((resolve, reject) => {
      db.query(query, [video, uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },

  delete: async (uuid) => {
    const query = 'DELETE FROM videos WHERE uuid = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },
};

module.exports = Video;
