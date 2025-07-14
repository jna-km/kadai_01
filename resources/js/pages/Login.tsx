import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    try {
      // CSRF保護用のCookieを先に取得
      await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

      // ログイン処理
      const response = await axios.post('/api/login', {
        email,
        password
      }, {
        withCredentials: true
      });




      alert('ログイン成功');
      console.log(response.data);
      setUser && setUser(response.data.user);

                    const cc = await axios.get('http://localhost:88/api/usera', {
                withCredentials: true,
              });
      console.log(cc);      

      alert('ログイン成功');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('ログイン失敗:', error);
      alert('ログイン失敗');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input name="email" placeholder="メールアドレス" />
      <input name="password" type="password" placeholder="パスワード" />
      <button type="submit">ログイン</button>
    </form>
  );
}

export default Login;
