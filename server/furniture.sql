DROP TABLE IF EXISTS furniture;
CREATE TABLE IF NOT EXISTS furniture(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   furnitureName VARCHAR(20) NOT NULL,
   modelName VARCHAR(20) NOT NULL,
   color VARCHAR(20) NOT NULL,
   category VARCHAR(20) NOT NULL,
   price INTEGER(20,2) NOT NULL,
   image VARCHAR(300) NOT NULL,
);
INSERT INTO furniture(furnitureName,modelName,color,category,price,image) VALUES ('Bed','Anja','Oak', 'Bedroom', 20000'kr', 'client\Bilder\Sovrum\bed.jpg');
INSERT INTO furniture(furnitureName,modelName,color,category,price,image) VALUES ('Stool','Kajsa','Oak', 'Kitchen', 500'kr', 'client\Bilder\Kök\Stool.jpg');
INSERT INTO furniture(furnitureName,modelName,color,category,price,image) VALUES ('Sofa','Bertil','Grå', 'Livingroom', 15000'kr', 'client\Bilder\Vardagsrum\Sofa.jpg');

select * from furniture;