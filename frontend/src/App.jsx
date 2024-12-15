import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';  // useLocation imported here
import Navbar from './components/Navbar/Navbar';  // This will be used on all pages except login/register
import Nav from './components/Navbar/Nav';  // Import the new Nav component for login/register
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Cart from './pages/Cart/Cart';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  const location = useLocation();  // Get the current route location

  // Check if the current route is either /login or /register
  const showNavbar = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <div className="app">
      {location.pathname === '/login' || location.pathname === '/register' ? (
        <Nav />
      ) : (
        <Navbar /> 
      )}
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/dashboard" element={<Dashboard />} /> 
          
    
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

function AppWrapper() {
  return (
    <AuthProvider>
      <Router> {/* Ensure Router is at the top level here */}
        <App />
      </Router>
    </AuthProvider>
  );
}

export default AppWrapper;
