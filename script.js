const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1999,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1f7?w=500"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1518081461904-9ac71e04aa29?w=500"
  },
  {
    id: 3,
    name: "Denim Jacket",
    price: 1499,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
  },
  {
    id: 4,
    name: "Casual Sneakers",
    price: 1999,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba2?w=500"
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 799,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1596464716121-3b41e4d8016c?w=500"
  },
  {
    id: 6,
    name: "Leather Wallet",
    price: 999,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1593032457860-3b6c4b7f4a03?w=500"
  }
];

let cart = [];

const container = document.getElementById("productContainer");
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const productCount = document.getElementById("productCount");

// Display all products initially
function displayProducts(list) {
  container.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product");
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
  productCount.innerText = `${list.length} products found`;
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  cartCount.textContent = cart.length;
  localStorage.setItem("cartItems", JSON.stringify(cart));
  alert(`${item.name} added to cart`);
}

function filterProducts(category) {
  if (category === "all") displayProducts(products);
  else {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
  }
}

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(searchText));
  displayProducts(filtered);
});

sortSelect.addEventListener("change", () => {
  let sorted = [...products];
  if (sortSelect.value === "low") sorted.sort((a, b) => a.price - b.price);
  else if (sortSelect.value === "high") sorted.sort((a, b) => b.price - a.price);
  displayProducts(sorted);
});

// Dark Mode Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode")
    ? "Light Mode"
    : "Dark Mode";
});

// Cart Button → open cart page
document.getElementById("cartButton").addEventListener("click", () => {
  window.location.href = "cart.html";
});

displayProducts(products);
