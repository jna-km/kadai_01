import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

const DashboardLayout: React.FC = () => {
  // ↓↓↓ userと一緒にsetUserも取り出すように修正 ↓↓↓
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // これでsetUserが使えるようになります
      setUser(null);
      navigate('/login');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: '200px', background: '#f0f0f0', padding: '1rem' }}>
        <nav>
          <h3>Welcome, {user?.name}</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/dashboard/reservations">My Reservations</Link></li>
            {/* ↓↓↓ ログアウトはLinkではなくbuttonに変更すると、よりセマンティックです ↓↓↓ */}
            <li><button onClick={handleLogout} style={{all: 'unset', cursor: 'pointer', textDecoration: 'underline', color: 'blue'}}>Logout</button></li>
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
