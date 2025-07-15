import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const OperatorLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUserAndRole } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await axios.get('/sanctum/csrf-cookie');
      const response = await axios.post('/api/operator/login', { email, password });

      if (response.data.data.user) {
        setUserAndRole(response.data.data.user, 'operator');
        navigate('/admin/dashboard'); // 管理者用ダッシュボードにリダイレクト
      }
    } catch (err: any) {
      console.error('Operator login failed:', err);
      setError(err.response?.data?.message || 'ログインに失敗しました。資格情報を確認してください。');
    }
  };

  return (
    <div>
      <h2>オペレーターログイン</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default OperatorLogin;
