CREATE DATABASE IF NOT EXISTS pw3_api;
USE pw3_api;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL
);

INSERT INTO usuarios (nome, email) VALUES
('Ana Souza', 'ana@email.com'),
('Bruno Lima', 'bruno@email.com'),
('Carla Mendes', 'carla@email.com');
