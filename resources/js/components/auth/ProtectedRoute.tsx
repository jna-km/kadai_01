import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute: React.FC = () => {
  const { user, operator, role, isLoading, checkLoginStatus } = useAuth();
  const location = useLocation();

  useEffect(() => {
    checkLoginStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>Loading application...</div>;
  }

  if (role === 'user' && user) {
    return <Outlet />;
  }
  if (role === 'operator' && operator) {
    return <Outlet />;
  }

  const redirectTo = location.pathname.startsWith('/operator') ? '/operator/login' : '/user/login';
  return <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
