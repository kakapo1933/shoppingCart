import axios from 'axios';
import config from './apiConfig';

const api = axios.create({
  baseURL: config.baseURL,
});

export const fetchAllProducts = async () => {
  try {
    const response = await api.get('/api/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/api/products', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/api/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/api/products/${id}`);
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};
