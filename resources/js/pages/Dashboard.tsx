import React from 'react';
import axios from 'axios';
interface DashboardProps {
  user: {
    name: string;
    email: string;
    [key: string]: any;
  };
}


const Dashboard: React.FC<DashboardProps> = ({ user }) => {

  return (
    <div>
      <h1>ようこそ、{user.name} さん</h1>
      <p>メールアドレス: {user.email}</p>
      <p>ユーザーID: {user.id}</p>
      {/* 必要に応じて他の情報も追加できます */}
    </div>
  );
};

export default Dashboard;
