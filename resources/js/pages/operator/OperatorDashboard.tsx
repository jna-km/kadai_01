import React from 'react';
import Sidebar from '../../components/operator/Sidebar';
import Header from '../../components/operator/Header';

const OperatorDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">ダッシュボード</h2>
          <p>ここに統計情報や概要を表示します。</p>
        </main>
      </div>
    </div>
  );
};

export default OperatorDashboard;
