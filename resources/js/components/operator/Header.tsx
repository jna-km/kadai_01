import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useAuthStore } from '../../stores/authStore';

type HeaderProps = {
  onLogout: () => Promise<void>;
};

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const setAuthState = useAuthStore.getState().setAuthState;

  const handleLogout = () => {
    // ここでAPIログアウト処理や状態クリアを実装
    setAuthState(null, null, null);
    // 必要に応じてリダイレクトなど
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="bg-blue-600 shadow-md px-4 sm:px-6 py-3 flex justify-between items-center sticky top-0 z-20 text-white w-full box-border max-w-full overflow-x-hidden">
      <h1 className="text-xl font-bold tracking-wide">オペレーター管理画面</h1>
      <button
        className="flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 font-semibold px-3 py-1.5 rounded-md shadow transition"
        onClick={handleLogout}
      >
        {/* @ts-ignore */}
        <FiLogOut size={18} />
        ログアウト
      </button>
    </header>
  );
};

export default Header;
