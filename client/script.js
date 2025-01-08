
 //Ev lista med produkter från databasen 
let products = [
    { id: 1, name: "Produkt A", price: 100 },
    { id: 2, name: "Produkt B", price: 200 },
    { id: 3, name: "Produkt C", price: 300 },
];


// Varukorgens data
let cart = []; 

// Lägg till produkt i varukorgen
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    // Kolla om produkten redan finns i varukorgen
    const cartItem = cart.find(item => item.product.id === productId);
    if (cartItem) {
        // Uppdatera antal om produkten redan finns
        cartItem.quantity++;
    } else {
        // Lägg till ny produkt i varukorgen
        cart.push({ product, quantity: 1 });
    }

    renderCart();
}

// Uppdatera antal för en produkt i varukorgen
function updateQuantity(productId, action) {
    const cartItem = cart.find(item => item.product.id === productId);
    if (action === 'increase') {
        cartItem.quantity++;
    } else if (action === 'decrease' && cartItem.quantity > 1) {
        cartItem.quantity--;
    }
    renderCart();
}

// Ta bort produkt från varukorgen
function removeProduct(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    renderCart();
}

// Visa varukorgens produkter
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Rensar tidigare innehåll

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.product.name}</td>
            <td>${item.product.price} SEK</td>
            <td>
                <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.product.id}, 'increase')">+</button>
                <span>${item.quantity}</span>
                <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.product.id}, 'decrease')">-</button>
            </td>
            <td>${item.product.price * item.quantity} SEK</td>
            <td><button class="btn btn-danger" onclick="removeProduct(${item.product.id})">Ta bort</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });
}

// stänga varukorgen
function closeCart() {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.hide();
}

    // Stäng varukorgen  när man trycker på fortsätt handla 
function closeCartAndReturn() {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.hide();

    // Navigera tillbaka till startsidan
    window.location.href = "index.html"; 
}


//  gå till kassan
function goToCheckout() {
    alert('Du är nu framme i kassan');
   
}

// visa varukorgen
function openCart() {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

/* fyller i om produkterna ska visas
function renderProductList() {
    const productListContainer = document.getElementById('product-list');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-4');
        productCard.innerHTML = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price} SEK</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Lägg till</button>
                </div>
            </div>
        `;
        productListContainer.appendChild(productCard);
    });
}
    */

function renderProductList() {
    const productListContainer = document.getElementById('product-list');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-4');
        productCard.innerHTML = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price} SEK</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Lägg till</button>
                </div>
            </div>
        `;
        productListContainer.appendChild(productCard);
    });
}


// renderar produktlistan
//renderProductList();

// Formulär
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resourceForm');

    form.addEventListener('submit', (e) => {
      e.preventDefault(); 

      // Hämta data från formuläret
      const formData = {
        fname: document.getElementById('fname').value,
        ename: document.getElementById('ename').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value
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
    const response = await fetch("http://localhost:3000/furniture");  
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
            <img src="${product.image}" class="card-img-top mx-auto  mt-3" alt="${product.name}" style="width: 80%; height: auto; object-fit: contain;">


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

