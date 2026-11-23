const form = document.querySelector('[data-form]');
const list = document.querySelector('[data-list]');
const status = document.querySelector('[data-status]');
let products = [];

function clearErrors() {
  for (const error of form.querySelectorAll('[data-error-for]')) {
    error.textContent = '';
  }

  for (const control of form.elements) {
    if (control instanceof HTMLElement && 'removeAttribute' in control) {
      control.removeAttribute('aria-invalid');
    }
  }
}

function showValidationErrors() {
  let firstInvalid = null;

  for (const control of form.elements) {
    if (!control.name || typeof control.checkValidity !== 'function') {
      continue;
    }

    if (!control.checkValidity()) {
      const error = form.querySelector(`[data-error-for="${control.name}"]`);
      if (error) {
        error.textContent = control.validationMessage;
      }

      control.setAttribute('aria-invalid', 'true');

      if (!firstInvalid) {
        firstInvalid = control;
      }
    }
  }

  return firstInvalid;
}

function toProductDraft(formData) {
  return {
    ...Object.fromEntries(formData),
    price: Number(formData.get('price')),
    stock: Number(formData.get('stock')),
    featured: formData.has('featured'),
  };
}

function renderProducts() {
  list.textContent = '';

  for (const product of products) {
    const item = document.createElement('li');
    item.textContent = `${product.name} — ${product.category} — ${product.price} €`;
    list.append(item);
  }
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
  renderProducts();

  status.textContent = `Producto ${product.name} añadido`;

  form.reset();
  form.elements.name.focus();
});
