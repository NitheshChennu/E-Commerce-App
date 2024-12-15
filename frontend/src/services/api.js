import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response?.data || []; // Return data or an empty array as fallback
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};

export const getProductById = async (id) => {
  try {
    console.log('Received ID:', id); // Debugging the ID passed to the function

    if (!id || typeof id !== 'string') {
      throw new Error('Invalid product ID provided'); // Validate ID
    }

    const trimmedId = id.trim();
    const url = `/products/${trimmedId}`;
    console.log('API Request URL:', api.defaults.baseURL + url); // Check the full URL

    const response = await api.get(url);

    console.log('API Response:', response);  // Check entire response
    console.log('API Response Data:', response?.data);  // Check response data

    return response?.data; // Return product data
  } catch (error) {
    console.error('API Error:', error);  // Log the entire error object

    if (error.response) {
      console.error('API Response Error:', error.response.data);
      console.error('Error Status:', error.response.status);
    } else {
      console.error('Network or Server Error:', error.message);
    }

    if (error.response?.status === 404) {
      throw new Error('Product not found');
    }

    throw new Error(error.response?.data?.message || 'Failed to fetch product');
  }
};


export default api;