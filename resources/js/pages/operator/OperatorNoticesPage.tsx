import React from 'react';
import Sidebar from '../../components/operator/Sidebar';
import Header from '../../components/operator/Header';

const OperatorNoticesPage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">Notices 管理</h2>
          <p>Noticesの一覧と編集機能をここに追加します。</p>
        </main>
      </div>
    </div>
  );
};

export default OperatorNoticesPage;
