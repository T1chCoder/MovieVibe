const mysql = require('mysql2');
const dotenv = require('dotenv');
const categoryQuery = require('./tables/category');
const commentQuery = require('./tables/comment');
const contentQuery = require('./tables/content');
const profileQuery = require('./tables/profile');
const reviewQuery = require('./tables/review');
const userQuery = require('./tables/user');
const videoQuery = require('./tables/video');

dotenv.config();

const currentDate = new Date();
const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const year = currentDate.getFullYear();

const formattedDate = `${day}-${month}-${year}`;

const migrationName = `${formattedDate}-create-tables`;

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(dbConfig);

const runMigration = async () => {
  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const result = await connection.execute(
      'SELECT * FROM migrations WHERE name = ?',
      [migrationName]
    );

    const rows = result[0];
    if (Array.isArray(rows) && rows.length > 0) {
      console.log(`Migration ${migrationName} has already been applied.`);
      return;
    }

    await connection.execute('SET FOREIGN_KEY_CHECKS = 0;');

    await connection.execute('DROP TABLE IF EXISTS categories;');
    await connection.execute('DROP TABLE IF EXISTS comments;');
    await connection.execute('DROP TABLE IF EXISTS contents;');
    await connection.execute('DROP TABLE IF EXISTS profiles;');
    await connection.execute('DROP TABLE IF EXISTS reviews;');
    await connection.execute('DROP TABLE IF EXISTS users;');
    await connection.execute('DROP TABLE IF EXISTS videos;');

    await connection.execute('SET FOREIGN_KEY_CHECKS = 1;');

    await connection.execute(userQuery);
    await connection.execute(categoryQuery);
    await connection.execute(contentQuery);
    await connection.execute(commentQuery);
    await connection.execute(profileQuery);
    await connection.execute(reviewQuery);
    await connection.execute(videoQuery);

    await connection.execute(
      'INSERT INTO migrations (name) VALUES (?)',
      [migrationName]
    );

    console.log(`Migration ${migrationName} applied successfully.`);
  } catch (error) {
    console.error('Error applying migration:', error);
  }
};

runMigration();

module.exports = connection;