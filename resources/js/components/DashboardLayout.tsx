// resources/js/components/DashboardLayout.tsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* サイドメニュー */}
      <aside style={{ width: '200px', background: '#f0f0f0', padding: '1rem' }}>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/dashboard">ダッシュボード</Link></li>
            <li><Link to="/dashboard/profile">プロフィール</Link></li>
            <li><Link to="/dashboard/reservations">予約一覧</Link></li>
            <li><Link to="/logout">ログアウト</Link></li>
          </ul>
        </nav>
      </aside>

      {/* メインコンテンツ */}
      <main style={{ flex: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
