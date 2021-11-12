CREATE DATABASE saverssearch;

CREATE TABLE users(
    user_id  SERIAL PRIMARY KEY UNIQUE NOT NULL,
    user_name VARCHAR(20) NOT NULL UNIQUE,
    user_email VARCHAR(200) NOT NULL UNIQUE,
    user_password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wishlist(
    wish_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    user_id int NOT NULL,
    wish_title VARCHAR(255) NOT NULL,
    wish_price FLOAT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('Kyson', 'kyson4@gmail.com', 'howdy123');