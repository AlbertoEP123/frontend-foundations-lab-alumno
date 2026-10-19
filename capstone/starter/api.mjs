export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export async function requestJson(url, options = {}) {
  // TODO: trata response.ok, 204 y errores JSON.
  const response = await fetch(url, options);
  return response.json();
}

export function getProducts(filters, { signal } = {}) {
  // TODO: serializa filtros y pasa AbortSignal.
  return requestJson('/api/products', { signal });
}

export function getCategories() {
  return requestJson('/api/categories');
}

export function createProduct(draft) {
  // TODO
}

export function updateProduct(id, patch) {
  // TODO
}

export function deleteProduct(id) {
  // TODO
}
