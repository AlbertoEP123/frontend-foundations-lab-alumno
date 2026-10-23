import { DomainError } from './domain-error.mjs';

export function parseProduct(value) {
  if (
    value === null ||
    typeof value !== 'object' ||
    typeof value.id !== 'string' ||
    typeof value.name !== 'string' ||
    typeof value.price !== 'number' ||
    !Number.isFinite(value.price)
  ) {
    throw new DomainError('INVALID_PRODUCT', 'El producto no es válido.');
  }

  return {
    id: value.id,
    name: value.name,
    price: value.price
  };
}

export function findProductOrThrow(products, id) {
  for (let index = 0; index < products.length; index++) {
    if (id === products[index].id) {
      return products[index];
    }

  }
  throw new DomainError('PRODUCT_NOT_FOUND', 'No se encontró el producto.');

}
