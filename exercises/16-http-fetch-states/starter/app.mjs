const stateContainer = document.querySelector('[data-state]');
const loadButton = document.querySelector('[data-load]');
const scenarioSelect = document.querySelector('[data-scenario]');

async function fetchProducts(url) {
  // TODO: comprueba response.ok y valida la forma minima del JSON.
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Request failed")
  }
  const data = await response.json();

  return data;
}

function renderState(state) {
  switch (state.status) {
    case 'idle':
      stateContainer.textContent = 'Esperando una petición.';
      break;
    case 'loading':
      stateContainer.textContent = 'Cargando productos...';
      break;
    case 'error':
      stateContainer.textContent = `Error: ${state.message ?? 'No se pudieron cargar los productos.'}`;
      break;
    case 'empty':
      stateContainer.textContent = 'No se encontraron productos.';
      break;
    case 'success':
      stateContainer.textContent = JSON.stringify(state.productos ?? []);
      break;
    default:
      stateContainer.textContent = 'Estado desconocido.';
  }
}

async function load() {
  let url;
  const scenario = scenarioSelect.value;

  switch (scenario) {
    case "success":
      url = "/api/products?search=monitor&limit=6";
      break;

    case "empty":
      url = "/api/products?search=";

      break;

    case "error":
      url = "/api/products?status=500";

      break;

    case "slow":
      url = "/api/products?delay=1500";

      break;

    default:
      break;
  }
  renderState({ status: 'loading' });

  const products = fetchProducts(url);
  if (products.length == 0) {
    renderState({ status: 'empty' });
  } else {
    renderState({ status: 'success' , productos: products});


  }


}
loadButton.addEventListener('click', load);
renderState({ status: 'idle' });
