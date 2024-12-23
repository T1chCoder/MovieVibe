const bcrypt = require('bcrypt');
const db = require('../config/database');

const Profile = {
  create: async (user_id, language) => {
    const query = `INSERT INTO profiles (user_id, language) VALUES (?, ?)`;

    return new Promise((resolve, reject) => {
      db.query(query, [user_id, language], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertUUID);
      });
    });
  },

  findByUUID: (uuid) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM profiles WHERE uuid = ?';
      db.query(query, [uuid], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null);
        resolve(results[0]);
      });
    });
  },

  findAll: async () => {
    const query = 'SELECT * FROM profiles';
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  update: async (uuid, user_id, language) => {
    const query = 'UPDATE profiles SET user_id = ?, language = ?, WHERE uuid = ?';

    return new Promise((resolve, reject) => {
      db.query(query, [user_id, language, uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },

  delete: async (uuid) => {
    const query = 'DELETE FROM profiles WHERE uuid = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },
};

module.exports = Profile;