import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded hover:bg-gray-700 ${
      isActive ? 'bg-gray-900 font-bold' : ''
    }`;

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <nav>
        <ul className="space-y-2">
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
