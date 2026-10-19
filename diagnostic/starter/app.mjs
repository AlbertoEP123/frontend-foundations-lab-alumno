const productsContainer = document.querySelector('[data-products]');
const listStatus = document.querySelector('[data-list-status]');
const formStatus = document.querySelector('[data-form-status]');
const search = document.querySelector('[data-search]');
const form = document.querySelector('[data-form]');
let products = [];

async function loadProducts() {
  // TODO: loading, fetch, response.ok, JSON, error y render.
}

function renderProducts() {
  // TODO: filtra por search.value y crea nodos con textContent.
}

async function createProduct(event) {
  event.preventDefault();
  // TODO: valida, convierte numeros, POST, actualiza array y render.
}

search.addEventListener('input', renderProducts);
form.addEventListener('submit', createProduct);
loadProducts();
