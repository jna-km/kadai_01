// resources/js/pages/Login.tsx
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password }, { withCredentials: true });
      console.log(response.data);
            console.log(response.data.data.user);
      if (response.status === 200) {
        // 認証後、トップページへ遷移
        // alert("login")
        window.location.href = '/';
      } else {
        setError('ログインに失敗しました');
      }
    } catch (err) {
      setError('ログインに失敗しました');
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="メールアドレス"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="パスワード"
          required
        />
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}

export default Login;
