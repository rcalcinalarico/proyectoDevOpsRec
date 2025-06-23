const API_URL = 'http://backend:3000/products';

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  document.getElementById('productForm').addEventListener('submit', handleFormSubmit);
});

async function loadProducts() {
  const tableBody = document.querySelector('#productsTable tbody');
  tableBody.innerHTML = '';
  try {
    const res = await fetch(API_URL);
    const products = await res.json();
    products.forEach(p => {
      tableBody.innerHTML += `
        <tr>
          <td>${p.id}</td>
          <td>${p.name}</td>
          <td>${p.description}</td>
          <td>${p.price}</td>
          <td>${p.stock}</td>
          <td>
            <button class="btn btn-sm btn-warning" onclick='editProduct(${JSON.stringify(p)})'>Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Eliminar</button>
          </td>
        </tr>
      `;
    });
  } catch (err) {
    alert('Error cargando productos');
    console.error(err);
  }
}

function editProduct(product) {
  document.getElementById('productId').value = product.id;
  document.getElementById('name').value = product.name;
  document.getElementById('description').value = product.description;
  document.getElementById('price').value = product.price;
  document.getElementById('stock').value = product.stock;
}

function resetForm() {
  document.getElementById('productForm').reset();
  document.getElementById('productId').value = '';
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('productId').value;
  const product = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: parseFloat(document.getElementById('price').value),
    stock: parseInt(document.getElementById('stock').value),
  };

  try {
    const res = await fetch(id ? `${API_URL}/${id}` : API_URL, {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (!res.ok) throw new Error('Error en la operación');

    resetForm();
    loadProducts();
  } catch (err) {
    alert('Error guardando producto');
    console.error(err);
  }
}

async function deleteProduct(id) {
  if (!confirm('¿Seguro que deseas eliminar este producto?')) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error eliminando');
    loadProducts();
  } catch (err) {
    alert('Error eliminando producto');
    console.error(err);
  }
}
