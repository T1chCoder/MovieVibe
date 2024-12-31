const bcrypt = require('bcrypt');
const db = require('../config/database');

const Genre = {
  create: async (title) => {
    const query = `INSERT INTO genres (title) VALUES (?)`;

    return new Promise((resolve, reject) => {
      db.query(query, [title], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertUUID);
      });
    });
  },

  findByUUID: (uuid) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM genres WHERE uuid = ?';
      db.query(query, [uuid], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null);
        resolve(results[0]);
      });
    });
  },

  findAll: async () => {
    const query = 'SELECT * FROM genres';
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  update: async (uuid, title) => {
    const query = 'UPDATE genres SET title = ?, WHERE uuid = ?';

    return new Promise((resolve, reject) => {
      db.query(query, [title, uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },

  delete: async (uuid) => {
    const query = 'DELETE FROM genres WHERE uuid = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },
};

module.exports = Genre;
