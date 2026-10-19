import { createServer as createHttpServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cloneSeedProducts } from './data.mjs';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDirectory, '..');
const MAX_JSON_BYTES = 1_000_000;
const MAX_UPLOAD_BYTES = 6_000_000;

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.md', 'text/markdown; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.ico', 'image/x-icon']
]);

class HttpError extends Error {
  constructor(status, message, details = undefined) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.details = details;
  }
}

function addSecurityHeaders(response) {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'no-referrer');
  response.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  response.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'"
  );
}

function sendJson(response, status, value) {
  const body = JSON.stringify(value, null, 2);
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body)
  });
  response.end(body);
}

function sendNoContent(response) {
  response.writeHead(204);
  response.end();
}

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLocaleLowerCase('es');
}

function parsePositiveInteger(value, fallback, maximum) {
  const parsed = Number.parseInt(value ?? '', 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }
  return Math.min(parsed, maximum);
}

function parseNumber(value) {
  if (value === null || value === '') {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function validateProduct(input, { partial = false } = {}) {
  if (input === null || typeof input !== 'object' || Array.isArray(input)) {
    throw new HttpError(400, 'El cuerpo debe ser un objeto JSON.');
  }

  const errors = {};
  const requiredFields = ['name', 'category', 'price', 'stock'];

  if (!partial) {
    for (const field of requiredFields) {
      if (!(field in input)) {
        errors[field] = 'Campo obligatorio.';
      }
    }
  }

  if ('name' in input && (typeof input.name !== 'string' || input.name.trim().length < 3)) {
    errors.name = 'Debe contener al menos 3 caracteres.';
  }

  if ('category' in input && (typeof input.category !== 'string' || input.category.trim().length < 2)) {
    errors.category = 'Debe contener al menos 2 caracteres.';
  }

  if ('description' in input && typeof input.description !== 'string') {
    errors.description = 'Debe ser texto.';
  }

  if ('price' in input && (typeof input.price !== 'number' || !Number.isFinite(input.price) || input.price < 0)) {
    errors.price = 'Debe ser un numero mayor o igual que 0.';
  }

  if ('stock' in input && (!Number.isInteger(input.stock) || input.stock < 0)) {
    errors.stock = 'Debe ser un entero mayor o igual que 0.';
  }

  if ('rating' in input && (typeof input.rating !== 'number' || input.rating < 0 || input.rating > 5)) {
    errors.rating = 'Debe estar entre 0 y 5.';
  }

  if ('featured' in input && typeof input.featured !== 'boolean') {
    errors.featured = 'Debe ser booleano.';
  }

  if (Object.keys(errors).length > 0) {
    throw new HttpError(422, 'El producto no es valido.', errors);
  }
}

function sanitizeProductInput(input) {
  const output = {};
  const allowedFields = ['name', 'category', 'description', 'price', 'stock', 'rating', 'featured'];
  for (const field of allowedFields) {
    if (field in input) {
      output[field] = input[field];
    }
  }

  if (typeof output.name === 'string') output.name = output.name.trim();
  if (typeof output.category === 'string') output.category = output.category.trim();
  if (typeof output.description === 'string') output.description = output.description.trim();

  return output;
}

async function readRequestBody(request, maximumBytes) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > maximumBytes) {
      throw new HttpError(413, 'El cuerpo de la peticion supera el limite permitido.');
    }
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}

async function readJson(request) {
  const contentType = request.headers['content-type'] ?? '';
  if (!contentType.includes('application/json')) {
    throw new HttpError(415, 'Se esperaba Content-Type application/json.');
  }

  const body = await readRequestBody(request, MAX_JSON_BYTES);
  if (body.length === 0) {
    throw new HttpError(400, 'El cuerpo JSON no puede estar vacio.');
  }

  try {
    return JSON.parse(body.toString('utf8'));
  } catch {
    throw new HttpError(400, 'El cuerpo no contiene JSON valido.');
  }
}

