// Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2c3e50' }}>トップページ</h1>
      <p>ようこそ、予約くんへ！</p>
      <nav>
        <Link to="/user/login" style={{ marginRight: '1rem' }}>ユーザーログイン</Link>
        <Link to="/operator/login">管理者ログイン</Link>
      </nav>
    </div>
  );
}

export default Home;
