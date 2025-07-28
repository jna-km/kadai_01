

import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 shadow-md px-4 sm:px-6 py-3 flex justify-between items-center sticky top-0 z-20 text-white w-full box-border max-w-full overflow-x-hidden">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">ユーザーダッシュボード</h1>
        <button
          className="flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-500 font-semibold px-3 py-1.5 rounded-md shadow transition"
          onClick={() => {
            // 仮のログアウト処理（後ほど useAuthStore などと連携予定）
            console.log('ログアウト処理');
          }}
        >
          ログアウト
        </button>
      </div>
    </header>
  );
};

export default Header;
