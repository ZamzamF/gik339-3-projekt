//Global variabel för bas-urlen : /furniture
const baseUrl = "http://localhost:4000/furniture";

window.addEventListener('load', fetchAllProducts);
//anropa fetchAllProducts automatiskt varje gång HTML-sidan ladda.

// ------------------- Funktion som renderar ut alla produkter ---------
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
            <p class="text-sm font-semibold text-green-700">Category: ${product.category}</p>
            <p class="mt-3 text-1xl font-bold text-amber-900">Price: ${product.price} SEK</p>
            <p class="text-sm font-semibold" style="color: ${product.color}">Color: ${product.color}</p>
            <div class="mt-4 flex justify-between">
                <button class="w-1/2 rounded-lg border-2 border-green-700 bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800" onClick="handlleFormForUpdate(${product.id})">Ändra</button>
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

// ------------------- Funktion som lägger till och uppdatera produkt  ---------
document.getElementById('furnitureForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const furnitureId = furnitureForm.dataset.id || null; 
  const furnitureName = furnitureForm.furnitureName.value;
  const price = furnitureForm.price.value; 
  const color = furnitureForm.color.value;
  const category = furnitureForm.category.value;
  const furnitureProduct = {furnitureName, category, price, color};
    try { 
      const response = await fetch(furnitureId?`${baseUrl}/${furnitureId}`:baseUrl, 
        { method: furnitureId? 'PUT' : 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(furnitureProduct)
        });
        const result = await response.json();    
        alert(result.message);
        fetchAllProducts();

        // Rensar formuläret och dataset-id
        form.reset();
        delete form.dataset.id;
    } catch (error) {
      console.error('Produkten laddas inte upp/uppdateras: ', error);
    }
}); 

//  Funktion som förbereder formuläret för uppdatering
async function handlleFormForUpdate(id) {
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    const product = await response.json();

    const form = document.getElementById("furnitureForm");
    form.furnitureName.value = product.furnitureName;
    form.price.value = product.price;
    form.color.value = product.color;
    form.category.value = product.category;
    form.dataset.id = id; // Lagrar id för uppdatering
  } catch (error) {
    console.error("Kunde inte hämta produkt för uppdatering", error);
  }
}

// ------------------- Funktion som raderar produkt  ---------
async function deleteProduct(id) {
  try {
      // Skickar DELETE-förfrågan och väntar på resultat
      const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });

      // Kontrollera om förfrågan lyckades
      if (!response.ok) {
          throw new Error(`Fel vid radering: ${response.status}`);
      }

      // Hämtar meddelandet från servern som text
      const message = await response.json();

      // Öppnar modal och visar meddelandet
      //openDeleteModal(message);
      alert(message.message);

      // Uppdaterar produktlistan
      fetchAllProducts();
  } catch (error) {
      // Loggar eventuella fel
      console.error('Ett fel inträffade: ', error);
  }
}


      






