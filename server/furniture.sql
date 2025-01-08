DROP TABLE IF EXISTS furniture;
CREATE TABLE furniture (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   furnitureName VARCHAR(20) NOT NULL,
   modelName VARCHAR(20) NOT NULL,
   color VARCHAR(20) NOT NULL,
   category VARCHAR(20) NOT NULL,
   price DECIMAL(20,2) NOT NULL,
   image VARCHAR(300) NOT NULL
);

INSERT INTO furniture (furnitureName, modelName, color, category, price, image) 
VALUES 
   ('Bed', 'Anja', 'Oak', 'Bedroom', 20000.00, 'client/Bilder/Sovrum/bed.jpg'),
   ('Stool', 'Kajsa', 'Oak', 'Kitchen', 500.00, 'client/Bilder/Kitchen/Stool.jpg'),
   ('Sofa', 'Bertil', 'Beige', 'Livingroom', 15000.00, 'client/Bilder/Vardagsrum/Sofa.jpg'),
   ('Chair', 'Sofia', 'Oak', 'Livingroom', 10000.00, 'client/Bilder/Vardagsrum/chair.jpg'),
   ('Hatch', 'Anna', 'Oak', 'Kitchen', 1600.00, 'client/Bilder/Kitchen/hatch.jpg'),
   ('Lamp', 'Johannes', 'White', 'Bedroom', 500.00, 'client/Bilder/Sovrum/lamp.jpg');

SELECT * FROM furniture; 