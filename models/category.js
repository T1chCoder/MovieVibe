const bcrypt = require('bcrypt');
const db = require('../config/database');

const Category = {
  create: async (title) => {
    const query = `INSERT INTO categories (title) VALUES (?)`;

    return new Promise((resolve, reject) => {
      db.query(query, [title], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertUUID);
      });
    });
  },

  findByUUID: (uuid) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM categories WHERE uuid = ?';
      db.query(query, [uuid], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null);
        resolve(results[0]);
      });
    });
  },

  findAll: async () => {
    const query = 'SELECT * FROM categories';
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  update: async (uuid, title) => {
    const query = 'UPDATE categories SET title = ?, WHERE uuid = ?';

    return new Promise((resolve, reject) => {
      db.query(query, [title, uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },

  delete: async (uuid) => {
    const query = 'DELETE FROM categories WHERE uuid = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },
};

module.exports = Category;
