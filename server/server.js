const sqlite3 = require('sqlite3').verbose(); // Importerar sqlite3
const express = require('express'); // Importerar express 
const app = express(); // Skapar en express-variabel 
const db = new sqlite3.Database('./furniture.db') // Skapar databaskoppling

const cors = require('cors');
app.use(cors());
app.use('/client', express.static('client'));
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
//get-route - hämta en specific product baserat på id - Onädigt?
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
    const id = req.params.id;
    const { furnitureName, price } = req.body;
  
    const sql = `
      UPDATE furniture
      SET furnitureName = ?, price = ?, 
      WHERE id = ?
    `;
  
    db.run(sql, [furnitureName, price, id], function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      if (this.changes > 0) {
        res.status(200).json({ message: 'Produkten har uppdaterats!'});
      } else {
        res.status(404).json({ message: 'Kunde inte hitta produkten att uppdatera.'});
      }
    });
});

//post-route - skapa en ny produkt
app.post('/furniture', (req, res) => {
    const furniture = req.body;
    const sql = `INSERT INTO furniture(furnitureName, color, category, price) VALUES (?, ?, ?, ?)`;

    db.run(sql, Object.values(furniture), (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Ett fel inträffade');
        } else {
            res.send('Produkten skapades');
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
        } else if (this.changes === 0) {
            res.status(404).send('Möbeln med inmatat ID hittades inte.');
        } else {
            res.status(200).send(`Möbeln med ID ${furnitureId} har tagits bort.`);
        }
    });
});


// Lyssnar vid porten 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}); 

