
/*
Att göra: Utnyttja  get-routen på rad 30 i frontenden via fetch-Api. 
När användaren trycker på Browse länken/ikonen ladda alla produkter i databasen. 

*/ 





const sqlite3 = require('sqlite3').verbose(); // Importerar sqlite3
const express = require('express'); // Importerar express 
const app = express(); // Skapar en express-variabel 
const db = new sqlite3.Database('./furniture.db') // Skapar databaskoppling

const cors = require('cors');
app.use(cors());
app.use('/client', express.static('client'));






// Kontrollerar databaskopplingen i konsolen 
db.all('SELECT * FROM furniture', (e, rows) => 
    console.log(rows)
);


// Skapar porten 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


/* Skapar get-api med databasen som endpoint för att testa databaskopplingen i porten*/
app.get('/furniture', (req, res) =>{
    const sql = 'SELECT * FROM furniture';
    db.all(sql,(err, rows) => {
        if (err){
            res.status(500).send (err);   
        } else {
            res.send(rows);
        }
    }) 
})

//get-route id/kategor

//put-route  - uppdater

//post-route - skapa

//delete-route - tabort
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



/* app.use(express.json()); */

/* db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS furniture (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT NOT NULL, 
            type TEXT NOT NULL, 
            color TEXT, 
            category TEXT, 
            price REAL
        )
    `, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Furniture table created.');
    });
});

app.post('/furniture', (req, res) => {
    const { name, type, color, size, price } = req.body;

    const sql = `INSERT INTO furniture (name, type, color, size, price) VALUES (?, ?, ?, ?, ?)`;

    db.run(sql, [name, type, color, size, price], function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).send({ id: this.lastID });
    });
});

async function addFurniture() {
    const furnitureData = {
        name: "Matbord",
        type: "Bord",
        color: "Vit",
        size: "210 cm x 90 cm",
        price: 2500
    };

    try {
        const response = await fetch('http://localhost:3000/furniture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(furnitureData)
        });

        if (!response.ok) {
            throw new Error(`Serverfel: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Ny produkt tillagd med ID:', data.id);
    } catch (error) {
        console.error('Fel vid addering av produkt:', error);
    }
}

addFurniture();

 */
