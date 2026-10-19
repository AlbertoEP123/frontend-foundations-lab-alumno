const favoritesKey = 'frontend-foundations-capstone-favorites-v1';

export function readFiltersFromUrl() {
  // TODO
  return { search: '', category: '', sort: 'name', order: 'asc', page: 1, limit: 8 };
}

export function writeFiltersToUrl(filters) {
  // TODO
}

export function readFavorites() {
  // TODO: devuelve Set y tolera storage corrupto.
  return new Set();
}

export function writeFavorites(favorites) {
  // TODO
}

export function debounce(callback, delay) {
  // TODO
  return callback;
}
