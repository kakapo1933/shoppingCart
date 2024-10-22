import React, { useState, useEffect } from 'react';
import { fetchAllProducts, createProduct, updateProduct, deleteProduct } from "../api/apiService.js";
import Cart from './Cart.jsx';
import '../styles/App.css';
import { promotionRules } from '../promotions/promotionRules';

function App() {
  const [products, setProducts] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    displayProducts();
  }, []);

  const displayProducts = async () => {
    try {
      const fetchedProducts = await fetchAllProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error displaying products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.productName.value;
    const price = Number(e.target.productPrice.value);
    const product = { name, price };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct, product);
      } else {
        await createProduct(product);
      }
      e.target.reset();
      setEditingProduct(null);
      await displayProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (id) => {
    const product = products[id];
    setEditingProduct(id);
    document.getElementById("productName").value = product.name;
    document.getElementById("productPrice").value = product.price;
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        await displayProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleAddToCart = (id) => {
    const productToAdd = products[id];
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...productToAdd, id, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div>
      <h1>Product Management</h1>
      <div id="productList">
        {Object.entries(products).map(([id, product]) => (
          <div key={id} className="product-item">
            <div className="product-info">
              {product.name} - ${product.price}
            </div>
            <div className="product-actions">
              <button className="edit" onClick={() => handleEdit(id)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(id)}>Delete</button>
              <button className="add-to-cart" onClick={() => handleAddToCart(id)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <h2>Add/Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" id="productName" name="productName" placeholder="Product Name" required />
        <input type="number" id="productPrice" name="productPrice" placeholder="Price" step="0.01" required />
        <button type="submit">{editingProduct ? 'Update' : 'Save'} Product</button>
      </form>
      <Cart 
        cart={cart} 
        onRemove={handleRemoveFromCart} 
        onUpdateQuantity={handleUpdateQuantity}
        promotionRule={promotionRules.ruleOne}
      />
    </div>
  );
}

export default App;
