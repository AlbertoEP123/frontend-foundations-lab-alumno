const modal = document.getElementById("myModal");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.querySelector(".close");
const productForm = document.getElementById("productForm");
const tableBody = document.querySelector("[data-table-datos]");
const listStatus = document.getElementById("listStatus");

let products = [];

openModalButton.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`La petición falló (${response.status} ${response.statusText}).`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function loadProducts() {
  listStatus.textContent = "Cargando productos...";

  try {
const data = await requestJson("/api/products");
    if (!data || !Array.isArray(data.items)) {
      throw new Error("La respuesta de la API no contiene una lista de productos.");
    }

    products = data.items;
    renderProducts();
    listStatus.textContent = products.length === 0
      ? "No hay productos."
      : `${products.length} producto(s) cargado(s).`;
    return true;
  } catch (error) {
    listStatus.textContent = `No se pudieron cargar los productos: ${error.message}`;
    return false;
  }
}

function renderProducts() {
  tableBody.replaceChildren();

  products.forEach((product) => {
    const row = document.createElement("tr");
    const values = [
      product.name,
      product.category,
      Number(product.price).toFixed(2),
      String(product.stock)
    ];

    values.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });

    const actionsCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Borrar";
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.id = product.id;
    actionsCell.append(deleteButton);
    row.append(actionsCell);
    tableBody.append(row);
  });
}

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fields = new FormData(productForm);
  const product = {
    name: fields.get("name").trim(),
    category: fields.get("category").trim(),
    price: Number(fields.get("price")),
    stock: Number(fields.get("stock"))
  };

  try {
await requestJson("/api/products", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(product)
});

    productForm.reset();
    modal.style.display = "none";
    const refreshed = await loadProducts();
    if (refreshed) {
      listStatus.textContent = "Producto añadido correctamente.";
    } else {
      listStatus.textContent = "Producto añadido, pero no se pudo actualizar la lista.";
    }
  } catch (error) {
    listStatus.textContent = `No se pudo añadir el producto: ${error.message}`;
  }
});

loadProducts();
