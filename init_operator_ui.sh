#!/bin/bash

echo "=== Operator 管理画面用ファイルを生成します ==="

# === ディレクトリ作成 ===
mkdir -p resources/js/pages/operator
mkdir -p resources/js/components/operator

# === ページ作成（Reservations, Users, Services, Holidays, Notices） ===
for page in Reservations Users Services Holidays Notices
do
  cat <<EOF > resources/js/pages/operator/Operator${page}Page.tsx
import React from 'react';
import Sidebar from '../../components/operator/Sidebar';
import Header from '../../components/operator/Header';

const Operator${page}Page: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">${page} 管理</h2>
          <p>${page}の一覧と編集機能をここに追加します。</p>
        </main>
      </div>
    </div>
  );
};

export default Operator${page}Page;
EOF
done

# === Sidebarコンポーネント ===
cat <<'EOF' > resources/js/components/operator/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <nav>
        <ul className="space-y-4">
          <li><Link to="/operator/dashboard">ダッシュボード</Link></li>
          <li><Link to="/operator/reservations">予約管理</Link></li>
          <li><Link to="/operator/users">ユーザー管理</Link></li>
          <li><Link to="/operator/services">サービス管理</Link></li>
          <li><Link to="/operator/holidays">休日設定</Link></li>
          <li><Link to="/operator/notices">お知らせ管理</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
EOF

# === Headerコンポーネント ===
cat <<'EOF' > resources/js/components/operator/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">管理画面</h1>
      <button className="bg-red-500 text-white px-4 py-2 rounded">ログアウト</button>
    </header>
  );
};

export default Header;
EOF

echo "✅ Operator管理画面のページとコンポーネントを作成しました"
