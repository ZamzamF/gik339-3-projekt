//Global variabel för bas-urlen : /furniture
const baseUrl = "http://localhost:3000/furniture";

// Formulär
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resourceForm');

    form.addEventListener('submit', (e) => {
      e.preventDefault(); 

      // Hämta data från formuläret
      const formData = {
        furnitureName: document.getElementById('furnitureName').value,
        color: document.getElementById('color').value,
        category: document.getElementById('category').value,
        price: document.getElementById('price').value,
      };

      console.log('Formulärdata:', formData);

      // Rensa formuläret 
      alert('Formuläret skickades!');
      form.reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById('resourceFormModal'));
      modal.hide();
    });
  });





// ------------------- Dynamiskt rendering av test produkter ---------
//Dynamiskt rendering av producter

//Denna funktion lyssnar efter click-händelser. Vid dessa anropas 
async function fetchAllProducts(){
    // Hämtar upp det element som agerar som behållare för alla produkter
    const fullProductList = document.getElementById("all-products-container");
    // Töm innehållet i behållaren först
  fullProductList.innerHTML = "";

  try {


    //Skapar HTTP-GET-Förfrågan. Lagrar object-data i variabeln response
    const response = await fetch(baseUrl);  
    //Översätter object-data till json-format.
    const fetchedProducts = await response.json();

    //Renderar ut prdukterna 
    fetchedProducts.forEach((product) => {
        const productCards = `
        <div class="card position-relative m-3" style="width: 12rem;">  

            <!-- "Save"-etikett uppe till höger -->
            <div class="position-absolute top-0 end-0 bg-white text-secondary px-2 py-1 m-1 border border-1 rounded save-badge">
                Save
            </div>

            <!-- Product bild --> 
            <img src="/${product.image}" class="card-img-top mx-auto  mt-3" alt="${product.furnitureName}" style="width: 80%; height: auto; object-fit: contain;">


            <div class="card-body text-center">
                <h5 class="card-title">${product.furnitureName}</h5>
                <p class="card-text fw-semibold">Price: $${product.price}</p>
                
            </div>
        </div>
        `;
    fullProductList.innerHTML += productCards;
    });

  } catch (error) {  
    console.log("OBS! Produkterna gick inte att hämta ut!", error);
}
}

//anropa fetchAllProducts automatiskt varje gång HTML-sidan ladda.
document.addEventListener("DOMContentLoaded", fetchAllProducts);

const sqlite3 = require('sqlite3').verbose(); // Importerar sqlite3
const express = require('express'); // Importerar express
const cors = require('cors'); // Importerar CORS
const app = express(); // Skapar en express-variabel

app.use(cors());
app.use(express.json()); // För att hantera JSON-data från klienten
app.use('/client', express.static('client')); // Statisk mapp för klientfiler

const db = new sqlite3.Database('./furniture.db', (err) => {
    if (err) {
        console.error('Kunde inte ansluta till databasen:', err.message);
    } else {
        console.log('Ansluten till SQLite-databasen.');
    }
});

// Hämta alla möbler (GET)
app.get('/furniture', (req, res) => {
    const sql = 'SELECT * FROM furniture';
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(rows);
        }
    });
});

// Ta bort en möbel (DELETE)
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

// Startar servern
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// Radera möbel via formuläret 
function deleteFurniture(id) {
    fetch(`http://localhost:3000/furniture/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log(`Möbeln med ID ${id} har tagits bort.`);
            alert(`Möbeln med ID ${id} har tagits bort.`);
            fetchFurniture(); // Uppdatera listan efter radering
        } else {
            response.text().then(text => alert('Fel: ' + text));
        }
    })
    .catch(err => console.error('Nätverksfel:', err));
}
