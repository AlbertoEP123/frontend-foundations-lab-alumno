const stateContainer = document.querySelector('[data-state]');
const loadButton = document.querySelector('[data-load]');
const scenarioSelect = document.querySelector('[data-scenario]');
const controls = [loadButton, scenarioSelect];
let lastScenario = scenarioSelect.value;

async function fetchProducts(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`La petición falló ${response.status}`);
  }

  const data = await response.json();
  // Compruebo estructura y campos
  if (
    !data ||
    !Array.isArray(data.items) ||
    !data.items.every((product) =>
      product &&
      typeof product.name === 'string' &&
      typeof product.category === 'string' &&
      typeof product.price === 'number'
    )
  ) {
    throw new Error('La respuesta del servidor no contiene una lista válida de productos.');
  }

  return data.items;
}

function renderState(state) {
  // Limpia el estado anterior para mostrar una sola vista
  stateContainer.replaceChildren();

  switch (state.status) {
    case 'idle':
      stateContainer.textContent = 'Esperando una petición.';
      break;
    case 'loading':
      stateContainer.textContent = 'Cargando productos...';
      break;
    case 'error':
      stateContainer.append(document.createTextNode(
        `Error: ${state.message ?? 'No se pudieron cargar los productos.'} `
      ));

      // El botón de reintentar vuelve a cargar el último escenario solicitado
      const retryButton = document.createElement('button');
      retryButton.className = 'button';
      retryButton.type = 'button';
      retryButton.textContent = 'Reintentar';
      retryButton.addEventListener('click', () => load(lastScenario));
      stateContainer.append(retryButton);
      break;

    case 'empty':
      stateContainer.textContent = 'No se encontraron productos.';
      break;

    case 'success':
      state.productos.forEach((product) => {
        const item = document.createElement('article');
        item.className = 'result-item';

        const name = document.createElement('h2');
        name.textContent = product.name;

        const details = document.createElement('p');
        details.textContent = `${product.category} · ${product.price.toFixed(2)} €`;

        item.append(name, details);
        stateContainer.append(item);
      });
      break;
    default:
      stateContainer.textContent = 'Estado default';
  }
}

function getUrlForScenario(scenario) {
  
  switch (scenario) {
    case 'success':
      return '/api/products?search=monitor&limit=6';
    case 'empty':
      return '/api/products?search=televisortdsystem';
    case 'error':
      return '/api/products?status=500';
    case 'slow':
      return '/api/products?delay=1500';
    default:
      throw new Error('Escenario no válido.');
  }
}

async function load(scenario = scenarioSelect.value) {
  // Se guarda para que el botón de reintento repita el mismo escenario.
  lastScenario = scenario;
  scenarioSelect.value = scenario;

  // Evita solicitudes duplicadas y permite seguir usando el resto de la página.
  controls.forEach((control) => {
    control.disabled = true;
  });
  renderState({ status: 'loading' });

  try {
    const products = await fetchProducts(getUrlForScenario(scenario));
    if (products.length === 0) {
      renderState({ status: 'empty' });
    } else {
      renderState({ status: 'success', productos: products });
    }
  } catch (error) {
    const message = error instanceof SyntaxError
      ? 'El servidor devolvió un JSON inválido.'
      : error.message;
    renderState({ status: 'error', message });
  } finally {
    controls.forEach((control) => {
      control.disabled = false;
    });
  }
}

loadButton.addEventListener('click', () => load());
renderState({ status: 'idle' });
