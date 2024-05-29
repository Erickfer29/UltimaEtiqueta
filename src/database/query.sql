CREATE DATABASE UltimaEtiqueta;

USE Prueba01;

CREATE TABLE productos(
    ProductoID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre  VARCHAR(50) NOT NULL,
    Descripcion TEXT,
    Precio FLOAT,
    CantidadStock  INT NOT NULL,
    Talla  VARCHAR(4) NOT NULL,
    Color  VARCHAR(50) NOT NULL,
    Categoria  VARCHAR(50) NOT NULL
);

SELECT * FROM personas;

CREATE USER 'UltimaEtiqueta'@'localhost' IDENTIFIED BY 'ultimaetiqueta';

GRANT ALL PRIVILEGES ON ultimaetiqueta.* TO 'UltimaEtiqueta'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'UltimaEtiqueta'@'localhost';