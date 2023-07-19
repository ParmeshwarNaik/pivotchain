// Fetch the products and update the product list
function fetchProducts() {
    fetch('/products')
      .then((response) => response.json())
      .then((products) => {
        products.innerHTML = '';
        products.forEach((product) => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <span>${product.name}</span>
            <span>${product.price}</span>
            <span>${product.description}</span>
            <button onclick="editProduct('${product._id}')">Edit</button>
            <button onclick="deleteProduct('${product._id}')">Delete</button>
          `;
          products.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error('Error fetching products', error);
      });
  }
  
  // Add or update a product
  function addOrUpdateProduct(productData) {
    const { id, name, price, description } = productData;
    const url = id ? `/products/${id}` : '/products';
    const method = id ? 'PUT' : 'POST';
  
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price, description }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Product added/updated:', result);
        fetchProducts(); // Refresh the product list
      })
      .catch((error) => {
        console.error('Error adding/updating product', error);
      });
  }
  
  // Delete a product
  function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
      fetch(`/products/${productId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((result) => {
          console.log('Product deleted:', result);
          fetchProducts(); // Refresh the product list
        })
        .catch((error) => {
          console.error('Error deleting product', error);
        });
    }
  }
  
  // Handle the form submission
  productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
  
    // Clear form inputs
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('description').value = '';
  
    addOrUpdateProduct({ name, price, description });
  });
  
  // Initial fetch to populate the product list
  fetchProducts();
  