const form = document.querySelector('[data-form]');
const tableBody = document.querySelector('[data-table-body]');
const formStatus = document.querySelector('[data-form-status]');
const listStatus = document.querySelector('[data-list-status]');
let products = [];

async function requestJson(url, options = {}) {
  // TODO: trata 204, response.ok y cuerpo de error.
  const response = await fetch(url, options);
  return response.json();
}

async function loadProducts() {

  try {
    const data = await requestJson('/api/products');
    products = data.items;
  } catch (error) {
    console.log(error.message);
  }
}

async function saveProduct(event) {
  event.preventDefault();

  const fields = new FormData(form);
  const id = fields.get('id');

  const product = {
    name: fields.get('name'),
    category: fields.get('category'),
    price: Number(fields.get('price')),
    stock: Number(fields.get('stock'))
  };

  const url = id ? `/api/products/${id}` : '/api/products';
  const method = id ? 'PATCH' : 'POST';

  await requestJson(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });

  await loadProducts();
}

function startEdit(product) {
  // TODO
}

function cancelEdit() {
  // TODO
}

async function deleteProduct(id) {
  const url = `/api/products/${id}`;
  const method = 'DELETE';
  
  await JSON(url, {
    method,
  });
  


}

form.addEventListener('submit', saveProduct);
document.querySelector('[data-cancel]').addEventListener('click', cancelEdit);
document.querySelector('[data-refresh]').addEventListener('click', loadProducts);
tableBody.addEventListener('click', () => { });
loadProducts();
