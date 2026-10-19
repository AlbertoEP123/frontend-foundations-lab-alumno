import {
  createProduct,
  deleteProduct,
  getCategories,
  getProducts,
  updateProduct
} from './api.mjs';
import {
  debounce,
  readFavorites,
  readFiltersFromUrl,
  writeFavorites,
  writeFiltersToUrl
} from './state.mjs';
import {
  clearProductFormErrors,
  fillProductForm,
  renderCatalog,
  showProductFormErrors
} from './views.mjs';

const state = {
  filters: readFiltersFromUrl(),
  favorites: readFavorites(),
  products: { status: 'idle' },
  categories: []
};

const elements = {
  filters: document.querySelector('[data-filters]'),
  products: document.querySelector('[data-products]'),
  state: document.querySelector('[data-state]'),
  summary: document.querySelector('[data-summary]'),
  pagination: document.querySelector('[data-pagination]'),
  pageLabel: document.querySelector('[data-page-label]'),
  dialog: document.querySelector('[data-product-dialog]'),
  productForm: document.querySelector('[data-product-form]'),
  dialogTitle: document.querySelector('[data-dialog-title]'),
  dialogStatus: document.querySelector('[data-dialog-status]'),
  toast: document.querySelector('[data-toast]')
};

async function loadCatalog() {
  // TODO: cancela la peticion anterior y renderiza todos los estados.
  state.products = { status: 'loading' };
  renderCatalog(elements, state);
}

async function initialize() {
  // TODO: hidrata formulario, categorias, listeners y catalogo.
  state.categories = (await getCategories()).items;
  await loadCatalog();
}

void createProduct;
void deleteProduct;
void updateProduct;
void debounce;
void writeFavorites;
void writeFiltersToUrl;
void clearProductFormErrors;
void fillProductForm;
void showProductFormErrors;

initialize();
