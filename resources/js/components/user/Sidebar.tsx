

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 h-screen shadow-md">
      <nav className="flex flex-col p-4 space-y-4">
        <Link to="/user/dashboard" className="text-blue-700 hover:underline">
          ダッシュボード
        </Link>
        <Link to="/user/reservations" className="text-blue-700 hover:underline">
          予約一覧
        </Link>
        <Link to="/user/profile" className="text-blue-700 hover:underline">
          プロフィール
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
