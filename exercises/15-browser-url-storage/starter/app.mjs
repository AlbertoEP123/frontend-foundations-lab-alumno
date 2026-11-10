const products = [
  { name: 'Teclado', category: 'Perifericos', price: 89.9 },
  { name: 'Raton', category: 'Perifericos', price: 54.5 },
  { name: 'Monitor 27', category: 'Monitores', price: 289 },
  { name: 'Monitor portatil', category: 'Monitores', price: 169.99 }
];

const form = document.querySelector('[data-filters]');
const results = document.querySelector('[data-results]');
const status = document.querySelector('[data-status]');
const viewControls = [...document.querySelectorAll('input[name="view"]')];
const keyName = 'viewPreference';

function readFiltersFromUrl() {
  const params = new URLSearchParams(location.search);
  const search = params.get("search") ?? "";
  const category = params.get("category") ?? "";
  const sort = params.get("sort") ?? "";
  return { search: search, category: category, sort: sort };
}

function writeFiltersToUrl(filters) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      params.set(key, value);
    }
  }

  const query = params.toString();
  const url = `${location.pathname}${query ? `?${query}` : ''}${location.hash}`;

  history.replaceState(null, '', url);
}

function readViewPreference() {

  try {
    const view = JSON.parse(localStorage.getItem(keyName));
    if (view === 'grid' || view === 'list') {
      return view;
    }
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }
  }

  return 'grid';
}

function writeViewPreference(view) {
  localStorage.setItem(keyName, JSON.stringify(view));
}

function render() {
  const search = form.elements.search.value.toLowerCase();
  const category = form.elements.category.value;
  const sort = form.elements.sort.value;
  const view = viewControls.find((control) => control.checked)?.value ?? 'grid';

  let visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search)
    && (!category || product.category === category)
  );
  visibleProducts.sort((a, b) =>
    sort === 'price' ? a.price - b.price : a.name.localeCompare(b.name)
  );

  results.textContent = '';
  results.dataset.view = view;
  visibleProducts.forEach((product) => {
    const item = document.createElement('article');
    item.className = 'result-item';
    item.innerHTML = `<h2>${product.name}</h2><p>${product.category} · ${product.price.toFixed(2)} €</p>`;
    results.append(item);
  });

  status.textContent = `${visibleProducts.length} producto(s)`;
}

const initialFilters = readFiltersFromUrl();
for (const [name, value] of Object.entries(initialFilters)) {
  form.elements.namedItem(name).value = value;
}

const initialView = readViewPreference();
const selectedView = viewControls.find((control) => control.value === initialView);
if (selectedView) {
  selectedView.checked = true;
}

function syncFiltersAndRender() {
  const filters = Object.fromEntries(new FormData(form));
  writeFiltersToUrl(filters);
  render();
}

form.addEventListener('input', syncFiltersAndRender);
form.addEventListener('reset', () => setTimeout(syncFiltersAndRender));
viewControls.forEach((control) => control.addEventListener('change', () => {
  writeViewPreference(control.value);
  render();
}));
render();
