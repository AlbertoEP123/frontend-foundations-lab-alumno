const form = document.querySelector('[data-form]');
const tableBody = document.querySelector('[data-table-body]');
const formStatus = document.querySelector('[data-form-status]');
const listStatus = document.querySelector('[data-list-status]');
let products = [];

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const data = await response.json();
    const error = new Error(data.error?.message ?? `La petición falló (${response.status}).`);
    error.status = response.status;
    error.details = data.error?.details;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function loadProducts() {
  listStatus.textContent = 'Cargando productos...';
  try {
    const data = await requestJson('/api/products');
    products = data.items;
    renderProducts();
    listStatus.textContent = products.length === 0
      ? 'No hay productos.'
      : `${products.length} producto(s) cargado(s).`;
  } catch (error) {
    listStatus.textContent = `No se pudieron cargar los productos: ${error.message}`;
  }
}

function renderProducts() {
  tableBody.replaceChildren();

  products.forEach((product) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = product.name;

    const priceCell = document.createElement('td');
    priceCell.textContent = Number(product.price).toFixed(2);

    const stockCell = document.createElement('td');
    stockCell.textContent = String(product.stock);

    const buttonDelete = document.createElement('button');
    buttonDelete.type = "button";
    buttonDelete.textContent = "Borrar";
    buttonDelete.dataset.action = 'delete';
    buttonDelete.dataset.id = product.id;

    const buttonEdit = document.createElement('button');
    buttonEdit.type = "button";
    buttonEdit.textContent = "Editar";
    buttonEdit.dataset.action = 'edit';
    buttonEdit.dataset.id = product.id;

    const actionsCell = document.createElement('td');
    const actions = document.createElement('div');
    actions.className = 'row-actions';
    actions.append(buttonDelete, buttonEdit);

    actionsCell.append(actions);

    row.append(nameCell, priceCell, stockCell, actionsCell);
    tableBody.append(row);
  });
}

async function saveProduct(event) {
  event.preventDefault();
  document.querySelectorAll('[data-error-for]').forEach((message) => {
    message.textContent = '';
  });

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

  formStatus.textContent = `Guardando ${product.name}...`;

  try {
    await requestJson(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });

    await loadProducts();
    formStatus.textContent = id ? 'Producto actualizado.' : 'Producto creado.';
  } catch (error) {
    formStatus.textContent = error.message;

    if (error.status === 422 && error.details) {
      document.querySelectorAll('[data-error-for]').forEach((message) => {
        const fieldName = message.dataset.errorFor;
        const fieldError = error.details[fieldName];
        if (fieldError) {
          message.textContent = fieldError;
        }
      });
    }
  }
}

function startEdit(product) {
  form.elements.namedItem('name').value = product.name;
  form.elements.namedItem('category').value = product.category;
  form.elements.namedItem('price').value = product.price;
  form.elements.namedItem('stock').value = product.stock;
  form.elements.namedItem('id').value = product.id;
  document.querySelector('[data-form-title]').textContent = "Editar producto";
  document.querySelector('[data-cancel]').hidden = false;
  


}

function cancelEdit() {
  document.querySelector('[data-cancel]').hidden = true;
  form.reset();
  document.querySelector('[data-form-title]').textContent = "Nuevo producto";
  formStatus.textContent ="";

}

async function deleteProduct(id) {

  const confirmacion = confirm("¿Eliminar producto?");
  if (!confirmacion) return;

  const url = `/api/products/${id}`;
  const method = 'DELETE';

  await requestJson(url, {
    method,
  });
  await loadProducts();

}

form.addEventListener('submit', saveProduct);
document.querySelector('[data-cancel]').addEventListener('click', cancelEdit);
document.querySelector('[data-refresh]').addEventListener('click', loadProducts);
tableBody.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const product = products.find((item) => String(item.id) === button.dataset.id);
  if (!product) return;

  if (button.dataset.action === 'delete') {
    deleteProduct(product.id);
  } else if (button.dataset.action === 'edit') {
    startEdit(product);
  }
});
loadProducts();
