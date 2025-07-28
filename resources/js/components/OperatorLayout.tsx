

import { Outlet } from "react-router-dom";
import Sidebar from "@/components/operator/Sidebar";
import Header from "@/components/operator/Header";

export default function OperatorLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* サイドバー */}
      <Sidebar />

      {/* メインエリア */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* ヘッダー */}
        <Header />

        {/* コンテンツエリア */}
        <main className="flex-1 overflow-auto p-6 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
