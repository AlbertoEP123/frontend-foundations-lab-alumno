const modal = document.getElementById("myModal");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.querySelector(".close");
const productForm = document.getElementById("productForm");
const tableBody = document.querySelector("[data-table-datos]");
const listStatus = document.getElementById("listStatus");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const directionSelect = document.getElementById("direction");
const categorySelect = document.getElementById("category");
const baseCategories = ["Conectividad", "Audio", "Ergonomía", "Energía", "Almacenamiento"];

const STORAGE_KEY = "capstone-products";
let products = [];
let visibleProducts = [];

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

searchInput?.addEventListener("input", () => {
  applySearchAndRender();
});

sortSelect?.addEventListener("change", () => {
  applySearchAndRender();
});

directionSelect?.addEventListener("change", () => {
  applySearchAndRender();
});

categorySelect?.addEventListener("change", () => {
  applySearchAndRender();
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

function saveProductsToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function updateCategoryOptions() {
  if (!categorySelect) return;

  const currentValue = categorySelect.value;
  const dynamicCategories = [...new Set(products.map((product) => String(product.category ?? "").trim()).filter(Boolean))];
  const allCategories = [...new Set([...baseCategories, ...dynamicCategories])];

  categorySelect.innerHTML = '<option value="">Todas</option>';
  allCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.append(option);
  });

  categorySelect.value = allCategories.includes(currentValue) || currentValue === "" ? currentValue : "";
}

function loadProductsFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function loadProducts() {


  const stored = loadProductsFromStorage();
  if (stored) {
    products = stored;
    updateCategoryOptions();
    applySearchAndRender();

    if (visibleProducts.length === 0) {
      listStatus.textContent = "No hay productos disponibles.";
    } else {
      listStatus.textContent = `${visibleProducts.length} producto(s) disponible(s).`;
    }
    return true;
  }
  else {
    setTimeout(() => {
      listStatus.textContent = "Cargando productos...";
    }, 200);
  }

  try {
    const data = await requestJson("/api/products");
    if (!data || !Array.isArray(data.items)) {
      throw new Error("La respuesta de la API no contiene una lista de productos.");
    }

    products = data.items;
    saveProductsToStorage();
    updateCategoryOptions();
    applySearchAndRender();
    applySearchAndRender();
    if (visibleProducts.length === 0) {
      listStatus.textContent = "No hay productos disponibles.";
    } else {
      listStatus.textContent = `${visibleProducts.length} producto(s) cargado(s).`;
    }
    return true;
  } catch (error) {
    listStatus.textContent = `No se pudieron cargar los productos: ${error.message}`;
    return false;
  }
}

function applySearchAndRender() {
  const searchTerm = (searchInput?.value ?? "").trim().toLowerCase();
  const sortField = sortSelect?.value ?? "name";
  const direction = directionSelect?.value ?? "asc";

  visibleProducts = products.filter((product) => {
    const text = `${product.name ?? ""} ${product.category ?? ""}`.toLowerCase();
    const matchesSearch = !searchTerm || text.includes(searchTerm);
    const matchesCategory = !categorySelect?.value || product.category === categorySelect.value;
    return matchesSearch && matchesCategory;
  });

  visibleProducts.sort((a, b) => {
    let left = a[sortField];
    let right = b[sortField];

    if (sortField === "name" || sortField === "category") {
      left = String(left ?? "").toLowerCase();
      right = String(right ?? "").toLowerCase();
      const result = left.localeCompare(right);
      return direction === "desc" ? -result : result;
    }

    const result = Number(left ?? 0) - Number(right ?? 0);
    return direction === "desc" ? -result : result;
  });

  renderProducts();

  if (visibleProducts.length === 0) {
    listStatus.textContent = "No hay productos que coincidan con la búsqueda.";
  } else {
    listStatus.textContent = `${visibleProducts.length} producto(s) encontrado(s).`;
  }
}

function renderProducts() {
  tableBody.replaceChildren();

  visibleProducts.forEach((product) => {
    const row = document.createElement("tr");
    const values = [
      product.name,
      product.category,
      Number(product.price).toFixed(2),
      Number(product.rating),
      String(product.stock),
      String(product.description),

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
    deleteButton.className = "delete-button";
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.id = product.id;
    actionsCell.append(deleteButton);
    row.append(actionsCell);
    tableBody.append(row);
  });

  if (visibleProducts.length === 0) {
    listStatus.textContent = "No hay productos que coincidan con la búsqueda.";
  }
}

tableBody.addEventListener("click", async (event) => {

 const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.dataset.action !== "delete") return;

    const id = target.dataset.id;
    if (!id) return;
  let respuesta = confirm("¿Quieres eliminar producto?");

  if (respuesta) {
   

    products = products.filter((product) => product.id !== id);
    saveProductsToStorage();
    applySearchAndRender();
    if (visibleProducts.length === 0) {
      listStatus.textContent = "Producto borrado. No quedan otros productos visibles.";
    } else {
      listStatus.textContent = "Producto borrado.";
    }

    try {
      await requestJson(`/api/products/${encodeURIComponent(id)}`, {
        method: "DELETE"
      });
    } catch {
    }

    listStatus.textContent = "Producto borrado.";
  } else {
    return;
  }


});

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fields = new FormData(productForm);
  const product = {
    id: crypto.randomUUID(),
    name: String(fields.get("name") ?? "").trim(),
    category: String(fields.get("category") ?? "").trim(),
    price: Number(fields.get("price")),
    rating: Number(fields.get("rating")),
    stock: Number(fields.get("stock")),
    description: String(fields.get("description"))
  };

  products = [product, ...products];
  saveProductsToStorage();
  updateCategoryOptions();
  applySearchAndRender();

  if (visibleProducts.length === 0) {
    listStatus.textContent = "Producto añadido, pero no hay otros productos visibles.";
  } else {
    listStatus.textContent = "Producto añadido correctamente.";
  }

  try {
    await requestJson("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: product.name,
        category: product.category,
        price: product.price,
        rating:product.rating,
        stock: product.stock,
        description: product.description
      })
    });
  } catch {
  }

  productForm.reset();
  modal.style.display = "none";
  listStatus.textContent = "Producto añadido.";
});

updateCategoryOptions();
loadProducts();
