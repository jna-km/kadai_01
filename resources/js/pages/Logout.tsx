import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const Logout = () => {
  const { role, setUserAndRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      // roleに応じてログアウトAPIを決定
      const logoutUrl = role === 'operator' ? '/api/operator/logout' : '/api/logout';
      try {
        await axios.post(logoutUrl);
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        setUserAndRole(null, null);
        navigate('/login');
      }
    };
    performLogout();
  }, [role, setUserAndRole, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
