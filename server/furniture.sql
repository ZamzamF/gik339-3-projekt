DROP TABLE IF EXISTS furniture;
CREATE TABLE furniture (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   furnitureName VARCHAR(20) NOT NULL,
   color VARCHAR(20) NOT NULL,
   category VARCHAR(20) NOT NULL,
   price DECIMAL(20,2) NOT NULL
);


INSERT INTO furniture (furnitureName, color, category, price) 
VALUES 
   ('Bed', 'Pink', 'Bedroom', 20000.00),
   ('Stool', 'Green', 'Kitchen', 500.00),
   ('Sofa', 'Blue', 'Livingroom', 15000.00),
   ('Chair', 'Red', 'Livingroom', 10000.00),
   ('Hatch', 'Yellow', 'Kitchen', 1600.00),
   ('Lamp', 'White', 'Bedroom', 500.00);

SELECT * FROM furniture; 
