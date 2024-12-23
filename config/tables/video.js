const createCategoryTableQuery = `
CREATE TABLE IF NOT EXISTS videos (
    -- ID's
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()) UNIQUE NOT NULL,
    -- Body
    video_url VARCHAR(555) NOT NULL,
    -- Statuses
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    -- Timestamp
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;
`;

module.exports = createCategoryTableQuery;