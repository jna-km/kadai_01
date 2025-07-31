import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { FormWrapper } from '@/components/form';
import { Input } from '@/components/ui';
import { useAuthStore } from '../../stores/authStore';
import { toast } from 'sonner';
import { ApiResponse } from '../../types/api';
import { User } from '../../types/user'; // 追加

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const Login: React.FC = () => {
  const setUserAndRole = useAuthStore.getState().setUserAndRole;
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: '', password: '', remember: false }
  });

  const onSubmit = async (data: FormValues) => {
    setApiError(null);
    try {
      await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
      const response = await axios.post<ApiResponse<User>>('/api/login', data, { withCredentials: true });
      if (response.data.data) {
        setUserAndRole(response.data.data, 'user');
        toast.success('ログインに成功しました！');
        // 認証状態が反映されてから画面遷移
        if (typeof useAuthStore.getState().checkLoginStatus === 'function') {
          await useAuthStore.getState().checkLoginStatus();
        }
        navigate('/user/dashboard');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'ログインに失敗しました';
      setApiError(message);
      toast.error(message);
    }
  };

  return (
    <FormWrapper
      title="ログイン"
      onSubmit={handleSubmit(onSubmit)}
      errorMessage={apiError || undefined}
    >
      <Controller
        name="email"
        control={control}
        rules={{ required: 'メールアドレスは必須です' }}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            id="email"
            name="email"
            label="メールアドレス"
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
            label="パスワード"
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
          <label className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-700">
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
    </FormWrapper>
  );
};

export default Login;
