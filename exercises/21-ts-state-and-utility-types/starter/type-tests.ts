import { mapState, stateLabel, type LoadState, type ProductCreate, type ProductPatch } from './state.js';

const create: ProductCreate = { name: 'Teclado', description: '', price: 80, stock: 2 };
void create;

const patch: ProductPatch = { stock: 3 };
void patch;

// @ts-expect-error El identificador no se modifica desde ProductPatch.
const invalidPatch: ProductPatch = { id: 'x' };
void invalidPatch;

const success: LoadState<number> = { status: 'success', data: 2 };
const mapped = mapState(success, (value) => String(value));
stateLabel(mapped);

// @ts-expect-error Loading no puede contener data.
const impossible: LoadState<number> = { status: 'loading', data: 2 };
void impossible;

// @ts-expect-error Error necesita un mensaje.
const incompleteError: LoadState<number> = { status: 'error' };
void incompleteError;
