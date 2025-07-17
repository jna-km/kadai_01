import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const OperatorLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await axios.get('/sanctum/csrf-cookie');
      const response = await axios.post('/api/operator/login', { email, password, remember });

      if (response.data?.data?.user) {
        // operator情報をAuthContextに設定
        setAuthState(null, response.data.data.user, 'operator');
        navigate('/operator/dashboard'); // オペレーター用ダッシュボードにリダイレクト
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
        <div>
          <label>
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            ログイン状態を保持する
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default OperatorLogin;
