import React from 'react';
import { useAuth } from '../hooks/useAuth';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>ダッシュボードへようこそ！</h2>
      {user && <p>ログインユーザー: {user.name} ({user.email})</p>}
    </div>
  );
};

export default DashboardHome;
