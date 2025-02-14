const sqlite3 = require('sqlite3').verbose(); // Importerar sqlite3
const express = require('express'); // Importerar express 
const app = express(); // Skapar en express-variabel 
const db = new sqlite3.Database('./furniture.db') // Skapar databaskoppling

const cors = require('cors');
app.use(cors());
app.use(express.json());

// Kontrollerar databaskopplingen i konsolen 
db.all('SELECT * FROM furniture', (e, rows) => 
    console.log(rows)
);  


//get-route - hämta lla produkter
app.get('/furniture', (req, res) =>{
    const sql = 'SELECT * FROM furniture';
    db.all(sql,(err, rows) => {
        if (err){
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    }) 
}); 


//get-route - hämta en specific product baserat på id
app.get('/furniture/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM furniture WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'Resurs hittades inte' });
        }
    });
}); 

//put-route  - uppdater product baserat på id
app.put('/furniture/:id', (req, res) => {
    const { id } = req.params;
    const { furnitureName, price, color, category } = req.body;
  
    const sql = 'UPDATE furniture SET furnitureName = ?, price = ?, color = ?, category = ? WHERE id = ?';

  
    db.run(sql, [furnitureName, price, color, category, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res.json({ message: 'Produkt uppdaterad!' });
          }
    });
});


//post-route - skapa en ny produkt
app.post('/furniture', (req, res) => {
    const { furnitureName,category, price, color } = req.body;
    //Ändrade prdningen rätt
    const sql = `INSERT INTO furniture(furnitureName, category, price, color) VALUES (?, ?, ?, ?)`;

    db.run(sql,[furnitureName,category, price, color], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Ett fel inträffade');
        } else {
            res.json({ message: 'Produkten skapades' });
        }
        });
});   


//delete-route - ta bort product
app.delete('/furniture/:id', (req, res) => {
    const furnitureId = req.params.id;
    const sql = 'DELETE FROM furniture WHERE id = ?';

    db.run(sql, [furnitureId], function (err) {
        if (err) {
            res.status(500).send('Fel vid radering: ' + err.message);
        } else {
            res.json({ message: 'Produkten raderades'});
        }
    });
});


// Lyssnar vid porten 4000
app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
}); 

