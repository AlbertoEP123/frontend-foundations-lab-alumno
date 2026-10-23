const products = [
  { id: '1', name: 'Teclado mecanico', category: 'Perifericos', price: 89.9, stock: 18 },
  { id: '2', name: 'Monitor 27 pulgadas', category: 'Monitores', price: 289, stock: 2 },
  { id: '3', name: 'Hub USB-C', category: 'Conectividad', price: 64.95, stock: 0 }
];

const container = document.querySelector('[data-products]');
const status = document.querySelector('[data-status]');

export function createProductCard(product) {
  const article = document.createElement('article');
  article.className = 'product-card';

  const title = document.createElement('h2');
  title.textContent = product.name;

  const category = document.createElement('p');
  category.textContent = `Categoría: ${product.category}`;

  const price = document.createElement('p');
  price.textContent = `Precio: ${product.price} €`;

  article.append(title, category, price);

  if (product.stock > 0 && product.stock <= 3) {
    const badge = document.createElement('span');
    badge.textContent = 'Stock bajo';
    article.append(badge);
  }

  return article;
}

export function renderProducts(target, items) {
  target.replaceChildren();

  if (items.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'No hay productos para mostrar.';
    target.append(message);
    return;
  }

  const fragment = document.createDocumentFragment();

  for (const item of items) {
    fragment.append(createProductCard(item));
  }

  target.append(fragment);
}

document.querySelector('[data-load]').addEventListener('click', () => {
  renderProducts(container, products);
  status.textContent = 'Productos renderizados.';
});

document.querySelector('[data-empty]').addEventListener('click', () => {
  renderProducts(container, []);
  status.textContent = 'Resultado vacio.';
});

document.querySelector('[data-untrusted]').addEventListener('click', () => {
  renderProducts(container, [{ id: 'x', name: '<img src=x onerror=alert(1)>', category: 'Demo', price: 1, stock: 1 }]);
  status.textContent = 'El contenido debe aparecer como texto literal.';
});
