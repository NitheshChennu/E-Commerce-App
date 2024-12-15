import api from '../utils/api';

const ADMIN_EMAIL = 'Admin12@gmail.com';
const ADMIN_PASSWORD = '12345@Admin';

export const loginUser = async (credentials) => {
  try {
    // Check for admin login
    if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
      return {
        token: 'admin-token',
        isAdmin: true,
        name: 'Admin',
        email: ADMIN_EMAIL
      };
    }

    const response = await api.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const checkAuth = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  return { token, user };
};