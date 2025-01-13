//Global variabel för bas-urlen : /furniture
const baseUrl = "http://localhost:3000/furniture";

/* Formulär - Gamla
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
*/



// ------------------- Dynamiskt rendering av produkter ---------

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
        <div class="m-10 w-80 rounded-lg border border-gray-200 bg-amber-50 py-6 px-6 shadow-lg">  
            <p class="text-lg font-bold text-green-800">${product.furnitureName}</p>
            <p class="text-sm font-semibold text-green-700">Kategori: ${product.category}</p>
            <p class="mt-3 text-2xl font-bold text-amber-900">${product.price}</p>
            <p class="text-sm font-semibold text-green-600">Färg: ${product.color}</p>

            <div class="mt-6 flex justify-between">
                <button class="w-1/2 rounded-lg border-2 border-green-700 bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800">
                Ändra
                </button>
              
                <button class="w-1/2 ml-4 rounded-lg border-2 border-amber-800 bg-amber-800 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-900" onClick="deleteProduct(${product.id})">Ta bort</button>

            </div>
        </div>
        `;
    fullProductList.innerHTML += productCards;
    });

  } catch (error) {  
    console.log("OBS! Produkterna gick inte att hämta ut!", error);
}
}

function deleteProduct(id) {
  // Skapat funktion som skickar en DELETE-förfrågan till servern för att ta bort baserat på id
  fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
  .then((response) => {
      // Kontrollerar om förfrågan lyckades
      if (!response.ok) {
          // Om förfrågan misslyckas:
          throw new Error(`Fel vid radering: ${response.status}`);
      }
      // Returnerar svarstexten från servern (app.delete) för vidare behandling
      return response.text();
  })
  .then((message) => {
      // Visar meddelandet från servern i en alert från app.delete
      alert(message);
      // Uppdaterar produktlistan genom att hämta alla produkter igen
      fetchAllProducts();
  })
  .catch((error) => {
      // Loggar eventuella fel 
      console.error('Ett fel inträffade: ', error);
  });
}

// funktion lägga till produkt
//furnitureForm heter formuläret id med knapp type submit och name SubmitForm
console.log(furnitureForm);
furnitureForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const serverFurnitureObject = {
    furnitureName: '',
    price:'',
    color:'',
    category:'',
  };
  serverFurnitureObject.furnitureName = furnitureForm.furnitureName.value;
  serverFurnitureObject.price = furnitureForm.price.value;
  serverFurnitureObject.color = furnitureForm.color.value;
  serverFurnitureObject.category = furnitureForm.category.value;

  console.log(serverFurnitureObject);
  const request = new Request(baseUrl,{
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(serverFurnitureObject)
  });
  
  fetch(request).then(response => {
    console.log(response);
    fetchAllProducts();
    furnitureForm.reset();
  });
}


// knappkoppling för att uppdatera produkt i databasen
document.getElementById('updateButton').addEventListener('click', async () => {
    
    const furnitureName = document.querySelector('input[name="furnitureName"]').value;
    const price = document.querySelector('input[name="price"]').value;
    const color = document.querySelector('input[name="color"]').value;
    const category = document.querySelector('select[name="category"]').value;
    const id = 1;
  
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          furnitureName,
          price,
          color,
          category,
        }),
      });
  
      if (response.ok) {
        // modalrutan
        const modal = document.getElementById('updateModal');
        modal.classList.remove('hidden');
      } else {
        console.error('Misslyckades med att uppdatera produkten.');
      }
    } catch (error) {
      console.error('Ett fel inträffade:', error);
    }
  });
  
  // stänga modalrutan
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('updateModal').classList.add('hidden');
  });

function deleteProduct(id) {
  // Skapat funktion som skickar en DELETE-förfrågan till servern för att ta bort baserat på id
  fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
  .then((response) => {
      // Kontrollerar om förfrågan lyckades
      if (!response.ok) {
          // Om förfrågan misslyckas:
          throw new Error(`Fel vid radering: ${response.status}`);
      }
      // Returnerar svarstexten från servern (app.delete) för vidare behandling
      return response.text();
  })
  .then((message) => {
      // Visar meddelandet från servern i en alert från app.delete
      alert(message);
      // Uppdaterar produktlistan genom att hämta alla produkter igen
      fetchAllProducts();
  })
  .catch((error) => {
      // Loggar eventuella fel 
      console.error('Ett fel inträffade: ', error);
  });
}
//anropa fetchAllProducts automatiskt varje gång HTML-sidan ladda.
document.addEventListener("DOMContentLoaded", () => { fetchAllProducts();
});



