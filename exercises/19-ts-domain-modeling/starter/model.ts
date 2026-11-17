export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED';

export interface Product {
 readonly id: string;
  name: string;
  price: number;
  stock: number;
  status: ProductStatus;
  readonly createdAt: string;
}

export type ProductDraft = Omit<Product, 'id' | 'createdAt'>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
export function isProduct(value: unknown): value is Product {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.price === 'number' &&
    typeof value.stock === 'number' &&
    (value.status === 'ACTIVE' ||
      value.status === 'INACTIVE' ||
      value.status === 'DISCONTINUED') &&
    typeof value.createdAt === 'string'
  );
}

export function formatProductStatus(status: ProductStatus): string {
  switch (status) {
    case 'ACTIVE':
      return 'Activo';
    case 'INACTIVE':
      return 'Inactivo';
    case 'DISCONTINUED':
      return 'Descatalogado';
    default:
      return assertNever(status);
  }
}

function assertNever(value: never): never {
  throw new Error(`Estado de producto no contemplado: ${value}`);
}
