import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute: React.FC = () => {
  const { user, operator, role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading application...</div>;
  }

  // 認証済みであれば通過
  if (role === 'user' && user) {
    return <Outlet />;
  }

  if (role === 'operator' && operator) {
    return <Outlet />;
  }

  // 未認証時はログインページへ
  // operatorページなら operator/login へ
  const redirectTo = location.pathname.startsWith('/operator') ? '/operator/login' : '/login';
  return <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
