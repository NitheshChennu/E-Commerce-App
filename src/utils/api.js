import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper function to handle API errors
const handleError = (error) => {
  const message = error.response?.data?.message || error.message || 'An error occurred';
  console.error('API Error:', message);
  return Promise.reject(message);
};

// Helper function to extract data from response
const extractData = (response) => response.data;

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return extractData(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return extractData(response);
  } catch (error) {
    return handleError(error);
  }
};

export default api;