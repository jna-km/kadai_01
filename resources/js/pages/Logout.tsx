import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const Logout = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.post('/api/logout');
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        setUser(null);
        navigate('/login');
      }
    };
    performLogout();
  }, [setUser, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
