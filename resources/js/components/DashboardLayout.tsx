import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import Header from '../components/user/Header';
import Sidebar from '../components/user/Sidebar';
import Footer from '../components/user/Footer';

const DashboardLayout: React.FC = () => {
  const { user, setUserAndRole, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const logoutUrl = role === 'operator' ? '/api/operator/logout' : '/api/logout';
    try {
      await axios.post(logoutUrl);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUserAndRole(null, null);
      navigate('/user/login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLogout={handleLogout} />
      <main className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
