const form = document.querySelector('[data-form]');
const list = document.querySelector('[data-list]');
const status = document.querySelector('[data-status]');
let products = [];

function clearErrors() {
  // TODO
}

function showValidationErrors() {
  // TODO: devuelve el primer control invalido.
  return null;
}

function toProductDraft(formData) {
  // TODO: convierte numeros y checkbox.
  return Object.fromEntries(formData);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // TODO: validar, crear producto, renderizar, resetear y enfocar.
  for (let index = 0; index < form.elements.length; index++) {
    const element = form.elements[index];
    if(element.id === "product-name"){
      if(element.checkValidity()){
        
      }
    }

    
  }
});
