export class StockError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'StockError';
    this.code = 'STOCK_ERROR';
    this.details = details;

    if (details.productId) {
      this.productId = details.productId;
    }
  }
}

export function calculateFinalPrice({ price, discountPercent = 0, taxPercent = 0 }) {
  if (!Number.isFinite(price) || price < 0) {
    throw new RangeError('El precio debe ser un número finito y no negativo');
  }
  if (discountPercent < 0 || discountPercent > 100) {
    throw new RangeError('Porcentaje de descuento inválido');
  }
  if (taxPercent < 0 || taxPercent > 100) {
    throw new RangeError('Porcentaje de impuesto inválido');
  }
  const calcDescuento = price - (price * discountPercent / 100);
  const calcImpuesto = (calcDescuento * taxPercent / 100);
  const totalPrice = calcDescuento + calcImpuesto;
  const result = parseFloat(totalPrice.toFixed(2));
  return result;
}

export function validateProductDraft(draft) {
  const errors = {};

  if (String(draft.name ?? '').trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres.';
  }

  if (!Number.isFinite(draft.price) || draft.price < 0) {
    errors.price = 'El precio debe ser un número finito y mayor o igual que 0.';
  }

  if (!Number.isInteger(draft.stock) || draft.stock < 0) {
    errors.stock = 'El stock debe ser un entero mayor o igual que 0.';
  }

  return errors;
}

export function canSell(product, quantity) {
  return Number.isInteger(quantity) && quantity > 0 && quantity <= product.stock;
}


export function applyStockMovement(product, movement) {
  // Validar movimiento como entero no nulo
  if (!Number.isInteger(movement) || typeof movement !== 'number' || Number.isNaN(movement) || movement === 0) {
    throw new StockError('Movimiento de stock inválido (debe ser entero, no nulo, numérico y ≠0)', {
      productId: product.id || undefined,
      currentStock: product.stock,
      movement
    });
  }

  const resultStock = movement + product.stock;

  if (resultStock < 0) {
    throw new StockError('Stock no puede ser negativo', {
      productId: product.id || undefined,
      currentStock: product.stock,
      movement
    });
  }

  return { ...product, stock: resultStock };
}
