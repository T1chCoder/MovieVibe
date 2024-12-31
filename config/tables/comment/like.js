const createCommentLikeTableQuery = `
CREATE TABLE IF NOT EXISTS comment_likes (
    -- ID's
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()) UNIQUE NOT NULL,
    -- Body
    comment_uuid CHAR(36) NOT NULL,
    sender_uuid CHAR(36) NOT NULL,
    -- Statuses
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    -- Timestamp
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Links
    CONSTRAINT comment_like_fk_comment_uuid FOREIGN KEY (comment_uuid) REFERENCES comments(uuid) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT comment_like_fk_sender_uuid FOREIGN KEY (sender_uuid) REFERENCES users(uuid) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
`;

module.exports = createCommentLikeTableQuery;