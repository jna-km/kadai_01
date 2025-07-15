import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1>管理者ダッシュボード</h1>
      <p>ここは管理者専用のダッシュボードです。</p>
      <nav>
        <Link to="/logout">ログアウト</Link>
      </nav>
    </div>
  );
};

export default AdminDashboard;
