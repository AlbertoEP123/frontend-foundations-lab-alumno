import { applyStockMovement, calculateFinalPrice, canSell } from './domain.mjs';

const form = document.querySelector('[data-form]');
const status = document.querySelector('[data-status]');
const output = document.querySelector('[data-output]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const values = Object.fromEntries([...data.entries()].map(([key, value]) => [key, Number(value)]));
  const product = Object.freeze({ id: 'demo', name: 'Producto demo', stock: values.stock });

  try {
    const allowed = canSell(product, values.quantity);
    const updated = allowed ? applyStockMovement(product, -values.quantity) : product;
    const finalUnitPrice = calculateFinalPrice(values);
    output.textContent = JSON.stringify({ allowed, finalUnitPrice, total: finalUnitPrice * values.quantity, original: product, updated }, null, 2);
    status.dataset.kind = allowed ? 'success' : 'error';
    status.textContent = allowed ? 'Venta valida.' : 'No hay stock suficiente o la cantidad no es valida.';
  } catch (error) {
    status.dataset.kind = 'error';
    status.textContent = error instanceof Error ? error.message : 'Error desconocido.';
  }
});
