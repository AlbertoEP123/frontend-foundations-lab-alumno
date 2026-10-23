export class StockError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'StockError';
    this.code = 'STOCK_ERROR';
    this.details = details;
  }
}

export function calculateFinalPrice({ price, discountPercent = 0, taxPercent = 0 }) {
  if(discountPercent<0 || discountPercent>100 || taxPercent < 0 || taxPercent > 100){
    throw new RangeError("Error el porcentaje es incorrecto");
  }
  const calcDescuento = price -(price * discountPercent / 100);
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

  if (draft.price < 0) {
    errors.price = 'El precio debe ser mayor o igual que 0.';
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
  const resultStock = movement + product.stock;

  if (resultStock < 0) {
    throw new StockError('Stock no puede ser negativo', {
      currentStock: product.stock,
      movement
    });
  }

  return { ...product, stock: resultStock };
}
