import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: '200px', background: '#f0f0f0', padding: '1rem' }}>
        <nav>
          <h3>Welcome, {user?.name}</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/dashboard/reservations">My Reservations</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
