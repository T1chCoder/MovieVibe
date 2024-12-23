const createReviewTableQuery = `
CREATE TABLE IF NOT EXISTS reviews (
    -- ID's
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()) UNIQUE NOT NULL,
    -- Body
    content_uuid CHAR(36) NOT NULL,
    sender_uuid CHAR(36) NOT NULL,
    comment TEXT NOT NULL,
    -- Statuses
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    -- Timestamp
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Links
    CONSTRAINT review_fk_content_uuid FOREIGN KEY (content_uuid) REFERENCES contents(uuid) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT review_fk_sender_uuid FOREIGN KEY (sender_uuid) REFERENCES users(uuid) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
`;

module.exports = createReviewTableQuery;