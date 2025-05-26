USE traccar_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  username VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (first_name, last_name, email, username, password)
VALUES ('Admin', 'User', 'admin@example.com', 'admin', '$2b$10$TYU8sl89dNbc812nKsRdx.fmTX5ha2.gCEaI9w7rkFvftw1NcXqs6');
