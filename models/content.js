const bcrypt = require('bcrypt');
const db = require('../config/database');

const Content = {
  create: async (title, poster, cinematography, country, language, budget, box_office, release_date, release_location, is_movie) => {
    const query = `INSERT INTO contents (title, poster, cinematography, country, language, budget, box_office, release_date, release_location, is_movie) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
      db.query(query, [title, poster, cinematography, country, language, budget, box_office, release_date, release_location, is_movie], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertUUID);
      });
    });
  },

  findByUUID: (uuid) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM contents WHERE uuid = ?';
      db.query(query, [uuid], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null);
        resolve(results[0]);
      });
    });
  },

  findAll: async () => {
    const query = 'SELECT * FROM contents';
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  update: async (uuid, title) => {
    const query = 'UPDATE contents SET title = ?, WHERE uuid = ?';

    return new Promise((resolve, reject) => {
      db.query(query, [title, uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },

  delete: async (uuid) => {
    const query = 'DELETE FROM contents WHERE uuid = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },
};

module.exports = Content;
