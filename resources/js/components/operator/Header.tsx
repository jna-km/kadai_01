import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useAuthStore } from '../../stores/authStore';

const Header: React.FC = () => {
  const setAuthState = useAuthStore(state => state.setAuthState);

  const handleLogout = () => {
    // ここでAPIログアウト処理や状態クリアを実装
    setAuthState(null, null, null);
    // 必要に応じてリダイレクトなど
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-xl font-bold text-gray-800">オペレーター管理画面</h1>
      <button
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
        onClick={handleLogout}
      >
        <FiLogOut size={18} />
        ログアウト
      </button>
    </header>
  );
};

export default Header;
