import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { FormWrapper } from '@/components/form';
import { Input } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

type FormValues = {
  email: string;
  password: string;
};

const OperatorLogin: React.FC = () => {
  const navigate = useNavigate();
  const setUserAndRole = useAuthStore(state => state.setUserAndRole);
  const [apiError, setApiError] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data: FormValues) => {
    setApiError(null);
    try {
      const response = await axios.post('/api/operator/login', data);
      const { access_token, user } = response.data?.data || {};

      if (access_token && user) {
        sessionStorage.setItem('operator_token', access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        setUserAndRole(user, 'operator');

        toast.success('ログインに成功しました！');
        navigate('/operator/dashboard');
      } else {
        setApiError('ログイン情報を確認できませんでした');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'ログインに失敗しました';
      setApiError(message);
      toast.error(message);
    }
  };

  return (
    <FormWrapper
      title="オペレーター ログイン"
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
    </FormWrapper>
  );
};

export default OperatorLogin;
