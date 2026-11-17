import {
  ApiContractError,
  parsePage,
  requestJson,
  type Page,
  type Parser
} from './api-client.js';

export interface Product {
  readonly id: string;
  name: string;
  price: number;
}

export const parseProduct: Parser<Product> = (value) => {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('id' in value) ||
    !('name' in value) ||
    !('price' in value) ||
    typeof value.id !== 'string' ||
    typeof value.name !== 'string' ||
    typeof value.price !== 'number' ||
    !Number.isFinite(value.price)
  ) {
    throw new ApiContractError('La respuesta no tiene el formato de un producto.');
  }

  return {
    id: value.id,
    name: value.name,
    price: value.price
  };
};

export function getProducts(fetcher: typeof fetch = fetch): Promise<Page<Product>> {
  return requestJson('/api/products', {
    parser: parsePage(parseProduct),
    fetcher
  });
}
