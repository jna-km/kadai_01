import { useState } from 'react';
import axios from 'axios';

export default function OperatorLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/operator/login', { email, password });
      alert('ログイン成功');
      // トークン保存や画面遷移などの処理
    } catch (err: any) {
      setError(err.response?.data?.message || 'ログインに失敗しました');
    }
  };

  return (
    <div>
      <h2>オペレーターログイン</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="メールアドレス" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="パスワード" />
      <button onClick={handleLogin}>ログイン</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
