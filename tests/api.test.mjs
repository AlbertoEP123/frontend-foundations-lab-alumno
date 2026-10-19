import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createAppServer } from '../server/app-server.mjs';

let server;
let baseUrl;

before(async () => {
  server = createAppServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
});

test('health expone el estado y el numero de productos', async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.status, 'ok');
  assert.equal(body.productCount, 24);
});

test('el listado permite buscar, ordenar y paginar', async () => {
  const response = await fetch(`${baseUrl}/api/products?search=monitor&sort=price&order=desc&limit=1`);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.items.length, 1);
  assert.match(body.items[0].name, /monitor/i);
  assert.equal(body.meta.limit, 1);
  assert.ok(body.meta.total >= 2);
});

test('el CRUD crea, actualiza y elimina un producto', async () => {
  const createResponse = await fetch(`${baseUrl}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Producto de prueba',
      category: 'Testing',
      description: 'Creado por la prueba de integracion.',
      price: 10,
      stock: 3
    })
  });
  assert.equal(createResponse.status, 201);
  const created = await createResponse.json();

  const patchResponse = await fetch(`${baseUrl}/api/products/${created.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stock: 5 })
  });
  assert.equal(patchResponse.status, 200);
  const updated = await patchResponse.json();
  assert.equal(updated.stock, 5);

  const deleteResponse = await fetch(`${baseUrl}/api/products/${created.id}`, { method: 'DELETE' });
  assert.equal(deleteResponse.status, 204);

  const missingResponse = await fetch(`${baseUrl}/api/products/${created.id}`);
  assert.equal(missingResponse.status, 404);
});

test('la API devuelve errores de validacion estructurados', async () => {
  const response = await fetch(`${baseUrl}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'x', category: '', price: -1, stock: 1.5 })
  });
  assert.equal(response.status, 422);
  const body = await response.json();
  assert.equal(body.error.status, 422);
  assert.ok(body.error.details.name);
  assert.ok(body.error.details.price);
});

