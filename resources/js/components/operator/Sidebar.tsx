import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded-md transition-colors duration-150 ${
      isActive ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`;

  return (
    <aside className="w-56 bg-gray-900 text-gray-200 h-screen px-6 py-5 shadow-md border-r border-slate-700">
      <nav>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">管理メニュー</p>
        <ul className="space-y-3 text-sm">
          <li>
            <NavLink to="/operator/dashboard" className={linkClasses}>
              ダッシュボード
            </NavLink>
          </li>
          <li>
            <NavLink to="/operator/reservations" className={linkClasses}>
              予約管理
            </NavLink>
          </li>
          <li>
            <NavLink to="/operator/users" className={linkClasses}>
              ユーザー管理
            </NavLink>
          </li>
          <li>
            <NavLink to="/operator/services" className={linkClasses}>
              サービス管理
            </NavLink>
          </li>
          <li>
            <NavLink to="/operator/holidays" className={linkClasses}>
              休日設定
            </NavLink>
          </li>
          <li>
            <NavLink to="/operator/notices" className={linkClasses}>
              お知らせ管理
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
