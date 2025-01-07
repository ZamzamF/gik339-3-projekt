
//1. Exemple data:
const testProducts = [
    { name: "Bed", category: "Bedroom", price: 500 },
    { name: "Wardrobe", category: "Bedroom", price: 300 },
    { name: "Cooking Set", category: "Kitchen", price: 150 },
    { name: "Blender", category: "Kitchen", price: 80 },
    { name: "Sofa", category: "Livingroom", price: 700 },
    { name: "Coffee Table", category: "Livingroom", price: 200 }
  ];


// Ev lista med produkter från databasen 
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

//  gå till kassan
function goToCheckout() {
    alert('Du är nu framme i kassan');
   
}

// visa varukorgen
function openCart() {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// fyller i om produkterna ska visas
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
renderProductList();

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
function showAllProducts(){
    const fullProductList = document.getElementById("product-containerr");

    // Töm innehållet i behållaren först
  fullProductList.innerHTML = "";

  testProducts.forEach((product) => {
        const productCard = `
      <div class="card" style="width: 18rem; margin: 10px;">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Category: ${product.category}</p>
          <p class="card-text">Price: $${product.price}</p>
        </div>
      </div>
    `;
    fullProductList.innerHTML += productCard;
    });
}