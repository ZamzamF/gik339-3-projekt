DROP TABLE IF EXISTS furniture;
CREATE TABLE furniture (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   furnitureName VARCHAR(20) NOT NULL,
   modelName VARCHAR(20) NOT NULL,
   color VARCHAR(20) NOT NULL,
   category VARCHAR(20) NOT NULL,
   price DECIMAL(20,2) NOT NULL,
);

INSERT INTO furniture (furnitureName, modelName, color, category, price) 
VALUES 
   ('Bed', 'Anja', 'Oak', 'Bedroom', 20000.00),
   ('Stool', 'Kajsa', 'Oak', 'Kitchen', 500.00),
   ('Sofa', 'Bertil', 'Beige', 'Livingroom', 15000.00),
   ('Chair', 'Sofia', 'Oak', 'Livingroom', 10000.00),
   ('Hatch', 'Anna', 'Oak', 'Kitchen', 1600.00),
   ('Lamp', 'Johannes', 'White', 'Bedroom', 500.00);

SELECT * FROM furniture; 