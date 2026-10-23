export function normalizeSearchTerm(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

export function filterProducts(products, query) {
  let queryNormalized = normalizeSearchTerm(query);

  if (queryNormalized === '') {
    return products;
  }
  else {
    return products.filter((product) =>
      normalizeSearchTerm(product.name).includes(queryNormalized) ||
      normalizeSearchTerm(product.category).includes(queryNormalized) ||
      normalizeSearchTerm(product.description).includes(queryNormalized)
    );
  }


}

export function sortProducts(products, criterion = 'name', direction = 'asc') {
  const directionMultiplier = direction === 'desc' ? -1 : 1;

  return products.toSorted((a, b) => {
    let comparison;

    if (criterion === 'name') {
      comparison = a.name.localeCompare(b.name, 'es');
    } else {
      comparison = a[criterion] - b[criterion];
    }

    return comparison * directionMultiplier;
  });
}
export function groupProductsByCategory(products) {
  const groups = {};

  for (let index = 0; index < products.length; index++) {
    const product = products[index];
    const category = product.category;

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(product);
  }

  return groups;
}

export function summarizeInventory(products) {
  return products.reduce((summary, product) => {
    summary.productCount += 1;
    summary.totalUnits += product.stock;
    summary.totalValue += product.price * product.stock;
    return summary;
  }, { productCount: 0, totalUnits: 0, totalValue: 0 });
}
