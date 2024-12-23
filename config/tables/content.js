const createContentTableQuery = `
CREATE TABLE IF NOT EXISTS contents (
    -- ID's
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()) UNIQUE NOT NULL,
    -- Body
    title VARCHAR(255) NOT NULL,
    poster_url VARCHAR(555) NOT NULL,
    thumbnail_url VARCHAR(555) NOT NULL,
    description TEXT NOT NULL,
    cinematography VARCHAR(255) NOT NULL,
    country ENUM('The USA', 'Russia') NOT NULL,
    language ENUM('English', 'Russian') NOT NULL,
    budget BIGINT NOT NULL,
    box_office VARCHAR(255) NOT NULL,
    release_date DATETIME NOT NULL,
    release_location ENUM('The USA', 'Russia') NOT NULL,
    -- Statuses
    is_movie BOOLEAN DEFAULT TRUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    -- Timestamp
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;
`;

module.exports = createContentTableQuery;