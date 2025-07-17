import React from 'react';
import { FiLogOut } from 'react-icons/fi';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-xl font-bold text-gray-800">オペレーター管理画面</h1>
      <button
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
        onClick={() => console.log('ログアウト処理')}
      >
        <FiLogOut size={18} />
        ログアウト
      </button>
    </header>
  );
};

export default Header;