function buildProductList(products, url) {
  const search = normalizeText(url.searchParams.get('search'));
  const category = normalizeText(url.searchParams.get('category'));
  const minPrice = parseNumber(url.searchParams.get('minPrice'));
  const maxPrice = parseNumber(url.searchParams.get('maxPrice'));
  const page = parsePositiveInteger(url.searchParams.get('page'), 1, 10_000);
  const limit = parsePositiveInteger(url.searchParams.get('limit'), 8, 50);
  const sort = url.searchParams.get('sort') ?? 'name';
  const order = url.searchParams.get('order') === 'desc' ? 'desc' : 'asc';
  const allowedSortFields = new Set(['name', 'category', 'price', 'stock', 'rating', 'createdAt']);
  const sortField = allowedSortFields.has(sort) ? sort : 'name';

  let filtered = products.filter((product) => {
    const haystack = normalizeText(`${product.name} ${product.description} ${product.category}`);
    if (search && !haystack.includes(search)) return false;
    if (category && normalizeText(product.category) !== category) return false;
    if (minPrice !== undefined && product.price < minPrice) return false;
    if (maxPrice !== undefined && product.price > maxPrice) return false;
    return true;
  });

  filtered = filtered.toSorted((left, right) => {
    const leftValue = left[sortField];
    const rightValue = right[sortField];
    let result;

    if (typeof leftValue === 'string' && typeof rightValue === 'string') {
      result = leftValue.localeCompare(rightValue, 'es', { sensitivity: 'base' });
    } else {
      result = Number(leftValue) - Number(rightValue);
    }

    return order === 'desc' ? -result : result;
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const normalizedPage = Math.min(page, totalPages);
  const start = (normalizedPage - 1) * limit;

  return {
    items: filtered.slice(start, start + limit),
    meta: {
      page: normalizedPage,
      limit,
      total,
      totalPages,
      sort: sortField,
      order
    }
  };
}

async function maybeDelay(url) {
  const requestedDelay = Number.parseInt(url.searchParams.get('delay') ?? '0', 10);
  if (!Number.isFinite(requestedDelay) || requestedDelay <= 0) return;
  const delay = Math.min(requestedDelay, 5_000);
  await new Promise((resolve) => setTimeout(resolve, delay));
}

function resolveStaticPath(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    throw new HttpError(400, 'La URL no es valida.');
  }

  if (decoded === '/') return path.join(projectRoot, 'site', 'index.html');
  const relative = decoded.replace(/^\/+/, '');
  if (relative.split('/').some((part) => part.startsWith('.'))) {
    throw new HttpError(404, 'Recurso no encontrado.');
  }

  const resolved = path.resolve(projectRoot, relative);
  if (!resolved.startsWith(`${projectRoot}${path.sep}`) && resolved !== projectRoot) {
    throw new HttpError(403, 'Ruta no permitida.');
  }
  return resolved;
}

async function serveStatic(request, response, pathname) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    throw new HttpError(405, 'Metodo no permitido para este recurso.');
  }

  let filePath = resolveStaticPath(pathname);
  let info;
  try {
    info = await stat(filePath);
  } catch {
    throw new HttpError(404, 'Recurso no encontrado.');
  }

  if (info.isDirectory()) {
    filePath = path.join(filePath, 'index.html');
    try {
      info = await stat(filePath);
    } catch {
      throw new HttpError(404, 'La carpeta no contiene index.html.');
    }
  }

  if (!info.isFile()) {
    throw new HttpError(404, 'Recurso no encontrado.');
  }

  const body = await readFile(filePath);
  const contentType = mimeTypes.get(path.extname(filePath).toLowerCase()) ?? 'application/octet-stream';
  response.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': body.length,
    'Cache-Control': 'no-store'
  });
  response.end(request.method === 'HEAD' ? undefined : body);
}

