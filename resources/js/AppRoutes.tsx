import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import UserDashboardPage from './pages/UserDashboardPage';
import OperatorDashboardPage from './pages/OperatorDashboardPage';

function AppRoutes() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/check-login', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.user) {
          setUser(data.user);
          setRole(data.role);
          if (data.role === 'user') {
            navigate('/user/dashboard');
          } else if (data.role === 'operator') {
            navigate('/operator/dashboard');
          }
        } else {
          setUser(null);
          setRole('');
        }
      })
      .catch(() => {
        setUser(null);
        setRole('');
      });
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/user/dashboard" element={<UserDashboardPage />} />
      <Route path="/operator/dashboard" element={<OperatorDashboardPage />} />
      <Route path="/" element={
        user ? (
          <p>ログイン中：{user?.name}（ロール：{role}）</p>
        ) : (
          <div>
            <p>ログインされていないようです。以下からログインしてください。</p>
            <ul>
              <li><a href="/login">一般ユーザーログイン</a></li>
              <li><a href="/operator/login">オペレーター用ログイン</a></li>
            </ul>
          </div>
        )
      } />
    </Routes>
  );
}

export default AppRoutes;
