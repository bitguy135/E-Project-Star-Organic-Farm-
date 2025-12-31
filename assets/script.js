// navbar toggle
document.getElementById("navToggle").addEventListener("click", function () {
    document.getElementById("navMenu").classList.toggle("show");
  });
// Auto-play carousel
const carousel = new bootstrap.Carousel(
  document.getElementById("heroCarousel"),
  {
    interval: 5000,
    wrap: true,
  }
);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Active nav link on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll(".nav-menu a").forEach((link) => {
        link.classList.remove("active");
      });
      if (navLink) {
        navLink.classList.add("active");
      }
    }
  });
});
let cart = [];
const deliveryCharge = 250;

function addToCart(button) {
  const name = button.dataset.name;
  const price = parseInt(button.dataset.price);
  const image = button.dataset.image;

  const existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelector(".cart-info .badge").innerText = count;
}

function openCart() {
  renderCart();
  const modal = new bootstrap.Modal(document.getElementById("cartModal"));
  modal.show();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.qty;

    cartItems.innerHTML += `
        <div class="d-flex align-items-center mb-3 border-bottom pb-2">
          
          <img src="${item.image}" width="60" class="me-3 rounded">

          <div class="flex-grow-1">
            <strong>${item.name}</strong><br>
            Rs. ${item.price}
            
            <div class="d-flex align-items-center mt-2">
              <button class="btn btn-sm btn-outline-secondary me-2"
                onclick="changeQty(${index}, -1)">−</button>

              <span>${item.qty}</span>

              <button class="btn btn-sm btn-outline-secondary ms-2"
                onclick="changeQty(${index}, 1)">+</button>
            </div>
          </div>

          <div class="text-end">
            <strong>Rs. ${item.price * item.qty}</strong><br>
            <button class="btn btn-sm btn-danger mt-2"
              onclick="removeItem(${index})">
              🗑
            </button>
          </div>

        </div>
      `;
  });

  document.getElementById("cartSubtotal").innerText = `Rs. ${subtotal}`;
  document.getElementById("cartTotal").innerText = `Rs. ${
    subtotal + deliveryCharge
  }`;
}
function changeQty(index, amount) {
  cart[index].qty += amount;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  updateCartCount();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCart();
}
const productsPerPage = 12;
let currentPage = 1;

const productCards = document.querySelectorAll(".product-card");
const totalPages = Math.ceil(productCards.length / productsPerPage);

function showPage(page) {
  currentPage = page;

  productCards.forEach((card, index) => {
    card.style.display =
      index >= (page - 1) * productsPerPage && index < page * productsPerPage
        ? "block"
        : "none";
  });

  document.getElementById(
    "pageInfo"
  ).innerText = `Page ${currentPage} of ${totalPages}`;

  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) showPage(currentPage - 1);
});

document.getElementById("nextPage").addEventListener("click", () => {
  if (currentPage < totalPages) showPage(currentPage + 1);
});

// Init
showPage(1);
document.querySelectorAll(".showcase-item img").forEach((img) => {
  img.addEventListener("click", () => {
    document.getElementById("modalImage").src = img.src;
    new bootstrap.Modal(document.getElementById("imageModal")).show();
  });
});
const toggleBtn = document.getElementById("toggleGallery");
const showcaseWrapper = document.getElementById("showcaseWrapper");

toggleBtn.addEventListener("click", () => {
  const isCollapsed = showcaseWrapper.classList.contains("collapsed");

  showcaseWrapper.classList.toggle("collapsed");
  showcaseWrapper.classList.toggle("expanded");

  toggleBtn.textContent = isCollapsed ? "See Less" : "See More";
});
function changeQty(index, amount) {
  cart[index].qty += amount;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  updateCartCount();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCart();
}

// Showcase Gallery Image Modal
function openImageModal(element) {
  const imgSrc = element.querySelector("img").src;
  document.getElementById("modalImage").src = imgSrc;
  const modal = new bootstrap.Modal(document.getElementById("imageModal"));
  modal.show();
}

//contact and query section

$("#queryForm").on("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your inquiry. Our team will contact you shortly.");
  this.reset();
});
