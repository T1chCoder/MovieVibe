const bcrypt = require('bcrypt');
const db = require('../config/database');

const User = {
  create: async (username, name, patronymic, surname, email, password, photo, gender, birthday, is_user, is_actor, is_director, is_producer, is_staff, is_superuser) => {
    const query = `INSERT INTO users (username, name, patronymic, surname, email, password, photo, gender, birthday, is_user, is_actor, is_director, is_producer, is_staff, is_superuser) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
      db.query(query, [username, name, patronymic, surname, email, hashedPassword, photo, gender, birthday, is_user, is_actor, is_director, is_producer, is_staff, is_superuser], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertUUID);
      });
    });
  },

  findByUUID: (uuid) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE uuid = ?';
      db.query(query, [uuid], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null);
        resolve(results[0]);
      });
    });
  },

  findAll: async () => {
    const query = 'SELECT * FROM users';
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  update: async (uuid, username, email, password) => {
    const query = 'UPDATE users SET username = ?, email = ?, password = ? WHERE uuid = ?';
    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
      db.query(query, [username, email, hashedPassword, uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },

  delete: async (uuid) => {
    const query = 'DELETE FROM users WHERE uuid = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },
};

module.exports = User;
