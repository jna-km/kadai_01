import React, { useState } from 'react';
import axiosClient from '../axiosClient';

const TestApi: React.FC = () => {
  const [userResult, setUserResult] = useState<any>(null);
  const [operatorResult, setOperatorResult] = useState<any>(null);

  // 一般ユーザー
  const handleUserLogin = async () => {
    try {
      await axiosClient.get('/sanctum/csrf-cookie');
      const loginRes = await axiosClient.post('/api/login', {
        email: 'user@example.com',
        password: 'password'
      });
      console.log('ユーザーログイン成功', loginRes.data);

      const res = await axiosClient.get('/api/my-reservations');
      setUserResult(res.data);
    } catch (error: any) {
      console.error('ユーザーAPIエラー:', error.response || error.message);
    }
  };

  // オペレーター
  const handleOperatorLogin = async () => {
    try {
      await axiosClient.get('/sanctum/csrf-cookie');
      const loginRes = await axiosClient.post('/api/operator/login', {
        email: 'admin@example.com',
        password: 'password'
      });
      console.log('オペレーターログイン成功', loginRes.data);

      const res = await axiosClient.get('/api/operator/reservations'); 
      setOperatorResult(res.data);
    } catch (error: any) {
      console.error('オペレーターAPIエラー:', error.response || error.message);
    }
  };

  return (
    <div>
      <h2>APIテスト</h2>
      <div style={{ marginBottom: '16px' }}>
        <button onClick={handleUserLogin}>ユーザーで予約一覧取得</button>
        <button onClick={handleOperatorLogin}>オペレーターで予約一覧取得</button>
      </div>
      <h3>ユーザー予約結果</h3>
      <pre>{userResult && JSON.stringify(userResult, null, 2)}</pre>
      <h3>オペレーター予約結果</h3>
      <pre>{operatorResult && JSON.stringify(operatorResult, null, 2)}</pre>
    </div>
  );
};

export default TestApi;
