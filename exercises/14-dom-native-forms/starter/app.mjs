const form = document.querySelector('[data-form]');
const list = document.querySelector('[data-list]');
const status = document.querySelector('[data-status]');
let products = [];

function clearErrors() {
  for (const error of form.querySelectorAll('[data-error-for]')) {
    error.textContent = '';
  }
}

function showValidationErrors() {
  for (const control of form.elements) {
    if (!control.checkValidity()) {
      const error = form.querySelector(`[data-error-for="${control.name}"]`);
      if (error) {
        error.textContent = control.validationMessage;
      }
      return control;
    }
  }
  return null;
}

function toProductDraft(formData) {
  return {
    ...Object.fromEntries(formData),
    price: Number(formData.get('price')),
    stock: Number(formData.get('stock')),
    featured: formData.has('featured'),
  };
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors();

  const firstInvalid = showValidationErrors();

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  const product = toProductDraft(new FormData(form));
  products.push(product);
  const aviso = document.createElement('p');
  aviso.textContent = `Producto ${product.name} añadido`;
  status.append(aviso);
  const item = document.createElement('li');
  item.textContent = `${product.name} — ${product.category} — ${product.price} €`;
  list.append(item);

});
