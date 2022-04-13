DROP DATABASE IF EXISTS epytodo;

CREATE DATABASE IF NOT EXISTS epytodo;

USE epytodo;

DROP TABLE IF EXISTS user;

CREATE TABLE user(
    `id` INT AUTO_INCREMENT NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `firstname` VARCHAR(255) NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`)
);

DROP TABLE IF EXISTS todo;

CREATE TABLE todo(
    `id` INT AUTO_INCREMENT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `due_time` datetime NOT NULL,
    `user_id` INT,
    `status` enum('not started','in progress','done','doing','todo') DEFAULT 'not started',
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);
