export interface Product {
  readonly id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  readonly createdAt: string;
}

export type ProductCreate = Omit<Product, 'id' | 'createdAt'>;

export type ProductPatch = Partial<
  Omit<Product, 'id' | 'createdAt'>
>;

export type ProductCardView = Pick<Product, 'id' | 'name' | 'price'>;

export type LoadState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

export function mapState<T, R>(state: LoadState<T>, mapper: (value: T) => R): LoadState<R> {
  switch (state.status) {
    case 'idle':
      return { status: 'idle' };
    case 'loading':
      return { status: 'loading' };
    case 'success':
      return { status: 'success', data: mapper(state.data) };
    case 'error':
      return { status: 'error', error: state.error };
    default:
      return assertNever(state);
  }
}

export function stateLabel<T>(state: LoadState<T>): string {
  switch (state.status) {
    case 'idle':
      return 'Inactivo';
    case 'loading':
      return 'Cargando';
    case 'success':
      return 'Completado';
    case 'error':
      return state.error;
    default:
      return assertNever(state);
  }
}

function assertNever(value: never): never {
  throw new Error(`Estado de carga no contemplado: ${value}`);
}
