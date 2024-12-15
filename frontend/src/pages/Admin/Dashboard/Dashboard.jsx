import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.isAdmin) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <button 
            className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button 
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
        </nav>
      </div>
      <div className="dashboard-content">
        {activeTab === 'products' ? (
          <ProductManagement />
        ) : (
          <UserManagement />
        )}
      </div>
    </div>
  );
};

export default Dashboard;