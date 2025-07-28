import React from 'react';
import { useAuthStore } from '../../stores/authStore';

const DashboardHome: React.FC = () => {
  const user = useAuthStore(state => state.user);

  if (!user) {
    return <div>ユーザーがログインしていません。</div>;
  }

  return (
    <div>
      <h2>ダッシュボードへようこそ！</h2>
      {user && <p>ログインユーザー: {user.name} ({user.email})</p>}
    </div>
  );
};

export default DashboardHome;
