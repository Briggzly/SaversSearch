CREATE DATABASE saverssearch;

CREATE TABLE users(
    user_id  SERIAL PRIMARY KEY UNIQUE NOT NULL,
    user_name VARCHAR(20) NOT NULL UNIQUE,
    user_email VARCHAR(200) NOT NULL UNIQUE,
    user_password VARCHAR(100) NOT NULL
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('Kyson', 'kyson4@gmail.com', 'howdy123');