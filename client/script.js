//Global variabel för bas-urlen : /furniture
const baseUrl = "http://localhost:3000/furniture";



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
        <div class="m-10 w-80 rounded-lg border border-gray-200 bg-amber-50 py-3 px-3 shadow-lg">  
            <p class="text-lg font-bold text-green-800">${product.furnitureName}</p>
            <p class="text-sm font-semibold text-green-700">Kategori: ${product.category}</p>
            <p class="mt-3 text-1xl font-bold text-amber-900">${product.price}</p>
            <p class="text-sm font-semibold text-green-600">Färg: ${product.color}</p>

            <div class="mt-4 flex justify-between">
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
//DELETE-----------------------------------------------------------------------
async function deleteProduct(id) {
  try {
      // Skickar DELETE-förfrågan och väntar på resultat
      const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });

      // Kontrollera om förfrågan lyckades
      if (!response.ok) {
          throw new Error(`Fel vid radering: ${response.status}`);
      }

      // Hämtar meddelandet från servern som text
      const message = await response.text();

      // Öppnar modal och visar meddelandet
      openDeleteModal(message);

      // Uppdaterar produktlistan
      fetchAllProducts();
  } catch (error) {
      // Loggar eventuella fel
      console.error('Ett fel inträffade: ', error);
  }
}

// Öppnar modalen och sätter meddelandet
function openDeleteModal(message) {
    // Sätter meddelandet i modalen
    document.getElementById('modalMessage').innerText = message;
    // Visar modalen genom att ta bort "hidden"-klassen
    document.getElementById('deleteModal').classList.remove('hidden');
}

// Stänger modalen
function closeModal() {
    // Lägger till "hidden"-klassen för att stänga modalen
    document.getElementById('deleteModal').classList.add('hidden');
}
//----------------------------------------------------------------
// funktion lägga till produkt
console.log(furnitureForm);
furnitureForm.addEventListener('submit', handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const serverFurnitureObject = {
    furnitureName: furnitureForm.furnitureName.value,
    price: furnitureForm.price.value,
    color: furnitureForm.color.value,
    category: furnitureForm.category.value,
  }

  console.log(serverFurnitureObject);
  const request = new Request(baseUrl,{
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(serverFurnitureObject)
  });
  
  try {
    const response = await fetch(request);
    console.log(response);

    if (response.ok) {
        await fetchAllProducts(); // Hämta produkterna igen
        furnitureForm.reset();    // Återställ formuläret
    } else {
        console.error("Ett fel inträffade vid POST-förfrågan:", response.statusText);
    }
} catch (error) {
    console.error("OBS! Ett fel inträffade:", error);
}
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
      
      // modalrutan
      if (response.ok) {
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

//anropa fetchAllProducts automatiskt varje gång HTML-sidan ladda.
document.addEventListener("DOMContentLoaded", fetchAllProducts);




