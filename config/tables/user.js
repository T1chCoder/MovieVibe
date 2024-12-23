const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    -- ID's
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()) UNIQUE NOT NULL,
    -- Body
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    patronymic VARCHAR(255),
    surname VARCHAR(255),
    password VARCHAR(555) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    birthday DATE,
    photo_url VARCHAR(555),
    -- Statuses
    is_admin BOOLEAN DEFAULT FALSE NOT NULL,
    is_staff BOOLEAN DEFAULT FALSE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    -- Timestamp
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;
`;

module.exports = createUserTableQuery;