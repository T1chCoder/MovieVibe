const createProfileTableQuery = `
CREATE TABLE IF NOT EXISTS profiles (
    -- ID's
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()) UNIQUE NOT NULL,
    -- Body
    user_uuid CHAR(36) UNIQUE NOT NULL,
    language ENUM('English', 'Russian') DEFAULT 'English' NOT NULL,
    -- Statuses
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    -- Timestamp
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Links
    CONSTRAINT profile_fk_content_uuid FOREIGN KEY (user_uuid) REFERENCES users(uuid) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
`;

module.exports = createProfileTableQuery;