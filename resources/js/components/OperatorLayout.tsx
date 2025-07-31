import { Outlet } from "react-router-dom";
import Sidebar from "@/components/operator/Sidebar";
import Header from "@/components/operator/Header";
import Footer from "@/components/operator/Footer";

export default function OperatorLayout() {
  // ダミーのログアウト関数
  const handleLogout = async () => {
    // 必要に応じてログアウト処理を実装
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* サイドバー */}
      <Sidebar />

      {/* メインエリア */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* ヘッダー */}
        <Header onLogout={handleLogout} />

        {/* コンテンツエリア */}
        <main className="flex-1 overflow-auto p-6 min-w-0">
          <Outlet />
        </main>
        {/* フッター */}
        <Footer />
      </div>
    </div>
  );
}
