const searchInput = document.querySelector('[data-search]');
const searchStatus = document.querySelector('[data-search-status]');
const results = document.querySelector('[data-results]');
const uploadForm = document.querySelector('[data-upload-form]');
const uploadStatus = document.querySelector('[data-upload-status]');

function debounce(callback, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, args), delay);
  };
}

let activeController;

async function searchProducts(query) {
  activeController?.abort();

  const controller = new AbortController();
  activeController = controller;

  const params = new URLSearchParams({ search: query, limit: '6' });

  try {
    const response = await fetch(`/api/products?${params}`, {
      signal: controller.signal
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message ?? 'No se pudo completar la búsqueda.');
    }

    results.replaceChildren();

    data.items.forEach((product) => {
      const item = document.createElement('li');
      item.textContent = product.name;
      results.append(item);
    });

    searchStatus.textContent = `${data.items.length} producto(s) encontrado(s).`;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') return;
    searchStatus.textContent = `Error en la búsqueda: ${error.message}`;
  }
}

async function uploadFile(event) {
  event.preventDefault();

  const button = uploadForm.querySelector('[data-upload-button]');
  const formData = new FormData(uploadForm);

  button.disabled = true;
  uploadStatus.textContent = 'Subiendo archivo...';

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message ?? 'No se pudo subir el archivo.');
    }

    uploadStatus.textContent =
      `${data.message} Bytes recibidos: ${data.receivedBytes}.`;
  } catch (error) {
    uploadStatus.textContent = `Error en la subida: ${error.message}`;
  } finally {
    button.disabled = false;
  }
}
const debouncedSearch = debounce(searchProducts, 300);

searchInput.addEventListener('input', () => {
  debouncedSearch(searchInput.value);
});
uploadForm.addEventListener('submit', uploadFile);