export function createAppServer() {
  let products = cloneSeedProducts();

  return createHttpServer(async (request, response) => {
    addSecurityHeaders(response);

    try {
      const url = new URL(request.url ?? '/', 'http://localhost');
      const pathname = url.pathname;

      if (pathname.startsWith('/api/')) {
        response.setHeader('Cache-Control', 'no-store');
        await maybeDelay(url);

        if (request.method === 'OPTIONS') {
          response.writeHead(204, {
            Allow: 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS'
          });
          response.end();
          return;
        }

        if (pathname === '/api/health' && request.method === 'GET') {
          sendJson(response, 200, { status: 'ok', productCount: products.length });
          return;
        }

        if (pathname === '/api/categories' && request.method === 'GET') {
          const categories = [...new Set(products.map((product) => product.category))].toSorted((a, b) =>
            a.localeCompare(b, 'es')
          );
          sendJson(response, 200, { items: categories });
          return;
        }

        if (pathname === '/api/products' && request.method === 'GET') {
          const forcedStatus = Number.parseInt(url.searchParams.get('status') ?? '', 10);
          if (forcedStatus >= 400 && forcedStatus <= 599) {
            throw new HttpError(forcedStatus, `Error ${forcedStatus} simulado para la practica.`);
          }
          sendJson(response, 200, buildProductList(products, url));
          return;
        }

        if (pathname === '/api/products' && request.method === 'POST') {
          const input = await readJson(request);
          validateProduct(input);
          const sanitized = sanitizeProductInput(input);
          const product = {
            id: randomUUID(),
            name: sanitized.name,
            category: sanitized.category,
            description: sanitized.description ?? '',
            price: sanitized.price,
            stock: sanitized.stock,
            rating: sanitized.rating ?? 0,
            featured: sanitized.featured ?? false,
            createdAt: new Date().toISOString()
          };
          products = [product, ...products];
          sendJson(response, 201, product);
          return;
        }

        const productMatch = pathname.match(/^\/api\/products\/([^/]+)$/);
        if (productMatch) {
          const id = decodeURIComponent(productMatch[1]);
          const index = products.findIndex((product) => product.id === id);
          if (index === -1) throw new HttpError(404, 'Producto no encontrado.');

          if (request.method === 'GET') {
            sendJson(response, 200, products[index]);
            return;
          }

          if (request.method === 'PUT' || request.method === 'PATCH') {
            const input = await readJson(request);
            validateProduct(input, { partial: request.method === 'PATCH' });
            const sanitized = sanitizeProductInput(input);
            const current = products[index];
            const replacement = request.method === 'PUT'
              ? {
                  id: current.id,
                  name: sanitized.name,
                  category: sanitized.category,
                  description: sanitized.description ?? '',
                  price: sanitized.price,
                  stock: sanitized.stock,
                  rating: sanitized.rating ?? 0,
                  featured: sanitized.featured ?? false,
                  createdAt: current.createdAt
                }
              : { ...current, ...sanitized, id: current.id, createdAt: current.createdAt };

            products = products.with(index, replacement);
            sendJson(response, 200, replacement);
            return;
          }

          if (request.method === 'DELETE') {
            products = products.filter((product) => product.id !== id);
            sendNoContent(response);
            return;
          }

          throw new HttpError(405, 'Metodo no permitido para productos.');
        }

        if (pathname === '/api/upload' && request.method === 'POST') {
          const contentType = request.headers['content-type'] ?? '';
          if (!contentType.startsWith('multipart/form-data;')) {
            throw new HttpError(415, 'Se esperaba multipart/form-data.');
          }
          const body = await readRequestBody(request, MAX_UPLOAD_BYTES);
          sendJson(response, 201, {
            message: 'Archivo recibido para la practica.',
            receivedBytes: body.length,
            contentType
          });
          return;
        }

        if (pathname === '/api/reset' && request.method === 'POST') {
          products = cloneSeedProducts();
          sendJson(response, 200, { status: 'reset', productCount: products.length });
          return;
        }

        throw new HttpError(404, 'Endpoint no encontrado.');
      }

      await serveStatic(request, response, pathname);
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 500;
      const message = error instanceof Error ? error.message : 'Error interno inesperado.';
      const details = error instanceof HttpError ? error.details : undefined;
      if (status >= 500 && !(error instanceof HttpError)) {
        console.error(error);
      }
      sendJson(response, status, {
        error: {
          status,
          message,
          ...(details === undefined ? {} : { details })
        }
      });
    }
  });
}
