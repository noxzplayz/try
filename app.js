const products = [
    {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        price: 59.99,
        image: "https://via.placeholder.com/220x180?text=Headphones",
        category: "electronics"
    },
    {
        id: 2,
        title: "Smart Fitness Watch",
        price: 99.99,
        image: "https://via.placeholder.com/220x180?text=Fitness+Watch",
        category: "electronics"
    },
    {
        id: 3,
        title: "Portable Charger 10000mAh",
        price: 29.99,
        image: "https://via.placeholder.com/220x180?text=Portable+Charger",
        category: "electronics"
    },
    {
        id: 4,
        title: "Wireless Mouse",
        price: 19.99,
        image: "https://via.placeholder.com/220x180?text=Wireless+Mouse",
        category: "electronics"
    },
    {
        id: 5,
        title: "USB-C Hub Adapter",
        price: 39.99,
        image: "https://via.placeholder.com/220x180?text=USB-C+Hub",
        category: "electronics"
    },
    {
        id: 6,
        title: "Classic Potato Chips",
        price: 2.99,
        image: "https://via.placeholder.com/220x180?text=Potato+Chips",
        category: "chips"
    },
    {
        id: 7,
        title: "Spicy Nacho Chips",
        price: 3.49,
        image: "https://via.placeholder.com/220x180?text=Nacho+Chips",
        category: "chips"
    },
    {
        id: 8,
        title: "Cheese Flavored Chips",
        price: 3.99,
        image: "https://via.placeholder.com/220x180?text=Cheese+Chips",
        category: "chips"
    },
    {
        id: 9,
        title: "Lays Classic Salted",
        price: 20.00,
        image: "https://i.postimg.cc/BQR2LYHB/LAYS-CLASSIC-SALTED-52.webp",
        category: "chips"
    },
    {
        id: 10,
        title: "Lays Classic Salted",
        price: 10.00,
        image: "https://i.postimg.cc/65ZyS94C/lays-classic-salt-20g.jpg",
        category: "chips"
    }
];

const productListEl = document.getElementById('product-list');
const cartCountEl = document.getElementById('cart-count');
const cartEl = document.getElementById('cart');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const closeCartBtn = document.getElementById('close-cart-btn');

let cart = [];
let currentCategory = 'all';

// Render products on the page
function renderProducts() {
    productListEl.innerHTML = '';
    const filteredProducts = currentCategory === 'all' ? products : products.filter(p => p.category === currentCategory);
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image" />
            <div class="product-title">${product.title}</div>
        <div class="product-price">₹${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;

        productListEl.appendChild(productCard);
    });
}

// Update cart count in header
function updateCartCount() {
    cartCountEl.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

// Format price as Indian Rupee currency
function formatINR(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}

// Update renderProducts and renderCart to use formatINR
// (Already handled in renderProducts above)


// Render cart items
function renderCart() {
    cartItemsEl.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.title} x ${item.quantity} - ${formatINR(item.price * item.quantity)}`;
        cartItemsEl.appendChild(li);
    });
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotalEl.textContent = formatINR(total);
}

// Render cart items
function renderCart() {
    cartItemsEl.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.title} x ${item.quantity} - ${formatINR(item.price * item.quantity)}`;
        cartItemsEl.appendChild(li);
    });
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotalEl.textContent = formatINR(total);
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    updateCartCount();
    renderCart();
}

// Show cart
function showCart() {
    cartEl.style.display = 'flex';
}

// Hide cart
function hideCart() {
    cartEl.style.display = 'none';
}

// Checkout action
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    alert('Thank you for your purchase! Your order is being processed.');
    cart = [];
    updateCartCount();
    renderCart();
    hideCart();
}

const categoryButtons = document.querySelectorAll('.category-btn');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.getAttribute('data-category');
        renderProducts();
    });
});

// Event listeners
productListEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        addToCart(productId);
    }
});

document.querySelector('nav ul li:nth-child(3) a').addEventListener('click', (e) => {
    e.preventDefault();
    showCart();
});

checkoutBtn.addEventListener('click', checkout);
closeCartBtn.addEventListener('click', hideCart);

// Initial render
renderProducts();
updateCartCount();
