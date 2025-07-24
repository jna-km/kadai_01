
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm, Controller } from 'react-hook-form';
import Input from '../components/form/Input';

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const Login: React.FC = () => {
  const { setUserAndRole } = useAuth();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: { email: '', password: '', remember: false }
  });
  const [apiError, setApiError] = React.useState('');

  const onSubmit = async (data: FormValues) => {
    setApiError('');
    try {
      await axios.get('/sanctum/csrf-cookie');
      const response = await axios.post('/api/login', data);
      if (response.data.data.user) {
        setUserAndRole(response.data.data.user, 'user');
        navigate('/dashboard');
      }
    } catch (err: any) {
      setApiError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{ required: 'メールアドレスは必須です' }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="メールアドレス"
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: 'パスワードは必須です' }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="パスワード"
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="remember"
          control={control}
          render={({ field }) => (
            <label className="block mb-4 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={field.value}
                onChange={e => field.onChange(e.target.checked)}
                className="mr-2"
              />
              ログイン状態を保持する
            </label>
          )}
        />
        {apiError && <p className="text-red-500 text-sm mt-1">{apiError}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mt-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
